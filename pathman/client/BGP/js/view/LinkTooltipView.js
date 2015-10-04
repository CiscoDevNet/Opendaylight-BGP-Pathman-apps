(function (nx) {
    nx.Binding.converters.emptyDesc = {
        convert: function (value) {
            return value || '[No description]';
        }
    };
    nx.define("odl.BGP.LinkTooltipView", nx.ui.Component, {
        properties: {
            link: {
                set: function (inValue) {
                    console.log(inValue);
                    this._link = inValue;
                }
            }
        },
        view: {
            props: {
                'class': 'bgp-tooltip link-tooltip'
//                model:'{#model.nodeTooltipModel}'
            },
            content: [
                {
                    tag: 'h5',
                    props: {
                        style: {
                            'margin-top':'0'
                        }
                    },
                    content: "Traffic"
                },{
                    tag:'hr',
                    props:{
                        style:{
                            margin:'-5px 0px 10px 0px',
                            opacity:'.6'
                        }
                    }
                },
                {
                    tag: 'table',
                    props: {
                        style: {
                            'font-size': '12px'
                        }
                    },
                    content: [
                        {
                            tag: 'colgroup',
                            content: [
                                {
                                    tag: 'col',
                                    props: {
                                        style: {
                                            width: '100px'
                                        }
                                    }
                                },
                                {
                                    tag: 'col',
                                    props: {
                                        style: {
                                            width: '250px'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            tag: 'tbody',
                            content: [
                                {
                                    tag: 'tr',
                                    content: [
                                        {
                                            tag: 'td',
                                            props: {
                                                style: {
                                                    'white-space': 'nowrap'
                                                }
                                            },
                                            content: [
                                                {
                                                    tag: 'span',
                                                    content: 'Metrics'
                                                },
                                                {
                                                    tag: 'span',
                                                    props:{
                                                        style:{
                                                            margin:'0px 3px'
                                                        }
                                                    },
                                                    content: '-->'
                                                },
                                                {
                                                    tag: 'span',
                                                    content: '{#link.model.metric}'
                                                },{
                                                    tag:'span',
                                                    content:':'
                                                }
                                            ]
                                        },
                                        {
                                            tag: 'td',
                                            content: {
                                                props: {
                                                    style: 'margin-left:5px'
                                                },
                                                content: '{#link.model.sourceTraffic}'
                                            }
                                        }
                                    ]
                                }
                                /*{
                                    tag: 'tr',
                                    content: [
                                        {
                                            tag: 'td',
                                            props: {
                                                style: {
//                                                    'vertical-align': 'top'
                                                    'white-space': 'nowrap'
                                                }
                                            },
                                            content: [
                                                {
                                                    tag: 'td',
                                                    props: {
                                                        style: {
                                                            'white-space': 'nowrap'
                                                        }
                                                    },
                                                    content: [
                                                        {
                                                            tag: 'span',
                                                            content: '{#link.model.target.id}'
                                                        },
                                                        {
                                                            tag: 'span',
                                                            props:{
                                                                style:{
                                                                    margin:'0px 3px'
                                                                }
                                                            },
                                                            content: '-->'
                                                        },
                                                        {
                                                            tag: 'span',
                                                            content: '{#link.model.source.id}'
                                                        },{
                                                            tag:'span',
                                                            content:':'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            tag: 'td',
                                            content: '{#link.model.targetTraffic}'
                                        }
                                    ]
                                }*/
                            ]
                        }
                    ]
                }
            ]
        },
        methods: {
            onAttach: function (parent, index) {
                this.inherited(parent, index);
//                this.model()._loadInterfaces(this.node());
            }
        }
    });
})(nx);