# URL

URL，<span style="color:red">U</span>niform <span style="color:red">R</span>esource <span style="color:red">L</span>ocator，统一资源定位符，俗称网址。用于定位 [计算机网络](https://en.wikipedia.org/wiki/Computer_network) 中的 [资源](https://en.wikipedia.org/wiki/Web_resource)（如 `.html`、`.css`、`.txt`、`.js`、`.png` 等文件）。比如本文的 url 是 `https://notes.tangjiayan.cn/web-build/url.html`。

URL 是 [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) 的一种。

## 语法

URL 符合 URI 的语法。URI 由五个部分组成：

```
URI = scheme ":" ["//" authority] path ["?" query] ["#" fragment]
```

从左到右按重要性递减，分别是 `scheme`、`[authority]`、`path`、`[query]`、`[fragment]`

用[方括号](https://en.wikipedia.org/wiki/Bracket#Square_brackets) `[]` 括起来的内容表示是可选的。

语法图：

![URI_syntax_diagram](https://upload.wikimedia.org/wikipedia/commons/d/d6/URI_syntax_diagram.svg)

### scheme

协议，后随 `:`，如 [http](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)、[https](https://en.wikipedia.org/wiki/HTTP_Secure) 。

### authority

中文翻译为 `凭证`，前随 `//`。

语法：

```
authority = [userinfo "@"] host [":" port]
```

这之中最主要的部分是 `host`，它可以是 [域名](https://en.wikipedia.org/wiki/Domain_name)、[IPv4](https://en.wikipedia.org/wiki/IPv4)地址、[IPv6](https://en.wikipedia.org/wiki/IPv6) 地址等。

虽然 authority 是可选内容，但在 URL 中一般是不会省略的。

### path

路径，网页资源存储的的路径。

如

- `https://notes.tangjiayan.cn/web-build/vitepress/vitepress-github-pages.html`

`path` 是 `/web-build/vitepress/vitepress-github-pages.html` 。

### query

查询组件，前随 `?`。在 url 中通常是由分隔符 `&` 分隔的键值对，用于处理特定的 HTTP 请求。

例：`https://example.com/path/to/page?name=ferret&color=purple`

`query`：`?name=ferret&color=purple`

详细参考 [Query string - Wikipedia](https://en.wikipedia.org/wiki/Query_string)

### fragement

片段，前随 `#`。用于直接定位到 web 文件的特定文本部分。

如 [https://notes.tangjiayan.cn/web-build/url.html#fragement](https://notes.tangjiayan.cn/web-build/url.html#fragement) 中的 `#fragement`，直接定位到了本章节部分。

详细参考：[Text fragments | MDN](https://developer.mozilla.org/en-US/docs/Web/Text_fragments)

## 参考

- [Uniform Resource Identifier - Wikipedia](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)
- [URL - Wikipedia](https://en.wikipedia.org/wiki/URL)
- [统一资源定位符 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E5%AE%9A%E4%BD%8D%E7%AC%A6)
- [RFC 1738](https://datatracker.ietf.org/doc/html/rfc1738)
- [Query string - Wikipedia](https://en.wikipedia.org/wiki/Query_string)
