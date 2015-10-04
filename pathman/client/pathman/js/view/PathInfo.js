(function (nx, global) {
    nx.define('pathman.view.PathInfo', nx.ui.Component, {
        view: {
            props: {
                'class': 'listBar panel panel-primary'
            },
            content: [
                {
                    tag: 'div',
                    props: {
                        'class': 'panel-heading'
                    },
                    content: [{
                        tag: 'span',
                        props: {
                            'class': 'pull-left'
                        },
                        content: {
                            tag: 'a',
                            props: {
                                'class': 'create-lsp-back',
                                style: 'display:none; color:#1BAAFD;',
                                href: '#'
                            },
                            content: 'Back',
                            events: {
                                click: function () {
                                    this.model().createPath()._backClicked();
                                }
                            }
                        }
                    },
                        {
                            tag: 'span',
                            props: {
                                'class': '{class}'
                            },
                            content: '{title}'
                        }
                    ]
                },
                {
                    name: 'listPath',
                    type: 'pathman.view.ListPath'
                },
                {
                    name: 'createPath',
                    type: 'pathman.view.CreatePath'
                }
            ]
        }
    });
}(nx, nx.global));
