import { KeyModel } from "./internal/models/key-model";
import { StatePacket } from "./internal/models/packets/state-packet";
import { EffectFlag } from "./internal/models/packets/utils/effect-flag";

export class KeyState {

    private toColorRGB?: number[];
    private fromColorRGB?: number[];

    private upMaximumLevel?: number[];
    private downMinimumLevel?: number[];

    private upHoldDelay?: number;
    private downHoldDelay?: number;

    private upIncrement?: number;
    private downDecrement?: number;

    private upIncrementDelay?: number;
    private downDecrementDelay?: number;

    private startDelay?: number;
    private effectId?: number;

    private keyInfo: KeyModel;
    private effectFlag: EffectFlag = new EffectFlag();

    constructor(
        keyInfo: KeyModel,
    ) {
        this.keyInfo = keyInfo;
    }

    public setFromColorHex(rgb: string) {
        rgb = rgb.substr(1, rgb.length - 1);
        this.fromColorRGB = [
            parseInt(rgb.substr(0, 2), 16),
            parseInt(rgb.substr(2, 2), 16),
            parseInt(rgb.substr(4, 2), 16)
        ];
        return this;
    }

    public setToColorHex(rgb: string) {
        rgb = rgb.substr(1, rgb.length - 1);
        this.toColorRGB = [
            parseInt(rgb.substr(0, 2), 16),
            parseInt(rgb.substr(2, 2), 16),
            parseInt(rgb.substr(4, 2), 16)
        ];
        return this;
    }

    public setUpMaximum(rgb: string) {
        rgb = rgb.substr(1, rgb.length - 1);
        this.upMaximumLevel = [
            parseInt(rgb.substr(0, 2), 16),
            parseInt(rgb.substr(2, 2), 16),
            parseInt(rgb.substr(4, 2), 16)
        ];
        return this;
    }

    public setDownMinimum(rgb: string) {
        rgb = rgb.substr(1, rgb.length - 1);
        this.downMinimumLevel = [
            parseInt(rgb.substr(0, 2), 16),
            parseInt(rgb.substr(2, 2), 16),
            parseInt(rgb.substr(4, 2), 16)
        ];
        return this;
    }

    public setUpHoldDelay(upHoldDelay: number) {
        this.upHoldDelay = upHoldDelay;
        return this;
    }

    public setDownHoldDelay(downHoldDelay: number) {
        this.downHoldDelay = downHoldDelay;
        return this;
    }

    public setUpIncrement(upIncrement: number) {
        this.upIncrement = upIncrement;
        return this;
    }

    public setDownDecrement(downDecrement: number) {
        this.downDecrement = downDecrement;
        return this;
    }

    public setUpIncrementDelay(upIncrementDelay: number) {
        this.upIncrementDelay = upIncrementDelay;
        return this;
    }

    public setDownDecrementDelay(downDecrementDelay: number) {
        this.downDecrementDelay = downDecrementDelay;
        return this;
    }

    public setStartDelay(startDelay: number) {
        this.startDelay = startDelay;
        return this;
    }

    public setMoveUp() {
        this.effectFlag.setIncrementOnly();
        return this;
    }

    public setMoveDown() {
        this.effectFlag.setDecrementOnly();
        return this;
    }

    public setTransition() {
        this.effectFlag.setDecrementIncrement();
        return this;
    }

    public setTransitionReverse() {
        this.effectFlag.setIncrementDecrement();
        return this;
    }

    public setApplyImmediately() {
        this.effectFlag.setTriggerEffectNow();
        return this;
    }

    public setApplyDelayed() {
        this.effectFlag.setTriggerEffectNow();
        return this;
    }

    public build(): number[][] {

        const packetsToSend = [];

        const colorChannels = this.keyInfo.getRGBChannels();

        for (let i = 0; i < 3; i++) {
            if (typeof this.fromColorRGB !== "undefined") {
                console.log(this.fromColorRGB[i]);

            }
            packetsToSend.push(new StatePacket(
                this.keyInfo.id,
                colorChannels[i],
                this.effectFlag,
                typeof this.toColorRGB === "undefined" ? undefined : this.toColorRGB[i],
                typeof this.fromColorRGB === "undefined" ? undefined : this.fromColorRGB[i],
                typeof this.upMaximumLevel === "undefined" ? undefined : this.upMaximumLevel[i],
                typeof this.downMinimumLevel === "undefined" ? undefined : this.downMinimumLevel[i],
                this.upHoldDelay,
                this.downHoldDelay,
                this.upIncrement,
                this.downDecrement,
                this.upIncrementDelay,
                this.downDecrementDelay,
                this.startDelay
            ).buildPacketBytes());
        }

        return packetsToSend;

    }

}
