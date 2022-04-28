const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const CategoriesSchema = new mongoose.Schema({
    id :{
        type:String,
        required:true
    },
    name :{
        type:String,
        required:true
    }
}, 
    {timestamps:true}
);
module.exports = Categories = mongoose.model('Categories',CategoriesSchema)