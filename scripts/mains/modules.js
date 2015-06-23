/*global require*/
// relative or absolute path of Components' main.js
require([
    '../../submodules/fenix-ui-common/js/Compiler',
    '../../submodules/fenix-ui-menu/js/paths'
], function (Compiler, Menu) {

    'use strict';

    var menuConfig = Menu;
    menuConfig.baseUrl = '../../submodules/fenix-ui-menu/js';

    Compiler.resolve([menuConfig],
        {
            placeholders: { "FENIX_CDN": "//fenixapps.fao.org/repository" },
            config: {

                locale: 'en',

                // Specify the paths of vendor libraries
                paths: {
                    host: '../modules/host',
                    underscore: "{FENIX_CDN}/js/underscore/1.7.0/underscore.min",
                    handlebars: "{FENIX_CDN}/js/handlebars/2.0.0/handlebars",
                    amplify: '{FENIX_CDN}/js/amplify/1.1.2/amplify.min',
                    rsvp: '{FENIX_CDN}/js/rsvp/3.0.17/rsvp',

                    'host/config' : '../../config/config',

                    'fx-submodules/config/baseConfig': '../../config/submodules/config_base'
                },

                // Underscore and Backbone are not AMD-capable per default,
                // so we need to use the AMD wrapping of RequireJS
                shim: {
                    underscore: {
                        exports: '_'
                    },
                    handlebars: {
                        exports: 'Handlebars'
                    },
                    amplify: {
                        deps: ['jquery'],
                        exports: 'amplifyjs'
                    }
                }
                // For easier development, disable browser caching
                // Of course, this should be removed in a production environment
                //, urlArgs: 'bust=' +  (new Date()).getTime()
            }
        });

    // Bootstrap the application
    require([
        'host',
        'domReady!'
    ], function (Host) {

        var host = new Host();
        host.initFenixComponent();

    });
});