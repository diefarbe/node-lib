import { Keyboard, KeyInfo, KeyState } from "../../../src";

import { allColor } from "./all-color";

export function applyHardwareProfile(keyboard: Keyboard, cultureCode: string) {
  allColor(keyboard, "#000000");
  for (const key in KeyInfo[cultureCode]) {
    if (KeyInfo[cultureCode][key] === undefined) { continue; }

    keyboard.setKeyState(new KeyState(KeyInfo[cultureCode][key]).setToHardwareProfile());
  }
}
