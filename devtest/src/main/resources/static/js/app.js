(function () {

    let app = angular.module('notesApp', ['ngRoute', 'ngMaterial', 'ngStorage']);

    app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '/partials/notes-view.html', controller: 'notesController'
            })
            .when('/login', {
                templateUrl: '/partials/login.html', controller: 'loginController',
            })
            .otherwise('/');
    }]);

    app.run(['$sessionStorage', '$rootScope', '$location', 'AuthService', function ($sessionStorage, $rootScope, $location, AuthService) {
        $rootScope.$on('$routeChangeStart', function (event) {
            $rootScope.logged = false;
            $rootScope.logout = function () {
                $sessionStorage.$reset();
                AuthService.logout();
                $location.path('/login');
            };
            if ($location.path() == "/login") {
                return;
            }

            $rootScope.$storage = $sessionStorage;
            if ($sessionStorage.loggedIn === 'true') {
                $rootScope.logged = true;
            } else if (!AuthService.isLoggedIn()) {
                event.preventDefault();
                $location.path('/login');
            }
        });
    }]);


    app.service('AuthService', function ($http) {
        let loggedUser = null;

        function login(username, password) {
            return $http.post("api/login", {username: username, password: password}).then(function (user) {
                loggedUser = user;
            }, function (error) {
                loggedUser = null;
                return error;
            })
        }

        function logout() {
            loggedUser = null;
        }

        function isLoggedIn() {
            return loggedUser != null;
        }

        return {
            login: login, logout: logout, isLoggedIn: isLoggedIn
        }
    });

    app.controller('loginController', function ($scope, AuthService, $location, $sessionStorage) {
        $scope.$storage = $sessionStorage;

        $scope.invalidCreds = false;
        $scope.login = {
            username: null, password: null
        };

        $scope.login = function () {
            AuthService.login($scope.login.username, $scope.login.password).then(function (user) {
                if (user == null) {
                    $sessionStorage.loggedIn = AuthService.isLoggedIn().toString();
                    $location.path("/");
                } else {
                    $scope.invalidCreds = true;
                }
            });
        };

    });

    app.service('NotesService', function ($http) {
        function findAll() {
            return $http.get("api/notes");
        }

        function addNote(note) {
            return $http.post("api/notes", JSON.stringify(note)).then(function (res) {
                console.log(res);
            });
        }

        function deleteNote(note) {
            confirm(JSON.stringify(note));
            return $http.post('api/notes/delete', JSON.stringify(note)).then(function (res) {
                console.log(res);
            });
        }

        return {
            findAll: findAll, addNote: addNote, deleteNote: deleteNote
        }
    });


    app.controller('notesController', function ($scope, $window, NotesService) {
        $scope.isEditCreateView = false;
        $scope.isEmpty = false;

        NotesService.findAll().then(function (response) {
            $scope.notes = response.data;
        });

        $scope.note = {
            name: null, text: null, index: null,
        };

        $scope.reloadPage = function () {
            $window.location.reload();
        }

        $scope.save = function () {
            if ($scope.note.name != null && $scope.note.text != null) {
                NotesService.addNote($scope.note).then(function (response) {
                    $scope.notes = response.data;
                });
                $scope.reloadPage();
            } else {
                $scope.isEmpty = true;
            }
            $scope.updateNote = false;
        };

        $scope.deleteNote = function (i) {
            const r = confirm("Are you sure you want to delete this note?");
            if (r === true) {
                NotesService.deleteNote($scope.note).then(function (response) {

                });
                $scope.reloadPage();
            }
        };

        $scope.newNoteView = function () {
            $scope.isEditCreateView = true;
            $scope.isEmpty = false;
            $scope.updateNote = false;
            $scope.note = {
                name: null, text: null, id: -1
            }
        };

        $scope.cancel = function () {
            $scope.isEditCreateView = false;
            $scope.updateNote = false;
        };

        $scope.viewNote = function (noteName, noteText, id) {
            $scope.note = {
                name: noteName, text: noteText, id: id
            }
            $scope.updateNote = true;
            $scope.isEditCreateView = true;
        }
    });
})();