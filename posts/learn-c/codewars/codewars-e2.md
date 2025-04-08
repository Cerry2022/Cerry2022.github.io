---
date: 2025-04-02
title: codewars-e2
category: codewars
tags:
  - c
description: codewars-e2 刷题记录
---
## codewars-e2
## 题目1：数绵羊
给定一个布尔类型数组，确定其中true的数量。

我的解答：
```c
#include <stdbool.h>
#include <stddef.h>

size_t count_sheep(const bool sheep[/* count */], size_t count)
{
  int sum = 0;
  while(count--)
  {
    sum += *(sheep++);
  }
  return sum;
}
```

最佳实践：
```c
#include <stdbool.h>
#include <stddef.h>

size_t count_sheep(const bool *sheep, size_t count) {
  int number = 0;
  for (size_t n = 0; n < count; n++) {
    if (sheep[n] == true)
      number++;
    else if (sheep[n] != false)
      printf("Null or undefined");
  }
  return number;
}
```

---
## 题目2：统计元音字母数量

我的解答：
```c
#include <stddef.h>

size_t get_count(const char *s)
{
    int count = 0;
    while(*s){
      if(*s == 'a' || *s == 'e' || *s == 'i' || *s == 'o' || *s == 'u') count++;
      s++;
    }
    return count;
}
```

最佳实践：
更为精妙
首先对空指针做了判断`!s`，避免异常
其次对字符串的遍历是用`while(*s)`的方式，`*s++`指针自增，直到遇到字符串结束符`'\0'`,循环停止

```c
#include <stddef.h>

size_t get_count(const char *s)
{
    size_t cnt = 0ul;
    if (!s)
        return 0ul;
    while (*s)
        switch (*s++) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
            ++cnt;
            break;
        }
    return cnt;
}
```
---
## 题目3：统计笑脸
给定一个数组（arr）作为参数，完成函数 `countSmileys`，该函数应返回笑脸的总数。
笑脸的规则：
- 每个笑脸必须包含一对有效的眼睛。眼睛可以用 `:` 或 `;` 表示。
- 笑脸可以有鼻子，但不一定有。鼻子的有效字符是 `-` 或 `~`。
- 每个笑脸都必须有一个微笑的嘴巴，应该用 `)` 或 `D` 表示。

除了提到的字符外，不允许有其他字符。
**有效的笑脸示例：** `:) :D ;-D :~)`  
**无效的笑脸：** `;( :> :} :]`

我的解答：
分支结构，可读性一般
```c
#include <stddef.h>

size_t count_smileys(size_t length, const char *const array[length]) {
    size_t count = 0;
  
    const char *str;
    if(length > 0){
        while(length --)
        {
            str = array[length];
            printf("%s\n", str);
            if(*str == ':' || *str == ';') {
               if(*(str+1)=='-' || *(str+1)=='~') {
                  if(*(str+2)==')' || *(str+2)=='D') count++;
               }
               else if(*(str+1)==')' || *(str+1)=='D') count++;
            }
        }
    }
    return count;

}
```

函数解答（可读性好）：
```c
#include <stddef.h>

// chain: checkEye -> checkNose -> checkMouse -> checkNull
// chain: checkEye -> checkMouse -> checkNull
int checkSmiley(const char* const p) {
  return checkEye(p);
}

int checkEye(const char* const p)
{
  return (*p == ':' || *p == ';') ?  checkMouse(p + 1) || checkNose(p + 1) : 0;
}

int checkNose(const char* const p)
{
  return (*p == '-' || *p == '~') ?  checkMouse(p + 1) : 0;
}

int checkMouse(const char* const p)
{
  return (*p == ')' || *p == 'D') ?  checkNull(p + 1) : 0;
}

int checkNull(const char* const p)
{
  return (*p == '\0') ? 1 : 0;
}

size_t count_smileys(size_t length, const char *const array[length]) {
  size_t n = 0;
  for(size_t i = 0; i < length; i++){
//     printf("%s\n", array[i]);
    n += checkSmiley(array[i]);
  }
  
  return n;
}
```


库函数暴力解答：
```c
#include <stddef.h>
#include <regex.h>

size_t count_smileys(size_t length, const char *const array[length]) {
  regex_t reg;
  regcomp(&reg, "[:;][-~]?[D)]", REG_EXTENDED);
  
  int match = 0;
  for (size_t i = 0; i < length; ++i)
    if (regexec(&reg, array[i], 0, NULL, 0) == 0)
      ++match;
  
  return match;
}
```

库函数暴力解答2：
```c
#include <stddef.h>
#include <string.h>

size_t count_smileys(size_t length, const char *const array[length])
{
  size_t smileys = 0;
  
  for (size_t i = 0; i < length; i++)
  {
    smileys += strstr(":) :D :-) :-D :~) :~D ;) ;D ;-) ;-D ;~) ;~D", array[i]) != NULL;
  }
  
  return smileys;
}
```