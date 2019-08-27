#!/bin/bash
number=$1
for i in `seq $number`; do
     docker run -d -v ${PWD}/clovers:/clovers-reversi/clovers clover-miner-docker
done
