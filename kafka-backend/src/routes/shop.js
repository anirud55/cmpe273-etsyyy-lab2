const express = require('express')
const router = express.Router()
const passport = require('passport')

const shop = require('./../controllers/shop')
const product = require('./../controllers/product')
const auth = require('../../middleware/auth')

router.post('/add',passport.authenticate('jwt',{session:true}),shop.createSeller)
router.post('/myshops',passport.authenticate('jwt',{session:true}),shop.myShops)
router.post('/update',passport.authenticate('jwt',{session:true}),shop.updateShop)
router.post('/addItem',passport.authenticate('jwt',{session:true}),product.create)
router.post('/updateItem',passport.authenticate('jwt',{session:true}),product.editProduct)
router.post('/getItems',passport.authenticate('jwt',{session:true}),product.getItems)
router.post('/check-availablity',passport.authenticate('jwt',{session:true}),shop.checkAvailability)
router.post('/byname',passport.authenticate('jwt',{session:true}),shop.getShopByName)

module.exports = router