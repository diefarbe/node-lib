import { Packet } from "./packet";

export class ColorPacket extends Packet {

  constructor(private key: number, private color: number, private seq?: number) {
    super();
  }

  public buildPacketBytes(seq?: number): number[] {
    const theSeq = this.seq || seq;
    if (theSeq === undefined) {
      throw new Error("SEQ must be defined!");
    }
    
    return [
      0x00,
      0x28,
      0x00, // something is here in the original packets
      theSeq,
      0x01,
      this.key,
      0x02, /* 0x00 = off, 0x01 = stop animation, 0x02 = start animation */
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      this.color,
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