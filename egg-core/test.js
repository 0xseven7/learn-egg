// const arr = ["a", "b", "c"].reduce(
//   (obj, v) => ((obj[v] = v.charCodeAt()), obj),
//   {}
// );
// console.log(arr);
const test = i => ((i = i + 3), i);
console.log(test(2));
