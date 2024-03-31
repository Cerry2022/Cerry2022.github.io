# GitHub `Connection timed out` 问题

## 问题

Windows 11 系统下，通过 `git push` 将项目推送到 GitHub 时，提示 `Connection timed out`:

```
$ git push origin main
ssh: connect to host github.com port 22: Connection timed out
fatal: Could not read from remote repository.
```

## 解决

打开 Windows 用户文件夹下的 `.ssh/config`，填入

```
Host github.com
Hostname ssh.github.com
Port 443
```

```
$ ssh -T git@github.com
Hi tangjan! You've successfully authenticated, but GitHub does not provide shell access.
```

## 参考

- [git - ssh: connect to host github.com port 22: Connection timed out - Stack Overflow](https://stackoverflow.com/a/52817036)
