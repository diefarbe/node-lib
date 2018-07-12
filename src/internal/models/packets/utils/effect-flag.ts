// tslint:disable:no-bitwise

export class EffectFlag {

    public value: number;
    
    private readonly incrementOnly = 1;
    private readonly decrementOnly = 2;
    private readonly incrementDecrement = 25;
    private readonly decrementIncrement = 26;
    private readonly triggerLaterMask = 16384;
    private readonly transitionMask = 4096;
    
    constructor() {
        this.value = 1;
    }

    public setIncrementDecrement() {
        this.value = this.incrementDecrement;
    }
    
    public setDecrementIncrement() {
        this.value = this.decrementIncrement;
    }

    public setIncrementOnly() {
        this.value = this.incrementOnly;
    }

    public setDecrementOnly() {
        this.value = this.decrementOnly;
    }

    public setTriggerEffectOnApply() {
        this.value = this.value | this.triggerLaterMask;
    }

    public setTriggerEffectNow() {
        this.value = this.value & ~this.triggerLaterMask;
    }

    public setEnableTransition() {
        this.value = this.value & ~this.transitionMask;
    }

    public setDisableTransition() {
        this.value = this.value | this.transitionMask;
    }
}
