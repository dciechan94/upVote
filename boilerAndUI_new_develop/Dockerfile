FROM node:10
RUN apt-get update & apt-get upgrade

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /reactapp && cp -a /tmp/node_modules /reactapp
ADD . /reactapp
WORKDIR /reactapp

EXPOSE 3000
VOLUME /reactVol
CMD ["npm", "run", "start"] 
