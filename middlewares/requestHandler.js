var setJson = function(req, res, next) {
    console.log("req: ", req.originalUrl)
    res.contentType('application/json')
    // res.contentType('text/html')
    next()
}

var components = [
    setJson
]

module.exports.components = components