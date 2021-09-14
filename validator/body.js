function validBodyByField(body, fields) {
    if (body == null) {
        return false
    } else {
        for (const f of fields) {
            let v = body[f] 
            if (v == undefined || v == "") {
                return false
            }
        }
        return true
    }
}

function validBodyForPatch(body, fields) {
    if (body == null || Object.keys(body).length == 0) {
        return false
    } else {
        for (let k in body) {
            if (!fields.includes(k)) {
                return false
            }
        }
        return true
    }
}


module.exports = {
    validBodyForRegister: (body) => {
        return validBodyByField(body, ["name", "email", "password"])
    },
    validBodyForLogin: (body) => {
        return validBodyByField(body, ["email", "password"])
    },
    validBodyForPost: (body) => {
        return validBodyByField(body, ["title", "content"])
    },
    validBodyForPatch: validBodyForPatch,
}
