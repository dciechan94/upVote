#!/bin/bash

SCRIPTDIR=`dirname $0`

OS=`uname`

echo "Stopping docker compose"
if [ "$OS" != "Darwin" ]
then
    SCRIPTDIR=`readlink -f "$SCRIPTDIR"`
fi
echo

docker-compose -f $SCRIPTDIR/docker-compose.yml down -v

echo "Docker compose stopped"

