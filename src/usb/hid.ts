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
        let retry = 0;
        let lastAttempt = 0;
        while (res !== data.length) {
            if (retry) {
                if (retry > 5) {
                    throw new Error("maximum retry reached");
                }
                while (Date.now() < lastAttempt + 100) {
                    // no-op
                }
            }
            let start = Date.now();
            try {
                res = this.hidDevice.sendFeatureReport(data);
            } catch {
                let end = Date.now();
                let took = end - start;
                if (took < 10) {
                    // missing device errors will return almost instantly
                    throw new Error("feature report errored too quickly; device is probably not there anymore: " + took);
                }
                res = 0;
            }
            lastAttempt = Date.now();
            retry++;
        }
    }

    public read(): number[] {
        if (this.hidDevice === undefined) {
            throw new Error("The HID device is undefined.");
        }
        let res: number[] = [];
        let retry = 0;
        let lastAttempt = 0;
        while (res.length !== 65) {
            if (retry) {
                if (retry > 5) {
                    throw new Error("maximum retry reached");
                }
                while (Date.now() < lastAttempt + 100) {
                    // no-op
                }
            }
            let start = Date.now();
            try {
                res = this.hidDevice.getFeatureReport(0, 65);
                if (process.platform === "darwin") {
                    res.unshift(0);
                }
            } catch {
                let end = Date.now();
                let took = end - start;
                if (took < 10) {
                    // missing device errors will return almost instantly
                    throw new Error("feature report errored too quickly; device is probably not there anymore: " + took);
                }
                res = [];
            }
            lastAttempt = Date.now();
            retry++;
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
