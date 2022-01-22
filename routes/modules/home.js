const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant");

router.get("/",(req,res)=>{
    let a,search_value;
    if(!req.query.keyword)
        a={};
    else{
        search_value = new RegExp(req.query.keyword,"i");
        a={$or: [{name:search_value},{name_en:search_value},{category:search_value}]};
    }
    Restaurant.find(a).lean().sort({name:"asc"}).then(restaurants=>{
        res.render("index",{restaurants,search_value:req.query.keyword});
    })
    .catch(error=>{
        console.log(error);
        res.render("err",{});
    });
});

module.exports = router;