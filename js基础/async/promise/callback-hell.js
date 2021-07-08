/**
 * 异步回调地狱的问题
 */

const fs = require('fs');
const path = require('path');

function findLargest(dir, cb) {
  fs.readdir(dir, function (err, files) {
    if (err) return cb(err);
    let counter = files.length;
    let errored = false;
    let stats = [];
    files.forEach(function (file, index) {
      fs.stat(path.join(dir, file), (err, stat) => {
        if (errored) return;
        if (err) {
          errored = true;
          return cb(er);
        }
        stats[index] = stat;
        if (--counter === 0) {
          let largest = stats
            .filter(stat => stat.isFile())
            .reduce((prevFile, curFile) => {
              if (prevFile.size > curFile.size) return prevFile;
              return curFile;
            }, -1);
          cb(null, files[stats.indexOf(largest)]);
        }
      });
    });
  });
}

findLargest('./', (...args) => {
  console.log(args);
});

/**
 * @死亡回调存在的问题
 * 1、嵌套层数太多，嵌套函数容易引用很多外层的变量，如果同一作用域的其他函数也引用修改了 该变量，容易造成bug。
 * 2、嵌套太多，难以复用。因为异步回调函数中调用了外层的变量，提取代码之后 还需要对外层代码进行修改（复杂度高，容易出错）
 * 3、堆栈信息被断开（promise 也没有解决这个问题）
 */

/**
 * @异步回调堆栈信息被被断开的问题
 * JavaScript 引擎维护了一个执行上下文栈，函数执行的时候，会创建该函数的执行上下文压入栈中，当函数执行完成，会将该函数上下文出栈
 *
 * 如果A函数中调用了 B函数，js会先将A函数的执行上下文压入栈中， 再将B函数的执行上下文压入栈中，当B函数执行完毕，B函数执行上下文出栈，
 * A函数执行完毕 再讲A函数出栈。我们使用debugger中断代码执行 ，可以在在浏览器控制台查看完整的栈信息 ，使用try catch语句也能捕获完整的错误堆栈信息
 *
 * 异步回调无法向上面一样获得完整的错误堆栈信息 。
 * 1、无法通过try catch 捕获回调函数中的错误
 * 2、异步回调函数中抛出错误，没有完整的错误堆栈信息 ，只有回调函数中的堆栈信息。异步操作中的栈信息被中断，不方便我们调试错误
 * 可是异步回调函数，假如B函数是A函数的异步回调函数，我们执行A的时候会将回调函数假如任务队列中，代码继续执行，知道主线程完成之后，才会从任务队列中选择已经完成的任务，
 * 并将其回调函数压入栈中，这个时候栈中只有这个回调函数的执行上下文，如果回到报错我们也无法获取异步操作中的栈信息
 *
 */
