'use strict';

angular.module('ubdAppApp')
    .service('Device', function($http) {
        var get = function(id, cb) {
            $http.get('http://localhost:3000/api/device/' + id)
                .success(function(data) {
                    return cb(data);
                })
                .error(function(data) {
                    return cb(data);
                });
        };
        var getFeature = function(id, cb) {
            $http.get('http://localhost:3000/api/io/' + id)
                .success(function(data) {
                    return cb(data);
                })
                .error(function(data) {
                    return cb(data);
                });
        };
        var getFeatures = function(cb) {
            $http.get('http://localhost:3000/api/io/')
                .success(function(data) {
                    return cb(data);
                })
                .error(function(data) {
                    return cb(data);
                });
        };
        var command = function(val) {
            $http.post('http://localhost:3000/api/command/', {
                _id: '54860daf51077ebc0f88064f',
                value: String(val)
            });
        };
        return {
            Get: get,
            GetFeature: getFeature,
            GetFeatures: getFeatures,
            Command: command
        };
    });