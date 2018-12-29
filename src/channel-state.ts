import { KeyModel } from "./internal/models/key-model";
import { StatePacket } from "./internal/models/packets/state-packet";
import { EffectFlag } from "./internal/models/packets/utils/effect-flag";

export class ChannelState {

    private upHoldLevel?: number;
    private downHoldLevel?: number;

    private upMaximumLevel?: number;
    private downMinimumLevel?: number;

    private upHoldDelay?: number;
    private downHoldDelay?: number;

    private upIncrement?: number;
    private downDecrement?: number;

    private upIncrementDelay?: number;
    private downDecrementDelay?: number;

    private startDelay?: number;
    private effectId?: number;

    private keyInfo: KeyModel;
    private desiredColorChannel: "red" | "green" | "blue";
    private effectFlag: EffectFlag = new EffectFlag();

    constructor(
        keyInfo: KeyModel,
        channel: "red" | "green" | "blue"
    ) {
        this.keyInfo = keyInfo;
        this.desiredColorChannel = channel;
    }

    public setDownHoldLevel(channelPower?: number) {
        this.downHoldLevel = channelPower;
        return this;
    }

    public setUpHoldLevel(channelPower?: number) {
        this.upHoldLevel = channelPower;
        return this;
    }

    public setUpMaximumLevel(channelPower?: number) {
        this.upMaximumLevel = channelPower;
        return this;
    }

    public setDownMinimumLevel(channelPower?: number) {
        this.downMinimumLevel = channelPower;
        return this;
    }

    public setUpHoldDelay(upHoldDelay?: number) {
        this.upHoldDelay = upHoldDelay;
        return this;
    }

    public setDownHoldDelay(downHoldDelay?: number) {
        this.downHoldDelay = downHoldDelay;
        return this;
    }

    public setUpIncrement(upIncrement?: number) {
        this.upIncrement = upIncrement;
        return this;
    }

    public setDownDecrement(downDecrement?: number) {
        this.downDecrement = downDecrement;
        return this;
    }

    public setUpIncrementDelay(upIncrementDelay?: number) {
        this.upIncrementDelay = upIncrementDelay;
        return this;
    }

    public setDownDecrementDelay(downDecrementDelay?: number) {
        this.downDecrementDelay = downDecrementDelay;
        return this;
    }

    public setStartDelay(startDelay?: number) {
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

    public setDecrementIncrement() {
        this.effectFlag.setDecrementIncrement();
        return this;
    }

    public setIncrementDecrement() {
        this.effectFlag.setIncrementDecrement();
        return this;
    }

    public setTransition(enable: boolean) {
        if (enable) {
            this.effectFlag.setEnableTransition();
        } else {
            this.effectFlag.setDisableTransition();
        }
        return this;
    }

    public setApplyImmediately() {
        this.effectFlag.setTriggerEffectNow();
        return this;
    }

    public setApplyDelayed() {
        this.effectFlag.setTriggerEffectOnApply();
        return this;
    }

    public setToHardwareProfile() {
        this.effectId = 0;
        return this;
    }

    public build(): number[][] {

        const packetsToSend = [];

        const colorChannels = this.keyInfo.getRGBChannels();

        let ourColorChannel = 0;
        if (this.desiredColorChannel === "red") {
            ourColorChannel = colorChannels[0];
        }
        if (this.desiredColorChannel === "green") {
            ourColorChannel = colorChannels[1];
        }
        if (this.desiredColorChannel === "blue") {
            ourColorChannel = colorChannels[2];
        }

        for (const ledId of this.keyInfo.ledIds) {
            packetsToSend.push(new StatePacket(
                ledId.id,
                ourColorChannel,
                this.effectFlag,
                this.upHoldLevel,
                this.downHoldLevel,
                this.upMaximumLevel,
                this.downMinimumLevel,
                this.upHoldDelay,
                this.downHoldDelay,
                this.upIncrement,
                this.downDecrement,
                this.upIncrementDelay,
                this.downDecrementDelay,
                this.startDelay,
                this.effectId,
            ).buildPacketBytes());
        }

        return packetsToSend;

    }

}