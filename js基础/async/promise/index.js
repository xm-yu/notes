/*
 * @Author: yuzhicheng
 * @Date: 2021-07-07 16:36:12
 * @Last Modified by: yuzhicheng
 * @Last Modified time: 2021-07-08 11:27:59
 * @Desc Promise  Promise 解决了什么问题
 */

console.log('-----promise start----');

/**
 * @问题 面试官：聊聊Promise,Promise解决了什么问题？
 * 回调出现问题 主要是出现在处理异步代码的问题是上
 * 之前我都是回调函数解决了死亡回调的问题（主要是出现在异步代码上）
 *
 * @思考 如果面试官问：那么我们使用回调导致了哪些不好的地方呢？
 *
 */

/**
 * @回调嵌套问题
 * 如果是异步以下代码的执行顺序是：A -> F -> B -> C -> E -> D
 * 1、回调嵌套会导致 然我们无法清晰理解代码的执行顺序。在实际项目中，嵌套的的复杂度越高，我们排查问题的难度也会成倍增加，需要在不同的函数中跳转。
 * 2、如果在复杂的回调嵌套中加入各种各样的逻辑判断，会导致我们的代码变得复杂，从而导致代码无法维护和更新的问题
 */
{
  try {
    doA(function () {
      doB();
      doC(function () {
        doD();
      });
      doE();
    });

    doF();
  } catch (e) {
    // todo
  }
}

/**
 * @控制反转问题
 * 控制反转反转问题 主要是出现在我们调用第三方的API。
 * 我们把回调函数的执行控制权交给了第三方的API ，这个时候你不知道第三方API是否会因为某个错误将你传入的回调函数执行多次
 * 其实还会有这些问题
 * 1、回调函数执行了多次
 * 2、回调函数没有执行
 * 3、回调函数有时执行同步执行 有时异步执行
 * 对于上面的情况 我们可能需要在回调函数的内部做处理
 */
{
  // todo
}

/**
 * 异步回调地狱
 */
{
}

// trycatch
{
  // 异步回调
  // 1、无法通过try catch 捕获回调函数中的错误
  // 2、回调函数中抛出错误，没有完整的错误堆栈信息 ，只有回调函数中的堆栈信息。异步操作中的栈信息被中断，不方便我们调试错误
  try {
    setTimeout(() => {
      // throws;
      throw new Error('异步回到报错');
    }, 100);
  } catch (error) {
    // 无法捕获异步回调中的错误
    console.log(error);
  }

  // 同步回调
  // 可以通过try catch 捕获异步回调中的错误
  // 可以获得完整的堆栈信息
  const foo = cb => {
    const age = 12;
    cb(age);
  };

  try {
    foo(age => {
      console.log(age);
      throw new Error('同步回调报错');
    });
  } catch (error) {
    console.log(error);
  }

  foo(age => {
    console.log(age);
    throw new Error('同步回调报错');
  });
}

console.log('-----promise end-----');
