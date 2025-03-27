---
date: 2024-09-19
title: hp_calc 栏目总说明
category: 主题
tags:
  - hpcalc
description: 惠普图形计算器专栏
---
# 栏目总说明

## HP-39GS
HP-39GS（代号：F2223A）是HP-39G+的进一步改进版本，于2006年6月发布。
### 硬件信息
*  CPU：三星S3C2410X，75MHz，ARM架构
要注意的是，尽管采用了ARM架构的处理器，然而HP-39GS的操作系统和程序仍然是Saturn架构的---这块ARM处理器实际上是在运行一个Saturn模拟器。这种方式极大地浪费了硬件性能，导致计算器运行缓慢---即便是像对整数开平方根这种简单运算也往往需要超过0.3秒才能完成。

*  RAM：256KB
*  屏幕：131*64分辨率，黑白液晶屏幕
*  通讯：USB接口，并重新启用红外通讯和RS232串口通讯功能
*  供电：4节AAA电池作为主电池，一枚CR2032电池作为记忆保护电池
*  特色功能：蜂鸣器和简单的代数运算功能
该机采用了可刷写的ROM，用户可以对计算器的操作系统进行升级。

HP-39GS附赠保护盖。

### HP-39GII
HP-39GII（代号：NW249AA）是HP-39GS的大幅度改进版本（'''然而，计算功能上并没有实质上的改进''')，于2011年10月发布。

HP-39GII具有如下特点：

*  采用了80MHz的飞思卡尔处理器（ARM架构），并采用了为适应ARM架构而全新设计的操作系统，不再以Saturn模拟器方式运行，极大地提高了运算速度；
*  ROM容量大幅增加至128MB（其中用户可用空间为80-105MB）；
*  采用灰阶液晶显示屏，分辨率增加到256 * 127像素；
*  操作系统带有全中文界面。
### 硬件信息
*  CPU：飞思卡尔处理器，80MHz，ARM架构

该机已不再采用Saturn模拟器，因此运行效率远高于前几代HP-39系列产品。
*  RAM：256KB
*  ROM：128MB（其中用户可用空间为80-105MB）
*  屏幕：256 * 127分辨率，灰阶液晶屏幕
*  通讯：Mini-USB接口-－－红外通讯和串口通讯功能被去掉
该机采用了可刷写的ROM，用户可以对计算器的操作系统进行升级，并可在ROM内存储用户数据。

与此同时，HP-39GII无蜂鸣器。




## 分享一点点自己写的代码
:::
Blib：一个带简单压缩算法的图像保存和加载库，可以将2bit色深的`灰度图像`保存为`字符编码`。
:::info 技术细节
使用两段文本区域分别保存`可压缩图像`和`不可压缩图像`，`可压缩图像`对应字符区域偏移量1000，不可压缩图像对应字符区域偏移量200；
图像保存顺序为水平扫描，每4像素为一组，不够4像素空位替代，每组需要2^4=16bit，正好是`hp39gii`的文本编码(Unicode 16)存储一个字符所需的位大小。
扫描过程中对于超过4像素的连续为一个颜色的像素条(连续的一列像素)，将保存为压缩格式，长度最长为64。
在读取时，对于`不可压缩图像`采用`PIXON_P`函数逐像素点绘制，对于`可压缩图像`采用`LINE_P`函数一次性绘制。

实测读取图像并绘制到屏幕上速度较快（~~相比LsLib~~）

## Blib代码
```bash
EXPORT BLOAD(G,X,Y,d)
  BEGIN
  LOCAL D,Dl:=dim(d(3)),N,I,Px:=X,Py:=Y,c,ch;
  //2021.12.10 BLOAD(Grob,StartX,StartY,Data)
  //d:={Width,Hight,Data}
  FOR D FROM 1 TO Dl DO
    TRACE(asc(mid(d(3),D,1)))►ch;
    IF ch≥1000 THEN
      ch:=ch-1000;N:=ch MOD 64;c:=(ch-N)*.015625;
      LINE_P(G,Px,Py,Px+N,Py,c);
    ELSE
     ch:=ch-200;
     IF Px+3≥X+d(1) THEN
       X+d(1)-Px-1►N;
     ELSE 3►N;
     END;
     FOR I FROM 0 TO N DO
       ch MOD4►c;.25*(ch-c)►ch;PIXON_P(G,Px+I,Py,c);
     END;
     END;
     Px+N+1►Px;
     IF Px≥X+d(1) THEN Py+1►Py;X►Px;END;
   END;
END;
  
EXPORT BSAVE(G,X,Y,W,H)
  BEGIN
  //2021.12.8
  //LINE 1000Start 64Pix
  //PIX 4Pix 4Color
  LOCAL N,I,Px,Py,c,ch:="";
  FOR Py FROM Y TO Y+H-1 DO
    X►Px;
    WHILE Px+1≤X+W DO
      GETPIX_P(G,Px,Py)►c;
      FOR N FROM 1 TO 64 DO
        IF GETPIX_P(G,Px+N,Py)≠c OR Px+N≥X+W OR N=64 THEN
          IF N≤4 THEN
            IF Px+N<X+W THEN 4►N;END;
            FOR I FROM 1 TO N-1 DO
              c:=c+4^I*GETPIX_P(G,Px+I,Py);
            END;
            ch:=ch+char(200+c);
          ELSE ch:=ch+char(1000+64*c+N-1);
          END;
          Px:=Px+N;BREAK;
        END;//IF
      END;//N
    END;//Px
  END;//Py
RETURN {W,H,ch};
END;
  
//{32,32,"ӇҲϲұҰ϶үүϲƽƻҬҭĘĘЬҭƸćҬńƟҳƉćǇńҸÉćǇńҷÉǄćƧҷÉƸƗƿҷÉƈƗƿҸÍĸƻƧҹÉÈƻħŇҬǅƋÉÈƻçåŅĥƍϯƻçŅƋҬǄϮƻħćÔƸƻËÈƛŇƗҭƈËϭċҭǄүϱËǅćҲϰËƼćұϱËĘǁøҭϱËϬǅãҬϱ×ϬǅþǇƈϭË×ϭŅüÔÔϬËćϮÑƼÌϮ×ǇϯÉŅϭË×ǇϴÝÈËćҬϴÉøƸ×ҭϲÙÔƸćүϰËËҮҰϰËƸҭҲϲұ"}
```
