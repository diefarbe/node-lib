import { ChannelState } from "./channel-state";
import { BrightnessPacket } from "./internal/models/packets/brightness-packet";
import { FirmwarePacket } from "./internal/models/packets/firmware-packet";
import { FreezePacket } from "./internal/models/packets/freeze-packet";
import { InitializePacket } from "./internal/models/packets/initialize-packet";
import { TriggerPacket } from "./internal/models/packets/trigger-packet";
import { KeyState } from "./key-state";
import { findUsbDevice, Usb } from "./usb";

export class Keyboard {
  private usbDevice: Usb | undefined;
  private sequence: number = 0;

  public find(vendorId?: number, productId?: number, deviceInterface?: number, usage?: number): Usb {
    this.usbDevice = findUsbDevice(vendorId || 0x24f0,
      productId || 0x2020,
      deviceInterface || 2,
      usage || 165);

    this.usbDevice.connect();

    return this.usbDevice;
  }

  /**
   * Initializes the keyboard so we can communicate with it.
   */
  public initialize() {
    if (this.usbDevice === undefined) {
      throw new Error("No HID keyboard device has been found.");
    }

    this.featureReports(new InitializePacket().buildPacketBytes());
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
   * Sets a KeyState channel to the keyboard (advanced)
   */
  public setKeyColorChannel(state: ChannelState) {
    for (const aPacket of state.build()) {
      this.featureReports(aPacket);
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

  public getKeyboardData() {
    this.featureReports(new FirmwarePacket().buildPacketBytes());
    const fwVer = this.readDataFromDevice();
    return {
      firmware: fwVer[4] + "." + fwVer[5] + "." + fwVer[6] + "." + fwVer[7],
      packetCount: fwVer[3],
    };
  }

  /**
   * Disconnects from the keyboard. Does nothing if already disconnected or not initialized.
   */
  public close() {
    if (typeof this.usbDevice !== "undefined") {
      this.usbDevice.disconnect();
      this.usbDevice = undefined;
    }
  }

  private executePackets(state: KeyState) {
    for (const aPacket of state.build()) {
      this.featureReports(aPacket);
    }
  }

  private featureReports(report: number[]) {
    const buff = [0 /* report id */, ...report];
    while (buff.length < 65) {
      buff.push(0);
    }
    buff[3] = this.sequence;

    this.writeDataToDevice(buff);
    const res = this.readDataFromDevice();
    if (res[2] !== 0x14 || res[3] !== this.sequence) {
      throw new Error("no ack " + this.sequence);
    }

    this.sequence++;
    if (this.sequence > 0xFF) { this.sequence = 0x00; }
  }

  private readDataFromDevice(): number[] {
    if (typeof this.usbDevice === "undefined") {
      throw new Error("Not connected to device");
    }
    return this.usbDevice.read();
  }

  private writeDataToDevice(data: number[]) {
    if (typeof this.usbDevice === "undefined") {
      throw new Error("Not connected to device");
    }
    this.usbDevice.write(data);
  }
}
