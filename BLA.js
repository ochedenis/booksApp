const mongodb = require("mongodb").MongoClient;

let url = "mongodb://localhost:27017/";

mongodb.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
    	throw err;	
    }

    client
      .db('books_db')
      .collection('booksModel')
      .find()
      .forEach((obj) => {
          console.log(obj._id);
      }).then(() => client.close());
  }
);