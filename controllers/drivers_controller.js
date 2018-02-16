const Driver = require('../models/driver');   //this makes sure file is executed

module.exports = {

    greeting(req, res) {
        res.send({ Hi: 'Hello!'});  
    },
    
    create(req, res, next) {

        const driver = new Driver({
            email: req.body.email
        });
        driver.save().then((doc) => {
            res.send(doc);
        }).catch(next);  //next middleware handles errors, DRY, only go to this middleware if error in our route handlers
    },

    edit(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;
        console.log('********driverProps', driverProps);
        Driver.findOneAndUpdate({ _id: driverId }, { $set: driverProps }, { new: true }).then((driver) => {
            res.send(driver);
        }).catch(next);
    },

    delete(req, res, next) {
        const driverId = req.params.id;
        Driver.findOneAndRemove({_id: driverId}).then((driver) => {
            res.send(driver);
        })
    },

    index(req, res, next) {
        const { lng, lat } = req.query;
        
        Driver.aggregate([
            {
                '$geoNear':{
                    "near": {'type': 'Point', 'coordinates': [parseFloat(lng), parseFloat(lat)]},
                    "spherical": true, "distanceField": 'dist', "maxDistance": 200000
                }
            }    
        ])
                .then((drivers) => {
                    console.log('DRIVERS: ', drivers);
                    res.send(drivers);
                })
                .catch(next);
    }
};







//*** above is es6, could have been below syntax
// greeting: function(req, res) {

// }