#!/bin/bash
docker build -t clover-miner-server-docker --file DockerfileServer .
docker run -ti --rm -p 8000:8000 -v ${PWD}/clovers:/clovers -v ${PWD}/server:/server clover-miner-server-docker bash
