# コードを実行するコンテナイメージ
FROM alpine/git

# アクションのリポジトリからコードファイルをコンテナのファイルシステムパス `/`にコピー
COPY entrypoint.sh /entrypoint.sh

# dockerコンテナが起動する際に実行されるコードファイル (`entrypoint.sh`)
ENTRYPOINT ["/entrypoint.sh"]
