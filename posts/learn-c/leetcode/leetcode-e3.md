---
page: true
date: 2025-05-23 10:45
modifyDate: 2025-05-23 10:52
title: 
category: leetcode
tags:
  - cpp
description:
---

## 204.计算质数
>给定整数 `n` ，返回 _所有小于非负整数 `n` 的质数的数量_ 。

思路：
质数（素数）：一个大于1的自然数，除了1和它自身外，不能被其他自然数整除的数
素数筛法，删除2-n内所有的倍数即可

C++:
```cpp
class Solution {
public:
    int countPrimes(int n) {
        vector<bool> nums(n, true);
        // 只统计sqrt(n)内的i的倍数，优化
        for(int i = 2; i*i<n; i++){
            int j = 2;
            // i的j倍数
            while(i*j < n){
                nums[i*j] = false;
                j++;
            }
        }
  
        int res = 0;
        for(int i = 2; i<n; i++){
            if(nums[i]) res++;
        }
        return res;
    }
};
```