/*global define*/
define([
    'config/config'
], function ( C ) {

    'use strict';

    var services = {

        SERVICE_BASE_ADDRESS: "http://fenixservices.fao.org/d3s/msd",
        DSD_EDITOR_CODELISTS: "config/submodules/DSDEditor/cstat_core_codelists.json",
        catalog : C.catalog
    };

    return services;
});