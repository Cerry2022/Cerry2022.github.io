---
date: 2025-04-09
title: codewars-e4
category: codewars
tags:
  - c
description: codewars-e4刷题记录
---

### 题目1 :
Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.

```c
move_zeros(10, int [] {1, 2, 0, 1, 0, 1, 0, 3, 0, 1}); // -> int [] {1, 2, 1, 1, 3, 1, 0, 0, 0, 0}
```

我的解答：

```c
#include <stddef.h>

void move_zeros(size_t len, int arr[len]) {
    size_t pl = 0, pr = -1;
    while (++pr < len) if (arr[pr] != 0) arr[pl++] = arr[pr];
    while (pl < len) arr[pl++] = 0;
}
```


### 题目2：
走迷宫
> [!note] 
> 迷宫数组将如下所示
> 
> maze = [[1,1,1,1,1,1,1],
>         [1,0,0,0,0,0,3],
>         [1,0,1,0,1,0,1],
>         [0,0,1,0,0,0,1],
>         [1,0,1,0,1,0,1],
>         [1,0,0,0,0,0,1],
>         [1,2,1,0,1,0,1]]
> ..以及以下键值
> 
>       0 = 安全通行区域
>       1 = 墙壁
>       2 = 起点
>       3 = 终点
>   directions = "NNNNNEEEEE" == "Finish" // (directions passed as a string)


我的解答：
```c
#include <stddef.h>
#include <stdio.h>

char *maze_runner(const int *maze, size_t n, const char *directions) {
  if (maze == NULL || directions == NULL || n == 0) {
    return "Dead";
  }

  int x = 0, y = 0;
  int found = 0;

  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
      if (*(maze + j * n + i) == 2) {
        x = i;
        y = j;
        found = 1;
        break;
      }
    }
    if (found) {
      break;
    }
  }

  if (!found) {
        return "Dead"; 
  }

  const char* ptr = directions;
  while (*ptr != '\0') {
      switch (*ptr) {
          case 'N':
              y--;
              break;
          case 'S':
              y++;
              break;
          case 'W':
              x--;
              break;
          case 'E':
              x++;
              break;
          default:
              return "Dead";
      }

      // 边界检查
      if (x < 0 || x >= n || y < 0 || y >= n) {
          return "Dead";
      }    
      int cell_value = *(maze + y * n + x);
      if (cell_value == 1) {
          return "Dead";
      } else if (cell_value == 3) {
          return "Finish";
      }
      ptr++;
  }

  return "Lost";
}
```

一个简洁的解答
对于字符串 可以直接使用字符本身是否有效判断其是否结束 这个解答使用了`directions[i]` 作为for的循环判断

对于这个循环结构终止的判断有两种写法，循环第一次执行时，初值都是directions\[1\]
1. for
```c
for (size_t i = 0; directions[i]; i++)
{
//...
}
```
2. while：这个更简洁
```c
while (directions)
{
//...
directions++
}
```

```c
#include <stddef.h>
#include <iso646.h>

#define NORTH 'N'
#define SOUTH 'S'
#define EAST  'E'
#define WEST  'W'

#define START   2
#define WALL    1
#define FINISH  3

char *maze_runner(const int *maze, size_t n, const char *directions) {
    size_t x, y;
    for (size_t i = 0; i < n; i++){
        for (size_t j = 0; j < n; j++)
            if (maze[i * n + j] == START){
                x = j;
                y = i;
            }
    }
    for (size_t i = 0; directions[i]; i++){
        x += (directions[i] == EAST) - (directions[i] == WEST);
        y += (directions[i] == SOUTH) - (directions[i] == NORTH);
        if (maze[y * n + x] == WALL or x >= n or y >= n)
            return "Dead";
        if (maze[y * n + x] == FINISH)
            return "Finish";
    }
    return "Lost";
}
```