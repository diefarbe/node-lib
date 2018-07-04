import { Device, devices, HID } from "node-hid";
import { BrightnessPacket } from "./internal/models/packets/brightness-packet";
import { FirmwarePacket } from "./internal/models/packets/firmware-packet";
import { FreezePacket } from "./internal/models/packets/freeze-packet";
import { InitializePacket } from "./internal/models/packets/initialize-packet";
import { TriggerPacket } from "./internal/models/packets/trigger-packet";
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

    this.featureReports(new InitializePacket().buildPacketBytes());

    this.isInitialized = true;
  }

  /**
   * Sets an array of KeyStates to the keyboard
   */
  public setKeyState(states: KeyState[] | KeyState) {
    if (Array.isArray(states)) {
      for (const state of states) {
        this.executePackets(state);
      }
    } else {
      this.executePackets(states);
    }
  }

  /**
   * Sets the brightness of the keyboard
   * @param brightness 0 - 63
   */
  public setBrightness(brightness: number) {
    this.featureReports(new BrightnessPacket(brightness).buildPacketBytes());
  }

  /**
   * Freezes the current effects on the keyboard
   * @param brightness 0 - 63
   */
  public freezeEffects() {
    this.featureReports(new FreezePacket().buildPacketBytes());
  }

  /**
   * Executes any pending color commands on the keyboard.
   */
  public apply() {
    this.featureReports(new TriggerPacket().buildPacketBytes());
  }

  public getFirmwareVersion() {
    this.featureReports(new FirmwarePacket().buildPacketBytes());
    const fwVer = this.readData();
    return fwVer[3] + "." + fwVer[4] + "." + fwVer[5] + "." +  fwVer[6] + "." +  fwVer[7];
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

  private readData(): number[] {
    if (this.hidDevice === undefined) {
      throw new Error("The HID device is undefined.");
    }
    const res = this.hidDevice.getFeatureReport(0, 65);
    if (process.platform === "darwin") {
      res.unshift(0);
    }
    return res;
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
    if (this.sequence > 0xFF) { this.sequence = 0x00; }
    buff[3] = this.sequence;
    this.hidDevice.sendFeatureReport(buff);
    const res = this.readData();
    if (res[2] !== 0x14 || res[3] !== this.sequence) {
      throw new Error("no ack " + this.sequence);
    }
  }
}
