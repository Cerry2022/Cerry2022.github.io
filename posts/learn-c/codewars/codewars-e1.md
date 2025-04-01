---
date: 2025-04-01
title: codewars-e1
category: codewars
tags:
  - c
description: codewars-e1 刷题打怪 简单记录一下
---


[codewars](https://www.codewars.com/dashboard ) 一个面向工程的编程练习网站，类似打怪升级，题目难度由低到高分为8-1

左侧是问题描述，右侧是代码编辑区以及测试代码

测试代码中一般会给出测试用例以及对应的答案，偶尔也会有错误案例要求异常处理。

![](/posts/files/Pasted%20image%2020250331192213.png)


## 题目1

Write a function that takes an array of numbers and returns the sum of the numbers. The numbers can be negative or non-integer. If the array does not contain any numbers then you should return 0.

```c
#include <stddef.h>

int sum_array(const int *values, size_t count){
  int sum = 0;
  while(count--)
  {
    sum += *(values++);
  }
  return sum;
}
```
## 题目2
Usually when you buy something, you're asked whether your credit card number, phone number or answer to your most secret question is still correct. However, since someone could look over your shoulder, you don't want that shown on your screen. Instead, we mask it.

Your task is to write a function `maskify`, which changes all but the last four characters into `'#'`.

## Examples (input --> output):

```
"4556364607935616" --> "############5616"
     "64607935616" -->      "#######5616"
               "1" -->                "1"
                "" -->                 ""

// "What was the name of your first pet?"
"Skippy" --> "##ippy"
"Nananananananananananananananana Batman!" --> "####################################man!"
```


解法1：strcpy
```c
#include <string.h>
char *maskify (char *masked, const char *str)
{
	int len = strlen(str);
	strcpy(masked, str);
	if (len > 4)
	{
		for (int i = 0, n = len - 4; i < n; i++)
		{
			masked[i] = '#';
		}
	}

  return masked;
}
```

解法2：指针
```c
#include <string.h>
char *maskify (char *masked, const char *string)
{
	size_t size = strlen(string)+1;
    int i = 0;
    while(size--){
      if(i++ < 5) {
        *(masked + size) = *(string + size);
      }
      else {
        *(masked + size) = '#';
      }
    }
	return masked;
}
```

解法3：最优解法 memset
```c
#include <string.h>

char *maskify (char *masked, const char *string)
{
  int n = strlen(strcpy(masked, string)) - 4;
  if (n > 0) memset(masked, '#', n);
	return masked;
}
```