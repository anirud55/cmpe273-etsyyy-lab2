const shopmod = require('./../models/shop.model')
const uuid = require('uuid').v4

exports.createShop = async (msg_payload,callback) => {
    const {name,email,phNumber,currency,city,country,ownerId} = msg_payload
    try {

        const  shop = await new shopmod({
            shop_id: uuid(),
            owner_id: ownerId,
            name: name,
            email: email,
            ph_number: phNumber,
            currency: currency,
            city: city,
            country:country
        }) 

        await shop.save((err,data)=>{
            if(err) return callback(err,null)
            return callback(null,"Shop created")
        })
    } catch (error) {
        return callback(error,null)
    }
}

exports.updateShop = async (msg_payload,callback) => {
    const {shopId,name,ownerName,email,phNumber,img} = msg_payload
    
    try {
        const shop = await shopmod.findOne({shop_id:shopId}).exec()
        if(shop){
            shop.update({
                name,
                owner_name:ownerName,
                email,
                ph_number:phNumber,
                img:img
            },(err,data) => {
                if(err) return callback(err,null)
                return callback(null,data)
            })
        }
    } catch (error) {
        return callback(error,null)
    }
}

exports.checkAvailability = async (msg_payload,callback) => {
    const {name} = msg_payload
    try {
        const shop = await shopmod.findOne({name}).exec()
        if(shop) {
            return callback("Shop name not available",null)
        }
        return callback(null,"Shop name available")
    } catch (error) {
        return callback(error,null)
    }
}

exports.getShopsByName = async (msg_payload,callback) => {
    const {name} = msg_payload
    try {
        const shop = await shopmod.findOne({name}).exec()
        if(shop){
            return callback(null,shop)
        }
        return callback("Not found",null)
    } catch (error) {
        return callback(error,null)
    }
}

exports.myShops = async (msg_payload,callback) => {
    const {ownerId} = msg_payload
    try {
        const shops = await shopmod.find({owner_id:ownerId}).exec()
        if(shops){
            return callback(null,shops)
        }
        return callback("No shops",null)
    } catch (error) {
        return callback(error,null)
    }
}