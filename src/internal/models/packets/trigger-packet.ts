import { Packet } from "./packet";

/**
 * Applies All Changes
 */
export class TriggerPacket extends Packet {

    public buildPacketBytes(): number[] {
        const buffer = Buffer.alloc(32);
        buffer.writeUInt8(0, 0);
        buffer.writeUInt8(45, 1);
        buffer.writeUInt8(0, 2);
        buffer.writeUInt8(15, 3);
        buffer.writeUInt16LE(65535, 4);
        buffer.writeUInt16LE(65535, 6);
        buffer.writeUInt16LE(65535, 8);
        buffer.writeUInt16LE(65535, 10);
        buffer.writeUInt16LE(65535, 12);
        buffer.writeUInt16LE(65535, 14);
        buffer.writeUInt16LE(65535, 16);
        buffer.writeUInt16LE(65535, 18);
        buffer.writeUInt16LE(65535, 20);
        buffer.writeUInt16LE(65535, 22);
        buffer.writeUInt16LE(65535, 24);
        buffer.writeUInt16LE(65535, 26);
        buffer.writeUInt16LE(65535, 28);
        buffer.writeUInt16LE(65535, 30);
        return [...buffer];
    }

}