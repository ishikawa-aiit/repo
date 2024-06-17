#!/bin/sh

# add-ssh-key.sh
#
# SSH認証キー及びconfigファイルをコピーし、コンテナ内の.sshディレクトリに配置する
#
# 書式
# ./add-ssh-key.sh path_to_private_key [path_to_config_file]
#
# 例
# ./add-ssh-key.sh ~/.ssh/id_rsa
#
# configファイルがある場合
# ./add-ssh-key.sh ~/.ssh/id_rsa ~/.ssh/config
#

readonly SCRIPT_NAME=${0##*/}
readonly COMPOSE_YML_PATH='../compose.yml'

while (( $# > 0 ))
do
  case $1 in
    *)
      if [[ -n "$ARG1" ]] && [[ -n "$ARG2" ]]; then
        printf '%s\n' "${SCRIPT_NAME}: 指定する引数は2つまでです => path_to_private_key [path_to_config_file]"
        exit 1
      elif [[ -n "$ARG1" ]]; then
        ARG2="$1"
      else
        ARG1="$1"
      fi
      ;;
  esac
  shift
done

if [[ -z "$ARG1" ]]; then
  printf '%s\n' "${SCRIPT_NAME}: 1つ目の引数は必須です => path_to_private_key"
  exit 1
fi

FILE_NAME=`basename $ARG1`

if [[ -z "$ARG2" ]]; then
  ARG2=""
fi

docker-compose -f $COMPOSE_YML_PATH up -d

if [[ ! $ARG2 = "" ]]; then
  FILE_NAME2=`basename $ARG2`
  docker cp $ARG2 $(docker-compose ps -q frontapp):/home/node/.ssh
fi
docker cp $ARG1 $(docker-compose ps -q frontapp):/home/node/.ssh

docker-compose -f $COMPOSE_YML_PATH exec --user root frontapp chown -R node:node /home/node/.ssh
docker-compose -f $COMPOSE_YML_PATH exec frontapp chmod -R 700 /home/node/.ssh

docker-compose -f $COMPOSE_YML_PATH down
