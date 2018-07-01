import { Color } from "./color";
import { ColorChannel } from "./color-channel";
import { ColorPacket } from "./color-packet";

/**
 * A key is an id
 *
 * @export
 * @interface IKey
 */
export interface IKey {
  id: number;
}

/**
 * Representation of a key and color
 *
 * @export
 * @class Key
 * @implements {IKey}
 */
export class Key implements IKey {
  constructor(public id: number, public rChannelId: number, public gChannelId: number, public bChannelId: number) {

  }

  public withColor(red: number, green: number, blue: number): KeyColor {
    return new KeyColor(this, red, green, blue);
  }
}

export class KeyColor extends Key {
  public color: Color;

  constructor(key: Key, red: number, green: number, blue: number) {
    super(key.id, key.rChannelId, key.gChannelId, key.bChannelId);

    this.color = new Color(new ColorChannel(this.rChannelId, red),
    new ColorChannel(this.gChannelId, green),
    new ColorChannel(this.bChannelId, blue));
  }

  public toPackets(): ColorPacket[] {
    return this.color.toPackets(this.id);
  }
}

/**
 * Maps a common name of a key to a key object.
 */
export const keys: { [keyName: string]: Key } = {
  SPACE: new Key(151, 0, 1, 2)
};
