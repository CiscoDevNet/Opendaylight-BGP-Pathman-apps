# BGP-Pathman Apps in Docker

Below is a short description on how to get these apps running in a docker container

###  Prerequisites:
First, you need a Docker capable host, see:

 - [Install docker on Ubuntu] (https://docs.docker.com/installation/ubuntulinux/)

 - [Install Docker on CentOS] (https://docs.docker.com/installation/centos/)
 - [Other Installs] (https://docs.docker.com/installation/)
 
### How to pull
Note: Pending release of this repository
```
docker pull nikmon2/bgp-pathman
```

### How to Run
```
docker run -d -p 8020:8020 -t bgp-pathman
```

### Build your own container
You can also download these files from here:

 - docker-build.sh
 - Dockerfile
 - docker-run.sh
 
Put them in the same directory and execute:

```
./docker-build.sh
./docker-run.sh
``` 
  
### How to Access the Container APPs
Depending on your docker host, there may be some access limitations:

 - Firewalld in Centos7:  service firewalld status
 - SELINUX - check settings in '/etc/sysconfig/selinux' - If set to enforcing, you may have issues.
 
 Else, the apps are accessed via your docker-hosts ipaddress:
  - http://{docker_host}:8020/pathman/client/BGP/index.html
  - http://{docker_host}:8020/pathman/client/pathman/index.html
 