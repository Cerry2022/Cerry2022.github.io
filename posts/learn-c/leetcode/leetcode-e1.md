---
date: 2025-05-14 21:55
modifyDate: 2025-06-10 11:07
title: 
category: leetcode
tags:
  - c
description:
---

## 27.移除元素

给你一个数组 `nums` 和一个值 `val`，你需要 **[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)** 移除所有数值等于 `val` 的元素。元素的顺序可能发生改变。然后返回 `nums` 中与 `val` 不同的元素的数量。
假设 `nums` 中不等于 `val` 的元素数量为 `k`，要通过此题，您需要执行以下操作：
- 更改 `nums` 数组，使 `nums` 的前 `k` 个元素包含不等于 `val` 的元素。`nums` 的其余元素和 `nums` 的大小并不重要。
- 返回 `k`。

这五个元素可以任意顺序返回。
你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。


我的解答:
```c
#include "stdio.h"
#include "stdlib.h"
#include "string.h"


int removeElement(int* nums, int numsSize, int val) {
    int *new_nums = (int*)malloc(numsSize * sizeof(int));
    memcpy(new_nums, nums, sizeof(nums));
    int i = 0, c = 0;
    while(numsSize--){
        if(new_nums[numsSize] != val){
            nums[c++] = new_nums[numsSize];
        }
    }
    return c;
}
```