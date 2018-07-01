import {Keyboard, Keys} from "../../src";

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