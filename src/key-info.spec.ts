import { KeyInfo } from "./key-info";

describe("KeyInfo", () => {
  it("should have the 'en-US' culture defined.", () => {
    expect(KeyInfo["en-US"]).not.toBeUndefined();
  });

  it("should have the 'en-GB' culture defined.", () => {
    expect(KeyInfo["en-GB"]).not.toBeUndefined();
  });
});
