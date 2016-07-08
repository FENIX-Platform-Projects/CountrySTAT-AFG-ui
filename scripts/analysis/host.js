/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'fx-menu/start',
    'fx-analysis/start',
    'host/config',
    'fx-common/AuthManager',
    'amplify'
], function ($, _, TopMenu, Analysis, C, AuthManager) {

    'use strict';

    var s = {
        ANALYSIS_CONTAINER: '#fx-analysis-container',
        MENU_TOGGLE : "#menu-toggle",
        LATERAL_WRAPPER : '#sidebar-wrapper',
        PAGE_WRAPPER : "#wrapper"
    };

    function Host() {

        this.overlayStatus = 'opened';

        this.bindEventListener();

        this.initComponent();
    }

    Host.prototype.bindEventListener = function () {

        var self = this;

        $(s.MENU_TOGGLE).click(function (e) {
            e.preventDefault();

            self.toggleLateralMenu();

        });
    };

    Host.prototype.initComponent = function () {

        var self = this,
            menuConf = {
                url: C.TOP_MENU,
                active: "analysis",
                container: s.LATERAL_WRAPPER,
                template: 'fx-menu/templates/side.html',
                lang: "EN"
            };

        var menuConfAuth = _.extend({}, menuConf, {
            hiddens: ['login']
        }), menuConfPub = _.extend({}, menuConf, {
            hiddens: ['createdataset', 'logout']
        });

        this.authManager = new AuthManager({
            onLogin: function () {
                self.topMenu.refresh(menuConfAuth);
            },
            onLogout: function () {
                self.topMenu.refresh(menuConfPub);
            },
            modal: {
                keyboard: true,
                backdrop: false
            }
        });

        this.topMenu = new TopMenu(this.authManager.isLogged() ? menuConfAuth : menuConfPub);

        var analysis = new Analysis({
            cache: C.cache,
            el: s.ANALYSIS_CONTAINER,
            environment: C.environment,
            catalog: C.catalog,
        })
            .on("catalog.show", function () {
                self.closeLateralMenu();
            });
    };

    Host.prototype.toggleLateralMenu = function () {

        this.overlayStatus === 'opened' ? this.closeLateralMenu() : this.openLateralMenu();
    };

    Host.prototype.openLateralMenu = function () {
        this.overlayStatus = 'opened';

        $(s.PAGE_WRAPPER).removeClass("toggled");
    };

    Host.prototype.closeLateralMenu = function () {
        this.overlayStatus = 'closed';

        $(s.PAGE_WRAPPER).addClass("toggled");
    };

    return Host;

});
