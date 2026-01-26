const jwt = require('jsonwebtoken');

function authMiddlewear(req,res,next){
    try{
       if (req.path === '/login' || req.path === '/register') {
            return next();
        }
        else{
            var decode = jwt.verify(req.headers.authorization.split(" ")[1],'shhhhh')
            next()
        }
    }
    catch(err){
        res.status(401).send({error:true,message:"Unauthorized"})

    }
}

function authMiddlewearManager(req,res,next){
    try{
         if (req.path === '/login' || req.path === '/register') {
            return next();
        }
        else{
            var decode = jwt.verify(req.headers.authorization.split(" ")[1],'shhhhh')
            next()
        }
    }
    catch(err){
       res.status(401).send({error:true,message:"Unauthorized"})

    }
}


module.exports = {authMiddlewear,authMiddlewearManager}