#!/bin/sh

# e2e.sh
#
# 以下の処理をする
#
# - コンテナ e2e を起動し、E2Eテストを実行する
#
# 書式
# ./e2e.sh [cypress command]
#
# 例
# ./e2e.sh cypress run
# ./e2e.sh cypress run --spec "cypress/integration/header/menu.spec.ts"
#
# 実行要件
# - ローカル開発サーバ（http://localhost:3000）を起動した上で実行する
#

docker-compose run --rm e2e "$@"
