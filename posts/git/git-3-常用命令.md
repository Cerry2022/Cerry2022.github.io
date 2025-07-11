---
date: 2025-07-01 09:24
modifyDate: 2025-07-01 09:26
title: git-3-常用命令
category: 
tags: 
description:
---

### Git 常用命令速查表

|                |                                       |                                            |                                                                        |                                                          |
| -------------- | ------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------- |
| 分类             | 命令                                    | 常用选项 / 示例                                  | 用途                                                                     | 备注                                                       |
| **I. 初始化与克隆**  | git init                              |                                            | 在当前目录初始化一个新 Git 仓库。                                                    | 项目开始时使用。                                                 |
|                | git clone [URL]                       | git clone https://github.com/user/repo.git | 从远程仓库克隆一份副本到本地。                                                        | 加入现有项目时使用。                                               |
| **II. 查询与查看**  | git status                            |                                            | 查看工作区、暂存区的状态，显示文件更改、暂存、未跟踪等信息。                                         | 最常用的命令，用于了解当前仓库状态。                                       |
|                | git diff                              | git diff                                   | 比较工作区与暂存区差异。                                                           | 查看未暂存的更改。                                                |
|                | git diff --staged                     | git diff --staged                          | 比较暂存区与最新提交的差异。                                                         | 查看已暂存但未提交的更改。                                            |
|                | git log                               | git log --oneline --graph --decorate       | 查看提交历史。<br>--oneline: 简洁单行。<br>--graph: 图形化历史。<br>--decorate: 显示分支/标签。 | 强大的历史查看工具。                                               |
|                | git branch                            | git branch -a                              | git branch: 列出本地分支。<br>-r: 列出远程分支。<br>-a: 列出所有。                        | 查看分支信息。                                                  |
|                | git reflog                            |                                            | 查看本地仓库 HEAD 和其他引用的移动历史。                                                | 极度重要的“时光机”，用于恢复误操作。                                      |
|                | git show [commit-id]                  | git show HEAD / git show abcdefg           | 显示某个提交的详细信息（提交信息和 diff）。                                               | 用于查看特定提交的内容。                                             |
| **III. 添加与提交** | git add [file(s)]                     | git add . / git add index.js               | 将文件更改添加到暂存区。                                                           | git add . 常用，添加所有更改。                                     |
|                | git commit -m "Message"               | git commit -m "feat: Add user login"       | 将暂存区更改提交到本地仓库，创建新提交。                                                   | 核心提交命令。                                                  |
|                | git commit --amend                    | git commit --amend                         | 修改上一次提交（可修改信息或增补文件）。                                                   | 不建议在已推送的提交上使用。                                           |
| **IV. 分支管理**   | git checkout [branch-name]            | git checkout dev                           | 切换到指定分支。                                                               | 较老版本 Git 常用。                                             |
|                | git checkout -b [new-branch-name]     | git checkout -b feature/auth               | 创建并切换到新分支。                                                             | 快速创建新分支并开始工作。                                            |
|                | git switch [branch-name]              | git switch main                            | **(Git 2.23+)** 切换到指定分支。                                               | 推荐替代 git checkout 切换分支的功能。                               |
|                | git switch -c [new-branch-name]       | git switch -c hotfix/bug-fix               | **(Git 2.23+)** 创建并切换到新分支。                                             | 推荐替代 git checkout -b。                                    |
|                | git merge [branch-to-merge]           | git merge feature/X                        | 将指定分支的更改合并到当前分支。                                                       | 最常见的合并方式，可能产生合并提交。                                       |
|                | git rebase [base-branch]              | git rebase main                            | 将当前分支的提交重放到另一分支的最新提交之后。                                                | 保持线性历史，**不要对已推送的公共分支使用**。                                |
|                | git branch -d [branch-name]           | git branch -d old-feature                  | 删除已合并的本地分支。                                                            | 清理不用的本地分支。                                               |
|                | git branch -D [branch-name]           | git branch -D temp-branch                  | 强制删除本地分支（即使未合并）。                                                       | 慎用，会丢失未合并的工作。                                            |
| **V. 远程操作**    | git remote -v                         |                                            | 列出所有远程仓库的短名称及其 URL。                                                    | 查看远程仓库配置。                                                |
|                | git fetch [remote]                    | git fetch origin                           | 从远程仓库下载最新信息（提交、分支），但不合并到本地。                                            | 更新本地远程跟踪分支，不改变工作区。                                       |
|                | git pull [remote] [branch]            | git pull origin main                       | 从远程仓库拉取并合并最新更改（fetch + merge/rebase）。                                  | 获取最新代码并同步到本地。                                            |
|                | git push [remote] [branch]            | git push origin main                       | 将本地分支的提交推送到远程仓库。                                                       | 将本地工作分享给团队。                                              |
|                | git push -u [remote] [branch]         | git push -u origin feature/new             | 首次推送新分支时，设置上游跟踪分支，下次可直接 git push。                                      | 简化后续推送操作。                                                |
|                | git push --force / --force-with-lease | git push --force origin hotfix             | 强制推送，覆盖远程历史。                                                           | **极度危险，仅在明确知晓后果且必要时使用。** --force-with-lease 更安全。         |
| **VI. 撤销操作**   | git restore [file-path]               | git restore index.html                     | **(Git 2.23+)** 恢复工作区中文件的更改，使其与暂存区或最新提交一致。                             | 推荐替代 git checkout -- <file>。                             |
|                | git restore --staged [file-path]      | git restore --staged README.md             | **(Git 2.23+)** 将文件从暂存区中取消暂存，但保留工作区更改。                                 | 推荐替代 git reset HEAD <file>。                              |
|                | git reset [options] [commit-id]       | git reset --soft HEAD~1                    | 移动当前分支的 HEAD 指针，用于撤销本地提交。                                              | --soft: 保留暂存区。<br>--mixed(默认): 清空暂存区。<br>--hard: 丢弃所有更改。 |
|                | git revert [commit-id]                | git revert abcdefg                         | 创建一个新的提交来撤销指定提交所做的更改，保留历史记录。                                           | **最安全** 的撤销已共享历史的方法。                                     |
