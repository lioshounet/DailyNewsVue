#!/bin/bash
set -x
app_deploy(){
  echo "deploy ..."
  npm cache verify
  npm install --force --registry https://registry.npm.taobao.org
  npm run build
  docker stop thor_fe
  docker rm thor_fe
  docker rmi thor_fe:v1.0
  docker-compose up -d
  echo "done"
}

tree ./
app_deploy
