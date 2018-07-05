import PQueue from "p-queue";

import { BrightnessPacket } from "./internal/models/packets/brightness-packet";
import { FirmwarePacket } from "./internal/models/packets/firmware-packet";
import { FreezePacket } from "./internal/models/packets/freeze-packet";
import { InitializePacket } from "./internal/models/packets/initialize-packet";
import { TriggerPacket } from "./internal/models/packets/trigger-packet";
import { KeyState } from "./key-state";

import { findUsbDevice, Usb } from "./usb";

type Action = () => void;

export class Keyboard {
  private isInitialized: boolean = false;
  private sequence: number = 0;
  private usbDevice: Usb | undefined;

  private intervalRef: NodeJS.Timer | undefined;

  private queue = new PQueue({
    autoStart: false,
    concurrency: 1,
  });
  /**
   * Find a keyboard.
   *
   * @param {number} [vendorId] For DAS the id is 0x24F0
   * @param {number} [productId] Ex: For the Q5 the id is 0x2020
   * @param {number} [deviceInterface]
   * @param {number} [usage]
   * @memberof Keyboard
   */
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

    this.isInitialized = true;
    this.queue.start();
  }

  /**
   * Sets an array of KeyStates to the keyboard
   */
  public setKeyState(states: KeyState[] | KeyState): Promise<void> {
    let promise: Promise<void>;

    if (Array.isArray(states)) {
      const promises: Array<Promise<void>> = [];

      for (const state of states) {
        const p = this.queue.add(() => {
          return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              this.executePackets(state);
              resolve();
            }, 100);
          });
        }) as Promise<void>;

        promises.push(p);
      }

      promise = Promise.all(promises).then(() => { return; });
    } else {
      promise = this.queue.add(() => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            this.executePackets(states);
            resolve();
          }, 100);
        });
      }) as Promise<void>;
    }

    return promise;
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
      this.isInitialized = false;
      if (this.intervalRef !== undefined) {
        clearInterval(this.intervalRef);
      }
      this.usbDevice.disconnect();
      this.usbDevice = undefined;
    }
  }

  private executePackets(keyState: KeyState) {
    for (const aPacket of keyState.build()) {
      this.featureReports(aPacket);
    }
  }

  private featureReports(report: number[]) {
    // Let's create the buffer
    const buff = [0 /* report id */, ...report];
    // Pad out to 64 bytes
    while (buff.length < 65) {
      buff.push(0);
    }
    // Place our sequence number into the packet
    buff[3] = this.sequence;
    // Send the packet to the device;
    this.writeDataToDevice(buff);
    /*
      Next, we're going to read from the device. This is done so that we can make sure
      the device accepted our write.
     */
    const res = this.readDataFromDevice();
    /*
      The idea here is that the device should acknowledge our command.

      NEED TO EXPLAIN WHY WE'RE LOOKING AT POSITION 2 AND WHY IT SHOULDN'T BE 0x14.

      When looking at the read we shouldn't see our sequence in position 3.
     */
    if (res[2] !== 0x14 || res[3] !== this.sequence) {
      throw new Error("no ack " + this.sequence);
    }

    // Increement the sequenece
    this.sequence++;
    // Make sure we don't overflow the sequence value!
    if (this.sequence > 0xFF) { this.sequence = 0x00; }
  }

  private readDataFromDevice(): number[] {
    if (typeof this.usbDevice === "undefined") {
      throw new Error("Not connected to device");
    }
    try {
      return this.usbDevice.read();
    } catch(e) {
      console.warn(e);
      return [];
    }
  }

  private writeDataToDevice(data: number[]) {
    if (typeof this.usbDevice === "undefined") {
      throw new Error("Not connected to device");
    }
    this.usbDevice.write(data);
  }
}
