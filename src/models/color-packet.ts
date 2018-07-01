import {Packet} from "./packet";

export class ColorPacket extends Packet {
    constructor(private key: number, private channel: number, private color: number) {
        super();
    }
    
    public buildPacketBytes(): number[] {
        return [
            0x00,
            0x28,
            0x00,
            this.channel,
            0x01,
            this.key,
            0x02, /* 0x00 = off, 0x01 = stop animation, 0x02 = start animation */
            this.color, /* fade too */
            0x00,
            0xFF, /* animation speed; 0x00 = slowest, 0xFF = fastest */
            0x00,
            0x00,
            0x00,
            this.color, /* fade from */
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x01,
            0x40, // end
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00, // something is here in the original packets
            0x00  // something is here in the original packets
        ];
    }
}