---
date: 2025-05-14 20:34
modifyDate: 2025-05-14 21:51
title: sizeof的区别：数组vs指针
category: 
tags: 
description:
---
### C 语言 sizeof 的区别：数组 vs 指针

在 C 语言中，sizeof 操作符用于获取类型或变量所占用的字节数。但当它应用于一个数组名或一个指向数组的指针时，结果是**截然不同**的。

**1. sizeof(数组名)**
- **前提：** sizeof 直接应用于一个**在当前作用域内声明的**、**未通过指针传递**的数组名。
- **结果：** 返回**整个数组所占用的总字节数**。
- **用途：** 通常用来确定整个数组的内存大小，或者结合 sizeof(数组名[0]) 来计算数组的元素个数 (sizeof(array) / sizeof(array[0]))。
- **特点：**<font color="#d83931"> 这个大小是编译时确定的。</font>

**示例：**
```c
#include <stdio.h>

int main() {
    int myArray[10]; // 声明一个包含 10 个 int 的数组

    printf("sizeof(myArray): %zu 字节\n", sizeof(myArray));       // 输出整个数组的总字节数 (10 * sizeof(int))
    printf("sizeof(myArray[0]): %zu 字节\n", sizeof(myArray[0]));   // 输出数组第一个元素的字节数 (sizeof(int))
    printf("数组元素个数: %zu\n", sizeof(myArray) / sizeof(myArray[0])); // 计算元素个数

    return 0;
}
```

**2. sizeof(指针)**

- **前提：** sizeof 应用于一个**指针变量**（包括指向数组第一个元素的指针，例如作为函数参数传递的数组名）。    
- **结果：** 返回<font color="#d83931">指针变量本身所占用的字节数</font> **。这个大小取决于你的系统架构（例如，在 32 位系统上通常是 4 字节，在 64 位系统上通常是 8 字节），与它指向的数据类型或数据量无关。    
- **用途：** 不常直接用来获取指向的数据结构的总大小，因为指针本身只存储地址。    
- **特点：**<font color="#d83931"> 这个大小也是编译时确定的</font>（指针类型的大小是固定的）。
    

**示例：**

```c
#include <stdio.h>

// 接受一个 int 数组的函数
void processArray(int* arr, int size) {
    printf("\n在函数内部 (arr 是一个 int* 指针): \n");
    printf("sizeof(arr): %zu 字节\n", sizeof(arr)); // 输出指针的大小 (例如 8 字节在 64位系统)
    // 无法在这里直接通过 sizeof(arr) 获取整个数组的大小
    // 必须依赖传递进来的 size 参数
    printf("数组元素个数 (通过 size 参数): %d\n", size);
    printf("数组的总字节数 (通过 size 参数): %zu 字节\n", size * sizeof(int));
}

int main() {
    int myArray[] = {10, 20, 30}; // 数组大小是 3

    // 在 main 函数 (myArray 是数组名)
    printf("在 main 函数: \n");
    printf("sizeof(myArray): %zu 字节\n", sizeof(myArray)); // 输出整个数组的总字节数 (3 * sizeof(int))

    // 调用函数，数组名退化为指针
    processArray(myArray, sizeof(myArray) / sizeof(myArray[0]));

    return 0;
}
```
