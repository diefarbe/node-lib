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
  LEFT_PIPE_1: new Key(0, 0, 1, 2),
  // 1-13 unknown
  LIGHT_GAME_MODE: new Key(14, 1, 2, 0),
  LIGHT_NUM_LOCK: new Key(15, 1, 2, 0),
  LIGHT_CAPS_LOCK: new Key(16, 1, 2, 0),
  LIGHT_SCR_LOCK: new Key(17, 1, 2, 0),
  ILLUMINATION_TOP: new Key(18, 2, 0, 1),
  PLAY_PAUSE_TOP: new Key(19, 2, 0, 1),
  NEXT_TOP: new Key(20, 2, 0, 1),
  // 21 unknown
  Q_TOP_LEFT: new Key(22, 2, 0, 1),
  Q_TOP_RIGHT: new Key(23, 2, 0, 1),
  LEFT_PIPE_2: new Key(24, 0, 1, 2),
  ESC: new Key(25, 0, 1, 2),
  // 26 unknown
  F1: new Key(27, 0, 1, 2),
  F2: new Key(28, 0, 1, 2),
  F3: new Key(29, 0, 1, 2),
  F4: new Key(30, 0, 1, 2),
  // 31 unknown
  F5: new Key(32, 0, 1, 2),
  F6: new Key(33, 0, 1, 2),
  F7: new Key(34, 1, 2, 0),
  F8: new Key(35, 1, 2, 0),
  F9: new Key(36, 1, 2, 0),
  F10: new Key(37, 1, 2, 0),
  F11: new Key(38, 1, 2, 0),
  F12: new Key(39, 1, 2, 0),
  PRINT_SCREEN: new Key(40, 1, 2, 0),
  SCREEN_LOCK: new Key(41, 2, 0, 1),
  PAUSE: new Key(42, 2, 0, 1),
  ILLUMINATION_BOTTOM: new Key(43, 2, 0, 1),
  PLAY_PAUSE_BOTTOM: new Key(44, 2, 0, 1),
  NEXT__BOTTOM: new Key(45, 2, 0, 1),
  Q_BOTTOM_LEFT: new Key(46, 2, 0, 1),
  Q_BOTTOM_RIGHT: new Key(47, 2, 0, 1),
  LEFT_PIPE_3: new Key(48, 0, 1, 2),
  TILDE: new Key(49, 0, 1, 2),
  ONE: new Key(50, 0, 1, 2),
  TWO: new Key(51, 0, 1, 2),
  THREE: new Key(52, 0, 1, 2),
  FOUR: new Key(53, 0, 1, 2),
  FIVE: new Key(54, 0, 1, 2),
  SIX: new Key(55, 0, 1, 2),
  SEVEN: new Key(56, 0, 1, 2),
  EIGHT: new Key(57, 0, 1, 2),
  NINE: new Key(58, 1, 2, 0),
  ZERO: new Key(59, 1, 2, 0),
  MINUS: new Key(60, 1, 2, 0),
  PLUS: new Key(61, 1, 2, 0),
  // 62 unknown
  BACKSPACE: new Key(63, 1, 2, 0),
  INSERT: new Key(64, 2, 0, 1),
  HOME: new Key(65, 2, 0, 1),
  PAGE_UP: new Key(66, 2, 0, 1),
  NUM_LOCK: new Key(67, 2, 0, 1),
  DIVIDE: new Key(68, 2, 0, 1),
  MULTIPLY: new Key(69, 2, 0, 1),
  NUM_MINUS: new Key(70, 2, 0, 1),
  RIGHT_PIPE_1: new Key(71, 2, 0, 1),
  LEFT_PIPE_4: new Key(72, 0, 1, 2),
  TAB: new Key(73, 0, 1, 2),
  Q: new Key(74, 0, 1, 2),
  W: new Key(75, 0, 1, 2),
  E: new Key(76, 0, 1, 2),
  R: new Key(77, 0, 1, 2),
  T: new Key(78, 0, 1, 2),
  Y: new Key(79, 0, 1, 2),
  U: new Key(80, 0, 1, 2),
  I: new Key(81, 1, 2, 0),
  O: new Key(82, 1, 2, 0),
  P: new Key(83, 1, 2, 0),
  OPEN_CURLY_BRACE: new Key(84, 1, 2, 0),
  CLOSE_CURLY_BRACE: new Key(85, 1, 2, 0),
  // 86 unknown
  PIPE: new Key(87, 1, 2, 0),
  DELETE: new Key(88, 1, 2, 0),
  END: new Key(89, 1, 2, 0),
  PAGE_DOWN: new Key(90, 1, 2, 0),
  NUM_SEVEN: new Key(91, 2, 0, 1),
  NUM_EIGHT: new Key(92, 2, 0, 1),
  NUM_NINE: new Key(93, 2, 0, 1),
  NUM_PLUS: new Key(94, 2, 0, 1),
  RIGHT_PIPE_2: new Key(95, 2, 0, 1),
  LEFT_PIPE_5: new Key(96, 0, 1, 2),
  CAPS_LOCK: new Key(97, 0, 1, 2),
  // 98 unknown
  A: new Key(99, 0, 1, 2),
  S: new Key(100, 0, 1, 2),
  D: new Key(101, 0, 1, 2),
  F: new Key(102, 0, 1, 2),
  G: new Key(103, 0, 1, 2),
  H: new Key(104, 0, 1, 2),
  J: new Key(105, 0, 1, 2),
  K: new Key(106, 1, 2, 0),
  L: new Key(107, 1, 2, 0),
  SEMICOLON: new Key(108, 1, 2, 0),
  DOUBLE_QUOTE: new Key(109, 1, 2, 0),
  RETURN_1: new Key(110, 1, 2, 0),
  RETURN_2: new Key(111, 1, 2, 0), // TODO these two things need investigating
  // 112-114 unknown
  NUM_FOUR: new Key(115, 2, 0, 1),
  NUM_FIVE: new Key(116, 2, 0, 1),
  NUM_SIX: new Key(117, 2, 0, 1),
  // 118 unknown
  RIGHT_PIPE_3: new Key(119, 2, 0, 1),
  LEFT_PIPE_6: new Key(120, 2, 0, 1),
  LEFT_SHIFT: new Key(121, 0, 1, 2),
  // 122 unknown
  Z: new Key(123, 0, 1, 2),
  X: new Key(124, 0, 1, 2),
  C: new Key(125, 0, 1, 2),
  V: new Key(126, 0, 1, 2),
  B: new Key(127, 0, 1, 2),
  N: new Key(128, 0, 1, 2),
  M: new Key(129, 0, 1, 2),
  LEFT_CARROT: new Key(130, 1, 2, 0),
  RIGHT_CARROT: new Key(131, 1, 2, 0),
  QUESTION: new Key(132, 1, 2, 0),
  // 133 unknown
  RIGHT_SHIFT_1: new Key(134, 1, 2, 0),
  RIGHT_SHIFT_2: new Key(135, 1, 2, 0),
  // 136 unknown
  ARROW_UP: new Key(137, 2, 0, 1),
  // 138 unknown
  NUM_ONE: new Key(139, 2, 0, 1),
  NUM_TWO: new Key(140, 2, 0, 1),
  NUM_THREE: new Key(141, 2, 0, 1),
  // 142-143 unknown
  LEFT_PIPE_7: new Key(144, 2, 0, 1),
  LEFT_CONTROL: new Key(145, 0, 1, 2),
  LEFT_META: new Key(146, 0, 1, 2),
  LEFT_ALT: new Key(147, 0, 1, 2),
  // 148-150 unknown
  SPACE: new Key(151, 0, 1, 2),
  // 152-154 unknown
  RIGHT_ALT: new Key(155, 1, 2, 0),
  FUNCTION: new Key(156, 1, 2, 0),
  MENU: new Key(157, 1, 2, 0),
  // 158 unknown
  RIGHT_CONTROL: new Key(159, 1, 2, 0),
  ARROW_LEFT: new Key(160, 1, 2, 0),
  ARROW_DOWN: new Key(161, 2, 0, 1),
  ARROW_RIGHT: new Key(162, 2, 0, 1),
  // 163 unknown
  NUM_ZERO: new Key(164, 2, 0, 1),
  NUM_DOT: new Key(165, 2, 0, 1),
  NUM_RETURN: new Key(166, 2, 0, 1),
  RIGHT_PIPE_4: new Key(167, 2, 0, 1),
  LEFT_PIPE_8: new Key(168, 0, 1, 2),
  // 169-190 unknown
  RIGHT_PIPE_5: new Key(191, 2, 0, 1),
  LEFT_PIPE_9: new Key(192, 0, 1, 2),
  RIGHT_PIPE_6: new Key(215, 2, 0, 1),
};
