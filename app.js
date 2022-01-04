const express = require("express") ;
const app = express() ;
const port = 3000 ;
const restaurants = require("./restaurant.json").results; 
//console.log(restaurants);
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get("/restaurants",(req,res)=>{
    res.render("index",{restaurants:restaurants});
});
app.get("/restaurants/:id",(req,res)=>{
    let id = req.params.id;
    let findResult = restaurants.find(index=>index.id.toString()===id);
    res.render("show",{restaurant:findResult});
});

app.get("/search",(req,res)=>{
    let search_value = req.query.keyword.toLowerCase();
    console.log(search_value);
    let restaurants2 = restaurants.filter(index=>{
        return index.name.toLowerCase().includes(search_value)
        ||index.category.toLowerCase().includes(search_value);
    });
    console.log(restaurants2);
    res.render("index",{restaurants:restaurants2});
});    



app.listen(port,()=>{
    console.log("http://localhost:"+port+"/restaurants");
});