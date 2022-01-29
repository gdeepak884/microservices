const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const Interactions = require("../models/Interactions");
const checkAuth = require('../util/auth.js');

//get interactions
router.get("/", async (req, res) => {
    try {
        const interactions = await Interactions.aggregate([
            {
                $project: {
                    _id: "$bookId",
                    likes: "$likes",
                    reads: "$reads",
                    likeCount: { $size: "$likes" },
                    readCount: { $size: "$reads" },
                    numberOfInteractions: { $sum :[{ $size: "$reads" },{ $size: "$likes" }]}
                }
            }
        ]);
        res.status(200).json({
            message: "All Interactions",
            data: {
                interactions
            }
        });
      } catch (err) {
        res.status(500).json({message: err})
      }
});


//like a book
router.post("/like", checkAuth,
body('bookId').not().isEmpty().withMessage('Book Id is required'),
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
    }
    try {
        const book_int = await Interactions.findOne({ bookId: req.body.bookId });
        if (book_int) {
            if (book_int.likes.find((like) => like.username === req.user.username)) {
                book_int.likes = book_int.likes.filter((like) => like.username !== req.user.username);
                await book_int.save();
                return res.status(200).json({
                    message: "You disliked this book",
                });
            } else {
                book_int.likes.push({
                    username: req.user.username,
                    likedAt: new Date().toISOString()
                });
                await book_int.save();
                return res.status(200).json({
                    message: "You liked this book",
                });
            }
        } else {
            const newBook_int = new Interactions({
                bookId: req.body.bookId,
                likes: [{
                    username: req.user.username,
                    likedAt: new Date().toISOString()
                }]
            });
            const book_int = await newBook_int.save();
            return res.status(200).json({
                message: "You liked this book"
            });
        }
    } catch (err) {
        res.status(500).json({message: err})
    }
}); 

// read a book
router.post("/read", checkAuth,
body('bookId').not().isEmpty().withMessage('Book Id is required'),
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
    }
    try {
        const book_int = await Interactions.findOne({ bookId: req.body.bookId });
        if (book_int) {
            if (book_int.reads.find((read) => read.username === req.user.username)) {
                return res.status(200).json({
                    message: "You already read this book",
                });
            } else {
                book_int.reads.push({
                    username: req.user.username,
                    readAt: new Date().toISOString()
                });
                await book_int.save();
                return res.status(200).json({
                    message: "You read this book",
                });
            }
        }
        else {
            const newBook_int = new Interactions({
                bookId: req.body.bookId,
                reads: [{
                    username: req.user.username,
                    readAt: new Date().toISOString()
                }]
            });
            const book_int = await newBook_int.save();
            return res.status(200).json({
                message: "You read this book"
            });
        }
    } catch (err) {
        res.status(500).json({message: err})
    }
});

module.exports = router;
