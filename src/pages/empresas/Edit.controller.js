sap.ui.define(
	[
		"MyAppNamespace/src/app/BaseController",		
		"MyAppNamespace/model/RestModel",
	],
	function (BaseController, RestModel) {
	"use strict";

	return BaseController.extend("MyAppNamespace.src.pages.empresas.Edit", {
		onInit : function(){
			console.log("controllet Inicializado");
		},		

	});

});
