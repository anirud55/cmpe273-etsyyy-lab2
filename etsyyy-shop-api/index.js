const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const routes = require("./routes");
const dbConfig = require("./config/db.config.js");

var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// app.use('/', routes);
// app.use(express.static(__dirname + '/dist'));

// set port, listen for requests
const PORT = process.env.PORT || 3001;

mongoose
    .connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

mongoose.Promise = global.Promise;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });