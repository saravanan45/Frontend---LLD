function limitConcurrency(tasks, limit) {
  let completed = 0;
  let nextTask = 0;
  const result = [];
  return new Promise((res, rej) => {
    if (tasks.length === 0) {
      resolve([]);
      return;
    }
    function runTask(index) {
      Promise.resolve(tasks[index]())
        .then((val) => {
          completed++;
          result[index] = val;
          if (completed === tasks.length) {
            res(result);
            return;
          }

          if (nextTask < tasks.length) {
            runTask(nextTask++);
          }
        })
        .catch((err) => {
          rej(err);
        });
    }

    while (nextTask < limit && nextTask < tasks.length) {
      runTask(nextTask++);
    }
  });
}
