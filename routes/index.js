const express = require("express");
const router = express.Router();

const { Book } = require("../models");

router.get("/", (req, res) => {
    res.redirect("/books");
});

router.get("/books", (req, res) => {
    Book.findAll()
    .then( books => res.render("index", { books: books}))
    .catch( err => res.render("error"));
});

module.exports = router;
