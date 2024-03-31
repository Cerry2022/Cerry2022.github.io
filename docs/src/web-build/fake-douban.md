# 仿豆瓣主页静态页面

2023年1月做的一个前端小项目，搬到这来。

## 目标

未登陆时的 [豆瓣主页](https://www.douban.com/) 静态页面模仿（细节有些出入）

参考自 [Web前端开发_渡一教育_bilibili](https://www.bilibili.com/video/BV1yx411d7Rc/)

链接：

- [GitHub](https://github.com/tangjan/practices/tree/main/static-page-douban/)
- [GitHub Pages 在线查看](https://notes.tangjiayan.cn/Online-Displayable-Practices/static-page-douban/)

## 著作权声明

本人模仿并展示豆瓣首页静态页面仅出于学习目的，无任何商业意图。如有侵权，请通过 [tangjiayan2019@gmail.com](mailto:tangjiayan2019@gmail.com) 联络本人，我会立刻删除。

不过根据[《中华人民共和国著作权法》](http://www.npc.gov.cn/npc/c30834/202011/848e73f58d4e4c5b82f69d25d46048c6.shtml) 第二十四条：

>第二十四条　在下列情况下使用作品，可以不经著作权人许可，不向其支付报酬，但应当指明作者姓名或者名称、作品名称，并且不得影响该作品的正常使用，也不得不合理地损害著作权人的合法权益：
（一）为个人学习、研究或者欣赏，使用他人已经发表的作品；
（二）……
……

应该没什么问题。

<div class="mask">当然豆瓣官方更可能压根懒得理我……</div>

CSS 代码太多了，就不介绍了，这里只简单介绍 HTML 代码。

## 页眉

页眉由 Logo、搜索框 和 导航栏组成。

![head](https://cdn.tangjiayan.com/web-douban/head.png)

Logo 和 搜索框 采用左浮动，导航栏 采用右浮动，涉及到浮动就要注意高度坍塌。

### Logo

logo 使用 `<h1>` 元素，以实现 SEO 优化。logo 图片由 `<a>` 元素的 `background` 提供。

```html
<h1>
    <a href="">
        <span>豆瓣网</span>
    </a>
</h1>
```

### 搜索框

搜索框整体采用表单元素 `<form>`，以实现回车搜索功能。它由输入框 `<input>` 和放大镜按钮 `<button>` 组成，放大镜图标采用 `<img>` 元素，用绝对定位放到搜索框内。

```html
<form>
    <input type="text" class="txt" placeholder="书、影、音等">
    <button>
        <img src="media/search.png" alt="">
    </button>
</form>
```

### 导航栏

导航栏可以采用无序列表，也可以采用一系列 `<a>` 元素，这里采用后者，因为前者通常是用于多级导航栏的情况，这里只有一级导航栏。

```html
<nav class="menu right clearfix">
    <a href="" class="menu-book">
        <span>读书</span>
    </a>
    ...
</nav>
```

导航栏显示其实用的是一张精灵图和两张图片：

![anony_nav_logo](https://cdn.tangjiayan.com/web-douban/anony_nav_logo.png)

![ic_shijian_home_nav](https://cdn.tangjiayan.com/web-douban/ic_shijian_home_nav.png)

![ic_read_home_nav](https://cdn.tangjiayan.com/web-douban/ic_read_home_nav.png)

给相应的 `<a>` 元素定位相应的背景图就行了。

## 登录/注册区域

![login-register-area](https://cdn.tangjiayan.com/web-douban/login-register-area.png)

该区域可分为两个部分，一是右边的登录/注册框，二是其他，先说登录/注册框。

### 登录/注册框概览

登录/注册框其实是另一个网页，通过 `<iframe>` 元素嵌入，所以新建一个 `loginframe.html` 文件来写代码。

它分为两个表单和一个二维码登录页面。表单一是 “短信登录/注册”，表单二是 “密码登录”，二者的样式布局差不多，这里只介绍前者。

![login-box-1](https://cdn.tangjiayan.com/web-douban/login-box-1.png)

![login-box-2](https://cdn.tangjiayan.com/web-douban/login-box-2.png)

![login-box-3](https://cdn.tangjiayan.com/web-douban/login-box-3.png)

### 短信/密码 切换选项卡

用两个 `<span>` 就行了。类 `selected` 表示选中时的样式；`left` 和 `right` 分别表示左、右浮动。

```html
<div class="switch-menu clearfix">
    <span class="left selected">短信登录/注册</span>
    <span class="right">密码登录</span>
</div>
```

### 协议声明

协议声明采用一个 `<p>` 元素套上一个 `<a>` 元素。

```html
<p class="txt">
    请仔细阅读
    <a href="">豆瓣使用协议、豆瓣个人信息保护政策</a>
</p>
```

### 手机号及验证码输入框

手机号及验证码输入框用 `<input>` 元素；`获取验证码` 使用绝对定位放到验证码输入框内。

手机号限制最大字符长度 `11`，验证码限制 `6`。

```html
<div class="form-item">
    <input type="text" maxlength="11" placeholder="手机号" class="more-text-indent">
    <div class="region-code">
        <div>
            +86
        </div>
        <div class="choose-area hidden">
        </div>
    </div>
</div>    
<div class="form-item">
    <input type="text" maxlength="6" placeholder="验证码">
    <a href="" class="vertify-code">
        获取验证码
    </a>
</div>
```

### 选择国际区号

叉号用字母 `X`，`hover` 时变色；国家及区号用无序列表，使用 `overflow: auto` 实现滚动条；单独设定选中的类样式，变色并通过背景图加个对号。

![country-code](https://cdn.tangjiayan.com/web-douban/country-code.png)

（找图标时 [iconfont](https://www.iconfont.cn/) 刚好在维护，进不去，就随便找了一个对号图片，将就着看吧）

```html
<div class="choose-area hidden">
    <div class="center">
        <div class="title">
            选择国际区号
            <div class="close">X</div>
        </div>
       
        <ul>
            ...
        </ul>
    </div>
</div>
```

### 登录豆瓣按钮

“登录豆瓣” 用 `<button>` 元素，设置 `disabled` 禁用伪类 css 样式；“收不到验证码” 用 `<a>` 元素，用绝对定位让其靠右。

```html
<div class="form-item">
    <button disabled class="btn">登录豆瓣</button>
</div>
<div class="form-item">
    <span class="no-code">
        <a href="">收不到验证码</a>
    </span>
</div>
```

### 第三方登录

就是文字和图片。

```html
<div class="bottom">
    <span class="msg">第三方登录:</span>
    <a href="">
        <img src="media/wechat.png">
    </a>
    <a href="">
        <img src="media/weibo.png">
    </a>
</div>
```

### 二维码登录页面

也是文字和图片。

```html
<div class="code-login" hidden>
    <div class="title">
        二维码登录
    </div>
    <div class="code">
        <img src="media/qrcode.png" alt="">
    </div>
    <div class="tip">
        请打开豆瓣 App 扫一扫或 <a href="">短信登录验证</a>
    </div>
</div>
```

### 右上角切换图标

其实就是两张图片，通过背景图放在 `<i>` 元素上。

![switch-pc](https://cdn.tangjiayan.com/web-douban/switch-pc.png)

![switch-qrcode](https://cdn.tangjiayan.com/web-douban/switch-qrcode.png)

```html
<div class="switch">
    <!-- <i class="icon switch-qrcode"></i> -->
    <i class="icon switch-pc"></i>
</div>
```

另外，切换图标在鼠标 `hover` 时会提示 “扫码登录” / “短信登录/注册”，用一个属性默认为 `hidden` 的元素，css 中通过 `.switch:hover+.pointer.tip` 设置 `display` 为 `block` 即可。

```html
<div class="pointer" hidden>
    <span>扫码登录</span>
    <!-- <span>短信登录/注册</span> -->
</div>
```

### 其他

登录注册框以外的区域 html 代码如下。

```html
<div class="banner">
    <div class="container clearfix">
        <iframe src="loginframe.html" frameborder="0" class="right login-box"></iframe>
        <div class="download right">
            <h1 class="title">
                豆瓣
                <span>7.0</span>
            </h1>
            <div class="download-btn left">
                <button class="btn">下载豆瓣 App</button>
            </div>
            <div class="qrcode">
                <img src="media/icon_qrcode_green.png" alt="">
                <div class="image" hidden>
                    <img src="media/qrcode.png" alt="" >
                    <p>iOS / Android 扫码直接下载</p>
                </div>
            </div>
        </div>
    </div>
</div>
```

至此登录注册框就完事了，在 `index.html` 中通过 `<iframe>` 调用就行。

## 分栏

纵览之后的区域，可以发现它们都是由左/右边栏和主区域构成，因此事先大概写好统一样式，包括左/右浮动和盒子尺寸，写到各区域时用到什么就放什么。

另外，主区域为了避开左右浮动的盒子，通过 `overflow: hidden` 创建 BFC。

## 隔行变色

每一区域是灰白交替变色的。

每一区域类名为 `section`，然后用 css 的 `nth-child` 伪类选择器即可。

```css
.section:nth-child(even) {
    background: #f7f7f7;
}
```

## 热点内容

![hot-area](https://cdn.tangjiayan.com/web-douban/hot-area.png)

由主区域和右边栏构成，先说右边栏。

广告内容就是图片和文字。

```html
<div class="ad">
    <a href="">
        <img src="media/ad.png" alt="">
    </a>
    <span>广告</span>
</div>
```

对于广告下面的 “热门话题”，观察网页的内容会发现，这种列表样式多次被用到，因此可以写个公用的样式。

首先是热门话题的标题，需要注意的是 “去话题广场” 前后括号的添加，当然可以在 html 代码中直接添加，这里采用 `.link::before` 和 `.link::after` 来添加，通过这种方式添加需要注意不要通过 `<a>` 元素的类样式来添加前后括号，因为这样 `hover` 时括号也会变色。

“热门话题” 之后的 6 个圆点也是采用 `.title::after` 添加的。

```html
<div class="section-title">
    <h3 class="title">热门话题</h3>
    <span class="link">
        <a href="">去话题广场</a>
    </span>
</div>
```

然后是热门话题的列表，如果想考虑万全的话可以加个 `word-break: break-all`，以防止一大串英文时不换行。

```html
<ul class="hot-list">
    <li>
        <div class="title">
            <a href="">Lorem ipsum dolor sit.</a>
        </div>
        <div class="desc">
            <span>XXX万次浏览</span>
        </div>
    </li>
    ...
</ul>
```

接着就是主区域内容了。首先是其标题，这时就可以引用上面说过的公用样式了。

```html
<div class="section-title">
    <h3 class="title">热点内容</h3>
    <span class="link">
        <a href="">更多</a>
    </span>
</div>
```

主区域的内容分为两部分：左边的图像及描述，右边的文字列表。

左边的图像框为了对齐，设置为 `inline-block`，并使用垂直顶部对齐 `vertical-align: top`。

```html
<div class="left">
    <ul>
        <li>
            <div class="img">
                <a href="">
                    <img src="media/marco.jpg" alt="">
                </a>
            </div>
            <div class="words">
                <a href="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, reprehenderit?</a>
                <span>XX张照片</span>
            </div>
        </li>
        ...
    </ul>
</div>
```

右边的文字列表用 `<ul>` 和 `<li>`。

```html
<div class="right">
    <ul>
        <li>
            <a href="">Lorem.</a>
            <div class="title">
                Lorem的日记
            </div>
            <div class="desc">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, sed?
            </div>
        </li>
        <li><a href="">Lorem ipsum dolor sit amet.</a></li>
        ...
    </ul>
</div>
```

## 豆瓣时间

由左边栏和主区域构成。

![time](https://cdn.tangjiayan.com/web-douban/time.png)

```html
<div class="section">
    <div class="container clearfix">
        <div class="aside-left">
            <h2 class="title time-title">
                <a href="" class="dark-color">豆瓣时间</a>
            </h2>
        </div>
        <div class="main ">
            <div class="section-title">
                <h3 class="title">热门专栏</h3>
                <span class="link">
                    <a href="">更多</a>
                </span>
            </div>
            <div class="time-main">
                <ul>
                    <li>
                        <div class="img">
                            <a href="">
                                <img src="media/time-content.jpg" alt="">
                            </a>
                        </div>
                        <div class="words">
                            <a href="">Lorem.</a>
                            <span>
                                音频专栏
                            </span>
                        </div>
                    </li>
                    ...
                </ul>
            </div>
        </div>
    </div>
</div>
```

## 电影

由左边栏、主区域和右边栏构成。

![movie](https://cdn.tangjiayan.com/web-douban/movie.png)

左边栏需要注意的有两点，一是 “&” 符号用字符实体 `&amp;` 书写；二是有的元素后面有个 `new` 的图片，这里通过 `a.new::after` 添加背景图。

```html
<div class="aside-left">
    <div class="title">
        <h2>
            <a href="">电影</a>
        </h2>
    </div>
    <ul class="left-menu">
        <li>
            <a href=""> 影讯&amp;购票 </a>
        </li>
        <li>
            <a href="" class="new">选电影</a>
        </li>
        ...
    </ul>
</div>
```

右边栏中，近期热门的电影列表采用有序列表 `<ol>`，但一般的重置样式表会把序号重置掉，所以要设置 `list-style-type: decimal`，还有编号的位置 `list-style-position: inside`。

```html
<div class="aside-right movie-area">
    <div class="section-title">
        <h2 class="title">影片分类</h2>
        <span class="link">
            <a href="">更多</a>
        </span>
    </div>
    <ul class="right-menu-list clearfix">
        <li><a href="">爱情</a></li>
        <li><a href="">剧情</a></li>
        ...
    </ul>
    <div class="section-title" style="margin-top: 30px;">
        <h2 class="title">近期热门</h2>
        <span class="link">
            <a href="">更多</a>
        </span>
    </div>
    <ol class="order-movie-list">
        <li><a href="">瞬息全宇宙</a></li>
        <li><a href="">目中无人</a></li>
        ...
    </ol>
</div>
```

主区域中，评分的星星用的是精灵图，它在整个豆瓣网站中肯定是通用样式，所以写到 `common.css` 里。

![ic_rating_s](https://cdn.tangjiayan.com/web-douban/ic_rating_s.png)

```html
<div class="main">
    <div class="section-title">
        <h2 class="title">正在热映</h2>
        <span class="link">
            <a href="">更多</a>
        </span>
    </div>
    <div class="movie-area">
        <ul class="item-list">
            <li>
                <div class="img">
                    <a href="">
                        <img src="media/inception.webp" alt="">
                    </a>
                </div>
                <div class="words">
                    <a href="" class="dark-color">盗梦空间</a>
                </div>
                <div>
                    <span class="star star00"></span>
                    <span class="num">0.0</span>
                </div>
                <div class="button">
                    <a href="" class="block-link">选座购票</a>
                </div>
            </li>
            ...
        </ul>
    </div>
</div>
```

`选座购票` 按钮的样式在下面的 “读书” 区域中的 `免费试读` 也有用到，可以做个通用样式。

## 小组、读书

![group](https://cdn.tangjiayan.com/web-douban/group.png)

![read](https://cdn.tangjiayan.com/web-douban/read.png)

用上面写过的样式稍作修改即可，不放代码了。

对于小组主区域的文字内容，当文字很多时，为了避开浮动的图片盒子，通过 `overflow: hidden` 创建为 BFC。

豆瓣阅读以及之后的 app 图标用的是精灵图：

![app_icons_50_10](https://cdn.tangjiayan.com/web-douban/app_icons_50_10.jpg)

另外，图标右边和下边的阴影，涉及到 CSS3 的 [box-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow) 属性。

## 音乐

![music](https://cdn.tangjiayan.com/web-douban/music.png)

对于右边栏的序号，如果使用 `<ul>` 自带的序号，会不太好调整序号垂直位置的 css 样式，所以这里直接用 `<span>` 元素打出来。

音乐人列表的每一项内容，为了排成一行，可以采用左右浮动，也可以采用行块盒，这里用前者。

另外，“音乐人” 的图片 `hover` 时会有个播放图标蒙层，这里我使用 svg 练习一下。

```html
<svg t="1656150422962" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5657" width="50" height="50">
    <path d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z" fill="#fff" p-id="5658"></path>
</svg>
```

豆品、同城 和上面差不多，略。

## 页脚

![footer](https://cdn.tangjiayan.com/web-douban/footer.png)

一个 `div.left` 和 一个 `div.right` 就完事。
两个小图标要 `vertical-align: middle`。

## 总结

前端是个细活，有 1px 那么细。
