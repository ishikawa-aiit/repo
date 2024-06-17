#!/bin/sh

# exec.sh
#
# 以下のコンテナ起動処理をする
#
# - SSH認証キー及びconfigファイルをコンテナ内の.sshディレクトリにコピーした上でコンテナにアクセスする
#
# 書式
# ./exec.sh private_key_file_name
#
# 例
# ./exec.sh id_rsa
#
#

readonly SCRIPT_NAME=${0##*/}
readonly COMPOSE_YML_PATH='../compose.yml'

# 引数の数が２つかチェックする
if [ "$#" -ne 1 ]; then
  printf '%s\n' "${SCRIPT_NAME}: 指定する引数は1つです => private_key_file_name"
  exit 1
else
  FILE_NAME="$1"
fi

docker-compose -f $COMPOSE_YML_PATH up -d

docker-compose -f $COMPOSE_YML_PATH exec frontapp yarn install
docker-compose -f $COMPOSE_YML_PATH exec frontapp zsh -c '
  eval "$(ssh-agent)"
  ssh-add ~/.ssh/$0
  zsh
' $FILE_NAME

docker-compose -f $COMPOSE_YML_PATH down
