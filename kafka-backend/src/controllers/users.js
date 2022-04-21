const kafka = require('./../../kafka/client')
const actions = require('./../../action/actions.json')

exports.createUser = async (req, res) => {
    console.log(req.body);
    const { first_name, email, password } = req.body
    kafka.sendKafkaRequest('users',{ first_name, email, password, action:actions.CREATE_USER },(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.updateUser = async (req, res) => {
    const {
        id,
        first_name,
        last_name,
        email,
        gender,
        dob,
        city,
        address,
        zip_code,
        country,
        about,
        profile_img
    } = req.body
    kafka.sendKafkaRequest('users',{         
        id,
        first_name,
        last_name,
        email,
        gender,
        dob,
        city,
        address,
        zip_code,
        country,
        about,
        profile_img, 
        action:actions.UPDATE_USER},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.addToFavorites = async (req, res) => {
    const { id, productId } = req.body
    kafka.sendKafkaRequest('favorites',{ id, productId, action:actions.ADD_TO_FAVORITES },(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.removeFromFavorites = async (req,res) => {
    const { id, productId } = req.body
    kafka.sendKafkaRequest('favorites',{ id, productId, action:actions.REMOVE_FROM_FAVORITES},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.myFavorites = async (req,res) => {
    const { id } = req.body
    kafka.sendKafkaRequest('favorites',{ id, action:actions.MY_FAVORITES},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}
