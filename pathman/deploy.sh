#!/bin/bash
#
# .:|:.:|:.  Copyright (c) 2014 Cisco Systems, Inc.
#
# All rights reserved.
#
# Author: Abhishek Kumar <abhishk2@cisco.com>

run_maven()
{
    local aid=$1; shift
    local ver=$1; shift

    mvn \
        deploy:deploy-file \
        -Durl=http://engci-maven.cisco.com/artifactory/onep-snapshots \
        -DrepositoryId=onep \
        -Dfile=target/${aid}-${ver}.tar \
        -DgroupId=com.cisco.cdl \
        -DartifactId=$aid \
        -Dversion=$ver \
        -Dpackaging=tar \
        -DgeneratePom=true
}


run_maven pathman 2.0.0-SNAPSHOT
