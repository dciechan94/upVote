# upVote

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