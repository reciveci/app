myApp.controller('MainController', function($scope, $news,$specialOffer) {

  document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false);
function onDeviceReady() {

        var appVersion = '0.2.2';
        var iosId = '1083627779';
        var androidPackageName = 'ec.reviceci.app';


$specialOffer.init({
            id           : 'my-special-offer' + appVersion,
            showOnCount  : 5,
            title        : 'Califica esta aplicación',
            text         : 'Agradecemos tu calificación y comentarios ya que nos ayudan a seguir mejorando',
            agreeLabel   : 'Calificar APP',
            remindLabel  : 'Recordarmelo mas tarde',
            declineLabel : 'No gracias',
            onAgree      : function () {
                // agree
                if (window.device.platform === 'iOS') {
                    window.open($specialOffer.appStoreUrl(iosId),'_system');
                } else if (window.device.platform === 'Android') {
                    window.open($specialOffer.googlePlayUrl(androidPackageName),'_system');
                }
            },
            onDecline   : function () {
                // declined
            },
            onRemindMeLater : function () {
                //showOnCount:0
            },
        });
    };


  lastDateNews = localStorage.getItem('lastDateNews');
  // console.log(lastDateNews);

  $news.count({date:lastDateNews}, function(count) {
    // console.log('called');
    // console.log(count.count);
    if (count.count > 0)
      $scope.newsCount = count.count;
  });


  $scope.clearNewsNotification = function() {
    $scope.newsCount = 0;
  }





});
