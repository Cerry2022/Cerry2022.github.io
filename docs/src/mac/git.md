# 记一次Mac环境配置git

## 零、起因

在Mac上配置本vitepress项目时，执行以下脚本文件报错，结合报错信息分析，mac环境没有初始化git且以下命令在Mac下不适用，于是开始配置ssh。
### update.sh
```shell
git add ./
git commit -m "Update"
git push origin master

sh ./vitepress-starter/deploy.sh
```
### 报错信息
```shell
➜  Cerry2022.github.io git:(master) ✗ sh update.sh 
fatal: pathspec '.?' did not match any files
[master 0a96ad0] Update
 1 file changed, 0 insertions(+), 0 deletions(-)
fatal: invalid refspec 'master?'
: command not found
./vitepress-starter/deploy.sh: line 10: npm: command not found

```
### 报错原因分析
git 有`https`和`ssh(git)`方式

:::tip
```shell
git push -f git@github.com:Cerry2022/Cerry2022.github.io.git master:gh-pages
git push -f https://github.com/Cerry2022/Cerry2022.github.io.git master:gh-pages
```
:::
其中https方式早在2021年已经弃用

可能是WIN环境下的git版本较老，`https`方式仍可以使用。
MAC下则需要配置SSH。

## 一、配置ssh
```shell
➜  Cerry2022.github.io git:(master) ✗ cd ~/.ssh                             
cd: no such file or directory: /Users/cerry/.ssh
➜  Cerry2022.github.io git:(master) ✗ ssh-keygen -t rsa -C "cerry2024@foxmail.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/cerry/.ssh/id_rsa):
Created directory '/Users/cerry/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /Users/cerry/.ssh/id_rsa
Your public key has been saved in /Users/cerry/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:EnF8S7QhExclahLPEReEcIkea5rooTKqWQAhaT4UXSc cerry2024@foxmail.com
The key's randomart image is:
+---[RSA 3072]----+
|ooo .E+=OBX+.    |
|o+ .  =B+Bo+     |
|=    .oo=o..     |
|.o    ++  .      |
|. .. +. S        |
| .o o  .         |
| o..             |
|+o.              |
|B.               |
+----[SHA256]-----+
➜  Cerry2022.github.io git:(master) ✗ cd ~/.ssh                                   
➜  .ssh cat id_rsa.pub
ssh-rsa ***********(此处省略256)= cerry2024@foxmail.com
➜  .ssh 
```
将 ssh公钥 `ssh-rsa` 添加到 github的配置中 终端中执行
```shell
ssh -T git@github.com
```
出现以下信息，即配置成功
```shell
Hi Cerry2022! You've successfully authenticated, but GitHub does not provide shell access.
```

## 二、配置git
```shell
➜  Cerry2022.github.io git:(master) ✗ git push -u origin master
fatal: 'origin' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
➜  Cerry2022.github.io git:(master) ✗ git remote add origin git@github.com:Cerry2022/Cerry2022.github.io.git
➜  Cerry2022.github.io git:(master) ✗ git push -u origin master                                             
Enumerating objects: 12, done.
Counting objects: 100% (12/12), done.
Delta compression using up to 24 threads
Compressing objects: 100% (10/10), done.
Writing objects: 100% (11/11), 1.40 KiB | 716.00 KiB/s, done.
Total 11 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), completed with 1 local object.
To github.com:Cerry2022/Cerry2022.github.io.git
8b80818..891f142  master -> master
branch 'master' set up to track 'origin/master'.
➜  Cerry2022.github.io git:(master) ✗ 
```

## 三、编写Mac环境脚本
```shell
git add ./
git commit -m "Update"
git remote add origin git@github.com:Cerry2022/Cerry2022.github.io.git
git push -u origin master

sh ./vitepress-starter/deploy.sh
```

脚本报错
```shell
Error: Cannot find module @rollup/rollup-darwin-x64. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.
```
执行
``` shell
npm i
```




