import { Device, devices, HID } from "node-hid";
import { Usb } from "./usb";

export class UsbHid extends Usb {

    private hidDevice: HID | undefined;

    constructor(protected vendorId: number, protected productId: number, protected deviceInterface: number, protected usage: number) {
        super(vendorId, productId, deviceInterface, usage);
    }

    public connect() {
        const device = devices().find((d: Device) => {
            if (d.vendorId === this.vendorId && d.productId === this.productId) {
                if (process.platform === "darwin") {
                    return d.usage === this.usage;
                } else {
                    return d.interface === this.deviceInterface;
                }
            }
            return false;
        });

        if (device === undefined) {
            throw new Error("no deviceInfo");
        }
        if (device.path === undefined) {
            throw new Error("Unable to find device path");
        }

        this.hidDevice = new HID(device.path);
    }

    public write(data: number[]) {
        if (this.hidDevice === undefined) {
            throw new Error("The HID device is undefined.");
        }
        let res: number = 0;
        while (res !== data.length) {
            try {
                res = this.hidDevice.sendFeatureReport(data);
            } catch {
                res = 0;
            }
        }
    }

    public read(): number[] {
        if (this.hidDevice === undefined) {
            throw new Error("The HID device is undefined.");
        }
        let res: number[] = [];
        while (res.length !== 65) {
            try {
                res = this.hidDevice.getFeatureReport(0, 65);
                if (process.platform === "darwin") {
                    res.unshift(0);
                }
            } catch {
                res = [];
            }
        }
        return res;
    }

    public disconnect() {
        if (this.hidDevice !== undefined) {
            this.hidDevice.close();
            this.hidDevice = undefined;
        }
    }
}
