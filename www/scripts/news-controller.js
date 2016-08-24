myApp.controller('NewsController', function($scope,$news, $timeout) {

    $scope.news = [];
    $scope.success = true;

  //Creando el popOver para el tip
    ons.createPopover('popover.html').then(function(popover) {
    $scope.popover = popover;
  });

    
    var loadData = function($done) {
      
      $scope.success = true;
      modal.show();
      $news.last(
          function(news) {
              // Store in local store
              var newsData = JSON.stringify(news);
              localStorage.setItem('newsData', newsData);

              $scope.news = news;

              if (news.length > 0) {
                lastDateNews = news[0].created_at;
                localStorage.setItem('lastDateNews', lastDateNews);
                // $parent.newsCount = 0;
              }


              modal.hide();
              if ($done)
                $done();
          },
          function(error) {
              console.log(error);

              // Retrieve data from cache
              var news = JSON.parse(localStorage.getItem('newsData'));

              if (news != null) {
                $scope.news = news;
              } else {
                $scope.success = false;
              }
              modal.hide();
              if ($done)
                $done();
          }
      );
    };


  // Initial load
  $timeout(function() {
      loadData();
      var newsAlertExecuted = localStorage.getItem('newsOpened');
      if (newsAlertExecuted == null) {
        localStorage.setItem('newsOpened', 'Y');
        console.log("se carga el popover");
        $scope.popover.show('#noticias');
      }
    },100);



    $scope.loadDataPull = function($done) {
        loadData($done);
    };


    $scope.showDetail = function(newObj){
        //newImageModal.hide();
        console.log("Exito");
        $scope.newsNavigator.pushPage('new.html');
        $scope.currentNew = newObj;
        //console.log($scope.currentNew);
        var str = newObj.content;      
        var urlRegEx = /<(\w+) (.*")>(.*)<.a>/g;
        result = str.replace(urlRegEx, "<a class='custom_Links' onclick=\"window.open('$3',\'_system\')\">$3</a>");
        $scope.contenido = result;
        //console.log(str);
        //console.log(result);

    }

    $scope.showImage = function() {
      newImageModal.show();
    }

    $scope.dialogs = {};
    $scope.show = function(dlg, imageUrl) {
        $scope.imageUrl = imageUrl;
        if (!$scope.dialogs[dlg]) {
          ons.createDialog(dlg).then(function(dialog) {
            $scope.dialogs[dlg] = dialog;
            dialog.show();
          });
        } else {
          $scope.dialogs[dlg].show();
        }
    };

/* Función que permite el funcionamiento del scroll infinito*/
    $scope.MyDelegate = {
        countItems: function() {
        // Return number of items.
        return $scope.news.length;
      },

      calculateItemHeight: function(index) {
        // Return the height of an item in pixels.
        return 99;
      },

      configureItemScope: function(index, itemScope) {
        // Initialize scope
        itemScope.item = $scope.news[index];
      }
};







});

