var mongoose = require('mongoose');
var db_uri = 
process.env.MONGOLAB_URI || 
process.env.MONGOHQ_URL ||
"mongodb://localhost/safety-server"

var port = process.env.PORT || 27017

mongoose.connect(db_uri, (err, res) => {
    if (err) {
        console.log("[DB][Error] Failed to connect to: " + db_uri + ". " + err);
    } else {
        console.log("[DB][Success] Connected to: " + db_uri);
    }
});

