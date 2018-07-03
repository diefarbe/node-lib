import { Device, devices, HID } from "node-hid";
import { KeyState } from "./key-state";

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

  /**
   * Finds and connects to the keyboard. It also returns the HID, but this is probably useless.
   *
   * @returns {HID}
   */
  public find(): HID {
    const device = devices().find((d: Device) => {
      if (process.platform === "darwin") {
        return d.vendorId === this.vendorId && d.productId === this.productId && d.usage === 165;
      } else {
        return d.vendorId === this.vendorId && d.productId === this.productId && d.interface === this.interface;
      }
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

  /**
   * Initializes the keyboard so we can communicate with it.
   */
  public initialize() {
    if (this.hidDevice === undefined) {
      this.find();
    }

    if (this.hidDevice === undefined) {
      throw new Error("No HID keyboard device has been found.");
    }

    this.featureReports([0, 0x13, 0x0, 0x4d, 0x43, 0x49, 0x51, 0x46, 0x49, 0x46, 0x45, 0x44,
      0x4c, 0x48, 0x39, 0x46, 0x34, 0x41, 0x45, 0x43, 0x58, 0x39, 0x31, 0x36,
      0x50, 0x42, 0x44, 0x35, 0x50, 0x33, 0x41, 0x33, 0x30, 0x37, 0x38]);

    this.isInitialized = true;
  }

  /**
   * Sets an array of KeyStates to the keyboard
   */
  public set(states: KeyState[] | KeyState) {
    if (Array.isArray(states)) {
      for (const state of states) {
        this.executePackets(state);
      }
    } else {
      this.executePackets(states);
    }

  }

  /**
   * Executes any pending color commands on the keyboard.
   */
  public apply() {
    this.featureReports([0, 0x2d, 0, 0x0f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
  }

  /**
   * Disconnects from the keyboard. Does nothing if already disconnected or not initialized.
   */
  public close() {
    if (this.hidDevice !== undefined) {
      this.hidDevice.close();

      this.device = undefined;
      this.hidDevice = undefined;

      this.isInitialized = false;
    }
  }

  private executePackets(state: KeyState) {
    for (const aPacket of state.build()) {
      this.featureReports(aPacket);
    }
  }

  private featureReports(report: number[]) {
    if (this.hidDevice === undefined) {
      throw new Error("The HID device is undefined.");
    }

    const buff = [0 /* report id */, ...report];
    while (buff.length < 65) {
      buff.push(0);
    }
    this.sequence++;
    if (this.sequence > 0xFF) this.sequence = 0x00; 
    buff[3] = this.sequence;
    this.hidDevice.sendFeatureReport(buff);
    const res = this.hidDevice.getFeatureReport(0, 65);
    if (process.platform === "darwin") {
      res.unshift(0);
    }
    if (res[2] !== 0x14 || res[3] !== this.sequence) {
      throw new Error("no ack " + this.sequence);
    }
  }
}
