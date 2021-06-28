/*
 * @Author: yuzhicheng
 * @Date: 2021-06-25 16:34:02
 * @Last Modified by: yuzhicheng
 * @Last Modified time: 2021-06-28 11:44:51
 * @desc reduce 的实现原理
 */

// 数组归并的方法reduce 的基本使用

/**
 * reduce的基本使用
 * 第一个参数接受一个函数，这个函数接受4个参数，上一个归并值，当前项，当前项索引，数组本身
 * 第二个可选参数，归并的起点值，如果没有传递这个参数 则第一次的迭代将从数组的第二项开始 ，所以第一次迭代传递给归并函数的第一个参数是 数组的第一项（作为归并的起点值）， 第二个参数是第二项
 */

const arr = [1, 2, 3, 4];

const count = arr.reduce((prevResult, cur, i, targetArr) => {
  return prevResult + cur;
}, 0);

// console.log(count);

/**
 * 第二个可选参数（归并的起点值），如果不传 空数组报错
 */
// const list = [];
// const conut1 = list.reduce((prev, cur) => {
//   return prev + cur;
// });

// console.log(count1); // TypeError: Reduce of empty array with no initial value

// 传递归并初始值 遇到空数组不会报错
const list = [];
const count1 = list.reduce((prev, cur) => {
  return prev + cur;
}, 0);

console.log(count1);

//  使用reduce 最好是要传递第二个参数 ，不传递第二个参数 遇到空数组 存在抛出异常的情况

Array.prototype.myReduce = function (executor, initValue) {
  // console.log(this);
  // console.log('myReduce log');
  const arr = [...this];
  let result = initValue !== undefined ? initValue : arr[0];
  const startIndex = initValue !== undefined ? 0 : 2;

  for (let index = startIndex; index < arr.length; index++) {
    const cur = arr[index];
    result = executor(result, cur, index, arr);
  }
  return result;
};

console.log([1, 3, 4, 5].myReduce((prev, cur) => prev + cur, 0));

// 异步循环
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
];

(async () => {
  urls.forEach(async url => {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
  });
})();
