#!/bin/bash

applyDeployConfig() {
  HOST_DOMAIN="dciechan.pl"
  
  #sed -i "s/192\.168\.99\.100/127\.0\.0\.1/g" ./upvote-backend/application.properties
  #sed -i "s/145\.239\.84\.188/$HOST_DOMAIN\.pl/g" ./upvote-frontend/nginx/html/*
}

initializeLogger() {
  UVP_NOW_TS=`date -u "+%Y%m%d-%H%M%S-%M3UTC"`
  UPV_LOG_FILE="/tmp/upvote_install_${UVP_NOW_TS}.log"
  logInfoMsg "Logs will be stored in ${UPV_LOG_FILE}"
}

initializeInstaller() {
  logInfoMsg "+--------------------------------------+"
  logInfoMsg "|         UP Vote - Installer          |"
  logInfoMsg "|--------------------------------------+"
  logInfoMsg "|       Uniwersytet Pedagogiczny       |"
  logInfoMsg "|          im. KEN w Krakowie          |"
  logInfoMsg "|--------------------------------------+"
  logInfoMsg "|  +-- Author: Dariusz Ciechanowski    |"
  logInfoMsg "|--------------------------------------+"
  
  setLocalVariables
}

checkOS() {
  echo "Checking OS version..."
  
  isLinux=`uname -p | grep -i x86_64`
  if [[ -z ${isLinux} ]]; then
    echo "Error: Installation requires Linux based OS"
    exit 1
  fi
  
  if [[ ! -f "/etc/os-release" ]] ; then
    echo "Cannot localize /etc/os-release file. No OS details provided"
  else
    OS_RELEASE=`cat /etc/os-release | grep -i PRETTY_NAME | sed -e 's/^PRETTY_NAME=\"\(.*\)\"$/\1/'`
	if [[ -z ${OS_RELEASE} ]]; then
      echo "No OS details provided in /etc/os-release"
	else
	  echo "OS: ${OS_RELEASE}"
    fi
  fi
}

checkSuperUser() {
  if [ "$EUID" -ne 0 ] ; then 
    logErrorMsg "Installation must be run as root"
    exit 1
  fi
}

checkDocker() {
  docker --version
  docker_version_rc=$?
  
  if [[ ${docker_version_rc} == 0 ]] ; then
    logInfoMsg "Docker is installed"
  else
    installDocker
  fi

  ##Check docker status
  isDockerActive=`systemctl show --property ActiveState docker | sed 's/.*=//'`
  if [[ ${isDockerActive} != active ]]; then 
    logErrorMsg "Docker is not running properly"
	exit 1
  fi
}

checkDockerCompose() {
  docker-compose --version
  docker_compose_version_rc=$?
  
  if [[ ${docker_compose_version_rc} == 0 ]] ; then
    logInfoMsg "Docker-compose is installed"
  else
    installDockerCompose
	
	docker-compose --version
    docker_compose_version_rc=$?
    
	if [[ ${docker_compose_version_rc} == 0 ]] ; then
      logInfoMsg "docker-compose is installed"
    else
      logErrorMsg "docker-compose is not running properly"
	  exit 1
	fi
  fi
}

installDocker() {
  logInfoMsg "Installing Docker in progress..."
  
  apt-get update
  apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  
  add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
  
  apt-get update
  apt-get install docker-ce
  
  systemctl enable docker
  systemctl start docker
  
  logInfoMsg "Installing Docker completed."
}

installDockerCompose() {
  logInfoMsg "Installing docker-compose in progress..."
  
  sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  
  sudo chmod +x /usr/local/bin/docker-compose
  
  logInfoMsg "Installing docker-compose completed."
}
  
setLocalVariables() {
  logInfoMsg "Preparing environment"
  
  HOST_NAME=`hostname -f`
  logInfoMsg "Hostname: ${HOST_NAME}"
  
  if [[ ! -z ${OS_RELEASE} ]]; then
    logInfoMsg "OS: ${OS_RELEASE}"
  fi
}

uninstallDocker() {
  apt-get purge docker-ce
  rm -rf /var/lib/docker
  
  #uninstall docker-compose
  rm /usr/local/bin/docker-compose
}

uninstallDockerContainers() {
  CONTAINERS_TO_DELETE=`docker ps -a | grep 'vote-nginx\|vote-backend\|vote-postgres' | awk '{ print $1 }' | tr '\n' ' '`
  if [ -z "$CONTAINERS_TO_DELETE" ]
  then
    logInfoMsg "UP Vote containers not found. Nothing to remove."
  else
    logInfoMsg "Removing containers: ${CONTAINERS_TO_DELETE}"
	docker rm $CONTAINERS_TO_DELETE --force
	logInfoMsg "UP Vote containers removed"
  fi
}

uninstallDockerImages() {
  IMAGES_TO_DELETE=`docker images | grep 'vote-nginx\|vote-backend\|vote-postgres' | awk '{ print $3 }' | tr '\n' ' '`
  if [ -z "$IMAGES_TO_DELETE" ]
  then
    logInfoMsg "UP Vote images not found. Nothing to remove."
  else
    logInfoMsg "Removing images: ${IMAGES_TO_DELETE}"
	docker rmi $IMAGES_TO_DELETE --force
	logInfoMsg "UP Vote images removed"
  fi
}

composePostgres() {
  logInfoMsg "Creating postgres..."
  docker-compose -f postgres-compose.yml down
  docker-compose -f postgres-compose.yml build --no-cache
  docker-compose -f postgres-compose.yml up -d 
  logInfoMsg "Created postgres"
}

composeJava() {
  logInfoMsg "Creating upVote Java backend..."
  docker-compose -f upVote-compose.yml down
  docker-compose -f upVote-compose.yml build --no-cache
  docker-compose -f upVote-compose.yml up -d
  logInfoMsg "Created upVote Java backend"
}

composeNode() {
  logInfoMsg "Creating upVote React frontend..."
  docker-compose -f nginx-compose.yml down
  docker-compose -f nginx-compose.yml build --no-cache
  docker-compose -f nginx-compose.yml up -d
  logInfoMsg "Created upVote React frontend"
}

composeContainers() {
  composePostgres
  composeJava
  composeNode
}

usage()
{
  echo "USAGE: $0"
  exit -1
}
  
logInfoMsg() {
  msg2log=$1
  echo "["`date -u "+%Y-%m-%d %H:%M:%S.%M3 UTC"`"]" "INFO=>>" "${msg2log}"
  echo "["`date -u "+%Y-%m-%d %H:%M:%S.%M3 UTC"`"]" "INFO=>>" "${msg2log}" >> "${UPV_LOG_FILE}"
}

logInfoMsgWithoutEcho() {
  msg2log=$1
  echo "["`date -u "+%Y-%m-%d %H:%M:%S.%M3 UTC"`"]" "INFO=>>" "${msg2log}" >> "${UPV_LOG_FILE}"
}

logErrorMsg() {
  msg2log=$1
  echo "["`date -u "+%Y-%m-%d %H:%M:%S.%M3 UTC"`"]" "ERR=>>" "${msg2log}"
  echo "["`date -u "+%Y-%m-%d %H:%M:%S.%M3 UTC"`"]" "ERR=>>" "${msg2log}" >> "${UPV_LOG_FILE}"
}

logWarnMsg() {
  msg2log=$1
  echo "["`date -u "+%Y-%m-%d %H:%M:%S.%M3 UTC"`"]" "WARN=>>" "${msg2log}"
  echo "["`date -u "+%Y-%m-%d %H:%M:%S.%M3 UTC"`"]" "WARN=>>" "${msg2log}" >> "${UPV_LOG_FILE}"
}

checkOS
initializeLogger
checkSuperUser
initializeInstaller
checkDocker
checkDockerCompose
uninstallDockerContainers
uninstallDockerImages
applyDeployConfig
composeContainers
  
exit 0
