# MATLAB 拼图游戏设计

这是我大三上学期《自动化软件工具》这门课的结课作业，也就是用 MATLAB 做一个项目出来。

参照 [基于MATLAB的拼图游戏设计_思绪无限_CSDN](https://wuxian.blog.csdn.net/article/details/79219110)，通过 `.m` 文件编程做了个拼图游戏。

Github：[tangjan/MATLAB_jigsaw](https://github.com/tangjan/MATLAB_jigsaw)

这里的拼图指的是华容道式的拼图，不过每次只能移动一块拼图。

![shuzi-huarongdao](https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/shuzi-huarongdao.jpg)

## 分割拼图

首先要准备一张正方形图片用来拼，这里就拿我就读的中国矿业大学校徽作为对象。

校徽图片的宽度和高度都是 300 像素。因此，该 jpeg 图片在 MATLAB 工作区中的储存形式是一个 `300*300*3` 的矩阵。其中，`300*300` 表示像素点的个数，`3` 表示以 RGB 的数组形式储存像素点的颜色。

比如，这里我制作了一张只有一个白色像素点的图片（用 mspaint 制作的），在 MATLAB 中使用 `imread` 函数来读取这张图片，显示出数组信息如图：

![1-pixel-info](https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/1-pixel-info.png)

`(255，255，255)` 即表示白色

接下来，为便于解释，现把整个图片分为 9 个部分，编号如图所示：

![cumt-numbering](https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/cumt-numbering.png)

其中最后一个位置用作空白块，所以为了显示出其特殊性，编号为 0 而非编号为 9。这样一来，运行 `x1 = image(1:100, 1:100, :)` 赋值语句之后，`x1` 即是表示 拼图块1 的矩阵。

同理，有：

```matlab
x2 = image(1:100, 101:200, : );     %拼图块2矩阵数据
x3 = image(1:100, 201:300, : );     %拼图块3矩阵数据
x4 = image(101:200, 1:100, : );     %拼图块4矩阵数据
x5 = image(101:200, 101:200, : );   %拼图块5矩阵数据
x6 = image(101:200, 201:300, : );   %拼图块6矩阵数据
x7 = image(201:300, 1:100, : );     %拼图块7矩阵数据
x8 = image(201:300, 101:200, : );   %拼图块8矩阵数据
x0 = image(201:300, 201:300, : );   %拼图块0矩阵数据
```

可使用 `axis on` 函数显示出横纵坐标帮助理解：

![axis-on](https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/axis-on.png)

接下来定义一个从原图中分割拼图块并标记编号的函数，不妨命名为 `split(image, index)`，其中 `image` 为原图的数据矩阵，`index` 为要选择的拼图块的编号。`split` 函数的输出为矩阵 `x`，是序号为 `index` 的拼图块的数据矩阵。

比如，运行语句 `x5 = split(image, 5);` 后，`x5` 即表示校徽图片的最中央的拼图块的数据矩阵。

`split` 函数内容如下：

```matlab
function x = split(image, index)
  if index > 0  %拼图块1~8
    % 计算出行数 row 以及列数 column
    row = fix((index-1) / 3);  % fix 表示向零方向取整
    column = mod(index-1, 3);
    x = image(1+row*100 : 100*(row+1), 1+column*100 : 100*(column+1), :);
  else  %拼图块0
    x = uint8(255 * ones(100,100,3));
  end
```

## 按编号矩阵显示拼图

一幅拼图可以由一个 `3*3` 的矩阵 `A` 来表示，接下来编写一个根据编号矩阵显示对应拼图情况的函数，命名为 `drawmap(A)`，代码如下

```matlab
function drawmap(A)
    origin = imread('jigsawImage.jpeg');
    image = origin;
    for row = 1:3   % 根据编号矩阵A构建要显示的拼图数据矩阵image
      for col = 1:3
        image(1+(row-1)*100 : 100*row, 1+(col-1)*100 : 100*col, : ) = split(origin, A(row,col));
      end
    end
    imshow(image)  % 显示拼图
```

比如，假设矩阵 `A` 为

![assuming-drawmap](https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/assuming-drawmap.png)

则运行 `drawmap(A)` 可得到：

![drawmap](https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/drawmap.png)

## 移动拼图

移动拼图的过程是：点击空白处旁的拼图，则拼图将移动到空白处。而拼图块和空白块的相对位置只有四种，即上下左右四种位置，按照这个想法，定义函数为 `function tag = movejig(tag, row, col)`。其中，`tag` 表示当前拼图的编号矩阵，`row` 和 `col` 分别表示鼠标点击位置的行数和列数，输出为移动后得到的编号矩阵。

```matlab
function tag = movejig(tag, row, col)
% 4 个 if 分 4 种情况对不同位置处的点坐标与矩阵行列式统一
  num = tag(row, col);
  % 鼠标位置与号码牌一致
  if (row&gt;1) &amp;&amp; (tag(row-1, col)==0)
  % 点击位置在第 2 或 3 行，空白块在点击位置的上一行  
    tag(row-1, col) = num;
    tag(row, col) = 0;
  end

  if (row&lt;3) &amp;&amp; (tag(row+1, col)==0)
  % 点击位置在第 1 或 2 行，空白块在点击位置的下一行
    tag(row+1, col) = num;
    tag(row, col) = 0;
  end

  if (col&gt;1) &amp;&amp; (tag(row, col-1)==0)
  % 点击位置在第 2 或 3 列，空白块在点击位置的左边一列
    tag(row, col-1) = num;
    tag(row, col) = 0;
  end

  if (col&lt;3) &amp;&amp; (tag(row, col+1)==0)
  % 点击位置在第 2 或 3 列，空白块在点击位置的右边一列
    tag(row, col+1) = num;
    tag(row, col) = 0;
  end
```

## 打乱拼图

这里需要注意，不可以使用 `rand` 函数生成一个由数字 0~8 随机排列构成的 3*3 的矩阵作为拼图矩阵，因为那样生成的矩阵大概率无法还原为原图，这在数学上是有证明的。

这里采取另一种想法来打乱拼图，即随机移动初始拼图使其打乱。取循环 `400` 次（也可以更多，但 400 次已经足够了），每次使用 `rand` 函数随机生成模拟点击的行列数，然后调用上述定义的 `movejig` 函数进行移动。定义函数为 `function y = Disrupt()`，代码如下

```matlab
function y = Disrupt()  
%随机打乱原拼图排列顺序
  y =[1,2,3; 4,5,6; 7,8,0];  %原始的拼图矩阵
  for i = 1:400
    row = randi([1,3]);
    col = randi([1,3]);
    y = movejig(y, row, col);  
  end
```

## 拼图主函数和回调函数

主函数是一个整合中心，用来整合调用各已定义好的子函数。

另外，很明显主函数需要重复获得鼠标点击时的位置坐标来进行拼图游戏，也要有游戏胜利的终止条件。这里采用 `figure` 的 `WindowButtonDownFcn` 属性，MATLAB 官方文件中对其介绍如下：

![WindowButtonDownFcn](https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/WindowButtonDownFcn.png)

据此可以结合 `set` 函数、`gcf` 图形句柄和函数句柄定义一个获取鼠标点击坐标的回调函数。当在图上按下鼠标左键的时候，就自动执行回调函数来获取坐标值，同时在回调函数中判断游戏是否胜利。

主函数：

```matlab
function jigsaw()
%主函数
  Tag_A = Disrupt(); %获得打乱好的拼图编号矩阵
  drawmap(Tag_A);    %按照编号矩阵显示拼图
  global Tag;        %Tag是游戏过程中的拼图编号矩阵，定义为全局变量以方便参 数传递
  Tag = Tag_A;
  set(gcf, 'WindowButtonDownFcn', @ButtonDownFcn);
  %点击鼠标时调用ButtonDownFcn函数
```

回调函数：

```matlab
function ButtonDownFcn(src,event)
%回调函数，鼠标点击事件发生时调用
  pt = get(gca, 'CurrentPoint'); %获取当前鼠标点击位置坐标
  xpos = pt(1,1);                %鼠标点击处的横坐标实际值
  ypos = pt(1,2);                %鼠标点击处的纵坐标实际值
  col = ceil(xpos/100);          %将横坐标值转换为列数,ceil表示向无穷大方向取整
  row = ceil(ypos/100);          %将纵坐标值转换为行数
  global Tag;                    %全局变量声明
  if(col &lt;= 3 &amp;&amp; col &gt; 0) &amp;&amp; (row &lt;= 3 &amp;&amp; row &gt; 0) %鼠标点击位置在有效范围内    
    Tag = movejig(Tag, row, col);      　　　　　 %按点击位置移动拼图
    drawmap(Tag)                     %显示拼图
    order = [1 2 3; 4 5 6; 7 8 0];   %原图的编号矩阵
    zt = abs(Tag - order);           %比较两个矩阵,要加绝对值
    if sum(zt(:)) == 0               %与原图已吻合
　      image = imread('jigsawImage.jpeg');
　      imshow(image)                %游戏完成，显示全图
　      msgbox('恭喜完成！')  
　      pause(1);        
　      close all
    end
  else
      return
  end
```

至此，拼图游戏设计完成。

## 结果分析

点击运行程序，会显示打乱好的拼图：

![broken-jigsaw](https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/broken-jigsaw.png)

点击空白块旁边的拼图，会移动拼图块：

![click-jigsaw](https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/click-jigsaw.png)

完成拼图后会提示 “恭喜完成”：

![complete-jigsaw](https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/complete-jigsaw.png)

稍作修改，也可以将该程序改为 4*4、5*5、……的拼图游戏。主要需要修改循环次数、行列数、行列计算公式、原始数据矩阵等，disrupt 函数中的随机点击的次数也应适当增加。我做了个 `10*10` 的拼图游戏，效果如图:

![10%2A10-jigsaw](https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/10%2A10-jigsaw.png)

另外，结合 `tic toc` 指令，可以实现游戏计时功能：

![tic-toc](https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/tic-toc.png)
