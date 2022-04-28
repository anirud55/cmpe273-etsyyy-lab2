const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const passport = require('passport')

dotenv.config();

var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize())

require('./src/controllers/passport')

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
 

//Init Middleware
app.use(express.json({extended:false}))

app.use('/api/users',require('./src/routes/user'))
app.use('/api/shop',require('./src/routes/shop'))
app.use('/api/dashboard',require('./src/routes/landingpage'))
app.use('/api/order',require('./src/routes/order'))
app.use('/api/products',require('./src/routes/products'))

const PORT = process.env.PORT || 3002


app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}.`);
})

module.exports = app