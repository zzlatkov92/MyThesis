myApp.controller('AdminHomeController', function($scope, $http) {
	Chart.defaults.global.legend.display = false;

	$http.get("http://ecommerce/modules/admin/controllers/get_orders.php")
    	.success(function(data) {
    		if(data.length) {
	        	var orders = data,
	        		dates = [],
	        		prices = [];

	        	for(var i = 0; i < orders.length; i++) {
	        		var date = orders[i]['OrderDate'],
	        			price = orders[i]['TotalPrice'];

	        		dates.push(date);
	        		prices.push(price);
	        	}

	        	var ctx = document.getElementById("ordersChart");
				var ordersChart = new Chart(ctx, {
				    type: 'line',
				    data: {
				        labels: dates,
				        datasets: [{
				        	label: 'Поръчки',
				            data: prices,
				            backgroundColor: 'rgba(54, 162, 235, 0.2)'
				        }]
				    },
				    options: {
				        scales: {
				            yAxes: [{
				                ticks: {
				                    beginAtZero:true
				                }
				            }]
				        }
				    }
				});
			}
    	}
	);

	$http.get("http://ecommerce/modules/admin/controllers/get_products.php")
    	.success(function(data) {
        	if(data.length) {
        		var products = data,
	        		names = [],
	        		counts = [],
	        		colors = [];

	        	for(var i = 0; i < products.length; i++) {
	        		var name = products[i]['ProductName'],
	        			count = products[i]['product'];

	        		names.push(name);
	        		counts.push(count);
	        	}

	        	for(var j = 0; j < 30; j++) {
	        		colors.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
	        	}

	        	var ctx = document.getElementById("productsChart");
				var productsChart = new Chart(ctx, {
				    type: 'pie',
				    data: {
				        labels: names,
				        datasets: [{
				            data: counts,
				            backgroundColor: colors,
				        }]
				    }
				});
			}
    	}
	);

	$http.get("http://ecommerce/modules/admin/controllers/get_clients.php")
    	.success(function(data) {
        	if(data.length) {
        		var clients = data,
	        		names = [],
	        		counts = [],
	        		colors = [];

	        	for(var i = 0; i < clients.length; i++) {
	        		var name = clients[i]['DeliveryUser'],
	        			count = clients[i]['user'];

	        		names.push(name);
	        		counts.push(count);
	        	}

	        	for(var j = 0; j < 30; j++) {
	        		colors.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
	        	}

	        	var ctx = document.getElementById("clientsChart");
				var clientsChart = new Chart(ctx, {
				    type: 'pie',
				    data: {
				        labels: names,
				        datasets: [{
				            data: counts,
				            backgroundColor: colors,
				        }]
				    }
				});
			}
    	}
	);
});