import { Keyboard, KeyInfo, KeyState } from "../../../src";

import { KeyModel } from "../../../src/internal/models";

export function sparkleBatch(keyboard: Keyboard) {
  const keys = Object.keys(KeyInfo["en-US"]);
  const currentKeys: KeyModel[] = [];
  while (true) {
    const chosenKey = keys[Math.floor(Math.random() * keys.length)];
    const key = KeyInfo["en-US"][chosenKey];
    const color = Math.floor(Math.random() * 3);
    if (color === 0) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#FF0000"));
    } else if (color === 1) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#00FF00"));
    } else if (color === 2) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#0000FF"));
    } else {
      throw new Error("should never happen");
    }
    keyboard.apply();
    currentKeys.push(key);

    if (currentKeys.length > 10) {
      keyboard.setKeyState(new KeyState(currentKeys.splice(0, 1)[0]).setToColorHex("#000000"));
      keyboard.apply();
    }
  }
}
