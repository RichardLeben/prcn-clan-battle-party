const arr1 = [1,2,3,4,5];
const arr2 = [1,3,6,7,8];
const arr3 = [2,3,9,10,11];
// 1,2,3
const dup = [...arr1, ...arr2, ...arr3].filter((val, idx, arr) => {
  return arr.indexOf(val) === idx && idx !== arr.lastIndexOf(val);
});

// 1,2
const dup1 = [...arr1, ...dup].filter((val, idx, arr) => {
  return arr.indexOf(val) === idx && idx !== arr.lastIndexOf(val);
});
// 1,3
const dup2 = [...arr2, ...dup].filter((val, idx, arr) => {
  return arr.indexOf(val) === idx && idx !== arr.lastIndexOf(val);
});
// 2,3
const dup3 = [...arr3, ...dup].filter((val, idx, arr) => {
  return arr.indexOf(val) === idx && idx !== arr.lastIndexOf(val);
});

const arr1 = [1, 2, 3],
      arr2 = ['a', 'b', 'c'],
      arr3 = ['s', 't', 'u'];

const result = [];

arr1.forEach(v1 => {
  arr2.forEach(v2 => {
    arr3.forEach(v3 => {
      result.push([v1, v2, v3]);
    });
  });
});
