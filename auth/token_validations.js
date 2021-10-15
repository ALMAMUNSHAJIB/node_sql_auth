const {verify} = require('jsonwebtoken');

module.exports = {
  checkToken:(req, res, next)=>{
        let token = req.get('authorizations');
        if(token){
            token = token.slice(6);
            verify(token, "secret", (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "Invalid Token"
                    });
                }else{
                    next();
                }
            })
        }else{
            res.json({
                success: 0,
                message: "Access denied! unauthorized user!"
            })
        }
        
    }
}