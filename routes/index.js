var express = require('express');
var router = express.Router();
var requestify = require('requestify'); 
var api_key = "kPTxU2svL7jNzDrPr9VRGaC8jQWNtN9eD2xAyfUF"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// handle food search requests
router.get('/search', function(req, res) {

    // get the query string from the URL
    q = req.query.q

	// init ndbno number 
    var ndbno = -1;
    var food_name = "";
    // make first GET request to the NDB search API
    requestify.get('https://api.nal.usda.gov/ndb/search/?format=json&q=' 
    				+ q + '&sort=r&max=25&offset=0&api_key=' 
    				+ api_key)
    .then(function(response) {
        // get the ndbno of the top result by relevancy
        food_name = response.getBody().list.item[0].name
        ndbno = response.getBody().list.item[0].ndbno;

        if (ndbno > -1) {
	    	// get the nutrition info of the food item with this ndbno
	    	getnutrientinfo(ndbno, food_name, res)
	    } else {
	    	console.log("error: invalid ndbno response")
	    }
	}
	);
})


function getnutrientinfo(ndbno, food_name, res) {
    requestify.get('https://api.nal.usda.gov/ndb/reports?ndbno='
    				 + ndbno + '&type=b&format=json&api_key=' 
    				 + api_key)
    .then(function(response) {

        // get and process the response text
        nutinfo = response.getBody()

        // send and display the resulting JSON
	   	//res.send('search', {  nutinfo });
	   	res.status('search').send({ nutinfo })
	    //res.render('search', {  nutinfo });
  	}); 
} 

module.exports = router;
