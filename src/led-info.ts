import { KeyModel } from "./internal/models";
import { KeyInfo } from "./key-info";

export interface ILedMapCulture {
  [keyName: string]: KeyModel;
}

const LedInfo: { [culture: string]: ILedMapCulture } = {

};

for (const culture of Object.getOwnPropertyNames(KeyInfo)) {
  LedInfo[culture] = {};

  for (const keyModelName of Object.getOwnPropertyNames(KeyInfo[culture])) {
    const keyModel = KeyInfo[culture][keyModelName];

    if (keyModel.ledIds.length > 1) {
      for (let i = 0; i < keyModel.ledIds.length; i++) {
        LedInfo[culture][keyModelName + `_${i}`] = keyModel;
      }
    } else {
      LedInfo[culture][keyModelName] = keyModel;
    }
  }
}
