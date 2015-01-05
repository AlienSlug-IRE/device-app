/* jshint unused:false */
/* globals io, _ */

'use strict';
angular.module('ubdAppApp')
    .controller('ProjectCtrl', function($scope, $location, Project, Device, $timeout) {

        var baseBlock = {
            name: 'Base',
            details: 'Raspbian OS',
            status: 'Offline'
        };

        $scope.details = {};
        $scope.projects = [];
        $scope.block = {};
        $scope.blocks = [baseBlock];
        $scope.logs = [];

        function viewProject() {
            return $location.path('/project');
        }

        function resetDeviceDetails() {
            $scope.details.devices = [];
            baseBlock.status = 'Offline';
            $scope.blocks = [baseBlock];
        }

        var refIOs = [];


        function getDeviceDetails() {
            var pg = $location.$$path.split('/')[1].toUpperCase();
            $scope.details.devices = [];
            baseBlock.status = 'Offline';
            $scope.blocks = [baseBlock];
            Device.Get(id, function(res) {
                if (res.device.active) {
                    $scope.blocks[0].status = 'Online';
                    $scope.details.devices[0] = {
                        id: id
                    };
                    var features = res.device.supports;
                    for (var i in features) {
                        var obj = _.findWhere(refIOs, {
                            _id: features[i]
                        });
                        $scope.blocks.push(obj);
                        $scope.blocks = _.uniq($scope.blocks);
                    }
                    if(pg === 'LED' || pg === 'NFC'){
                        console.log(refIOs);
                        $scope.block = _.findWhere(refIOs, {
                            name: pg
                        });
                    }else if(pg === 'BASE'){
                        $scope.block = $scope.blocks[0];
                    }
                }
            });
        }

        
        var id,
            storedId = localStorage.getItem('device');
        if (storedId !== null) {
            id = storedId;
            Device.GetFeatures(function(res) {
                refIOs = res.ios;
                getDeviceDetails();
            });
        }

        $scope.$on('$routeChangeStart', function() {
            Project.Get(function(res) {
                $scope.projects = res.projects;
            });
            var storedProject = localStorage.getItem('project');
            $scope.details = JSON.parse(storedProject);
            getDeviceDetails();
        });

        $scope.submit = function(val) {
            Project.Create({
                name: val.name,
                callback: function(res) {
                    $scope.openProject(res.project);
                }
            });
        };

        $scope.openProject = function(obj) {
            $scope.details = obj;
            localStorage.setItem('project', JSON.stringify($scope.details));
            viewProject();
        };

        $scope.removeProject = function() {
            Project.Remove({
                id: $scope.details._id,
                callback: function() {
                    return $location.path('/');
                }
            });
        };

        $scope.gotoView = function(str) {

            return $location.path(str);
        };

        $scope.getBlockValue = function(val){
            var display = '';
            if(val === 'NFC'){
                display = $scope.nfc;
            }
            return display;
        };

        $scope.goBack = function(){
            window.history.back();
        };

        $scope.LEDCommand = function(val){
            Device.Command(val);
        };


        $scope.nfc = '';
        var socket = io.connect('http://localhost:3000', {
            resource: 'nodejs'
        });

        socket.on('subscribe', function(msg) {
            $scope.logs.push({ time: new Date(), device: msg.device});
            id = msg.device;
            localStorage.setItem('device', id);
            $scope.blocks[0].status = 'Online';
            getDeviceDetails();
        });

        socket.on('disconnect', function(msg) {
            $scope.logs.push({ time: new Date(), device: msg.device});
            resetDeviceDetails();
            $scope.$digest();
        });


        socket.on('trigger', function(msg) {
            console.log('trigger', msg.device);
            $scope.logs.push({ time: new Date(), device: msg.device});
            $scope.nfc = msg.device.value;
            $scope.$digest();
            $timeout(function() {
                $scope.nfc = '';
                $scope.$digest();
            }, 4000);
        });

        socket.on('report', function(msg) {
            $scope.logs.push({ time: new Date(), device: msg.device});
            $timeout(function() {
                getDeviceDetails();
            }, 1000);
        });
        socket.on('do', function(msg) {
            $scope.logs.push({ time: new Date(), block: msg});
            console.log('do', msg);
        });

    });