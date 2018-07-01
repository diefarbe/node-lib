import { Device } from "usb";

export function readData(device: Device) {
    return new Promise<Buffer | undefined>((resolve, reject) => {
        device.controlTransfer(0xa1, 1, 0x0300, 0x0002, 64, (e, data) => {
            if (typeof e !== "undefined") {
                reject();
            } else {
                resolve(data);
            }
        });
    });
}

export function sendData(device: Device, data: Buffer) {
    return new Promise((resolve, reject) => {
        device.controlTransfer(0x21, 9, 0x0300, 0x0002, data, (e) => {
            if (typeof e !== "undefined") {
                reject();
            } else {
                resolve();
            }
        });
    });
}

export async function sendAndConfirm(device: Device, data: Buffer) {

    await sendData(device, data);
    const returnedData = await readData(device);

    if (typeof returnedData !== "undefined") {
        const valid = [...returnedData][1]
        if (valid !== 20) {
            throw new Error("Failed to send data");
        }
    } else {
        throw new Error("Failed to send data");
    }

}