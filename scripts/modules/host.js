/*global define*/
define([
    'fx-menu/start',
    'host/config'
], function (TopMenu, C) {

    'use strict';

    function Host() {
    }

    Host.prototype.initFenixComponent = function () {

        this.topMenu = new TopMenu({
            url: C.TOP_MENU
        });

    };

    return Host;

});