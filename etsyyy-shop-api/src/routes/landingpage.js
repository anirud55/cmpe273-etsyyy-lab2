const express = require('express')
const router = express.Router()

const SellerController = require('./../controllers/shop')
const ProductController = require('./../controllers/product')
const auth = require('../../middleware/auth')
const passport = require('passport')

router.get('/products',passport.authenticate('jwt',{session:true}),ProductController.getProducts)

module.exports = router