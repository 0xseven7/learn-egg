// observer 模式实现异步

function create(fn) {
  let ret = false;
  return ({ next, complete, error }) => {
    function nextFn(...args) {
      if (ret) return;
      next(...args);
    }
    function completeFn(...args) {
      complete(...args);
      ret = true;
      console.log(ret);
    }
    function errorFn(...args) {
      error(...args);
    }
    fn({
      next: nextFn,
      complete: completeFn,
      error: errorFn
    });
    return () => {
      ret = true;
    };
  };
}
const observer1 = create(observer => {
  setTimeout(() => {
    observer.next(1);
  }, 1000);
  observer.next(2);
  observer.complete(3);
});
const subject = {
  next: value => {
    console.log(value);
  },
  complete: console.log,
  error: console.log
};
let unsubcrible = observer1(subject);
console.log(unsubcrible);
