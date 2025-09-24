---
date: 2025-07-18 20:51
modifyDate: 2025-07-25 09:29
title: learn_linux_arm_day2
category: Linux
tags:
  - linux
description:
---

# Linux 进程

## 程序

分段：raw\data\rodata\bss 实际上就是静态的文件

## 进程

task<sub>struct</sub> 管理进程资源 PID: 进程的唯一标识 诞生和死亡：随着程序

pstree 显示进程树 ps -ef | more 只输出一页的内容

## fork 函数

fork 复制新进程 执行fork函数之后，fork函数会返回两次 在父进程中返回时，返回值为0 在子进程返回时，返回值为进程的pid

创建子进程失败返回-1

原型：
```c
include <unistd.h>
pit_t fork(void)
```

<a id="org5498977"></a>

## exec 函数族

事实上，使用fork()函数启动一个子进程是并没有太大作用的，因为子进程跟父进程都是一样的， 子进程能干的活父进程也一样能干，因此世界各地的开发者就想方设法让子进程做不一样的事情

```c
#include <unistd.h>
int execl(const char *path, const char *arg, ...)
int execlp(const char *file, const char *arg, ...)
int execle(const char *path, const char *arg, ..., char *const envp[])
int execv(const char *path, char *const argv[])
int execvp(const char *file, char *const argv[])
int execve(const char *path, char *const argv[], char *const envp[])
```

path: 字符串代表的可执行文件路径 arg: 一系列可变传递参数，最后一个必须使用空指针NULL作为结束命令

两大类： l : execl、execlp和execle传递可变参数 v : execv、execvp和execve传递数组

后缀：
- l ：子程序参数通过列表“list”数传参。
- v ：子程序参数通过一个数组“vector”装载。
- p ：在当前的执行路径和环境变量“PATH”中搜索并执行这个程序（即可使用相对路径）；不需要指定程序的完整路径。
- e ：多一个指明环境变量列表的参数envp[]，以 NULL 指针结尾的字符串数组，每个字符串应该表示为“environment = virables”的形式。


<a id="org38cf25f"></a>

## 终止进程

正常终止： main 函数返回 exit() 函数终止： 会清除I/O缓冲区，把文件缓冲区的内容写回硬盘 \_exit() 函数终止：不会清除I/O 缓冲区，会导致数据丢失

异常终止： abort()函数 由系统信号终止

```c
#include <unistd.h>
#include <stdlib.h>
pit_t _exit(int status)
pit_t exit(int status)
```

status: 进程终止时的状态码，0表示正常终止， 其他非0值表示异常终止，一般都可以使用-1或者1表示，标准C里有EXIT<sub>SUCCESS和EXIT</sub><sub>FAILURE两个宏</sub>， 表示正常与异常终止。


<a id="org08e22d2"></a>

## 等待子进程的终结 wait()

等待第一个终止的子进程

```c
#include <sys/wait.h>
pit_t wait(int *status)
```
返回：

-   成功：退出子进程的pid
-   失败：-1

处理子进程退出状态值的宏 WIFEXITED(status)：如果子进程正常退出，则 该宏为真 WEXITSTATUS(status):如果子进程正常退出， 则该宏获取子进程的退出值

![img](/posts/study-embedded/linux/Linux_进程/2025-07-19_17-02-30_screenshot.png)

-   TASK<sub>RUNNING</sub>:就绪/运行状态
-   TASK<sub>INTERRUPTIBLE</sub>:可中断睡眠状态
-   TASK<sub>UNINTERRUPTIBLE</sub>:不可中断睡眠状
-   TASK<sub>TRACED</sub>:调试态
-   TASK<sub>STOPPED</sub>:暂停状态
-   EXIT<sub>ZOMBIE</sub>:僵死状态
-   EXIT<sub>DEAD</sub>:死亡态
