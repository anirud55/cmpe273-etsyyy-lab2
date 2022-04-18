const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

dotenv.config();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// app.use('/', routes);
// app.use(express.static(__dirname + '/dist'));

// set port, listen for requests
const PORT = process.env.PORT || 3001;

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

mongoose.Promise = global.Promise;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });