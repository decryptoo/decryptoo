interface Require {
    (...args: any[]): any;

    ensure: Function;
}
declare const require: Require;

declare interface Math {
    sign(x: number): number;

    log10(x: number): number;
}

interface Console {
    trace(...args: any[]): void;
}

declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): number;

declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): number;
