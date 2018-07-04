import { Packet } from "./packet";

/**
 * Set Keyboard Brightness
 */
export class BrightnessPacket extends Packet {

    constructor(private brightness: number) {
        super();
    }

    public buildPacketBytes(): number[] {

        if (this.brightness < 0 || this.brightness > 63) {
            throw new Error("Brightness is 0-63");
        }

        const buffer = Buffer.alloc(32);
        buffer.writeUInt8(0, 0);
        buffer.writeUInt8(43, 1);
        buffer.writeUInt8(0, 2);
        buffer.writeUInt8(this.brightness, 3);
        return [...buffer];
    }

}