FROM node:10

LABEL author="Dariusz Ciechanowski"
LABEL copyrights="Uniwersytet Pedagogiczny im. KEN w Krakowie"

ENV APPNAME "upVoteUI"

RUN apt-get update && apt-upgrade -y

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /reactapp && cp -a /tmp/node_modules /reactapp
ADD . /reactapp
WORKDIR /reactapp

EXPOSE 3000

CMD ["npm", "run" "start"]

