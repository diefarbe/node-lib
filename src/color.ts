export const RGB_COLOR_REGEX = /\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*.\d*))?\)/;

export class Color {
    public r: number = 0x00;
    public g: number = 0x00;
    public b: number = 0x00;
    public a: number = 1;

    constructor()
    constructor(color?: string | number)
    constructor(r: string | number = 0x00, g: string | number = 0x00, b: string | number = 0x00, a: number = 1) {
        // Handles "#000000", "000000", "#000", and "000" plus "rgb(0,0,0)"
        if (typeof r === "string") {
            if (r.indexOf("#") === 0) {
                r = r.substr(r.indexOf("#") + 1);
            }
            if (r.indexOf("rgb") === 0) {
                const res = RGB_COLOR_REGEX.exec(r);
                if (res != null) {
                    this.r = parseInt(res[1], 10);
                    this.g = parseInt(res[2], 10);
                    this.b = parseInt(res[3], 10);
                    this.a = res[4] ? parseFloat(res[4]) : 1;
                } else {
                    throw new Error("Could not parse rgb(0,0,0) type string: " + r);
                }
            } else if (r.length > 2) { // #000000 and #000
                if (r.length === 3) {
                    this.r += parseInt(r.substr(0, 1) + r.substr(0, 1), 16);
                    this.g += parseInt(r.substr(1, 1) + r.substr(1, 1), 16);
                    this.b += parseInt(r.substr(2, 1) + r.substr(2, 1), 16);
                } else if (r.length === 6) {
                    this.r = parseInt(r.substr(0, 2), 16);
                    this.g = parseInt(r.substr(2, 2), 16);
                    this.b = parseInt(r.substr(4, 2), 16);
                } else {
                    throw new Error("Invalid RGB Hex string specified: " + r);
                }
            } else if (typeof g !== "string" || typeof b !== "string") {
                throw new Error("red specified as string, green and blue must be also");
            } else { // Individual hex arguments
                this.r = parseInt(r, 16);
                this.g = parseInt(g, 16);
                this.b = parseInt(b, 16);
            }
        } else if (r > 0xFF) { // Full color as number
            // Is there a more elegant way to do this without bitwise?
            this.r = (r & 0xFF0000) >> 16;
            this.g = (r & 0x00FF00) >> 8;
            this.b = (r & 0x0000FF);
        } else if (typeof g !== "number" || typeof b !== "number") {
            throw new Error("red specified as number, green and blue must be also");
        } else { // Individual numeric colors
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a || 1;
        }
    }

    public toHex() {
        return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
    }

    public toRgb() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    public toRgba() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}
