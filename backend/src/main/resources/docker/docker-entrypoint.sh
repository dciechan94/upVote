#!/usr/bin/env bash

set -e

#KEYSTORE_FILE='/app/tokenservice.keystore'
#if [ ! -f $KEYSTORE_FILE ]; then
#  JWT_KEY_FILE='/app/secrets/jwtkey.cer'
#  if [ -f $JWT_KEY_FILE ]; then
#    echo 'Adding JWT certificate to the keystore...'
#    keytool -importcert -file $JWT_KEY_FILE -alias jwtkey -keystore $KEYSTORE_FILE -storepass passw0rd -keypass passw0rd -no-prompt
#  fi
#fi

exec "$@"
