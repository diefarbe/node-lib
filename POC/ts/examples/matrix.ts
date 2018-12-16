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

export function matrix(keyboard: Keyboard, region: string) {

	if (region == 'uk') {
		var ki = Object.keys(KeyInfo["en-GB"]);
	} else {
		var ki = Object.keys(KeyInfo["en-US"]);
	}
	
	var color = 'green';

	switch (color) {
		case "red": {
			var to_color = "#FF0000";
			var from_color = "#080000";
			break;
		}

		case 'blue': {
			var to_color = "#0000FF";
			var from_color = "#000008";
			break;	
		}
		
		case 'pink': {
			var to_color = "#FF00FF";
			var from_color = "#080008";
			break;
		}

		case 'teal': {
			var to_color = "#00FFFF";
			var from_color = "#000808";
			break;
		}

		case 'yellow': {
			var to_color = "#FFFF00";
			var from_color = "#080800";
			break;
		}

		case 'lights': {
			var to_color = "#FF8000";
			var from_color = "#080400";
			break;
		}

		default: {
			var to_color = "#00FF00";
			var from_color = "#000800";
			break;
		}
	}

	allColor(keyboard, from_color);

	var topRow = [0,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,71]; // top row id's + pipes
	shuffle(topRow);
	var masterdelay = 0;
	while (topRow.length > 0) {
		var delay = Math.floor(Math.random()*500+5) + masterdelay;
		var multiplyer_A  = Math.floor(Math.random()*5+1);
		var multiplyer_B  = Math.floor(Math.random()*5+1);
		var multiplyer_C  = Math.floor(Math.random()*5+1);
		var multiplyer_D  = Math.floor(Math.random()*50+1);
		var startKey = topRow.pop();

		// console.log('startKey:', startKey);

		while((startKey != undefined)&&(startKey < 216)) { // top left pipe is id 0 and typescript doesn't like that
			
			var test = 0;
			for (var i = ki.length - 1; i >= 0; i--) { // ideally this would be cached ID => ki[?], but i'm sick of fighting ts
				if (KeyInfo["en-GB"][ki[i]].ledIds[0].id == startKey) {
					var test = i;
					// console.log(test);
					break;
				}
			}
			if (test > 0) { // only apply if key exists
				var key = KeyInfo["en-GB"][ki[i]];
				 keyboard.setKeyState(new KeyState(key)
				.setToColorHex(to_color)
				.setFromColorHex(from_color)
				.setDownMinimum(from_color)
				.setUpIncrement(20 * multiplyer_A)
				.setUpIncrementDelay(10 * multiplyer_B)
				.setDownDecrement(5 * multiplyer_C)
				.setDownDecrementDelay(1 * multiplyer_C)
				.setUpHoldDelay(70)
				.setDownHoldDelay(350)
				.setStartDelay(delay)
				.setTransitionReverse()
				.setApplyDelayed()
				)
				
			}
			startKey += 24; // key below current key
			delay += 15;	// fall rate
			
		}
		// console.log('new key');
		masterdelay += 50;
	}
}
console.log('started, note lots of long delays at the start for randomness')