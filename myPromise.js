const PENDING = 0;
const RESOLVED = 1;
const REJECTED = 2;

function MyPromise(fn) {
  const that = this;
  that.value = null;
  that.state = PENDING;
  that.onSuccessCallBacks = [];
  that.onErrorCallbacks = [];
  function resolve(value) {
    setTimeout(() => {
      if (that.state === PENDING) {
        that.state = RESOLVED;
        that.value = value;
        that.onSuccessCallBacks.map(cb => {
          return cb(value);
        });
      }
    }, 0);
  }
  function rejecte(value) {
    setTimeout(() => {
      if (that.state === PENDING) {
        that.state = REJECTED;
        that.value = value;
        that.onErrorCallbacks.map(cb => cb(value));
      }
    }, 0);
  }
  try {
    fn(resolve, rejecte);
  } catch (e) {
    rejecte(e);
  }
}

MyPromise.prototype.then = function(resolve, rejecte) {
  const that = this;
  resolve = typeof resolve === "function" ? resolve : v => v;
  rejecte =
    typeof rejecte === "function"
      ? rejecte
      : v => {
          throw v;
        };

  if (that.state === PENDING) {
    that.onSuccessCallBacks.push(resolve);
    that.onErrorCallbacks.push(rejecte);
  }
  if (that.state === RESOLVED) {
    resolve(that.value);
  }
  if (that.state === REJECTED) {
    rejecte(that.value);
  }
};
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 0);
}).then(value => {
  console.log(value);
});
new MyPromise((resolve, reject) => {
  resolve(1);
}).then(value => {
  console.log(value);
});
