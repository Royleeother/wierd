module.exports = {
    jwt401: (res) => {
        res.status(401).end(JSON.stringify({
            error: "JWT无效，JWT空位或者JWT过期了"
        }))
    },
    jwt400: (res) => {
        res.status(400).end(JSON.stringify({
            error: "用户名或密码不正确或者签发JWT失败"
        }))
    },
    internal500: (res) => {
        res.status(500).end(JSON.stringify({
            error: "内部服务器错误"
        }))
    },
    userNotFound404: (res) => {
        res.status(404).end(JSON.stringify({
            error: "找不到用户"
        }))
    },
    userIdInvalid400: (res) => {
        res.status(400).end(JSON.stringify({
            error: "用户ID无效"
        }))
    },
    queryFail: (res) => {
        res.status(404).end(JSON.stringify({
            error: "查找失败"
        }))
    },
    bodyInvalid: (res) => {
        res.status(400).end(JSON.stringify({
            error: "请求body的内容无效"
        }))
    },
    pageOrCountInvalid: (res) => {
        res.status(400).end(JSON.stringify({
            error: "count/page无效"
        }))
    },
    postNotFound404: (res) => {
        res.status(404).end(JSON.stringify({
            error: "帖子不存在"
        }))
    },
    postIdInvalid400: (res) => {
        res.status(400).end(JSON.stringify({
            error: "帖子id无效"
        }))
    },
}