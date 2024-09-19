const mongoose= require('mongoose')
const colors= require('colors')
// database connection

const connectDb= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to database ${mongoose.connection.host}`.bgYellow.black)
    } catch (error) {
        console.log('Error in Database Connection'.bgRed.white,error );
        
        
    }
}

module.exports= connectDb