const User = require('../model/user')
var errorType = require("../utils/errorType")
const mongoose = require('mongoose');


module.exports = {
    validUser: (res, id, callback) => {
        try {
            if (mongoose.Types.ObjectId(id)) {
                User.findById(id, (err, record) => {
                    if (err) {
                        console.log(err);
                        errorType.internal500(res)
                    } else if (record == null) {
                        console.log("userNotFound404:", record);
                        errorType.userNotFound404(res)
                    } else {
                        console.log("found:", record);
                        callback(record)
                    }
                })
            }
        } catch (error) {
            console.log('eee id: ', id);
            errorType.userIdInvalid400(res)
        }
        
    }

}