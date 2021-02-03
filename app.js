var chatApp = angular.module('chatApp', ['ngSanitize']);

// Define the `ChatController` controller on the `phonecatApp` module
chatApp.controller('ChatController', 
    ['$scope', '$http', '$timeout', 
    function($scope, $http, $timeout) {

      // Déclaration des 2 users
      // Ajout de "class" et "classP" pour modifier le CSS pour différencier User et Operator

      var USER = {
        imgLong : './assets/_MG_9359.jpg',
        img : '9359.jpg',
        name : 'Utilisateur',
        class : 'text-user',
        classP : 'p-reverse-user'
      };

      var OPERATOR = {
        imgLong : './assets/_MG_9428.jpg',
        img : '9428.jpg',
        name : 'Opératrice',
        class: 'text-ope',
        classP: 'p-reverse-ope'

      }

      // La liste des messages
      $scope.messages = new Array();
      // L'objet qui indique quel utilisateur est en train de taper. 
      $scope.messageInput = null;
      // Le contenu de l'input 
      $scope.currentMessage = ''; 
      // Nom interlocuteur pour la partie #title
      $scope.name = OPERATOR.name;
      // Img interlocuteur pour la partie #title
      $scope.img = './assets/_MG_' + OPERATOR.img;
      


      /**
       * Gestion du message en cours
       */
      $scope.updateInput = function(){
        var size = $scope.currentMessage.length;
        if (!$scope.messageInput && size > 0){
          $scope.messageInput ={
            author: USER.name,
            img : USER.imgLong,
            class : USER.class,
            classP : USER.classP
          } 
        }else if(size === 0){
          $scope.messageInput = null;
        }
      }

      /**
       * Ajout d'un nouveau message'
       */
      $scope.sendMessage = function(){
        if ($scope.currentMessage.length > 0){
          addUserMessage($scope.currentMessage+'', true);
          
          // On néttoie et on simule la conversation
          $scope.currentMessage = '';
          $scope.messageInput = null;

          $timeout(function fakeAnswer(){
            $scope.messageInput = {
              author: OPERATOR.name,
              img : OPERATOR.imgLong,
              class : OPERATOR.class,
              classP : OPERATOR.classP
            };
            $http({
              method: 'GET',
              url: 'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'
            })
            .then(function callBackFakeMessage(response){

              $scope.messageInput = null;
              addUserMessage(response.data[0], false);
            },
            function callBackError(){
              $scope.messageInput = null;
            });
          }, 500);
        }
      }


      /**
       * Fonction utilitaire pour l'ajout d'un message
       */
      function addUserMessage(message, me){
        $scope.messages.push({
          author: me ? USER.name : OPERATOR.name,
          time: new Date(),
          message: message,
          img : './assets/_MG_'+ (me ? USER.img : OPERATOR.img),
          me: me,
          class: me ? USER.class : OPERATOR.class,
          classP: me ? USER.classP : OPERATOR.classP
        })
      }

}]);