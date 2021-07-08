/**
 * @promise解决了什么问题
 */

const mockFetchUrl = 'https://jsonplaceholder.typicode.com/posts/1';
const myFetch = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    throw new Error('error');

    return json;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @Promise解决函数嵌套的问题
 */
{
}

/**
 * @promise解决控制反转问题
 * @控制反转再反转
 */

{
  // 1，异步回到被调用多次的问题？
  // promise resolve 只能有一次 剩下的调用会会被忽略
}

/**
 * @Promise解决回调函数没有执行的问题
 * 使用 promise 竞态 解决没有执行回调的问题
 */
{
  const foo = () => {
    return new Promise(reslove => {
      if (Math.random() > 0.5) {
        reslove('suceess');
      }
    });
  };

  const timeoutPromise = delay => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('timeout!');
      }, delay);
    });
  };

  Promise.race([foo(), timeoutPromise(3000)])
    .then(value => {
      console.log('suceess');
      console.log(value);
    })
    .catch(err => {
      console.log('error');
      console.log(err);
    });
}

/**
 * @Promise解决回调函数可能是同步也可能是异步的问题
 *
 * 如果使用 回调的方式来处理这种逻辑 可能造成回调函数的调用一会是同步一会是异步
 * 影响我们对函数执行的顺序的判断 容易造成bug
 */
{
  const cache = new Map([
    ['https://jsonplaceholder.typicode.com/posts/1', 'title'],
  ]);

  const loadtitle = url => {
    const cacheUrlValue = cache.get(url);
    if (cacheUrlValue) return Promise.resolve(cacheUrlValue);

    return fetch(url)
      .then(resposne => {
        return resposne.json();
      })
      .then(data => {
        cache.set(url, data.title);
        return data.title;
      });
  };
  console.log('1');
  loadtitle('https://jsonplaceholder.typicode.com/posts/1').then(title => {
    console.log(title);
  });
  console.log('2');
}

// promise A+规明确规定 onFulfilled和 onRejected方法异步执行， 切应该在then方法被调用的那轮事件循环之后的新执行栈中执行

// 正确使用Promise的方式
// async 使用 promise all
{
  myFetch(mockFetchUrl)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      // 直接使用promise 无法得到完整的错误堆栈信息
      console.log('error result', err);
    });
  // mockAjax()

  (async () => {
    try {
      const data = await myFetch(mockFetchUrl);
      console.log('suceess');
    } catch (error) {
      // async / await能得到完整的堆栈信息
      console.log('async error result', error);
    }
  })();

  //todo async await 返回一个 Promise reject 会直接报错吗 ？
  (async () => {
    const result = await myFetch(mockFetchUrl);
    console.log(result);
  })();

  myFetch(mockFetchUrl)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
}
