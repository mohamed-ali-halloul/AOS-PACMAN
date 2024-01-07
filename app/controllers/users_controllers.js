const db =require("../models");
const user = require("../models/user");
const User =db.User;
const Op = db.Sequelize.Op;
const userValidation =require('../validators/user_validation');

exports.inscription = (req,res)=> {
    const {body} = req
    const {error} = userValidation(body).userValidationSchema
    if(error) return res.status(401).json(error.details[0].message)
    .then(() => {
        new User({...body})
        .save()
        .then((user)=>{
            console.log(user)
            res.status(201).json({msg:"user created"})
        })
        .catch((error)=> res.status(500).json(error))
        
    })
    .catch((error)=> res.status(500).json(error))
    
    }
exports.create =async (req, res)=>
{

const {body}=req 
const {error}= userValidation(body)
if(error) return res.status(401).json(error.details[0].message)



User.create({... body})
.then(()=>{
    res.status(201).json({msg:"Creation user"})
  })
  
.catch(error =>res.status(500).json(error));
}

exports.getAll=(req,res)=>
{
User.findAll({attributes : {exclude : ["createdAt","updatedAt"]}})
.then(users =>{res.status(200).json(users)})
.catch(error => {
      
    res.status(500).json(error)
  });

} 
exports.getOne= (req,res)=>{
    const {id} = req.params
    User.findByPk(id)
    .then(user =>{
        if(!user) return res.status(404).json({msg :"not found"})
        res.status(200).json(user)
    })
}
exports.deleteOne =(req,res)=> {
    const {id} = req.params
User.destroy({where : {id :id}})
.then(ressource => {
    if(ressource === 0) return res.status(404).json({msg:"not found"})
    res.status(200).json({msg :"Deleted Resource"})
})
.catch((error)=> res.status(500).json(error));
}
