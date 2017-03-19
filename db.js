/*
 * Copyright (c) 2017 ObjectLabs Corporation
 * Distributed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Written with: mongodb@2.2.21
 * Documentation: http://docs.mongodb.org/ecosystem/drivers/node-js/
 * A Node script connecting to a MongoDB database given a MongoDB Connection URI.
*/

var mongodb = require('mongodb');

// Create seed data

var seedData = [
  {
    name: 'test1',
    food: 'blueberry'
  },
  {
    name: 'test2'
  },
  {
    name: 'test3'
  }
];

// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname

var uri = 'mongodb://heroku_p41fs15c:n3qn0sb80u7rg3nlbmovmf6vm0@ds135690.mlab.com:35690/heroku_p41fs15c';

mongodb.MongoClient.connect(uri, function(err, db) {

  if(err) throw err;

  /*
   * First we'll add a few users. Nothing is required to create the
   * users collection; it is created automatically when we insert.
   */

  var users = db.collection('users');

   // Note that the insert method can take either an array or a dict.

  users.insert(seedData, function(err, result) {

    if(err) throw err;

    /*
     * Then we need to give Boyz II Men credit for their contribution
     * to the hit "One Sweet Day".
     */

    users.update(
      { name: 'test1' },
      { $set: { food: 'raspberry' } },
      function (err, result) {

        if(err) throw err;

        /*
         * Finally we run a query which returns all the hits that spend 10 or
         * more weeks at number 1.
         */

        users.find(function (err, docs) {

          if(err) throw err;

          docs.forEach(function (doc) {
            console.log(
              'User: ' + doc['name'] + ' ate ' + doc['food'] + "."
            );
          });

          // Since this is an example, we'll clean up after ourselves.
          //users.drop(function (err) {
          //  if(err) throw err;

            // Only close the connection when your app is terminating.
            db.close(function (err) {
              if(err) throw err;
            });
          //});
        });
      }
    );
  });
});
