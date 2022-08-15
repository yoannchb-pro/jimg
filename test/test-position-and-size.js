const jimg = require("../dist/index.js");
const path = require("path");

(async function () {
  const test = await jimg({
    path: path.resolve(__dirname, "result-position-and-size.png"),
    images: [
      {
        path: path.resolve(__dirname, "../assets/body.png"),
        x: 0,
        y: 0,
        width: 200,
        height: 200,
      },
      {
        path: path.resolve(__dirname, "../assets/eyes.png"),
        x: 10,
        y: 10,
        width: 100,
        height: 100,
      },
      {
        path: path.resolve(__dirname, "../assets/mouth.png"),
        x: 0,
        y: 0,
      },
    ],
  });
  // console.log(test);
})();
