type ImageSpecification = {
    path: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    opacity?: number;
};
declare function jimg(options: {
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
    canvas?: any;
}): Promise<string>;
export { jimg as default };
