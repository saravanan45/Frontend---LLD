function MyPromise(executor) {
  let state = "pending";
  let value;

  const fulfilledHandlers = [];
  const rejectedHandlers = [];

  const resolve = (val) => {
    if (state !== "pending") return;

    // Handle returned promise
    if (val instanceof MyPromise) {
      return val.then(resolve, reject);
    }

    state = "fulfilled";
    value = val;

    queueMicrotask(() => {
      fulfilledHandlers.forEach((handler) => handler());
    });
  };

  const reject = (reason) => {
    if (state !== "pending") return;

    state = "rejected";
    value = reason;

    queueMicrotask(() => {
      rejectedHandlers.forEach((handler) => handler());
    });
  };

  this.then = function (onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handleFulfilled = () => {
        try {
          if (typeof onFulfilled !== "function") {
            resolve(value);
            return;
          }

          const result = onFulfilled(value);

          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      const handleRejected = () => {
        try {
          if (typeof onRejected !== "function") {
            reject(value);
            return;
          }

          const result = onRejected(value);

          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (state === "fulfilled") {
        queueMicrotask(handleFulfilled);
      } else if (state === "rejected") {
        queueMicrotask(handleRejected);
      } else {
        fulfilledHandlers.push(handleFulfilled);
        rejectedHandlers.push(handleRejected);
      }
    });
  };

  this.catch = function (onRejected) {
    return this.then(null, onRejected);
  };

  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}