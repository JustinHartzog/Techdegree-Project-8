const express = require("express");
const sequelize = require("./models").sequelize;
const app = express();

app.set("view engine", "pug");
app.use("/static", express.static("public"));

const routes = require("./routes");
const books = require("./routes/books");
app.use(routes);
app.use(books);

app.use((req, res, next) => {
    const err = new Error("Page Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status || 500);

    if (err.status === 404) {
        res.render("page-not-found");
    } else {
        err.status = 500
        console.log(err.status);
        res.render("error");
    }

});

const port = process.env.PORT || 3000;

sequelize.sync().then(
    app.listen(port, () => {
        console.log("Listening in port 3000");
    })
);

module.exports = app;
