module.exports = function(mongoose) {
    return mongoose.model('users', new mongoose.Schema({
        id: mongoose.Schema.ObjectId,
        username: {type:String, required:true},
        password: {type:String, required:true}
    }));
};
