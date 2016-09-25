angular.module('PollCtrl', [])
.filter('pollFilter', ['$location', function($location) {
    return function(input) {
        if (input) {
            var path = $location.path().split('/');
            var user = path[path.length-1];

            if (user == "all") {
                return input;
            }
            else {
                return input.filter(function(poll) {
                    return poll.user == user;
                });
            }
        }
    }
}])
.controller('PollController', ['Poll', '$location', function(Poll, $location) {
    var self = this;

    Poll.all().then(function(response) {
        self.polls = response.data;
    });
}]);
