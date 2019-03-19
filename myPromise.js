const PENDING = 0;
const RESOLVED = 1;
const REJECTED = 2;
function MyPromise(fn) {
  const that = this;
  that.value = null;
  that.state = PENDING;
  that.resovledCallbacks = [];
  that.rejectedCallbacks = [];
  function resolve(value) {
    setTimeout(function() {
      if (that.state === PENDING) {
        that.state = RESOLVED;
        that.value = value;
        that.resovledCallbacks.map(cb => cb(value));
      }
    }, 0);
  }
  function reject(value) {
    setTimeout(function() {
      if (that.state === PENDING) {
        that.state = REJECTED;
        that.value = value;
        that.rejectedCallbacks.map(cb => cb(value));
      }
    }, 0);
  }
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
MyPromise.prototype.then = function(resolve, reject) {
  const that = this;
  const onSuccess = typeof resolve === "function" ? resolve : v => v;
  const onError =
    typeof resolve === "function"
      ? resolve
      : r => {
          throw r;
        };
  if (that.state === PENDING) {
    that.resovledCallbacks.push(onSuccess);
    that.resovledCallbacks.push(onError);
  }
  if (that.state === RESOLVED) {
    onSuccess(that.value);
  }
  if (that.state === REJECTED) {
    onError(that.value);
  }
};
