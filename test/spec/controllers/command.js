'use strict';

describe('Controller: CommandCtrl', function () {

  // load the controller's module
  beforeEach(module('ubdAppApp'));

  var CommandCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommandCtrl = $controller('CommandCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
