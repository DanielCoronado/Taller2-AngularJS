'use strict';

(function (){
	angular.module('app')
	.controller('agregarController', ['$scope', 'localStorageService', function($scope, localStorageService){

		//se inicializa arreglo para almacenar al nuevo cliente
		$scope.nuevoCliente = {};
		
		$scope.agregarCliente = function(cliente){
			//actualizo los datos
			$scope.actualizarDatos();
			//dependiendo de la id se agregará un nuevo cliente o se actualizará
			if($scope.index == -1){
				$scope.cliente.push(cliente);
			}else{
				if (typeof(cliente.nombre_completo) !== "undefined") {
					$scope.cliente[$scope.index].nombre_completo = cliente.nombre_completo;	
				}
				if (typeof(cliente.email) !== "undefined") {
					$scope.cliente[$scope.index].email = cliente.email;
				}
				if (typeof(cliente.telefono) !== "undefined") {
					$scope.cliente[$scope.index].telefono = cliente.telefono;
				} 
			}
			localStorageService.set("datos",$scope.cliente);
			$scope.cambiarVista("vistaClientes");
		};

		//metodo para eliminar a un cliente
		$scope.eliminarCliente = function (index) {
			$scope.cliente.splice(index, 1);
			localStorageService.set("datos",$scope.cliente);
		};

	}])
})();