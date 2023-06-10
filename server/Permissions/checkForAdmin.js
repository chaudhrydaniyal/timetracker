

function checkForAdmin(req, res, next) {

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.split(' ')[1] == 'true') {
      
        const token = authHeader.split(' ')[1];

        console.log("req of middleware", authHeader)

        next();

    } else {

        res.sendStatus(401)
        
    }

}


module.exports = {

    checkForAdmin

}