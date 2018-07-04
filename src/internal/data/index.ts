import { IKeyModel, KeyModel } from "../models/key-model";

import enUsData from "./en-us.json";
import enGbData from "./en-us.json";

export interface IKeyMapCulture {
  [keyName: string]: KeyModel;
}

export const enUsKeyMapData: IKeyMapCulture = makeCulture(enUsData);
export const enGbKeyMapData: IKeyMapCulture = makeCulture(enGbData);

function makeCulture(models: IKeyModel[]): IKeyMapCulture {
  const data: IKeyMapCulture = {};

  for (const keymapping of models) {
    const keyName = keymapping.description.replace(/\W/g, "");
    data[keyName] = new KeyModel(keymapping);
  }

  return data;
}
