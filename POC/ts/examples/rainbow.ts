import { Keyboard, KeyInfo, ChannelState } from "../../../src";
import { allColor } from "./all-color";

// function range(size:number, startAt:number = 0):ReadonlyArray<number> {
//     return [...Array(size).keys()].map(i => i + startAt);
// }

function rangeBetween(startNo:number, endNo:number) {
	var rangeArray = [];
	if (startNo > endNo) {
		for (var i = startNo; i >= endNo; i--) {
			rangeArray.push(i);
		}
	} else {
		for (var i = startNo; i <= endNo; i++) {
			rangeArray.push(i);
		}
	}
	return rangeArray;
}

export function rainbow(keyboard: Keyboard, region: string) {

	allColor(keyboard, "#000000"); // blackout keyboard
	var multiplier = 25; // delay between rows
	var maxLevel = 255; // channel goes to full brightness (note using more than 255 will work but spill over into brightness: breaking the brightness key at some level)
	var minLevel = 0; // channel goes fully off
	var increment = 1; // increment step up and down
	var incDelay = 0; // hold time for each increment step
	var holdfor = 255; // hold time at max/min levels

	// these values can be changed but have to sync up
	// pattern = DOWN(for 255) -(255 transition)-> UP(for 255) -(255 transition)-> DOWN etc
	// = 255 * 4 = 1020 (cycle time)
	// 1024 / 3 = 340 (channel delay offset)
	// if your (DOWN + GOING UP + UP + GOING DOWN) doesn't cleanly divide by 3 (RGB Channels) it will go out of sync and the colours will cycle unpredictably

	if (region == 'uk') {
		var ki = Object.keys(KeyInfo["en-GB"]);
	} else {
		var ki = Object.keys(KeyInfo["en-US"]);
	}

	var Lookup = [];
	for (var i = 0; i < 215; i++) {
		Lookup.push(215);
	}
	for (var i = ki.length - 1; i >= 0; i--) { // cache led_ID => ki[?]
		let temp = KeyInfo["en-GB"][ki[i]].ledIds[0].id
		Lookup[temp] = i;
	}
	// console.log(Lookup);

	var target_array = [];
	var row = [];
	var startDelay = 0;
	
	// array of led_IDs for each row
	row.push(rangeBetween(145,166)); // row 0, contains spacebar
	row.push(rangeBetween(121,142)); // row 1
	row.push(rangeBetween(97,118)); // row 2
	row.push(rangeBetween(73,94)); // row 3
	row.push(rangeBetween(49,70)); // row 4
	// row.push(rangeBetween(25,42)); // row 5 minus media keys and Q knob
	row.push(rangeBetween(18,47)); // row 5 with media and Q knob

	// add lighpipes to row 5
	var leftPipe = [0, 24, 48, 72, 96, 120, 144, 168, 192];
	var rightPipe = [71, 95, 119, 143, 167, 191, 215];
	type channel = "red" | "green" | "blue";
	for (var i = leftPipe.length - 1; i >= 0; i--) {
		row[5].push(leftPipe[i]);
	}
	for (var i = rightPipe.length - 1; i >= 0; i--) {
		row[5].push(rightPipe[i]);
	}
	
	// set up rows, bottom to top
	for (var i = 0; i < row.length; i++) {
		target_array.push(row[i]);
	}

	// uncomment next line if you want animation to flow down keyboard instead of up
	// target_array.reverse();

	for (var index = 0; index < target_array.length; index++) {
		// console.log('row: ', index);
		var key_array = target_array[index];

		for (var this_key = 0; this_key < key_array.length; this_key++) {
			var target_key = key_array[this_key];
			// console.log("target_key: ", target_key);
			var test = Lookup[target_key];
			if (test < 215) { // 215 means the key doesn't exist in culture code
				// console.log(test);
				var key = KeyInfo["en-GB"][ki[test]];
				if (key) { // only apply if key exists
					// console.log("key: ", key);
					for (var chan = 0; chan < 3; chan++) {
						var delay = (340 * chan) + (index * multiplier); // delay offsets the channels
						let chanName: channel = "red";
						if (chan == 1) {
							chanName = "green";
						} else if (chan == 2) {
							chanName = "blue";
						}
						
						keyboard.setKeyColorChannel(new ChannelState(key, chanName)
						.setUpHoldLevel(maxLevel)
						.setUpMaximumLevel(maxLevel)
						.setDownHoldLevel(minLevel)
						.setDownMinimumLevel(minLevel)
						.setUpIncrement(increment)
						.setUpIncrementDelay(incDelay)
						.setDownDecrement(increment)
						.setDownDecrementDelay(incDelay)
						.setUpHoldDelay(holdfor)
						.setDownHoldDelay(holdfor)
						.setStartDelay(delay)
						.setTransition(true)
						.setDecrementIncrement()
						// .enableTransition()
						.setApplyDelayed()
						)
					}
				}
			}
		}
	}
	console.log('warming up keyboard...');
}
