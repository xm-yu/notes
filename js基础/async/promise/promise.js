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

// promise A+规明确规定 onFulfilled和 onRejected方法异步执行， 应该在then方法被调用的那轮事件循环之后的新执行栈中执行

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

/**
 * @断开的的promise链
 */

{
  const myFetch = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // bad 这个例子断开promise 链 如果somethingComplicated 发生错误，返回出得promise 无法通过catch 捕获到错误
  const anAsyncCall1 = url => {
    const promise = myFetch(url);
    promise.then(data => {
      throw new Error('an async call throw error');
    });
    return promise;
  };

  anAsyncCall1(mockFetchUrl).catch(error => {
    // 这里不能捕获 anAsyncCall 里面 promise的错误
    console.log('anAsyncCall1 catch error', error);
  });

  const anAsyncCall2 = url => {
    const promise = myFetch(url);
    return promise.then(data => {
      throw new Error('an async call throw error');
    });
  };

  anAsyncCall2(mockFetchUrl).catch(error => {
    // 这里promise 链·上了 能捕获到错误
    console.log('anAsyncCall2 catch error', error);
  });
}

// promise 并发控制
{
  const urlTpl = 'https://jsonplaceholder.typicode.com/posts';
  const urls = [];
  for (let index = 0; index < 2; index++) {
    // if (index % 2 === 0) {
    //   urls.push('fdafasf');
    // }
    urls.push(`${urlTpl}/${index + 1}`);
  }

  const requestQueue = urls => {
    const len = urls.length;
    const results = [];
    let counter = 0;
    return new Promise(resolve => {
      const request = index => {
        counter += 1;
        const url = urls[index];
        fetch(url)
          .then(response => {
            return response.json();
          })
          .then(json => {
            results.push(json);
            if (counter === len) {
              resolve(results);
            } else {
              request(++index);
            }
          });
      };

      request(0);
    });
  };

  // requestQueue(urls).then(result => {
  //   console.log(result);
  // });

  const requestQueueReduce = urls => {
    console.log(urls);
    return urls.reduce(
      (promise, curUrl) =>
        promise.then(results =>
          fetch(curUrl)
            .then(response => response.json())
            .then(json => [...results, json])
            .catch(err => {
              return [...results, 'error'];
            })
        ),
      Promise.resolve([])
    );
  };

  // requestQueueReduce(urls).then(result => {
  //   console.log(result);
  // });

  const limitRequestConcurrency = (urls, max = 1) => {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(urls)) {
        // todo 简单判断下基本的条件 还可以添加其他细节的限制
        reject('参数不合法啊');
      }
      const len = urls.length;
      const results = new Array(len).fill(false);
      let sendCount = 0;
      let finishCount = 0;

      const request = () => {
        const index = sendCount++;
        console.log('run index ', index, urls[index]);
        if (index >= len) return;
        const url = urls[index];
        fetch(url)
          .then(response => response.json())
          .then(json => {
            results[index] = json;
          })
          .catch(err => {
            results[index] = err;
          })
          .finally(() => {
            finishCount += 1;
            if (finishCount === len) return resolve(results);
            request();
          });
      };
      // 先达到最大并发数量
      while (sendCount < max && sendCount < len) {
        request();
      }
    });
  };
  limitRequestConcurrency(urls, 3).then(data => {
    console.log(data);
  });
}
