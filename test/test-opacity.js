const jimg = require("../dist/index.js");
const path = require("path");

(async function () {
  const test = await jimg({
    path: path.resolve(__dirname, "result-opacity.png"),
    images: [
      {
        path: path.resolve(__dirname, "../assets/body.png"),
        opacity: 0.3,
      },
      {
        path: path.resolve(__dirname, "../assets/eyes.png"),
        opacity: 0.6,
      },
      {
        path: path.resolve(__dirname, "../assets/mouth.png"),
      },
    ],
  });
  // console.log(test);
})();
