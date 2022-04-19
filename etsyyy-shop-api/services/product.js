const productsmod = require('./../models/products.model')
const uuid = require('uuid').v4

exports.createProduct = async (msg_payload,callback) => {
    const {sellerId,name,category,description,price,quantity,img} = msg_payload
    try {
        const product = new productsmod({
            product_id: uuid(),
            seller_id:sellerId,
            name,
            category,
            description,
            price,
            quantity,
            img
        })

        await product.save((err,data)=>{
            if(err) return callback(err,null)
            return callback(null,"Product Added")
        })

    } catch (error) {
        return callback(error,null)
    }
}

exports.editProduct = async (msg_payload,callback) => {
    const {elasticId,productId,name,category,description,price,quantity,img} = msg_payload
    try {
        const product = await productsmod.findOne({product_id:productId}).exec()
        if(product){
            product.update({
                name,category,description,price,quantity,img
            },(err,data) => {
                if(err) return callback(err,null)
                return callback(null,"Product Updated")
            })
        }
    } catch (error) {
        return callback(error,null)
    }
}

exports.getItems = async (msg_payload,callback) => {
    const {sellerId} = msg_payload
    try {
        const products = await productsmod.find({seller_id:sellerId}).exec()
        if(products){
            return callback(null,products)
        }
        return callback("No Products found",null)
    } catch (error) {
        return callback(error,null)
    }
}

exports.getProducts = async (msg_payload,callback) => {
    try {
        const products = await productsmod.find().exec()

        if(products){
            return callback(null,products)
        }
        return callback("No products",null)

    } catch (error) {
        return callback(error,null)
    }
}

exports.getProductById = async (msg_payload,callback) => {
    const {productId} = msg_payload
    try {
        const product = await productsmod.findOne({product_id:productId}).exec()
        if(product){
            return callback(null,product)
        }
        return callback("No product found",null)
    } catch (error) {
        return callback(error,null)
    }
}

exports.getProductsByCategory = async (msg_payload,callback) => {
    const {category} = msg_payload
    try {
        productsmod.find({category},(err,data) => {
            if(err) callback(err,null)
            if(data)
                return callback(null,data)
        })
    } catch (error) {
        return callback(error,null)
    }
}

exports.getFilteredProducts =async (msg_payload,callback) => {
    const {category,price} = msg_payload
    try {
        productsmod.find({category,price},(err,data)=>{
            if(err) return callback(err,null)
            return callback(null,data)
        })
    } catch (error) {
        return callback(error,null)
    }
}

exports.getFilteredProductsSortByPrice = async (msg_payload,callback) => {
    const {category,price,order} = msg_payload
    try {
        productsmod.find({category,price},(err,data)=>{
            if(err) return callback(err,null)
            return callback(null,data)
        })
    } catch (error) {
        return callback(error,null)
    }
}

exports.getFilteredProductsSortByQuantity = async (msg_payload,callback) => {
    const {category,price,quantity,order} = msg_payload
    try {
        productsmod.find({category,price,quantity},(err,data)=>{
            if(err) return callback(err,null)
            return callback(null,data)
        })
    } catch (error) {
        return callback(error,null)
    }
}

exports.getFilteredProductsSortBySales = async (msg_payload,callback) => {
    const {category,price,order} = msg_payload
    try {
        productsmod.productsSortBySales({category,price,order},(err,data)=>{
            if(err) return callback(err,null)
            return callback(null,data)
        })
    } catch (error) {
        return callback(error,null)
    }  
}