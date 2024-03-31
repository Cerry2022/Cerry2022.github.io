---
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css
---

# 基于 Simulink 的 SVPWM 仿真

这是我大四上学期一节实验课的内容。

参考自：

- [彻底搞懂两电平SVPWM调制原理及其仿真_木修于淋_bilibili](https://www.bilibili.com/video/BV1o3411b7j7)
- [Matlab利用simulink搭建SVPWM_第一部分_机灵的大不懂_bilibili](https://www.bilibili.com/video/BV12z411v74s)
- [Matlab利用simulink搭建SVPWM_第二部分_机灵的大不懂_bilibili](https://www.bilibili.com/video/BV1xK411s7iN)

结合了两位 up 主的方法，搭建了一个 MATLAB / Simulink 下的 SVPWM 仿真模型。

## 模型概览

![overview](https://cdn.tangjiayan.com/simulink-svpwm/overview.png)

## SVPWM 简介

交流电动机需要输入三相正弦电流的最终目的是在电动机空间形成 <span style="color:red;">圆形旋转磁场</span>，从而产生恒定的电磁转矩。

以终为始，以圆形旋转磁场为目标，控制逆变器的工作，这种控制方法就叫做 **磁链跟踪控制**，它是基于电压空间矢量实现的，所以又称 **电压空间矢量 PWM**（Space Vector PWM，<span style="color:red;">SVPWM</span>）。

具体计算就不详细介绍了，可参见 [SVPWM算法原理及详解_丘木木_CSDN](https://blog.csdn.net/qlexcel/article/details/74787619)。

## 3/2 变换

根据电压空间矢量的定义，交流电动机定子的三相绕组电压矢量在空间互差 $\frac{2\pi}{3}$，为了方便进行扇区判断，这里采用 3/2 变换将三相坐标系映射到两相坐标系中。

3/2 变换的公式是：

$$
\begin{bmatrix}
   u_\alpha \\
   u_\beta
\end{bmatrix}
=
C_{2/3}
\begin{bmatrix}
   u_a \\
   u_b \\
   u_c
\end{bmatrix}
$$

其中

$$
C_{2/3}
=
\sqrt{\frac{2}{3}}
\begin{bmatrix}
1 & -\frac{1}{2} & -\frac{1}{2}\\
0 & \frac{\sqrt{3}}{2} & -\frac{\sqrt{3}}{2}
\end{bmatrix}
$$

据此可搭出：

![3-2](https://cdn.tangjiayan.com/simulink-svpwm/3-2.png)

不过其实 SIMULINK 有提供现成的 3/2 变换模块：

![3-2-simulink](https://cdn.tangjiayan.com/simulink-svpwm/3-2-simulink.png)

这里输出的 0 用不上，可以接个 Terminator。

![3-2-simulink-terminator](https://cdn.tangjiayan.com/simulink-svpwm/3-2-simulink-terminator.png)

## 将两相坐标转化为极坐标

为了得到电压矢量的角度，以用来判断扇区，需要将两相坐标转化为极坐标。

转化方法：角度是 arctan，模长是平方和开根号（模长在该模型中用不上，这里就是顺便计算一下）。

![2phase-to-polar](https://cdn.tangjiayan.com/simulink-svpwm/2phase-to-polar.png)

## 扇区计算

有了极坐标系下的角度，就可以进行扇区判断了。

0 – 60° 就是扇区Ⅰ，60° – 120° 就是扇区Ⅱ……依次类推。

![sector-calculate](https://cdn.tangjiayan.com/simulink-svpwm/sector-calculate.png)

目前为止，可以接个示波器简单验证一下已经搭建的模型是否正确：

![mid-test-simulink](https://cdn.tangjiayan.com/simulink-svpwm/mid-test-simulink.png)

效果

![mid-test-result](https://cdn.tangjiayan.com/simulink-svpwm/mid-test-result.png)

## 作用时间计算

公式：

$$
t_1 = msin(\frac{\pi}{3} - \theta)
$$

$$
t_2 = msin\theta
$$

但是不知道为什么，我用这个公式搭出来的仿真结果不正确，而用另一套等价的公式一次性就正确了。所以我用的是这套等价的公式：

![effect-time-equivalent](https://cdn.tangjiayan.com/simulink-svpwm/effect-time-equivalent.png)

SIMULINK 搭建：

![effect-time-simulink](https://cdn.tangjiayan.com/simulink-svpwm/effect-time-simulink.png)

## 调制波计算

有了各扇区内两个矢量的作用时间，就可据此与三角载波的关系计算出调制波了。

采用零矢量分散的实现方法。可通过三角形相似定理计算，以第Ⅰ扇区为例：

![modulation-wave-handwriting](https://cdn.tangjiayan.com/simulink-svpwm/modulation-wave-handwriting.jpg)

![modulation-wave-calculation](https://cdn.tangjiayan.com/simulink-svpwm/modulation-wave-calculation.png)

这里的 `Vta`、`Vtb`、`Vtc` 分别相当于 `Sa`、`Sb`、`Sc`。

容易发现计算结果是有规律的。

其他扇区也同理，有规律可循。最终计算结果：

![modulation-wave-result](https://cdn.tangjiayan.com/simulink-svpwm/modulation-wave-result.png)

据此可搭出 SIMULINK 模型：

![modulation-wave-simulink](https://cdn.tangjiayan.com/simulink-svpwm/modulation-wave-simulink.png)

观察一下调制波波形：

![modulation-wave-test-simulink](https://cdn.tangjiayan.com/simulink-svpwm/modulation-wave-test-simulink.png)

![modulation-wave-test-wave](https://cdn.tangjiayan.com/simulink-svpwm/modulation-wave-test-wave.png)

## 触发脉冲计算

有了调制波，将它和三角载波进行比较就能得到逆变桥所需的触发脉冲信号了。

![trigger-pulse](https://cdn.tangjiayan.com/simulink-svpwm/trigger-pulse.png)

至此，SVPWM 的主要工作就做完了。接下来是将触发脉冲应用到逆变桥中进行验证。

## 逆变器验证

![inverter-verification-simulink](https://cdn.tangjiayan.com/simulink-svpwm/inverter-verification-simulink.png)

三相线电压波形：

![line-voltage](https://cdn.tangjiayan.com/simulink-svpwm/line-voltage.png)

验证成功。

## 相关参数

![parameter-f-Ts-Vdc-m](https://cdn.tangjiayan.com/simulink-svpwm/parameter-f-Ts-Vdc-m.png)

`f` 表示开关频率（采样频率），`Ts` 表示开关周期（采样周期），`Vdc` 表示直流母线电压，`m` 表示作用时间的系数，其含义相当于利用率。

`Ts` 体现在三角载波：

![parameter-Ts](https://cdn.tangjiayan.com/simulink-svpwm/parameter-Ts.png)

`Vdc` 体现在逆变桥的直流电压输入：

![parameter-Vdc](https://cdn.tangjiayan.com/simulink-svpwm/parameter-Vdc.png)

`m` 体现在输入的标准三相正弦信号，m = sqrt(3)*380/Vdc，其中 `380` 表示期望输出的相电压幅值：

![parameter-m](https://cdn.tangjiayan.com/simulink-svpwm/parameter-m.png)

![line-voltage-expand](https://cdn.tangjiayan.com/simulink-svpwm/line-voltage-expand.png)

理论输出线电压幅值是 380 * sqrt(3) ≈ 658，可见结果符合。

## 与 SPWM 相比较

### SVPWM

![svpwm-fundamental](https://cdn.tangjiayan.com/simulink-svpwm/svpwm-fundamental.png)

`fundamental` = `520.8`

### SPWM

![spwm-fundamental](https://cdn.tangjiayan.com/simulink-svpwm/spwm-fundamental.png)

`fundamental` = `451`

520.8 / 451 ≈ 1.15 ，可见 SVPWM 相比于普通的 SPWM，电压输出提高了约 15% 。
