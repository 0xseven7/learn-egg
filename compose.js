module.exports = function compose(middleware) {
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
};
