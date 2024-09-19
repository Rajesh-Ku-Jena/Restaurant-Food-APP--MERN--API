const categoryModel = require("../models/categoryModel")

// CREATE CATEGORY
const createCategoryController= async(req, resp)=>{
    try {
        const {title,imageUrl}= req.body
        if(!title){
            return resp.status(500).send({
                success: false,
                message:"Please provide title and image url"
            })
        }
        const newCategory= new categoryModel({title, imageUrl})
        await newCategory.save();
        resp.status(200).send({
            success: true,
            message:"Category added successfully"
        })

    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message:'Error in category Create API'
        })
        
    }
}

// GET ALL CATEGORY
const getAllCategory = async(req, resp)=>{
    try {
        const categories= await categoryModel.find({})
        if(!categories){
            return resp.status(404).send({
                success:false,
                message:'No Record Found'
            })
        }
        resp.status(200).send({
            success:true,
            totalCategories: categories.length,
            categories
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message:'Error In Get All Category API',
            error
        })
        
    }

}

// UPDATE CATEGORIES
const updateCategories= async(req, resp)=>{
    try {
        const {id}= req.params
        
        const {title, imageUrl}= req.body
        const updatedCategory= await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new: true})
        if(!updateCategories){
            return resp.status(500).send({
                success: false,
                message:'No category found'
            })
        }
        resp.status(200).send({
            success: true,
            message: "Category update successfully"
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message:"Error in update Categories API",
            error
        })
        
    }
}
module.exports={createCategoryController, getAllCategory, updateCategories}