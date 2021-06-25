var _class, _class2, _dec, _class3;

function _applyDecoratedDescriptor(
  target,
  property,
  decorators,
  descriptor,
  context
) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;
  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }
  desc = decorators
    .slice()
    .reverse()
    .reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }
  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }
  return desc;
}

function log(target) {
  target.prototype.logger = () => `${target.name}被调用`;
} // 类的装饰

let Myclass =
  log(
    (_class = class Myclass {
      toDo() {}
    })
  ) || _class;

const myclass = new Myclass();
console.log(myclass.logger());

let Dog =
  saeled(
    (_class2 = class Dog {
      bark() {
        console.log('旺旺！');
      }
    })
  ) || _class2;

function saeled(target) {
  Object.seal(target);
  Object.seal(target.prototype);
}

let dog = new Dog();
dog.bark(); // 属性或方法的装饰

let C =
  ((_dec = readonny(false)),
  ((_class3 = class C {
    method() {
      console.log('cat');
    }
  }),
  _applyDecoratedDescriptor(
    _class3.prototype,
    'method',
    [_dec],
    Object.getOwnPropertyDescriptor(_class3.prototype, 'method'),
    _class3.prototype
  ),
  _class3));

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
