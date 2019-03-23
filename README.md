# upVote

1. Installation
 - Prerequisites
 - SSL Certificate
 - Configuration files
 - Installer script
 - Validation

2. Troubleshooting
 - Logging 


1. SSL configuration
  a. Prepare SSL certicifates
    - Self signed with passphrase:
	openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
	
	- Self signed with no passphrase:
	openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
	
	- Obtained from Provider
	
  b. Pass paths to certificate file, key file and optionally passphare file to the Installer
  


docker cp cert.pem /etc/ssl/certs/cert.pem
docker cp key.pem /etc/ssl/private/key.pem
docker cp passphrase.pass /etc/ssl/private/passphrase.pass

nginx -s reload




## HTTPS for springboot
openssl pkcs12 -export -in cert.pem -inkey key.pem -out keystore.12 -name tomcat -CAfile chain.pem -caname root



Step 1: Download certbot from git

You need to fetch the source code of Let's Encrypt on your server which your domain address is pointing to. This step may take a couple minutes.

    $ git clone https://github.com/certbot/certbot

    $ cd certbot

    $ ./certbot-auto --help

Remark: Python 2.7.8 (or above) should be installed beforehand.

Step2: generates certificates and a private key

By executing following command in your terminal, Let's Encrypt generates certificates and a private key for you.

    $ ./certbot-auto certonly -a standalone \

    -d example.com -d example.com

Remark:Keys are generated in /etc/letsencrypt/live/example.com directory

Step3: Generate PKCS12 Files From PEM Files

To convert the PEM files to PKCS12 version: Go to /etc/letsencrypt/live/example.com convert the keys to PKCS12 using OpenSSL in the terminal as follows.

    $ openssl pkcs12 -export -in fullchain.pem \

           -inkey privkey.pem \

               -out keystore.p12 \

           -name tomcat \

           -CAfile chain.pem \

           -caname root

Enter Export Password:

Verifying - Enter Export Password:

(Note:- Write single line at a time and press enter)

Step4: Configuration of Spring Boot Application

Open your 'application.properties' Put this configuration there.

    server.port=8443 security.require-ssl=true

    server.ssl.key-store=/etc/letsencrypt/live/example.com/keystore.p12

    server.ssl.key-store-password= password

    server.ssl.keyStoreType= PKCS12

    server.ssl.keyAlias= tomcat

