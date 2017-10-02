'use strict';

(function (){
	angular.module('app')
	.controller('prestController', ['$scope', 'localStorageService', function($scope, localStorageService){
		//actualizo los datos
		$scope.actualizarDatos();
		$scope.actualizarCapital();
		//inicializo los arreglos
		$scope.nuevaDeuda = {};
		$scope.newCuotas = [];
		$scope.newCuota = {};
		//modelo de las cuotas
		var cuotas = [{
			id: 1,
			n_cuotas: 1,
			interes: 0
		},{
			id: 2,
			n_cuotas: 3,
			interes: 6
		},{
			id: 3,
			n_cuotas: 6,
			interes: 15
		},{
			id: 4,
			n_cuotas: 9,
			interes: 25
		}];

		$scope.cantidadCuotas = cuotas;
		$scope.nombre_cliente = "Cliente";
		$scope.nro_cuota = "Cuotas";
		var id_cliente ;
		var id_cuota;
		//obtengo los nombres de los clientes para ser mostrados en un dropdown
		$scope.agregarNombre = function(index){
			id_cliente=index;
			$scope.nombre_cliente = $scope.cliente[index-1].nombre_completo; 
		};
		//obtengo la cantidad de cuotas para ser mostrados en un dropdown
		$scope.agregarCuota = function(index){
			id_cuota=index;
			for (var i = 0; i < cuotas.length; i++) {
				if (index == $scope.cantidadCuotas[index-1].id) {
					$scope.nro_cuota = $scope.cantidadCuotas[index-1].n_cuotas; 
				};
			};
		};
		//metodo para generar un prestamo
		$scope.asignarPrestamo = function(){

		  	$scope.actualizarCapital();
		  	$scope.actualizarDeuda();

		  	$scope.nuevaDeuda.cliente = $scope.cliente[id_cliente-1];
		  	$scope.nuevaDeuda.cuota_id = $scope.cantidadCuotas[id_cuota-1].id;
		  	$scope.nuevaDeuda.cuotas = calcularCuotas();
		  	$scope.nuevaDeuda.total = totalDeuda($scope.nuevaDeuda.prestamo);

		  	$scope.deudas.push($scope.nuevaDeuda);
		  	$scope.capital_actual = $scope.capital_actual-$scope.nuevaDeuda.prestamo;

		  	localStorageService.set("storageDeuda",$scope.deudas);
		  	localStorageService.set("storageCapital",$scope.capital_actual);
		  	
		  	$scope.cambiarVista('vistaDeuda');
		};
		//se calcula el total de la deuda segun el numero de cuotas y su respectivo interés
		var totalDeuda = function(prestamo){
			return (prestamo * ($scope.cantidadCuotas[id_cuota-1].interes / 100)) + prestamo;
		}
		//se calculan las cuotas, segun el valor total de la deuda y la cantidad de cuotas
		var calcularCuotas = function(){
			for (var i = 0; i < $scope.cantidadCuotas[id_cuota-1].n_cuotas; i++) {
				$scope.newCuota.valor = totalDeuda($scope.nuevaDeuda.prestamo) / $scope.cantidadCuotas[id_cuota-1].n_cuotas;
				$scope.newCuota.pagado = false;
				$scope.newCuotas.push($scope.newCuota);
			};
			return $scope.newCuotas;
		};

	}])
})();