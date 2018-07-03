import { enUS } from "./internal/key-maps/en-us";
import { KeyModel } from "./internal/models";

export interface IKeyMapCulture {
    [keyName: string]: KeyModel;
}

/**
 * Maps a common name of a key to a key object.
 */
export const KeyInfo: { [culture: string]: IKeyMapCulture } = {
    "en-US": enUS
};
