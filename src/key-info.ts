import { enKeyMapData, IKeyMapCulture } from "./internal/data";
import { KeyModel } from "./internal/models";

/**
 * Maps a common name of a key to a key object.
 */
export const KeyInfo: { [culture: string]: IKeyMapCulture } = {
    "en-US": enKeyMapData
};
