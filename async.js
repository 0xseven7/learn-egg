// // 回调实现异步

// function myAsync(name, fn) {
//   setTimeout(() => {
//     fn(null, "-" + name + "-");
//   }, 1000);
// }
// myAsync("hello world", (err, name) => {
//   if (err) console.err(err);
//   console.log(name);
// });

// 事件实现异步

// class Evente {
//   constructor() {
//     this.maps = {};
//   }
//   add(name, fn) {
//     if (this.maps[name]) {
//       this.maps[name].push(fn);
//     }
//     this.maps[name] = [fn];
//     return this;
//   }
//   emit(name, ...args) {
//     console.log(name);
//     this.maps[name].forEach(fn => {
//       fn(...args);
//     });
//     return this;
//   }
// }
// let e = new Evente();
// e.add("hello", (err, name) => {
//   if (err) {
//     return console.log(err);
//   }
// }).emit("hello", null, "hello");

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
