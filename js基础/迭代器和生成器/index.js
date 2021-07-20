{
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
}

{
  // for 计算循环实现迭代
  /**
   * for 计算循环 实现迭代的确定
   * 1、实现迭代要提前知道如何使用数据结构：例如：通过[]来取得特定索引位置上的项，这个情况不适用于其他数据结构
   * 2、遍历顺序并不是数据结构固有：例如：通过递增索引来访问数据是特定于数据类型的方式，并不适用于其他隐式顺序的数据结构
   * todo 学习一下其他 隐式顺序结构是怎样访问的？
   */

  const arr = ['foo', 'bar', 'baz'];
  for (let i = 0; i < arr.length; i++) {
    const target = arr[i];
    console.log(target);
  }
}

// es 较早的版本必须使用循环或者其他辅助结构来实现迭代 ，随着代码量增加，代码结构会变得混乱。

// 迭代器模式
{
  /**
   * 迭代器模式
   *
   */

  let str = 'ABC';
  let arr = [1, 2, 3, 3, 4, 4];
  let map = new Map().set('a', 1).set('b', 2).set('c', 3);
  let set = new Set().add('a').add('b');
  let els = document.querySelectorAll('div');
  console.log(str[Symbol.iterator]);
  console.log(arr[Symbol.iterator]);
  console.log(str[Symbol.iterator]());
  console.log(arr[Symbol.iterator]());

  for (const iterator of str) {
    console.log(iterator);
  }

  for (const iterator of arr) {
    console.log(iterator);
  }
  for (const iterator of map) {
    console.log(iterator);
  }
  for (const iterator of set) {
    console.log(iterator);
  }

  console.log(Array.from(str));
  console.log(Array.from(map));
  console.log(Array.from(set));
  console.log(Array.from(new Set(arr)));
  console.log([...map]);
  console.log([...set]);
  console.log(Array.from(els));

  // Promise.all(str).then(list => {
  //   console.log(list);
  // });

  // Promise.race(str).then(data => {
  //   console.log(data);
  // });

  // Promise.all(map).then(list => {
  //   console.log(list);
  // });
}

{
  let arr = ['FOO', 'BAR'];
  console.log(arr[Symbol.iterator]);
  const iter = arr[Symbol.iterator]();

  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());
}

{
  class Foo {
    [Symbol.iterator]() {
      let i = 0;
      return {
        next() {
          i += 1;
          if (i < 100) {
            return { done: false, value: 'foo' };
          } else {
            return { done: true, value: undefined };
          }
        },
      };
    }
  }
  const f = new Foo();
  console.log(Array.from(f));
  for (const iterator of f) {
    console.log(iterator);
  }
  for (const iterator of f) {
    console.log(iterator);
  }
}

// 提前退出
{
  let arr = [1, 2, 3, 4, 5, 6];
  (() => {
    for (const elem of arr) {
      if (elem === 5) {
        break;
        // continue;
        // return; // error return 只存在 函数体中 函数体内才可以使用 return
      }
      console.log(elem, 'for of');
    }
  })();

  // 自定义生成器 提前退出
  class Counter {
    constructor(limit) {
      this.limit = limit;
    }

    [Symbol.iterator]() {
      let count = 1;
      let limit = this.limit;
      return {
        next() {
          if (count <= limit) {
            return { done: false, value: count++ };
          } else {
            return {
              done: true,
            };
          }
        },
        return() {
          console.log('exiting early');
          return { done: true };
        },
      };
    }
  }

  const count = new Counter(10);
  const countIter = count[Symbol.iterator]();
  console.log(countIter);

  for (const iterator of count) {
    if (iterator > 2) {
      break;
    }
    console.log(iterator);
  }

  const iter = arr[Symbol.iterator]();

  for (const iterator of iter) {
    if (iterator > 2) {
      break;
    }
    console.log(iterator);
  }

  for (const iterator of iter) {
    console.log(iterator);
  }
}

/**
 * 生成器
 * es6 新增的一种代码结构，拥有在一个函数快内暂停和恢复代码执行的能力
 * 结构：生成器的结构是一个函数 函数·名称前面加一个（*）表示他是一个生成器
 * 只要是能定义函数的地方 就可以定义生成器
 * 箭头函数不能用来定义生成器函数
 */

// 基础使用
{
  // 生成器函数声明
  function* generatorFn() {}

  // 生成器表达式
  let generatorFn1 = function* () {};

  // 对象字面量方法的生成器
  let foo = {
    *generatorFn() {},
  };
  // 类实例 方法的生成器函数
  class Foo {
    *generatorFn() {}
  }

  /**
   * 调用生成器函数 会产生一个生成器对象
   */
  // 调用生成器函数会产生一个生成器对象
  const g = generatorFn();
  // 生成器对象一开始 处于暂停的状态
  console.log(g); //generatorFn {<suspended>}
  /**
   * 生成器对象也实现了iterator接口，因此也具有next 方法
   * 调用这个方法会让生成器开始或恢复执行
   */
  console.log(g.next()); // {done:true,value:undefined} 返回值类似 迭代器

  // value 是生成器函数的返回值 默认值 是 undefined 可以通过生成器函数返回值指定

  function* generatorFunc() {
    console.log('generator run');
    yield 'foo';
    return 'acc';
  }

  const generatorFuncObject = generatorFunc();
  console.log(generatorFuncObject.next()); // {value:'foo',done:false}
  console.log(generatorFuncObject.next()); //{value:'foo',done:false}

  // 生成器函数只会在初次调用next() 方法的后开始执行
  function* generatorLog() {
    console.log('generator');
  }

  const generatorLogObj = generatorLog();
  // 生成器函数只有在初次调用生成器对象next 方法后才开始执行 所以这里才开始打印日志
  generatorLogObj.next();
}
