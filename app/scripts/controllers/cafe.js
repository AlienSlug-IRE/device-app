'use strict';
/* globals io */
angular.module('ubdAppApp')
    .controller('CafeCtrl', function($scope, Device, $timeout) {

    	$scope.stars = [];

        var socket = io.connect('http://localhost:3000', {
            resource: 'nodejs'
        });

        socket.on('trigger', function(msg) {
            console.log('Cafe', msg.device.value);
            var command = 1;
            if(msg.device.value != 'UID254D2C05'){
            	command = 0;
            }else{
            	$scope.stars.push({ time: new Date(), scan: msg.device.value });
            }
           
            Device.Command(command);
            $timeout(function(){
            	Device.Command(2);
            },2000);
        });

    });