const express = require ( 'express' );
const router = express.Router();


// require in our Mongoose Model
const Book = require('../modules/models/book.schema.js');

router.get('/', ( req, res ) => {
    Book.find()
        .then( ( data ) => {
            //we got stuff back from the database (noerror)
            console.log(`Got stuff back from mongo: ${data}`);
            res.send(data);
    })
    .catch( (error) => {
        //got an error from database
        console.log(`Error from mongo: ${error}`);
        res.sendStatus(500); //status for bad stuff happened
    });
});

router.post('/', (req, res) => {
    let bookData = req.body;
    console.log( 'got the book data from request:', bookData)
    let newBook = new Book(bookData);
    console.log('new book is:', newBook)
    newBook.save();
    res.sendStatus(201);
})

module.exports = router;