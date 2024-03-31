# 使用库函数配置 STM32F103C8T6 最小系统板 PC13 端口 实现板载 LED 灯闪烁

承 [配置 STM32F103C8T6 最小系统板 PC13 寄存器点亮板载 LED 灯](/embeded/stm32-light)，本笔记通过库函数配置 PC13 引脚，控制其交替输出高低电平实现控制 LED 灯闪烁，用来复习库函数的基本使用。

参考自：[STM32入门教程-2023持续更新中_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1th411z7sn)

## 目标

<video src="https://cdn.tangjiayan.com/notes/embeded/stm32-blink/stm32-blink.mp4" controls>
</video>

![overview](https://cdn.tangjiayan.com/notes/embeded/stm32-blink/overview.png)

## 添加所需文件到工程

### 新建 `Libraries` 文件夹，   添加所需文件

Keil5/本地 新建 `Libraries` 文件夹，添加官方库的下述路径文件到其中：

- `\Libraries\STM32F10x_StdPeriph_Driver\inc`
  - 所有文件
- `\Libraries\STM32F10x_StdPeriph_Driver\src`
  - 所有文件

### 新建 `System` 文件夹，添加 `Delay.h` 和 `Delay.c`

我是用的 [江协科技](https://jiangxiekeji.com/download.html) 提供的 `Delay.h` 和 `Delay.c`。

::: details Delay.h

```c
#ifndef __DELAY_H
#define __DELAY_H

void Delay_us(uint32_t us);
void Delay_ms(uint32_t ms);
void Delay_s(uint32_t s);

#endif
```

:::

::: details Delay.c

```c
#include "stm32f10x.h"

/**
  * @brief  微秒级延时
  * @param  xus 延时时长，范围：0~233015
  * @retval 无
  */
void Delay_us(uint32_t xus)
{
 SysTick->LOAD = 72 * xus;    //设置定时器重装值
 SysTick->VAL = 0x00;     //清空当前计数值
 SysTick->CTRL = 0x00000005;    //设置时钟源为HCLK，启动定时器
 while(!(SysTick->CTRL & 0x00010000)); //等待计数到0
 SysTick->CTRL = 0x00000004;    //关闭定时器
}

/**
  * @brief  毫秒级延时
  * @param  xms 延时时长，范围：0~4294967295
  * @retval 无
  */
void Delay_ms(uint32_t xms)
{
 while(xms--)
 {
  Delay_us(1000);
 }
}
 
/**
  * @brief  秒级延时
  * @param  xs 延时时长，范围：0~4294967295
  * @retval 无
  */
void Delay_s(uint32_t xs)
{
 while(xs--)
 {
  Delay_ms(1000);
 }
} 

```

:::

### 向 `User` 文件夹添加所需文件

添加官方库的下述路径文件到 `User` 文件夹中：

- `\Project\STM32F10x_StdPeriph_Template`
  - `stm32f10x_conf.h`
  - `stm32f10x_it.c`
  - `stm32f10x_it.h`

::: details Keil5中 将不常修改的目录上移

一般情况下我们只需要修改 `User` 文件夹下的文件，`Startup`、`Libraries` 里的内容并不需要修改。

点击三个箱子的按钮 (`File Extensions, Books and Environment...`)

![button-extensions](https://cdn.tangjiayan.com/notes/embeded/keil5/button-extensions.png)

可以调整文件夹的排列顺序。

把这些不用修改的组靠上放置，会看着舒服一些。

![uncommon-top](https://cdn.tangjiayan.com/notes/embeded/stm32-blink/uncommon-top.png)
:::

## 宏定义 `USE_STDPERIPH_DRIVER`

右击

```c
#include "stm32f10x.h"
```

这一行，点击 `Open document 'stm32f10x.h'`，可以打开 `stm32f10x.h`。

![right-to-stm32f10x_conf.h](https://cdn.tangjiayan.com/notes/embeded/stm32-blink/right-to-stm32f10x_conf.h.png)

在 `stm32f10x.h` 临近末尾的位置，可以看到有这样的宏 [条件编译](https://blog.csdn.net/wordwarwordwar/article/details/84932183)：

```c
#ifdef USE_STDPERIPH_DRIVER
  #include "stm32f10x_conf.h"
#endif
```

点击魔术棒按钮  (`Options for Target`)

![button-magic-wand](https://cdn.tangjiayan.com/notes/embeded/keil5/button-magic-wand.png)

在 `C/C++` - `Preprocessor Symbols` - `Define` 填入 `USE_STDPERIPH_DRIVER`

![preprocessor-symbols-define](https://cdn.tangjiayan.com/notes/embeded/stm32-blink/preprocessor-symbols-define.png)

::: details 宏定义的好处

对于上述过程，也可以直接在 `main.c` 中插入 `#include "stm32f10x_conf.h"`，不过使用宏定义的方式好处多一些。

>宏定义是在程序中预先定义的一些宏指令或宏函数，可以用来简化复杂逻辑、重复性代码的编写。在编译时，预处理器将宏定义替换为相应的代码或表达式，从而使程序更加高效、易于维护和修改。
:::

这里顺便在 `Include Pahts` 里加上 `.\Libraries`、`.\User`、`.\System`。

![include-Libraries-User-System](https://cdn.tangjiayan.com/notes/embeded/stm32-blink/include-Libraries-User-System.png)

至此，基于库函数的工程就建好了，编译一下试试。

```
Build started: Project: Project
*** Using Compiler 'V5.06 update 6 (build 750)', folder: 'E:\Program Files\Keil_v5\ARM\ARMCC\Bin'
Build target 'Target 1'
linking...
Program Size: Code=700 RO-data=252 RW-data=0 ZI-data=1632  
FromELF: creating hex file...
".\Objects\Project.axf" - 0 Error(s), 0 Warning(s).
Build Time Elapsed:  00:00:00
```

接下来要通过库函数配置 PC13 引脚的高低电平交替输出，步骤：

1. 使能 GPIOC 时钟
2. 配置 PC13 引脚输出模式
3. 设置 PC13 引脚高低电平交替输出

## 使能 GPIOC 时钟

使能时钟函数是 `RCC_APB2PeriphClockCmd`，右键 - 点击 `Go To Definition Of 'RCC_APB2PeriphClockCmd'` 可以看到它的用法。

![go-to-definition](https://cdn.tangjiayan.com/notes/embeded/stm32-blink/go-to-definition.png)

![RCC_APB2PeriphClockCmd-Keil](https://cdn.tangjiayan.com/notes/embeded/stm32-blink/RCC_APB2PeriphClockCmd-Keil.png)

所以 `RCC_APB2PeriphClockCmd` 的配置为：

```C
RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOC, ENABLE);
```

::: details 通过 `stm32f10x_stdperiph_lib_um.chm` 查询库函数

在官方固件库的 `stm32f10x_stdperiph_lib_um.chm` 文件中也可以查到标准外设固件库函数列表及用法，这里标示得更清晰一些。

![RCC_APB2PeriphClockCmd](https://cdn.tangjiayan.com/notes/embeded/stm32-blink/RCC_APB2PeriphClockCmd.png)

:::

## 配置 PC13 引脚输出模式

配置引脚输出模式的函数是 `GPIO_Init`，用法：

![GPIO_Init](https://cdn.tangjiayan.com/notes/embeded/stm32-blink/GPIO_Init.png)

`GPIO_InitStruct` 这个参数需要自己定义一个 `GPIO_InitTypeDef` 类型的结构体。其名字随便起，但根据官方推荐，起为 `GPIO_InitStructure` 比较好。

`GPIO_InitTypeDef` 结构体有三个参数，分别是 `GPIO_Mode`、`GPIO_Pin` 和 `GPIO_Speed`:

![GPIO_InitTypeDef-Keil](https://cdn.tangjiayan.com/notes/embeded/stm32-blink/GPIO_InitTypeDef-Keil.png)

分别 `Go To Definition` 进行查询，得到配置：

- `GPIO_Mode`: `GPIO_Mode_Out_PP`
- `GPIO_Pin`: `GPIO_Pin_13`
- `GPIO_Speed`: `GPIO_Speed_50MHz`

所以 `GPIO_Init` 的配置为

```c
GPIO_InitTypeDef GPIO_InitStructure;
GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;
GPIO_InitStructure.GPIO_Pin = GPIO_Pin_13;
GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
GPIO_Init(GPIOC, &GPIO_InitStructure);
```

## 设置 PC13 引脚高低电平交替输出

使用 `GPIO_ResetBits` 和 `GPIO_SetBits` 来设置 PC13 的高低电平；

使用 `Delay_ms` 实现延时。

```c
#include "Delay.h"

while(1){
    GPIO_ResetBits(GPIOC, GPIO_Pin_13);
    Delay_ms(200);
    GPIO_SetBits(GPIOC, GPIO_Pin_13);
    Delay_ms(200);
}
```

## 完整的 `main.c`

```c
#include "stm32f10x.h"                  // Device header
#include "Delay.h"

int main(void){
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOC, ENABLE);
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_13;
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
    GPIO_Init(GPIOC, &GPIO_InitStructure);
    while(1){
        GPIO_ResetBits(GPIOC, GPIO_Pin_13);
        Delay_ms(200);
        GPIO_SetBits(GPIOC, GPIO_Pin_13);
        Delay_ms(200);
    }
}
```
