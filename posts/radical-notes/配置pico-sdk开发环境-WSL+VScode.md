---
date: 2025-06-04 13:56
modifyDate: 2025-06-04 15:54
title: 配置pico-sdk开发环境-WSL+VScode
category: 
tags:
  - wsl
  - 嵌入式
description:
---
## 配置pico-sdk
使用官方脚本：

>git clone https://github.com/raspberrypi/pico-setup.git
>sh ./pico-setup/pico_setup.sh

会自动配置pico-sdk\picotool\openocd以及环境变量
这里我把SDK移动到了%HOME%/\_PATH_下

```sh
export PICO_SDK_PATH=/home/cerry/_PATH_/pico/pico-sdk
export PICO_EXAMPLES_PATH=/home/cerry/_PATH_/pico/pico-examples
export PICO_EXTRAS_PATH=/home/cerry/_PATH_/pico/pico-extras
export PICO_PLAYGROUND_PATH=/home/cerry/_PATH_/pico/pico-playground
export FREERTOS_KERNEL_PATH=/home/cerry/_PATH_/pico/FreeRTOS-Kernel
```
这个是bash的配置,如果使用的是fish,要使用fish的配置文件 %HOME%/.config/fish/config.fish
fish下可以配置为:
```sh
set -gx PICO_SDK_PATH /home/cerry/_PATH_/pico/pico-sdk
set -gx PICO_EXAMPLES_PATH /home/cerry/_PATH_/pico/pico-examples
set -gx PICO_EXTRAS_PATH /home/cerry/_PATH_/pico/pico-extras
set -gx PICO_PLAYGROUND_PATH /home/cerry/_PATH_/pico/pico-playground
set -gx FREERTOS_KERNEL_PATH /home/cerry/_PATH_/pico/FreeRTOS-Kernel
```

来到VScode这边,来配置环境:
安装WSL插件
点击左下角 打开远程端口 连接到WSl
![[posts/files/Pasted image 20250604141549.png|left]]
给WSl下的VScode安装插件
C/C++
CMake
可选:Raspberry Pi Pico(当然选择这个后, 环境会自动安装到%HOME%/.pico-sdk下 就不需要配置这些了

### 测试项目
1. 创建一个项目文件夹 myapp
2. 复制 <PICO_SDK_PATH>/external/pico_sdk_import.cmake 到app下
3. 编写CMakeLists.txt文件
```cmake
cmake_minimum_required(VERSION 3.13)
include(pico_sdk_import.cmake)
project(myapp)

pico_sdk_init()

add_executable(sb "app.c")
pico_add_extra_outputs(sb)
target_link_libraries(sb pico_stdlib)
```

4. 编写app.c
```c
#include <stdio.h>
#include "pico/stdlib.h"

int main()
{
    return 0;
}
```

5. 生成目标
![[posts/files/Pasted image 20250604142311.png|left]]
期间弹出选择编辑器,选择 arm-none-eabi

CMake可能会报错

打开设置,搜索 `Cmake:configureSettings`
![[posts/files/Pasted image 20250604142456.png|left|480]]
添加 `"CMAKE_EXE_LINKER_FLAGS": "--specs=nano.specs"`
Cmake就不会报错了
## 配置FreeRtos
```sh
cd _PATH_/pico
git clone -b smp https://github.com/FreeRTOS/FreeRTOS-Kernel --recurse-submodules
# bash下
vim ~/.bachrc
export FREERTOS_KERNEL_PATH=/home/cerry/_PATH_/pico/FreeRTOS-Kernel
# 如果是fish
vim ~/.config/fish/config.fish 
set -gx FREERTOS_KERNEL_PATH /home/cerry/_PATH_/pico/FreeRTOS-Kernel
```

