const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const feedRoutes = require("./routes/feeds.routing");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/feed",feedRoutes);

app.use("/",(req,res,next) => {
    res.status(200).json({
        message: "Welcome to my first api for to parse xml feed to json"
    });
});

module.exports = app;