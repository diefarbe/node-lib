let seq = 0;

export function featureReports(device: any, report: number[]) {
	let buff = [0 /* report id */, ...report];
	while (buff.length < 65) {
		buff.push(0);
	}
	seq++;
	buff[3] = seq;
	device.sendFeatureReport(buff);
	let res = device.getFeatureReport(0, 65);
	if (res[2] != 0x14 || buff[3] != seq) {
		throw new Error("no ack");
	}
}

export function setKeyChannel(device: any, key: number, channel: number, value: number) {
	featureReports(device, [
		0, 0x28, 0, channel, 1, key, 2, value, 0, (value < 12 ? 1 : value / 12), 0, 5, 0, value, 0, 0,
		0, 0, 0, (value < 12 ? 1 : value / 12), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0x40,
	]);
}

export function init(device: any) {
	featureReports(device, [0, 0x13, 0x0, 0x4d, 0x43, 0x49, 0x51, 0x46, 0x49, 0x46, 0x45, 0x44,
		0x4c, 0x48, 0x39, 0x46, 0x34, 0x41, 0x45, 0x43, 0x58, 0x39, 0x31, 0x36,
		0x50, 0x42, 0x44, 0x35, 0x50, 0x33, 0x41, 0x33, 0x30, 0x37, 0x38,]);
}

export function setRgb(device: any, key: number, r: number, g: number, b: number) {
	const channelgroups =
		"0000000000000000000000000" +
		"000000000111111122222222" +
		"00000000011111122222222" +
		"0000000001111111111222222" +
		"00000000011111122222222" +
		"0000000000111111122222222" +
		"000000000011111122222222" +
		"0000000000000000000000000";
	
	const red = [0, 1, 2];
	const green = [1, 2, 0];
	const blue = [2, 0, 1];
	
	let channelgroup = Number.parseInt(channelgroups.charAt(key)) & 3;
	setKeyChannel(device, key, red[channelgroup], r);
	setKeyChannel(device, key, green[channelgroup], g);
	setKeyChannel(device, key, blue[channelgroup], b);
}

export function apply(device: any) {
	featureReports(device, [0, 0x2d, 0, 0x0f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
		0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
		0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,]);
}