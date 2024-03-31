# Git / GitHub 的基本使用

本文论述通过 Git 管理本地项目文件并上传到 GitHub 的基本过程。

## Git 初始化

### Git 下载安装

参考 [Git 详细安装教程（详解 Git 安装过程的每一个步骤）_git安装-CSDN博客](https://blog.csdn.net/mukes/article/details/115693833?)。

### Git 用户名、邮箱配置

```sh
git config --global user.name "JanTang"
```

```sh
git config --global user.email "tangjiayan2019@gmail.com"
```

::: tip

请将 `JanTang` 和 `tangjiayan2019@gmail.com` 替换为自己的昵称和邮箱，可以不和 GitHub 的昵称和邮箱一致。

:::

## 使用 Git 管理本地仓库

### 创建项目

在本地创建项目文件夹，正常进行项目文件开发。

我创建了名为 `hello` 的文件夹，写了一个输出 `Hello, world` 的简单 C++ 程序：

![local-create-hello](https://cdn.tangjiayan.com/notes/git/git-github/local-create-hello.png)

### init

使用 [init](https://git-scm.com/docs/git-init) 命令进行本地 Git 仓库初始化。

``` sh
git init
```

执行完 `git init` 后，在文件夹中会出现名为 `.git` 的文件夹：

![init](https://cdn.tangjiayan.com/notes/git/git-github/init.png)

### add

使用 [add](https://git-scm.com/docs/git-add) 命令将项目内容 (与 `.git` 同目录的 文件/文件夹) 添加到本地暂存区。

```bash
git add .
```

可以用 [status](https://git-scm.com/docs/git-status) 命令查看当前的工作树状态。

![add-status](https://cdn.tangjiayan.com/notes/git/git-github/add-status.png)

### commit

使用 [commit](https://git-scm.com/docs/git-commit) 将项目内容从暂存区提交到本地 Git 仓库，`initial commit` 是提交注释。

```bash
git commit -m "initial commit"
```

![commit-status](https://cdn.tangjiayan.com/notes/git/git-github/commit-status.png)

至此，已经可以通过 Git 在本地进行项目的版本控制了。

接下来讲述本地仓库如何上传到 GitHub 远程仓库。

## GitHub 上创建仓库

::: details GitHub 的注册及 SSH 绑定

参考 [github新手用法详解（建议收藏！！！）_github详解_怪 咖@的博客-CSDN博客](https://blog.csdn.net/weixin_43888891/article/details/112385076)

:::

在 GitHub 创建一个仓库，名字最好和本地库的一样。

推荐勾选上 `Add a README file`，`.gitignore` 和 `license` 可以不选，保持为 `None`。

![github-new-repository](https://cdn.tangjiayan.com/notes/git/git-github/github-new-repository.png)

![details-github-new-repository](https://cdn.tangjiayan.com/notes/git/git-github/details-github-new-repository.png)

然后点击 `Create repository` 即可创建一个 GitHub 仓库。

## 本地 Git 仓库上传到 GitHub 远程库

本地 `commit` 后，可以通过 [push](https://git-scm.com/docs/git-push) 上传到 GitHub 远程库。

### 用 `remote` 给远程库起别名

使用 [remote](https://git-scm.com/docs/git-remote) 命令给远程库起别名。

```bash
git remote add origin git@github.com:tangjan/hello.git
```

其中 GitHub 仓库的 SSH url 来自：

![github-ssh-url](https://cdn.tangjiayan.com/notes/git/git-github/github-ssh-url.png)

使用 `git remote -v` 查看远程库列表详细信息。

![remote](https://cdn.tangjiayan.com/notes/git/git-github/remote.png)

::: details 为什么将远程库起名为 `origin`

一般是将远程库起名为 `origin`，原因参见：

- [Git 里面的 origin 到底代表啥意思? - 田雅文的回答 - 知乎](https://www.zhihu.com/question/27712995/answer/39946123) 。

:::

### 用 `branch` 修改主分支名称，`push`

> 本节内容参考自：
>
> - [关于git的问题：error: src refspec main does not match any_TripleGold.的博客-CSDN博客](https://blog.csdn.net/gongdamrgao/article/details/115032436)

本地 Git 仓库默认主分支的名称是 `master`，而 Github 仓库默认主分支的名称是 `main`，二者名称不一致，这时如果 `push` 会提示 `error: src refspec main does not match any`：

![error-src](https://cdn.tangjiayan.com/notes/git/git-github/error-src.png)

解决方法是通过 [branch](https://git-scm.com/docs/git-branch) 命令将本地主分支的名称从 `master` 修改为 `main`:

```sh
git branch -m master main
```

之后还存在一个问题：GitHub 远程库和本地库的内容不一致，导致无法 `push`：

![push-rejected](https://cdn.tangjiayan.com/notes/git/git-github/push-rejected.png)

解决方法：

```sh
git fetch origin
```

```sh
git merge --allow-unrelated-histories origin/main
```

![fetch-merge](https://cdn.tangjiayan.com/notes/git/git-github/fetch-merge.png)

![merge-annotation](https://cdn.tangjiayan.com/notes/git/git-github/merge-annotation.png)

然后就可以看本地库中多了缺少的 `README.md`：

![new-README](https://cdn.tangjiayan.com/notes/git/git-github/new-README.png)

然后就可以通过 push 将本地库上传到 GitHub 远程库了：

```sh
git push origin main
```

![push](https://cdn.tangjiayan.com/notes/git/git-github/push.png)

`push` 命令执行成功后，可以看到 GitHub 仓库里已经成功上传了本地库的项目内容：

![github-push-success.](https://cdn.tangjiayan.com/notes/git/git-github/github-push-success.png)

## 参考

- [关于Git这一篇就够了_17岁boy想当攻城狮的博客-CSDN博客](https://blog.csdn.net/bjbz_cxy/article/details/116703787)
- [Git 里面的 origin 到底代表啥意思? - 田雅文的回答 - 知乎](https://www.zhihu.com/question/27712995/answer/39946123)
- [关于git的问题：error: src refspec main does not match any_TripleGold.的博客-CSDN博客](https://blog.csdn.net/gongdamrgao/article/details/115032436)
