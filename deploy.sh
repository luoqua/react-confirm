#!/usr/bin/env sh


git init
git add -A
git commit -m 'deploy'


git remote rm origin

# 链接远程仓库
git remote add origin https://github.com/luoqua/react-confirm.git

#拉取远程仓库的文件
git pull --rebase origin master

# 同步更新代码
git push -u origin master

cd - 


react-input-number