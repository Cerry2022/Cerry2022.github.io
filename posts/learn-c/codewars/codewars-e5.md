---
date: 2025-04-11
title: codewars-e5
category: codewars
tags:
  - c
description: codewars-e5刷题记录
---

### 题目1:

> [!note] 题目
> 你的任务是创建一个函数，该函数接受一个整数并返回该整数的“观测-描述”函数的结果。这应该是一个通用函数，它接受任何正整数作为输入并返回一个整数；输入不限于以“1”开头的序列。
> 
> 康威的“观测-描述”序列是这样的：
> 
> - 从一个数字开始。
> - 观察这个数字，并将连续的数字分组。
> - 对于每个数字组，描述_数字的个数，然后是数字本身。
> 
> 这可以重复应用于其结果以生成序列。
> 
> 例如：
> 
> - 从 `1` 开始。
> - 有一个 `1` --> `11`
> - 从 `11` 开始。有两个 `1` 数字 --> `21`
> - 从 `21` 开始。有一个 `2` 和一个 `1` --> `1211`
> - 从 `1211` 开始。有一个 `1`，一个 `2`，和两个 `1` --> `111221`
> 
> 示例输入和输出：
> 
> - `0` --> `10`
> - `2014` --> `12101114`
> - `9000` --> `1930`
> - `22322` --> `221322`
> - `222222222222` --> `122`


我的解答:
```c
#include <string.h>
#include <stdlib.h>

typedef unsigned long long ullong;

int toal(char *n_str, int len, int i){
  int sum = 0;
  for(int j = i; j<len; j++){
    if(n_str[j] == n_str[i]) sum++;
    else break;
  }
  return sum;
}

ullong look_say (ullong n)
{
  char str[64], out_str[64];

  sprintf(str, "%llu", n);
  int len = strlen(str);
  int i = 0;
  while(i < len){
    int i_toal = toal(str, len, i);
    sprintf(out_str, "%s%d%c", out_str, toal(str, len, i), str[i]);
    i += i_toal;
  }
  
  ullong out = strtoull(out_str, NULL, 10);
  return out;
}
```