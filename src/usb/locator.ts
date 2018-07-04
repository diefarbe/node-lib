import { UsbHid } from "./hid";
import { Usb } from "./usb";

export function findUsbDevice(vendorId: number, productId: number, deviceInterface: number, usage: number): Usb {
  // At some point we will have logic to determine which library to use...
  // Right now just use the HID one...

  return new UsbHid(vendorId, productId, deviceInterface, usage);
}
