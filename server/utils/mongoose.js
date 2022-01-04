const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose
    .connect('', {
        poolSize: 10,
    })
    .then(
        () => {
            console.log('Mongoose is connected');
        },
        (err) => {
            console.log('Mongoose is not connected' + err);
        }
    );

module.exports = mongoose;
