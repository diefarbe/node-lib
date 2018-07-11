import { Keyboard, KeyInfo, KeyState } from "../../src";
import { KeyModel } from "../../src/internal/models";

// Ok. Let's create a keyboard
// This will be done with the default values for USB vendor, product, and interface
const keyboard = new Keyboard();

/*
 * Now, this actually finds the keyboard. Internally the keyboard object will track
 * the device, but if you really want access to the low-level HID device this will 
 * return it.
 * 
 * NOTE: THE FIND METHOD CAN TAKE THE VENDOR AND PRODUCT IDS ALONG WITH A HOST OF USB
 * INFO TO MAKE THE CONNECTION. THE DEFAULT CALL USES THE INFO NECESSARY TO CONNECT
 * TO THE Q5.
 */
const hidDevice = keyboard.find();

/*
 * Now that we found our keyboard let's go and initialize it...
 * What initialization means, I'm not sure yet, but we send some stuff...
 */
keyboard.initialize();

allColor("#FF0000");
allColor("#00FF00");
allColor("#0000FF");

// sparkle();
const data = keyboard.getKeyboardData();
console.log("Firmware Version:" + data.firmware);
keyboard.setBrightness(63);

// sparkleBatch();

// cosmos themed profile
// galaxy('uk');
// galaxy('us');

/*
 * Let's set some color!
 */
// keyboard.set(
//   new KeyState(KeyInfo["en-US"].space)
//     .setToColorHex("#0000FF")
//     .setFromColorHex("#FF0000")
//     .setDownHoldDelay(100)
//     .setUpHoldDelay(100)
//     .setDownDecrement(100)
//     .setUpIncrement(100)
//     .setUpMaximum("#000000")
//     .setTransition()
// );

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
    keyboard.setKeyState(new KeyState(key).setFromColorHex("FF0000").setToColorHex("FF0000"));
    keyboard.apply();
    sleep(300);
    keyboard.setKeyState(new KeyState(key).setFromColorHex("00FF00").setToColorHex("00FF00"));
    keyboard.apply();
    sleep(300);
    keyboard.setKeyState(new KeyState(key).setFromColorHex("0000FF").setToColorHex("0000FF"));
    keyboard.apply();
    sleep(300);
    keyboard.setKeyState(new KeyState(key).setFromColorHex("000000").setToColorHex("000000"));
    keyboard.apply();
    sleep(1000);
  }
}

function sparkle() {
  const keys = Object.keys(KeyInfo["en-US"]);
  while (true) {
    const chosenKey = keys[Math.floor(Math.random() * keys.length)];
    const key = KeyInfo["en-US"][chosenKey];
    const color = Math.floor(Math.random() * 3);
    if (color === 0) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#FF0000"));
    } else if (color === 1) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#00FF00"));
    } else if (color === 2) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#0000FF"));
    } else {
      throw new Error("should never happen");
    }

    keyboard.apply();
  }
}

function sparkleBatch() {
  const keys = Object.keys(KeyInfo["en-US"]);
  const currentKeys: KeyModel[] = [];
  while (true) {
    const chosenKey = keys[Math.floor(Math.random() * keys.length)];
    const key = KeyInfo["en-US"][chosenKey];
    const color = Math.floor(Math.random() * 3);
    if (color === 0) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#FF0000"));
    } else if (color === 1) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#00FF00"));
    } else if (color === 2) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#0000FF"));
    } else {
      throw new Error("should never happen");
    }
    keyboard.apply();
    currentKeys.push(key);

    if (currentKeys.length > 10) {
      keyboard.setKeyState(new KeyState(currentKeys.splice(0, 1)[0]).setToColorHex("#000000"));
      keyboard.apply();
    }
  }
}

function shuffle(array: any): any {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function galaxy(region: string) {
  console.log('running galaxy');
  allColor("#000000");
  var mySelector = [];
  for (var i = 0; i < 216; i++) {
    mySelector.push(i);
  }

  if (region == 'uk') {
    var ki = Object.keys(KeyInfo["en-GB"]);
  } else {
    var ki = Object.keys(KeyInfo["en-US"]);  
  }
  
  ki = shuffle(ki);
  var ffs = ki.length;
  var color_array = [];
  var target_array = [];
  var delay_array = [];
  let randomKey: any = 0;
  const c = ['7D008E', '1A0478', '6B5D9E', '9398D7', '3F70B4'];
  const d = ['140751', '160124', '140034', '07001D', '30053F'];
  for (var i = 0; i < ffs; i++) {
    target_array.push([ki[i]]);
    delay_array.push(i*20);
    color_array.push(c[Math.floor(Math.random() * c.length)]);
  }

  for (var index = 0; index < color_array.length; index++) {
    var color_arg = color_array[index];
    var key_array = target_array[index];
    var startDelay = delay_array[index];
    var back_color = (d[Math.floor(Math.random() * d.length)]);
    
    for (var i = 0; i < key_array.length; i++) {
      if (region == 'uk') {
        var key = KeyInfo["en-GB"][key_array[i]];
      } else {
        var key = KeyInfo["en-US"][key_array[i]]; 
      }

      keyboard.setKeyState(new KeyState(key)
        .setToColorHex("#"+color_arg)
        .setFromColorHex("#"+back_color)
        .setUpMaximum("#"+back_color)
        .setUpIncrement(50)
        .setUpIncrementDelay(10)
        .setDownDecrement(50)
        .setDownDecrementDelay(5)
        .setUpHoldDelay(5)
        .setDownHoldDelay(900)
        .setStartDelay(startDelay)
        .setTransitionReverse()
        .setApplyDelayed()
        );
    }
    
  }
}

function allColor(hexColor: string) {
  const keys = Object.keys(KeyInfo["en-US"]);
  for (const keyName of keys) {
    const key = KeyInfo["en-US"][keyName];
    keyboard.setKeyState(new KeyState(key).setToColorHex(hexColor));
  }
  keyboard.apply();
}

function sleep(sleepDuration: number) {
  const now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* do nothing */
  }
}