const express = require('express')
const router = express.Router()

const users = require('../controllers/users')
const auth = require('../controllers/auth')
const product = require('./../controllers/product')
const order = require('./../controllers/order')
const passport = require('passport')

router.post('/register',users.createUser)
router.post('/login',auth.login) 

router.post('/auth',passport.authenticate('jwt',{session:true}),auth.getUserDetails)
router.post('/update-profile',passport.authenticate('jwt',{session:true}),users.updateUser)
router.post('/add-to-favorites',passport.authenticate('jwt',{session:true}),users.addToFavorites)
router.post('/remove-from-favorites',passport.authenticate('jwt',{session:true}),users.removeFromFavorites)
router.post('/myFavorites',passport.authenticate('jwt',{session:true}),users.myFavorites)
router.get('/product/:id',passport.authenticate('jwt',{session:true}),product.getProductById)

router.post('/myorders',passport.authenticate('jwt',{session:true}),order.myOrders)


module.exports = router