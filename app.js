/*
 * File: app.js
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

// @require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    models: [
        'musicModel',
        'saleModel',
        'ratingModel'
    ],
    stores: [
        'musicStore',
        'genreStore',
        'musicChartStore',
        'musicChartSale',
        'saleStore',
        'musicChartAge',
        'ratingStore'
    ],
    views: [
        'MainView',
        'window_music',
        'window_purchase',
        'window_rating'
    ],
    controllers: [
        'Navigation',
        'homeController',
        'chartController',
        'storeController',
        'saleController',
        'ratingController'
    ],
    name: 'MStore',

    launch: function() {
        Ext.create('MStore.view.MainView');
    }

});
