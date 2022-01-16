//require模組 設定常數
const express = require("express") ;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const Restaurant = require("./models/restaurant");
//const restaurants = require("./restaurant.json").results; 
const app = express() ;
const port = 3000 ;
const db = mongoose.connection;

//express設定
mongoose.connect("mongodb://localhost/restaurant-list");
db.on("error",()=>{
    console.log("db error");
});
db.once("open",()=>{
    console.log("db open");
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

//路由設定
app.get("/restaurants",(req,res)=>{
    Restaurant.find().lean().then(restaurants=>{
        //console.log(restaurants);
        res.render("index",{restaurants});
    })
    .catch(error=>{
        console.log(error);
    });
    
});
app.get("/restaurants/:id",(req,res)=>{
    const restaurant = restaurants.find(each=>each.id.toString()===req.params.id);
    res.render("show",{restaurant});
});
app.get("/search",(req,res)=>{
    const search_value = req.query.keyword.toLowerCase();
    const search_result = restaurants.filter(each=>
        each.name.toLowerCase().includes(search_value)||each.category.toLowerCase().includes(search_value)||each.name_en.toLowerCase().includes(search_value)
    );
    res.render("index",{restaurants:search_result,search_value:req.query.keyword});
});    

//啟動監聽
app.listen(port,()=>{
    console.log("server start at http://localhost:"+port+"/restaurants");
});