---
date: 2025-05-29 15:36
modifyDate: 2025-05-29 15:39
title: cpp-note-1.3-std-queue-基础
category: CPP
tags:
  - cpp
description:
---


在 C++ 中，queue 是一种**先进先出 (FIFO - First-In, First-Out)** 的线性数据结构。这意味着最先被插入队列的元素将是最先被移除的元素。 你可以将其想象成现实生活中的排队等待场景，比如人们在银行或超市排队。

### std::queue 核心知识

1.  **头文件**: `#include <queue>`
2.  **定义**:

    *   `std::queue<int> q1;`  // 默认底层容器是 `std::deque`，空队列，存储 `int` 类型元素。
    *   `std::queue<double> q2;`  // 空队列，存储 `double` 类型元素。
    *   `std::queue<std::string> q3;`  // 空队列，存储 `std::string` 类型元素。
    *   `std::queue<int, std::list<int>> q4;` // 使用 `std::list` 作为底层容器 (很少见，但可能)。 显式指定底层容器。
    *   `std::queue<int, std::deque<int>> q5;` // 使用 `std::deque` 作为底层容器 (默认)。 显式指定底层容器 (通常不必)。
3.  **主要特性**:

    *   **FIFO (First-In, First-Out)**:  遵循先进先出的原则。  最先进入队列的元素最先被移除。
    *   **访问限制**: 只能访问队首元素（最早进入的元素）和队尾元素（最新进入的元素）。 不能直接访问中间元素。
    *   **动态大小**:  队列的大小是动态的，取决于底层容器的特性。 队列会自动管理内存。
    *   **封装性**: `queue` 是一个容器适配器。这意味着它不是一个独立的容器，而是建立在其他容器（如 `deque` 或 `list`）之上的，并提供了特定的接口（`push`, `pop`, `front`, `back`, `empty`, `size`）。 `queue` 隐藏了底层容器的实现细节，对外只暴露了 FIFO 的操作接口。
    *   **底层容器的可选性**: 虽然默认使用 `deque`，但你可以通过模板参数选择不同的底层容器。这使得 `queue` 具有一定的灵活性，可以根据不同的应用场景选择最适合的底层实现。 例如，如果你需要频繁地在队列中间插入和删除元素，可以考虑使用 `list` 作为底层容器。 但是，通常情况下，`deque` 已经足够高效了。
4.  **常用成员函数**:

    *   `push(const T& val)`:  在队列的末尾添加一个元素。  `T` 是队列存储的元素类型。 (入队)
    *   `pop()`:  移除队列的第一个元素 (队首)。  没有返回值。 (出队)
    *   `front()`:  返回队列的第一个元素（队首）的 *引用*。  不移除元素。  如果队列为空，行为未定义 (使用前检查 `empty()`)。
    *   `back()`:  返回队列的最后一个元素（队尾）的 *引用*.  不移除元素。  如果队列为空，行为未定义 (使用前检查 `empty()`)。
    *   `empty()`:  检查队列是否为空。  返回 `bool` 值 (`true` 表示空，`false` 表示非空)。
    *   `size()`:  返回队列中元素的数量。 返回值类型为 `size_t`。
    *   `emplace(args...)` (C++11 及以上):  在队列的末尾就地构造一个新元素。  避免了复制或移动元素的开销 (与 `push` 相比)。  `args` 是构造新元素所需的参数。
5.  **底层实现 (重要):**

    *   `queue` 的底层实现通常使用 `deque` (双端队列) 或 `list` 作为其底层容器。
    *   **`deque` 作为底层容器 (默认):**  `deque` 提供了在两端进行高效插入和删除的能力 (O(1) 平均时间复杂度)。 这使得 `push` 和 `pop` 操作非常高效，因此 `deque` 是 `queue` 最常见的底层实现。 此外，`deque` 在内存分配上具有一定的优势，避免了频繁的内存分配和释放。
    *   **`list` 作为底层容器**:  `list` 也可用于 `queue`。 `list` 的主要优点是在任何位置进行插入和删除操作都非常高效 (O(1))。 但对于 `queue` 来说，`push` 和 `pop` 操作通常是在队列的两端进行的，因此 `deque` 通常是更好的选择，因为它具有更低的内存开销和更好的缓存局部性。
    *   **选择底层容器的影响**: 底层容器的选择会影响 `queue` 的性能。 对于绝大多数应用，使用默认的 `deque` 就足够了。 只有在特殊情况下，例如需要频繁地在队列中间插入元素，才考虑使用 `list` 作为底层容器。

6.  **迭代器 (注意):**

    *   `queue` **不提供**迭代器。  你无法直接使用迭代器遍历 `queue` 中的元素。 这是因为 `queue` 的设计目标是提供 FIFO 操作，隐藏了底层容器的实现细节，并限制了访问方式。 必须通过 `front()` 和 `pop()` 来逐个访问和处理元素。
    *   如果你需要遍历队列中的元素，请考虑使用循环结合 `front()` 和 `pop()`，或者复制队列到一个可以使用迭代器的容器 (例如 `vector` 或 `list`)。  注意，在复制的过程中，原始队列的内容会被修改。
7.  **示例代码**:

    ```cpp
    #include <iostream>
    #include <queue>
    #include <string>

    int main() {
        // 创建一个存储整数的队列
        std::queue<int> myQueue;

        // 入队 (push)
        myQueue.push(10);
        myQueue.push(20);
        myQueue.push(30);

        // 访问队列的大小
        std::cout << "Queue size: " << myQueue.size() << std::endl; // 输出：Queue size: 3

        // 访问队首元素
        std::cout << "Front element: " << myQueue.front() << std::endl; // 输出：Front element: 10

        // 访问队尾元素
        std::cout << "Back element: " << myQueue.back() << std::endl; // 输出：Back element: 30

        // 出队并打印元素
        while (!myQueue.empty()) {
            std::cout << "Popping: " << myQueue.front() << std::endl;
            myQueue.pop();
        }

        // 检查队列是否为空
        std::cout << "Is queue empty? " << myQueue.empty() << std::endl; // 输出：Is queue empty? 1
        std::cout << "Queue size: " << myQueue.size() << std::endl; // 输出: Queue size: 0


        // 使用 emplace (C++11+)
        std::queue<std::string> stringQueue;
        stringQueue.emplace("hello"); // 直接在队列末尾构造一个 string 对象
        stringQueue.emplace("world");

        std::cout << "String Queue Front: " << stringQueue.front() << std::endl;  // Output: String Queue Front: hello
        return 0;
    }
    ```

8.  **应用场景**:

    *   **广度优先搜索 (BFS)**:  在图遍历中，用于按照层次顺序访问节点。
    *   **任务调度**:  按照任务的到达顺序进行处理。
    *   **模拟系统**:  模拟事件驱动系统，按照事件发生的时间顺序处理事件。
    *   **缓冲区**:  用于缓存数据，按照FIFO原则进行处理。
    *   **打印任务队列**: 将待打印的文档按顺序放入队列。
    *   **网络请求队列**:  管理并发的网络请求。

9.  **注意事项和常见错误**:

    *   **`front()` 和 `back()` 的安全性**: 在调用 `front()` 或 `back()` 之前，务必检查队列是否为空 (使用 `empty()`)，否则会导致未定义行为 (通常是崩溃)。
    *   **复制问题**: `queue` 本身不能被复制，只能被移动。  如果你需要复制 `queue` 的内容，你需要使用拷贝构造函数或赋值运算符复制底层容器（如 `deque` 或 `list`）。  注意，这种复制会影响原始队列。
    *   **没有迭代器**:  无法使用迭代器遍历 `queue`，只能通过 `front()` 和 `pop()` 访问元素。
    *   **底层容器的选择**: 默认的 `deque` 在大多数情况下是最佳选择。 只有在特定情况下，比如需要频繁的在中间插入元素时，才考虑 `list`。

希望这个更详细的分析能够帮助你理解 `std::queue`。  记住，理解底层实现和特性对于有效地使用数据结构至关重要。
