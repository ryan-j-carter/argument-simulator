angular.module('NewPollCtrl', [])
.controller('NewPollController', ['Poll', '$location', function(Poll, $location) {
    var self = this;

    self.choices = ['', ''];

    self.addChoice = addChoice;
    self.removeChoice = removeChoice;
    self.create = create;

    function addChoice() {
        if (self.choices.length < 10) {
            self.choices.push('');
        }
    }

    function removeChoice(index) {
        if (self.choices.length > 2) {
            self.choices.splice(index, 1);
        }
    }

    function create(user) {
        if (self.form.$valid) {
            if (user == '') {
                user = 'Anonymous';
            }
            Poll.create(self.question, self.choices, user).then(function(response) {
                if (response.data != null) {
                    $location.path('/polls/' + user + '/' + response.data);
                }
            });
        }
    }
}]);
