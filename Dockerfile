FROM ubuntu:16.04
RUN apt-get update
RUN apt-get dist-upgrade -y
RUN apt-get upgrade -y
RUN apt-get install -y nodejs npm git
RUN echo "cache breaker 000001"
RUN git clone https://github.com/austintgriffith/clovers-reversi
RUN cd clovers-reversi; npm i
RUN echo "cache breaker git pull 000001"
RUN cd clovers-reversi; git pull
CMD cd clovers-reversi; nodejs multiminer.js
