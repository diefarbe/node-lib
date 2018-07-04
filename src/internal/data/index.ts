import { IKeyModel, KeyModel } from "../models/key-model";

import enData from "./en-us.json";

export interface IKeyMapCulture {
  [keyName: string]: KeyModel;
}

export const enKeyMapData: IKeyMapCulture = {};

for (const keymapping of (enData as IKeyModel[])) {
  enKeyMapData[keymapping.shortName] = new KeyModel(keymapping);
}
