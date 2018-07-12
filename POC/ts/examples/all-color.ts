import { Keyboard, KeyInfo, KeyState } from "../../../src";

export function allColor(keyboard: Keyboard, hexColor: string) {
  const keys = Object.keys(KeyInfo["en-US"]);
  for (const keyName of keys) {
    const key = KeyInfo["en-US"][keyName];
    keyboard.setKeyState(new KeyState(key).setToColorHex(hexColor));
  }
  keyboard.apply();
}
