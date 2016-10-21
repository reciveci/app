myApp.controller('signInCtrl', function($scope, $auth, $window) {

    $scope.handleLoginBtnClick = function() {
        $auth.submitLogin($scope.loginForm)
            .then(function(resp) {
            
        })
            .catch(function(resp) {

        });
    };
    

    $scope.$on('auth:login-success', function(ev, user) {
//        alert('Welcome '+user.email); 
        var options = {
            animation: 'slide', 
            onTransitionEnd: function() {}
        };
        myNavigator.resetToPage("main.html", options);
        console.log(user);
    });

    $scope.$on('auth:login-error', function(ev, reason) {
//        alert('auth failed because '+reason.errors[0]);
        
        $scope.error = reason.errors[0];
        ons.notification.alert({
            message: ''+$scope.error+'',
            title: 'Error',
            buttonLabel: 'OK',
            animation: 'default', 
            callback: function() {
                // Alert button is closed!
            }
        });
    });
    
    $scope.previewPage = function(){
        var options = {
            animation: 'slide',
            onTransitionEnd: function(){}
        }
        myNavigator.resetToPage("index.html", options);
    }
});