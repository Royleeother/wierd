

module.exports = {
    validPageQuery: function(query) {
        let fields = ['page', 'count']
        if (query == null) {
            return false
        } else {
            for (const f of fields) {
                let v = query[f] 
                if (v == undefined || isNaN(parseInt(v))) {
                    return false
                }
            }
            return true
        }
    }
}