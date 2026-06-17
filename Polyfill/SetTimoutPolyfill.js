(function () {
  const timersMap = new Map();
  let timerId = 0;
  function mySetTimeout(callback, delay, ...args) {
    const start = Date.now();
    const currentTimerId = ++timerId;

    function check() {
      if (!timersMap.get(currentTimerId)) return;

      const current = Date.now();

      if (current - start > delay) {
        callback(...args);
        timersMap.delete(currentTimerId);
      } else {
        const frameId = requestAnimationFrame(check);
        timersMap.set(currentTimerId, frameId);
      }
    }

    const initialFrameId = requestAnimationFrame(check);
    timersMap.set(currentTimerId, initialFrameId);

    return currentTimerId;
  }

  function myClearTimeout(timerId) {
    const frameId = timersMap.get(timerId);
    cancelAnimationFrame(frameId);
    timersMap.delete(timerId);
  }

  window.mySetTimeout = mySetTimeout;
  window.myClearTimeout = myClearTimeout;
})();

// execution
const id = mySetTimeout(() => {
  console.log("hi");
}, 5000);

myClearTimeout(id);