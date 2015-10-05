#! /bin/bash
docker run -i -h appserver -p 8020:8020 -v /tmp:/tmp -t bgp-pathman
