const usermod = require('./../models/users.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.login = async (msg_payload,callback) => {
    const { email, password } = msg_payload
    try {

        const user = await usermod.findOne({email}).exec()

        if(!user){
            return callback("User Not found",null)
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return callback("Invalid credentials",null)
        }

        const msg_payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            msg_payload,
            process.env.SECRET_KEY,
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) throw err
                return callback(null,{ "token" : "Bearer " + token })
            }
        )

    } catch (error) {
        return callback(error,null)
    }
}

exports.getUserDetails = async (msg_payload,callback) => {
    const {id} = msg_payload
    const user = await usermod.findOne({id}).exec()
    if(user){
        return callback(null,user)
    }
    return callback("No User found",null)
}