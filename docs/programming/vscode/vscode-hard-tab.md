## VS Code 插件 markdownlint 提示 “no-hard-tabs”

VS Code 启用 [markdownlint](https://github.com/DavidAnson/markdownlint) 插件编写 md 文件的时候，发现提示 `MD010/no-hard-tabs：Hard tabs`：

<figure><img src="https://cdn.tangjiayan.com/notes/debug/vs-code-hard-tab.png" alt=""><figcaption></figcaption></figure>

好奇调查了一下：

所谓的 `hard tab` 是指 [制表符](https://en.wikipedia.org/wiki/Tab_key#Tab_characters)，ASCII 码为 `9`，C语言中转义序列表示为 <code>&bsol;t</code>。

与 `hard tab` 相对应的是 `soft tab`，是由 2个 或 4个 空格组成。

## 参考

* [markdownlint/doc/md010.md at v0.29.0 · DavidAnson/markdownlint](https://github.com/DavidAnson/markdownlint/blob/v0.29.0/doc/md010.md)
* [coding style - What are hard and soft tabs? - Stack Overflow](https://stackoverflow.com/questions/26350689/what-are-hard-and-soft-tabs)
* [Tab key - Wikipedia](https://en.wikipedia.org/wiki/Tab_key#Tab_characters)
