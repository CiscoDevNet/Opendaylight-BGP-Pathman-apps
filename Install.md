# How to Install BGP Pathman

This is how to download and run the app. This has been tested to work equally well on Ubuntu, CentoOS or OSX, but should work on any system fulfling the requirements.



## How to install:
 
 ```
 mkdir my_git
 cd my_git
 git init
 git pull https://github.com/CiscoDevNet/Opendaylight-BGP-Pathman-apps
 ```
 
## How to run:
 When launching, your OS may ask for your approval to allow traffic to port 8020.
 
 ```
 cd pathman  (you should now be in ~/my_git/pathman)
 python rest_server_v5.py
 ```

## How to use:

• Open your Chrome Browser

• URL to launch BGP-LS Manager: <http://localhost:8020/pathman/client/BGP/index.html>

• URL to launch Pathman: <http://localhost:8020/pathman/client/pathman/index.html>

Note: **localhost** assumes that you are using the browser on the system where you installed the software. If that is not the case, replace with the ip address of your app host.

## How to Change Configuration
Pathman and BGP need to know how to access your controller. This is configured in the pathman_ini.py file.

```
odl_ip = '198.18.1.80'    # Ip address of your ODL controller
odl_port = '8181'         # Port of your ODL controller
odl_user = 'admin'        # Username to access restconf
odl_password = 'admin'    # Password to access restconf
```

If you didn't set a Username or Password for your controller, it is probably 'admin'/'admin' - but it could also be blank ''

