//設定模組 常數
const express = require("express") ;
const app = express() ;
const port = 3000 ;
const restaurants = require("./restaurant.json").results; 
const exphbs = require('express-handlebars');

//express設定
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

//路由設定
app.get("/restaurants",(req,res)=>{
    res.render("index",{restaurants});
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