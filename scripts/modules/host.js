/*global define*/
define([
    'fx-menu/start',
    'host/config'
], function (TopMenu, C) {

    'use strict';

    function Host() {
    }

    Host.prototype.initFenixComponent = function () {

        this.initPageStructure();


        this.topMenu = new TopMenu({
            url: C.TOP_MENU,
            active: 'modules',
            container: '#sidebar-wrapper',
            template: 'fx-menu/templates/side.html'
        });

    };

    Host.prototype.initPageStructure = function () {


        <!-- Menu Toggle Script -->

        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });

    };

    return Host;

});