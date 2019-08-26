const { resolve, join, parse } = require("path");
const globby = require("globby");
module.exports = app => {
  const AppPath = resolve(__dirname, "app");
  const context = app["context"];

  // const fileAbsolutePath = ["config", "middleware", "service"].reduce(
  //   (folderMap, v) => (((folderMap[v] = join(AppPath, v)), folderMap), {})
  // );
  const fileAbsolutePath = {
    config: join(AppPath, "config"),
    service: join(AppPath, "service"),
    moiddleware: join(AppPath, "moiddleware")
  };

  Object.keys(fileAbsolutePath).forEach(v => {
    const path = fileAbsolutePath[v];
    const prop = v;
    const files = globby.sync("**/*.js", {
      cwd: path
    });
    if (prop !== "middleware") {
      context[prop] = {};
    }
    files.forEach(file => {
      const filename = parse(file).name;
      const content = require(join(path, file));
      if (prop === "middleware") {
        if (filename in context["config"]) {
          const plugin = content(context["config"][filename]);
          app.use(plugin);
        }
        return;
      }
      if (prop === "config" && content) {
        context[prop] = Object.assign({}, context[prop], content);
        return;
      }
      context[prop][filename] = content;
    });
  });
};
