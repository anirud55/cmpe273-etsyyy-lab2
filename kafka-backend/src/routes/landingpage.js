const express = require('express')
const router = express.Router()

const shop = require('./../controllers/shop')
const product = require('./../controllers/product')
const auth = require('../../middleware/auth')
const passport = require('passport')

router.get('/products',passport.authenticate('jwt',{session:true}),product.getProducts)

module.exports = router