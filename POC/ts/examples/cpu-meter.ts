import { Keyboard, KeyInfo, KeyState } from "../../../src";
import { allColor } from "./all-color";

var os = require('os');

var idle = 0;
var percentage = 0;
var total_percentages = 0;
var total_percentage = 0;
var cores = 0;
var max_cores = 8; // max number keys used for live cpu display
var core_grouping = 1; // is incremented if cpu has more than max_cores
var last_core = 8; // the last number key used if coregrouping is being used
var current_group = 0; // the current group of cores if coregrouing is being used
var current_core = 0; // the core we are sampling
var color = '#000000';
var percentages: any = []; // stores colours for number keys
var history: any = []; // total percentage history
var starting = true;
var last_run = os.cpus();
var diff = 0; // used to calc difference between runs
var total = 0; // sum of all usage types
var live_total_key = 0; // the key that displays the live total, last_core + 1

function percent_to_color(percent: number) {
   switch(true) {
      case (percent < 10):
        color = '#00FF00';
        break;
      case (percent < 20):
        color = '#80FF00';
        break;
      case (percent < 40):
        color = '#FFFF00';
        break;
      case (percent < 70):
        color = '#FF8000';
        break;
      case (percent < 90):
        color = '#FF5500';
        break;
      default:
        color = '#FF0000';
        break;
    }
    return color;
}

export function cpuMeter(keyboard: Keyboard) {
  var ki = Object.keys(KeyInfo["en-US"]);
  var cpus = os.cpus();
  
  if (starting) {
    console.log('INIT sampling');
    starting = false;
    cores = cpus.length;
    if (cores > max_cores) {
      while ((cores / core_grouping) > max_cores) {
        core_grouping = core_grouping * 2;
      }
      last_core = cores / core_grouping;
    }
    live_total_key = +last_core + +1;
  } else {
    total_percentages = 0;
    current_group = 0;
    current_core = 0;
    while (current_core < cores) {
      var sum = 0;
      total = 0;
      idle = 0;
      for (var cg = 0; cg < core_grouping; cg++) {
        var previous = last_run[current_core];
        var cpu = cpus[current_core];
        current_core++;
        for(var type in cpu.times) {
          diff = cpu.times[type] - previous.times[type];
          if (type == 'idle') {
            idle += diff;
          }
          total += diff;
        }
      }
      percentage = Math.round(100 - (idle / total) * 100);
      total_percentages += percentage;
      color = percent_to_color(percentage);
      var h = +current_group + +1;
      percentages[h] = color;
      current_group++;
    }

    total_percentage = total_percentages / cores;

    percentages[live_total_key] = percent_to_color(total_percentage);

    for (var j = 0; j < ki.length; j++) {
      var key_name = String(ki[j]);
      var pattern = new RegExp("numpad[1-" + last_core + "]|numpad" + live_total_key);
      if (pattern.test(key_name)) {
        var cpu_core = key_name[key_name.length -1];
        color = percentages[cpu_core];
        var key = KeyInfo["en-US"][ki[j]];
        keyboard.setKeyState(new KeyState(key)
          .setToColorHex(color)
          .setUpIncrement(1)
          .setUpIncrementDelay(5)
          .setDownDecrement(1)
          .setDownDecrementDelay(5)
          .setMoveUp()
          .setApplyDelayed()
        );
      }
    }
    // total percentage history, note reading keys backwards.
    var counter = history.length -1;
    var sample = 2;
    var loops = 0;
    for (var j = ki.length - 1; j >= 0; j--) {
      var key_name = String(ki[j]);
      var pattern = /(f[1-9]|printScreen|screenLock|pause)/g;
      if (pattern.test(key_name)) {
        var sum = 0;
        if (counter >= 0) {
          if (loops < 5) { // pause, scr-lk, prt-sc, f12, f11. each key represents a prior seconds sample
            sum += history[counter];
            counter--;
            loops++;
          } else { // f10-f1 sample size increases exponentially as it moves left, eg f10 = 2 samples, f9 = 4 samples, f8 = 8 samples etc
            for (var s = 0; s < sample; s++) {
              if (counter >= 0) {
                sum += history[counter];
                counter--;
              } else {
                break;
              }
            }
            sum = sum /sample;
            sample = sample * 2;
            if (sample > 1024) {
              history.shift();
            }
          }

          color = percent_to_color(sum);
          
          var key = KeyInfo["en-US"][ki[j]];
          keyboard.setKeyState(new KeyState(key)
            .setToColorHex(color)
            .setUpIncrement(1)
            .setUpIncrementDelay(5)
            .setDownDecrement(1)
            .setDownDecrementDelay(5)
            .setMoveUp()
            .setApplyDelayed()
          );
        } else {
          break;
        }
      }
    }
    history.push(total_percentage);
  }

  last_run = cpus;
  keyboard.apply();
  setTimeout(cpuMeter, 1000, keyboard);
}