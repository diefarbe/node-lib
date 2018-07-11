import { KeyInfo } from "./key-info";
import { KeyState } from "./key-state";

describe("KeyState", () => {
  it("should be able to create a state from a KeyModel.", () => {
    const keymodel = KeyInfo["en-US"]["escape"]
    const state = new KeyState(keymodel);

    expect(state).not.toBeUndefined();
    expect(state).not.toBeNull();
  });

  describe("building packets", () => {
    let keyState: KeyState;

    beforeEach(() => {
      const keymodel = KeyInfo["en-US"]["escape"]
      keyState = new KeyState(keymodel);
    });

    it("should build three packets when applying 'setFromColorHex'.", () => {
      keyState.setFromColorHex("#FF0000");

      const packetsData = keyState.build();
      
      expect(packetsData).not.toBeUndefined();
      expect(packetsData).not.toBeNull();
      
      expect(packetsData.length).toEqual(3);

      for(const packetData of packetsData) {
        expect(packetData.length).toEqual(33);
      }
    });

    it("should build three packets when applying 'setToColorHex'.", () => {
      keyState.setToColorHex("#FF0000");

      const packetsData = keyState.build();
      
      expect(packetsData).not.toBeUndefined();
      expect(packetsData).not.toBeNull();
      
      expect(packetsData.length).toEqual(3);

      for(const packetData of packetsData) {
        expect(packetData.length).toEqual(33);
      }
    });

    
  });

  
});
