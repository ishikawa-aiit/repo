#!/bin/sh

# exec.sh
#
# 以下のコンテナ起動処理をする
#
# - イメージからコンテナを起動する
# - パッケージをインストールする
#
# 書式
# ./exec.sh
#

docker-compose up -d
docker-compose exec frontapp yarn install
