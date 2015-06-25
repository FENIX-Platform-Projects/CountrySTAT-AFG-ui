/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'fx-menu/start',
    'fx-ana/start',
    'fx-cat-br/start',
    'host/config',
    'amplify'
], function ($, _, Menu, Analysis, Catalog, C) {

    'use strict';

    var s = {
        ANALYSIS_CONTAINER: '#fx-analysis-container',

        CATALOG_CONTAINER: '#fx-catalog-container',

        MODULES_STACK_CONTAINER: '#fx-modules-stack-container',

        OVERLAY: "#overlay",
        OVERLAY_CONTENT: '.overlay-content',
        OVERLAY_OPEN: '.open-overlay',
        OVERLAY_CLOSE: '.close-overlay'
    };

    function Host() {
        this.bindEventListener();
        this.initPage();
    }

    Host.prototype.initPage = function () {


        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    };

    Host.prototype.start = function () {
        this.initFenixComponent();
    };

    Host.prototype.initFenixComponent = function () {

         this.topmenu = new Menu({
             url: C.TOP_MENU,
             active: "analysis",
             container: '#sidebar-wrapper',
             template: 'fx-menu/templates/side.html'
         });

        this.analysis = new Analysis({
            container: document.querySelector(s.ANALYSIS_CONTAINER),
            listenToCatalog: {
                active: true,
                event: 'fx.widget.catalog.select'
            },
            stack: {
                active: true,
                container: document.querySelector(s.MODULES_STACK_CONTAINER)
            },
            session: {
                active: false
            }
        }).init();

        this.catalog = new Catalog({

            container: document.querySelector(s.CATALOG_CONTAINER),

            catalog: {
                BLANK_FILTER: C.CATALOG_BLANK_FILTER
            },

            results: {
                actions: {
                    SELECT_RESOURCE: {
                        event: 'select',
                        labels: {
                            EN: 'Select Resource'
                        }

                    }
                }
            }

        }).init();
    };

    Host.prototype.bindEventListener = function () {

        var self = this;

        $(s.OVERLAY_OPEN).on('click', _.bind(this.toggleOverly, this));

        $(s.OVERLAY).on('click', function (e){

            if( e.target !== this )
                return;

            self.closeOverly();

        });

        amplify.subscribe('fx.widget.catalog.select', _.bind(this.closeOverly, this));
    };


    Host.prototype.toggleOverly = function () {

        this.overlayStatus === 'opened' ? this.closeOverly(): this.openOverly();

    };

    Host.prototype.openOverly = function () {
        this.overlayStatus = 'opened';

        $(s.OVERLAY_OPEN).find('img').attr('src', 'css/icons/close-ico.svg');

        $(s.OVERLAY).addClass('show');

        $(window).trigger('resize');

    };

    Host.prototype.closeOverly = function () {

        this.overlayStatus = 'closed';

        $(s.OVERLAY_OPEN).find('img').attr('src', 'css/icons/catalog-ico.svg');

        $(s.OVERLAY).removeClass('show');

        $(window).trigger('resize');

    };

    return Host;

});
