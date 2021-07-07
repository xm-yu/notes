/*
 * @Author: yuzhicheng
 * @Date: 2021-07-07 16:36:12
 * @Last Modified by: yuzhicheng
 * @Last Modified time: 2021-07-07 18:25:08
 * @Desc Promise  Promise 解决了什么问题
 */

console.log('-----promise start----');

/**
 * @问题 面试官：聊聊Promise,Promise解决了什么问题？
 * 之前我都是回单解决了死亡回调的问题
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
 *
 */

console.log('-----promise end-----');
