const ordermod = require('./../models/orders.model')
const usersmod  = require('./../models/users.model')
const shopmod = require('./../models/shop.model')
const cartmod = require('./../models/carts.model')
const productsmod  = require('./../models/products.model')
const uuid = require('uuid').v4

exports.placeOrder = async (msg_payload,callback) => {
    const {elasticId,productId,userId,price,quantity,giftWrap,giftDescription} = msg_payload
    try {
        const d = Date(Date.now)
        const date = d.toString().split(' ')[0] + ' '+ d.toString().split(' ')[1]+ ' ' + d.toString().split(' ')[2] + ' '+ d.toString().split(' ')[3]

        const product = await productsmod.findOne({product_id:productId}).exec()
        const user = await usersmod.findOne({id:userId}).exec()
        const shop = await shopmod.findOne({seller_id:product.seller_id}).exec()
        if(product && user){
            const order = new ordermod({
                order_id:uuid(),
                product_id:productId,
                seller_id:product.seller_id,
                name:product.name,
                category:product.category,
                description:product.description,
                price:product.price,
                quantity:product.quantity,
                product_img:product.img,
                user_id:userId,
                first_name:user.first_name,
                last_name:user.last_name,
                user_email: user.email, 
                owner_id: shop.owner_id,
                shop_name: shop.name,
                owner_name: shop.owner_name,
                owner_email:shop.owner_email,
                ph_number: shop.ph_number,
                shop_img:shop.img,
                gift_wrap:giftWrap,
                gift_description: giftDescription
            })
            order.save(async (err,data)=>{
                if(err) return callback(err,null)
                await cartmod.deleteOne({user_id:userId}).exec()
                return callback(null,"Order Placed")
            })
        }
    } catch (error) {
        return callback(error,null)
    }
}

exports.myOrders = async (msg_payload,callback) => {
    const {id} = msg_payload
    try {
        const orders = await ordermod.find({id}).exec()
        if(orders){
            return callback(null,orders)
        }
        return callback(null,[])
    } catch (error) {
        return callback(error,null)
    }

}