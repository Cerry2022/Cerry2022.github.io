
**提示词总结：**

在 C++ STL 的学习实践中，以下小问题提供了一个结构化的练习框架。对于每个问题，请尝试运用列出的 **所有** 或 **大部分** 相关函数/概念，以加深理解并拓宽解决思路。思考不同方法的优缺点。

**每个小问题构成：**

- **问题描述：** 简要说明要解决的问题。
- **示例输入与预期输出：** 提供具体的例子以便理解。
- **可能需要的函数/概念（及其用法提示）：** 这是核心部分，将列出多种 STL 工具。

---

### 小问题 1：计数列表中某个元素出现的次数

**问题描述：**  
给定一个整数列表（或数组），以及一个特定的整数值，请计算这个整数值在列表中出现了多少次。

**示例输入：**  
列表: \[1, 2, 3, 2, 4, 2\]  
特定整数: 2

**预期输出：**  
3

**可能需要的函数/概念（及其用法提示）：**

- **std::vector int (来自 vector )**:
	- **定义与初始化：** std::vector int numbers = {1, 2, 3};
	- **元素访问：** numbers\[i\], numbers.at(i)
	- **迭代器：** numbers.begin(), numbers.end() (用于指定范围)
- **std::array int, N (来自 array )**: (如果列表大小固定)
	- **定义与初始化：** std::array int, 6 arr = {1, 2, 3, 2, 4, 2};
	- **优点：** 栈上分配，性能可能略高，但大小固定。
- **std::list int (来自 list )**: (如果需要频繁在中间插入/删除)
	- **定义与初始化：** std::list int my\_list = {1, 2, 3};
	- **迭代器：** 支持双向迭代器，可用于 std::count 。
- **std::count (来自 algorithm )**:
	- **基本用法：** long count\_val = std::count(container.begin(), container.end(), value\_to\_find);
	- **返回类型：** 通常是 std::iterator\_traits InputIt::difference\_type ，一般可转为 long 或 int 。
- **手动循环遍历：**
	- **范围-based for 循环：** for (int num: my\_list) { /\*...\*/ }
	- **传统 for 循环 + 索引：** for (size\_t i = 0; i < my\_list.size(); ++i) { /\*...\*/ }
	- **传统 for 循环 + 迭代器：** for (auto it = my\_list.begin(); it!= my\_list.end(); ++it) { /\*...\*/ }
- **std::for\_each (来自 algorithm ) + Lambda 表达式/计数器变量：**
	- **用法提示：** int count = 0; std::for\_each(vec.begin(), vec.end(), \[&\](int n){ if (n == target) count++; });
	- **Lambda 捕获：** &\] \` (按引用捕获外部变量)。
- **std::map int, int 或 std::unordered\_map int, int (来自 map / unordered\_map )**: (如果需要统计所有元素的频率)
	- **用法提示：** 遍历列表，将元素作为键，频率作为值。 map\[element\]++;
	- **查找特定元素频率：** if (map.count(value\_to\_find)) { /\* map\[value\_to\_find\] \*/ }

---

### 小问题 2：查找字符串中子串的位置

**问题描述：**  
给定一个主字符串和一个子字符串，请找出子字符串在主字符串中第一次出现的位置（索引）。如果子字符串不存在，则返回一个特殊值（例如 std::string::npos ）。

**示例输入：**  
主字符串: "Hello, World!"  
子字符串: "World"

**预期输出：**  
7 (因为 'W' 是第 7 个字符，从0开始计数)

**可能需要的函数/概念（及其用法提示）：**

- **std::string (来自 string )**:
	- **定义与初始化：** std::string main\_str = "Hello";
	- **length() / size() ：** 获取字符串长度。
	- **empty() ：** 判断字符串是否为空。
	- **operator\[\] ：** 访问单个字符。
- **std::string::find**:
	- **基本用法：** size\_t pos = main\_str.find(sub\_str);
	- **指定起始位置查找：** size\_t pos = main\_str.find(sub\_str, start\_index);
	- **返回值：** std::string::npos (一个常量，表示“未找到”，通常是一个很大的无符号整数)。
- **std::string::rfind**:
	- **用法提示：** 查找子串最后一次出现的位置。
- **std::string::find\_first\_of / std::string::find\_last\_of**:
	- **用法提示：** 查找给定字符集合中任意字符第一次/最后一次出现的位置。
- **std::search (来自 algorithm )**: (通用算法，可用于查找任何序列中的子序列)
	- **用法提示：** auto it = std::search(main\_str.begin(), main\_str.end(), sub\_str.begin(), sub\_str.end());
	- **返回迭代器：** 如果找到，返回指向子序列起始位置的迭代器；否则返回 main\_str.end() 。
	- **转换为索引：** std::distance(main\_str.begin(), it) 可获取索引。
- **手动实现（暴力匹配）：**
	- **嵌套循环：** 外层循环遍历主串的每个可能起始点，内层循环比较子串。

---

### 小问题 3：从列表中移除所有指定元素

**问题描述：**  
给定一个整数列表，请移除列表中所有等于某个特定值的元素。

**示例输入：**  
列表: \[1, 2, 3, 2, 4, 2\]  
要移除的值: 2

**预期输出：**  
\[1, 3, 4\] (元素顺序通常保持不变)

**可能需要的函数/概念（及其用法提示）：**

- **std::vector int (来自 vector )**:
	- **begin() / end() ：** 迭代器用于指定操作范围。
	- **erase() ：**
		- container.erase(iterator): 移除单个元素。
		- container.erase(first\_it, last\_it): 移除一个范围的元素。
	- **push\_back() ：** 如果选择构建新列表的方式。
- **std::remove (来自 algorithm )**:
	- **核心用法 (erase-remove idiom)：** new\_end\_it = std::remove(container.begin(), container.end(), value\_to\_remove); container.erase(new\_end\_it, container.end());
	- **返回迭代器：** 指向新逻辑末尾的迭代器。
	- **不改变大小：** 记住它不改变容器实际大小，只是移动元素。
- **std::remove\_if (来自 algorithm )**: (如果移除条件更复杂)
	- **用法提示：** 类似于 std::remove ，但接受一个谓词（函数对象或 Lambda）来定义移除条件。
	- **示例：** std::remove\_if(vec.begin(), vec.end(), \[\](int n){ return n % 2 == 0; }); (移除所有偶数)
- **std::list::remove (来自 list )**: (仅适用于 std::list)
	- **用法提示：** my\_list.remove(value\_to\_remove); (这是 std::list 特有的成员函数，更高效地移除链表中的元素)
- **手动遍历 + 插入到新列表：**
	- **用法提示：** 创建一个空的 std::vector 。遍历原列表，如果元素不等于要移除的值，就将其 push\_back 到新列表中。
- **手动遍历 + 元素覆盖（对于 std::vector ）：**
	- **用法提示：** 使用一个“慢指针”和一个“快指针”。快指针遍历所有元素，如果当前元素不等于要移除的值，就将其复制到慢指针指向的位置，并移动慢指针。最后 resize 容器到慢指针的位置。

---

### 小问题 4：检查字符串是否为空

**问题描述：**  
给定一个字符串，判断它是否为空字符串（即不包含任何字符）。

**示例输入：**  
字符串 1: ""  
字符串 2: "hello"

**预期输出：**  
字符串 1: true  
字符串 2: false

**可能需要的函数/概念（及其用法提示）：**

- **std::string (来自 string )**:
	- **empty() ：**
		- **基本用法：** bool is\_empty = my\_string.empty(); (推荐，最直接、意图最明确)
		- **返回值：** true 如果字符串没有字符，否则 false 。
	- **length() / size() ：**
		- **用法提示：** bool is\_empty = (my\_string.length() == 0); 或 (my\_string.size() == 0); (同样有效，但不如 empty() 语义清晰)
		- **返回类型：** size\_type (通常是 unsigned long long)。
	- **operator== (与空字符串比较)：**
		- **用法提示：** bool is\_empty = (my\_string == ""); (有效，但不推荐作为判断空字符串的首选，性能可能略低于 empty())
- **C风格字符串 (const char\*)：**
	- **用法提示：** 虽然问题中指定 std::string ，但了解 C 风格字符串的空判断也有用。 char\* c\_str = "";if (c\_str\[0\] == '\\0') 或 if (strlen(c\_str) == 0) (需要 cstring )。

---

### 小问题 5：将列表中的元素排序

**问题描述：**  
给定一个整数列表，请将其中的元素按升序排列。

**示例输入：**  
列表: \[5, 2, 8, 1, 9\]

**预期输出：**  
\[1, 2, 5, 8, 9\]

**可能需要的函数/概念（及其用法提示）：**

- **std::vector int (来自 vector )**:
	- **begin() / end() ：** 提供排序范围。
- **std::list int (来自 list )**: (注意： std::sort 不直接作用于 std::list ，因为 list 不支持随机访问迭代器)
	- **list::sort() ：**
		- **用法提示：** my\_list.sort(); (这是 std::list 自己的成员函数，专门为链表优化，高效排序链表元素)。
- **std::sort (来自 algorithm )**:
	- **基本用法 (升序)：** std::sort(container.begin(), container.end());
	- **降序排序：** std::sort(container.begin(), container.end(), std::greater int ()); 或使用 Lambda 表达式 std::sort(container.begin(), container.end(), \[\](int a, int b){ return a > b; });
	- **自定义比较器 (Lambda)：** std::sort(vec.begin(), vec.end(), \[\](const T & a, const T & b) { /\* return true if a comes before b \*/ });
- **std::stable\_sort (来自 algorithm )**: (如果需要保持相等元素的相对顺序)
	- **用法提示：** 类似于 std::sort ，但保证相等元素的原始相对顺序不变，通常性能略低。
- **std::priority\_queue (来自 queue )**: (如果只需要获取排序后的顶部元素或按顺序弹出)
	- **用法提示：** 将所有元素 push 到 std::priority\_queue 中，然后依次 top() 和 pop() 即可按顺序取出。默认是最大堆。
	- **最小堆：** std::priority\_queue int, std::vector int, std::greater int min\_heap;\`
- **std::set int / std::multiset int (来自 set )**: (如果需要自动去重或允许重复并自动排序)
	- **用法提示：** 将所有元素 insert 到 std::set 或 std::multiset 中。遍历 set 即可得到排序且（可能）去重的结果。

---

### 小问题 6：使用哈希映射统计字符频率

**问题描述：**  
给定一个字符串，统计其中每个字符出现的频率。

**示例输入：**  
字符串: "banana"

**预期输出 (可以以任何方式表示，例如打印):**  
b: 1  
a: 3  
n: 2

**可能需要的函数/概念（及其用法提示）：**

- **std::string (来自 string )**:
	- **遍历：** 范围-based for 循环 for (char c: my\_string) 。
- **std::unordered\_map char, int (来自 unordered\_map )**: (推荐，平均 O(1) 访问)
	- **定义：** std::unordered\_map char, int freq\_map;
	- **插入/更新：** freq\_map\[character\]++; (如果字符不存在，会自动创建并初始化为0，然后加1)
	- **查找：** freq\_map.count(char\_key) (检查是否存在)， freq\_map.at(char\_key) (访问，如果不存在抛异常)， freq\_map\[char\_key\] (访问或插入)。
	- **遍历：** for (const auto & pair: freq\_map) ， pair.first 是键， pair.second 是值。
- **std::map char, int (来自 map )**: (如果需要按字符ASCII/字典序排序输出)
	- **定义：** std::map char, int freq\_map;
	- **用法：** 类似 unordered\_map ，但底层是红黑树，插入/查找是 O(logN)。
- **std::vector int (作为字符数组的频率表)**: (如果字符集小且连续，如 ASCII 字符)
	- **用法提示：** 定义 std::vector int counts(256, 0); (或 128 for ASCII)。
	- **统计：** counts\[(unsigned char)character\]++; (强制类型转换以防止负值索引)。
	- **遍历：** 遍历 counts 数组，如果值大于0，则表示对应字符出现。
- **std::for\_each \+ Lambda：**
	- **用法提示：** std::for\_each(str.begin(), str.end(), \[&\](char c){ freq\_map\[c\]++; });

---

### 小问题 7：合并两个已排序的列表

**问题描述：**  
给定两个已经按升序排序的整数列表，请将它们合并成一个，并且新列表依然保持升序。

**示例输入：**  
列表 1: \[1, 3, 5\]  
列表 2: \[2, 4, 6\]

**预期输出：**  
\[1, 2, 3, 4, 5, 6\]

**可能需要的函数/概念（及其用法提示）：**

- **std::vector int (来自 vector )**:
	- **begin() / end() ：** 提供输入范围。
	- **resize() ：** 提前为结果容器分配空间。
	- **std::back\_inserter (来自 iterator )**:
		- **用法提示：** std::back\_inserter(result\_vector) 创建一个迭代器，每次写入都会 push\_back 到目标 vector 。
- **std::list int (来自 list )**:
	- **list::merge() ：** (仅适用于 std::list ，将另一个链表合并到当前链表，并清空被合并的链表)
		- **用法提示：** list1.merge(list2); (原地合并，效率高)。
- **std::merge (来自 algorithm )**:
	- **基本用法：** std::merge(vec1.begin(), vec1.end(), vec2.begin(), vec2.end(), std::back\_inserter(result\_vec));
	- **目标容器：** 可以是 std::back\_inserter 也可以是预先 resize 好的 vector 的 begin() 迭代器。
	- **自定义比较器：** 可以提供一个 Lambda 表达式进行降序或其他方式的合并。
- **手动实现（双指针法）：**
	- **用法提示：** 定义两个指针（或索引），分别指向两个输入列表的开头。循环比较两个指针指向的元素，将较小的那个添加到结果列表中，并移动其对应的指针。当一个列表遍历完后，将另一个列表中剩余的元素全部添加到结果列表。
- **std::set int / std::multiset int (来自 set )**: (如果合并后需要去重或可以接受去重)
	- **用法提示：** 将所有元素逐个 insert 到 std::set (会自动去重并排序) 或 std::multiset (允许重复并排序) 中。然后遍历 set 或 multiset 获取排序后的结果。
- **先连接再排序：**
	- **用法提示：** 将两个列表的元素全部 push\_back 到一个新的 std::vector 中，然后使用 std::sort 对这个 vector 进行排序。
	- **优点：** 简单粗暴。
	- **缺点：** 效率可能低于 std::merge ，因为 std::merge 利用了输入已排序的特性。
