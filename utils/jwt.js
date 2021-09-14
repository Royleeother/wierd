var jwt = require('jsonwebtoken')

let privateKey = "ljq"

module.exports = {
    generateUserToken: function(id) {
        var token = jwt.sign({ id: id }, privateKey, { algorithm: 'HS256'});
        return token
    },

    decodeToken: function(token) {
        var decoded = jwt.verify(token, privateKey, { algorithm: 'HS256'})
        return decoded
    }
}