const mongoose= require('mongoose')

const categorySchema= new mongoose.Schema({
    title:{type:String,required:[true, 'Category title is required']},
    imageUrl:{type:String}
})

module.exports= mongoose.model('category', categorySchema)