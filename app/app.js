angular.module('app', ['Routes', 'Directives', 'UserCtrl', 'PollCtrl', 'ViewPollCtrl', 'NewPollCtrl'])
.factory('User', ['$http', function($http) {
    return {
        login: function(username, password) {
            return $http({
                url: '/api/user/login',
                method: 'GET',
                params: {username: username, password:password}
            });
        },
        create: function(username, password) {
            var data = {username: username, password: password};
            return $http.post('/api/user/create', data, {
                headers: {'Content-type': 'application/json'}
            });
        }
    }
}])
.factory('Poll', ['$http', function($http) {
    return {
        all: function() {
            return $http.get('/api/polls/all');
        },
        get: function(id) {
            return $http({
                url: '/api/poll/find',
                method: 'GET',
                params: {_id: id}
            });
        },
        update: function(id, votes) {
            var data = {_id: id, votes: votes};
            return $http.post('/api/poll/update', data, {
                headers: {'Content-type': 'application/json'}
            });
        },
        create: function(question, choices, user) {
            var data = {question: question, choices: choices, user: user};
            return $http.post('/api/poll/create', data, {
                headers: {'Content-type': 'application/json'}
            });
        }
    }
}]);
