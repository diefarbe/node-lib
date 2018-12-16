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

export function xmas(keyboard: Keyboard, region: string) {
	// xmas lights, exploits firmware stupidity to cycle through unspecified colours
	allColor(keyboard, "#000000");

	if (region == 'uk') {
		var ki = Object.keys(KeyInfo["en-GB"]);
	} else {
		var ki = Object.keys(KeyInfo["en-US"]);
	}

	ki = shuffle(ki);
	
	var startDelay = 20;

	for (var i = 0; i < ki.length; i++) {
		if (region == 'uk') {
			var key = KeyInfo["en-GB"][ki[i]];
		} else {
			var key = KeyInfo["en-US"][ki[i]];
		}

		keyboard.setKeyState(new KeyState(key)
			.setToColorHex("#FF1010")
			.setFromColorHex("#00FF00")
			.setUpMaximum("#FF0000")
			.setUpIncrement(50)
			.setUpIncrementDelay(10)
			.setDownDecrement(50)
			.setDownDecrementDelay(5)
			.setUpHoldDelay(250)
			.setDownHoldDelay(250)
			.setStartDelay(startDelay * i)
			.setTransitionReverse()
			.setApplyDelayed()
		);
	}
}
