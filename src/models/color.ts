import { ColorChannel } from "./color-channel";
import { ColorPacket } from "./color-packet";

export class Color {
  constructor(private red: ColorChannel, private green: ColorChannel, private blue: ColorChannel) {

  }

  public toPackets(keyId: number): ColorPacket[] {
    return [
      new ColorPacket(keyId, this.red.id, this.red.value),
      new ColorPacket(keyId, this.green.id, this.green.value),
      new ColorPacket(keyId, this.blue.id, this.blue.id)
    ];
  }
}
