import {
    IKeyMapCulture,
    IKeyModel,
    KeyModel
} from "./internal/models";

function makeCulture(models: IKeyModel[]): IKeyMapCulture {
    const data: IKeyMapCulture = {};

    for (const keymapping of models) {
        const keyName = keymapping.description.replace(/\W/g, "");
        data[keyName] = new KeyModel(keymapping);
    }

    return data;
}

const assetData = require("../assets") as { [culture: string]: IKeyModel[] }; // tslint:disable-line

/**
 * Maps a common name of a key to a key object.
 */
const KeyInfo: { [culture: string]: IKeyMapCulture } = {};

for (const cultureCode in assetData) {
    if (assetData[cultureCode] === undefined) { continue; }

    const culture = assetData[cultureCode];
    KeyInfo[cultureCode] = makeCulture(culture);
}

export {
    KeyInfo
};
