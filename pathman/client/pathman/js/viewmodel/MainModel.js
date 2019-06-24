(function (nx, global) {
    nx.define('pathman.viewmodel.Main', nx.data.ObservableObject, {
        properties: {
            topo: null,
            pathTopo: null,
            pathInfo: null,
            statusBar: null,
            terminalWindows: {
                get: function () {
                    return this._terminalWindows || {};
                }
            },
            terminalService: {
                value: null
            },
            rightpanelClass: "rightbar-item",
            rightpanelColor: null,
            terminalContainerPos: "margin-right:60px"
        },
        methods: {
            init: function (mainView) {
                this.inherited();

                this.topo(mainView.view('topo'));
                this.pathTopo(new pathman.viewmodel.PathTopology(this, this.topo()));
                this.pathInfo(new pathman.viewmodel.PathInfo(this, mainView.view('pathInfo')));
                this.statusBar(new pathman.viewmodel.StatusBar(this, mainView.view('statusBar')));
                this.terminalService(new odl.TerminalService(odl.Config.get('socketUrl')));
                this.terminalWindows(new nx.data.ObservableDictionary());


                var self = this;
                nx.backend.topo(function (data) {
                    nx.each(data.nodes, function (node) {
                        if(mapData[node.name] != null) {
                            node.latitude = mapData[node.name].latitude;
                            node.longitude = mapData[node.name].longitude;
                        }
                        else {
                            node.latitude = 21.0;
                            node.longitude = -157.0;
                        }
                        });
                    self.topo().data(data);
                    self.pathInfo().createPath().endpointSelector().setNodes(data.nodes);
                });
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
            showTopBar: function () {
                $('div.SRbar').addClass('expandSRbar');
            },
            hideTopBar: function () {
                $('div.SRbar').removeClass('expandSRbar');
            },
            isTopBarVisible: function () {
                return $('div.SRbar').hasClass('expandSRbar');
            },
            showSideBar: function () {
//                console.log('showing list bar');
                this.terminalContainerPos("margin-right:30%");
                $('div.listBar').addClass('expandListBar');
                $('div.ui-main').addClass('contractMain');
                setTimeout(this.topo().adaptToContainer.bind(this.topo()), 100);

            },
            hideSideBar: function () {
//                console.log('hiding list bar');

                $('div.listBar').removeClass('expandListBar');
                $('div.ui-main').removeClass('contractMain');

                setTimeout(this.topo().adaptToContainer.bind(this.topo()), 100);
                this.terminalContainerPos("margin-right:60px");

            },
            isSideBarVisible: function () {
                return $('div.listBar').hasClass('expandListBar');
            },
            openRightPanel: function () {
                //var self = this;
                if (this.rightpanelClass().indexOf('active') >= 0) {
                    this.hideSideBar();
                    var self = this;
                    setTimeout(function () {
                        self.rightpanelClass("rightbar-item");
                        self.rightpanelColor("");
                    }, 300)
                }
                else {
                    this.rightpanelClass("rightbar-item active");
                    
                    //setTimeout(function () {
                    this.showSideBar();
                    this.pathInfo().listPath().load();
                    //}, 50)
                    this.rightpanelColor("background-color:#000;border-left: 1px solid transparent;border-left-color: #6c6c6c;");

                }



            }
        }
    });
}(nx, nx.global));
