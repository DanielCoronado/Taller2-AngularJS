'use strict';

(function () {
	angular.module('app')
	.controller('firstController' , ['$scope' , 'localStorageService', function($scope, localStorageService){

	    $scope.index = -1;
		$scope.menu = 'app/views/vistaClientes.html';
	    $scope.cambiarVista = function (menu) {
	     	$scope.menu = 'app/views/'+menu+'.html';
	    };

	    //metodo que me lleva al formulario agregar
      	$scope.formularioAgregar = function (menu) {
      		$scope.index = -1;
      		$scope.menu = 'app/views/'+menu+'.html';
      		$scope.nombreCliente = "";
      		$scope.emailCliente = "";
      		$scope.telefonoCliente = "";
      	};

      	//metodo que me lleva al formulario agregar (en este caso para actualizar los datos), y obtiene los datos existentes del cliente.
		$scope.formularioEditar = function (menu,index) {
			$scope.clientes = localStorageService.get("datos");
			$scope.menu ='app/views/'+menu+'.html';
			$scope.nombreCliente = $scope.cliente[index].nombre_completo;
			$scope.emailCliente = $scope.cliente[index].email;
			$scope.telefonoCliente = $scope.cliente[index].telefono;
			$scope.index = index;
		};

		//metodo que me lleva a la vista de los pagos y permite mostrar las deudas del cliente
		$scope.formPagos= function (pagos,index) {
			$scope.idClienteEstado = index;
			if (localStorageService.get("storageDeuda")) {
				$scope.deudas = localStorageService.get("storageDeuda");
				$scope.nuevaCuota = $scope.deudas[index];
			}else{
				$scope.deudas = [];
			};
			$scope.cambiarVista(pagos);
		};


		//metodos para actualizar el capital, las deudas y los clientes dependiendo del valor guardado en Local Storage
		$scope.actualizarCapital = function (){
			if (localStorageService.get("storageCapital") ) {
				$scope.capital_actual = localStorageService.get("storageCapital");
			}else{
				$scope.capital_actual = 15000000;
			};
		};
		$scope.actualizarDeuda = function (){
			if (localStorageService.get("storageDeuda")) {
			  	$scope.deudas = localStorageService.get("storageDeuda");
			}else{
			  	$scope.deudas = [];
			}; 
		};
		$scope.actualizarDatos = function (){
			if (localStorageService.get("datos")) {
			  	$scope.cliente = localStorageService.get("datos");
			}else{
			  	$scope.cliente = [];
			};
		};


		//verifico si hay información almacenada em Local Storage
		if (localStorageService.get("datos")) {
		  	$scope.cliente = localStorageService.get("datos");
		}else{
		  	$scope.cliente = [];
		};

		if (localStorageService.get("storageCapital") ) {
		  	$scope.capital_actual = localStorageService.get("storageCapital");
		}else{
		  	$scope.capital_actual = 15000000;
		};    
		  
		if (localStorageService.get("storageDeuda")) {
		  	$scope.deudas = localStorageService.get("storageDeuda");
		}else{
		  	$scope.deudas = [];
		}; 

	}])
})();