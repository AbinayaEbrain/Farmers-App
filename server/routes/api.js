const express =require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Post = require('../models/post')
const Category = require('../models/category')
const subCategory = require('../models/subCategory')

const mongoose = require('mongoose')
const db ="mongodb://user01:user01@ds023704.mlab.com:23704/farmersdb"

mongoose.connect(db, err=>{
    if(err){
        console.log('Error !' + err)
    }
    else{
        console.log('connected to mongoDB')
    }
})

//verify token 
function verifyToken( req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1] //which splits at the space,so it will contain token value
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload =jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    res.UserId = payload.subject
    next()
}

router.get('/',(req,res)=>{
    res.send('From API route')
})


router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)

    User.findOne({phone: userData.phone},(err,exuser)=>{
        if(exuser == null){
            user.save((error,registeredUser)=>{
                if(error){
                    console.log(error)
                }else{
                    //jwt 
                     let payload={subject:registeredUser._id}
                     let token =jwt.sign(payload,'secretKey')
        
                    //before adding jwt
                   // res.status(200).send(registeredUser)
        
                    //after add jwt
                    console.log(payload)
                   res.status(200).send({token,payload,user})
                }
            })
        }
        else{
            res.status(401).send("Number already exist")
        }
    })
      
   
        
})

//postdeals

router.post('/post',(req,res)=>{
    let userData = req.body
    let user = new Post(userData)
    user.save((error,productData)=>{
        if(error){
            console.log(error)
        }else{
            //jwt 
            //  let payload={subject:productData._id}
            //  let token =jwt.sign(payload,'secretKey')
            console.log(user);
           // console.log(accountId)
            //before adding jwt
            res.status(200).send(productData)

            //after add jwt
        //    res.status(200).send({token})
        }
    })
})

//admin

router.post('/category',(req,res)=>{
    let categoryData = req.body
    let category = new Category(categoryData)
    category.save((error,productData)=>{
        if(error){
            console.log(error)
        }else{
            
            console.log(category);
            res.status(200).send(productData)

        }
    })
})

router.post('/login',(req,res)=>{
    let userData = req.body

    User.findOne({phone: userData.phone},(error,user)=>{
        if(error){
            console.log(error)

        }else{
            if(!user){
                res.status(401).send('Invalid Phone Number')
               
            }else{
                if(user.password !== userData.password){
                    res.status(401).send('Invalid Password')
                }else{
                //add jwt
                 let payload={subject:user._id}
                 let token =jwt.sign(payload,'secretKey')
                    //before add jwt
                   // res.status(200).send(user)

                    //after add jwt
                    
                 res.status(200).send({token,payload,user})
                
                }
            }
        }
    })
})


router.get('/deals',(req,res)=>{
    Post.find(function (err,result){
        if(err){
            console.log('no data')
 
        }
        else{
         res.send(result)
           
        }
    })
 })

 router.get('/category',(req,res)=>{
    Category.find(function (err,result){
        if(err){
            console.log('no data')
 
        }
        else{
         res.send(result)
           
        }
    })
 })

 router.get('/subcategory',(req,res)=>{
    subCategory.find(function (err,result){
        if(err){
            console.log('no data')
 
        }
        else{
         res.send(result)
           
        }
    })
 })

 //get a user
 router.get('/details',(req,res)=>{
    User.find(function (err,result){
        if(err){
            console.log('no data')
 
        }
        else{
         res.send(result)
           
        }
    })
 })

 //delete deals
router.delete('/deals/:id',(req,res)=>{
    Post.findByIdAndRemove(req.params.id,function(errors,deleteuser){
        if(errors){
            console.log("Error deleting" + errors);
        }else{
            res.json(deleteuser)

        }
    });
});

//delete category
router.delete('/category/:id',(req,res)=>{
    Category.findByIdAndRemove(req.params.id,function(errors,deleteuser){
        if(errors){
            console.log("Error deleting" + errors);
        }else{
            res.json(deleteuser)

        }
    });
});

//delete user
router.delete('/details/:id',(req,res)=>{
    User.findByIdAndRemove(req.params.id,function(errors,deleteuser){
        if(errors){
            console.log("Error deleting" + errors);
        }else{
            res.json(deleteuser)

        }
    });
});

 //update deals
 router.put('/deals/:id', function(req, res){
    console.log('Update a user');
    console.log(req.body)
     //let userData = req.body
    // let User = new User(userData)
    Post.findByIdAndUpdate(req.params.id,
    {
        $set: {category : req.body.category, name : req.body.name, quantity : req.body.quantity,
            qnty : req.body.qnty, price : req.body.price, description : req.body.description, avlPlace : req.body.avlPlace}
    },
    {
        new: true
    },
    function(err,updatedUser){
        if(err){
            res.send("Error updating user");
        }else{
            res.json(updatedUser);
        }
    }

    );
});
// router.get('/deals',(req,res)=>{
//     let deals =[
//         {
//             "_id": "1",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//           },
//           {
//             "_id": "2",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//           },
//           {
//             "_id": "3",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//           },
//           {
//             "_id": "4",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//           },
//           {
//             "_id": "5",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//           },
//           {
//             "_id": "6",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//           }
//     ]

//     res.json(deals)
// })

//verfify token verifies the token
router.get('/post', verifyToken, (req,res)=>{
    let deals =[
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          }
    ]

    res.json(deals)
})

module.exports = router;