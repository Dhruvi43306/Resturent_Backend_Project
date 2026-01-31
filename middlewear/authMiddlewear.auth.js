const jwt = require('jsonwebtoken');
function authMiddlewear(req,res,next){
    try{
       if (req.path === '/login' || req.path === '/register') {
            return next();
        }
        else{
            var decode = jwt.verify(req.headers.authorization.split(" ")[1],'shhhhh');
            req.user = decode
            console.log("Token Data = ",decode)
            next()
        if (req.user.Role === "Manager" &&(
        req.path.startsWith("/manager") ||
        req.path.startsWith("/users") ||
        req.path.startsWith("/menuCategory") ||
        req.path.startsWith("/menu") ||
        req.path.startsWith("/order") ||
        req.path.startsWith("/payments") ||
        req.path.startsWith("/tables")
      )
    ) {
      return next();
    }

    if (
      req.user.Role === "Chef" &&
      (
        req.path.startsWith("/chef") ||
        req.path.startsWith("/order") ||
        req.path.startsWith("/orderItem")
      )
    ) {
      return next();
    }

    if (
      req.user.Role === "Waiter" &&
      (
        req.path.startsWith("/waiter") ||
        req.path.startsWith("/order") ||
        req.path.startsWith("/tables")
      )
    ) {
      return next();
    }

    if (
      req.user.Role === "Cashier" &&
      (
        req.path.startsWith("/cashier") ||
        req.path.startsWith("/payment") ||
        req.path.startsWith("/order")
      )
    ) {
      return next();
    }

    if (
      req.user.Role === "User" &&
      (
        req.path.startsWith("/customer") ||
        req.path.startsWith("/menu") ||
        req.path.startsWith("/order") ||
        req.path.startsWith("/payment")
      )
    ) {
      return next();
    }
    }
}
    catch(err){
        res.status(401).send({error:true,message:"Unauthorized"})

    }
}




module.exports = {authMiddlewear}