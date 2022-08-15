"use strict";

type ImageSpecification = {
  path: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  opacity?: number;
};

const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

const defaultOptions = {
  format: "image/png",
  quality: 0.92,
};

// Draw cat with lime helmet
export async function jimg(options: {
  path?: string;
  images: (ImageSpecification | string)[];
  truncat?: { x?: number; y?: number; width?: number; height?: number };
  quality?: number;
  format?: string;
}): Promise<string> {
  options = Object.assign({}, defaultOptions, options);

  options.images =
    typeof options.images[0] === "string"
      ? options.images.map((i: string) => ({ path: i }))
      : options.images;

  const promises = [];
  const imagesLoaded: (ImageSpecification & {
    img: any;
    imgWidth: number;
    imgHeight: number;
  })[] = [];

  for (const image of options.images as ImageSpecification[]) {
    const isString = typeof image === "string";
    promises.push(
      loadImage(image.path).then((img: any) =>
        imagesLoaded.push({
          img,
          imgWidth: img.width,
          imgHeight: img.height,
          ...image,
        })
      )
    );
  }

  await Promise.all(promises);

  const tx = options.truncat?.x ?? 0;
  const ty = options.truncat?.y ?? 0;
  const tw = options.truncat?.width;
  const th = options.truncat?.height;

  const canvasSizeWidth =
    (tw ? tw + tx : undefined) ??
    Math.max(
      ...imagesLoaded.map((e) =>
        e.width ? Math.min(e.imgWidth, e.width) : e.imgWidth
      )
    );
  const canvasSizeHeight =
    (th ? th + ty : undefined) ??
    Math.max(
      ...imagesLoaded.map((e) =>
        e.height ? Math.min(e.imgHeight, e.height) : e.imgHeight
      )
    );

  const canvas = createCanvas(canvasSizeWidth - tx, canvasSizeHeight - ty);
  const ctx = canvas.getContext("2d");

  for (const image of imagesLoaded) {
    ctx.globalAlpha = image.opacity ?? 1;
    ctx.drawImage(
      image.img,
      (image.x ?? 0) - tx,
      (image.y ?? 0) - ty,
      image.width ?? image.imgWidth,
      image.height ?? image.imgHeight
    );
  }

  const finalImg: string = canvas.toDataURL(options.format, {
    quality: options.quality,
  });

  if (options.path)
    fs.writeFileSync(
      options.path,
      finalImg.replace(/^.+?base64,/, ""),
      "base64"
    );

  return finalImg;
}

module.exports = jimg;
