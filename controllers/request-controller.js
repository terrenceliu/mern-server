var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Request = require('../models/request');

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
})

module.exports = router;