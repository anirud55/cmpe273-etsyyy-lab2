const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const passport = require('passport')

dotenv.config();

app.use(cors())
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

app.use('/api/users',require('./src/routes/user.routes'))
app.use('/api/shop',require('./src/routes/seller.routes'))
app.use('/api/dashboard',require('./src/routes/dashboard.routes'))
app.use('/api/order',require('./src/routes/order.routes'))
app.use('/api/products',require('./src/routes/products.routes'))

const PORT = process.env.PORT || 3002


app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}.`);
})

module.exports = app