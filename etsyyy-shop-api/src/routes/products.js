const express = require('express')
const router = express.Router()

const SellerController = require('./../controllers/shop')
const ProductController = require('./../controllers/product')
const OrderController = require('./../controllers/order')
const CartController = require('./../controllers/cart')

const auth = require('../../middleware/auth')

const passport = require('passport')

router.post('/by-category',passport.authenticate('jwt',{session:true}),ProductController.getProductsByCategory)
router.post('/filter',passport.authenticate('jwt',{session:true}),ProductController.getFIlteredProducts)
router.post('/sort-by-price',passport.authenticate('jwt',{session:true}),ProductController.filteredProductsSortByPrice)
router.post('/sort-by-quantity',passport.authenticate('jwt',{session:true}),ProductController.filteredProductsSortByQuantity)
router.post('/sort-by-sales',passport.authenticate('jwt',{session:true}),ProductController.filteredProductsSortBySales)
router.get('/:search',passport.authenticate('jwt',{session:true}),ProductController.getProduct)

module.exports = router