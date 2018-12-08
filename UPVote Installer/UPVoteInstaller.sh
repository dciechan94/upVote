#!/bin/sh

initialize() {
  if [ $# -eq 0 ]; then
    PORT=7777
  fi
  if [ $# -eq 1 ]; then
    PORT=$1
  fi
  if [ $# -eq 2 ]; then
    PORT=$1
    REMOTE_SERV=$2
    SCRIPT_ABSOLUTE_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")"
    ssh root@$REMOTE_SERV 'bash -s' < $SCRIPT_ABSOLUTE_PATH $PORT
    exit 0
  fi
  
  logInfoMsg "Set debug port: ${PORT}"
  
  DS_ENGINE_DSENV_PATH="/opt/IBM/InformationServer/Server/DSEngine/dsenv"
  DS_ENGINE_UV_PATH="/opt/IBM/InformationServer/Server/DSEngine/bin/uv"
  NODE_AGENTS_PATH="/opt/IBM/InformationServer/ASBNode/bin/NodeAgents.sh"
  METADATA_SERVER_PATH="/opt/IBM/InformationServer/ASBServer/bin/MetadataServer.sh"
  if [ ! -f "$DS_ENGINE_DSENV_PATH" ] ; then
    logErrorMsg "Path does not exist: ${DS_ENGINE_DSENV_PATH}"
	exit 1
  fi
  if [ ! -f "$DS_ENGINE_UV_PATH" ] ; then
    logErrorMsg "Path does not exist: ${DS_ENGINE_UV_PATH}"
	exit 1
  fi
  if [ ! -f "$NODE_AGENTS_PATH" ] ; then
    logErrorMsg "Path does not exist: ${NODE_AGENTS_PATH}"
	exit 1
  fi
  if [ ! -f "$METADATA_SERVER_PATH" ] ; then
    logErrorMsg "Path does not exist: ${METADATA_SERVER_PATH}"
	exit 1
  fi
  
  
  JVM_OPTIONS_PATH="/opt/IBM/InformationServer/wlp/usr/servers/iis/jvm.options"
  if [ -f "$JVM_OPTIONS_PATH" ] ; then
    logInfoMsg "Version: Liberty Profile"
    IIS_LIBERTY_PROFILE=true
  fi
}

stopIgcServer() {
  logInfoMsg "Stop IGC server"
  
  #source /opt/IBM/InformationServer/Server/DSEngine/dsenv
  source $DS_ENGINE_DSENV_PATH
  #/opt/IBM/InformationServer/Server/DSEngine/bin/uv -admin -stop
  $DS_ENGINE_UV_PATH -admin -stop
  #/opt/IBM/InformationServer/ASBNode/bin/NodeAgents.sh stop
  $NODE_AGENTS_PATH stop
  #/opt/IBM/InformationServer/ASBServer/bin/MetadataServer.sh stop
  $METADATA_SERVER_PATH stop
  
  logInfoMsg "Stopped IGC server"
}

startIgcServer() {
  logInfoMsg "Start IGC server"
  
  #/opt/IBM/InformationServer/ASBServer/bin/MetadataServer.sh run
  $METADATA_SERVER_PATH run
  #/opt/IBM/InformationServer/ASBNode/bin/NodeAgents.sh start
  $NODE_AGENTS_PATH start
  #source /opt/IBM/InformationServer/Server/DSEngine/dsenv
  source $DS_ENGINE_DSENV_PATH
  #/opt/IBM/InformationServer/Server/DSEngine/bin/uv -admin -start
  $DS_ENGINE_UV_PATH -admin -start
  
  logInfoMsg "Started IGC server"
}

modifyAppServerAdmin() {
  logInfoMsg "Modify AppServerAdmin.sh"
  
  APP_SERVER_ADMIN_PATH="/opt/IBM/InformationServer/ASBServer/bin/AppServerAdmin.sh"
  JAVA_DEBUG_OPTION="JAVA_DEBUG=\"-Dwas.debug.mode=true -Dcom.ibm.websphere.ras.inject.at.transform=true -agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=${PORT}\""
  
  sed -i -e '/JAVA_DEBUG=/d' $APP_SERVER_ADMIN_PATH
  sed -i -e "/dir=`dirname \"$cmd\"`/a ${JAVA_DEBUG_OPTION}" $APP_SERVER_ADMIN_PATH
  
  sed -i -e "s/ '\"\${JAVA_DEBUG}\"'//" $APP_SERVER_ADMIN_PATH
  sed -i -e "s/eval exec '\"\$JAVA\"'/& '\"\${JAVA_DEBUG}\"'/" $APP_SERVER_ADMIN_PATH
  
  logInfoMsg "Modify AppServerAdmin.sh - done"
}

modifyJavaOptions() {
  logInfoMsg "Modify jvm.options"
  
  
  if [[ ! -f ${JVM_OPTIONS_PATH} ]]; then 
    logErrorMsg "Cannot find jvm.options file"
	exit 1
  fi
  
  OPTION_DEBUG="-Xdebug"
  OPTION_RUNJDWP_NO_PORT="-Xrunjdwp:transport=dt_socket,server=y,suspend=n,address="
  OPTION_RUNJDWP_WITH_PORT="-Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=${PORT}"
  
  DELETE_OPTIONS_LINES="${OPTION_DEBUG}
  ${OPTION_RUNJDWP_NO_PORT}"
  
  for DELETE_OPTIONS_LINE in ${DELETE_OPTIONS_LINES}
  do
	sed -i -e "/^${DELETE_OPTIONS_LINE}/ d" $JVM_OPTIONS_PATH
  done
  
  APPEND_OPTIONS="${OPTION_DEBUG}
  ${OPTION_RUNJDWP_WITH_PORT}"

  for APPEND_OPTION in ${APPEND_OPTIONS}
  do
    logInfoMsg "Add: ${APPEND_OPTION}"
	sed -i -e "\$a${APPEND_OPTION}" $JVM_OPTIONS_PATH
  done

  logInfoMsg "Modify jvm.options - done"
}

restartServer() {
  logInfoMsg "Restart server"
  /opt/IBM/InformationServer/ASBServer/bin/MetadataServer.sh restart
  logInfoMsg "Restart server completed"
}

logInfoMsg() {
  msg2log=$1
  echo "["`date -u "+%Y-%m-%d %H:%M:%S.%M3 UTC"`"]" "INFO=>>" "${msg2log}"
}

logInfoMsgNoTimeStamp() {
  msg2log=$1
  echo "${msg2log}"
}

logErrorMsg() {
  msg2log=$1
  echo "["`date -u "+%Y-%m-%d %H:%M:%S.%M3 UTC"`"]" "ERR=>>" "${msg2log}"
}

logInfoMsg "Start initializating Debug Mode"
initialize $*
stopIgcServer
modifyAppServerAdmin
startIgcServer
if [ "${IIS_LIBERTY_PROFILE}" == 'true' ]; then
  modifyJavaOptions
else
  #logInfoMsgNoTimeStamp ""
  #logInfoMsgNoTimeStamp "Please login to  WebSphere console:" 
  #logInfoMsgNoTimeStamp "https://<host>:9043/ibm/console, wasadmin/Zaq123edc" 
  #logInfoMsgNoTimeStamp ""
  #logInfoMsgNoTimeStamp "Follow steps below to set debug mode:"
  #logInfoMsgNoTimeStamp "1. Servers –> Server Types –> WebSphere application servers"
  #logInfoMsgNoTimeStamp "2. Under Server Infrastructure section –> expand Java and Process Management –> Process definition"
  #logInfoMsgNoTimeStamp "3. Under Additional Properties section –> click Java Virtual Machine"
  #logInfoMsgNoTimeStamp "4. Checked the 'Debug Mode'"
  #logInfoMsgNoTimeStamp "5. In Debug arguments textbox, put this:"
  #logInfoMsgNoTimeStamp "-Xdebug -Xnoagent -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=${PORT}"
  
  
  logInfoMsg "Modify AppServerAdmin.sh"
  SERV_HOSTNAME=`hostname`
  SERVER_XML_PATH="/opt/IBM/WebSphere/AppServer/profiles/InfoSphere/config/cells/${SERV_HOSTNAME}Node01Cell/nodes/${SERV_HOSTNAME}Node01/servers/server1/server.xml"
  WASND_DEBUG_OPTS="-Xdebug -Xnoagent -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=${PORT}"
  
  sed -i -e "s/debugMode=\"false\"/debugMode=\"true\"/" $SERVER_XML_PATH
  sed -i -e "s/debugArgs=\".*\"/debugArgs=\"${WASND_DEBUG_OPTS}\"/" $SERVER_XML_PATH
  
fi

restartServer
logInfoMsg "Finished initializating Debug Mode"

