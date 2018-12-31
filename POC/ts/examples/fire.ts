import { Keyboard, KeyInfo, ChannelState } from "../../../src";
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

export function fire(keyboard: Keyboard, region: string) {

	if (region == 'uk') {
		var ki = Object.keys(KeyInfo["en-GB"]);
	} else {
		var ki = Object.keys(KeyInfo["en-US"]);
	}
	
	// hand picked flame colours, from base to top
	var colorArray = [
		"194,99,15",
		"213,57,11",
		"255,47,10",
		"98,20,9",
		"35,12,9",
		"10,10,10",
		"6,6,6"
	];

	allColor(keyboard, "#0A0A0A"); // init ash

	let baseRow = rangeBetween(145,166);
	shuffle(baseRow);
	type channel = "red" | "green" | "blue";
	let baseRed: number = 0;
	let baseGreen: number = 0;
	let baseBlue: number = 0;
	let highRed: number = 255;
	let highGreen: number = 255;
	let highBlue: number = 255;
	let redRange: number = 0;
	let greenRange: number = 0;
	let blueRange: number = 0;
	let maxLevel: number = 255;
	let minLevel: number = 0;
	let increment: number = 1;
	let incDelay: number = 1;
	let currentRow = 0;
	let maxDiff: number = 0;
	let delay: number = 0;

	while (baseRow.length > 0) { // loop through bottom row of keys
		let downHoldDelay  = Math.floor(Math.random()*75+50);
		let upHoldDelay  = Math.floor(Math.random()*550+200);
		let startKey = baseRow.pop();
		currentRow = 0;
		delay = 0; // reset delay so we start with a flare of fire
		while((startKey != undefined)&&(startKey >= 25)) { // loop up keyboard from bottom key (set column of keys)
			var test = 0;
			maxDiff = 0;
			for (var i = ki.length - 1; i >= 0; i--) {
				if (KeyInfo["en-GB"][ki[i]].ledIds[0].id == startKey) {
					var test = i;
					break;
				}
			}
			var baseColour = colorArray[currentRow].split(',');
			// console.log(baseColour);
			baseRed = Number(baseColour[0]);
			baseGreen = Number(baseColour[1]);
			baseBlue = Number(baseColour[2]);

			currentRow++; // each key takes a base colour (current row of colorarray), then we increment and take the row above for the alt colour, the key then cycles between them

			var highColour = colorArray[currentRow].split(',');
			// console.log(highColour);
			highRed = Number(highColour[0]);
			highGreen = Number(highColour[1]);
			highBlue = Number(highColour[2]);

			// this code calcs which channel has the biggest change
			if (highRed > baseRed ) {
				redRange = highRed - baseRed;
			} else {
				redRange = baseRed - highRed;
			}
			maxDiff = redRange;

			if (highGreen > baseGreen ) {
				greenRange = highGreen - baseGreen;
			} else {
				greenRange = baseGreen - highGreen;
			}
			if (greenRange > maxDiff) {
				maxDiff = greenRange;	
			}

			if (highBlue > baseBlue ) {
				blueRange = highBlue - baseBlue;
			} else {
				blueRange = baseBlue - highBlue;
			}
			if (blueRange > maxDiff) {
				maxDiff = blueRange;	
			}

			if (test > 0) { // only apply if key exists
				var key = KeyInfo["en-GB"][ki[i]];
				for (var chan = 0; chan < 3; chan++) {
					
					let chanName: channel = "red";
					// this code sets the colour values for the appropriate channel and adds incrementdelays to channels with smaller changes.
					if (chan == 1) {
						chanName = "green";
						maxLevel = highGreen;
						minLevel = baseGreen;
						incDelay  = Math.round(maxDiff/greenRange); // this is sloppy, I feel that it should still go out of sync without remainders being accounted for but for some reason it works fine?
					} else if (chan == 2) {
						chanName = "blue";
						maxLevel = highBlue;
						minLevel = baseBlue;
						incDelay  = Math.round(maxDiff/blueRange);
					} else {
						maxLevel = highRed;
						minLevel = baseRed;
						incDelay  = Math.round(maxDiff/redRange);
					}

					if (incDelay == Infinity) { // difference can be zero
						incDelay  = 0;
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
					.setUpHoldDelay(upHoldDelay)
					.setDownHoldDelay(downHoldDelay)
					.setStartDelay(delay)
					.setTransition(true)
					.setDecrementIncrement()
					.setApplyDelayed()
					)
				}
			}
			startKey -= 24; // key above current key
			delay += 1;	// flame rise rate
		}
	}
	console.log('flame on');
}
