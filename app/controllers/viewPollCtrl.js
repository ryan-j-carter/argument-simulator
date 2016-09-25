angular.module('ViewPollCtrl', [])
.controller('ViewPollController', ['Poll', '$stateParams', '$window', function(Poll, $stateParams, $window) {
    var answeredPolls = [];
    if ($window.localStorage.getItem('answeredPolls'))
        answeredPolls = JSON.parse($window.localStorage.getItem('answeredPolls'));

    var self = this;
    self.answered = hasAnswered($stateParams._id);
    self.submitVote = submitVote;

    Poll.get($stateParams._id).then(function(response) {
        self.question = response.data.question;
        self.choices = response.data.choices;
        self.votes = response.data.votes;
        self._id = response.data._id;

        self.voteCount = self.votes.reduce(function(a, b) {return a+b}, 0);
    });

    function hasAnswered(id) {
        if (answeredPolls != null) {
            for (var i = 0; i < answeredPolls.length; ++i) {
                if (answeredPolls[i] == id) {
                    self.desc = "Current Results";
                    return true;
                }
            }
        }
        self.desc = "Answer the poll";
        return false;
    }

    function submitVote() {
        if (self.choice !== "undefined") {
            answeredPolls.push(self._id);
            $window.localStorage.setItem('answeredPolls', JSON.stringify(answeredPolls));
            self.votes[self.choice] += 1;
            Poll.update(self._id, self.votes).then(function(response) {
                self.votes = response.data;
                self.answered = true;
            });
        }
    }
}]);
