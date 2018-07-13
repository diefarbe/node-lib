import { KeyInfo } from "./key-info";
import { KeyModel } from './internal/models';

describe("KeyInfo", () => {
  describe("en-US", () => {
    it("should have the 'en-US' culture defined.", () => {
      expect(KeyInfo["en-US"]).not.toBeUndefined();
    });

    it("should have 114 positions defined.", () => {
      expect(Object.getOwnPropertyNames(KeyInfo["en-US"]).length).toEqual(114);
    });
  });

  describe("en-GB", () => {
    it("should have the 'en-GB' culture defined.", () => {
      expect(KeyInfo["en-GB"]).not.toBeUndefined();
    });
  });
  

  for(const cultureCode in KeyInfo) {
    const cultureMap = KeyInfo[cultureCode];

    describe(`Culture ${cultureCode}`, () => {
      describe("Macro positions", () => {
        it("should have three macro keys defined.", () => {
          const macro1 = cultureMap["Macro1"];
          const macro2 = cultureMap["Macro2"];
          const macro3 = cultureMap["Macro3"];

          expect(macro1).not.toBeUndefined();
          expect(macro1).not.toBeNull();

          expect(macro2).not.toBeUndefined();
          expect(macro2).not.toBeNull();

          expect(macro3).not.toBeUndefined();
          expect(macro3).not.toBeNull();
        });

        it("should have 2 LEDs defined for Macro1.", () => {
          const macro1 = cultureMap["Macro1"];

          expect(macro1.ledIds.length).toEqual(2);
        });

        it("should have 2 LEDs defined for Macro2.", () => {
          const macro1 = cultureMap["Macro2"];

          expect(macro1.ledIds.length).toEqual(2);
        });

        it("should have 2 LEDs defined for Macro3.", () => {
          const macro1 = cultureMap["Macro3"];

          expect(macro1.ledIds.length).toEqual(2);
        });
      });
      
      describe("Q Knob", () => {
        let qknob: KeyModel;
        beforeEach(() => {
          qknob = cultureMap["QKnob"];
        });

        it("should be defined", () => {
          expect(qknob).not.toBeUndefined();
          expect(qknob).not.toBeNull();
        });

        it("should have 5 LEDs defined.", () => {
          expect(qknob.ledIds.length).toEqual(5);
        });
      });

      describe("Pipes", () => {
        let leftPipe: KeyModel;
        let rightPipe: KeyModel;

        beforeEach(() => {
          leftPipe = cultureMap["leftPipe"];
          rightPipe = cultureMap["rightPipe"];
        });

        it("should have a left pipe.", () => {
          expect(leftPipe).not.toBeUndefined();
          expect(leftPipe).not.toBeNull();
        });

        it("should have a right pipe.", () => {
          expect(rightPipe).not.toBeUndefined();
          expect(rightPipe).not.toBeNull();
        });

        it("should have 9 LEDs for the left pipe.", () => {
          expect(leftPipe.ledIds.length).toEqual(9);
        });

        it("should have 7 LEDs for the right pipe.", () => {
          expect(rightPipe.ledIds.length).toEqual(7);
        });
      })
    });
  }
});
