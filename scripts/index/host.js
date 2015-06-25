/*global define*/
define([
    'jquery',
    'fx-menu/start',
    'host/config',
    'progressbar'
], function ($, TopMenu, C, ProgressBar) {

    'use strict';

    var s = {
        PERCENTAGE_ONE : '#percentage-one',
        PERCENTAGE_TWO : '#percentage-two'
    };

    function Host() {
    }

    Host.prototype.initFenixComponent = function () {

        this.initPageStructure();

        this.topMenu = new TopMenu({
            url: C.TOP_MENU,
            active: 'home',
            container: '#sidebar-wrapper',
            template: 'fx-menu/templates/side.html'
        });

    };

    Host.prototype.initPageStructure = function () {

        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });

        this.initPercentageAnimations();

    };

    Host.prototype.initPercentageAnimations = function () {

        var c ={
            color: '#f0e352',
            strokeWidth: 10,
            trailWidth: 9,
            trailColor: "rgba(255,255,255,0.2)",
            duration: 1500,
            easing : 'easeOut',
            text: {
                value: '0'
            },
            step: function(state, bar) {
                bar.setText((bar.value() * 100).toFixed(0));
            }
        };

        var circle = new ProgressBar.Circle(s.PERCENTAGE_ONE, c);

        circle.animate(0.58);

        var circle_two = new ProgressBar.Circle(s.PERCENTAGE_TWO, c);

        circle_two.animate(0.42);

    };

    return Host;

});