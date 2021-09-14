const bodyValidator = require("../validator/body")
const jwtUtil = require("../utils/jwt")
const errorType = require("../utils/errorType")
const User = require('../model/user')


const register = {
    path: '/auth/register',
    method: 'post',
    func: function(request, response) {
        try {
            let body = request.body
            if (bodyValidator.validBodyForRegister(body)) {
                let user = new User({
                    name: body.name,
                    email: body.email,
                    password: body.password,
                })
        
                user.save((err, record) => {
                    if (err) {
                        console.log(err);
                        errorType.internal500(response)
                    } else if (record == null) {
                        errorType.jwt400(response)
                    } else {
                        response.status(200).send({
                            token: jwtUtil.generateUserToken(record['_id'])
                        })
                    }
                })
            } else {
                errorType.jwt400(response)
            }
        } catch(err) {
            console.log(err);
            errorType.internal500(response)
        }
        
    }
}

const login = {
    path: '/auth/login',
    method: 'post',
    func: function(request, response) {
        try {
            let body = request.body
            if (bodyValidator.validBodyForLogin(body)) {
                let con = {
                    email: body.email,
                    password: body.password
                }
                User.findOne(con, (err, record) => {
                    if (err) {
                        console.log(err);
                        errorType.internal500(response)
                    } else if (record == null) {
                        errorType.jwt400(response)
                    } else {
                        response.status(200).send({
                            token: jwtUtil.generateUserToken(record._id)
                        })
                    }
                })
            } else {
                errorType.jwt400(response)
            }
        } catch (err) {
            console.log(err);
            errorType.internal500(response)
        }
    }
}

var routes = [
    register,
    login,
]

module.exports.routes = routes