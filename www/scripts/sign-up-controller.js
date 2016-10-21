myApp.controller('signUpCtrl', function($scope, $auth) {
    $scope.handleRegBtnClick = function() {
        $auth.submitRegistration($scope.registrationForm)
            .then(function(resp) {
            // handle success response

        })
            .catch(function(resp) {
            // handle error response

        });
    };

    $scope.$on('auth:registration-email-success', function(ev, message) {
        //alert("A registration email was sent to " + message.email);
        var options = {
            animation: 'slide', 
            onTransitionEnd: function() {}
        };

        ons.notification.alert({
            message: 'Un Email de confirmación de la cuenta fue enviada a '+ message.email,
            title: 'Confirmación',
            buttonLabel: 'OK',
            animation: 'default', 
            callback: function() {
                // Alert button is closed!
            }
        });
        myNavigator.resetToPage("sign-in.html", options);
    });

    $scope.$on('auth:registration-email-error', function(ev, reason) {
        alert("Registration failed: " + reason.errors[0]);
        ons.notification.alert({
            message: ''+reason.errors[0]+'',
            title: 'Error',
            buttonLabel: 'OK',
            animation: 'default', 
            callback: function() {
                // Alert button is closed!
            }
        });
    });

    $scope.$on('auth:email-confirmation-success', function(ev, user) {
        alert("Welcome, "+user.email+". Your account has been verified.");
    });

    $scope.previewPage = function(){
        var options = {
            animation: 'slide',
            onTransitionEnd: function(){}
        }
        myNavigator.resetToPage("index.html", options);
    }

});