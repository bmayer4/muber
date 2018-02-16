const assert = require('assert');
const request = require('supertest');  
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
    
    it('Post to /api/drivers creates a new driver', (done) => {

        Driver.count().then((oldCount) => {
            request(app)
            .post('/api/drivers')
            .send({ email: 'brett@example.com' })
            .end((err, res) => {
                if (err) {  
                return done(err);
                }
            assert(res.statusCode === 200);
            Driver.count().then((count) => {
                assert(count !== oldCount);
                done();
            });
    
            });
                         
        });

    });

    it('PATCH to /api/drivers/:id edits an existing driver', (done) => {
        const driverTest = new Driver({ email: 'b@b.com', driving: false });
        driverTest.save().then((driver) => {
            console.log('$$$$$$', driver);
            request(app)
            .patch(`/api/drivers/${driver._id}`)
            .send({ driving: true })
            .end((err, res) => {
                if (err) {  
                    return done(err);
                }
                console.log(res.body);
                assert(res.body.email === 'b@b.com');
                assert(res.body.driving === true);
                done();
                //assert(res.)

            });
        });
    });

    // it('DELETE /api/drivers/:id deletes an existing user', (done) => {
    //     const driverTest = new Driver({email: 'todelete@t.com'});
    //     driverTest.save().then((driver) => {  //driver is returned
    //         request(app)
    //         .delete(`/api/drivers/${driver._id}`)
    //         .end((err, res) => {
    //             if (err) {  
    //                 return done(err);
    //             }
    //             Driver.findById({ _id: driver._id}).then((dri) => {
    //                 assert(dri === null);
    //                 done();
    //             });
    //         });
    //     })
    // });


    it('GET /api/drivers/ finds drivers in a location', (done) => {

        const seattleDriver = new Driver({
            email: 'seattle@test.com', 
            geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
        });

        const miamiDriver = new Driver({
            email: 'miami@test.com', 
            geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
        });

        Promise.all([ seattleDriver.save(), miamiDriver.save() ]).then(() => {
            request(app)
            .get('/api/drivers?lng=-122&lat=47')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                console.log('***res from test location drivers: ', res.body);
                assert(res.body.length === 1);
                assert(res.body[0].email === 'seattle@test.com');
                done();
            })
        });
    });


});