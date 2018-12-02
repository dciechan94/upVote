#!/bin/sh

echo "Running NPMs"

#make sure working dir is local to jar file
cd /app

# run service
npm install
npm start
