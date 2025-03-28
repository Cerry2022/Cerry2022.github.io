---
date: 2025-03-28
title: 简单的多恒星单体模拟
category: hp39gii
tags:
  - hp39gii
description: 简单的多恒星单体模拟，可生成速度变化信息，占用L1，使用GG(X)函数查看
---
MyW：简单的多恒星单体模拟，可生成速度变化信息，占用L1，使用GG(X)函数查看。
![left|240](/posts/files/Pasted%20image%2020250328152439.png)
使用函数GG(X)绘制速度变化信息
![left|240](/posts/files/Pasted%20image%2020250328152555.png)

源文件：

```vb
EXPORT GG(X)
BEGIN
RETURN (L1(INT(X*16))+L1(INT(X*16+1)))/2;
END;


EXPORT MyW()
BEGIN
LOCAL Starsl:={{−50,0,200},{50,0,100},{0,50,200}},Starl,N1,N2;
LOCAL X,Y:=−32,Vx:=√(25/8),Vy:=1,Fx,Fy,Ml;
LOCAL Mx,My;
LOCAL Dt:=0.05;
RECT();
BLOAD(G0,128-16,64-16,L5);
0►T;
WHILE 1 DO
T:=1+T;IF T MOD 16==0 THEN
√(Vx²+Vy²)►L1(T/16+1)END;
0►Mx;0►My;
FOR N1 FROM 1 TO SIZE(Starsl) DO
Starsl(N1)►Starl;
Ml:=Starl(3)*((Starl(1)-X)²+(Starl(2)-Y)²)^−1.5;
Mx:=Mx+(Starl(1)-X)*Ml;
My:=My+(Starl(2)-Y)*Ml;
END;
Vx:=Vx+(Mx+Fx)*Dt;Vy:=Vy+(My+Fy)*Dt;
X:=X+Vx*Dt;Y:=Y+Vy*Dt;
PIXON_P(X+128,Y+64);
END;

END;

END;

```