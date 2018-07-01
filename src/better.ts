import { buildColorPacket } from "./ColorPacket"
import { sendData, sendAndConfirm } from "./Transport";

const red = 0x00;
const green = 0xFF;
const blue = 0x00;

export async function connect() {
    var usb = require('usb');

    var device = usb.findByIds(0x24f0, 0x2020);

    device.open();

    var apply = [
        0x00, 0x2d, 0x64, 0x0f,
        0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x38, 0x21
    ]

    // 26 - 34 esc - f6

    for (let i = 0; i < 256; i++) {

        let first: number[] = [];
        let second: number[] = [];
        let third: number[] = [];

        // top top
        if (i < 26) {
            first = buildColorPacket(i, green, 0x00);
            second = buildColorPacket(i, blue, 0x01);
            third = buildColorPacket(i, red, 0x02);
        }

        // esc - f6
        if (i >= 26 && i <= 34) {
            first = buildColorPacket(i, red, 0x00);
            second = buildColorPacket(i, green, 0x01);
            third = buildColorPacket(i, blue, 0x02);
        }

        // f7 - print screen
        if (i >= 34 && i <= 41) {
            first = buildColorPacket(i, blue, 0x00);
            second = buildColorPacket(i, red, 0x01);
            third = buildColorPacket(i, green, 0x02);
        }

        // f7 - print screen
        if (i >= 40 && i <= 43) {
            first = buildColorPacket(i, green, 0x00);
            second = buildColorPacket(i, blue, 0x01);
            third = buildColorPacket(i, red, 0x02);
        }

        await sendAndConfirm(device, Buffer.from(first));
        await sendAndConfirm(device, Buffer.from(second));
        await sendAndConfirm(device, Buffer.from(third));

        await sendData(device, Buffer.from(apply));

    }

}