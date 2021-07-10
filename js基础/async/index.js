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

/**
 * ajax 回调的方式实现 未来值的相加
 */

const add = (getX, getY, cb) => {
  let x, y;
  getX(result => {
    x = result.id;
    if (y && x) {
      cb(x + y);
    }
  });
  getY(result => {
    y = result.id;
    if (y && x) {
      cb(x + y);
    }
  });
};

const getFuncX = cb => {
  return mockAjax('https://jsonplaceholder.typicode.com/posts/1', cb);
};
const getFuncY = cb => {
  return mockAjax('https://jsonplaceholder.typicode.com/posts/2', cb);
};

add(getFuncX, getFuncY, sum => {
  console.log(sum);
});

/**
 * Promise 处理这样的两个未来值的相加
 */

{
  const add = (getXPromise, getYPromise) => {
    return Promise.all([getXPromise, getYPromise]).then(
      ([resultX, resultY]) => {
        return resultX.id + resultY.id;
      }
    );
  };

  const get = async url => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  add(
    get('https://jsonplaceholder.typicode.com/posts/1'),
    get('https://jsonplaceholder.typicode.com/posts/2')
  ).then(sum => {
    console.log(sum);
  });

  const p = get('https://jsonplaceholder.typicode.com/posts/1');
  p.then(data => {
    console.log('then one ');
    console.log(data);
  });

  p.then(data => {
    console.log('then two');
    console.log(data);
  });
}
