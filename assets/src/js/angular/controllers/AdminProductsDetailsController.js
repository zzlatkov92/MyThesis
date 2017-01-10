myApp.controller('AdminProductsDetailsController', function($scope, $http, Upload, ngDialog, popupService) {
    var value = 1;

    if(!$scope.product) {
        $('#product_qty').val(value);
    }

    $scope.increaseSpinner = function(spinner) {
        if(spinner) {
            value = spinner.ProductQty;
        }

        value++;

        if(spinner) {
            spinner.ProductQty = value;
        } else {
            $('#product_qty').val(value);
        }
    };

    $scope.decreaseSpinner = function(spinner) {
        if(spinner) {
            value = spinner.ProductQty;
        } else {
            value = $('#product_qty').val();
        }

        value--;

        if(value < 1) {
            value = 1;
        }

        if(spinner) {
            spinner.ProductQty = value;
        } else {
            $('#product_qty').val(value);
        }
    };


    $scope.saveProduct = function(product) {
        Upload.upload({
            url: 'http://ecommerce/modules/products/admin/controllers/save.php', 
            method: 'POST',
            data: {
                'id': product.ProductId,
                'name': product.ProductName,
                'overview': product.ProductOverview,
                'features': product.ProductFeatures,
                'sizing': product.ProductSizing,
                'category': product.CategoryId,
                'producer': product.ProducerId,
                'qty': parseInt(product.ProductQty),
                'old_price': product.ProductOldPrice,
                'price': product.ProductPrice,
                'photo': product.ProductPhoto,
                'gallery': product.Gallery
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
    };

    $http.get("http://ecommerce/modules/categories/admin/controllers/index.php")
        .success(function(data) {
            $scope.categories = data;
        }
    );

    $http.get("http://ecommerce/modules/producers/admin/controllers/index.php")
        .success(function(data) {
            $scope.producers = data;
        }
    );
});