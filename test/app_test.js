const assert = require('assert');
const request = require('supertest');  //convention is name variable request
const app = require('../app');

describe('The express app', () => {

    it('handles a get request to /api', (done) => {
        request(app)
        .get('/api')
        .end((err, res) => {
            if (err) {  //err would be from supertest, rare 
            return done(err);
            }
        assert(res.statusCode === 200);
        assert(res.body.Hi === "Hello!");
        done();
      
        });
    });

});