'use strict';

describe('Controller: OpenCtrl', function () {

  // load the controller's module
  beforeEach(module('ubdAppApp'));

  var OpenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OpenCtrl = $controller('OpenCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
