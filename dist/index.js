(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.jimg = factory());
})(this, (function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    const isNodeJs = typeof window === "undefined";
    const { createCanvas, loadImage } = isNodeJs
        ? require("canvas")
        : {
            createCanvas: function () {
                return document.createElement("canvas");
            },
            loadImage: function (path) {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = (e) => reject(e);
                    img.src = path;
                });
            },
        };
    const fs = isNodeJs
        ? require("fs")
        : {
            writeFileSync: function (path, data, encode) {
                const download = document.createElement("a");
                download.setAttribute("href", data);
                download.setAttribute("download", path.replace(/.+?\//gi, ""));
                document.body.appendChild(download);
                download.click();
                download.remove();
            },
        };
    const defaultOptions = {
        format: "image/png",
        quality: 0.92,
    };
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
                promises.push(loadImage(image.path).then((img) => imagesLoaded.push(Object.assign({ img, imgWidth: img.width, imgHeight: img.height }, image))));
            }
            yield Promise.all(promises);
            const tx = (_b = (_a = options.truncat) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0;
            const ty = (_d = (_c = options.truncat) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : 0;
            const tw = (_e = options.truncat) === null || _e === void 0 ? void 0 : _e.width;
            const th = (_f = options.truncat) === null || _f === void 0 ? void 0 : _f.height;
            const canvasSizeWidth = (_g = (tw ? tw + tx : undefined)) !== null && _g !== void 0 ? _g : Math.max(...imagesLoaded.map((e) => e.width ? Math.min(e.imgWidth, e.width) : e.imgWidth));
            const canvasSizeHeight = (_h = (th ? th + ty : undefined)) !== null && _h !== void 0 ? _h : Math.max(...imagesLoaded.map((e) => e.height ? Math.min(e.imgHeight, e.height) : e.imgHeight));
            const canvas = options.canvas ? options.canvas : createCanvas();
            canvas.width = canvasSizeWidth - tx;
            canvas.height = canvasSizeHeight - ty;
            const ctx = canvas.getContext("2d");
            for (const image of imagesLoaded) {
                ctx.globalAlpha = (_j = image.opacity) !== null && _j !== void 0 ? _j : 1;
                ctx.drawImage(image.img, ((_k = image.x) !== null && _k !== void 0 ? _k : 0) - tx, ((_l = image.y) !== null && _l !== void 0 ? _l : 0) - ty, (_m = image.width) !== null && _m !== void 0 ? _m : image.imgWidth, (_o = image.height) !== null && _o !== void 0 ? _o : image.imgHeight);
            }
            const finalImg = canvas.toDataURL(options.format, {
                quality: options.quality,
            });
            if (options.path)
                fs.writeFileSync(options.path, isNodeJs ? finalImg.replace(/^.+?base64,/, "") : finalImg, "base64");
            return finalImg;
        });
    }

    return jimg;

}));
//# sourceMappingURL=index.js.map
