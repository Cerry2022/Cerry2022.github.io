# 配置 STM32F103C8T6 最小系统板 PC13 寄存器点亮板载 LED 灯

本笔记的主要目的是 <span style="color:red">复习 Keil5 的基本使用</span> 以及拾回本科电赛时的记忆。

基于寄存器进行编程的方式是不推荐的，因为寄存器太多了，编辑起来很麻烦，更多是用库函数的方式进行嵌入式开发的。

Keil5 的安装和破解就不叙述了。

## 目标

![overview](https://cdn.tangjiayan.com/notes/embeded/stm32-light/overview.png)

![stm32-stlink](https://cdn.tangjiayan.com/notes/embeded/stm32-light/stm32-stlink.jpg)

## 在电脑上创建工程文件夹

在电脑上找个地方创建一个 Keil5 工程文件夹，文件夹的名字表明这个项目的内容。

我创建为 `stm32-light`。

![create-folder](https://cdn.tangjiayan.com/notes/embeded/stm32-light/create-folder.png)

## Keil5 创建工程

### New μVision Project

点击 `Project` - `New μVision Project` 创建一个新工程：

![new-project](https://cdn.tangjiayan.com/notes/embeded/stm32-light/new-project.png)

::: info

我这里出现了乱码，其中的 `?` 应是 `μ`。
乱码原因待深究。

:::

工程文件命名为比较通用的 `Project`：

![new-project-naming](https://cdn.tangjiayan.com/notes/embeded/stm32-light/new-project-naming.png)

### Select Device

然后是 Select Device 环节，选择 `STM32F108C8`：

![new-project-device-select](https://cdn.tangjiayan.com/notes/embeded/stm32-light/new-project-device-select.png)

### Manage Run-Time Environment

之后弹出的 `Manage Run-Time Environment` 环节可以关掉跳过：

![run-time-environment](https://cdn.tangjiayan.com/notes/embeded/stm32-light/new-project-run-time-environment.png)

这样工程就建好了。

## 从官方库中添加必要文件

### Keil5 / 本地 创建 `Startup` 文件夹

在 Keil5 工程 和 本地工程文件夹中都创建名为 `Startup` 的文件夹：

![startup-folder](https://cdn.tangjiayan.com/notes/embeded/stm32-light/startup-folder.png)

### 从官方标准外设库中添加所需文件

在 [STM32F10x standard peripheral library - STMicroelectronics](https://www.st.com/en/embedded-software/stsw-stm32054.html) 下载官方标准外设库。

在官方固件库中，将如下路径的文件复制到本地 `Startup` 文件夹中，然后添加到 Keil5 工程的 `Startup` 文件夹：

- `\Libraries\CMSIS\CM3\DeviceSupport\ST\STM32F10x\startup\arm`
  - `startup_stm32f10x_md.s`
- `\Libraries\CMSIS\CM3\CoreSupport`
  - `core_cm3.c`
  - `core_cm3.h`
- `\Libraries\CMSIS\CM3\DeviceSupport\ST\STM32F10x`
  - `stm32f10x.h`
  - `system_stm32f10x.c`
  - `system_stm32f10x.h`

每个文件的作用可以在每个文件的文档注释里看到。

![add-files-to-startup](https://cdn.tangjiayan.com/notes/embeded/stm32-light/add-files-to-startup.png)

### 设置头文件路径

点击魔术棒按钮  (`Options for Target`)

 ![button-magic-wand](https://cdn.tangjiayan.com/notes/embeded/keil5/button-magic-wand.png)

在 `C/C++` - `Include Paths` 中添加 `Startup` 文件夹。

![include-paths](https://cdn.tangjiayan.com/notes/embeded/stm32-light/include-paths.png)

## 创建 `main.c`，编写配置寄存器代码

### 创建 `User` 文件夹，添加 `main.c`

在 Keil5 工程 和 本地工程文件夹中都创建名为 `User` 的文件夹，在 Keil5 的 `User` 里右键创建 `main.c`。注意路径 (Location) 选择本地的 `User`

![create-main](https://cdn.tangjiayan.com/notes/embeded/stm32-light/create-main.png)

### `main.c` include 头文件

`右键` - `Insert '#include file'` 来 include 头文件：

![right-include](https://cdn.tangjiayan.com/notes/embeded/stm32-light/right-include.png)

点击后得到：

```c
#include "stm32f10x.h"                  // Device header
```

### 编写 `main` 函数

::: details TIP

- `Ctrl` + `鼠标滚轮` 可以放大/缩小编辑器文字大小。
- 在 `configuration` 中，可以
  ![button-configuration](https://cdn.tangjiayan.com/notes/embeded/keil5/button-configuration.png)
  - 设置编码格式 `Encoding` 为 `UTF-8`
  - 设置 C/C++ 文件的 `Tab Size` 为 `4`

:::

编写 `main` 代码如下：

```c
int main(void){
  RCC->APB2ENR = 0x00000010;
  GPIOC->CRH = 0x00300000;
  GPIOC->ODR = 0x00000000;
}
```

## 寄存器配置说明

### 点亮LED灯原理

根据 `STM32F103C8T6核心板原理图`，要点亮 `D2`，需要将 `PC13` 置为低电平。

![sch-led-pc13](https://cdn.tangjiayan.com/notes/embeded/stm32-light/sch-led-pc13.png)

为了将 `PC13` 置为低电平，需要：

1. 使能 `GPIOC`
2. 配置 `PC13` 引脚模式为 `General purpose output push-pull`、`Output mode, max speed 50 MHz`
3. 配置 `PC13` 输出低电平

接下来的讲解要用到 STM32F10x 参考手册，在 [ST官方的这个页面](https://www.st.com/en/microcontrollers-microprocessors/stm32f101c8.html#documentation) 可以下载。

### 使能 GPIOC

```c
RCC->APB2ENR = 0x00000010;
```

在官方手册的 `7.3.7 APB2 peripheral clock enable register (RCC_APB2ENR)` 章节中可以看到 `RCC->APB2ENR` 这一寄存器的 `位4` (第5位) 用来使能 `GPIOC` 的时钟，设为 `1` 使能。

![RCC_APB2ENR](https://cdn.tangjiayan.com/notes/embeded/stm32-light/RCC_APB2ENR.png)

所以 `0x00000010` 表示二进制的 `位4` 置 `1`，使能 `GPIOC` 的时钟，使其有效。

|进制| | |
|---|:---:| :---: |
|十六进制 0x | 0000 | 00<span style='color:red;'>1</span>0 |
|二进制 0b   | 0000 0000 0000 0000| 0000 0000 <span style='color:red;'>0001</span> 0000 |

### 配置 PC13 引脚的模式

```c
GPIOC->CRH = 0x00300000;
```

在官方手册的 `9.2.2 Port configuration register high (GPIOx_CRH) (x=A..G)` 章节中可以看到，`GPIOx->CRH` 这一寄存器的 `位23` - `位20` 是配置 `GPIO13` 的模式。

- `CNF13` 需要配置为 `00`: `General purpose output push-pull` (通用推挽输出模式)；
- `MODE13` 需要配置为 `11`: `Output mode, max speed 50 MHz` 。

(至于为什么这样配置，见后续笔记。)

![GPIOx-CRH](https://cdn.tangjiayan.com/notes/embeded/stm32-light/GPIOx-CRH.png)

所以 `GPIOC->CRH` 配置为 `0x00300000`，表示 `位23` - `位20` 置为 `0011B` 。

|进制| | |
|---|:---:| :---: |
|十六进制 0x | 00<span style='color:red;'>3</span>0 | 0000 |
|二进制 0b   | 0000 0000 <span style='color:red;'>0011</span> 0000| 0000 0000 0001 0000 |

### 配置 PC13 输出低电平

```C
GPIOC->ODR = 0x00000000;
```

在官方手册的 `9.2.4 Port output data register (GPIOx_ODR) (x=A..G)` 章节中可以看到，`ODR13` 这一位控制 `GPIO13` 的输出，写 `0`，`GPIO13` 就输出 `0`。

![GPIOx_ODR](https://cdn.tangjiayan.com/notes/embeded/stm32-light/GPIOx_ODR.png)

所以 `GPIOC->ODR` 配置为 `0x00000000`，表示将 `ODR13` 置 `0`。

|进制| | |
|---|:---:| :---: |
|十六进制 0x | 0000 | <span style='color:red;'>0</span>000 |
|二进制 0b   | 0000 0000 0000 0000| <span style='color:red;'>0000</span> 0000 0000 0000 |

## 使用 ST-LINK [烧录](https://blog.csdn.net/IT_xiao_bai0516/article/details/120748214)程序

### 连接 ST-LINK 和 STM32F103C8T6 最小系统板

分别将 ST-LINK 和 STM32F103C8T6最小系统板 的 `SWCLK`、`SWDIO`、`GND`、`3.3V` 通过母对母杜邦线连接在一起。

![stm32-stlink](https://cdn.tangjiayan.com/notes/embeded/stm32-light/stm32-stlink.jpg)

连接到电脑的 USB 口上后，ST-LINK 的蓝色的灯应该是常亮的，如果是闪烁状态很可能是没安装驱动，在 [ST官方下载](https://www.st.com/en/development-tools/stsw-link009.html) ST-LINK 的驱动并安装即可。

### 选择 ST-LINK Debugger

点击魔术棒按钮  (`Options for Target`)

![button-magic-wand](https://cdn.tangjiayan.com/notes/embeded/keil5/button-magic-wand.png)

在 `Debug` 中选择 `Use ST-Link Debugger`

![ST-Link-debugger-select](https://cdn.tangjiayan.com/notes/embeded/stm32-light/ST-Link-debugger-select.png)

### 设置 `Reset and Run`

点击 `Use ST-Link Debugger` 旁边的 `Settings`，在 `Flash Download` 中勾选 `Reset and Run`，这样使用 ST-LINK 烧录程序后，不用每次都手动按一下 STM32 板子上的复位按键。

![reset-and-run](https://cdn.tangjiayan.com/notes/embeded/stm32-light/reset-and-run.png)

### Build

点击 `build` 按钮进行编译

![button-build](https://cdn.tangjiayan.com/notes/embeded/keil5/button-build.png)

```
Build started: Project: Project
*** Using Compiler 'V5.06 update 6 (build 750)', folder: 'E:\Program Files\Keil_v5\ARM\ARMCC\Bin'
Build target 'Target 1'
".\Objects\Project.axf" - 0 Error(s), 0 Warning(s).
Build Time Elapsed:  00:00:00
```

::: details 因缺少 ARM Complier Version 5 而编译失败
我在编译时，出现了很多错误和警告，原因是缺少了 ARM Complier Version 5

![missing-v5](https://cdn.tangjiayan.com/notes/embeded/light/missing-v5.png)

解决：[KEIL5MDK最新版(3.37)安装以及旧编译器(V5)安装_keil5 mdk_二氧化碳的日常生活的博客-CSDN博客](https://blog.csdn.net/qq_54995462/article/details/126533029)
:::

### Dwonload

编译完成后点击 `Download` 即可烧录程序。

![button-download](https://cdn.tangjiayan.com/notes/embeded/keil5/button-download.png)

```
Load "Y:\\repositories\\embeded\\keil5 projects\\stm32-light\\Objects\\Project.axf" 
Erase Done.
Programming Done.
Verify OK.
Application running ...
Flash Load finished at 23:44:28
```

::: details 点击 `Download` 出现闪退
我在点击 `Download` 时，Keil5 闪退

原因是新版的 Keil 加入了盗版下载器的校验机制

参考：[keil5.38 debug配置STlink调试，软件闪退_keil5下载程序闪退_豪哥追求卓越的博客-CSDN博客](https://blog.csdn.net/weixin_41542513/article/details/129462111)
:::

::: details TIP: 使用 Micro-USB 进行烧录的方法
也可以不使用 ST-LINK，而是通过 [Micro-USB-B](https://en.wikipedia.org/wiki/USB_hardware#Micro_connectors) + [USB转TTL](https://blog.csdn.net/m0_59161987/article/details/128480063) 使用串口烧录上位机软件，如 [FlyMCU](https://blog.csdn.net/qq_52102933/article/details/126882848)、[STM32 Flash loader](https://www.st.com/en/development-tools/flasher-stm32.html)，将程序烧录到 STM32。

![MicroB_USB_Plug](https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/MicroB_USB_Plug.jpg/255px-MicroB_USB_Plug.jpg)

很多系统板板载 USB 转 CH340 电路，如正点原子的 STM32F103ZET6 最小系统板：

![zhengdian-F103ZET6](https://cdn.tangjiayan.com/notes/embeded/stm32-light/zhengdian-F103ZET6.jpg)

而我的这个最小系统板上没有 USB 转 TTL 芯片 (如 CH340、FTDI)，所以需要外接 USB 转 TTL 模块。

对于我的这个 STM32F103C8T6，直接连接 Micro-USB 和电脑的 USB，只能起到供电作用。

![usb-to-stm32](https://cdn.tangjiayan.com/notes/embeded/stm32-light/usb-to-stm32.jpg)

使用 MicroUSB 烧录程序的过程就不演示了，可参考：

- [FlyMcu - 用于STM32芯片ISP串口程序一键下载的免费软件_零号萌新的博客-CSDN博客](https://blog.csdn.net/qq_52102933/article/details/126882848)

:::

## 参考

- [STM32入门教程-2023持续更新中_[2-2] 新建工程_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1th411z7sn/?p=4)
- [stm32f103xx Reference manual](https://www.st.com/en/microcontrollers-microprocessors/stm32f101c8.html#documentation)
- [keil5.38 debug配置STlink调试，软件闪退_keil5下载程序闪退_豪哥追求卓越的博客-CSDN博客](https://blog.csdn.net/weixin_41542513/article/details/129462111)
- [KEIL5MDK最新版(3.37)安装以及旧编译器(V5)安装_keil5 mdk_二氧化碳的日常生活的博客-CSDN博客](https://blog.csdn.net/qq_54995462/article/details/126533029)
- [FlyMcu - 用于STM32芯片ISP串口程序一键下载的免费软件_零号萌新的博客-CSDN博客](https://blog.csdn.net/qq_52102933/article/details/126882848)
- [USB hardware - Wikipedia](https://en.wikipedia.org/wiki/USB_hardware#Micro_connectors)
- [STM32 —— USB 转 TTL（CH340）_ppqppl的博客-CSDN博客](https://blog.csdn.net/m0_59161987/article/details/128480063)
- [FlyMcu - 用于STM32芯片ISP串口程序一键下载的免费软件_零号萌新的博客-CSDN博客](https://blog.csdn.net/qq_52102933/article/details/126882848)
