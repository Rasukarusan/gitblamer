# git-blamer

# 概要
指定したユーザーが編集したファイルを全て表示する

# 使い方
sh git-blamer.sh 

/Users/user/app/README.md
/Users/user/app/docker-compose.yml
/Users/user/app/web/Dockerfile
/Users/user/app/web/app/controllers/BaseController.php
Total 4 file found!
 
# オプション
```sh
sh git-blamer.sh -l 追加行数
```
`sh git-blamer.sh 20`の場合20行以上追加したファイルのみ出力されます。

