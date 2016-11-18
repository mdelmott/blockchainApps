/**
 * Created by mdelmott on 14/09/2016.
 */
describe("App", function() {

    let scope,
        controller;

    beforeEach(function () {
        angular.mock.module('TestApp');
    });

    describe('loginCtrl', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('loginCtrl', {
                '$scope': scope
            });
        }));

        it("says hello", function() {
            expect(scope.helloWorld()).toEqual("Hello World!!");
        });

        /*it("says hello2", function() {
            expect(scope.helloWorld()).toEqual("Hello world!!");
        });*/
    });
});
