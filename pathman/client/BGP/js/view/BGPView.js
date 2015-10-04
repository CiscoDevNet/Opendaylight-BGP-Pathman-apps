/**
 * Created by bob on 14-2-27.
 */
(function (nx) {
    nx.define("odl.BGP.views.BGPView", nx.ui.Component, {
        view: {
            props: {
                'class': 'bgp-main',
                states: {
                    enter: {
                        duration: 1000,
                        opacity: 0
                    }
                }
            },
            content: [
                {
                    name: 'terminalContainer',
                    props: {
                        'class': 'terminal-container',
                        template: {
                            type: 'odl.TerminalWindow',
                            props: {
                                maximized: "{value.maximized,direction=<>}",
                                opened: "{value.opened}",
                                address: "{value.address}",
                                port: "{value.port}",
                                title: '{value.title}',
                                service: '{value.service}'
                            },
                            events: {
                                close: "{value.onClose}"
                            }
                        },
                        items: "{#model.terminalWindows}"
                    }
                },
                {
                    props: {
                        "class": 'topology-container'
                    },
                    content: {
                        name: 'topo',
                        type: 'osc.topology.comp',
                        props: {
                            adaptive: true,
                            showIcon: true,
                            identityKey: 'id',
                            theme: 'blue',
                            nodeConfig: {
                                label: 'model.name',
                                iconType: 'router'
                            },
                            autoLayout: true,
                            data: "{#model.topoData}",
                            //layoutType: 'USMap',
                            /*layoutConfig: {
                                longitude: 'model.longitude',
                                latitude: 'model.latitude'
                            },*/
                            dataProcessor: 'force',
                            tooltipManagerConfig: {
                                linkTooltipContentClass: 'odl.BGP.LinkTooltipView',
                                nodeTooltipContentClass: 'odl.BGP.TooltipView'
                            },
                            style:'background:#F5F5F5'
                        },
                        events: {
                        'ready':'{ready}',
                        'topologyGenerated': '{generated}'
                        }
                    }
                }
            ]
        }
    });
    nx.define("osc.topology.comp",nx.graphic.Topology, {
        view: function(view){
                view.content.push({
                    name: "loadingImg",
                    tag: "img",
                    props:{
                        src: "../assets/image/spinner_32_32.gif",
                        style: {
                            "position": "absolute",
                            "left": "50%",
                            "top": "50%",
                            //"width":"100%",
                            //"height": "100%",
                            "display": "none"
                        }
                    }
                });
                return view;
            },
        methods:{
            showLoading: function(){
                this.view("loadingImg").dom().setStyle("display", "block");
            },
            hideLoading: function(){
                this.view("loadingImg").dom().setStyle("display", "none");
            }
        }
    });

})(nx)
