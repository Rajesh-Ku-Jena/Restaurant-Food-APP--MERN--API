const JWT= require('jsonwebtoken')

module.exports= async(req, resp, next)=>{
    try {
        const token= req.headers["authorization"].split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) =>{
            
            if(err){
                return resp.status(401).send({
                    sucess: false,
                    message: 'Un-Authorize Access'
                })
            }else{
                req.body.id= decode.id;
                next();
            }
        })
        
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            sucess: false,
            message: 'Please Provide Auth Token',
            error
        })
    }
}