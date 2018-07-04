export abstract class Usb {
    constructor(protected vendorId: number, protected productId: number, protected deviceInterface: number, protected usage: number) {
        
    }

    public abstract connect(): void;
    public abstract read(): number[];
    public abstract write(data: number[]): void;
    public abstract disconnect(): void;
}
