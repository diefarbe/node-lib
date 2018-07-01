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