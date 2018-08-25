var mongoose = require('mongoose');
var Schema = mongoose.Schema

var RequestSchema = new Schema({
    case_id: {
        type: Schema.Types.ObjectId,
        ref: "Case"
    },
    lng: Schema.Types.Number,
    lat: Schema.Types.Number,
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { 
    versionKey: false, 
    minimize: false
})

module.exports = mongoose.model('Request', RequestSchema)