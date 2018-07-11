import { Keyboard, KeyInfo, KeyState } from "../../../src";

export function applyHardwareProfile(keyboard: Keyboard, cultureCode: string) {
  for (const key in KeyInfo[cultureCode]) {
    if (KeyInfo[cultureCode][key] === undefined) { continue; }

    keyboard.setKeyState(new KeyState(KeyInfo[cultureCode][key]).setToHardwareProfile().setApplyDelayed());
  }
}
