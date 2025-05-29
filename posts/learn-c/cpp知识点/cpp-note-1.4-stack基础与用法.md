---
date: 2025-05-29 16:51
modifyDate: 2025-05-29 16:52
title: cpp-note-1.4-stack基础与用法
category: CPP
tags:
  - cpp
description:
---

## C++ `std::stack` 基础与用法

`std::stack` 是 C++ 标准模板库 (STL) 中的一个容器适配器，它提供了一种 **后进先出 (Last-In, First-Out, LIFO)** 的数据结构。 类似于现实生活中的一叠盘子，最后被放入栈中的元素将是第一个被移除的元素。

### `std::stack` 核心知识

1.  **头文件**: `#include <stack>`
2.  **定义**:
    *   `std::stack<int> myStack;`        // 创建一个存储整数的栈
    *   `std::stack<double> doubleStack;` // 创建一个存储双精度浮点数的栈
    *   `std::stack<std::string> stringStack;` // 创建一个存储字符串的栈

3.  **主要特性**:
    *   **LIFO (Last-In, First-Out)**: 后进先出。
    *   **容器适配器**:  基于其他容器 (默认是 `std::deque`) 实现。  提供了受限的接口，以满足 LIFO 的要求。
    *   **动态大小**:  栈的大小是动态的，取决于底层容器的实现。

4.  **常用成员函数**:
    *   `push(const T& value)`: 将一个元素压入栈顶。
        *   `T`: 栈存储的元素类型。
        *   `value`: 要压入栈中的元素的值 (复制构造)。
    *   `emplace(Args&&... args)` (C++11 及以上): 在栈顶构造一个新元素 (避免复制或移动)。
        *   `Args&&... args`: 用于构造新元素所需的参数。
    *   `pop()`:  从栈顶移除 (弹出) 一个元素。 **不返回被移除的元素的值**.
    *   `top()`:  访问栈顶元素 (返回栈顶元素的 *引用*)。 **不移除元素**.
    *   `empty()`:  检查栈是否为空。
        *   返回 `true` 如果栈为空，否则返回 `false`。
    *   `size()`:  返回栈中元素的数量。

5.  **示例代码**:

    ```c++
    #include <iostream>
    #include <stack>
    #include <string>

    int main() {
        std::stack<int> myStack;

        // 压入元素
        myStack.push(10);
        myStack.push(20);
        myStack.push(30);

        std::cout << "Stack size: " << myStack.size() << std::endl; // 输出：Stack size: 3

        // 访问栈顶元素
        std::cout << "Top element: " << myStack.top() << std::endl; // 输出：Top element: 30

        // 弹出元素
        while (!myStack.empty()) {
            std::cout << "Popping: " << myStack.top() << std::endl;
            myStack.pop();
        }

        std::cout << "Stack size after popping: " << myStack.size() << std::endl; // 输出：Stack size after popping: 0

        // 使用 emplace (C++11+)
        std::stack<std::string> stringStack;
        stringStack.emplace("hello");
        stringStack.emplace("world");

        std::cout << "Top string: " << stringStack.top() << std::endl; // 输出：Top string: world

        return 0;
    }
    ```

6.  **底层实现**:
    *   默认使用 `std::deque` 作为底层容器.
    *   也可使用 `std::vector` 或 `std::list`，但 `deque` 通常是最佳选择.

7.  **使用注意事项**:
    *   在使用 `top()` 之前，**必须**先调用 `empty()` 检查栈是否为空.
    *   `pop()` 仅移除元素，**不返回**元素的值.  使用 `top()` 获取后再使用 `pop()`.
    *   **没有迭代器**: 无法使用迭代器遍历 `std::stack`.
    *   **容器适配器**: 提供受限接口，满足 LIFO.

8.  **应用场景**:
    *   表达式求值 (后缀表达式)。
    *   函数调用栈。
    *   括号匹配。
    *   深度优先搜索 (DFS)。
    *   撤销/重做功能。
    *   回溯算法。
    *   浏览器历史记录。
