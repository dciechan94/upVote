FROM nginx:latest

LABEL author="Dariusz Ciechanowski"
LABEL copyrights="Uniwersytet Pedagogiczny im. KEN w Krakowie"

COPY ssl/cert.pem /etc/ssl/certs/cert.pem
COPY ssl/key.pem /etc/ssl/private/key.pem
COPY ssl/passphrase.pass /etc/ssl/private/passphrase.pass

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

COPY html/ /usr/share/nginx/html/


RUN mkdir app
WORKDIR /app

COPY launcher.sh /app/
RUN chmod 777 /app/launcher.sh
CMD [ "/app/launcher.sh" ]

COPY docker-entrypoint.sh /
RUN chmod a+x /docker-entrypoint.sh


ENTRYPOINT [ "/docker-entrypoint.sh" ]
