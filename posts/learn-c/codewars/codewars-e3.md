---
date: 2025-04-02
title: codewars-e3
category: codewars
tags:
  - c
description: codewars-e3 刷题记录
---
## 题目1
> [!note]- 题目
> 一个孩子在高层建筑的第n层玩球。这一层距离地面的高度，h，是已知的。
> 
> 他从窗户扔下球。球会反弹（例如），达到其高度的三分之二（反弹系数为0.66）。
> 
> 他的母亲从距离地面1.5米的窗户向外看。
> 
> 母亲会在多少次看到球从她窗前经过（包括球下落和反弹时）？
> 
> 进行有效实验必须满足的三个条件：
> 浮点参数 "h"（以米为单位）必须大于0
> 浮点参数 "bounce" 必须大于0且小于1
> 浮点参数 "window" 必须小于h。
> 如果以上三个条件都满足，返回一个正整数，否则返回-1。
> 
> 注意：
> 只有当反弹后球的高度严格大于窗口参数时，才能看到球。
> 
> 示例：
> - h = 3, bounce = 0.66, window = 1.5, 结果是 3
> 
> - h = 3, bounce = 1, window = 1.5, 结果是 -1 
> 
> （条件2不满足）。
> 

我的解答：
与最佳实践一致
```c
#include <math.h>
int bouncingBall(double h, double bounce, double window) {
    int count = -1;
    if(h>0 && bounce>0 && bounce<1 && window<h){
        while(h>window){
            count += 2;
            h = h*bounce;
        }
      return count;
    }
    return -1;
}
```



## 题目2：
> [!note] 题目
> 你将会得到一个整数数组。你的任务是找到索引N，使得N左侧的整数之和等于N右侧的整数之和。
> 
> 如果没有索引能满足这种情况，返回-1。

我的解答：
```c
int find_even_index(const int *values, int length) {
  int sumr = 0, suml = 0;
  int p = length;
  while(p--) {
    sumr += values[p];
  }
  p = 0;
  while(p < length){
    if(p == 0){
      sumr -= values[0];
    }
    else if(p < length){
      suml += values[p-1];
      sumr -= values[p];
    }
    if(suml == sumr){
      return p;
    }
    p++;
  }
  
  return -1;
}
```

更好的解答：
```c
int find_even_index(const int *values, int length) {
  int sum = 0;
  
  for(int i = 0; i < length; i++) sum += values[i];
  
  int left = 0;
  int right = sum;
  
  for(int i = 0; i < length; i++)
  {
    right -= values[i];
    if(left == right) return i;
    left += values[i];
  }
  return -1;
}
```


## 题目3
> [!note] 题目
> 编写一个方法，该方法接收一个连续（递增）的字母数组作为输入，并返回数组中缺失的字母。
> 
> 你将始终获得一个有效的数组。并且始终只有一个字母缺失。数组的长度将始终至少为2。
> 数组将始终只包含单一大小写的字母。
> 
> 示例：
> 
> ['a','b','c','d','f'] -> 'e'
> ['O','Q','R','S'] -> 'P'
> （使用包含26个字母的英文字母表！）


我的解答：
```
char findMissingLetter(char array[], int arrayLength)
{
  for(int i=0; i<arrayLength; i++){
    if(array[i] + 1 != array[i+1]){
      return array[i]+1;
    }
  }
}
```

最简解答：
```
char findMissingLetter(char array[], int arrayLength)
{
    while (++*array == *++array);
    return --*array;
}
```