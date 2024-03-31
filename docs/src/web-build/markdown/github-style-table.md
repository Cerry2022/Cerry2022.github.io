# GitHub-Style Table

## 规则

- 使用 [竖线](https://en.wikipedia.org/wiki/Vertical_bar) `|` 和 [连字符](https://en.wikipedia.org/wiki/Hyphen) `-` 来创建 GitHub-Style Table。
连字符用于创建列标题，竖线用于分隔每列。
- 表格前必须有一个空行。
- 表格末尾的竖线 `|` 可选。
- 每列单元格的宽度可以不同，竖线 `|` 无需对齐。
- 每列的标题行必须有至少三个连字符 `-`。
- 可以通过在标题行中连字符 `-` 的 左侧、右侧、两侧 添加冒号 `:`，实现 靠左、靠右、居中 对齐列中的文本。
- 若要包含竖线 `|` 作为单元格中的内容，须在竖线前使用 `\`：

## 例

### 输入

```markdown
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

```markdown
| Command | Description |
| --- | --- |
| git status | List all new or modified files |
| \| | lorem
```

### 输出

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

| Command | Description |
| --- | --- |
| git status | List all new or modified files |
| \| | lorem

## 参考

- [Markdown Extensions - GitHub-Style Tables | VitePress](https://vitepress.dev/guide/markdown#github-style-tables)
- [Organizing information with tables - GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables)
