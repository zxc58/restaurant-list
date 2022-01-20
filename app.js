//require模組 設定常數
const express = require("express") ;
const exphbs = require("express-handlebars") ;
const mongoose = require("mongoose");
const Restaurant = require("./models/restaurant");
const indexRouter = require("./routes/index");
const app = express() ;
const port = 3000 ;
const db = mongoose.connection;
const mor = require("method-override");
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
app.use(mor("_method"))
//路由設定
app.use("/",indexRouter);

//啟動監聽
app.listen(port,()=>{
    console.log(`server start at http://localhost:${port}`);
});