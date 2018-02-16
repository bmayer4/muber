const mongoose = require('mongoose');

before((done) => {
    mongoose.connect('mongodb://localhost:27017/muber_test');  //
    mongoose.connection
    .once('open', () => { done() })
    .on('error', (err) => { console.warn('Warning', err) });
});

beforeEach((done) => {
    const Driver = mongoose.model('driver');
    Driver.remove({}).then(() => {
        done();
    }).catch((e) => {
        done(e);
    });
});