const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type : String , required : true , },
    content: { type : String , required : true ,},
    creator: { type : mongoose.Schema.Types.ObjectId , required : true, },

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});

module.exports = mongoose.model('Post', postSchema);
