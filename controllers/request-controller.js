var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Request = require('../models/request');
var Case = require('../models/case');

router.post('/', function(req, response) {
    var data = req.body;

    if (!data.case_id) {
        // Create a new case and return the case id

        var instance = new Case();

        instance.resolved = false;

        instance.save((err) => {
            console.log(err)
            
        });

        var res_data = {
            case_id: instance._id
        }
        
        // Send back case_id
        response.json(res_data)

        return 
    }

    // Validate data
    if (!data.case_id || !data.lat || !data.lng || !data.timestamp) {
        response.status(400);
        response.send("Invalid data.")

        return
    }

    var instance = new Request()
    instance.case_id = data.case_id;
    instance.lat = data.lat;
    instance.lng = data.lng;
    instance.timestamp = data.timestamp;

    instance.save((err) => {
        console.log(err);
    });

    // TODO: Forward new request -> Socket -> Connected dashboard if any
    

});

/**
 * Returns all requests
 */
router.get('/', function (req, response) {
    Request.find({}).sort({request_id: -1}).exec(function (err, result) {
        if (err) {
            response.status(500)
            return res.send();
        }
        
        response.status(200)
        return response.send(result)
    })
});

/**
 * Get next case id
 */
router.get('/case', function (req, response) {
    Case.find({}).sort({case_id: -1}).limit(1).exec(function (err, result) {
        if (err) {
            response.status(500);
            return res.send();
        }
        
        response.status(200);
        return response.send(result);
    });
});

module.exports = router;