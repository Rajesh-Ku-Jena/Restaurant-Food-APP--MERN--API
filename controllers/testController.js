const express= require('express')

const testControl= (req, resp)=>{
try {
    resp.status(200).send({
        sucess: true,
        message:'test Rest Api successfully'
    })
} catch (error) {
    console.log(error)
    return resp.status(404).send({
        sucess: false,
        message: 'something error in code'
    })
}
}

module.exports= {testControl}