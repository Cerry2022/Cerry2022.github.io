---
date: 2025-06-19 23:25
modifyDate: 2025-06-19 23:25
title: Git-如何将克隆的开源项目发布到自己的GitHub，并优雅地合并上游更新
category: git
tags:
  - git
description:
---


# 如何将克隆的开源项目发布到自己的GitHub，并优雅地合并上游更新

Hi 大家好！

今天想和大家分享一个我在维护自己的项目过程中遇到的实际问题以及解决方案。相信不少小伙伴都有过这样的经历：直接从GitHub克隆（或下载）了一个很棒的开源项目作为自己项目的基础，然后在此基础上进行了一番“魔改”，加入了自己的特色功能或者修改了部分样式。一切看起来都很美好，直到你发现原始项目更新了，或者更常见的是：**你还没有将这个“魔改”版本发布到自己的GitHub仓库！**

这时候，你可能会犯愁：
1.  怎么才能把我的“魔改”版本发布到**我自己的GitHub仓库**中？
2.  未来，怎么才能把**原始项目**的更新合并到我的“魔改”版本中，同时保留我自己的修改，并且解决可能出现的冲突呢？

这就是我最近遇到的情况。我的项目 `LinguaHaru` 基于一个非常棒的开源项目（假设它是 `YANG-Haruka/LinguaHaru` 这个公共仓库，但实际上你可能只是克隆或下载了他的代码），我按照自己的想法修改了一些代码，加入了一些个性化的内容。现在，我需要将这些改动发布到**我自己的GitHub仓库**，并且希望未来能方便地从原作者的仓库获取更新。

**当前状态确认：**
当你运行 `git remote -v` 时，输出如下：
```
PS D:\_Files\Project\github\LinguaHaru> git remote -v
origin  https://github.com/YANG-Haruka/LinguaHaru.git (fetch)
origin  https://github.com/YANG-Haruka/LinguaHaru.git (push)
```
这表明你的本地仓库的 `origin` 远程地址指向了原始项目，而不是你自己的GitHub仓库。这是我们首先需要解决的问题。

### 为什么要这样做？

简单来说，将你的魔改版本发布到自己的仓库并能够合并原始项目的更新，主要有以下几个好处：

*   **拥有自己的独立版本：** 将项目发布到自己的GitHub，意味着你拥有了一个独立的、可追溯的魔改历史，方便管理和分享。
*   **获取新特性和优化：** 原始项目可能加入了新的功能、性能优化或者修复了 Bug，合并更新可以让你享受到这些改进。
*   **保持兼容性：** 如果原始项目依赖的库或框架有更新，合并更新有助于你的项目保持与这些依赖的兼容性。
*   **减少未来的麻烦：** 定期合并更新可以避免你的项目与原始项目差异过大，这样在未来合并更新时，冲突会相对更容易解决。

那么，具体应该怎么操作呢？

下面我就以我的 `LinguaHaru` 项目为例，分享一下如何使用 Git 来优雅地完成这个任务。

### 我的情况：

我的项目位于 `D:\_Files\Project\github\LinguaHaru`，其中包含了从 `YANG-Haruka/LinguaHaru` 复制（或克隆）过来的基础代码，并且我已经对其进行了修改。现在，我需要将这些改动发布到**我自己的GitHub仓库**（例如：`https://github.com/你的用户名/LinguaHaru.git`），同时保留与 `YANG-Haruka/LinguaHaru` 原始仓库的连接，以便将来获取更新。

### 操作步骤：

整个过程的核心思想是：首先将**原始仓库**重命名为 `upstream`，然后将**你自己的GitHub仓库**设置为新的 `origin`，完成首次推送。之后，再通过 `upstream` 拉取原始项目的更新并合并。

#### 零、在GitHub上创建你自己的新仓库 (如果尚未创建)

在开始之前，请确保你已经在GitHub上创建了一个新的**空的**仓库，用于存放你的 `LinguaHaru` 项目。例如，你可以创建一个名为 `LinguaHaru` 的仓库。记下它的HTTPS地址，例如 `https://github.com/你的用户名/LinguaHaru.git`。

#### 第一步：进入项目目录

首先，在你的命令行工具（比如 Git Bash）中进入到你的项目根目录：

```bash
cd D:\_Files\Project\github\LinguaHaru
```

#### 第二步：重新配置远程仓库地址

这是最关键的一步。由于你当前的 `origin` 指向了原始项目，我们需要对其进行调整。

1.  **检查当前远程仓库：**
    ```bash
    git remote -v
    ```
    你会看到类似以下内容：
    ```
    origin  https://github.com/YANG-Haruka/LinguaHaru.git (fetch)
    origin  https://github.com/YANG-Haruka/LinguaHaru.git (push)
    ```

2.  **将原始项目的 `origin` 重命名为 `upstream`：**
    这将把 `https://github.com/YANG-Haruka/LinguaHaru.git` 这个地址关联到 `upstream` 这个别名，以便将来获取它的更新。
    ```bash
    git remote rename origin upstream
    ```

3.  **添加你自己的GitHub仓库作为新的 `origin`：**
    现在，你需要把你自己的GitHub仓库地址添加为 `origin`。请将 `https://github.com/你的用户名/LinguaHaru.git` 替换为你实际的仓库地址。
    ```bash
    git remote add origin https://github.com/你的用户名/LinguaHaru.git
    ```

4.  **再次检查远程仓库，确认配置：**
    ```bash
    git remote -v
    ```
    现在你应该能看到类似以下内容：
    ```
    origin  https://github.com/你的用户名/LinguaHaru.git (fetch)
    origin  https://github.com/你的用户名/LinguaHaru.git (push)
    upstream    https://github.com/YANG-Haruka/LinguaHaru.git (fetch)
    upstream    https://github.com/YANG-Haruka/LinguaHaru.git (push)
    ```
    这表明你已经成功设置了 `origin` 指向你自己的仓库，`upstream` 指向原始仓库。

#### 第三步：首次推送你的魔改版本到自己的仓库

现在，你的本地仓库已经准备就绪，可以推送到你自己的GitHub仓库了。

```bash
git push -u origin main
```
*   `git push`: 将本地更改推送到远程仓库。
*   `-u` (或 `--set-upstream`): 设置 `origin/main` 作为当前本地分支 `main` 的上游（跟踪）分支。这样，以后你只需要运行 `git push` 或 `git pull`，Git 就会知道推送到哪个远程分支。
*   `origin`: 推送的目标远程仓库别名。
*   `main`: 推送的本地分支名称（如果你的主分支是 `master`，请相应替换）。

至此，你的“魔改”版本已经成功发布到了你自己的GitHub仓库！

#### 第四步：获取上游（原始）仓库的更新

将来，当原始项目 `YANG-Haruka/LinguaHaru` 有了新的更新时，你可以从 `upstream` 远程仓库拉取最新的代码和分支信息：

```bash
git fetch upstream
```
这个命令只会下载更新到你的本地，不会自动合并到你当前工作的分支。它会把 `upstream` 仓库的所有分支更新下载到本地，并存储为 `upstream/main`、`upstream/dev` 等形式。

#### 第五步：合并上游更新

现在到了关键一步，将从 `upstream` 拉取到的更新合并到你自己的分支上。我当前在 `main` 分支工作：

```bash
git merge upstream/main
```
请根据实际情况将 `main` 替换为你自己和原始仓库的主分支名称。
Git 会尝试将 `upstream/main` 分支的更改合并到你当前所在的 `main` 分支。

**可能出现的错误及解决方案： `fatal: refusing to merge unrelated histories`**

这个错误表明 Git 认为你的本地仓库（你目前的 `main` 分支）和 `upstream/main` 分支的历史是完全独立的，它们没有任何共享的提交。这通常发生在你不是通过 `git clone` 而是直接下载代码后 `git init`，或者你在本地仓库创建历史后，才试图合并一个没有共同祖先的远程历史。

Git 默认阻止合并不相关的历史，是为了防止你意外地合并两个完全不同的项目，导致混乱的提交历史。但是，在你知道这两个项目实际上是相关的（你的项目基于原始项目）并且你确实想合并它们的情况下，你需要显式地告诉 Git 允许合并不相关的历史。

**解决方法**是在 `git merge` 命令后面加上 `--allow-unrelated-histories` 选项：

```bash
git merge upstream/main --allow-unrelated-histories
```
**注意：** 通常这个选项只在**首次**合并两个不相关的历史时需要。一旦你成功合并了一次，它们就有了共同的提交历史，后续的合并就不再需要这个选项了。

#### 第六步：解决冲突 (如果出现)

合并操作后，如果你的修改和原始项目的更新在同一个地方发生了重叠，Git 就无法自动决定保留哪个版本，从而产生冲突。

1.  **查看冲突文件：** Git 已经标记了所有冲突的文件。你可以通过运行 `git status` 来再次查看冲突文件的列表。冲突文件会显示在 "Unmerged paths" 部分。

    ```bash
    git status
    ```
    输出的一部分，`Unmerged paths` 表示冲突文件，这部分是需要手动解决冲突的：
    ```
    Unmerged paths:
      (use "git add <file>..." to mark resolution)
            both added:      .github/workflows/deploy.yml
            both added:      .gitignore
            both added:      .vitepress/config.ts
            # ... 其他冲突文件 ...
    ```

2.  **手动解决冲突：** 对于每个冲突文件，你需要手动编辑它们，并处理 Git 添加的冲突标记 (`<<<<<<< HEAD`, `=======`, `>>>>>>> upstream/main`)。
    打开每个冲突文件（例如 `.github/workflows/deploy.yml`, `.gitignore` 等）在你的代码编辑器中，你会看到类似以下的结构：

    ```
    <<<<<<< HEAD
    // 这是你在本地 main 分支的修改
    console.log("My custom feature");
    =======
    // 这是从 upstream/main 分支拉取到的原始仓库的修改
    console.log("New feature from upstream");
    >>>>>>> upstream/main
    ```
    你需要手动编辑这些文件：
    *   找到冲突标记 (`<<<<<<< HEAD`, `=======`, `>>>>>>> upstream/main`)。
    *   仔细阅读 `<<<<<<< HEAD` 到 `=======` 之间（你本地的修改）和 `=======` 到 `>>>>>>> upstream/main` 之间（原始仓库的修改）的代码。
    *   根据你的需求，手动修改这部分代码，保留你想要的部分，并删除所有的冲突标记。
    *   保存文件。

3.  **标记冲突已解决：** 解决完所有冲突文件后，需要告诉 Git 你已经解决了这些文件的冲突：

    ```bash
    git add <解决冲突的文件名>
    ```
    对所有冲突文件重复此操作。

#### 第七步：完成合并提交

在解决完所有冲突并 `git add` 后，你需要提交这次合并的结果：

```bash
git commit -m "Merge updates from upstream YANG-Haruka/LinguaHaru"
```
Git 会为你生成一个默认的提交信息，你也可以自定义。

#### 第八步：推送到你自己的远程仓库

现在，你本地的仓库已经成功合并了原始仓库的更新并解决了冲突。最后一步就是将这些更改推送到你自己的 `origin` 远程仓库：

```bash
git push origin main
```
请根据实际情况将 `main` 替换为你自己远程仓库的主分支名称。

### 一些小贴士：

*   **分支操作：** 在进行合并前，建议切换到一个新的分支进行操作，比如 `git checkout -b merge-updates`，这样即使合并失败，也不会影响你的 `main` 分支。合并成功并测试无误后再将这个分支合并回 `main` 分支 (`git checkout main && git merge merge-updates`)。
*   **定期更新：** 尽量定期进行更新合并，这样可以减少累计的冲突，使解决过程更顺畅。
*   **备份：** 在进行重要的 Git 操作前，始终是一个好习惯来备份你的项目文件夹。

通过以上步骤，你就成功地将你“魔改”后的 `LinguaHaru` 项目发布到你自己的GitHub仓库，并且建立了与原始 `YANG-Haruka/LinguaHaru` 仓库的连接，以便未来优雅地合并其最新更新。你的项目现在拥有了原始仓库的新特性，同时仍然是你独一无二的“魔改”版本！

希望这篇文章能帮助到遇到类似问题的小伙伴们。如果你有更好的方法或者遇到了其他问题，也欢迎在评论区交流！

Happy Coding！