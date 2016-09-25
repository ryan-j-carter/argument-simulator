module.exports = function(express, mongoose) {
    var Poll = require('../../models/poll.js')(mongoose);
    var router = express.Router();

    router.use('/user', require('./user.js')(express, mongoose));
    router.use('/polls', require('./polls.js')(express, Poll));
    router.use('/poll', require('./poll.js')(express, Poll));

    return router;
};
