const express = require('express')
const router = express.Router()

const shop = require('../controllers/shop')
const product = require('../controllers/product')
const order = require('../controllers/order')
const cart = require('../controllers/cart')
const passport = require('passport')
const auth = require('../../middleware/auth')

router.post('/place-order',passport.authenticate('jwt',{session:true}),order.placeOrder)
router.post('/add-to-cart',passport.authenticate('jwt',{session:true}),cart.addToCart)
router.post('/cart-items',passport.authenticate('jwt',{session:true}),cart.getCartItems)
router.post('/cart/remove-item',passport.authenticate('jwt',{session:true}),cart.removeCartItem)

module.exports = router