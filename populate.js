var db = require('./db');
var Request = require('./models/request');
const fs = require('fs');


var data = JSON.parse(fs.readFileSync('./data.json', 'utf-8', function(err, res) {
    console.log("Finished reading");
}));

var result = data.result;

result.forEach(function(item, index) {
    Request.create({
        latitude: item.latitude,
        longitude: item.longitude,
        device_id: 0
    });
})

console.log("Finish create request")

Request.find({}).exec(function(err, res) {
    console.log(res);
})