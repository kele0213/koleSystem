const fs = require("fs");

// 全部加载
function useRoutes(app) {
  fs.readdir(__dirname, (err, files) => {
    files.forEach((filename) => {
      if (filename === "index.js") return;
      const route = require(`./${filename}`);
      app.use(route.routes());
      app.use(route.allowedMethods());
    });
  });
}

module.exports = useRoutes;
