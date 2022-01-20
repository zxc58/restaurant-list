const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant");

router.get("/",(req,res)=>{
    Restaurant.find().lean().then(restaurants=>{
        res.render("index",{restaurants});
    })
    .catch(error=>{
        console.log(error);
    });
});
router.get("/search",(req,res)=>{
    const search_value = new RegExp(req.query.keyword.toLowerCase(),"i");
    Restaurant.find(
        {$or: [{name:search_value},{name_en:search_value},{category:search_value}]}
    )
    .lean().then(search_result=>{
        res.render("index",{restaurants:search_result,search_value:req.query.keyword});
    })
    .catch(err=>console.log(err));
});  
module.exports = router;