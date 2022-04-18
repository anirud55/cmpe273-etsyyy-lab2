const kafka = require('./../../kafka/client')
const actions = require('./../../action/actions.json')

exports.createSeller = async (req,res) => {
    const {name,email,phNumber,currency,city,country} = req.body
    const ownerId = req.user.id
    kafka.sendKafkaRequest('shop',{ name,email,phNumber,currency,city,country,ownerId, action:actions.CREATE_SELLER},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.updateShop = async (req,res) => {
    const {shop_id,name,ownerName,email,phNumber,img} = req.body
    kafka.sendKafkaRequest('shop',{ shop_id,name,ownerName,email,phNumber,img, action:actions.UPDATE_SHOP },(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.checkAvailability = async (req,res) => {
    const {name} = req.body
    kafka.sendKafkaRequest('shop',{ name, action:actions.CHECK_AVAILABILITY },(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.getShopByName = async (req,res) => {
    const {name} = req.body
    kafka.sendKafkaRequest('shop',{ name, action:actions.GET_SHOPS_BY_NAME },(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.myShops = async (req,res) => {
    const {owner_id} = req.body
    kafka.sendKafkaRequest('shop',{ owner_id, action:actions.MY_SHOPS },(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}