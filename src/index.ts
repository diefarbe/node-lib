import {init, setRgb, apply} from "./hdiapi";

let HID = require('node-hid');
let device;

let devices = HID.devices();
let deviceInfo = devices.find((d: any) => {
	return d.vendorId == 0x24f0 && d.productId == 0x2020 && d.interface == 2;
});
if (deviceInfo) {
	device = new HID.HID(deviceInfo.path);
} else {
	throw new Error("no deviceInfo");
}

init(device);
setRgb(device, 151, 0x00, 0xFF, 0xFF);
apply(device);

device.close();
