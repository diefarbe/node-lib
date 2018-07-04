import { LedModel } from "./led-model";

export interface ICoordinates {
    x: number;
    y: number;
}

export interface IKeyModel {
    ledIds: number[];
    description: string;
    shortName: string;
    topLeftCoordinates: ICoordinates;
    width: number;
    height: number;
}

/**
 * Representation of a key with color channel info
 *
 * @export
 * @class Key
 */
export class KeyModel {
    public ledIds: LedModel[];
    public description: string;
    public shortName: string;
    public topLeftCoordinates: ICoordinates;
    public width: number;
    public height: number;
    
    constructor(data: IKeyModel) {
        this.ledIds = [];

        for (const ledId of data.ledIds) {
            this.ledIds.push(new LedModel(ledId, this));
        }

        this.description = data.description;
        this.shortName = data.shortName;
        this.topLeftCoordinates = data.topLeftCoordinates;
        this.width = data.width;
        this.height = data.height;
    }

    public getRGBChannels(): number[] {
        return [
            this.ledIds[0].rChannelId,
            this.ledIds[0].bChannelId,
            this.ledIds[0].gChannelId
        ];
    }
}
