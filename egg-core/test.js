const arr = ["a", "b", "c"].reduce(
  (obj, v) => ((obj[v] = v.charCodeAt()), obj),
  {}
);
console.log(arr);
