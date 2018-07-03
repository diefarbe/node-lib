import { KeyModel } from "../models";

export const enGB = {
  escape: new KeyModel([25], "escape", "ESC", {
    x: 0,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  f1: new KeyModel([27], "f1", "F1", {
    x: 8.56,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  f2: new KeyModel([28], "f2", "F2", {
    x: 12.84,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  f3: new KeyModel([29], "f3", "F3", {
    x: 17.12,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  f4: new KeyModel([30], "f4", "F4", {
    x: 21.4,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  f5: new KeyModel([32], "f5", "F5", {
    x: 27.82,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  f6: new KeyModel([33], "f6", "F6", {
    x: 32.1,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  f7: new KeyModel([34], "f7", "F7", {
    x: 36.38,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  f8: new KeyModel([35], "f8", "F8", {
    x: 40.66,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  f9: new KeyModel([36], "f9", "F9", {
    x: 47.08,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  f10: new KeyModel([37], "f10", "F10", { // tslint:disable-line
    x: 51.36,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  f11: new KeyModel([38], "f11", "F11", {
    x: 55.64,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  f12: new KeyModel([39], "f12", "F12", {
    x: 59.92,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  printScreen: new KeyModel([40], "printScreen", "PRT-SC", {
    x: 65.27,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  screenLock: new KeyModel([41], "screenLock", "SRC-LK", {
    x: 69.55,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  pause: new KeyModel([42], "pause", "PAUSE", {
    x: 73.83,
    y: 0
  }, 4.28, 13.5, 0, 1, 2),
  Macro1: new KeyModel([43, 18], "Macro1", "M1", {
    x: 80.564,
    y: 1
  }, 3.4, 11.88, 0, 1, 2),
  Macro2: new KeyModel([44, 19], "Macro2", "M2", {
    x: 83.85,
    y: 1
  }, 3.4, 11.88, 0, 1, 2),
  Macro3: new KeyModel([45, 20], "Macro3", "M3", {
    x: 86.75,
    y: 1
  }, 3.4, 11.88, 0, 1, 2),
  QKnob: new KeyModel([21, 46, 47, 22, 23], "Volume / Q Knob", "Q-BUT", {
    x: 0,
    y: 0
  }, 0, 0, 0, 1, 2),
  negate: new KeyModel([49], "negate", "&not;", {
    x: 0,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  1: new KeyModel([50], "1", "1", {
    x: 4.28,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  2: new KeyModel([51], "2", "2", {
    x: 8.56,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  3: new KeyModel([52], "3", "3", {
    x: 12.84,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  4: new KeyModel([53], "4", "4", {
    x: 17.12,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  5: new KeyModel([54], "5", "5", {
    x: 21.4,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  6: new KeyModel([55], "6", "6", {
    x: 25.68,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  7: new KeyModel([56], "7", "7", {
    x: 29.96,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  8: new KeyModel([57], "8", "8", {
    x: 34.24,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  9: new KeyModel([58], "9", "9", {
    x: 38.52,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  0: new KeyModel([59], "0", "0", {
    x: 42.8,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  dash: new KeyModel([60], "dash", "-", {
    x: 47.08,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  equalSign: new KeyModel([61], "equalSign", "=", {
    x: 51.36,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  backspace: new KeyModel([63], "backspace", "&#8678;", {
    x: 55.64,
    y: 20.25
  }, 8.56, 13.5, 0, 1, 2),
  insert: new KeyModel([64], "insert", "INS", {
    x: 65.27,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  home: new KeyModel([65], "home", "HOME", {
    x: 69.55,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  pageUp: new KeyModel([66], "pageUp", "P-UP", {
    x: 73.83,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  numLock: new KeyModel([67], "numLock", "NUM", {
    x: 79.18,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  divide: new KeyModel([68], "divide", "N-/", {
    x: 83.46,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  multiply: new KeyModel([69], "multiply", "N-*", {
    x: 87.74,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  substract: new KeyModel([70], "substract", "N--", {
    x: 92.32,
    y: 20.25
  }, 4.28, 13.5, 0, 1, 2),
  tab: new KeyModel([73], "tab", "&rarrb;", {
    x: 0,
    y: 33.75
  }, 6.42, 13.5, 0, 1, 2),
  q: new KeyModel([74], "q", "Q", {
    x: 6.42,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  w: new KeyModel([75], "w", "W", {
    x: 10.7,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  e: new KeyModel([76], "e", "E", {
    x: 14.98,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  r: new KeyModel([77], "r", "R", {
    x: 19.26,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  t: new KeyModel([78], "t", "T", {
    x: 23.54,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  y: new KeyModel([79], "y", "Y", {
    x: 27.82,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  u: new KeyModel([80], "u", "U", {
    x: 32.1,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  i: new KeyModel([81], "i", "I", {
    x: 36.38,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  o: new KeyModel([82], "o", "O", {
    x: 40.66,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  p: new KeyModel([83], "p", "P", {
    x: 44.94,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  openBracket: new KeyModel([84], "openBracket", "[", {
    x: 49.22,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  closeBracket: new KeyModel([85], "closeBracket", "]", {
    x: 53.5,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  backSlash: new KeyModel([87], "return", "&crarr;", {
    x: 57.78,
    y: 33.75
  }, 6.42, 13.5, 0, 1, 2),
  delete: new KeyModel([88], "delete", "DEL", {
    x: 65.27,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  end: new KeyModel([89], "end", "END", {
    x: 69.55,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  pageDown: new KeyModel([90], "pageDown", "P-DN", {
    x: 73.83,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  numpad7: new KeyModel([91], "numpad7", "N-7", {
    x: 79.18,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  numpad8: new KeyModel([92], "numpad8", "N-8", {
    x: 83.46,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  numpad9: new KeyModel([93], "numpad9", "N-9", {
    x: 87.74,
    y: 33.75
  }, 4.28, 13.5, 0, 1, 2),
  add: new KeyModel([94], "add", "+", {
    x: 92.32,
    y: 33.75
  }, 4.28, 27, 0, 1, 2),
  capsLock: new KeyModel([97], "capsLock", "&#8682;", {
    x: 0,
    y: 47.25
  }, 7.49, 13.5, 0, 1, 2),
  a: new KeyModel([99], "a", "A", {
    x: 7.49,
    y: 47.25
  }, 4.28, 13.5, 0, 1, 2),
  s: new KeyModel([100], "s", "S", {
    x: 11.77,
    y: 47.25
  }, 4.28, 13.5, 0, 1, 2),
  d: new KeyModel([101], "d", "D", {
    x: 16.05,
    y: 47.25
  }, 4.28, 13.5, 0, 1, 2),
  f: new KeyModel([102], "f", "F", {
    x: 20.33,
    y: 47.25
  }, 4.28, 13.5, 0, 1, 2),
  g: new KeyModel([103], "g", "G", {
    x: 24.61,
    y: 47.25
  }, 4.28, 13.5, 0, 1, 2),
  h: new KeyModel([104], "h", "H", {
    x: 28.89,
    y: 47.25
  }, 4.28, 13.5, 0, 1, 2),
  j: new KeyModel([105], "j", "J", {
    x: 33.17,
    y: 47.25
  }, 4.28, 13.5, 0, 1, 2),
  k: new KeyModel([106], "k", "K", {
    x: 37.45,
    y: 47.25
  }, 4.28, 13.5, 0, 1, 2),
  l: new KeyModel([107], "l", "L", {
    x: 41.73,
    y: 47.25
  }, 4.28, 13.5, 0, 1, 2),
  semiColon: new KeyModel([108], "semiColon", ";", {
    x: 46.01,
    y: 47.25
  }, 4.28, 13.5, 0, 1, 2),
  singleQuote: new KeyModel([109], "singleQuote", "'", {
    x: 50.29,
    y: 47.25
  }, 4.28, 13.5, 0, 1, 2),
  return: new KeyModel([111], "backSlash", "\\", {
    x: 54.57,
    y: 47.25
  }, 9.63, 13.5, 0, 1, 2),
  numpad4: new KeyModel([115], "numpad4", "N-4", {
    x: 79.18,
    y: 47.25
  }, 4.28, 13.5, 0, 1, 2),
  numpad5: new KeyModel([116], "numpad5", "N-5", {
    x: 83.46,
    y: 47.25
  }, 4.28, 13.5, 0, 1, 2),
  numpad6: new KeyModel([117], "numpad6", "N-6", {
    x: 87.74,
    y: 47.25
  }, 4.28, 13.5, 0, 1, 2),
  shiftLeft: new KeyModel([121], "shiftLeft", "&#8679;-L", {
    x: 0,
    y: 61.75
  }, 5.50285714408, 13.5, 0, 1, 2),
  backTick: new KeyModel([122], "backTick", "`", {
    x: 5.502857144,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  z: new KeyModel([123], "z", "Z", {
    x: 9.78,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  x: new KeyModel([124], "x", "X", {
    x: 14.06,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  c: new KeyModel([125], "c", "C", {
    x: 18.34,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  v: new KeyModel([126], "v", "V", {
    x: 22.62,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  b: new KeyModel([127], "b", "B", {
    x: 26.90,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  n: new KeyModel([128], "n", "N", {
    x: 31.18,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  m: new KeyModel([129], "m", "M", {
    x: 35.46,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  coma: new KeyModel([130], "comma", ",", {
    x: 39.74,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  period: new KeyModel([131], "period", ".", {
    x: 44.02,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  forwardSlash: new KeyModel([132], "forwardSlash", "/", {
    x: 48.30,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  shiftRight: new KeyModel([135], "shiftRight", "&#8679;-R", {
    x: 52.43,
    y: 61.75
  }, 11.77, 13.5, 0, 1, 2),
  upArrow: new KeyModel([137], "upArrow", "&uarr;", {
    x: 69.55,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  numpad1: new KeyModel([139], "numpad1", "N-1", {
    x: 79.18,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  numpad2: new KeyModel([140], "numpad2", "N-2", {
    x: 83.46,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  numpad3: new KeyModel([141], "numpad3", "N-3", {
    x: 87.74,
    y: 61.75
  }, 4.28, 13.5, 0, 1, 2),
  NumPad_ENTER: new KeyModel([166], "NumPad_ENTER", "&ldsh;", {
    x: 92.32,
    y: 61.75
  }, 4.28, 27, 0, 1, 2),
  ctrLeft: new KeyModel([145], "ctrLeft", "CTR-L", {
    x: 0,
    y: 75.25
  }, 5.50285714408, 13.5, 0, 1, 2),
  leftWindowKey: new KeyModel([146], "leftWindowKey", "WIN-L", {
    x: 5.502857144,
    y: 75.25
  }, 5.07485714408, 13.5, 0, 1, 2),
  altLeft: new KeyModel([147], "altLeft", "ALT-L", {
    x: 11.00571431,
    y: 75.25
  }, 4.94645714408, 13.5, 0, 1, 2),
  space: new KeyModel([151], "space", "SPC", {
    x: 16.50857143,
    y: 75.25
  }, 25.68, 13.5, 0, 1, 2),
  altRight: new KeyModel([155], "altRight", "ALT-R", {
    x: 42.80611428,
    y: 75.25
  }, 5.49001714408, 13.5, 0, 1, 2),
  select: new KeyModel([156], "select", "FN", {
    x: 48.03382857,
    y: 75.25
  }, 5.50285714408, 13.5, 0, 1, 2),
  rightWindowKey: new KeyModel([157], "rightWindowKey", "WIN-R", {
    x: 53.37404572,
    y: 75.25
  }, 5.50285714408, 13.5, 0, 1, 2),
  ctrRight: new KeyModel([159], "ctrRight", "CTR-R", {
    x: 58.80628286,
    y: 75.25
  }, 5.5028571398, 13.5, 0, 1, 2),
  leftArrow: new KeyModel([160], "leftArrow", "&larr;", {
    x: 65.27,
    y: 75.25
  }, 4.28, 13.5, 0, 1, 2),
  downArrow: new KeyModel([161], "downArrow", "&darr;", {
    x: 69.55,
    y: 75.25
  }, 4.28, 13.5, 0, 1, 2),
  rightArrow: new KeyModel([162], "rightArrow", "&rarr;", {
    x: 73.83,
    y: 75.25
  }, 4.28, 13.5, 0, 1, 2),
  numpad0: new KeyModel([164], "numpad0", "N-0", {
    x: 79.18,
    y: 75.25
  }, 8.56, 13.5, 0, 1, 2),
  NumPad_Decimal: new KeyModel([165], "NumPad_Decimal", "N-.", {
    x: 87.74,
    y: 75.25
  }, 4.28, 13.5, 0, 1, 2),
  leftPipe: new KeyModel([0, 24, 48, 72, 96, 120, 144, 168, 192], "Left Pipe", "|-L", {
    x: -1.0272,
    y: 27
  }, 0, 54, 0, 1, 2),
  rightPipe: new KeyModel([71, 95, 119, 143, 167, 191, 215], "Right Pipe", "|-R", {
    x: 97.7552,
    y: 27
  }, 0, 54, 0, 1, 2),
  // shiftLeft: new KeyModel([122], "shiftLeft", "&#8679;-L", {
  //     x: 0,
  //     y: 0
  // }, 0, 0, 0, 1, 2)
};
