import {Keyboard, KeyInfo, KeyState} from "../../src";

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
