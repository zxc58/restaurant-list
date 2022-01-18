//require模組 設定常數
const express = require("express") ;
const exphbs = require("express-handlebars");
const { redirect } = require("express/lib/response");
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
app.get("/restaurants/new",(req,res)=>{
    res.render("newedit",{action:`/restaurants`,page:"New Page"});
});
app.post("/restaurants",(req,res)=>{
    //check req.body 內容物
    //const a = req.body;
    //if(a.n)
    Restaurant.create(req.body).then(()=>res.redirect("/restaurants")).catch(err=>console.log(err));
});


app.get("/restaurants",(req,res)=>{
    Restaurant.find().lean().then(restaurants=>{
        res.render("index",{restaurants});
        //console.log(restaurants);
    })
    .catch(error=>{
        console.log("01 error");
    });
});
app.get("/restaurants/:_id",(req,res)=>{
    Restaurant.findById(req.params._id).lean().then(restaurant=>{
        res.render("show",{restaurant});
    })
    .catch(err=>console.log("04err"));
});
app.get("/search",(req,res)=>{
    const search_value = new RegExp(req.query.keyword.toLowerCase(),"i");
    Restaurant.find(
        {$or: [{name:search_value},{name_en:search_value},{category:search_value}]}
    )
    .lean().then(search_result=>{
        res.render("index",{restaurants:search_result,search_value:req.query.keyword});
    })
    .catch(err=>console.log("05err"));
});    


app.get("/restaurants/:_id/edit",(req,res)=>{
    //console.log("123");
    Restaurant.findById(req.params._id).lean().then(restaurant=>{
        res.render("newedit",{restaurant,action:`/restaurants/${req.params._id}/edit`,page:"Edit Page"});
    })
    .catch(err=>console.log("07err"));
});
app.post("/restaurants/:_id/edit",(req,res)=>{
    //check req.body 內容物
    Restaurant.findById(req.params._id).then(restaurant=>{
        restaurant=req.body;
        return restaurant.save();
    })
    .then(()=>{ res.redirect("/restaurants/"+req.params._id); })
    .catch(err=>("11err"));
});


app.post("/restaurants/:_id/delete",(req,res)=>{
    Restaurant.findById(req.params._id)
    .then(restaurant=>{
        console.log("19suce");
        return restaurant.remove();
    })
    .then(()=>res.redirect("/restaurants"))
    .catch(err=>{console.log("21err");
    });
});
//啟動監聽
app.listen(port,()=>{
    console.log(`server start at http://localhost:${port}/restaurants`);
});