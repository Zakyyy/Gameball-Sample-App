var GbSdkFn = function () {
    this.settings = {
        containerId: 'gb_container_8247439015',
        repeatNotifications: false,
        mobile: false
    };
	/*
    this.widgetUrl = 'http://localhost:8080/gameball.widget.min.js';
    this.localeFile = 'http://localhost:8080';





    //prod config
    this.widgetUrl = 'https://assets.gameball.co/widget/gameball.widget.min.js';
    this.localeFile = '../';

    //uat urls
    this.widgetUrl = 'https://assets.gameball.co/uat/widget/gameball.widget.min.js';
    this.localeFile = '../';

    


   

    this.widgetUrl = 'https://assets.gameball.co/uat/widget/gameball.widget.min.js';
    this.localeFile = '../';

    //demo urls
    this.widgetUrl = 'https://assets.gameball.co/demo/widget/gameball.widget.min.js';
    this.localeFile = '../';

     

     this.widgetUrl = 'https://assets.gameball.co/uat/widget/gameball.widget.min.js';
     this.localeFile = '../';

 this.widgetUrl = 'https://assets.gameball.co/widget/js/gameball.widget.min.js';
	 this.widgetUrl = 'https://assets.gameball.co/uat/widget/js/gameball.widget.min.js';
	 this.widgetUrl = 'https://assets.gameball.co/demo/widget/js/gameball.widget.min.js';
     this.widgetUrl = '../dist/widget/js/gameball.widget.min.js';
	 
     */

     //local url
    
   
    
    
    
    
   
   

    
    //this.widgetUrl = 'https://assets.gameball.co/uat/widget/js/gameball.widget.min.js';
   
    //this.widgetUrl = '../dist/widget/js/gameball.widget.min.js';
    
    
    this.widgetUrl = './gameball.widget.min.js';

}
GbSdkFn.prototype = {
    init: function (settings) {
        this.settings = Object.assign(this.settings, settings);
        this.renderHtml();
    },
    renderHtml: function () {
        var body = document.getElementsByTagName("body")[0];
        var container = document.createElement('div');
        container.setAttribute("id", this.settings.containerId);
        body.appendChild(container);
    },
    require: function (scripts, callback) {
        this.loadCount = 0;
        this.totalRequired = scripts.length;
        this.callback = callback;

        for (var i = 0; i < scripts.length; i++) {
            this.writeScript(scripts[i]);
        }
    },
    loaded: function (evt) {
        this.loadCount++;

        if (this.loadCount == this.totalRequired && typeof this.callback == 'function')
            this.callback(evt);
    },
    writeScript: function (src) {
        var self = this;
        var userIdAttr = document.createAttribute("userId");
        var clientIdAttr = document.createAttribute("clientId");
        userIdAttr.value = JSON.stringify(this.settings.user);

        clientIdAttr.value = this.settings.clientId;
        var s = document.createElement('script');
        s.type = "text/javascript";
        s.async = false;
        s.src = src;
        s.id = this.settings.id;
        s.userId = this.settings.userId;
        s.setAttributeNode(userIdAttr);
        s.setAttributeNode(clientIdAttr);
        s.addEventListener('load', function (e) { self.loaded(e); }, false);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(s);

       
    },
    getSettings: function () {
        return this.settings;
    },
    setLocale: function (value) {

    },
    sendEvent: function (event) {

        return window.GbSdk.app.sendEvent(event);
 
    },
    mclick: function () {

        return window.GbSdk.app.mclick();
 
    },
    onInit: function (Fn) {
        this.settings.initCallback = Fn;
    }
}
var initialFn = (function (window, document) {
    window.GbSdk = new GbSdkFn();
    window.GbLoadInit();
    window.GbSdk.setLocale('en');

    window.GbSdk.require([GbSdk.widgetUrl],
        function (e) {

            //  console.log('All Scripts Loaded');
        });
})(window, document);