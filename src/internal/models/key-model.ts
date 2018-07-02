/**
 * Representation of a key with color channel info
 *
 * @export
 * @class Key
 */
export class KeyModel {
    constructor(
        public id: number,
        public rChannelId: number,
        public gChannelId: number,
        public bChannelId: number
    ) {
        // stub
    }

    public getRGBChannels(): number[] {
        return [
            this.rChannelId,
            this.bChannelId,
            this.gChannelId
        ];
    }
}