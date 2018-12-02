FROM nginx:1.15

LABEL author="Dariusz Ciechanowski"
LABEL copyrights="Uniwersytet Pedagogiczny im. KEN w Krakowie"

COPY html/ /usr/share/nginx/html/
COPY config/nginx/ /etc/nginx/

RUN mkdir app
WORKDIR /app

COPY launcher.sh /app/
CMD [ "/app/launcher.sh" ]

COPY docker-entrypoint.sh /
RUN chmod a+x /docker-entrypoint.sh


ENTRYPOINT [ "/docker-entrypoint.sh" ]
