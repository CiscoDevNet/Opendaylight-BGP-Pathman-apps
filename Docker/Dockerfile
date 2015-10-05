############################################################
# Dockerfile to build:
# BGP-Pathman App server
# Based on CentOS
############################################################

# Set the base image to CentOS
FROM centos:centos7

# File Author / Maintainer
MAINTAINER Niklas Montin

# Set locale
ENV     LC_ALL en_US.UTF-8

# Install dependencies
ENV     DEBIAN_FRONTEND noninteractive

# set baseurl for yum
RUN sed -i "s/#baseurl/baseurl/g" /etc/yum.repos.d/CentOS-Base.repo

# Install packages
RUN yum -y update \
        && yum -y install \
        git \
        tar \
        wget \
        telnet \
        curl \
        dialog \
        net-tools \
        which \
        vim \
        python-tornado \
        python-requests \
        groupinstall \
        development \

# Set the default directory where CMD will execute
WORKDIR	/opt
RUN cd /opt \
	&& git init \
	&& git pull https://github.com/CiscoDevNet/Opendaylight-BGP-Pathman-apps

ENTRYPOINT python rest_server_v5.py > /tmp/pathman_api.log 2>&1
#ENTRYPOINT /bin/bash

