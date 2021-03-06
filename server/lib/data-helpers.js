// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet, (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, result);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets(callback) {
      db.collection('tweets')
        .find()
        .toArray((err, tweets) => {
          if (err) {
            return callback(err);
          }
          callback(null, tweets);
        });
    },
  };
};
