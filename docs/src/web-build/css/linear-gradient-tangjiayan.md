# CSS linear-gradient 渐变色

偶然了解到了 CSS 的 [linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_images/Using_CSS_gradients)，于是想用它将「糖加盐」进行字体渐变渲染。

效果：
<p class="jan">糖加盐</p>

CSS：

```css
.jan{
    background: linear-gradient(to right, #39C5BB, #EE0000);
    -webkit-background-clip: text;
    color: transparent;
}
```

[-webkit-background-clip: text](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip#values) 表示将背景剪切绘制在前景文字上。

color: [transparent](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color#transparent) 表示 `rgba(0,0,0,0)`，= `#00000000`，将字体的颜色设为透明。

`#39C5BB` <span class="miku"></span> 是 MIKU 的 [苍绿色](https://piapro.net/intl/zh-cn_character.html)，`#EE0000` <span class="yzl"></span> 是 乐正绫的 [阿绫红](https://zh.moegirl.org.cn/zh-hans/%E9%98%BF%E7%BB%AB%E7%BA%A2)。

<figure>
<img style="text-align:center;" src="https://piapro.net/intl/images/ch_img_miku.png" alt="">
<img src="https://cdn.tangjiayan.com/notes/common/YUEZHENGLING.png" alt="">
</figure>

图片分别来自 [piapro](https://piapro.net/intl/zh-cn_character.html)、[萌娘百科](https://zh.moegirl.org.cn/%E4%B9%90%E6%AD%A3%E7%BB%AB) 。

参考：

* [background-clip - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip)
* [通过CSS实现 文字渐变色 的两种方式 - 前端简单说 - SegmentFault 思否](https://segmentfault.com/a/1190000011882933)
* [Extending the Default Theme | VitePress](https://vitepress.dev/guide/extending-default-theme#customizing-css)
