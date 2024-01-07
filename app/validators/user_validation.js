const joi =require('joi')
function userValidation(body){

const userValidationSchema =joi.object({
    name: joi.string().min(3).max(30),
}) 


return {
    userValidationSchema : userValidationSchema.validate(body),
  
   
}

}
module.exports = userValidation