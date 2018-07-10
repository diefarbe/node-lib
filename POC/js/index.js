const nodeLib = require('../../dist');

function allColor(theKeyboard, hexColor) {
  const keys = Object.keys(nodeLib.KeyInfo["en-US"]);
  for (const keyName of keys) {
    const key = nodeLib.KeyInfo["en-US"][keyName];
    theKeyboard.setKeyState(new nodeLib.KeyState(key).setToColorHex(hexColor));
  }
  theKeyboard.apply();
}

// Ok. Let's create a keyboard
// This will be done with the default values for USB vendor, product, and interface
const keyboard = new nodeLib.Keyboard();

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

allColor(keyboard, "#ff0000");

/*
 * Clean up!
 */
keyboard.close();
