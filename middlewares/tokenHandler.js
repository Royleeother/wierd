const User = require('../model/user')
var jwtUtil = require("../utils/jwt")
var userUtil = require("../utils/user")
var errorType = require("../utils/errorType")


var inspecToken = function(req, res, next) {
    let end = req.originalUrl.split('/').pop()
    let whiteList = [
        'login',
        'register',
    ]
    if (whiteList.includes(end)) {
        next()  
    } else {
        try {
            let token = req.headers['authsessiontoken']
            if (token) {
                let payload = jwtUtil.decodeToken(token)
                let id = payload.id
                if (id) {
                    userUtil.validUser(res, id, () => {
                        req.headers['userId'] = id
                        next()
                    })
                } else {
                    console.log("token 401 1");
                    errorType.jwt401(res)
                }
            } else {
                console.log("token 401 2");
                errorType.jwt401(res)
            }
        } catch (err) {
            console.log(err);
            errorType.jwt401(res)
        }
    }
}


var components = [
    inspecToken
]

module.exports.components = components