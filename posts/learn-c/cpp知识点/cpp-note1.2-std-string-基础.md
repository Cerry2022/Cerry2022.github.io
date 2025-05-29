---
date: 2025-05-25 00:57
modifyDate: 2025-05-25 00:55
title: cpp-note1.2-std-string-基础
category: CPP
tags:
  - cpp
description:
---
**`std::string` 进阶与细节**

1.  **本质：**
    *   `std::string` 是一个 **模板类 `std::basic_string<char>` 的特化**。
    *   它在内部通常维护一个指向字符数组的指针、当前字符串的长度以及已分配内存的容量（capacity）。

2.  **构造函数多样性：**
    ```cpp
    std::string s1;                   // 默认构造，空字符串
    std::string s2("hello");          // 从 C 风格字符串构造
    std::string s3(s2);               // 拷贝构造
    std::string s4(s2, 1, 3);         // 从 s2 的索引 1 开始取 3 个字符 ("ell")
    std::string s5(5, 'x');           // 包含 5 个 'x' 的字符串 ("xxxxx")
    std::string s6 = "world";         // 赋值构造（隐式转换）
    ```

3.  **容量 (Capacity) 与大小 (Size/Length)：**
    *   **`length()` 或 `size()`：** 实际存储的字符数（不包括终止符 `\0`）。
    *   **`capacity()`：** 当前字符串已分配的内存空间（包括终止符 `\0` 的空间，但不计入返回结果），通常 `capacity() >= size()`。当 `size()` 超过 `capacity()` 时，`string` 会自动重新分配更大的内存。
    *   **`reserve(n)`：** 预留至少 `n` 个字符的空间，避免频繁的内存重新分配，提高效率。
    *   **`shrink_to_fit()` (C++11)：** 请求减少 `capacity()` 到 `size()`，释放多余内存（不保证一定会收缩）。

4.  **字符访问：**
    *   **`s[i]`：** 快速访问，但 **不进行边界检查**。越界访问会导致未定义行为。
    *   **`s.at(i)`：** 访问字符，**进行边界检查**。如果越界，会抛出 `std::out_of_range` 异常。
    *   **迭代器：** `s.begin()`, `s.end()`, `s.rbegin()`, `s.rend()` 用于遍历，支持范围for循环 `for (char c : s)`。

5.  **比较操作：**
    *   支持所有关系运算符：`==`, `!=`, `<`, `<=`, `>`, `>=`。
    *   按字典序比较（逐字符比较 ASCII 值）。
    ```cpp
    if (s1 == s2) { /* ... */ }
    if (s1 < "apple") { /* ... */ }
    ```

6.  **修改字符串：**
    *   **`append()`：** 在末尾添加字符串，与 `+` 或 `+=` 类似，但可以更灵活地指定要添加的部分。
    *   **`assign()`：** 替换当前字符串内容。
    *   **`insert(pos, str)`：** 在指定位置插入字符串。
    *   **`erase(pos, len)`：** 删除从 `pos` 开始 `len` 个字符。
    *   **`replace(pos, len, str)`：** 替换从 `pos` 开始 `len` 个字符为 `str`。

7.  **`c_str()` 与 `data()`：**
    *   **`s.c_str()`：** 返回一个以 `null` 结尾的 `const char*` 指针。**不要修改**这个指针指向的内容，它的生命周期与 `string` 对象绑定。
    *   **`s.data()` (C++11)：** 返回一个 `const char*` 指向内部数据，但不保证以 `null` 结尾。在 C++11 之后，`s.data()` 返回的指针是连续的，且在 C++17 之后，`s.data()` 返回的指针也保证以 `null` 结尾（与 `c_str()` 相同）。如果需要修改内部数据（不常见且危险），在 C++11 后可以通过 `s.data()` 得到一个 `char*`（如果 `string` 是非 `const` 的）。

8.  **输入/输出：**
    *   `std::cin >> myString;` // 读取一个单词（以空格、换行符分隔）
    *   `std::getline(std::cin, myString);` // 读取一整行直到换行符
    *   `std::cout << myString;` // 输出字符串

9.  **效率考虑：**
    *   频繁的字符串拼接（如在循环中使用 `+`）可能导致多次内存重新分配，效率低下。可以考虑使用 `append()`，或者预先 `reserve()` 空间，或者使用 `std::stringstream` 进行构建。

**示例代码片段：**

```cpp
#include <iostream>
#include <string> // 必须包含

int main() {
    std::string s1 = "Hello";
    std::string s2 = " World";

    // 拼接
    std::string s3 = s1 + s2;
    std::cout << "s3: " << s3 << std::endl; // Output: Hello World

    // 长度与容量
    std::cout << "s3 length: " << s3.length() << std::endl;
    std::cout << "s3 capacity: " << s3.capacity() << std::endl;

    // 访问字符
    std::cout << "s3[0]: " << s3[0] << std::endl; // Output: H
    try {
        std::cout << "s3.at(100): " << s3.at(100) << std::endl;
    } catch (const std::out_of_range& e) {
        std::cerr << "Error: " << e.what() << std::endl; // Output: Error: basic_string::at: __n (which is 100) >= this->size() (which is 11)
    }

    // 查找与子串
    size_t pos = s3.find("World");
    if (pos != std::string::npos) {
        std::cout << "'World' found at position: " << pos << std::endl; // Output: 'World' found at position: 6
        std::string sub = s3.substr(pos, 5);
        std::cout << "Substring: " << sub << std::endl; // Output: World
    }

    // 转换为 C 风格字符串
    const char* c_str = s3.c_str();
    std::cout << "C-style string: " << c_str << std::endl; // Output: Hello World

    // 修改
    s1.clear();
    std::cout << "s1 empty? " << s1.empty() << std::endl; // Output: s1 empty? 1

    s1.append("New Content");
    std::cout << "s1: " << s1 << std::endl; // Output: New Content

    s1.replace(4, 3, "---"); // 从索引4开始，替换3个字符为"---"
    std::cout << "s1 after replace: " << s1 << std::endl; // Output: New ---tent

    return 0;
}
```

---

## **`std::string` 的遍历**

遍历 `std::string` 是访问其中每个字符的常见操作。C++ 提供了多种方式来实现这一点，每种方式都有其适用场景和特点。

1.  **基于范围的 for 循环 (Range-based for loop) - (C++11 及更高版本推荐)**
    这是现代 C++ 中最简洁、最推荐的遍历方式，因为它自动处理迭代器的开始和结束，不易出错。

    *   **语法：** `for (char_type variable_name : string_object)`
    *   **特点：**
        *   **简洁易读：** 代码量最少。
        *   **安全：** 不涉及手动管理索引或迭代器，降低了越界风险。
        *   **默认只读：** `char c` 形式是按值拷贝，不会修改原字符串。
        *   **可修改：** 使用 `char& c` (引用) 可以直接修改字符串中的字符。

    ```cpp
    std::string s = "Hello C++";

    // 1. 只读遍历 (按值拷贝，不修改原字符串)
    std::cout << "Read-only (by value): ";
    for (char c : s) {
        std::cout << c << " "; // 输出: H e l l o   C + +
    }
    std::cout << std::endl;

    // 2. 可修改遍历 (通过引用修改原字符串)
    std::cout << "Modifiable (by reference): ";
    for (char& c : s) { // 注意这里的 '&'
        if (c == ' ') {
            c = '_'; // 将空格替换为下划线
        }
        std::cout << c << " ";
    }
    std::cout << std::endl; // 输出: H e l l o _ C + +
    std::cout << "String after modification: " << s << std::endl; // 输出: Hello_C++
    ```

2.  **使用索引 (Index-based loop)**
    这是 C 语言风格的遍历方式，通过整数索引访问每个字符。

    *   **语法：** `for (size_t i = 0; i < s.length(); ++i)`
    *   **特点：**
        *   **控制精确：** 可以精确控制起始和结束位置，以及步长。
        *   **可修改：** `s[i]` 可以用于读写字符。
        *   **潜在风险：** 需要手动管理索引，容易发生越界错误。使用 `s.at(i)` 可以提供边界检查，但会带来额外的性能开销。

    ```cpp
    std::string s = "ABCDE";

    // 1. 正向遍历
    std::cout << "Index-based forward: ";
    for (size_t i = 0; i < s.length(); ++i) { // 或 s.size()
        std::cout << s[i] << " "; // 输出: A B C D E
    }
    std::cout << std::endl;

    // 2. 反向遍历 (或特定步长)
    std::cout << "Index-based reverse: ";
    for (int i = s.length() - 1; i >= 0; --i) {
        std::cout << s[i] << " "; // 输出: E D C B A
    }
    std::cout << std::endl;
    ```

3.  **使用迭代器 (Iterator-based loop)**
    `std::string` 像所有标准库容器一样，支持迭代器。迭代器提供了一种抽象的指针概念，可以指向容器中的元素。

    *   **常用迭代器：**
        *   `s.begin()`: 指向字符串的第一个字符。
        *   `s.end()`: 指向字符串末尾的“过去”位置（即最后一个字符的下一个位置）。
        *   `s.cbegin()` / `s.cend()` (C++11): 返回 `const_iterator`，只读遍历。
        *   `s.rbegin()` / `s.rend()` (反向迭代器): 用于反向遍历。
        *   `s.crbegin()` / `s.crend()` (C++11): 返回 `const_reverse_iterator`，只读反向遍历。

    *   **特点：**
        *   **通用性强：** 适用于所有标准库容器，统一了遍历接口。
        *   **灵活：** 可以用于更复杂的算法（如 `std::find`, `std::sort` 等）。
        *   **可修改：** 非 `const` 迭代器可以修改其指向的元素。

    ```cpp
    std::string s = "Iterator";

    // 1. 正向遍历 (读写)
    std::cout << "Iterator-based forward: ";
    for (std::string::iterator it = s.begin(); it != s.end(); ++it) {
        *it = std::toupper(*it); // 将字符转为大写 (需要 #include <cctype>)
        std::cout << *it << " "; // 输出: I T E R A T O R
    }
    std::cout << std::endl;
    std::cout << "String after modification: " << s << std::endl; // Output: ITERATOR

    // 2. 正向遍历 (只读，使用 const_iterator 或 auto)
    std::cout << "Iterator-based const_iterator: ";
    for (std::string::const_iterator it = s.cbegin(); it != s.cend(); ++it) {
        std::cout << *it << " "; // 输出: I T E R A T O R
    }
    std::cout << std::endl;

    // 3. 反向遍历
    std::cout << "Reverse iterator: ";
    for (std::string::reverse_iterator it = s.rbegin(); it != s.rend(); ++it) {
        std::cout << *it << " "; // 输出: R O T A R E T I
    }
    std::cout << std::endl;
    ```
