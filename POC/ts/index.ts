import {Keyboard, Keys} from "../../src";
import {Key} from "../../src/models/key";

// Ok. Let's create a keyboard
// This will be done with the default values for USB vendor, product, and interface
const keyboard = new Keyboard();

/*
 * Now, this actually finds the keyboard. Internally the keyboard object will track
 * the device, but if you really want access to the low-level HID device this will 
 * return it.
 */
const hidDevice = keyboard.find();

/*
 * Now that we found our keyboard let's go and initialize it...
 * What initialization means, I'm not sure yet, but we send some stuff...
 */
keyboard.initialize();

/*
 * Let's set some color!
 */
keyboard.setRgb(Keys.SPACE, 0xFF, 0xFF, 0xFF);
keyboard.setRgb(Keys.SPACE, 0xFF, 0x00, 0xFF);
keyboard.setRgbHex(Keys.SPACE, 0xFF00FF);

/*
 * Great! Apply our changes!
 */
keyboard.apply();

/*
 * Clean up!
 */
keyboard.close();

/*
This function is useful for figuring out key mappings. While running, the key should flash red, green, blue, blank, repeat.

testKey(new Key(5, 0, 1, 2));
 */
function testKey(key: Key) {
  while (true) {
    keyboard.setRgbHex(key, 0xFF0000);
    keyboard.apply();
    sleep(300);
    keyboard.setRgbHex(key, 0x00FF00);
    keyboard.apply();
    sleep(300);
    keyboard.setRgbHex(key, 0x0000FF);
    keyboard.apply();
    sleep(300);
    keyboard.setRgbHex(key, 0x000000);
    keyboard.apply();
    sleep(1000);
  }
}

function sparkle() {
  let keys = Object.keys(Keys);
  while (true) {
    let chosenKey = keys[Math.floor(Math.random() * keys.length)];
    let key = Keys[chosenKey];
    let color = Math.floor(Math.random() * 3);
    if (color == 0) {
      keyboard.setRgbHex(key, 0xFF0000);
    } else if (color == 1) {
      keyboard.setRgbHex(key, 0x00FF00);
    } else if (color == 2) {
      keyboard.setRgbHex(key, 0x0000FF);
    } else {
      throw new Error("should never happen")
    }
    keyboard.apply();
  }
}

function sleep(sleepDuration: number) {
  let now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* do nothing */
  }
}
