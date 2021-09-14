const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type : String , required : true , unique : true,},
    email: { type : String , required : true , unique : true,},
    password: { type : String , required : true, select: false },

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});

module.exports = mongoose.model('User', userSchema);