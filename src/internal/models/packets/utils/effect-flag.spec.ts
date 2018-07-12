import { EffectFlag } from "./effect-flag";

describe("EffectFlag", () => {
  it("should default the value to 1.", () => {
    const flag = new EffectFlag();
    expect(flag.value).toEqual(1);
  });

  it("should set the value to '25' when 'setIncrementDecrement' is called.", () => {
    const flag = new EffectFlag();
    flag.setIncrementDecrement();

    expect(flag.value).toEqual(25);
  });

  it("should set the value to '26' when 'setDecrementIncrement' is called.", () => {
    const flag = new EffectFlag();
    flag.setDecrementIncrement();

    expect(flag.value).toEqual(26);
  });

  it("should set the value to '1' when 'setIncrementOnly' is called.", () => {
    const flag = new EffectFlag();
    flag.setIncrementOnly();

    expect(flag.value).toEqual(1);
  });
});
