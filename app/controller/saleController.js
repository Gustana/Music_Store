/*
 * File: app/controller/saleController.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MStore.controller.saleController', {
    extend: 'Ext.app.Controller',

    onPanelShow: function(component, eOpts) {
        Ext.getStore('saleStore').load();
    },

    onPanelBoxReady: function(component, width, height, eOpts) {
        Ext.getStore('saleStore').load();
    },

    onFilterChange: function(field, e, eOpts) {

        if(e.keyCode == e.ENTER){
            var filterString = Ext.ComponentQuery.query('#edtSaleFilter')[0].getValue();
            console.log(filterString);
            Ext.getStore('saleStore').load({
                params:{
                    filter : filterString
                }
            });

            Ext.ComponentQuery.query('#tableSale')[0].getSelectionModel().clearSelections();
        }
    },

    onCancelRatingClick: function(button, e, eOpts) {
        button.up('window').close();
    },

    init: function(application) {
        this.control({
            "#salePanel": {
                show: this.onPanelShow,
                boxready: this.onPanelBoxReady
            },
            "#edtSaleFilter": {
                specialkey: this.onFilterChange
            },
            "#btnCancelRating": {
                click: this.onCancelRatingClick
            }
        });
    }

});
