[![Build Status](https://travis-ci.org/diefarbe/node-lib.svg?branch=master)](https://travis-ci.org/diefarbe/node-lib)

# Node Lib
This is a Node.JS library for interfacing with the DasKeyboard 5Q.

## Running
```
npm install
npm run-script build # builds the library
npm run-script poc-ts # builds and runs the POC
```

## Permissions on Linux
To prevent needing to run as root, you'll need to update your udev stuff.

Place this file at `/etc/udev/rules.d/51-5q.rules`:

```
SUBSYSTEM=="input", GROUP="input", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="24f0", ATTRS{idProduct}=="2020", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw*", ATTRS{idVendor}=="24f0", ATTRS{idProduct}=="2020", MODE="0666", GROUP="plugdev"
```

This will give the group `plugdev` access to the keyboard.

Then reload your udev configuration with: `sudo udevadm control --reload-rules`

Then reconnect your keyboard.

## Firmware Versions

In the POC you'll see a way to check the firmware version. Turns out these keyboards are shipping with versions all over the place. 

Some early versions may not light up the allColors test properly, or may have bugs that make animations like the sparkleBatch test unrunnable.

Right now, for best results - we're supporting the latest firmware (7.3.253). 
