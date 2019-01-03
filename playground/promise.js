const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 1500);
    });
};

asyncAdd(1, 2).then((result) => {
    console.log('Result:', result);
    return asyncAdd(result, 2);
}).then((result) => {
    console.log('Must be 5', result);
}).catch(console.log);

// const somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve('Hey, it worked!');
//         reject('failed !!!!!');
//     }, 2500)
// });
//
// somePromise.then((message) => {
//     console.log('result ', message);
// }, (error) => {
//     console.log('error', error);
// });