const restaurantModel = require("../models/restaurantModel")

const createRestaurantController= async(req, resp) =>{
    try {
        const {title, imgUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords}= req.body
        if(!title  || !coords){
            return resp.status(500).send({
                success: false,
                message: 'Please provide title and address'
            })
        }
        // CREATE RESTAURANT IN DATABASE
        const newRestaurant= new restaurantModel({title, imgUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords})
        await newRestaurant.save();

        resp.status(200).send({
            success:true,
            message:'New Restaurant Created sucessfully'
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success:false,
            message:'Error in create Restaurant API',
            error
        })
        
    }
}

// GET ALL RESTAURANT
const getAllRestaurantController= async(req, resp)=>{
    try {
        const restaurants= await restaurantModel.find({})
        if(!restaurants){
            return resp.status(404).send({
                sucess: false,
                message:'No Record found',
                
            })
        }
        resp.status(201).send({
            success:true,
            totalCount: restaurants.length,
            restaurants
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            sucess: false,
            message:'Error in Get All Restaurant API',
            error
        })
        
    }
}

// Get RESTAURANT BY ID
const getRestaurantController= async(req, resp)=>{
    try {
        const restaurantId= req.params.id;
        if(!restaurantId){
            return resp.status(500).send({
                success: false,
                message:'Please Provide the Restaurant ID'
            })
        }
        //  check 
        const restaurant= await restaurantModel.findById(restaurantId)
        if(!restaurant){
            return resp.status(404).send({
                success: false, 
                message:'No Restaurant Found'
            })
        }
        resp.status(201).send({
            success: true,
            restaurant
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message:'Error in get Restaurant By ID API',
            error
        })
        
    }
}

// DELETE RESTAURANT 
const deleteRestaurantController= async(req, resp)=>{
    try {
        const restaurantId= req.params.id
        if(!restaurantId){
            return resp.status(500).send({
                success: false,
                message:'Please provide Restaurant Id'
            })
        }
        await restaurantModel.findByIdAndDelete(restaurantId)
        resp.status(200).send({
            success: true,
            message:'Restaurant Deleted Successfully'
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: 'Error in Delete Restaurant API'
        })
        
    }
}
module.exports= {createRestaurantController, getAllRestaurantController, getRestaurantController, deleteRestaurantController}