---
date: 2025-06-19 23:25
modifyDate: 2025-06-19 23:25
title: Git-如何优雅地合并开源项目更新到自己的魔改版本
category: git
tags:
  - git
description:
---

## 如何优雅地合并开源项目更新到自己的魔改版本

Hi 大家好！

今天想和大家分享一个我在维护自己的技术博客过程中遇到的实际问题以及解决方案。相信不少小伙伴都有过这样的经历：fork 或者直接下载了一个很棒的开源项目作为自己项目的基础，然后在此基础上进行了一番“魔改”，加入了自己的特色功能或者修改了部分样式。一切看起来都很美好，直到你发现原始项目更新了！这时候，你可能会犯愁：怎么才能把原始项目的更新合并到我的“魔改”版本中，同时保留我自己的修改，并且解决可能出现的冲突呢？

这就是我最近遇到的情况。我的博客项目 `Cerry2022.github.io` 基于一个很不错的 VitePress 博客模板 `vitepress-blog-pure`。我按照自己的想法修改了一些代码，加入了一些个性化的内容。但是，原始的 `vitepress-blog-pure` 仓库最近更新了一些很棒的功能和优化。作为一个“魔改者”，我当然希望能够享受到这些更新带来的好处，同时又不丢失我辛辛苦苦改动的代码。

**为什么要这样做？**

简单来说，将原始项目的更新合并到自己的项目中，主要有以下几个好处：

*   **获取新特性和优化：** 原始项目可能加入了新的功能、性能优化或者修复了 Bug，合并更新可以让你享受到这些改进。
*   **保持兼容性：** 如果原始项目依赖的库或框架有更新，合并更新有助于你的项目保持与这些依赖的兼容性。
*   **减少未来的麻烦：** 定期合并更新可以避免你的项目与原始项目差异过大，这样在未来合并更新时，冲突会相对更容易解决。

**那么，具体应该怎么操作呢？**

下面我就以我的博客项目为例，分享一下如何使用 Git 来优雅地完成这个任务。

**我的情况：**

我的博客项目位于 `D:\_Files\Project\Cerry2022.github.io`，其中包含了从 `vitepress-blog-pure` 复制过来的基础代码，并且我已经对其进行了修改。现在，原始的 `vitepress-blog-pure` 仓库有了新的更新，我需要将这些更新合并到我的项目中。

**操作步骤：**

整个过程的核心思想是将原始仓库添加为我本地仓库的一个“远程仓库”，然后拉取它的更新，并合并到我自己的分支上。

**第一步：进入项目目录**

首先，在你的命令行工具（比如 Git Bash）中进入到你的项目根目录：

```bash
cd D:\_Files\Project\Cerry2022.github.io
```

**第二步：关联原始仓库**

尽管我们已经有了原始项目的代码，但为了方便获取更新，我们需要将原始的 `vitepress-blog-pure` 仓库作为我们本地仓库的一个新的远程仓库来关联。这相当于给原始仓库在我们本地仓库中起个别名。

首先，检查一下你当前已经关联的远程仓库：

```bash
git remote -v
```

你会看到类似 `origin` 这样的远程仓库，它通常指向你自己的 GitHub 仓库 `Cerry2022.github.io`。

现在，添加原始的 `vitepress-blog-pure` 仓库 `https://github.com/airene/vitepress-blog-pure.git`：

```bash
git remote add upstream https://github.com/airene/vitepress-blog-pure.git
```

*   我们将原始仓库的别名设置为 `upstream`，这是一个约定俗成的名字，表示上游仓库。

再次运行 `git remote -v` 确认是否成功添加了 `upstream`。

**第三步：获取原始仓库的更新**

现在，我们可以从 `upstream` 远程仓库拉取最新的代码和分支信息了：

```bash
git fetch upstream
```

这个命令只会下载更新到你的本地，不会自动合并到你当前工作的分支。

**第四步：合并更新**

现在到了关键一步，将从 `upstream` 拉取到的更新合并到你自己的分支上。我当前在 `main` 分支工作，并且原始仓库的主分支也是 `main` ：
```bash
git merge upstream/main
```

*   请根据实际情况将 `main` 替换为你自己和原始仓库的主分支名称。

Git 会尝试将 `upstream/main` 分支的更改合并到你当前所在的 `main` 分支。

> [!tip] 出现的错误以及解决方案
> `fatal: refusing to merge unrelated histories`
> 这个错误表明 Git 认为你的本地仓库和 upstream/main 分支的历史是完全独立的，它们没有任何共享的提交。这通常发生在以下几种情况：
> 1. 你直接下载了原始仓库的代码，然后在你自己的仓库中初始化了 Git，并将自己的仓库推送到一个空的远程仓库。在这种情况下，你自己的仓库历史和原始仓库历史是完全独立的。    
> 2. 你从原始仓库克隆 (git clone) 了代码，但在克隆之后，原始仓库的历史被重写了（例如，使用了 git rebase 或 git reset --hard 并强制推送）。
> 3. 你将原始仓库的代码拷贝到了一个已有的、有自己历史的仓库中。
> 
Git 默认阻止合并不相关的历史，是为了防止你意外地合并两个完全不同的项目，导致混乱的提交历史。但是，在你知道这两个项目实际上是相关的（一个基于另一个）并且你确实想合并它们的情况下，你需要显式地告诉 Git 允许合并不相关的历史。
解决方法是在 git merge 命令后面加上 --allow-unrelated-histories 选项。
> 
> 
> ```bash
> git merge upstream/main --allow-unrelated-histories
> ```
> 


**第五步：解决冲突 (如果出现)**

1. **查看冲突文件：** Git 已经标记了所有冲突的文件。你可以通过运行 git status 来再次查看冲突文件的列表。冲突文件会显示在 "Unmerged paths" 部分。

```
git status
```
输出的一部分，Unmerged paths表示冲突文件，这部分是需要手动解决冲突的
```bash
Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both added:      .github/workflows/deploy.yml
        both added:      .gitignore
        both added:      .vitepress/config.ts
        both added:      .vitepress/theme/components/Archives.vue
        both added:      .vitepress/theme/components/Category.vue
        both added:      .vitepress/theme/components/Copyright.vue
        both added:      .vitepress/theme/components/NewLayout.vue
        both added:      .vitepress/theme/components/Page.vue
        both added:      .vitepress/theme/components/Tags.vue
        both added:      .vitepress/theme/custom.css
        both added:      .vitepress/theme/functions.ts
        both added:      .vitepress/theme/index.ts
        both added:      .vitepress/theme/serverUtils.ts
        both added:      changelog.md
        both added:      package.json
        both added:      pages/about.md
        both added:      pages/archives.md
        both added:      pages/category.md
        both added:      pages/tags.md
        both added:      pnpm-lock.yaml
        both added:      posts/vitepress-first.md
        both added:      public/favicon.ico

```


2. **手动解决冲突：** 对于每个冲突文件，你需要手动编辑它们，并处理 Git 添加的冲突标记 (<<<<<<< HEAD, =======, >>>>>>> upstream/main)。

打开每个冲突文件（例如 .github/workflows/deploy.yml, .gitignore 等）在你的代码编辑器中，你会看到类似以下的结构：
```
<<<<<<< HEAD
// 这是我在本地的修改
console.log("My custom feature");
=======
// 这是原始仓库的修改
console.log("New feature from upstream");
>>>>>>> upstream/main
```

你需要手动编辑这些文件：

1.  找到冲突标记 (`<<<<<<< HEAD`, `=======`, `>>>>>>> upstream/main`)。
2.  仔细阅读 `<<<<<<< HEAD` 到 `=======` 之间（你本地的修改）和 `=======` 到 `>>>>>>> upstream/main` 之间（原始仓库的修改）的代码。
3.  根据你的需求，手动修改这部分代码，保留你想要的部分，并删除所有的冲突标记。
4.  保存文件。

解决完所有冲突文件后，需要告诉 Git 你已经解决了这些文件的冲突：

```bash
git add <解决冲突的文件名>
```

对所有冲突文件重复此操作。

**第六步：完成合并**

在解决完所有冲突并 `git add` 后，你需要提交这次合并的结果：

```bash
git commit -m "Merge updates from upstream vitepress-blog-pure"
```

Git 会为你生成一个默认的提交信息，你也可以自定义。

**第七步：推送到你自己的远程仓库**

现在，你本地的仓库已经成功合并了原始仓库的更新并解决了冲突。最后一步就是将这些更改推送到你自己的 `Cerry2022.github.io` 远程仓库：

```bash
git push origin main
```

*   请根据实际情况将 `main` 替换为你自己远程仓库的主分支名称。

**一些小贴士：**

*   **分支操作：** 在合并前，建议切换到一个新的分支进行操作，比如 `git checkout -b merge-updates`，这样即使合并失败，也不会影响你的主分支。合并成功后再将这个分支合并回主分支。
*   **定期更新：** 尽量定期进行更新合并，这样可以减少累计的冲突，使解决过程更顺畅。
*   **备份：** 在进行重要的 Git 操作前，始终是一个好习惯来备份你的项目文件夹。

通过以上步骤，我就成功地将 `vitepress-blog-pure` 仓库的最新更新合并到了我自己的博客项目中，同时保留了我之前的修改，并且解决了冲突。我的博客现在拥有了原始仓库的新特性，同时仍然是我独一无二的“魔改”版本！

希望这篇文章能帮助到遇到类似问题的小伙伴们。如果你有更好的方法或者遇到了其他问题，也欢迎在评论区交流！

Happy Coding！

---