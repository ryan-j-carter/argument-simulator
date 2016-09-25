module.exports = function(express, Poll) {
    var router = express.Router();

    router.get('/find', function(req, res) {
        if (req.query._id) {
            Poll.findOne({_id: req.query._id}, function(err, poll) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(poll);
                }
            });
        }
        else {
            res.send(null);
        }
    });

    router.post('/update', function(req, res) {
        req.on('data', function(data) {
            data = JSON.parse(data);

            Poll.findByIdAndUpdate(
                data._id,
                {votes: data.votes},
                {new: true},
                function(err, poll) {
                    if (err) throw err;
                    res.json(poll.votes);
                }
            );
        });
    });

    router.post('/create', function(req, res) {
        req.on('data', function(data) {
            data = JSON.parse(data);

            var poll = new Poll({
                question: data.question,
                choices: data.choices,
                votes: new Array(data.choices.length).fill(0),
                user: data.user
            });

            poll.save(function(err, doc) {
                if (err) throw err;
                else {
                    res.send(doc._id);
                }
            });
        });
    });

    return router;
};
