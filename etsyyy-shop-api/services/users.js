const uuid = require('uuid').v4
const usersmod = require('./../models/users.model')
const favomod = require('./../models/favorites.model')
const prodmod = require('./../models/products.model')
const bcrypt = require('bcrypt')

exports.createUser = async (msg_payload, callback) => {
    const { first_name, email, password } = msg_payload
    try {
        const User = await usersmod.findOne({email}).exec()
        if(User){
            return callback("ALready registered",null)
        }
        const salt = await bcrypt.genSalt(10)
        const encrypted = await bcrypt.hash(password, salt)
        
        const user = new usersmod({
            id:uuid(),
            first_name : first_name,
            email: email,
            password: encrypted
        })

        user.save((err,data) =>{
            console.log(err)
            if(err) return callback(err,null)
            return callback(null,data)
        })

    } catch (error) {
        console.log(error)
        return callback(error,null)
    }
}

exports.updateUser = async (msg_payload,callback) => {
    console.log("------msg_payload-", msg_payload)
    const {
        id,
        first_name,
        lastName,
        email,
        gender,
        dob,
        city,
        address,
        zip_code,
        country,
        about,
        profileImg
    } = msg_payload

    try {
        const user = await usersmod.findOne({id}).exec()
        console.log("before updating",user)
        if(user){
            const id = user._id
            user.update({
                first_name:first_name,
                last_name:lastName,
                email:email,
                gender:gender,
                dob:dob,
                city:city,
                address:address,
                zip_code:zip_code,
                country:country,
                about:about,
                profile_img:profileImg
            }, (err,data) => {
                if(err) return callback(err,null)
                return callback(null,data)
            })
        }    
    } catch (error) {
        return callback(error,null)
    }
}

exports.addToFavorites = async (msg_payload,callback) => {
    const { id, productId } = msg_payload
    try {
        const favorite = await favomod.findOne({id:id,product_id:productId})
        if(favorite==null){
            const product = await prodmod.findOne({product_id:productId}).exec()
            if(product){
                const newFavorite = await new favomod({
                    id,
                    product_id:productId,
                    sellerId: product.seller_id,
                    productName: product.product_name,
                    category: product.category,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity,
                    img:product.img
                })
                await newFavorite.save((err,data)=>{
                    console.log("3",err)
                    if(err) return callback(err,null)
                    return callback(null,data)
                })
            }else{
                return callback("Invalid Product",null)
            }
        }else{
            return callback("Already added to favorites",null)
        }
    } catch (error) {
        return callback(error,null)
    }
}

exports.removeFromFavorites = async (msg_payload,callback) => {
    const { id, productId } = msg_payload

    try {
        const data = await favomod.deleteOne({id:id,product_id:productId}).exec()
        if(data){
            return callback(null,data)
        }
        return callback("Does not exist",null)
    } catch (error) {
        return callback(error,null)
    }
}

exports.myFavorites = async (msg_payload,callback) => {
    const {id} = msg_payload
    try {
        const favs = await favomod.find({id}).exec()
        if(favs){
            return callback(null,favs)
        }
        return callback("No Favorites",null)
    } catch (error) {
        return callback(error,null)
    }
}