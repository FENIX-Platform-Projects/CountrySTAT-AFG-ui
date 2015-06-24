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
        $(s.OVERLAY_CONTENT).hide();
        $(s.OVERLAY).hide();

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

        $(s.OVERLAY_OPEN).on('click', _.bind(this.openOverly, this));
        $(s.OVERLAY_CLOSE).on('click', _.bind(this.closeOverly, this));

        amplify.subscribe('fx.widget.catalog.select', _.bind(this.closeOverly, this));
    };

    Host.prototype.openOverly = function () {

        //$("#wrapper").addClass("toggled");

        $(s.OVERLAY).show();

        $(s.OVERLAY).css({
            height: '100%',
            width: '100%'
        });

        $(s.OVERLAY_CONTENT).fadeIn('fast', function (){
            $(window).trigger('resize');
        });

    };

    Host.prototype.closeOverly = function () {

        $(s.OVERLAY_CONTENT).fadeOut("fast", function () {

            $(s.OVERLAY_CONTENT).hide();

            $(s.OVERLAY).hide();
        });
    };

    return Host;

});
