'use strict';
angular.module('ubdAppApp')
    .service('Project', function($http) {
        var get = function(cb) {
            $http.get('http://localhost:3000/api/project/')
                .success(function(data) {
                    return cb(data);
                })
                .error(function(data) {
                    return cb(data);
                });
        };
        var create = function(obj) {
            $http.post('http://localhost:3000/api/project/', { name: obj.name })
                .success(function(data) {
                    return obj.callback(data);
                })
                .error(function(data) {
                    return obj.callback(data);
                });
        };
        var remove = function(obj) {
            $http.delete('http://localhost:3000/api/project/' + obj.id)
                .success(function() {
                    return obj.callback();
                })
                .error(function() {
                    return obj.callback();
                });
        };
        return {
            Get: get,
            Create: create,
            Remove: remove
        };
    });