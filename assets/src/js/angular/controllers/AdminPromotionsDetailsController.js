myApp.controller('AdminPromotionsDetailsController', function($scope, $http, Upload, ngDialog, popupService) {
    $scope.savePromotion = function(promotion) {
        Upload.upload({
            url: 'http://ecommerce/modules/promotions/admin/controllers/save.php', 
            method: 'POST',
            data: {
                'id': promotion.PromotionId,
                'name': promotion.PromotionName,
                'link': promotion.PromotionLink,
                'content': promotion.PromotionContent,
                'date_start': promotion.PromotionDateStart,
                'date_end': promotion.PromotionDateEnd,
                'photo': promotion.PromotionPhoto
            }
        }).then(function () {
            $scope.alert = {
                'title': 'Успех',
                'message': 'Успешно сменихте Вашите данни'
            };

            $scope.closePopup = function() {
                ngDialog.close();
            }

            $('button[type="submit"]').removeClass('button--loading');

            popupService.init('http://ecommerce/partials/alert.html', $scope, reloadPage);
        });
    }
});