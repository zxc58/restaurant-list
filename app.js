//require模組 設定常數
const express = require("express") ;
const exphbs = require("express-handlebars");
//const { redirect } = require("express/lib/response");
const mongoose = require("mongoose");
const Restaurant = require("./models/restaurant");
const app = express() ;
const port = 3000 ;
const db = mongoose.connection;

//express設定
mongoose.connect("mongodb://localhost/restaurant-list");
db.on("error",()=>{
    console.log("db error");
});
db.once("open",()=>{
});
app.use(express.urlencoded({extended:true}));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

//路由設定

//C
app.get("/restaurants/new",(req,res)=>{
    res.render("newedit",{action:`/restaurants`,page:"New Page"});
});
app.post("/restaurants",(req,res)=>{
    //check req.body 內容物
    const a = req.body;
    if((/^[\w\s]+$/.test(a.name_en))&&(/^[\d\s]+$/.test(a.phone))&&(0<=a.rating<=5)&&
    (a.name!="")&&(a.category!="")&&(a.location!="")&&(a.image!="")&&(a.google_map!="")&&(a.description!=""))
        Restaurant.create(req.body).then(()=>res.redirect("/")).catch(err=>console.log(err));
    else
        console.log("後端認證沒過")
});

//R
app.get("/",(req,res)=>{
    Restaurant.find().lean().then(restaurants=>{
        res.render("index",{restaurants});
    })
    .catch(error=>console.log(err));
});
app.get("/restaurants/:_id",(req,res)=>{
    Restaurant.findById(req.params._id).lean().then(restaurant=>{
        res.render("show",{restaurant});
    })
    .catch(err=>console.log(err));
});
app.get("/search",(req,res)=>{
    const search_value = new RegExp(req.query.keyword.toLowerCase(),"i");
    Restaurant.find(
        {$or: [{name:search_value},{name_en:search_value},{category:search_value}]}
    )
    .lean().then(search_result=>{
        res.render("index",{restaurants:search_result,search_value:req.query.keyword});
    })
    .catch(err=>console.log(err));
});    

//U
app.get("/restaurants/:_id/edit",(req,res)=>{
    Restaurant.findById(req.params._id).lean().then(restaurant=>{
        res.render("newedit",{restaurant,action:`/restaurants/${req.params._id}/edit`,page:"Edit Page"});
    })
    .catch(err=>console.log(err));
});
app.post("/restaurants/:_id/edit",(req,res)=>{
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
app.post("/restaurants/:_id/delete",(req,res)=>{
    Restaurant.findById(req.params._id)
    .then(restaurant=>{
        console.log("19suce");
        return restaurant.remove();
    })
    .then(()=>res.redirect("/"))
    .catch(err=>console.log(err));
});
//啟動監聽
app.listen(port,()=>{
    console.log(`server start at http://localhost:${port}`);
});