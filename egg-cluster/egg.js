const globby = require("globby");
const { join, resolve, parse } = require("path");
module.exports = app => {
  const appPath = join(__dirname, "app");
  const context = app.context;

  const fileAbsolutePath = ["config", "service", "middleware"].reduce(
    (obj, v) => {
      obj[v] = join(appPath, v);
      return obj;
    },
    {}
  );
  console.log(fileAbsolutePath);
  Object.keys(fileAbsolutePath).forEach(v => {
    const path = fileAbsolutePath[v];
    const prop = v;
    const files = globby.sync("**/*.js", { cwd: path });
    if (prop !== "middleware") {
      context[prop] = {};
    }
    files.forEach(file => {
      const fileName = parse(file).name;
      const content = require(join(path, file));
      console.log(fileName);
      if (prop === "middleware") {
        if (fileName in context["config"]) {
          const plugin = content(context["config"][fileName]);
          app.use(plugin);
        }
        return;
      }
      if (prop === "config" && content) {
        context[prop] = Object.assign({}, context[prop], content);
        return;
      }
      context[prop][fileName] = content;
    });
  });
};
