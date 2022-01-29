const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const Books = require("../models/Books");
const checkAuth = require('../util/auth.js');
const fetch = require('node-fetch');
const _ = require('lodash');

// New Books
router.get("/new", async (req, res) => {
    try {
        const book = await Books.find().sort({ published: -1 });
        res.status(200).json({
            message: "New Books",
            data: {
                book
            }
        });
      } catch (err) {
        res.status(500).json({message: err})
      }
});

//Top Books 
router.get("/top", async (req, res) => {
    try{
        fetch('https://microservicesapis.herokuapp.com/interactions')
        .then(res => res.json())
        .then(data => {
            if(data.message =="All Interactions") {
                fetch('https://microservicesapis.herokuapp.com/contents/new')
                .then(res => res.json())
                .then(books => {
                    if(books.message =="New Books") {
                        const book_data = books.data.book;
                        const interactions = data.data.interactions;
                        const top_books = _.merge(book_data, interactions);
                        top_books.sort(function(a, b) {
                            return b.numberOfInteractions - a.numberOfInteractions;
                          });
                        res.status(200).json({
                            message: "Top Books",
                                data: {
                                    top_books
                                }
                        });            
                }})
        }})
    }catch(err){
        res.status(500).json({message: err})
    }
});

        

//Publish new Book
router.post("/publish", checkAuth,
body('title').not().isEmpty().withMessage('Title is required'),
body('story').not().isEmpty().withMessage('Story is required'),
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
    }
    const { title, story } = req.body;
    try {
        const user = req.user;
        const titles = await Books.findOne({ title });
        if (titles) {
            return res.status(400).send('Same title book is already exist');
        }
        const newBook = new Books({
            title,
            story,
            userId: user.id,
            username: user.username,
            published: new Date().toISOString()
        });
        const book = await newBook.save();
        res.status(200).json({
            message: "Book published successfully",
            data: {
                message: "Book published successfully",
                book : book
            }
        });
    } catch (err) {
        res.status(500).json({message: err})
    }
});

//Update book
router.put("/update/:id", checkAuth,
body('title').not().isEmpty().withMessage('Title is required'),
body('story').not().isEmpty().withMessage('Story is required'),
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
    }
    const book = await Books.findById(req.params.id);
    if(!book){
        return res.status(400).send('Book not found');
    }
    if(book.userId !== req.user.id){
        return res.status(400).send('You are not authorized to delete this book');
    }
    const { title, story } = req.body;
    try{
        const titles = await Books.findOne({ title });
        if (titles) {
            return res.status(400).send('Same title book is already exist');
        }
        const updatedBook = await Books.findByIdAndUpdate({ _id : req.params.id }, {
            title,
            story
        }, { new: true });
        res.status(200).json({
            message: 'Book updated successfully',
            book: updatedBook
        }); 
    }catch (err) {
        res.status(500).json({message: err})
    }
});

//Delete book
router.delete("/delete/:id", checkAuth, async (req, res) => {
    try {
        const book = await Books.findById(req.params.id);
        if(!book){
            return res.status(400).send('Book not found');
        }
        if(book.userId !== req.user.id){
            return res.status(400).send('You are not authorized to delete this book');
        }
        await Books.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Book deleted successfully",
            data: {
                message: "Book deleted successfully",
                book
            }
        });
    } catch (err) {
        res.status(500).json({message: err})
    }
});

module.exports = router;




