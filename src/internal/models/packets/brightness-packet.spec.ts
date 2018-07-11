import { BrightnessPacket } from "./brightness-packet";

describe("BrightnessPacket", () => {
  it("should produce 32 byte packet.", () => {
    const brightnessValue = 10;
    const packet = new BrightnessPacket(brightnessValue);
    const bytes = packet.buildPacketBytes();

    expect(bytes.length).toEqual(32);
  });

  it("should set the brightness value to the correct position.", () => {
    const brightnessValue = 10;
    const packet = new BrightnessPacket(brightnessValue);
    const bytes = packet.buildPacketBytes();
    
    expect(bytes[3]).toEqual(brightnessValue);
  });

  it("should have '43' set for the byte at position 1.", () => {
    const brightnessValue = 10;
    const packet = new BrightnessPacket(brightnessValue);
    const bytes = packet.buildPacketBytes();
    
    expect(bytes[1]).toEqual(43);
  });

  it("should not except a value greater than 63 for the brightness value.", () => {
    const brightnessValue = 77;
    const packet = new BrightnessPacket(brightnessValue);

    expect(() => {
      const bytes = packet.buildPacketBytes();
    })
      .toThrow();
  });

  it("should not except a value less than 0 for the brightness value.", () => {
    const brightnessValue = -1;
    const packet = new BrightnessPacket(brightnessValue);

    expect(() => {
      const bytes = packet.buildPacketBytes();
    })
      .toThrow();
  });
});
