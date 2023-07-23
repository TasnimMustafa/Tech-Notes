const jwt = require("jsonwebtoken")

module.exports= function(req,res,next){
   // const token = req.cookies.jwt;
   const token = req.headers.authorization || req.headers.Authorization
   if (!token?.startsWith('Bearer ')) {
      return res.redirect('/login');
      // return res.status(401).send('Unauthenticated. Access Rejected!!')
   }

   const accessToken = token.split(' ')[1]

   try {
    const decodeToken = jwt.verify(accessToken,'secret_key')
    req.user = decodeToken;
    next()
   } 

    catch (error) {
    res.status(400).json({message:"Wrong Token"})
   }
}