import { Packet } from "./packet";

export class ColorPacket extends Packet {
  constructor(
    private key: number,
    private colorChannelId: number,
    private toColor?: number,
    private fromColor?: number,
    private animationTime?: number,
    private animationTimeMultiplier?: number,
    private animationStepWidth?: number,
    private animationSleep?: number) {
    super();
  }

  public buildPacketBytes(): number[] {
    const toColor = this.toColor || 0x00;
    const fromColor = this.fromColor || toColor;
    const animationTime = this.animationTime || 0xFF;
    const animationTimeMultiplier = this.animationTimeMultiplier || 0x00;
    const animationStepWidth = this.animationStepWidth || 0x00;
    const animationSleep = this.animationSleep || 0x00;
    
    return [
      0x00,
      0x28,
      0x00,
      this.colorChannelId,
      0x01,
      this.key,
      0x02, /* 0x00 = off, 0x01 = stop animation, 0x02 = start animation */
      toColor, /* fade too */
      0x00,
      animationTime, /* animation speed; 0x00 = slowest, 0xFF = fastest */
      animationTimeMultiplier,
      animationStepWidth,
      animationSleep,
      fromColor, /* fade from */
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
