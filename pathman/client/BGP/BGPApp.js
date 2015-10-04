/**
 * Created by bob on 14-2-27. change added my chmetz 14-9-30 on malformed url below
 */
(function (nx, global) {
    nx.define('odl.BGP.App', nx.ui.Application, {
        methods: {
            run: function () {
                var host = location.host;
                console.log (host);
                var protocol = location.protocol;
                var backendPath = '/pathman/topology';
//                var backendPort = '8020';
//                var url = protocol + '//' + window.parent.window.sessionStorage.odlUser + ":"+window.parent.window.sessionStorage.odlPass +"@"+ host + backendPath;
                var url = protocol + '//' + host + backendPath;
                console.log (url);
                odl.BGP.Config = new nx.Config({
//                    topoDataUrl:"./js/model/topoData.json",
//                    topoDataUrl:"http://10.140.92.77:8080/APP/webs/rest/topo",
//                    loginUrl:'/APP',
                    refreshTopoDataUrl:url,
                    topoDataUrl:url,
                    interfacesDataUrl:protocol+"//"+host+"/APP/webs/rest/topo/node/{nodeid}/interface",
                    updateInterfaceUrl:protocol+"//"+host+"/APP/webs/rest/topo/node/{nodeid}/interface",
                    proxyUrl:protocol+'//localhost:8008/proxy/',
                    socketUrl:'ws://'+host+':8080/APP/webs/sock/tc'
                });

                var view = new odl.BGP.views.BGPView();
                var vm = new odl.BGP.viewmodels.BGPViewModel();
                view.model(vm);
                view.attach(this);
                this.on('resize',function(){
                    console.log('resize...');
                    view.resolve('topo').adaptToContainer();
                });
            }
        }
    });
})(nx, window);