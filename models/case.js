var mongoose = require('mongoose');
var Schema = mongoose.Schema

var CaseSchema = new Schema({
    user_id: Schema.Types.String,
    resolved: Schema.Types.Boolean,
    case_id: Schema.Types.String,
    packets: Schema.Types.Array,

}, { 
    versionKey: false, 
    minimize: false
})

module.exports = mongoose.model('Case', CaseSchema)