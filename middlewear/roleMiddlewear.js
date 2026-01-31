function allowRoles(...Role){
    return(req,res,next)=>{
        const userrol = req.user.Role
        console.log(userrol)
        console.log("USER FROM TOKEN:", req.user);
        console.log("ALLOWED ROLES:", Role);

        if(!Role.includes(userrol)){
             return res.status(403).json({ message: "Access Denied" });
        }
        next()
    }
}
module.exports = {allowRoles}