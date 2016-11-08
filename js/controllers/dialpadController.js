(function() {
    'use strict';
    angular.module("vertoControllers")
        .controller("dialpadController", function($rootScope, $scope, $http, $state, verto, storage, ngToast) {
            storage.data.notifications = true;
            storage.data.videoCall = false;
            storage.data.userStatus = 'connecting';
            storage.data.calling = false;

            function call(extension) {
                storage.data.cur_call = 0;
                storage.data.onHold = false;
                $rootScope.dialpadNumber = extension;
                if(!$rootScope.dialpadNumber) {
                    ngToast.create({
                        className : 'danger',
                        content: "<p class='toast-text'><i class='fa fa-times-circle'></i> Please enter an extension.</p>"
                    });
                    return false;
                }
                if (verto.data.call) {
                    ngToast.create({
                        className : 'danger',
                        content: "<p class='toast-text'><i class='fa fa-times-circle'></i> A call is already in progress.</p>"
                    });
                    return false;
                }
                if (storage.data.cid_number == null) {
                    ngToast.create({
                        className : "danger",
                        content: "<p class='toast-text'><i class='fa fa-times-circle'></i> You have not yet set a Caller ID Number.</p>"
                    });
                    return false;
                }
                storage.data.mutedVideo = false;
                storage.data.mutedMic = false;
                storage.data.videoCall = false;
                verto.call("##1"+$rootScope.dialpadNumber);
                storage.data.called_number = extension;
            }

            /**
             * Call to the number in $rootScope.dialpadNumber
             */
            $scope.loading = false;
            $scope.cancelled = false;

            $scope.call = function(extension) {
                $scope.loading = true;
                call(extension);
            };
            $scope.cancel = function() {
                $scope.cancelled = true;
            };
        });
})();
