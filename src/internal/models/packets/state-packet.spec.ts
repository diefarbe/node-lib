import { StatePacket } from "./state-packet";
import { EffectFlag } from "./utils/effect-flag";

describe("StatePacket", () => {
  describe("up", () => {
    it("should set up hold level (up increament delay) to position 13", () => {
      const expectedValue = 0x12;
      const packet = new StatePacket(
        21,
        1,
        new EffectFlag(),
        expectedValue, // up hold level
        2,
        3,
        4,
        0,
        0, 
        0,
        0,
        0,
        0,
        0);

      const bytes = packet.buildPacketBytes();
      expect(bytes[13]).toEqual(expectedValue);
    });
  });
});
