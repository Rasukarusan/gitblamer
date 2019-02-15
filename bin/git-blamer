#!/bin/sh

# [概要]
# 指定したユーザーが編集したファイルを全て表示する
#
# [使い方]
# sh git-blamer.sh 
#
# [出力]
# /Users/user/app/README.md
# /Users/user/app/docker-compose.yml
# /Users/user/app/web/Dockerfile
# /Users/user/app/web/app/controllers/BaseController.php
# Total 4 file found!
# 
# [オプション]
# sh git-blamer.sh -l 追加行数
# ex.) sh git-blamer.sh 20 の場合20行以上追加したファイルのみ出力されます。
#

# 行追加の閾値。ex.) FILTER_ADD_LINE=5の場合、5行以上追加したファイルのみを抽出
FILTER_ADD_LINE=5

while getopts l:h OPT
do
    case $OPT in
        "l" ) 
            FILTER_ADD_LINE=$OPTARG
            ;;
        "h" ) 
            echo "Usage: git-blamer [-l] FILTER_ADD_LINE_VALUE"
            exit
            ;;
    esac
done

# カレントディレクトリから.gitへの絶対PATHを取得
gitDir=`git rev-parse --git-dir`
# カレントディレクトリがgit管理下にない場合、終了する
if [ $? -gt 0 ]; then 
    exit 
fi

# ワーキングツリーのルートの絶対PATHを取得
gitTop=`git rev-parse --show-toplevel`

# ユーザー一覧取得 
authors=`git log --no-merges | ag 'Author:' | ag -o '(?<=: ).*(?= \<)' | sort -u`
author=`echo "$authors" | fzf --prompt "SELECT AUTHOR : "`

# ユーザーを選択しなかった場合、終了する
if [ "$author" == '' ]; then 
    exit
fi

# 指定したユーザーの編集したファイルを取得
files=`git -C ${gitDir} log --no-merges --numstat --author="${author}" | ag '[0-9]?\t'  | awk -v filter_add_line=${FILTER_ADD_LINE} -v gitTop=${gitTop} '{if($1>filter_add_line)print gitTop"/"$3}' | sort -u` 
echo "$files\n"

result="Total `echo "$files" | wc -l | tr -d " "` file found!"
printf "\e[33m$result\e[m\n"
