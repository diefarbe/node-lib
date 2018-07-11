import { Keyboard } from "../../src";
import { 
  allColor,
  applyHardwareProfile,
  galaxy,
  sparkle,
  sparkleBatch,
  testKey
 } from "./examples";

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

// allColor(keyboard, "#FF0000");
// allColor(keyboard, "#00FF00");
// allColor(keyboard, "#0000FF");

// // sparkle();
// const data = keyboard.getKeyboardData();
// console.log("Firmware Version:" + data.firmware);
// keyboard.setBrightness(63);

// sparkleBatch(keyboard);

// cosmos themed profile
// galaxy(keyboard, 'uk');
galaxy(keyboard, "us");
//applyHardwareProfile("en-US");

/*
 * Great! Apply our changes!
 */
keyboard.apply();

/*
 * Clean up!
 */
keyboard.close();
