#!/bin/bash

OS=`uname`

SCRIPTDIR=`dirname $0`
if [ "$OS" != "Darwin" ]
then
    SCRIPTDIR=`readlink -f "$SCRIPTDIR"`
fi

if [ "$OS" = "Darwin" ]
then
    sed "s|IS_OSXFS\: \"false\"|IS_OSXFS\: \"true\"|" $SCRIPTDIR/docker-compose.yml.sample > $SCRIPTDIR/docker-compose.yml
else
    cp $SCRIPTDIR/docker-compose.yml.sample $SCRIPTDIR/docker-compose.yml
fi

echo "Removing old resources"
docker-compose -f $SCRIPTDIR/docker-compose.yml down -v
docker-compose -f $SCRIPTDIR/docker-compose.yml up -d --force-recreate
echo

echo "Waiting for services to go up"
while ! docker logs db2 | grep "Setup has completed"; do
    echo -n "."
    sleep 3
done

echo "Compose done"
