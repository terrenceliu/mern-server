var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Case = require('../models/case');

// Validate middleware

/**
 * Open a new case.
 * 
 * TODO: Validate connection in the middleware using access_token and validate_token.
 * @returns case_id the id of the new case. 
 */
router.post('/', function(req, response) {
    /**
     * Body data
     * {
     *     access_token:
     *     valid_token:
     * } 
     */
    
    // TODO: Validate tokens in req body.
    
    var instance = new Case();
    
    instance.resolved = false;

    instance.packets = [];

    instance.save((err) => {
        console.log(err);
    });

    // Send back case_id
    return response.json({
        case_id: instance._id
    });
});

/**
 * Returns all requests
 * 
 * FIXME: Only for test use. Deprecated on production
 */
router.get('/', function(req, response) {
    Case.find({}).sort({request_id: -1}).exec(function(err, result) {
        if (err) {
            response.status(500);
            return resizeBy.send();
        }

        response.status(200)
        return response.send(result);
    })
});

module.exports = router;

