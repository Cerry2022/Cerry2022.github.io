---
date: 2025-06-03 16:53
modifyDate: 2025-06-03 17:11
title: cpp-node-1.5-std-三种set基础
category: CPP
tags:
  - cpp
description:
---
## C++ STL 映射容器家族：`std::map`, `std::unordered_map`, `std::multimap` 详解

C++ 标准模板库 (STL) 提供了三种主要的关联容器，用于存储**键值对 (key-value pairs)**：`std::map`、`std::unordered_map` 和 `std::multimap`。它们的核心概念都是通过一个唯一的键来快速查找对应的值，但它们在**内部实现、键的唯一性要求和元素顺序**上有着显著区别。

### 共同核心知识

1.  **头文件**:
    *   `std::map` 和 `std::multimap` 都需要 `#include <map>`。
    *   `std::unordered_map` 需要 `#include <unordered_map>`。
2.  **定义**:
    *   所有三种容器的定义方式类似：
        *   `ContainerType<KeyType, ValueType> myContainer;`
        *   例如：`std::map<int, std::string> myMap;`
        *   `std::unordered_map<std::string, double> myUnorderedMap;`
        *   `std::multimap<char, int> myMultimap;`
3.  **基本概念**:
    *   **键值对**: 存储的都是 `(键, 值)` 形式的数据。
    *   **关联容器**: 元素通过键来访问，而不是通过位置 (如 `std::vector`)。
    *   **动态大小**: 容器的大小会根据元素的增删动态调整。
    *   **迭代器**: 都支持迭代器遍历，但迭代顺序因容器类型而异。
    *   **常用成员函数 (共通部分)**:
        *   `insert()` / `emplace()`: 插入元素。
        *   `erase()`: 删除元素。
        *   `find()`: 查找元素。
        *   `empty()`: 检查容器是否为空。
        *   `size()`: 返回元素数量。
        *   `begin()` / `end()`: 获取迭代器。

### 核心区别与特性对比

| 特性 / 容器     | `std::map`                               | `std::unordered_map`                             | `std::multimap`                                |
| :-------------- | :--------------------------------------- | :----------------------------------------------- | :--------------------------------------------- |
| **键的唯一性**  | **唯一键 (Unique Keys)**                 | **唯一键 (Unique Keys)**                         | **允许重复键 (Multiple Keys)**                 |
| **元素顺序**    | **按键排序 (有序)**：根据键的比较函数 (默认 `operator<`) 自动排序。 | **无序**: 元素存储顺序依赖于哈希函数和内部实现，不保证任何特定顺序。 | **按键排序 (有序)**：与 `std::map` 相同，根据键的比较函数自动排序。对于重复键，其相对顺序不保证。 |
| **底层实现**    | **红黑树** (通常是自平衡二叉搜索树)。     | **哈希表** (通常是开放寻址或链式拉链法)。         | **红黑树** (通常是自平衡二叉搜索树)。         |
| **时间复杂度**  | **O(log N)** (插入、删除、查找)。       | **平均 O(1)** (插入、删除、查找)；**最坏 O(N)** (哈希冲突严重)。 | **O(log N)** (插入、删除、查找)。对于 `count` 和 `equal_range` 涉及重复键的操作，可能是 O(log N + M)，M 为重复键的数量。 |
| **键类型要求**  | 键类型必须支持**严格弱序 (Strict Weak Ordering)** (默认 `operator<`)。 | 键类型必须是**可哈希的 (Hashable)** (提供 `std::hash` 特化或自定义哈希函数) 且支持**相等比较 (`operator==`)**。 | 键类型必须支持**严格弱序 (Strict Weak Ordering)** (默认 `operator<`)。 |
| **特定成员函数** | `operator[]`, `at()`                     | `operator[]`, `at()`                             | `count()`, `equal_range()`, `lower_bound()`, `upper_bound()` |
| **访问重复键**  | 无概念 (键唯一)                           | 无概念 (键唯一)                                  | 使用 `count()` 获取数量；使用 `equal_range()`、`lower_bound()` 和 `upper_bound()` 迭代所有重复键。 |

### 详细讲解与代码示例

#### 1. `std::map` (有序，唯一键)

*   **特点**: 像一本字典，每个单词 (键) 都有唯一的解释 (值)，并且所有单词都按照字母顺序排列。
*   **优点**: **键自动排序**，遍历时元素有序；**性能稳定**。
*   **缺点**: 查找速度不如 `unordered_map` (平均)；额外内存开销。
*   **代码示例**:

    ```c++
    #include <iostream>
    #include <map>
    #include <string>

    void demo_map() {
        std::map<int, std::string> students;

        // 插入元素：operator[] 更简洁，insert 返回插入结果
        students[101] = "Alice";
        students.insert({103, "Charlie"});
        students[101] = "Alicia"; // 键101已存在，修改其值

        std::cout << "--- std::map 示例 ---" << std::endl;
        std::cout << "Map size: " << students.size() << std::endl; // Output: 2 (101和103)

        // 遍历 (按键有序)
        for (const auto& pair : students) {
            std::cout << "ID: " << pair.first << ", Name: " << pair.second << std::endl;
        }
        // Output:
        // ID: 101, Name: Alicia
        // ID: 103, Name: Charlie

        // 查找元素
        auto it = students.find(103);
        if (it != students.end()) {
            std::cout << "Found 103: " << it->second << std::endl; // Output: Charlie
        }

        // 使用 at() 访问 (键不存在会抛异常)
        try {
            std::cout << "Accessing 101 with at(): " << students.at(101) << std::endl; // Output: Alicia
            std::cout << "Accessing 999 with at(): " << students.at(999) << std::endl; // Throws std::out_of_range
        } catch (const std::out_of_range& e) {
            std::cerr << "Error: " << e.what() << std::endl;
        }

        // 删除元素
        students.erase(101);
        std::cout << "After erasing 101, map size: " << students.size() << std::endl; // Output: 1
    }
    ```

#### 2. `std::unordered_map` (无序，唯一键)

*   **特点**: 像一个散装的杂物抽屉，东西放进去时不会按顺序整理，但你知道大概放在哪个分区 (桶) 里，所以查找起来通常非常快。
*   **优点**: **极速查找** (平均 O(1))。
*   **缺点**: **元素无序**；最坏情况性能可能退化；可能需要自定义哈希函数。
*   **代码示例**:

    ```c++
    #include <iostream>
    #include <unordered_map>
    #include <string>

    void demo_unordered_map() {
        std::unordered_map<std::string, double> grades;

        // 插入元素
        grades["Math"] = 95.5;
        grades["Physics"] = 88.0;
        grades["Chemistry"] = 92.0;
        grades["Math"] = 98.0; // 键"Math"已存在，更新其值

        std::cout << "\n--- std::unordered_map 示例 ---" << std::endl;
        std::cout << "Unordered map size: " << grades.size() << std::endl; // Output: 3

        // 遍历 (顺序不确定)
        for (const auto& pair : grades) {
            std::cout << "Subject: " << pair.first << ", Grade: " << pair.second << std::endl;
        }
        // Output (order may vary):
        // Subject: Chemistry, Grade: 92
        // Subject: Physics, Grade: 88
        // Subject: Math, Grade: 98

        // 查找元素
        auto it = grades.find("Physics");
        if (it != grades.end()) {
            std::cout << "Found Physics grade: " << it->second << std::endl; // Output: 88
        }

        // 使用 at() 访问
        try {
            std::cout << "Accessing Chemistry with at(): " << grades.at("Chemistry") << std::endl; // Output: 92
        } catch (const std::out_of_range& e) {
            std::cerr << "Error: " << e.what() << std::endl;
        }

        // 删除元素
        grades.erase("Math");
        std::cout << "After erasing Math, unordered map size: " << grades.size() << std::endl; // Output: 2
    }
    ```

#### 3. `std::multimap` (有序，允许重复键)

*   **特点**: 像一个学生成绩单，一个学生 (键) 可能有多门课程的成绩 (值)，所有学生仍按姓名排序，但一个学生名下可能有多条成绩记录。
*   **优点**: **允许重复键**；**键自动排序**。
*   **缺点**: 没有 `operator[]` 和 `at()`；查找所有重复键的值相对复杂。
*   **代码示例**:

    ```c++
    #include <iostream>
    #include <map> // multimap也在<map>头文件中
    #include <string>

    void demo_multimap() {
        std::multimap<std::string, int> studentScores;

        // 插入元素 (允许重复键)
        studentScores.insert({"Alice", 90});
        studentScores.insert({"Bob", 85});
        studentScores.insert({"Alice", 95}); // Alice 的第二门成绩
        studentScores.emplace("Charlie", 78);
        studentScores.insert({"Bob", 70});   // Bob 的第二门成绩

        std::cout << "\n--- std::multimap 示例 ---" << std::endl;
        std::cout << "Multimap size: " << studentScores.size() << std::endl; // Output: 5

        // 遍历 (按键有序)
        for (const auto& pair : studentScores) {
            std::cout << "Name: " << pair.first << ", Score: " << pair.second << std::endl;
        }
        // Output:
        // Name: Alice, Score: 90
        // Name: Alice, Score: 95
        // Name: Bob, Score: 70
        // Name: Bob, Score: 85
        // Name: Charlie, Score: 78

        // 统计某个键的数量
        std::cout << "Count of Alice: " << studentScores.count("Alice") << std::endl; // Output: 2

        // 查找某个键的所有值
        std::string searchName = "Bob";
        auto range = studentScores.equal_range(searchName);
        std::cout << "Scores for " << searchName << ":" << std::endl;
        for (auto it = range.first; it != range.second; ++it) {
            std::cout << "  - " << it->second << std::endl;
        }
        // Output:
        // Scores for Bob:
        //   - 70
        //   - 85

        // 删除某个键的所有元素
        studentScores.erase("Bob");
        std::cout << "After erasing Bob, multimap size: " << studentScores.size() << std::endl; // Output: 3
    }
    ```

### 选择指南

*   **需要保持键的排序且键唯一？** -> 选择 `std::map`。
*   **不关心键的排序，但需要最快的平均查找/插入/删除速度且键唯一？** -> 选择 `std::unordered_map`。
*   **需要保持键的排序，且允许键重复？** -> 选择 `std::multimap`。
*   **不关心键的排序，且允许键重复？** -> 考虑 `std::unordered_multimap` (与 `unordered_map` 类似，但允许重复键)。