import {Keyboard, KeyInfo, KeyState} from "../../src";
import {KeyModel} from "../../src/internal/models";

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
keyboard.set(
    new KeyState(KeyInfo.SPACE)
        .setToColorHex("#0000FF")
        .setFromColorHex("#FF0000")
        .setDownHoldDelay(100)
        .setUpHoldDelay(100)
        .setDownDecrement(100)
        .setUpIncrement(100)
        .setUpMaximum("#000000")
        .setTransition()
);

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
function testKey(key: KeyModel) {
  while (true) {
    keyboard.set(new KeyState(key).setFromColorHex("FF0000").setToColorHex("FF0000"));
    keyboard.apply();
    sleep(300);
    keyboard.set(new KeyState(key).setFromColorHex("00FF00").setToColorHex("00FF00"));
    keyboard.apply();
    sleep(300);
    keyboard.set(new KeyState(key).setFromColorHex("0000FF").setToColorHex("0000FF"));
    keyboard.apply();
    sleep(300);
    keyboard.set(new KeyState(key).setFromColorHex("000000").setToColorHex("000000"));
    keyboard.apply();
    sleep(1000);
  }
}

function sparkle() {
  let keys = Object.keys(KeyInfo);
  while (true) {
    let chosenKey = keys[Math.floor(Math.random() * keys.length)];
    let key = KeyInfo[chosenKey];
    let color = Math.floor(Math.random() * 3);
    if (color == 0) {
      keyboard.set(new KeyState(key).setFromColorHex("FF0000").setToColorHex("FF0000"));
    } else if (color == 1) {
      keyboard.set(new KeyState(key).setFromColorHex("00FF00").setToColorHex("00FF00"));
    } else if (color == 2) {
      keyboard.set(new KeyState(key).setFromColorHex("0000FF").setToColorHex("0000FF"));
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
