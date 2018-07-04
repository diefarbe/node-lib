export abstract class Usb {
    public abstract connect(vendorId: number, productId: number, usbInterface: number, usage: number): void;
    public abstract read(): number[];
    public abstract write(data: number[]): void;
    public abstract disconnect(): void;
}