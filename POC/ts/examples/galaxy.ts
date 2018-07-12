import { Keyboard, KeyInfo, KeyState } from "../../../src";
import { allColor } from "./all-color";

function shuffle(array: any): any {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export function galaxy(keyboard: Keyboard, region: string) {

  allColor(keyboard, "#000000");
  var mySelector = [];
  for (var i = 0; i < 216; i++) {
    mySelector.push(i);
  }

  if (region == 'uk') {
    var ki = Object.keys(KeyInfo["en-GB"]);
  } else {
    var ki = Object.keys(KeyInfo["en-US"]);
  }

  ki = shuffle(ki);
  var ffs = ki.length;
  var color_array = [];
  var target_array = [];
  var delay_array = [];
  let randomKey: any = 0;
  const c = ['7D008E', '1A0478', '6B5D9E', '9398D7', '3F70B4'];
  const d = ['140751', '160124', '140034', '07001D', '30053F'];
  for (var i = 0; i < ffs; i++) {
    target_array.push([ki[i]]);
    delay_array.push(i * 20);
    color_array.push(c[Math.floor(Math.random() * c.length)]);
  }

  for (var index = 0; index < color_array.length; index++) {
    var color_arg = color_array[index];
    var key_array = target_array[index];
    var startDelay = delay_array[index];
    var back_color = (d[Math.floor(Math.random() * d.length)]);

    for (var i = 0; i < key_array.length; i++) {
      if (region == 'uk') {
        var key = KeyInfo["en-GB"][key_array[i]];
      } else {
        var key = KeyInfo["en-US"][key_array[i]];
      }

      keyboard.setKeyState(new KeyState(key)
        .setToColorHex("#" + color_arg)
        .setFromColorHex("#" + back_color)
        .setUpMaximum("#" + back_color)
        .setUpIncrement(50)
        .setUpIncrementDelay(10)
        .setDownDecrement(50)
        .setDownDecrementDelay(5)
        .setUpHoldDelay(5)
        .setDownHoldDelay(900)
        .setStartDelay(startDelay)
        .setTransitionReverse()
        .setApplyDelayed()
      );
    }

  }
}
