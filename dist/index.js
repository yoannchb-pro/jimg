"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jimg = void 0;
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const defaultOptions = {
    format: "image/png",
    quality: 0.92,
};
// Draw cat with lime helmet
function jimg(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    return __awaiter(this, void 0, void 0, function* () {
        options = Object.assign({}, defaultOptions, options);
        options.images =
            typeof options.images[0] === "string"
                ? options.images.map((i) => ({ path: i }))
                : options.images;
        const promises = [];
        const imagesLoaded = [];
        for (const image of options.images) {
            const isString = typeof image === "string";
            promises.push(loadImage(image.path).then((img) => imagesLoaded.push(Object.assign({ img, imgWidth: img.width, imgHeight: img.height }, image))));
        }
        yield Promise.all(promises);
        const tx = (_b = (_a = options.truncat) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0;
        const ty = (_d = (_c = options.truncat) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : 0;
        const tw = (_e = options.truncat) === null || _e === void 0 ? void 0 : _e.width;
        const th = (_f = options.truncat) === null || _f === void 0 ? void 0 : _f.height;
        const canvasSizeWidth = (_g = (tw ? tw + tx : undefined)) !== null && _g !== void 0 ? _g : Math.max(...imagesLoaded.map((e) => e.width ? Math.min(e.imgWidth, e.width) : e.imgWidth));
        const canvasSizeHeight = (_h = (th ? th + ty : undefined)) !== null && _h !== void 0 ? _h : Math.max(...imagesLoaded.map((e) => e.height ? Math.min(e.imgHeight, e.height) : e.imgHeight));
        const canvas = createCanvas(canvasSizeWidth - tx, canvasSizeHeight - ty);
        const ctx = canvas.getContext("2d");
        for (const image of imagesLoaded) {
            ctx.globalAlpha = (_j = image.opacity) !== null && _j !== void 0 ? _j : 1;
            ctx.drawImage(image.img, ((_k = image.x) !== null && _k !== void 0 ? _k : 0) - tx, ((_l = image.y) !== null && _l !== void 0 ? _l : 0) - ty, (_m = image.width) !== null && _m !== void 0 ? _m : image.imgWidth, (_o = image.height) !== null && _o !== void 0 ? _o : image.imgHeight);
        }
        const finalImg = canvas.toDataURL(options.format, {
            quality: options.quality,
        });
        if (options.path)
            fs.writeFileSync(options.path, finalImg.replace(/^.+?base64,/, ""), "base64");
        return finalImg;
    });
}
exports.jimg = jimg;
module.exports = jimg;
//# sourceMappingURL=index.js.map