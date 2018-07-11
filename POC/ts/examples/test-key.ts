import { Keyboard, KeyState } from "../../../src";

import { KeyModel } from "../../../src/internal/models";

export function testKey(keyboard: Keyboard, key: KeyModel) {
  while (true) {
    keyboard.setKeyState(new KeyState(key).setFromColorHex("FF0000").setToColorHex("FF0000"));
    keyboard.apply();
    sleep(300);
    keyboard.setKeyState(new KeyState(key).setFromColorHex("00FF00").setToColorHex("00FF00"));
    keyboard.apply();
    sleep(300);
    keyboard.setKeyState(new KeyState(key).setFromColorHex("0000FF").setToColorHex("0000FF"));
    keyboard.apply();
    sleep(300);
    keyboard.setKeyState(new KeyState(key).setFromColorHex("000000").setToColorHex("000000"));
    keyboard.apply();
    sleep(1000);
  }
}

function sleep(sleepDuration: number) {
  const now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* do nothing */
  }
}
