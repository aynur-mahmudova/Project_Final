var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //parsing application/x-www-from-urlencoded
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);


//db --> tutorial & collection --> users (users: vegeta, kometa) !!!
mongoose.connect('mongodb://localhost:27017/tutorial', { useMongoClient: true }, function(err) {
    if (err) {
        console.log("Not connectet to the database: " + err);
    } else {
        console.log("Successfully connected to MongoDB");
    }
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
})

app.listen(port, function() {
    console.log('Running the server on port ' + port);
});