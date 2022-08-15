# jimg

Merge multiple images into one single image

## Install

```
$ npm install --save jimg
```

## Usage

With the following images:

| `/body.png`                               | `/eyes.png`                               | `/mouth.png`                               |
| ----------------------------------------- | ----------------------------------------- | ------------------------------------------ |
| <img src="./assets/body.png" width="128"> | <img src="./assets/eyes.png" width="128"> | <img src="./assets/mouth.png" width="128"> |

You can do:

```js
const jimg = require("jimg");

jimg({ images: ["/body.png", "/eyes.png", "/mouth.png"] }).then(
  (b64) => (document.querySelector("img").src = b64)
);
// data:image/png;base64,iVBORw0KGgoAA...
```

And that would update the `img` element to show this image:

<img src="./assets/face.png" width="128">

## Positioning

Those source png images were already the right dimensions to be overlaid on top of each other. You can also supply an array of objects with x/y co-ords to manually position each image:

```js
jimg({
    images: [
        { path: 'body.png', x: 0, y: 0 },
        { path: 'eyes.png', x: 32, y: 0 },
        { path: 'mouth.png', x: 16, y: 0 }
    ]
})
  .then(b64 => ...);
// data:image/png;base64,iVBORw0KGgoAA...
```

Using the same source images as above would output this:

<img src="./assets/face-custom-positions.png" width="128">

### Opacity

The opacity can also be tweaked on each image.

```js
jimg({
    images: [
        { path: 'body.png' },
        { path: 'eyes.png', opacity: 0.7 },
        { path: 'mouth.png', opacity: 0.3 }
    ]
})
  .then(b64 => ...);
// data:image/png;base64,iVBORw0KGgoAA...
```

<img src="./assets/face-opacity.png" width="128">

### Truncat

By default the new image dimensions will be set to the width of the widest source image and the height of the tallest source image. You can manually specify your own dimensions in the options object:

```js
jimg({ images: ["/body.png", "/eyes.png", "/mouth.png"], truncat: { x: 0, y: 0, width: 128, height: 128 } }).then(
  b64 => ...
);
// data:image/png;base64,iVBORw0KGgoAA...
```

Which will look like this:

<img src="./assets/face-custom-dimension.png" width="64">

## License

MIT © yoannchb
