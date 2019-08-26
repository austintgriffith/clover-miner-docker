#!/bin/bash
docker run -ti --rm -p 8000:8000 -v ${PWD}/clovers:/clovers -v ${PWD}/server:/server node bash -c "cd server;npm i;node index.js"
