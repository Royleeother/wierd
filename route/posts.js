const bodyValidator = require("../validator/body")
const queryValidator = require("../validator/query")
const errorType = require("../utils/errorType")
var userUtil = require("../utils/user")
const mongoose = require('mongoose');

const Post = require('../model/post')

function getPost(response, condition, page, count) {
    Post.find(condition)
        .skip(page)
        .limit(count)
        .sort("-updated_at")
        .exec(function (err, record) {
            if (err) {
                console.log(err);
                errorType.internal500(response)
            } else if (record == null) {
                errorType.postNotFound404(response)
            } else {
                if (record.length == 0) {
                    errorType.postNotFound404(response)
                } else {
                    console.log("found:", record);
                    response.status(200).send(record)
                }
            }
        })
}

function getPostByUserId(response, id, page, count) {
    getPost(response, { creator:id }, page, count)
}

const myPosts = {
    path: '/users/me/posts', 
    method: 'get',
    func: function(request, response) {
        try {
            let query = request.query
            let id = request.headers['userId']
            if (queryValidator.validPageQuery(query)) {
                getPostByUserId(response, id, 
                    parseInt(query.page), parseInt(query.count))
            } else {
                console.log("query:", query);
                errorType.pageOrCountInvalid(response)
            }
        } catch (err) {
            console.log(err);
            errorType.internal500(response)
        }
    }
}

const userPosts = {
    path: '/users/:id/posts', 
    method: 'get',
    func: function(request, response) {
        try {
            let query = request.query
            let id = request.params['id']
            userUtil.validUser(response, id, (record) => {
                if (queryValidator.validPageQuery(query)) {
                    getPostByUserId(response, id, 
                        parseInt(query.page), parseInt(query.count))
                } else {
                    console.log("query:", query);
                    errorType.pageOrCountInvalid(response)
                }
            })
        } catch (err) {
            console.log(err);
            errorType.internal500(response)
        }
    }
}

const createPost = {
    path: '/posts', 
    method: 'post',
    func: function(request, response) {
        try {
            let body = request.body
            if (bodyValidator.validBodyForPost(body)) {
                let post = new Post({
                    title: body.title,
                    content: body.content,
                    creator: request.headers['userId']
                })
                post.save((err, record) => {
                    if (err) {
                        console.log(err);
                        errorType.internal500(response)
                    } else if (record == null) {
                        errorType.queryFail(response)
                    } else {
                        response.status(200).send({record})
                    }
                })
            } else {
                errorType.bodyInvalid(response)
            }
        } catch(err) {
            console.log(err);
            errorType.internal500(response)
        } 
    }
}

const getAllPost = {
    path: '/posts', 
    method: 'get',
    func: function(request, response) {
        try {
            let query = request.query
            if (queryValidator.validPageQuery(query)) {
                getPost(response, {}, 
                    parseInt(query.page), parseInt(query.count))
            }
        } catch(err) {
            console.log(err);
            errorType.internal500(response)
        }
    }
}

const getPostById = {
    path: '/posts/:id', 
    method: 'get',
    func: function(request, response) {
        try {
            let id = request.params['id']
            if (mongoose.Types.ObjectId(id)) {
                getPost(response, { _id:id }, 0, 0)
            }
        } catch(err) {
            errorType.postInInvalid400(response)
        }
    }
}

const updatePost = {
    path: '/posts/:id', 
    method: 'patch',
    func: function(request, response) {
        try {
            let id = request.params['id']
            if (mongoose.Types.ObjectId(id)) {
                let body = request.body
                if (bodyValidator.validBodyForPatch(body, ["title", "content"])) {
                    Post.findById(id, (err, record) => {
                        if (err) {
                            console.log(err);
                            errorType.internal500(response)
                        } else if (record == null) {
                            errorType.postNotFound404(response)
                        } else {
                            record.set(body)
                            record.save((saveErr, newRecord) => {
                                if (saveErr) {
                                    console.log('saveErr:', saveErr)
                                    errorType.postIdInvalid400(response)
                                } else {
                                    response.status(200).send(newRecord)
                                }
                            })
                        }
                    })
                } else {
                    errorType.bodyInvalid(response)
                }
            }
        } catch(err) {
            console.log("400 err:", err);
            errorType.postIdInvalid400(response)
        }
    }
}

var routes = [
    myPosts,
    createPost,
    userPosts,
    getAllPost,
    getPostById,
    updatePost,
]

module.exports.routes = routes