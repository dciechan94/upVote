FROM openjdk:8

LABEL author="Dariusz Ciechanowski"
LABEL copyrights="Uniwersytet Pedagogiczny im. KEN w Krakowie"

RUN mkdir app
WORKDIR /app

COPY launcher.sh /app/
RUN chmod 777 /app/launcher.sh
CMD [ "/app/launcher.sh" ]

RUN mkdir upVotePersistence
COPY META-INF /app/upVotePersistence/

ENV APPNAME "upVote"

COPY upVote.jar /app/application.jar
COPY application.properties /app/
COPY jvm.options /app/
COPY log4j2.xml /app/
COPY keystore.12 /app/

COPY docker-entrypoint.sh /
RUN chmod 777 /docker-entrypoint.sh

ENTRYPOINT [ "/docker-entrypoint.sh" ]

