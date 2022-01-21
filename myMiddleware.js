module.exports = {
    validationGuard:(req,res,next)=>{
        if(req.method==="GET"||req.method==="DELETE")
            next();
        else if(
            (/^[\w\s]+$/.test(req.body.name_en))&&
            (/^[\d\s]+$/.test(req.body.phone))&&
            (0<=req.body.rating<=5)&&
            (req.body.name!="")&&
            (req.body.category!="")&&
            (req.body.location!="")&&
            (req.body.image!="")&&
            (req.body.google_map!="")&&
            (req.body.description!="")
        ){
            console.log("bp45/4t/6ej/ ")
            next();
        }
        else
        console.log("認證沒過");
    }
}