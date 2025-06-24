---
date: 2025-06-17 11:10
modifyDate: 2025-06-24 11:10
title: BootLoader启动分析
category: 八股
tags: 
description:
---

## BootLoader的启动分析

>  **Bootloader是在操作系统运行之前执行的一段小程序。通过这段小程序，我们可以初始化硬件设备、建立内存空间的映射表，从而建立适当的系统软硬件环境，为最终调用操作系统内核做好准备。**
### 1.stage
由于BootLoader的实现依赖于CPU体系结构，大多数BootLoader都分为**stage1**和**stage2**两大部分 
- Stage1 
	- 依赖于CPU体系结构，如设备初始化代码
	- 通常用汇编语言实现，短小精悍
- Stage2 
	- 通常用C语言
	- 可以实现复杂功能
	- 代码具有较好的可读性和可移植性
### 2.Stage1
直接运行在固态存储设备上，通常包括以下<font color="#d83931">五个步骤</font> ：
1. 硬件设备初始化
	-  <font color="#d83931">屏蔽所有的中断、设置CPU的速度和时钟频率、RAM初始化、初始化LED、关闭CPU内部指令／数据 cache</font>
2. 为加载 BootLoader的stage2准备RAM空间
	- <font color="#d83931"> 一般而言1MB已足够</font>
3. 拷贝 BootLoader的stage2到RAM空间中
4. 设置好堆栈
	- <font color="#d83931">通常设置在上述1MB RAM 空间的最顶端</font>
	- <font color="#d83931">在设置堆栈指针前，也可关闭 led 灯，以提示用户即将跳转到 stage2</font>
5. 跳转到stage2的C入口点
### 3.Stage2
通常包括以下五个步骤
1. 初始化本阶段要使用到的硬件设备
	- <font color="#d83931">初始化至少一个串口,在设备初始化完成后，输出一些打印信息；</font>
	- <font color="#d83931">初始化计时器等。</font>
2. 检测系统内存映射(memory map)
	- <font color="#d83931">内存映射：在整个 4GB 物理地址空间中有哪些地址 范围被分配用来寻址系统的 RAM 单元</font>
3. 将 kernel 映像和根文件系统映像从 flash 上读到 RAM 空间中——加载映像
4. 为内核设置启动参数 
	- 内核参数，如页面大小、根设备
	- 内存映射情况
	- 命令行参数
	- initrd映像参数
	- Ramdisk参数
5. 调用内核
	- 直接跳转到内核的第一条指令处，也即RAM中内核 被加载的地址处
从此操作系统接管所有的工作

