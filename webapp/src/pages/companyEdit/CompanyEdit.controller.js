sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.companyEdit.CompanyEdit", {
			onInit : function(){
				console.log("controllet Inicializado");
			},		

		});
	}
);
