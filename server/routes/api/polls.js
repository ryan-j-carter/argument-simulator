module.exports = function(express, Poll) {
    var router = express.Router();

    router.get('/all', function(req, res) {
        Poll.find(function(err, polls) {
            if (err) throw err;
            res.json(polls);
        });
    });

    router.get('/:user', function(req, res) {
        Poll.find({username: req.params.user}, function(err, polls) {
            if (err) throw err;
            res.json(polls);
        });
    });

    return router;
};
