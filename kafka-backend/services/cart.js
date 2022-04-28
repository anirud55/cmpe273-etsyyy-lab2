const uuid = require('uuid').v4
const prodmod = require('../models/products.model')
const cartmod = require('../models/carts.model')

exports.addToCart = async (msg_payload,callback) => {
    const { productId, userId, quantity, price } = msg_payload

    try {
        const product = await prodmod.findOne({product_id:productId}).exec()
        if(product){
            const cart = await new cartmod({
                id:uuid(),
                shop_id:product.shop_id,
                product_id:productId,
                user_id:userId,
                product_name:product.name,
                img:product.img,
                category:product.category,
                description:product.description,
                price:price,
                quantity:quantity
            })
            await cart.save((err,data) => {
                if(err) return callback(err,null)
                return callback(null,data)
            })
        }

    } catch (error) {
        return callback(error,null)
    }
}

exports.getCartItems = async (msg_payload,callback) => {
    const { userId } = msg_payload
    try {
        const items = await cartmod.find({user_id:userId}).exec()

        if(items){
            return callback(null,items)
        }
        return callback(null,[])
    } catch (error) {
        return callback(error,null)
    }
}

exports.removeCartItem = async (msg_payload,callback) => {
    const { userId, productId } = msg_payload
    try {
        const data = await cartmod.deleteOne({user_id:userId,product_id:productId})
        if(data){
            return callback(null,data)
        }
        return callback("Failed to delte from cart",null)
    } catch (error) {
        return callback(error,null)
    }
}