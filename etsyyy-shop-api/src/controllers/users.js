const kafka = require('./../../kafka/client')
const actions = require('./../../actions/actions.json')

exports.createUser = async (req, res) => {
    const { firstName, email, password } = req.body
    kafka.sendKafkaRequest('users',{ firstName, email, password, action:actions.CREATE_USER },(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.updateUser = async (req, res) => {
    const {
        id,
        firstName,
        lastName,
        email,
        gender,
        dob,
        city,
        address,
        zipcode,
        country,
        about,
        profileImg
    } = req.body
    kafka.sendKafkaRequest('users',{         
        id,
        firstName,
        lastName,
        email,
        gender,
        dob,
        city,
        address,
        zipcode,
        country,
        about,
        profileImg, 
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
