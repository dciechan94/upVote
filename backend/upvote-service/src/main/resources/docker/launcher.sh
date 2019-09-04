#!/bin/sh

JVM_OPTIONS=""
jvmOptionsFile="/app/jvm.options"

if [ -f "${jvmOptionsFile}" ]; then
  while read option
  do
    if [ -n "${option}" ]; then
      case "${option}" in
        \#*)
          ;;
        *)
          JVM_OPTIONS="${JVM_OPTIONS} ${option}"
          ;;
      esac
    fi
  done < ${jvmOptionsFile}
fi

echo "Using additional jvm options: ${JVM_OPTIONS}"

#make sure working dir is local to jar file
cd /app

# run service
java ${JVM_OPTIONS} -jar /app/application.jar --spring.config.location=file:///app/application.properties --logging.path=/app/log/ --logging.file=${APPNAME}
