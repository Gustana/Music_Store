/*
 * File: app/controller/storeController.js
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

Ext.define('MStore.controller.storeController', {
    extend: 'Ext.app.Controller',

    onPanelShow: function(component, eOpts) {
        Ext.getStore('musicStore').load();
    },

    onPanelBoxReady: function(component, width, height, eOpts) {
        Ext.getStore('musicStore').load();
    },

    onGridpanelSelectionChange: function(model, selected, eOpts) {
        Ext.ComponentQuery.query('#btnBuyMusic')[0].setDisabled();
        Ext.ComponentQuery.query('#btnAddRating')[0].setDisabled();
    },

    onBuyMusicClick: function(button, e, eOpts) {
        var win = Ext.widget('window_purchase');
        var grid = Ext.ComponentQuery.query('#tableStore')[0];
        var selection = grid.getSelectionModel().getSelection()[0];

        console.log(selection);

        win.down('form').loadRecord(selection);
        win.show();
    },

    onCancelBuyClick: function(button, e, eOpts) {
        button.up('window').close();
    },

    onPurchaseClick: function(button, e, eOpts) {
        var win = button.up('window');
        var form = win.down('form');

        var totalHarga = Ext.ComponentQuery.query('#totalPrice')[0].getValue();
        var totalBayar = Ext.ComponentQuery.query('#totalPurchase')[0].getValue();

        if(totalBayar >= totalHarga){
            if(form.isValid()){
                var kembalian = totalBayar - totalHarga;
                form.submit({
                    url : 'api/music/music/purchaseMusic.php',
                    success: function(a, response){
                        win.close();

                        Ext.getStore('musicStore').load();

                        Ext.MessageBox.show({
                            title:"Kembalian" ,
                            msg: kembalian,
                            icon: Ext.MessageBox.INFO
                        });
                    },
                    failure:function(a, response){
                        Ext.MessageBox.show({
                            title:"Perhatian" ,
                            msg: response.result.message,
                            icon: Ext.MessageBox.INFO
                        });
                    }
                });
            }
        }else{
            Ext.ComponentQuery.query('#negative_balance')[0].setVisible(true);
        }
    },

    onAmountPurchaseChange: function(field, newValue, oldValue, eOpts) {
        var win = field.up('window');
        var form = win.down('form');

        var harga = Ext.ComponentQuery.query('#music_price')[0].getValue();
        var total = harga * newValue;
        Ext.ComponentQuery.query('#totalPrice')[0].setValue(total);
        Ext.ComponentQuery.query('#totalPriceShow')[0].setValue(total);
    },

    onStoreFilter: function(field, e, eOpts) {
        if(e.keyCode == e.ENTER){
            var filterString = Ext.ComponentQuery.query('#edtStoreFilter')[0].getValue();
            console.log(filterString);
            Ext.getStore('musicStore').load({
                params:{
                    filter : filterString
                }
            });

            Ext.ComponentQuery.query('#tableStore')[0].getSelectionModel().clearSelections();
        }
    },

    onAddRatingClick: function(button, e, eOpts) {
        var win = Ext.widget('window_rating');
        var grid = Ext.ComponentQuery.query('#tableStore')[0];

        console.log(grid);

        var selection = grid.getSelectionModel().getSelection()[0];

        win.down('form').loadRecord(selection);
        win.show();
    },

    onSaveRatingClick: function(button, e, eOpts) {
        var win = button.up('window');
        var form = win.down('form');

        if(form.isValid()){
            form.submit({
                url: 'api/music/rating/addRating.php',
                success: function(a, response){
                    win.close();
                    Ext.MessageBox.show({
                        title: "Perhatian",
                        msg : "Data berhasil masuk",
                        icon : Ext.MessageBox.INFO
                    });
                },
                failure: function(a, response){
                    Ext.MessageBox.show({
                        title: "Perhatian",
                        msg : response.result.message,
                        icon : Ext.MessageBox.INFO
                    });
                }
            });
        }
    },

    init: function(application) {
        this.control({
            "#storePanel": {
                show: this.onPanelShow,
                boxready: this.onPanelBoxReady
            },
            "#tableStore": {
                selectionchange: this.onGridpanelSelectionChange
            },
            "#btnBuyMusic": {
                click: this.onBuyMusicClick
            },
            "#btnCancelPurchase": {
                click: this.onCancelBuyClick
            },
            "#btnPurchase": {
                click: this.onPurchaseClick
            },
            "#amountPurchase": {
                change: this.onAmountPurchaseChange
            },
            "#edtStoreFilter": {
                specialkey: this.onStoreFilter
            },
            "#btnAddRating": {
                click: this.onAddRatingClick
            },
            "#btnSaveRating": {
                click: this.onSaveRatingClick
            }
        });
    }

});