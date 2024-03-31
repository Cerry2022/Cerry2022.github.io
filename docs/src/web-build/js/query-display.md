# 将 url 中的 query 字段显示在网页中

## 目标

将 `query` 的内容显示在网页中。

![query-display](https://cdn.tangjiayan.com/notes/common/query-display.png)

`query` 是 [url](https://en.wikipedia.org/wiki/URL#Syntax) 的第 4 组成部分。

![URI_syntax_diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/URI_syntax_diagram.svg/1602px-URI_syntax_diagram.svg.png)

- GitHub: [practices/query-display at main · tangjan/practices](https://github.com/tangjan/practices/tree/main/query-display)
- GitHub Pages: [在线查看](https://notes.tangjiayan.cn/practices/query-display/)

## 初始化 query 键值对，显示在 HTML

```js
let key = 'digit', number = '1234567890';
document.getElementById("digit").innerHTML= key;
document.getElementById("number").innerHTML= number;
```

- 用 [let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 声明 query 键值对 `key = 'digit'`，`number = '1234567890'`；
- [document.getElementById](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById).[innerHTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML)：
  - 用 `document.getElementById` 来找到 [id](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/id) 分别为 `digit` 和 `number` 的 `<span>` 元素，对应 `HTML` 中的；

    ```HTML
    <span id="digit"></span> =
    <span id="number"></span>
    ```

  - 用 `innerHTML` 将找到的 `<span>` 元素的值设置为 `key` 和 `number`。

## 定义 `delUrlParam` 函数 和 `addUrlParam` 函数，更新 URL

`delUrlParam` 和 `addUrlParam` 分别用于 删除 / 创建 URL 中 `query` 的键值对。

```js
function delUrlParam(param){
    let obj = new window.URL(window.location.href);
    obj.searchParams.delete(param);
    return obj.href;
}

function addUrlParam(key, value){
    let obj = new window.URL(window.location.href);
    obj.searchParams.set(key, value);
    return obj.href;
}

history.pushState({}, 0, addUrlParam(key, number));
```

- 用 [new](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) [URL()](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/URL) 定义一个 [URL](https://developer.mozilla.org/zh-CN/docs/Web/API/URL) 对象，内容为当前窗口 [window](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 的超链接 [location.href](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/href)；
- 分别用 [URLSearchParams.delete()](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/delete) 和 [URLSearchParams.set()](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/set) 删除 / 创建 键值对；
- `return` 更新后的 `obj.href`；
- 使用 [history.pushState()](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState) 更新 URL。

## 修改 query 的实现

### 创建指向 `<input>` 的变量，添加事件监听器

```js
const changeSubmit = document.querySelector(".changeSubmit");
const changeDigit = document.querySelector(".changedDigit");

changeSubmit.addEventListener("click", change);
```

`changeSubmit` 和 `changeDigit` 分别指向 `数字输入框` 和 `提交按钮`：

```js
<div>
    <span>修改 digit 的值：</span>
    <input type="number" class="changedDigit">
    <input type="submit" value="提交" class="changeSubmit">
</div>
```

### `change()` 函数

```js
function change(){
    history.pushState({}, 0, delUrlParam(key)); 
    history.pushState({}, 0, addUrlParam(key, changeDigit.value));
    document.getElementById("number").innerHTML= changeDigit.value;
}
```

- 通过 `pushState` 调用 `delUrlParam` 将原 URL 中的 query 键值对删除
- 然后再调用 `addUrlParam` 添加 `key` - `changeDigit.value` 键值对
- 最后用 `document.getElementById().innerHTML` 更新 HTML 的显示内容

## 完整代码

::: details HTML

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>query</title>
    <style>
        body{
            font-size: 30px;
        }
        body input{
            font-size: 25px;
        }
    </style>
</head>
<body>

    <span id="digit"></span> =
    <span id="number"></span>

    <div>
        <span>修改 digit 的值：</span>
        <input type="number" class="changedDigit">
        <input type="submit" value="提交" class="changeSubmit">
    </div>
    
    <script src="./script.js"></script>
</body>
</html>
```

:::

::: details JS

```js
let key = 'digit', number = '1234567890';
document.getElementById("digit").innerHTML= key;
document.getElementById("number").innerHTML= number;

const changeSubmit = document.querySelector(".changeSubmit");
const changeDigit = document.querySelector(".changedDigit");

changeSubmit.addEventListener("click", change);

function change(){
    history.pushState({}, 0, delUrlParam(key)); 
    history.pushState({}, 0, addUrlParam(key, changeDigit.value));
    document.getElementById("number").innerHTML= changeDigit.value;
}

function delUrlParam(param){
    let obj = new window.URL(window.location.href);
    obj.searchParams.delete(param);
    return obj.href;
}

function addUrlParam(key, value){
    let obj = new window.URL(window.location.href);
    obj.searchParams.set(key, value);
    return obj.href;
}

history.pushState({}, 0, addUrlParam(key, number));
```

:::

## 参考

- [javascript - 给URL中添加query 而不刷新页面的方法 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000040209380)
- [Query string - Wikipedia](https://en.wikipedia.org/wiki/Query_string)
- [How to Get URL Parameters](https://www.w3docs.com/snippets/javascript/how-to-get-url-parameters.html)
- [How to build query string with Javascript - Stack Overflow](https://stackoverflow.com/questions/316781/how-to-build-query-string-with-javascript)
- [How to pass url query params? · Issue #256 · JakeChampion/fetch](https://github.com/JakeChampion/fetch/issues/256)
