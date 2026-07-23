window.PromiseRacePolyfill = function (promises) {
    return new Promise((resolve, reject) => {

        if (promises.length === 0) {
            resolve("");
            return;
        }

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((value) => {
                    resolve(value)
                })
                .catch(reject);
        });
    });
};

const promise1 = Promise.resolve(1);
const promise2 = new Promise((res) => {
    setTimeout(() => res(10), 1000)
});
// const promise3 = Promise.reject(10);
const promise3 = 10;
const promise4 = 5;

async function test() {
    try {
        const result = await PromiseRacePolyfill([promise1, promise2, promise3])
        console.log(result);
    } catch(err) {
        console.error("Error: ", err)
    }
}

console.log(test());