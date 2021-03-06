const express = require('express')
const router = express.Router()

const UserController = require('../controllers/users')
const AuthController = require('../controllers/auth')
const ProductController = require('./../controllers/product')
const OrderController = require('./../controllers/order')
const auth = require('../../middleware/auth')
const passport = require('passport')

router.post('/register',UserController.createUser)
router.post('/login',AuthController.login) 

router.post('/auth',passport.authenticate('jwt',{session:true}),AuthController.getUserDetails)
router.post('/update-profile',passport.authenticate('jwt',{session:true}),UserController.updateUser)
router.post('/add-to-favorites',passport.authenticate('jwt',{session:true}),UserController.addToFavorites)
router.post('/remove-from-favorites',passport.authenticate('jwt',{session:true}),UserController.removeFromFavorites)
router.post('/myFavorites',passport.authenticate('jwt',{session:true}),UserController.myFavorites)
router.get('/product/:id',passport.authenticate('jwt',{session:true}),ProductController.getProductById)

router.post('/myorders',passport.authenticate('jwt',{session:true}),OrderController.myOrders)


module.exports = router