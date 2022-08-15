declare type ImageSpecification = {
    path: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    opacity?: number;
};
export declare function jimg(options: {
    path?: string;
    images: (ImageSpecification | string)[];
    truncat?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    };
    quality?: number;
    format?: string;
}): Promise<string>;
export {};
