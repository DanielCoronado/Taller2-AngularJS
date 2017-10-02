'use strict';

(function (){
	angular.module('app')
	.controller('deudaController', ['$scope', 'localStorageService', function($scope, localStorageService){
		//actualizo los datos
		$scope.actualizarDeuda();
	    $scope.actualizarCapital();
	    //metodo que mantiene actualizado la deuda momentanea
		$scope.deudaActual = function (deuda) {
			var total =0;
			for (var i = 0; i < deuda.cuotas.length; i++){
				if (!deuda.cuotas[i].pagado) {
					total =total + deuda.cuotas[i].valor;
				};
			};
			return total;
		}
		//metodo que calcula la deuda total
		$scope.deudaTotal = function () {
			var total =0;
			for (var i = 0; i < $scope.deudas.length; i++) {
				total = total + $scope.deudaActual($scope.deudas[i]);
			};
		 return total;
		};
		//metodo para cancelar la cuota seleccionada
		$scope.pagarCuota = function (index) {
			$scope.nuevaCuota.cuotas[index].pagado = true;
			$scope.deudas[$scope.idClienteEstado] = $scope.nuevaCuota;
			$scope.capital_actual = $scope.capital_actual + $scope.nuevaCuota.cuotas[index].valor;
			localStorageService.set("storageDeuda",$scope.deudas);
			localStorageService.set("storageCapital",$scope.capital_actual);
			$scope.actualizarCapital();
		};
		//metodo que segun el estado de la cuota muestra si está cancelado o no
		$scope.estadoCuota = function (estado) {
			var respuesta = "Cuota Cancelada";
			if (!estado) {
				respuesta = "Sin Cancelar";
			};
			return respuesta;
		};

	}])
})();