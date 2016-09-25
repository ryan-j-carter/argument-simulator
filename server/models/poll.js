module.exports = function(mongoose) {
    var Poll = new mongoose.Schema({
        id: mongoose.Schema.ObjectId,
        question: {type:String, required:true},
        choices: {type:[String], required:true},
        votes: {type:[Number], required:true},
        user: {type:String, required:true}
    });

    Poll.path('choices').validate(function(arr) {
        return arr.length >= 2 && arr.length <= 10;
    });

    return mongoose.model('polls', Poll);
};
