/*
 * File: app/controller/homeController.js
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

Ext.define('MStore.controller.homeController', {
    extend: 'Ext.app.Controller',

    onPanelShow: function(component, eOpts) {
        Ext.getStore('musicStore').load();
    },

    onPanelBoxReady: function(component, width, height, eOpts) {
        Ext.getStore('musicStore').load();
    },

    onAddMusicClick: function(button, e, eOpts) {
        Ext.widget('window_music').show();
    },

    onCancelClick: function(button, e, eOpts) {
        button.up('window').close();
    },

    onSaveMusicClick: function(button, e, eOpts) {
        var win = button.up('window');
        var form = win.down('form');

        if(form.isValid()){
            form.submit({
                url:'api/music/music/addMusic.php',
                success:function(a, response){
                    console.log(response);
                    win.close();

                    Ext.getStore('musicStore').load();
                },
                failure:function(a, response){
                    console.log("gagal");
                    console.log(response);

                    Ext.MessageBox.show({
                        title:"Perhatian" ,
                        msg:response.result.message,
                        icon:Ext.MessageBox.INFO
                    });
                }
            });
        }
    },

    onGridpanelSelectionChange: function(model, selected, eOpts) {
        Ext.ComponentQuery.query('#btnEditMusic')[0].setDisabled(false);
        Ext.ComponentQuery.query('#btnDeleteMusic')[0].setDisabled(false);
    },

    onEditMusicClick: function(button, e, eOpts) {
        var win = Ext.widget('window_music');
        var grid = Ext.ComponentQuery.query('#tableMusic')[0];
        var selection = grid.getSelectionModel().getSelection()[0];

        win.down('form').loadRecord(selection);
        win.show();
    },

    onFilterMusic: function(field, e, eOpts) {
        if(e.keyCode == e.ENTER){
            var filterString  = Ext.ComponentQuery.query('#edtMusicFilter')[0].getValue();
            Ext.getStore('musicStore').load({
                params:{
                    filter : filterString
                }
            });

            Ext.ComponentQuery.query('#tableMusic')[0].getSelectionModel().clearSelections();
            Ext.ComponentQuery.query('#btnEditMusic')[0].setDisabled(false);
            Ext.ComponentQuery.query('#btnDeleteMusic')[0].setDisabled(false);
        }
    },

    onDeleteMusicClick: function(button, e, eOpts) {
        var hapus = function(btn){
            if(btn == 'yes'){
                var grid = Ext.ComponentQuery.query('#tableMusic')[0];
                var selection = grid.getSelectionModel().getSelection()[0];
                console.log(grid);
                console.log(selection);
                var idMusic = selection.get('id_music');

                if(selection){
                    Ext.Ajax.request({
                        url : 'api/music/music/deleteMusic.php',
                        params:{
                            id_music : idMusic
                        },
                        success:function(response, opts){
                            console.log(response);
                            var response = Ext.decode(response.responseText);
                            if(response.success){
                                Ext.getStore('musicStore').load();
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Peringatan' ,
                                    msg: response.message,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.INFO
                                });
                            }
                        }
                    });
                }
            }
        };
        Ext.MessageBox.show({
            title:'Peringatan hapus' ,
            msg: 'Apakah anda yakin ingin menghapus musik ini ?',
            buttons:Ext.MessageBox.YESNO,
            icon:Ext.MessageBox.QUESTION,
            fn:hapus
        });
    },

    init: function(application) {
        this.control({
            "#homePanel": {
                show: this.onPanelShow,
                boxready: this.onPanelBoxReady
            },
            "#btnAddMusic": {
                click: this.onAddMusicClick
            },
            "#btnCancel": {
                click: this.onCancelClick
            },
            "#btnSave": {
                click: this.onSaveMusicClick
            },
            "#tableMusic": {
                selectionchange: this.onGridpanelSelectionChange
            },
            "#btnEditMusic": {
                click: this.onEditMusicClick
            },
            "#edtMusicFilter": {
                specialkey: this.onFilterMusic
            },
            "#btnDeleteMusic": {
                click: this.onDeleteMusicClick
            }
        });
    }

});
