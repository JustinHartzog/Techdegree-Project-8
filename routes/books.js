const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

const { Book } = require("../models");

router.get("/books/new", (req, res) => {
    res.render("create_book", { book: Book.build()});
});

router.post("/books/new", (req, res) => {
    Book.create(req.body)
    .then( book => res.redirect(`/books`))
    .catch( err => {

        if(err.name === "SequelizeValidationError") {
            res.render("create_book", { book: Book.build(req.body), errors: err.errors});
        } else {
            throw err;
        }
    })
    .catch( err => res.sendStatus(500));
});

router.get("/books/:id", (req, res) => {
    Book.findByPk(req.params.id)
    .then( book => res.render("update_book", { book: book }))
    .catch( err => res.sendStatus(500));
});

router.post("/books/:id", (req, res) => {
    Book.findByPk(req.params.id)
    .then( book =>  book.update(req.body))
    .then( book =>  res.redirect(`/books`))
    .catch( err => {

        if(err.name === "SequelizeValidationError") {
            let book = Book.build(req.body);
            book.id = req.params.id;
            res.render("update_book", { book, errors: err.errors});
        } else {
            throw err;
        }

    })
    .catch( err => res.sendStatus(500));
});

router.post("/books/:id/delete", (req, res) => {
    Book.findByPk(req.params.id)
    .then( book => book.destroy())
    .then(() => res.redirect("/books"))
    .catch( err => res.sendStatus(500));
});

module.exports = router;
