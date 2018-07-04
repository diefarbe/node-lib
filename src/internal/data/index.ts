import { IKeyModel, KeyModel } from "../models/key-model";

import enKeymapData from "./en-us.json";

export const enKeyMapData: KeyModel[] = [];

for (const keymapping of (enKeymapData as IKeyModel[])) {
  enKeyMapData.push(new KeyModel(keymapping));
}
