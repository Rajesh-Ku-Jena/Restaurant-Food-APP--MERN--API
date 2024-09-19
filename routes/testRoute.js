const express= require('express')
const { testControl } = require('../controllers/testController')

// router object
const router= express.Router()

// routes GET || POST || DELETE|| PUT
router.get('/test-user',testControl)


// export the router    
module.exports= router