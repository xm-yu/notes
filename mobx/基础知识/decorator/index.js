function log(target) {
  target.prototype.logger = () => `${target.name}被调用`;
}
// 类的装饰
@log
class Myclass {
  toDo() {}
}

const myclass = new Myclass();
console.log(myclass.logger());

@saeled
class Dog {
  bark() {
    console.log('旺旺！');
  }
}

function saeled(target) {
  Object.seal(target);
  Object.seal(target.prototype);
}

let dog = new Dog();
dog.bark();

// 属性或方法的装饰
class C {
  @readonny(false)
  method() {
    console.log('cat');
  }
}

function readonny(boolean) {
  /**
   * target 为C.prototype
   **/
  return function d(target, key, descriptor) {
    console.log(target, key, descriptor);
    descriptor.writable = boolean;
  };
}

const c = new C();
c.method = () => {
  console.log('dog');
};
console.log(c);
console.log(Object.getOwnPropertyDescriptor(c, 'method'));
console.log(Object.getOwnPropertyDescriptor(C.prototype, 'method'));
