const { resolve, join, parse } = require("path");
const globby = require("globby");
module.exports = app => {
  const AppPath = resolve(__dirname, "app");
  const context = app["context"];
};
// const fileAbsolutePath = ["config", "middleware", "service"].reduce(
//   (folderMap, v) => (((folderMap[v] = join(AppPath, v)), folderMap), {})
// );
const fileAbsolutePath = {
  config: join(AppPath, "config"),
  service: join(AppPath, "service"),
  moiddleware: join(AppPath, "moiddleware")
};
