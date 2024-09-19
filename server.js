const express = require('express');
const morgan= require('morgan');
const dotenv= require('dotenv');
const colors= require('colors');
const cors= require('cors');
const connectDb = require('./config/db');


const app= express();

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
dotenv.config();

// connection established
connectDb();

// routes
app.use('/api/v1', require('./routes/testRoute'))
app.use('/api/v1/auth', require('./routes/authRoutes'))
app.use('/api/v1/user', require('./routes/userRoute'))
app.use('/api/v1/restaurant', require('./routes/restaurantRoutes'))
app.use('/api/v1/category', require('./routes/categoryRoutes'))


app.get('/', (req, resp)=>{
resp.send("<h1>Rajesh</h1>")
})

const PORT= process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${process.env.PORT}`.bgBlue.white)
})
 