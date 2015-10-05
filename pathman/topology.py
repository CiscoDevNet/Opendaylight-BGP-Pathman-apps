"""
    parseNodes Updated 20150726 by Niklas for OSPF support and ISIS/OSPF broadcast network/pseudo node support
    changed prints to logging, Niklas 20151005
    """
import urllib2
import requests
import tornado.web
import json
from pathman50 import html_style, name_check, get_url
from pathman_ini import *
import logging

class dataHandler(tornado.web.RequestHandler):
    def get(self):
        service = topologyservice()
        o_data = service.loadData("http://198.18.1.80:8181/restconf/operational/network-topology:network-topology/topology/example-linkstate-topology")
        try:
            nodes = service.parseNodes(o_data)
            links1 = service.parseLinks(o_data)
            links = service.dupLink(links1)
            result = {}
            result["nodes"] = nodes
	    logging.info('BGP Nodes: %s' % len(nodes))
            result['links'] = links
	    logging.info('BGP Links: %s' % len(links))
            self.write(json.dumps(result))
            self.set_header("content-type","application/json")
        except Exception as ex:
            logging.error("BGP error: %s" % ex)

class topologyservice(object):
    def __init__(self):
        logging.info("BGP init")

    def loadData(self,url):
	return get_url(url)

    def parseNodes(self, my_topology):
        logging.info("BGP build node topology")
        node_list = []
        try:
            for nodes in my_topology['topology'][0]['node']:
                node = {}
                prefix_array = []
                node_dict = html_style(nodes['node-id'])
                if 'prefix' in nodes['l3-unicast-igp-topology:igp-node-attributes'].keys():
                    for prefix in nodes['l3-unicast-igp-topology:igp-node-attributes']['prefix']:
                        prefix_array.append(prefix['prefix'])
                node_ports = []
                if 'router-id' in nodes['l3-unicast-igp-topology:igp-node-attributes'].keys():
                    if 'name' in nodes['l3-unicast-igp-topology:igp-node-attributes'].keys():
                        node['name'] = nodes['l3-unicast-igp-topology:igp-node-attributes']['name']
                    else:
                        success, name = name_check(nodes['l3-unicast-igp-topology:igp-node-attributes']['router-id'][0])
                        if success:
                            node['name'] = name
                        else:
                            node['name'] = node_dict['router']
                    node['loopback'] = nodes['l3-unicast-igp-topology:igp-node-attributes']['router-id'][0]
                else:
                    node['name'] = node_dict['router']
                    node['loopback'] = "0.0.0.0"
                node['prefix'] = prefix_array
                node['id'] = nodes['node-id']
                node_list.append(node)
            for node in node_list:
                node_dict =  html_style(node['id'])
                if node['name'] == node_dict['router'] and node['loopback'] == "0.0.0.0":
                    for owner in node_list:
                        owner_dict =  html_style(owner['id'])
                        if node['name'][:len(owner_dict['router'])] == owner_dict['router'] and node['name'] != owner['name']:
                            node['name'] = owner['name']+node_dict['router'][len(owner_dict['router']):]
        except Exception as ex:
            logging.error("BGP get node error2: %s" % ex)
        logging.info("BGP Nodelist Len: %s" %len(node_list))
        return node_list

    def parseLinks(self, my_topology):
            logging.info("BGP compose links")
            link_list = []
            try:
                for link in my_topology['topology'][0]['link']:
                    temp = {}
                    temp['source'] = link['source']['source-node']
                    temp['target'] = link['destination']['dest-node']
                    temp['metric'] = link['l3-unicast-igp-topology:igp-link-attributes']['metric']
                    link_list.append(temp)
            except Exception as ex:
                logging.error("BGP get node error3: %s" % ex)
            return link_list

    def dupLink(self, links):
        link_list=[]
        for i in range(len(links)-1):
            temp={}
            for j in range(i+1,len(links)):
                if links[i]['source'] == links[j]['target'] and links[i]['target'] == links[j]['source']:
                    temp["source"] = links[i]['source']
                    temp["target"] = links[i]['target']
                    temp["sourceTraffic"] = links[i]['metric']
                    temp["targetTraffic"] = links[j]['metric']
                    link_list.append(temp)
        return link_list

