# JavaScript 初探——猜数字小游戏

参考自 [JavaScript 初体验 - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/A_first_splash)

JavaScript 初探 !

## 目标

> 猜数字游戏。随机选择一个 1 ~ 100 之间的自然数，玩家在 10 轮以内猜这个数字。每轮后都告知玩家的答案正确与否。如果猜错了，则告诉他数字是小了还是大了。并且显示出玩家前一轮所猜的数字。一旦玩家猜对，或者用尽所有机会，游戏将结束。游戏结束后，可以让玩家选择重新开始。<br>添加作弊功能，点击 `作弊 !` 按钮显示答案。

- [GitHub 源码](https://github.com/tangjan/Online-Displayable-Practices/tree/main/javascript-number-guessing)
- [在线查看](https://notes.tangjiayan.cn/Online-Displayable-Practices/javascript-number-guessing/)

## 目标拆解

1. 随机生成一个 1 到 100 之间的自然数。
2. 记录玩家当前的轮数。从 1 开始。
3. 为玩家提供一种猜测数字的交互方法。
4. 一旦有结果提交，先将其记录下来，以便用户可以看到他们先前的猜测。
5. 然后检查它是否正确。
6. 如果正确：
   - 显示祝贺消息。
   - 阻止玩家继续猜测（这会使游戏混乱）。
   - 显示控件允许玩家重新开始游戏。
7. 如果出错，并且玩家有剩余轮次：
   - 告诉玩家他们错了。
   - 允许他们输入另一个猜测。
   - 轮数加 1。
8. 如果出错，并且玩家没有剩余轮次：
   - 告诉玩家游戏结束。
   - 阻止玩家继续猜测（这会使游戏混乱）。
   - 显示控件允许玩家重新开始游戏。
9. 一旦游戏重启，确保游戏的逻辑和 UI 完全重置，然后返回步骤 1。

## 添加变量

```js
let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;
```

![class-overview](https://cdn.tangjiayan.com/notes/web-build/js/class-overview.png)

## 变量分析

### 随机数

```js
let randomNumber = Math.floor(Math.random() * 100) + 1;
```

- 用 [Math.random()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random) 生成一个 `[0, 1)` 范围的浮点数，然后 `* 100`；
- 用 `Math.floor()` 将随机生成的浮点数化为整数；
- 因为 `Math.random()` 取不到 `1`，所以最后再 `+ 1`；
- 赋值给变量 `randomNumber`。

### 记录、猜测结果、大/小

```js
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
```

用 [document.querySelector()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector) 创建指向 [Document](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 中类分别为 `guess`、`lastResult`、`lowOrHi` 的引用。因为引用是不变的，所以用 `const`。

对应 `HTML` 内的：

```html
<div class="resultParas">
  <p class="guesses"></p>
  <p class="lastResult"></p>
  <p class="lowOrHi"></p>
</div>
```

### 输入数字、提交按钮

```js
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
```

对应 `HTML` 内的：

```html
<div class="form">
      <label for="guessField">猜猜看: </label>
      <input type="number" min="1" max="100" required id="guessField" class="guessField">
      <input type="submit" value="提交" class="guessSubmit">
</div>
```

### 计数器、重置按钮

```js
let guessCount = 1;
let resetButton;
```

## CheckGuess() 函数

::: details CheckGuess()

```js
function checkGuess() {
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = "记录: ";
    }
    guesses.textContent += `${userGuess} `;

    if (userGuess === randomNumber) {
        lastResult.textContent = "猜对啦 ~";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = "!!! 猜满 10 次，游戏结束 !!!";
        lowOrHi.textContent = "";
        setGameOver();
    } else {
        lastResult.textContent = "猜错啦 !";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
        lowOrHi.textContent = "这个数字小啦 !";
        } else if (userGuess > randomNumber) {
        lowOrHi.textContent = "这个数字大啦 !";
        }
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);
```

:::

## CheckGuess() 函数分析

### 记录

```js
const userGuess = Number(guessField.value);
if (guessCount === 1) {
    guesses.textContent = "记录: ";
}
guesses.textContent += `${userGuess} `;
```

- 用 `const` 定义表示玩家输入数字的常量，用内置对象 [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 将其转化为数字；
- 每次开局 (`guessCount` 为 `1` 时) 都显示 `记录:` ；
- 用 [+=](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Addition_assignment) 运算符将 `userGuess` 拼接在 `记录:` 后面，实现猜测记录显示。

### 猜对/猜错、猜大/猜小

用条件语句进行猜测结果判断。

```js
if (userGuess === randomNumber) {
    lastResult.textContent = "猜对啦 ~";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
} else if (guessCount === 10) {
    lastResult.textContent = "!!! 猜满 10 次，游戏结束 !!!";
    lowOrHi.textContent = "";
    setGameOver();
} else {
    lastResult.textContent = "猜错啦 !";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
    lowOrHi.textContent = "这个数字小啦 !";
    } else if (userGuess > randomNumber) {
    lowOrHi.textContent = "这个数字大啦 !";
    }
}
```

### 更新数据、聚焦光标

```js
guessCount++;
guessField.value = "";
guessField.focus();
```

- `guessCount++;`: 猜测次数 ++；
- `guessField.value = ""`: 每次点击 `提交` 按钮，重置玩家的输入；
- `guessField.focus()`: 让光标聚焦于 `<input>` 输入框内；

### 添加 `guessSubmit` 事件监听器

```js
guessSubmit.addEventListener("click", checkGuess);
```

用 [addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 为 `guessSubmit` 的 `click` 事件添加回调函数 `checkGuess`。

## setGameOver() 函数

::: details setGameOver()

```js
function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "再来一局";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}
```

:::

## setGameOver() 函数分析

### 禁用输入框和提交按钮

```js
guessField.disabled = true;
guessSubmit.disabled = true;
```

游戏结束时禁用文本输入框 `guessField` 和提交按钮 `guessSubmit`。

### 创建重置按钮

```js
resetButton = document.createElement("button");
resetButton.textContent = "再来一局";
document.body.append(`resetButton`);
```

游戏结束时在 `body` 末尾添加 `resetButton`，它是一个 `<button>` 元素，内容为 `再来一局`。

### 添加 `resetButton` 事件监听器

```js
resetButton.addEventListener("click", resetGame);
```

点击 `resetButton` 时，执行回调函数 `resetGame`。

## resetGame() 函数

::: details resetGame()

```js
function resetGame() {
    guessCount = 1;
  
    const resetParas = document.querySelectorAll(".resultParas p");
    for (const resetPara of resetParas) {
      resetPara.textContent = "";
    }
  
    resetButton.parentNode.removeChild(resetButton);
  
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();
  
    lastResult.style.backgroundColor = "white";
  
    randomNumber = Math.floor(Math.random() * 100) + 1;
}
```

:::

## resetGame() 函数分析

### 计数器重置

```js
guessCount = 1;
```

### 清除信息段落

```js
const resetParas = document.querySelectorAll(".
resultParas p");
for (const resetPara of resetParas) {
  resetPara.textContent = "";
}
```

### 删除重置按钮

```js
resetButton.parentNode.removeChild(resetButton);
```

### 启用表单元素

```js
guessField.disabled = false;
guessSubmit.disabled = false;
guessField.value = "";
guessField.focus();
```

### 删除 `lastResult` 段落的背景颜色

```js
lastResult.style.backgroundColor = "white";
```

### 生成一个新的随机数

```js
randomNumber = Math.floor(Math.random() * 100) + 1;
```

## 作弊

理解了 js 的基本规则之后，学以致用，添加个作弊功能试试：

```js
const cheatButton = document.querySelector(".cheat");

function showAnswer(){
    answer = document.createElement("p");
    answer.textContent = randomNumber;
    // cheatButton += `${answer}`;
    document.body.append(answer);
    cheatButton.disabled = true;
}

cheatButton.addEventListener("click", showAnswer);
```

并且在 `resetGame` 函数中添加：

```js
answer.textContent = "";
cheatButton.disabled = false;
```

![cheat](https://cdn.tangjiayan.com/notes/web-build/js/cheat.png)

## 完整代码

::: details html

```html
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">

    <title>猜数字</title>

    <style>
      html {
        font-family: sans-serif;
      }

      body {
        width: 50%;
        max-width: 800px;
        min-width: 480px;
        margin: 0 auto;
      }
      
      .form input[type="number"] {
        width: 200px;
      }

      .lastResult {
        color: white;
        padding: 3px;
      }
    </style>
  </head>

  <body>
    <h1>来猜数字吧！</h1>

    <p>咱刚刚随机生成了一个 1 ~ 100 之间的数字, 看看你能不能在 10 次以内猜出来。<br>
       会提示你猜得大了还是小了。</p>

    <div class="form">
      <label for="guessField">猜猜看: </label>
      <input type="number" min="1" max="100" required id="guessField" class="guessField">
      <input type="submit" value="提交" class="guessSubmit">
    </div>

    <div class="resultParas">
      <p class="guesses"></p>
      <p class="lastResult"></p>
      <p class="lowOrHi"></p>
    </div>

    <div>
      <button class="cheat">作弊 !</button>
    </div>

    <script src="./script.js" defer></script>

  </body>
</html>
```

:::

::: details js

```js
let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

function checkGuess() {
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = "Previous guesses: ";
    }
    guesses.textContent += `${userGuess} `;

    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = "!!!GAME OVER!!!";
        lowOrHi.textContent = "";
        setGameOver();
    } else {
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
        lowOrHi.textContent = "Last guess was too low!";
        } else if (userGuess > randomNumber) {
        lowOrHi.textContent = "Last guess was too high!";
        }
    }

    guessSubmit.addEventListener("click", checkGuess);

    guessCount++;
    guessField.value = "";
    guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

function resetGame() {
    guessCount = 1;
  
    const resetParas = document.querySelectorAll(".resultParas p");
    for (const resetPara of resetParas) {
      resetPara.textContent = "";
    }

    answer.textContent = "";
    cheatButton.disabled = false;
  
    resetButton.parentNode.removeChild(resetButton);
  
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();
  
    lastResult.style.backgroundColor = "white";
  
    randomNumber = Math.floor(Math.random() * 100) + 1;
}

const cheatButton = document.querySelector(".cheat");

function showAnswer(){
    answer = document.createElement("p");
    answer.textContent = randomNumber;
    // cheatButton += `${answer}`;
    document.body.append(answer);
    cheatButton.disabled = true;
}

cheatButton.addEventListener("click", showAnswer);

```

:::

## 参考

- [JavaScript 初体验 - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/A_first_splash)
