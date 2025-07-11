---
date: 2025-06-03 16:53
modifyDate: 2025-07-01 16:39
title: cpp-node-1.5-std-三种set基础
category: CPP
tags:
  - cpp
description:
---


## C++ STL 映射容器家族：std::map, std::unordered\_map, std::multimap 详解

STL提供 三种主要的关联容器，用于存储 **键值对 (key-value pairs)** ：
std::map 、 std::unordered\_map 和 std::multimap 。
它们的核心概念都是通过一个唯一的键来快速查找对应的值，但它们在 **内部实现、键的唯一性要求和元素顺序** 上有着显著区别。
此外，STL 也提供了一组 **集合容器** ，用于存储 **唯一元素** 或 **允许重复元素** 的集合。
其中， std::set 和 std::unordered\_set 类似于映射容器，但它们只存储键，不存储值。

### 共同核心知识

- **头文件**:
	- std::map 和 std::multimap -> ` #include <map> `。
	- std::unordered\_map 和 std::unordered\_multimap -> ` #include <unordered_map>` 。
	- std::set 和 std::multiset -> `#include <set> `。
	- std::unordered\_set -> ` #include <unordered_set>` 。
- **定义**:
	- **映射容器 (存储键值对)** ： `ContainerType<KeyType, ValueType> myContainer`;
		- 例如：` std::map<int, std::string> myMap`;
		- std::unordered\_map<std::string, double> myUnorderedMap;
		- std::multimap<char, int> myMultimap;
	- **集合容器 (只存储键/元素)** ： `ContainerType<ElementType> myContainer`;
		- 例如： `std::set<int> mySet`;
		- `std::unordered_set<std::string> myUnorderedSet`;
- **基本概念**:
	- **键值对 (映射容器)**: 存储 (键, 值) 形式的数据。
	- **元素 (集合容器)**: 只存储 元素本身 (作为键)。
	- **关联容器**: 元素通过键来访问，而不是通过位置 (如 std::vector)。
	- **动态大小**: 容器的大小会根据元素的增删动态调整。
	- **迭代器**: 都支持迭代器遍历，但迭代顺序因容器类型而异。
	- **常用成员函数 (共通部分)**:
		- insert() / emplace(): 插入元素。
		- erase(): 删除元素。
		- find(): 查找元素。
		- empty(): 检查容器是否为空。
		- size(): 返回元素数量。
		- begin() / end(): 获取迭代器。

### 核心区别与特性对比 (映射容器)

| 特性 / 容器 | std::map | std::unordered\_map | std::multimap |
| --- | --- | --- | --- |
| **键的唯一性** | **唯一键 (Unique Keys)** | **唯一键 (Unique Keys)** | **允许重复键 (Multiple Keys)** |
| **元素顺序** | **按键排序 (有序)** ：根据键的比较函数 (默认 operator<) 自动排序。 | **无序**: 元素存储顺序依赖于哈希函数和内部实现，不保证任何特定顺序。 | **按键排序 (有序)** ：与 std::map 相同，根据键的比较函数自动排序。对于重复键，其相对顺序不保证。 |
| **底层实现** | **红黑树** (通常是自平衡二叉搜索树)。 | **哈希表** (通常是开放寻址或链式拉链法)。 | **红黑树** (通常是自平衡二叉搜索树)。 |
| **时间复杂度** | **O(log N)** (插入、删除、查找)。 | **平均 O(1)** (插入、删除、查找)； **最坏 O(N)** (哈希冲突严重)。 | **O(log N)** (插入、删除、查找)。对于 count 和 equal\_range 涉及重复键的操作，可能是 O(log N + M)，M 为重复键的数量。 |
| **键类型要求** | 键类型必须支持 **严格弱序 (Strict Weak Ordering)** (默认 operator<)。 | 键类型必须是 **可哈希的 (Hashable)** (提供 std::hash 特化或自定义哈希函数) 且支持 **相等比较 (operator==)** 。 | 键类型必须支持 **严格弱序 (Strict Weak Ordering)** (默认 operator<)。 |
| **特定成员函数** | operator\[\], at() | operator\[\], at() | count(), equal\_range(), lower\_bound(), upper\_bound() |
| **访问重复键** | 无概念 (键唯一) | 无概念 (键唯一) | 使用 count() 获取数量；使用 equal\_range() 、 lower\_bound() 和 upper\_bound() 迭代所有重复键。 |

### 集合容器 (std::set, std::unordered\_set) 简述

集合容器不存储键值对，只存储元素本身。其内部实现和性能特性与对应的映射容器非常相似：

- **`std::set<T>`** :
	- **特点**: 有序，元素唯一。底层实现为红黑树。
	- **时间复杂度**: O(log N)。
	- **应用场景**: 需要存储一组唯一且有序的元素，例如：==排序后的不重复数字列表==。
- **`std::unordered_set<T>`**:
	- **特点**: 无序，元素唯一。底层实现为哈希表。
	- **时间复杂度**: 平均 O(1)，最坏 O(N)。
	- **应用场景**: ==需要快速检查某个元素是否存在于集合中，且不关心元素的顺序。==例如：记录已访问过的节点、去重。

### 详细讲解与代码示例

#### 1\. std::map (有序，唯一键)

- **特点**: 像一本字典，每个单词 (键) 都有唯一的解释 (值)，并且所有单词都按照字母顺序排列。
- **优点**: **键自动排序** ，遍历时元素有序； **性能稳定** 。
- **缺点**: 查找速度不如 unordered\_map (平均)；额外内存开销。
- **代码示例**:
	```cpp
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
	    std::cout << "Map size: " << students.size() << std::endl;
	    // 遍历 (按键有序)
	    for (const auto& pair : students) {
	        std::cout << "ID: " << pair.first << ", Name: " << pair.second << std::endl;
	    }
	    // 查找元素
	    auto it = students.find(103);
	    if (it != students.end()) {
	        std::cout << "Found 103: " << it->second << std::endl;
	    }
	    // 使用 at() 访问 (键不存在会抛异常)
	    try {
	        std::cout << "Accessing 101 with at(): " << students.at(101) << std::endl;
	        // std::cout << "Accessing 999 with at(): " << students.at(999) << std::endl; // 这行会抛出异常
	    } catch (const std::out_of_range& e) {
	        std::cerr << "Error: " << e.what() << std::endl;
	    }
	    // 删除元素
	    students.erase(101);
	    std::cout << "After erasing 101, map size: " << students.size() << std::endl;
	}
	```

#### 2\. std::unordered\_map (无序，唯一键)

- **特点**: 像一个散装的杂物抽屉，东西放进去时不会按顺序整理，但你知道大概放在哪个分区 (桶) 里，所以查找起来通常非常快。
- **优点**: **极速查找** (平均 O(1))。
- **缺点**: **元素无序** ；最坏情况性能可能退化；可能需要自定义哈希函数。
- **代码示例**:
	```cpp
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
	    std::cout << "Unordered map size: " << grades.size() << std::endl;
	    // 遍历 (顺序不确定)
	    for (const auto& pair : grades) {
	        std::cout << "Subject: " << pair.first << ", Grade: " << pair.second << std::endl;
	    }
	    // 查找元素
	    auto it = grades.find("Physics");
	    if (it != grades.end()) {
	        std::cout << "Found Physics grade: " << it->second << std::endl;
	    }
	    // 使用 at() 访问
	    try {
	        std::cout << "Accessing Chemistry with at(): " << grades.at("Chemistry") << std::endl;
	    } catch (const std::out_of_range& e) {
	        std::cerr << "Error: " << e.what() << std::endl;
	    }
	    // 删除元素
	    grades.erase("Math");
	    std::cout << "After erasing Math, unordered map size: " << grades.size() << std::endl;
	}
	```

#### 3\. std::multimap (有序，允许重复键)

- **特点**: 像一个学生成绩单，一个学生 (键) 可能有多门课程的成绩 (值)，所有学生仍按姓名排序，但一个学生名下可能有多条成绩记录。
- **优点**: **允许重复键** ； **键自动排序** 。
- **缺点**: 没有 operator\[\] 和 at() ；查找所有重复键的值相对复杂。
- **代码示例**:
	```cpp
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
	    std::cout << "Multimap size: " << studentScores.size() << std::endl;
	    // 遍历 (按键有序)
	    for (const auto& pair : studentScores) {
	        std::cout << "Name: " << pair.first << ", Score: " << pair.second << std::endl;
	    }
	    // 统计某个键的数量
	    std::cout << "Count of Alice: " << studentScores.count("Alice") << std::endl;
	    // 查找某个键的所有值
	    std::string searchName = "Bob";
	    auto range = studentScores.equal_range(searchName);
	    std::cout << "Scores for " << searchName << ":" << std::endl;
	    for (auto it = range.first; it != range.second; ++it) {
	        std::cout << "  - " << it->second << std::endl;
	    }
	    // 删除某个键的所有元素
	    studentScores.erase("Bob");
	    std::cout << "After erasing Bob, multimap size: " << studentScores.size() << std::endl;
	}
	```

#### 4\. `std::unordered_set<int>` (无序，唯一元素)

- **特点**: 一个高效的篮子，用于存放独一无二的物品。当你想知道某个物品是否已经在篮子里时，它能非常快速地告诉你。
- **优点**: **极速检查元素是否存在** (平均 O(1))； **自动去重** 。
- **缺点**: **元素无序** ；最坏情况性能可能退化。
- **代码示例**:
	```cpp
	#include <iostream>
	#include <unordered_set> // 包含unordered_set头文件
	void demo_unordered_set() {
	    // 定义一个存储整数的无序集合，用于记录已访问过的金额
	    std::unordered_set<int> visited_amounts;
	    std::cout << "\n--- std::unordered_set 示例 ---" << std::endl;
	    // 插入元素
	    visited_amounts.insert(100);
	    visited_amounts.insert(25);
	    visited_amounts.insert(75);
	    visited_amounts.insert(25); // 25已存在，不会被重复插入
	    std::cout << "Set size: " << visited_amounts.size() << std::endl; // Output: 3 (100, 25, 75)
	    // 检查元素是否存在 (O(1) 平均时间复杂度)
	    if (visited_amounts.count(100)) { // count返回0或1
	        std::cout << "100 has been visited." << std::endl;
	    }
	    if (visited_amounts.find(50) == visited_amounts.end()) { // find返回迭代器
	        std::cout << "50 has not been visited." << std::endl;
	    }
	    // 遍历 (顺序不确定)
	    std::cout << "Visited amounts: ";
	    for (int amount : visited_amounts) {
	        std::cout << amount << " ";
	    }
	    std::cout << std::endl;
	    // 删除元素
	    visited_amounts.erase(75);
	    std::cout << "After erasing 75, set size: " << visited_amounts.size() << std::endl; // Output: 2
	}
	// 主函数，调用所有示例
	int main() {
	    demo_map();
	    demo_unordered_map();
	    demo_multimap();
	    demo_unordered_set();
	    return 0;
	}
	```

### 选择指南

- **需要保持键的排序且键唯一？** \-> 选择 std::map 。
- **不关心键的排序，但需要最快的平均查找/插入/删除速度且键唯一？** \-> 选择 std::unordered\_map 。
- **需要保持键的排序，且允许键重复？** \-> 选择 std::multimap 。
- **需要存储一组唯一且有序的元素？** \-> 选择 std::set 。
- **需要快速判断某个元素是否存在于一个唯一集合中，不关心顺序？** \-> 选择 std::unordered\_set 。
- **不关心键的排序，且允许键重复？** \-> 考虑 std::unordered\_multimap (与 unordered\_map 类似，但允许重复键)。
- **需要存储一组允许重复且有序的元素？** \-> 考虑 std::multiset 。
