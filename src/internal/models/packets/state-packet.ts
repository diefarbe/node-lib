import { Packet } from "./packet";
import { EffectFlag } from "./utils/effect-flag";

/**
 * Changes Key States
 */
export class StatePacket extends Packet {
  constructor(
    private key: number,
    private colorChannelId: number,
    private effectFlag: EffectFlag,

    private upHoldLevel?: number,
    private downHoldLevel?: number,

    private upMaximumLevel?: number,
    private downMinimumLevel?: number,

    private upHoldDelay?: number,
    private downHoldDelay?: number,

    private upIncrement?: number,
    private downDecrement?: number,

    private upIncrementDelay?: number,
    private downDecrementDelay?: number,

    private startDelay?: number,

    private effectId?: number,
  ) {
    super();
  }

  public buildPacketBytes(): number[] {
    const colorChannelId = this.colorChannelId || 0x00;
    const upMaximumLevel = this.upMaximumLevel || 0x00;
    const upHoldLevel = this.upHoldLevel || 0;
    const upHoldDelay = this.upHoldDelay || 0;
    const upIncrement = this.upIncrement || 0;
    const upIncrementDelay = this.upIncrementDelay || 0;
    const downMinimumLevel = this.downMinimumLevel || 0;
    const downHoldLevel = this.downHoldLevel || 0;
    const downHoldDelay = this.downHoldDelay || 0;
    const downDecrement = this.downDecrement || 0;
    const downDecrementDelay = this.downDecrementDelay || 0;
    const startDelay = this.startDelay || 0;
    const effectId = this.effectId || 0x02;
    const key = this.key || 151;

    const buffer = Buffer.alloc(33);
    buffer.writeUInt8(0, 0);
    buffer.writeUInt8(40, 1);
    buffer.writeUInt8(0, 2);
    buffer.writeUInt8(colorChannelId, 3); // channel
    buffer.writeUInt8(1, 4); // wtf is this
    buffer.writeUInt8(key, 5); // key
    buffer.writeUInt8(effectId, 6); // 0x00 or 0x02
    buffer.writeUInt16LE(upMaximumLevel, 7);
    // 8
    buffer.writeUInt16LE(upIncrement, 9);
    // 10
    buffer.writeUInt16LE(upIncrementDelay, 11);
    // 12
    buffer.writeUInt16LE(upHoldLevel, 13);
    // 14
    buffer.writeUInt16LE(upHoldDelay, 15);
    // 16
    buffer.writeUInt16LE(downMinimumLevel, 17);
    // 18
    buffer.writeUInt16LE(downDecrement, 19);
    // 20
    buffer.writeUInt16LE(downDecrementDelay, 21);
    // 22
    buffer.writeUInt16LE(downHoldLevel, 23);
    // 24
    buffer.writeUInt16LE(downHoldDelay, 25);
    // 26
    buffer.writeUInt16LE(startDelay, 27);
    // 28
    buffer.writeUInt16LE(0, 29);
    // 30
    buffer.writeUInt16LE(this.effectFlag.value, 31);
    // 32
    
    return [...buffer];
  }
}
