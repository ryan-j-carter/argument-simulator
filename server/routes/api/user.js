module.exports = function(express, mongoose) {
    var User = require('../../models/user.js')(mongoose);
    var router = express.Router();

    router.post('/create', function(req, res) {
        req.on('data', function(data) {
            var user = new User();
            data = JSON.parse(data);

            user.username = data.username;
            user.password = data.password;
            user.save(function(err, doc) {
                if (err) {
                    res.send(null);
                }
                else {
                    res.send(doc.username);
                }
            });
        });
    });

    router.get('/login', function(req, res) {
        User.findOne({username: req.query.username}, function(err, user) {
            if (err) throw err;
            if (user === null) {
                res.send(null);
            }
            else {
                if (user.password != req.query.password) {
                    res.send("pass");
                }
                else {
                    res.send(user.username);
                }
            }
        });
    });

    return router;
};
