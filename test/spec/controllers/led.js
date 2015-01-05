'use strict';

describe('Controller: LedCtrl', function () {

  // load the controller's module
  beforeEach(module('ubdAppApp'));

  var LedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LedCtrl = $controller('LedCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
