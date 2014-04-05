define([
    'require',
    'dojo',
    'dojo/ready',
    'dijit/registry',
    'dojo/on',
    'dojo/dom'
], function (require, dojo, ready, registry, on, dom) {

    var app = {};

    ready(function () {
        dojo.connect(registry.byId('btnClickMe'), 'onClick', app.onButtonClick);
        dojo.connect(registry.byId('mbtnHelp'), 'onClick', app.onHelpButtonClick);
        on(dom.byId('mbtnAction1'), 'click', function(){ app.alert('Click Action 1'); });
        on(dom.byId('mbtnAction2'), 'click', function(){ app.alert('Click Action 2'); });
        on(dom.byId('mbtnAction3'), 'click', function(){ app.alert('Click Action 3'); });
        console.log('loaded!');
    });



    app.alert = function (message) {
        require(['dijit/Dialog'], function (Dialog) {
            var dialog = new Dialog({ title: 'Hello!', content: message });
            dialog.show();
        });
    };


    app.onButtonClick = function () {
        require(['dijit/Dialog'], function(Dialog) {
            var dialog = new Dialog({
                title:  "Some dialog",
                href:   appConfig.baseUrl + 'resources/view/dialog.html',
                style:  "width: 400px"
            });
            dialog.show();
        });
    };

    app.onHelpButtonClick = function () {
        app.alert('This is a Dojo MenuBar example!');
    }



    return app;
});
