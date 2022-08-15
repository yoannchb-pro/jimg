const jimg = require("../dist/index.js");
const path = require("path");

(async function () {
  const test = await jimg({
    path: path.resolve(__dirname, "result.png"),
    images: [
      path.resolve(__dirname, "../assets/body.png"),
      path.resolve(__dirname, "../assets/eyes.png"),
      path.resolve(__dirname, "../assets/mouth.png"),
    ],
  });
  // console.log(test);
})();
