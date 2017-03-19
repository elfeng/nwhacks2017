var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nwhacks2017');

var userSchema = {
    name: String,
    food: Array
}

var Users = mongoose.model('Users', userSchema, 'users');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Daily Nutrition Tracker' });
});

module.exports = router;
