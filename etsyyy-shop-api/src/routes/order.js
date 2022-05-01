const express = require('express')
const router = express.Router()

const SellerController = require('./../controllers/shop')
const ProductController = require('./../controllers/product')
const OrderController = require('./../controllers/order')
const CartController = require('./../controllers/cart')
const passport = require('passport')
const auth = require('../../middleware/auth')

router.post('/place-order',passport.authenticate('jwt',{session:true}),OrderController.placeOrder)
router.post('/add-to-cart',passport.authenticate('jwt',{session:true}),CartController.addToCart)
router.post('/cart-items',passport.authenticate('jwt',{session:true}),CartController.getCartItems)
router.post('/cart/remove-item',passport.authenticate('jwt',{session:true}),CartController.removeCartItem)

module.exports = router