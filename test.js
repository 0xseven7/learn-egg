function compose(middleware) {
  return function(ctx, next) {};
  let idx = -1;
  return dispatch(0);
  function dispatch(i) {
    if (i <= idx)
      return Promise.reject(new Error("next() called multiple times"));
    idx = i;
    let fn = middleware[i];
    if (i === middleware.length) {
      fn = next;
    }
    if (!fn) return Promise.resolve();
    try {
      return Promise.resolve(
        fn(ctx, function next() {
          return dispatch(i + 1);
        })
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

async function a(ctx, next) {
  console.log(1);
  const hello = await Promise.resolve("hello node.js");
  console.log(hello);
  await next();
  console.log("a edn");
}
async function b(ctx, next) {
  console.log(2);
  const hello = await Promise.resolve("hello node.js 2");
  console.log(hello);
  await next();
  console.log("b end");
}
compose([a, b])({});
