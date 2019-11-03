# GitBlamer

# 概要
指定したユーザーが編集したファイルを全て表示する

![demo.gif](https://user-images.githubusercontent.com/17779386/52861971-5812b100-3177-11e9-902a-26ff79dc5e76.gif)

# インストール

```sh 
$ brew tap rasukarusan/gitblamer
$ brew install gitblamer
```

# 使い方

git管理下のディレクトリ(git管理下ならどこでも良い)で実行
```sh 
$ gitblamer
```

出力
```
/Users/user/app/README.md
/Users/user/app/docker-compose.yml
/Users/user/app/web/Dockerfile
/Users/user/app/web/app/controllers/BaseController.php

Total 4 file found!
```
 
# オプション
```sh
gitblamer -l 追加行数
```
`gitblamer -l 20`の場合20行以上追加したファイルのみ出力されます。

## 記事

[fzfでAuthorを指定して編集ファイル一覧を出力する](https://www.rasukarusan.com/entry/2019/02/15/215542)
