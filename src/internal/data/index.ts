import { IKeyModel, KeyModel } from "../models/key-model";

const rawKeyData = {
  enGbData: require("../../../assets/en-gb.json"),
  enUsData: require("../../../assets/en-us.json")
};

export interface IKeyMapCulture {
  [keyName: string]: KeyModel;
}

export const enUsKeyMapData: IKeyMapCulture = makeCulture(rawKeyData.enUsData);
export const enGbKeyMapData: IKeyMapCulture = makeCulture(rawKeyData.enGbData);

function makeCulture(models: IKeyModel[]): IKeyMapCulture {
  const data: IKeyMapCulture = {};

  for (const keymapping of models) {
    const keyName = keymapping.description.replace(/\W/g, "");
    data[keyName] = new KeyModel(keymapping);
  }

  return data;
}
