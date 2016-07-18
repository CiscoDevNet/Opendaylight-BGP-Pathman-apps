# Running your OpenDaylight APPs towards a Topology

Updated: 20160718

The BGP and PCEP (Pathman) apps assume that you can connect to an OpenDaylight (ODL) Controller.

You will need the following information:

1. IP address and Port of controller
2. Authorization in the form of username and password

You topology would also need to be configured to interact with the ODL controller; BGP peering with BGP-LS speaker (i.e. one of the routers configured with BGP-LS) and PCEP peering enabled in all routers.

To simplify this step, we have implement a demonstration ODL controller and network topology available at dcloud .cisco.com. Below you will find the information required to have these apps interact with dCLoud.

# Accessing OpenDaylight Beryllium at dCloud

First, you need to connect to [dcloud.cisco.com](http://dcloud.cisco.com) and signup. If you are a new user, you may need to first signup at [cco.cisco.com](http://cco.cisco.com), and then at [dcloud](http://dcloud.cisco.com).

When connecting to dcloud, you will first be prompted to select a datacenter near you (shown in 1). After that you will be prompted to set up a profile.

- If you have any trouble in getting your profile setup, please consult the Help tab.

![](media/image5.png)
Figure 1 dCloud data center selection screen

Once connected to [dCloud](http://dcloud.cisco.com), you will see the content overview. From there, select Service Provider, and locate the [OpenDayLight Beryllium SR2 with Apps with 8 nodes v1.](https://dcloud-cms.cisco.com/demo/opendaylight-beryllium-sr2-with-apps-with-8-nodes-v1) demo.

Note that any newer ODL demo should work fine as well.

- Then select Start/Schedule and pick a time for when you want to have access to the topology, or now.
- Select the Session End time.
- Click Next and answer the "use" questions.

Now you are done and you should have a session being started for you.

# How do I configure my APPs to talk to my dCloud ODL + topology?

Note:

These apps have been adapted to the Lithium release of Opendaylight.

**No changes are needed to run these apps towards the above-mentioned topology in dCloud.**

For other setups, you may need to change ip/port/auth details.

In your distribution, you will find two top-directories; pathman and next.

In pathman/pathman\_ini.py you will find:

```
odl_ip = '198.18.1.80'
odl_port = '8181'
odl_user = 'admin'
odl_password = 'admin'
```

Edit these values to match your private topo.

# How do I connect my laptop to the dCloud topology?

Depending on where you have installed the apps, you may want to consider different options to access your active dCloud session.

1. Cisco AnyConnect Client - [http://www.cisco.com/c/en/us/products/security/anyconnect-secure-mobility-client/index.html](http://www.cisco.com/c/en/us/products/security/anyconnect-secure-mobility-client/index.html)
 - [Show Me How to connect](https://dcloud-cms.cisco.com/help/install_anyconnect_pc_mac) 

2. Openconnect – see [https://wiki.archlinux.org/index.php/OpenConnect](https://wiki.archlinux.org/index.php/OpenConnect)

Regardless of client, you will need to check the access details for your session.

At dcloud.cisco.com, and the datacenter you have selected – click _My Dashboard_ and you will find your active session(s) listed there.

Select you session's '_View'_ button and then '_Review Session Info_', which takes you to _Session Details_. In Session Details, you will find your anyconnect credentials.

And if you 'click here for available options', you will see a view like this:


![](media/image6.png)
Figure 2 Anyconnect session credentials screen

Once connected, your laptop will be in the same network as the routers in your topology and the ODL controller.


### dCloud Topology access details:

|                 | IP              | Port          | Username | Password | Notes                            |
|-----------------|-----------------|---------------|----------|----------|----------------------------------|
| **Karaf**       | 198.18.1.80     | 8101          | karaf    | karaf    | SSH exit command: ‘shell:logout’ |
| **ODL host**    | 198.18.1.80     | 8022          | cisco    | cisco    | SSH                              |
| **User VM**    | 198.18.1.80     | 8222          | cisco    | cisco    | SSH                              |
| **Restconf**    | 198.18.1.80     | 8080 and 8181 | admin    | admin    |                                  |
| **XRV Routers** | 198.18.1.30-.37 | 23            | cisco    | cisco    | Telnet                           |


# How to Configure and Launch BGP-LS Manager and Pathman Apps

1. Software prerequisites (above and beyond what is required for dCloud access):

    - Chrome Version 45.0.2454.101 (64-bit) or higher
    - Python 2.7 or 2.6
    - Tornado 4.2.1
    - requests 2.6.0

2. Access and configuration of the dCloud Lithium ODL sandbox (per the above).

3. Download BGP-LS Manager and Pathman apps from github located at <https://github.com/CiscoDevNet/Opendaylight-BGP-Pathman-apps> - For details, please refer to the [install notes](https://github.com/CiscoDevNet/Opendaylight-BGP-Pathman-apps/blob/master/Install.md)

4. You will see both a Pathman sub-directories under your root git directory.

5. In the pathman sub-directory, modify the pathman\_ini.py file to point to the remote ODL instance. **No change** is required if ODL is configured in dCloud.

6. Open a terminal window and change directory to Pathman.

7. Type in the following command: **python rest\_server\_v5.py**. This launches the "backend" of the BGP-LS and Pathman apps.

8. Open your Chrome Browser

9. URL to launch BGP-LS Manager: <http://localhost:8020/pathman/client/BGP/index.html>

10. URL to launch Pathman: <http://localhost:8020/pathman/client/pathman/index.html>