const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant");

//C
router.get("/new",(req,res)=>{
    res.render("newedit",{action:`/restaurants`,page:"New Page"});
});
router.post("/",(req,res)=>{
    //check req.body 內容物
    const a = req.body;
    if((/^[\w\s]+$/.test(a.name_en))&&(/^[\d\s]+$/.test(a.phone))&&(0<=a.rating<=5)&&
    (a.name!="")&&(a.category!="")&&(a.location!="")&&(a.image!="")&&(a.google_map!="")&&(a.description!=""))
        Restaurant.create(req.body).then(()=>res.redirect("/")).catch(err=>console.log(err));
    else
        console.log("後端認證沒過")
});

//R
router.get("/:_id",(req,res)=>{
    Restaurant.findById(req.params._id).lean().then(restaurant=>{
        res.render("show",{restaurant});
    })
    .catch(err=>console.log(err));
});  

//U
router.get("/:_id/edit",(req,res)=>{
    Restaurant.findById(req.params._id).lean().then(restaurant=>{
        res.render("newedit",{restaurant,action:`/restaurants/${req.params._id}?_method=PUT`,page:"Edit Page"});
    })
    .catch(err=>console.log(err));
});
router.put("/:_id",(req,res)=>{
    const a = req.body; 
    
    if((/^[\w\s]+$/.test(a.name_en))&&(/^[\d\s]+$/.test(a.phone))&&(0<=a.rating<=5)&&
    (a.name!="")&&(a.category!="")&&(a.location!="")&&(a.image!="")&&(a.google_map!="")&&(a.description!=""))
        Restaurant.findByIdAndUpdate(req.params._id,req.body)
        .then(()=>{ res.redirect("/restaurants/"+req.params._id); })
        .catch(err=>console.log(err));
    else
        console.log("後端認證沒過")
});

//D
router.delete("/:_id",(req,res)=>{
    Restaurant.findById(req.params._id)
    .then(restaurant=>{
        return restaurant.remove();
    })
    .then(()=>res.redirect("/"))
    .catch(err=>console.log(err));
});

module.exports = router;