#!/bin/sh

# setup.sh
#
# 以下のセットアップ処理をする
#
# - Dockerfileからイメージをビルドする
# - パッケージをインストールする
#
# 書式
# ./setup.sh
#

docker-compose build
docker-compose up -d
docker-compose exec frontapp yarn install
docker-compose down
