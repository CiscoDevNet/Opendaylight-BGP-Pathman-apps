(function (nx, global) {
    nx.define("odl.BGP.viewmodels.BGPViewModel", nx.data.ObservableObject, {
        properties: {
            topoData: {},
            terminalWindows: {
                get: function () {
                    return this._terminalWindows || {};
                }
            },
            terminalService: {
                value: null
            }
        },
        methods: {
            init: function () {
                this.inherited();

                var self = this;
                //setup topology
                var url = odl.BGP.Config.get('topoDataUrl');
                this._topoClient = new nx.ServiceClient();
                var commonBack = function (data) {
//                    var msg = '\nhttp://{host}:8080/restconf/operational/network-topology:network-topology/topology/example-linkstate-topology/\n\
//http://{host}:8080/restconf/operational/bgp-rib:bgp-rib/rib/example-bgp-rib/loc-rib/tables/bgp-types:ipv4-address-family/bgp-types:unicast-subsequent-address-family/ipv4-routes\n\
//http://{host}:8080/restconf/config/opendaylight-inventory:nodes/\n'.replace(/\{host\}/g, location.hostname);
//                    if (data && data.nodes) {
//                        nx.each(data.nodes, function (node) {
//                            msg += 'http://{host}:8080/restconf/config/opendaylight-inventory:nodes/node/{nodeName}/yang-ext:mount/Cisco-IOS-XR-ifmgr-cfg:interface-configurations\n'
//                                .replace(/\{host\}/g, location.hostname).replace(/\{nodeName\}/g, node.name);
//                        });
//                    }
//                    console.log('Get topology used apis: ' + msg);
                }
                this._topoClient.on('error', function (sender, resp) {
                    if (resp.status == 401) {
                        global.top.location.href = odl.BGP.Config.get('loginUrl');
                        return false;
                    }
                });
                var initTopoData = null;
                initTopoData = function (refresh) {
                    url = refresh ? odl.BGP.Config.get('refreshTopoDataUrl'): url;
                    self._topoClient.GET(url,{},function (data) {
                        self.topoData(data);
//                        commonBack.call(self, data);
                    }, function () {
                        !refresh && initTopoData(true);
                        console.log('error', arguments);
//                        commonBack.call(self);
                    });
                }
                initTopoData();

                this.terminalService(new odl.TerminalService(odl.BGP.Config.get('socketUrl')));
                this.terminalWindows(new nx.data.ObservableDictionary());
            },
            ready: function (sender) {
                this.inherited(sender);
                sender.showLoading();
//                this._parent.showSideBar();
            },
            generated: function (sender) {
                 sender.hideLoading();
                this.inherited(sender);
//                this._parent.showSideBar();
            },
            _openTerminal: function (sender, evt) {
                var model = sender.owner().node().model();
                var address = model.get('ipaddress');
//                var port = model.port;
                var name = model.get('name');
                var terminalWindows = this.terminalWindows();
                var terminalModel = terminalWindows.getItem(name);
                var terminalService = this.terminalService();
                if (!terminalModel) {
                    var terminalModel = new nx.data.ObservableObject({
                        address: address,
                        service: terminalService,
                        title: name
                    });
                    nx.extend(terminalModel, {
                        onClose: function () {
                            terminalWindows.removeItem(name);
                        }
                    })
                    terminalWindows.setItem(name, terminalModel);
                }

                terminalModel.set('opened', true);
                terminalModel.set('maximized', true);
            },
            _showTooltip: function (sender) {
                this.nodeTooltipModel(this._getTooltipModel(sender));
            },
            _getTooltipModel: function (node) {
                var name = "192.168.100.2";
                var tooltipModel = new nx.data.ObservableObject({
                    id: name,
                    label: name,
                    ipAddress: name,
                    prefix: ['192.168.114.0/23', '192.168.116.0/23'],
                    interfaces: [
                        {
                            "name": "Loopback0",
                            "name_e": "Loopback0",
                            "description": "cccc1",
                            "description_e": "cccc1",
                            "adding": false,
                            "editing": false,
                            "busy": false
                        },
                        {
                            "name": "Loopback1",
                            "name_e": "Loopback1",
                            "description": "",
                            "description_e": "",
                            "adding": false,
                            "editing": false,
                            "busy": false
                        }
                    ],
                    loading: false
                });

                return tooltipModel;
            },
            _addInterface: function (sender, event) {
                var newIntel = new nx.data.ObservableObject({
                    name: '',
                    name_e: '',
                    description: '',
                    description_e: '',
                    adding: true,
                    editing: true,
                    busy: false,
                    active: 'act'
                });
                var interfaces = sender.owner().node().model().get('interfaces');
                interfaces.insert(newIntel, 0);

                sender.owner().resolve('interface-list').resolve('@root').$dom.scrollTop = 0;
            },
            _editInterface: function (sender, event) {
                sender.model().set('editing', true);
            },
            _removeInterface: function (sender, event) {
                sender.owner().model().get('interfaces').remove(sender.model());
            },
            _saveInterface: function (sender, event) {
                var self = this;
                var model = sender.model();
                model.set('busy', true);
                var nodeModel = sender.owner().node().model();
                var nodeName = nodeModel.get('name');

//                var commonBack = function () {
//                    console.log('update/add interface used api: http://{host}:8080/restconf/config/opendaylight-inventory:nodes/'.replace(/\{host\}/g, location.hostname));
//                }
                var callback = function (data) {
                    if (!data.ret_code) {
                        errorCallback();
                        return;
                    }
                    model.set('name', data.result['interface-name']);
                    model.set('description', data.result.description);
                    model.set('busy', false);
                    model.set('editing', false);
                    if (model.get('adding')) {
                        model.set('adding', false);
                    }
//                    commonBack.call(this);
                }

                var errorCallback = function () {
                    console.log('save interface error!', arguments);
                    model.set('busy', false);
                    self._cancelInterface(sender);
//                    commonBack.call(this);
                }

                var url = odl.BGP.Config.get('updateInterfaceUrl');
                url = url.replace('{nodeid}', nodeName);
                var data = {
                    id: nodeName,
                    active: model.get('active'),
                    'interface-name': model.get('name_e'),
                    description: model.get('description_e')
                }
                this._topoClient.send({
                    data: JSON.stringify(data),
                    url: url,
                    success: callback,
                    error: errorCallback,
                    contentType: 'application/json',
                    type: 'POST',
                    dataType: 'json'
                });
            },
            _cancelInterface: function (sender, event) {
                var model = sender.model();
                if (model.get('adding')) {
                    sender.owner().node().model().get('interfaces').remove(model);
                } else {
                    model.set('name_e', model.get('name'));
                    model.set('description_e', model.get('description'));
                }
                sender.model().set('editing', false);
            },
            _loadInterfaces: function (node) {
                var nodeModel = node.model();
                nodeModel.set('loading', true);
                var self = this;
                var url = odl.BGP.Config.get('interfacesDataUrl');
                url = url.replace('{nodeid}', nodeModel.get('name'));
                this._topoClient.GET(url, null,
                    function (data) {
                        nodeModel.set('interfaces', self._makeInterfacesObservable(data));
                        nodeModel.set('loading', false);
                    }, function () {
                        nodeModel.set('loading', false);
                    });
            },
            _makeInterfacesObservable: function (interfaces) {
                var obsCols = new nx.data.ObservableCollection();
                nx.each(interfaces, function (inf) {
                    var obsIntel = new nx.data.ObservableObject(inf);
                    obsIntel.sets({
                        description_e: inf.description,
                        name_e: inf.name,
                        editing: false,
                        adding: false,
                        busy: false
                    });
                    obsCols.add(obsIntel);
                });
                return obsCols;
            }
        }
    });
})(nx, nx.global);