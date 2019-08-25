module.exports = options => {
  if (!options.format) {
    console.error("需要传递format");
  }
  console.log(options);

  return async (ctx, next) => {
    console.log(options.format(ctx.url));
    await next();
  };
};
