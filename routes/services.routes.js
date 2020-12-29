const router = require("express").Router()
const Service = require("../models/service.model")
const Request = require("../models/request.model")
const User = require("../models/user.model")
const passport = require("../lib/auth");
/**
 * @GET
 * @GettingAllServicesDetails
 */
router.get("/",async(req,res)=>{
    try {
        let service = await Service.find({})
        return res.status(200).json({msg:"hiii",service})
    } catch (error) {
        console.log(error)
    }
})
/**
 * @GET
 * @GettingTagServiceDetails
 */
router.put("/specific",async(req,res)=>{
    try {
        console.log(req.body)
        let service = await Service.find({name: {$regex: req.body.name, $options:"i"}})
        console.log(service)
        return res.status(200).json({msg:"hiii",service})
    } catch (error) {
        console.log(error)
    }
})
/**
 * @POST
 * @PostingANewService
 */
router.post("/addService", async(req,res)=>{
    try {
        console.log(req.body.fields)
        let name = req.body.name
        let image = req.body.image
        let description = req.body.description
        let field = req.body.fields
        field.push({Time: ''})
        field.push({Date: ''})
        let price = req.body.price
        let newService = new Service({
            name,
            image,
            description,
            price,
            fieldsneeded: field
        })
        await newService.save()
        res.status(200).json({msg:"Request Send"})
    } catch (error) {
        console.log(error)
    }
})

/**
 * @POST
 * @AddingIntoUserCart
 */
router.post("/addtocart",passport.authenticate('jwt', { session: false }), async(req,res)=>{
    try {
        let user = await User.findOne({username : req.user.username})
        let{cart} = req.body
        for(let i=0;i<cart.length;i++){
            let service = await Service.findOne({name: cart[i]})
            let index = user.carts.indexOf(service._id)
            console.log("index", index)
            if (index == -1){
            let service = await Service.findOne({name: cart[i]})
            user.carts.push(service)
            }
        }
        await user.save()
        console.log("saved")
        res.status(200).json({msg:"Added To Card"})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error})
    }
})

/**
 * @POST
 * @FilledUpServicesField
 *  */
router.post("/submitRequest",passport.authenticate('jwt', { session: false }), async(req,res)=>{
    try{
        let user = await User.findOne({username: req.user.username})
        for(let i=0; i<req.body.cart.length;i++){
            let service = await Service.findOne({name : req.body.cart[i].name})
            //removing time and date from field
            let removedfield = req.body.cart[i].fieldsneeded
            let time = req.body.cart[i].fieldsneeded[req.body.cart[i].fieldsneeded.length-2].Time
            let date = req.body.cart[i].fieldsneeded[req.body.cart[i].fieldsneeded.length-1].Date
            removedfield.splice(req.body.cart[i].fieldsneeded.length-2,2)

            let newRequest = new Request({
                service,
                requester : user,
                fields : removedfield,
                date,
                time
            })
    
            await newRequest.save() 
            user.requests.push(newRequest)
        }
        user.carts= [] 
        await user.save()
        res.status(200).json({msg:"Updated!"})
    }
    catch(error){
        console.log(error)
    }
    
})


/**
 * @GET
 * @GetAllRequest
 */
router.get("/getRequest", async(req,res)=>{
    try{
    let request = await Request.find({}).populate("service").populate("requester")
    console.log(request)
    res.status(200).json({msg:"Request Obtained", request})
    }
    catch(error){
        console.log(error)
    }
})

router.put("/updateRequest",passport.authenticate('jwt', { session: false }), async(req,res)=>{
    try {
        let user = await User.findOne({username : req.user.username})
        let request = await Request.findOne({_id : req.body.request}).populate("requester")
        console.log(request)
        console.log(user._id)
        if (user.username != request.requester.username){
            request.accepter = user
            await request.save()
            user.accepted.push(request)
            user.save()
            return res.status(200).json({msg:"Updated"})
        }
        else{
            return res.status(200).json({msg:"SamePeep"})
        }
    } catch (error) {
        console.log(error)
    }
})

router.put("/updateRequestStatus",passport.authenticate('jwt', { session: false }), async(req,res)=>{
    try {
        let user = await User.findOne({username : req.user.username})
        let request = await Request.findOne({_id : req.body.id}).populate("completed")
        console.log(request.completed)
        request.completed = user
        await request.save()
        return res.status(200).json({msg:"completed"})
    } catch (error) {
        console.log(error)
    }
})
module.exports = router