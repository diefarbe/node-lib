import { Device, devices, HID } from "node-hid";

export class Keyboard {


  private interface: number;
  private vendorId: number;
  private productId: number;

  private device: Device | undefined;
  private hidDevice: HID | undefined;

  private isInitialized: boolean = false;

  private sequence: number = 0;

  constructor(vendorId?: number, productId?: number, deviceInterface?: number) {
    this.vendorId = vendorId || 0x24f0;
    this.productId = productId || 0x2020;
    this.interface = deviceInterface || 2;
  }

  public find(): HID {
    const device = devices().find((d: Device) => {
      return d.vendorId == this.vendorId && d.productId == this.productId && d.interface == this.interface;
    });

    if (device === undefined) {
      throw new Error("no deviceInfo");
    }

    this.device = device;

    if (this.device.path === undefined) {
      throw new Error("Unable to find device path");
    }

    this.hidDevice = new HID(this.device.path);

    return this.hidDevice;
  }

  public initialize() {
    if (this.hidDevice === undefined) {
      this.find();
    }

    if (this.hidDevice === undefined) {
      throw new Error("No HID keyboard device has been found.");
    }

    this.featureReports([0, 0x13, 0x0, 0x4d, 0x43, 0x49, 0x51, 0x46, 0x49, 0x46, 0x45, 0x44,
      0x4c, 0x48, 0x39, 0x46, 0x34, 0x41, 0x45, 0x43, 0x58, 0x39, 0x31, 0x36,
      0x50, 0x42, 0x44, 0x35, 0x50, 0x33, 0x41, 0x33, 0x30, 0x37, 0x38,]);

    this.isInitialized = true;
  }

  setRgb(key: number, r: number, g: number, b: number) {
    if (!this.isInitialized) {
      throw new Error("The HID keyboard device is not initialized");
    }

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
    this.setKeyChannel(key, red[channelgroup], r);
    this.setKeyChannel(key, green[channelgroup], g);
    this.setKeyChannel(key, blue[channelgroup], b);
  }

  public apply() {
    this.featureReports([0, 0x2d, 0, 0x0f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,]);
  }

  public close() {
    if (this.hidDevice === undefined) {
      throw new Error("");
    }

    this.hidDevice.close();

    this.device = undefined;
    this.hidDevice = undefined;
    
    this.isInitialized = false;
  }

  private featureReports(report: number[]) {
    if (this.hidDevice === undefined) {
      throw new Error("The HID device is undefined.");
    }

    let buff = [0 /* report id */, ...report];
    while (buff.length < 65) {
      buff.push(0);
    }
    this.sequence++;
    buff[3] = this.sequence;
    console.log(this.hidDevice.sendFeatureReport(buff));
    let res = this.hidDevice.getFeatureReport(0, 65);
    console.log(res);
    if (res[2] != 0x14 || buff[3] != this.sequence) {
      throw new Error("no ack");
    }
  }

  private setKeyChannel(key: number, channel: number, value: number) {
    this.featureReports([
      0, 0x28, 0, channel, 1, key, 2, value, 0, (value < 12 ? 1 : value / 12), 0, 5, 0, value, 0, 0,
      0, 0, 0, (value < 12 ? 1 : value / 12), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0x40,
    ]);
  }
}