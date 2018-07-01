import { ColorPacket, sendAndConfirm, sendData } from "../../src";

const red = 0x00;
const green = 0xFF;
const blue = 0x00;

async function connect() {
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

        const greenColorPacket = new ColorPacket(i, green);
        const blueColorPacket = new ColorPacket(i, blue);
        const redColorPacket = new ColorPacket(i, red);

        // top top
        if (i < 26) {
            first = greenColorPacket.buildPacketBytes(0x00); // buildColorPacket(i, green, 0x00);
            second = blueColorPacket.buildPacketBytes(0x01); // buildColorPacket(i, blue, 0x01);
            third = redColorPacket.buildPacketBytes(0x02);  // buildColorPacket(i, red, 0x02);
        }

        // esc - f6
        if (i >= 26 && i <= 34) {
            first = redColorPacket.buildPacketBytes(0x00);    // buildColorPacket(i, red, 0x00);
            second = greenColorPacket.buildPacketBytes(0x01); // buildColorPacket(i, green, 0x01);
            third = blueColorPacket.buildPacketBytes(0x02);   // buildColorPacket(i, blue, 0x02);
        }

        // f7 - print screen
        if (i >= 34 && i <= 41) {
            first = blueColorPacket.buildPacketBytes(0x00);  // buildColorPacket(i, blue, 0x00);
            second= redColorPacket.buildPacketBytes(0x01);   // buildColorPacket(i, red, 0x01);
            third = greenColorPacket.buildPacketBytes(0x02); // buildColorPacket(i, green, 0x02);
        }

        // f7 - print screen
        if (i >= 40 && i <= 43) {
            first = greenColorPacket.buildPacketBytes(0x00); // buildColorPacket(i, green, 0x00);
            second = blueColorPacket.buildPacketBytes(0x01); // buildColorPacket(i, blue, 0x01);
            third = redColorPacket.buildPacketBytes(0x02);   // buildColorPacket(i, red, 0x02);
        }

        await sendAndConfirm(device, Buffer.from(first));
        await sendAndConfirm(device, Buffer.from(second));
        await sendAndConfirm(device, Buffer.from(third));

        await sendData(device, Buffer.from(apply));

    }
}

connect();