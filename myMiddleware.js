module.exports = {
    validationGuard:(req,res,next)=>{
        console.log(req.url);
        if(req.method==="GET"||req.method==="DELETE")
            next();
        else if(
            (/^[\w\s]+$/.test(req.body.name_en))&&
            (/^[\d\s]+$/.test(req.body.phone))&&
            (0<=parseFloat(req.body.rating)<=5)&&
            (req.body.name!="")&&
            (req.body.category!="")&&
            (req.body.location!="")&&
            (req.body.image!="")&&
            (req.body.google_map!="")&&
            (req.body.description!="")
        )
            next();
        else{
            /*if(req.body.this_req_sendby==="Edit Page"){
                const method = "?_method=PUT"
                res.render("newedit",{
                    restaurant:req.body,
                    action:`/restaurants/${req.params._id}${method}`,
                    page:"Edit Page",
                    message:"後端認證不通過"
                });
            }
            else{
                res.render("newedit",{
                    restaurant:req.body,
                    action:`/restaurants`,
                    page:"New Page",
                    message:"後端認證不通過"
                });
            }*/
            
        }
    }
}