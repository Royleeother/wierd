const User = require('../model/user')
var errorType = require("../utils/errorType")
var userUtil = require("../utils/user")


const myself = {
    path: '/users/me',
    method: 'get',
    func: function(request, response) {
        try {
            let id = request.headers['userId']
            User.findById(id, (err, record) => {
                response.status(200).send(record)
            })
        } catch (err) {
            console.log(err);
            errorType.internal500(response)
        }
    }
}

const getById = {
    path: '/users/:userId',
    method: 'get',
    func: function(request, response) {
        try {
            let id = request.params['userId']
            userUtil.validUser(response, id, (record) => {
                response.status(200).send(record)
            })
        } catch (err) {
            console.log(err);
            errorType.internal500(response)
        }
    }
}



var routes = [
    myself,
    getById,
]

module.exports.routes = routes