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
    console.log( 'got the book data from request:', bookData.title )
    let newBook = new Book(bookData);
    console.log('new book is:', newBook)
    newBook.save()
    .then(() =>{
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('error adding book:', error );
        res.sendStatus(500);
    });
});


router.delete('/', (req, res) =>{
    // delete does not use data, so we'll use params instead
    // data is req.body
    // params is req.query
    let bookId = req.query._id;
    Book.findByIdAndRemove(req.query._id)
        .then( () => {
            //good servers respond.  say ok.
            console.log(`removed book ${bookId}`)
            res.sendStatus(200);
        })
        .catch( () => {
            //bad stuff happened.  good servers still send errors.
            console.log( 'Error removing book:', error );
            res.sendStatus(500);
        });
});


module.exports = router;