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

{
  function* generatorFn() {
    return 'foo';
  }

  let generatorObj = generatorFn();
  console.log(generatorObj);
  console.log(generatorObj.next());
  console.log(generatorObj.next());
  console.log(generatorObj.next());
  console.log(generatorObj.next());
}

{
  function* generatorFn() {
    yield 'foo';
    yield 'bar';
    return 'baz';
  }
  const generatorObject = generatorFn();
  console.log(generatorObject.next());
  console.log(generatorObject.next());
  console.log(generatorObject.next());
  console.log(generatorObject.next());
}
