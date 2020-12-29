const router = require("express").Router()
const Service = require("../models/service.model")
const passport = require('../lib/auth');
const User = require("../models/user.model")
const Request = require("../models/request.model")
/**
 * @GET
 * @GetLoggedInUserInfomation
 */
router.get("/loginUser", passport.authenticate('jwt', { session: false }), async(req,res)=>{
    try {
        let user = await User.findOne({username : req.user.username}).populate("requests","service").select(["username","requests","service"])
        res.status(200).json({msg:"User data retrieved",user})
    } catch (error) {
        console.log(error)
    }
})

/**
 * @GET
 * @GetLoggedInCarts
 */
router.get("/loginUserCart", passport.authenticate('jwt', { session: false }), async(req,res)=>{
    try {
        let user = await User.findOne({username : req.user.username}).populate("carts").select(["carts"])
        res.status(200).json({msg:"User data retrieved",user})
    } catch (error) {
        console.log(error)
    }
})

/**
 * @GET
 * @GetLoggedInRequests
 */
router.get("/loginUser/requests", passport.authenticate('jwt', { session: false }), async(req,res)=>{
    try {
        console.log("hi")
        let user = await User.findOne({username : req.user.username}).populate({
            path: 'requests',
            populate:{
                path:"service",
                model: "Service",
                select:["name","image","description"]
            },
        }).populate({
            path: 'requests',
            populate:{
                path:"accepter",
                model: "User",
                select:"username"
            },
        }).populate({
            path: 'requestHistory',
            populate:{
                path:"service",
                model: "Service",
                select:["name","image","description"]
            },
        }).populate({
            path: 'requestHistory',
            populate:{
                path:"accepter",
                model: "User",
                select:"username"
            },
        })

        console.log(user)
        res.status(200).json({msg:"User data retrieved",user})
    } catch (error) {
        console.log(error)
    }
})

/**
 * @GET
 * @GetLoggedInTasks
 */
router.get("/loginUser/task", passport.authenticate('jwt', { session: false }), async(req,res)=>{
    try{
        let request= await User.findOne({username : req.user.username}).populate({
            path: 'accepted',
            populate:{
                path:"service",
                model: "Service",
                select:["name","image","description"]
            },
        }).populate({
            path: 'accepted',
            populate:{
                path:"requester",
                model: "User",
                select:"username"
            },
        })
        return res.status(200).json({msg:"Request Retrieved",request})
    }
    catch(error){
        console.log(error)
    }
})


/**
 * @UPDATE
 * @UpdateHistory
 */
router.put("/updateHistory", passport.authenticate('jwt', { session: false }), async(req,res)=>{
    try {
        let request = await Request.findOne({_id : req.body.id})
        let user = await User.findOne({username: req.user.username})
        let accepter = await User.findOne({_id: request.accepter})
        accepter.taskHistory.push(request)
        user.requestHistory.push(request)
        let index = user.requests.indexOf(request._id)
        user.requests.splice(index,1)
        user.save()
        accepter.save()
        return res.status(200).json({msg:"Updated"})
    } catch (error) {
        console.log(error)
    }
})
module.exports = router

/**
 * @Delete
 * @DeleteFromCart
 */
router.put("/deleteCart", passport.authenticate('jwt', { session: false }), async(req,res)=>{
    try{
    console.log(req.body)
    let user = await User.findOne({username: req.user.username})
    let index = user.carts.indexOf(req.body.id)
    user.carts.splice(index,1)
    user.save()
    res.status(200).json({msg:"Removed frmo cart"})
    }
    catch(error){
        console.log(error)
    }
})