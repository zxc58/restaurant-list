module.exports = {
    validationGuard:(req,res,next)=>{
//篩選出put post        
        if(req.method==="GET"||req.method==="DELETE")
            next();
//開始認證資料        
        else if(
            (/^[\w\s]+$/.test(req.body.name_en))&&
            (/^[\d\s]+$/.test(req.body.phone))&&
            (0<=parseFloat(req.body.rating)<=5)&&
            (req.body.name!="")&&//前端 只有required
            (req.body.category!="")&&//前端 只有required
            (req.body.location!="")&&//前端 只有required
            (req.body.image!="")&&//還在尋找url regex
            (req.body.google_map!="")&&//還在尋找url regex
            (req.body.description!="")//前端 只有required
        )
            next();
//認證不通過處理       
            else{
            if(req.body.this_req_sendby==="Edit Page"){
                const method = "?_method=PUT"
                res.render("newedit",{
                    restaurant:req.body,
                    action:`/restaurants/${req.params._id}${method}`,
                    page:"Edit Page",
                    message:"<span>後端認證不通過</span><br/>"
                });
            }
            else{
                res.render("newedit",{
                    restaurant:req.body,
                    action:`/restaurants`,
                    page:"New Page",
                    message:"<span>後端認證不通過</span><br/>"
                });
            }
        }
    }
}