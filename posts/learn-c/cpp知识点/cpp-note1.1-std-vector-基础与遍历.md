---
date: 2025-05-25 00:42
modifyDate: 2025-05-24 23:39
title: cpp-note1.1-std-vector-基础与遍历
category: CPP
tags:
  - 嵌入式
description:
---

## C++ `std::vector` 基础与遍历

`std::vector` 是 C++ 标准库中的动态数组，它允许在运行时调整大小，元素在内存中连续存放。

### `std::vector` 核心知识

1.  **头文件**: `#include <vector>`
2.  **定义**:
    *   `std::vector<int> v1;` // 空vector
    *   `std::vector<int> v2 = {1, 2, 3};` // 初始化 (C++11 列表初始化)
    *   `std::vector<int> v3(10);` // 10个元素，默认初始化为0 (对于基本类型)
    *   `std::vector<int> v4(5, 100);` // 5个元素，都为100
3.  **主要特性**:
    *   **动态大小**: 自动管理内存，可增删元素。
    *   **连续存储**: 元素内存连续，支持 O(1) 随机访问。
    *   **高效末尾操作**: `push_back()`, `pop_back()` 通常 O(1) 摊还时间。
    *   **低效中间操作**: `insert()`, `erase()` 通常 O(N)。
4.  **常用成员函数**:
    *   `push_back(val)`: 末尾添加元素。
    *   `pop_back()`: 删除末尾元素。
    *   `size()`: 元素数量 (类型为 `size_t`)。
    *   `empty()`: 是否为空。
    *   `clear()`: 清空所有元素。
    *   `at(idx)`: 访问元素（带边界检查，抛出 `std::out_of_range` 异常，安全）。
    *   `operator[](idx)`: 访问元素（不带边界检查，速度快，不安全）。
    *   `front()`: 第一个元素。
    *   `back()`: 最后一个元素。
    *   `begin()`, `end()`: 获取正向迭代器。
    *   `rbegin()`, `rend()`: 获取反向迭代器。
    *   `cbegin()`, `cend()`, `crbegin()`, `crend()`: 获取常量迭代器 (C++11+)。

### 嵌套 `std::vector` (例如，2D 数组)

嵌套的 `std::vector` 常用于表示多维数据结构，例如 2D 数组（矩阵）。`std::vector<std::vector<int>>` 的使用方式与普通 `vector` 类似，只是多了一层维度。

*   **访问元素**: `matrix[row_index][col_index]`
*   **获取行数**: `matrix.size()`
*   **获取列数** (假定所有行等长): `matrix[0].size()` (请先检查 `matrix.empty()` 和 `matrix[0].empty()` 以防越界)

```cpp
#include <iostream>
#include <vector>

void printAndModifyMatrix(std::vector<std::vector<int>>& m) {
    std::cout << "--- 原始矩阵 ---" << std::endl;
    // 遍历并打印
    for (const auto& row : m) { // row 是 const std::vector<int>&
        for (int val : row) {   // val 是 int
            std::cout << val << " ";
        }
        std::cout << std::endl;
    }

    // 修改第一个元素
    if (!m.empty() && !m[0].empty()) {
        m[0][0] = 99;
        std::cout << "\n--- 修改后矩阵 ---" << std::endl;
        for (const auto& row : m) {
            for (int val : row) {
                std::cout << val << " ";
            }
            std::cout << std::endl;
        }
    }
}

int main() {
    std::vector<std::vector<int>> myMatrix = {{1, 2, 3}, {4, 5, 6}};
    printAndModifyMatrix(myMatrix); // 传入引用，允许函数修改原矩阵
    return 0;
}
/*
Output:
--- 原始矩阵 ---
1 2 3
4 5 6

--- 修改后矩阵 ---
99 2 3
4 5 6
*/
```

### `std::vector` 遍历方式

#### 1. 基于范围的 `for` 循环 (Range-based for loop) - **推荐 (C++11+)**
**特点**: 最简洁、安全，适用于绝大多数只读或元素独立的修改场景。不能直接获取索引，不应在循环内修改容器大小（添加或删除元素）。

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> numbers = {10, 20, 30};

    // 只读访问
    std::cout << "只读访问: ";
    for (int num : numbers) { // num 是 numbers 中元素的副本
        std::cout << num << " "; // 10 20 30
    }
    std::cout << std::endl;

    // 修改元素
    std::cout << "修改后: ";
    for (int& num : numbers) { // 使用引用 'int&' 才能修改原元素
        num *= 2;
    }
    for (int num : numbers) {
        std::cout << num << " "; // 20 40 60
    }
    std::cout << std::endl;
    return 0;
}
```

#### 2. 基于索引的循环 (Index-based loop)
**特点**: 传统方式，当需要知道元素索引时使用，或者需要跳跃访问时。

```cpp
#include <iostream>
#include <vector>
#include <string> // For std::string

int main() {
    std::vector<std::string> names = {"Alice", "Bob", "Charlie"};
    for (size_t i = 0; i < names.size(); ++i) { // 推荐使用 size_t 类型作为索引
        std::cout << "Name at " << i << ": " << names[i] << std::endl;
    }
    return 0;
}
```

#### 3. 使用迭代器 (Iterator-based loop)
**特点**: 最通用、最灵活，适用于所有标准容器。可进行复杂操作（如循环内安全地插入/删除元素），但需注意迭代器失效问题。

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<double> scores = {1.1, 2.2, 3.3};

    // 传统迭代器遍历
    std::cout << "传统迭代器: ";
    for (std::vector<double>::iterator it = scores.begin(); it != scores.end(); ++it) {
        std::cout << *it << " "; // 解引用迭代器获取元素
    }
    std::cout << std::endl;

    // 使用 auto 简化 (C++11+)
    // cbegin()/cend() 返回 const_iterator，用于只读访问，更安全。
    std::cout << "使用 auto 和 const 迭代器: ";
    for (auto it = scores.cbegin(); it != scores.cend(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    return 0;
}
```

#### 4. 使用反向迭代器 (Reverse Iterator)
**特点**: 从 `vector` 末尾向前遍历。

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> data = {1, 2, 3};
    std::cout << "反向遍历: ";
    for (auto rit = data.rbegin(); rit != data.rend(); ++rit) { // rbegin()/rend() 返回反向迭代器
        std::cout << *rit << " "; // 3 2 1
    }
    std::cout << std::endl;
    return 0;
}
```

---
**推荐使用场景总结**:
*   **日常遍历 (读或独立修改)**: **基于范围的 `for` 循环** (最简洁、安全)。
*   **需要元素索引**: 基于索引的 `for` 循环。
*   **复杂操作/通用性 (例如循环中增删元素)**: 迭代器循环 (需谨慎处理迭代器失效)。