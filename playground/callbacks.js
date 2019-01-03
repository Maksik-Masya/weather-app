
const getUser = (id, callback) => {
    const user = {
        id: id,
        name: 'Maxym',
    }
    setTimeout(() => {
        callback(user);
    }, 3000);
}

getUser(12, (user) => {
    console.log(user);
})