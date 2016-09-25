module.exports = function(express, mongoose) {
    var router = express.Router();
    var path = process.cwd();

    router.use('/api', require('./api')(express, mongoose));
    router.use('/*', function(req, res) {
        res.sendFile(path + '/app/index.html');
    });

    return router;
};
