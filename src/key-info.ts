import { KeyModel } from "./internal/models";

/**
 * Maps a common name of a key to a key object.
 */
export const KeyInfo: { [keyName: string]: KeyModel } = {
    SPACE: new KeyModel(151, 0, 1, 2)
};