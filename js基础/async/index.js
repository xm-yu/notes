/*
 * @Author: yuzhicheng
 * @Date: 2021-07-06 09:52:04
 * @Last Modified by: yuzhicheng
 * @Last Modified time: 2021-07-06 18:35:23
 * @Desc 异步
 */

const res = {};

const foo = results => {
  res.foo = results;
  console.log('foo', results);
};

const bar = results => {
  res.bar = results;
  console.log('bar', results);
};

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => {
    foo(data);
  });

fetch('https://jsonplaceholder.typicode.com/posts/2')
  .then(response => response.json())
  .then(data => {
    bar(data);
  });

const mockAjax = async (url, succeedCb, failCb) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    succeedCb(json);
  } catch (error) {
    failCb(error);
  }
};

mockAjax(
  'https://jsonplaceholder.typicode.com/posts/2',
  data => {
    console.log('mockAjax', data);
  },
  error => {
    console.log(error);
  }
);
