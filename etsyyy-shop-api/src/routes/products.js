const express = require('express')
const router = express.Router()

const shop = require('../controllers/shop')
const product = require('../controllers/product')
const order = require('../controllers/order')
const cart = require('../controllers/cart')

const auth = require('../../middleware/auth')

const passport = require('passport')

router.post('/by-category',passport.authenticate('jwt',{session:true}),product.getProductsByCategory)
router.post('/filter',passport.authenticate('jwt',{session:true}),product.getFIlteredProducts)
router.post('/sort-by-price',passport.authenticate('jwt',{session:true}),product.filteredProductsSortByPrice)
router.post('/sort-by-quantity',passport.authenticate('jwt',{session:true}),product.filteredProductsSortByQuantity)
router.post('/sort-by-sales',passport.authenticate('jwt',{session:true}),product.filteredProductsSortBySales)
router.get('/:search',passport.authenticate('jwt',{session:true}),product.getProduct)

module.exports = router