---
date: 2025-07-03 20:06
modifyDate: 2025-07-03 20:29
---
你将扮演一个高级AI C++导师。你的任务是根据我提供的学习主题和测试策略，生成一个完整的、自包含的C++互动学习文件。这个文件必须实现**自动化的、循序渐进的测试流程**，让学习者无需任何手动配置即可开始编码挑战。

**你的工作将遵循以下三个核心部分：**

1. **TestHelper.h 知识库**: 你必须完全理解并使用下面提供的 TestHelper.h (v3.8) 的全部功能。这是你生成代码的底层框架。    
2. **生成器指令集 (V4.0)**: 你必须严格遵守下面列出的详细生成规则。这是你的行动蓝图。    
3. **用户请求**: 最后，你将根据我给出的具体主题和策略来执行生成任务。

---

### **第一部分：TestHelper.h 知识库**
```cpp
// ================================================================================
// 文件名: TestHelper.h (v3.8 - 添加对 std::array 的 toString 支持)
// 描述:   一个为互动学习设计的、支持两种测试策略（预定义用例和官方解对比）
//         并能自动解锁任务的C++测试框架。
// ================================================================================

#ifndef TEST_HELPER_H
#define TEST_HELPER_H

#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <tuple>
#include <utility> 
#include <type_traits>
#include <array> // 新增! 为 std::array 的 toString 支持

namespace TestHelper {

    // --- ANSI 颜色码定义 ---
    #define RESET_COLOR    "\033[0m"
    #define RED_COLOR      "\033[31m"
    #define GREEN_COLOR    "\033[32m"
    #define YELLOW_COLOR   "\033[33m"
    #define BLUE_COLOR     "\033[34m"
    #define MAGENTA_COLOR  "\033[35m"
    #define CYAN_COLOR     "\033[36m"
    #define BOLD_TEXT      "\033[1m"
    #define UNDERLINE_TEXT "\033[4m"

    // --- 内部状态变量 ---
    static int test_count = 0;
    static int passed_count = 0;

    // --- 漂亮的类型到字符串转换器 (内部使用) ---
    template<typename T>
    std::string toString(const T& val) {
        std::ostringstream oss;
        oss << val;
        return oss.str();
    }

    template<> inline std::string toString<int>(const int& val) { return std::to_string(val); }
    template<> inline std::string toString<size_t>(const size_t& val) { return std::to_string(val); }
    template<> inline std::string toString<double>(const double& val) { return std::to_string(val); }
    template<> inline std::string toString<float>(const float& val) { return std::to_string(val); }
    template<> inline std::string toString<char>(const char& val) { std::string s; s += "'"; s += val; s += "'"; return s; }
    template<> inline std::string toString<bool>(const bool& val) { return val ? "true" : "false"; }
    template<> inline std::string toString<std::string>(const std::string& val) { return "\"" + val + "\""; }

    template<typename T>
    std::string toString(const std::vector<T>& vec) {
        std::ostringstream oss;
        oss << "{";
        for (size_t i = 0; i < vec.size(); ++i) {
            oss << toString(vec[i]);
            if (i < vec.size() - 1) oss << ", ";
        }
        oss << "}";
        return oss.str();
    }
    
    // ✨✨✨ 新增的修复代码 ✨✨✨
    // 为 std::array 添加 toString 支持
    template<typename T, size_t N>
    std::string toString(const std::array<T, N>& arr) {
        std::ostringstream oss;
        oss << "{";
        for (size_t i = 0; i < arr.size(); ++i) {
            oss << toString(arr[i]); // 递归调用，支持嵌套数组
            if (i < arr.size() - 1) oss << ", ";
        }
        oss << "}";
        return oss.str();
    }


    namespace detail {
        template<typename Tuple, size_t I>
        void print_tuple_element(std::ostringstream& oss, const Tuple& t) {
            if constexpr (I > 0) {
                oss << ", ";
            }
            oss << TestHelper::toString(std::get<I>(t));
        }

        template<typename Tuple, size_t... Is>
        void print_tuple_elements(std::ostringstream& oss, const Tuple& t, std::index_sequence<Is...>) {
            (print_tuple_element<Tuple, Is>(oss, t), ...);
        }
    }

    template<typename... Args>
    std::string toString(const std::tuple<Args...>& t) {
        std::ostringstream oss;
        oss << "(";
        detail::print_tuple_elements(oss, t, std::make_index_sequence<sizeof...(Args)>());
        oss << ")";
        return oss.str();
    }

    // --- 核心测试函数 (单个) ---
    template<typename T>
    void runTestCase(const std::string& testName, const T& actual, const T& expected) {
        test_count++;
        std::cout << testName << std::endl;
        if (actual == expected) {
            passed_count++;
            std::cout << GREEN_COLOR "  ✅ PASSED" RESET_COLOR << std::endl;
        } else {
            std::cout << RED_COLOR "  ❌ FAILED" RESET_COLOR << std::endl;
            std::cout << "    Expected: " << toString(expected) << std::endl;
            std::cout << "    Actual:   " << toString(actual) << std::endl;
        }
        std::cout << std::endl;
    }

    // --- 测试总结 ---
    void printTestSummary() {
        std::cout << BOLD_TEXT "================== 任务总结 ==================" RESET_COLOR << std::endl;
        std::cout << "  总计通过测试: " << passed_count << " / " << test_count << std::endl;
        if (test_count > 0 && passed_count == test_count) {
             std::cout << GREEN_COLOR BOLD_TEXT "  评级:      完美！你真是个编程天才！✨" RESET_COLOR << std::endl;
        } else if (test_count > 0 && passed_count > 0) {
             std::cout << YELLOW_COLOR "  评级:      太棒了，离成功仅一步之遥！" RESET_COLOR << std::endl;
        } else if (test_count > 0) {
             std::cout << RED_COLOR "  评级:      别灰心，伟大的冒险才刚刚开始！" RESET_COLOR << std::endl;
        }
        std::cout << BOLD_TEXT "================================================" RESET_COLOR << std::endl;
    }


    template <typename... Args, typename Tuple, size_t... Is>
    std::tuple<Args...> extract_tuple_args_impl(const Tuple& t, std::index_sequence<Is...>) {
        return std::make_tuple(std::get<Is>(t)...);
    }

    template <typename... Args, typename Tuple>
    std::tuple<Args...> extract_tuple_args(const Tuple& t) {
        return extract_tuple_args_impl<Args...>(t, std::make_index_sequence<sizeof...(Args)>());
    }

    // ✨ 模式1: 自动解锁的任务运行器 (预定义用例) ✨
    template <typename SolutionClass, typename ReturnType, typename... Args>
    bool runTaskAndCheckSuccess(
        SolutionClass& solver,
        ReturnType (SolutionClass::*func)(Args...),
        const std::vector<std::tuple<std::decay_t<Args>..., ReturnType>>& test_cases,
        const std::string& taskTitle)
    {
        std::cout << "\n" BOLD_TEXT "--- " << taskTitle << " ---" RESET_COLOR << std::endl;
        if (test_cases.empty()) { std::cout << "  (没有为此任务提供测试用例)" << std::endl; return true; }

        int cases_in_task = test_cases.size();
        int passed_before_task = passed_count;
        int total_before_task = test_count;

        int test_num = 1;
        for (const auto& test_case : test_cases) {
            auto extracted_args = extract_tuple_args<Args...>(test_case);
            auto expected = std::get<sizeof...(Args)>(test_case);
            auto actual = std::apply([&](auto&&... args) {
                return (solver.*func)(std::forward<decltype(args)>(args)...);
            }, extracted_args);

            runTestCase("  预设测试 #" + std::to_string(test_num++), actual, expected);
        }

        int passed_in_task = passed_count - passed_before_task;
        if (passed_in_task == cases_in_task) {
            std::cout << GREEN_COLOR "✨ 任务完成! 已自动解锁下一关...\n" RESET_COLOR;
            return true;
        } else {
            std::cout << RED_COLOR "❌ 挑战尚未完成。请修正以上错误后重试。\n" RESET_COLOR;
            std::cout << YELLOW_COLOR ">>> 后续挑战已暂停，等你凯旋！\n" RESET_COLOR;
            return false;
        }
    }

    // ✨ 模式2: 自动解锁的任务运行器 (与官方解对比) ✨
    template <typename UserSolution, typename OfficialSolution, typename ReturnType, typename... Args>
    bool runTaskWithOfficialAndCheckSuccess(
        UserSolution& user_solver,
        OfficialSolution& official_solver,
        ReturnType (UserSolution::*user_func)(Args...),
        ReturnType (OfficialSolution::*official_func)(Args...),
        const std::vector<std::tuple<std::decay_t<Args>...>>& test_inputs,
        const std::string& taskTitle)
    {
        std::cout << "\n" BOLD_TEXT "--- " << taskTitle << " ---" RESET_COLOR << std::endl;
        if (test_inputs.empty()) { std::cout << "  (没有为此任务提供动态测试输入)" << std::endl; return true; }

        int cases_in_task = test_inputs.size();
        int passed_before_task = passed_count;
        int total_before_task = test_count;

        int test_num = 1;
        for (const auto& inputs : test_inputs) {
            auto expected = std::apply([&](auto&&... args){ return (official_solver.*official_func)(std::forward<decltype(args)>(args)...); }, inputs);
            auto actual = std::apply([&](auto&&... args){ return (user_solver.*user_func)(std::forward<decltype(args)>(args)...); }, inputs);
            runTestCase("  动态测试 #" + std::to_string(test_num++), actual, expected);
        }

        int passed_in_task = passed_count - passed_before_task;
        if (passed_in_task == cases_in_task) {
            std::cout << GREEN_COLOR "✨ 任务完成! 已自动解锁下一关...\n" RESET_COLOR;
            return true;
        } else {
            std::cout << RED_COLOR "❌ 挑战尚未完成。请修正以上错误后重试。\n" RESET_COLOR;
            std::cout << YELLOW_COLOR ">>> 后续挑战已暂停，等你凯旋！\n" RESET_COLOR;
            return false;
        }
    }
}
#endif // TEST_HELPER_H¶
```
---

### **第二部分：生成器指令集 (V4.0)**

**1. 任务分析与课程设计:**
- 接收用户指定的C++主题，自主设计3到5个循序渐进的子任务，覆盖该主题的核心基础知识点，难度中等偏上；每个任务都应被包装成一个微型的、有上下文的实际问题（如“日志文件分析”、“游戏得分计算”、“配置解析”），而不是纯粹的语法练习；任务所操作的数据类型不应仅限于基础类型。
- 为每个任务构思一个简洁的标题、详细的任务描述、配备详尽的知识点解析和函数用法示例、主要应用场景、一个生动有趣的“探险家提示”以及若干测试用例。

**2. 文件结构与内容:**
- **文件名**: l1-1-1_[主题小写].cpp。格式为[章节]-[模块]-[小节]\_[主题小写].cpp
- **头部注释**: 包含文件名、主题和所选的测试策略。
- **头文件**: 默认包含` <iostream>, <vector>, <string>`, "TestHelper.h"。根据任务需要智能添加其他头文件（如 `<algorithm>, <numeric>, <set>, <map>` 等）。
- **Solution 类**: 为每个设计的任务创建公有成员函数。每个函数必须有可编译的占位符实现（例如 return 0;, return {};）。在函数上方用 /** ... */ 注释块提供 🚀 你的任务 描述。

**3. 测试策略实施:**
- **'Official Solution' 策略 (高阶任务推荐)**:    
    - 生成 Solution_Official 类，包含所有任务的完整、优雅的实现。        
    - 在 runAllTasks 中，创建仅包含**输入参数**的 std::vector<std::tuple<...>>。        
    - 使用 TestHelper::runTaskWithOfficialAndCheckSuccess() 进行测试。        
- **'Predefined Cases' 策略**:    
    - 在 runAllTasks 中，创建包含**所有输入参数和预期输出**的 std::vector<std::tuple<...>>。
	- 使用 TestHelper::runTaskAndCheckSuccess() 进行测试。

**4. 自动化测试流程:**
- 在 main 函数之外创建 void runAllTasks(Solution& solver) 函数。
- 在 runAllTasks 函数内部，为每个任务按顺序构建测试块。
- 每个测试块必须先打印“探险家提示”。
- 每个测试块的核心是 if (!TestHelper::...(...)) return; 语句。这个“责任链”结构确保了只有在当前任务完全通过时，才会继续测试下一个任务。
- 在 runAllTasks 函数的末尾，如果所有任务都通过了，打印一条最终的祝贺信息。

**5. main 函数:**

- 保持简洁。创建 Solution 实例，打印欢迎语，调用 runAllTasks，最后调用 TestHelper::printTestSummary()。

**6. 文件结构模板**

Generated cpp

```cpp
// ================================================================================
// 文件名: l1-1-1_[主题小写].cpp
// 主题:   [主题] 进阶之路 (策略: [所选策略])
// ================================================================================

#include "../TestHelper.h"
#include <iostream>
#include <vector>
// ... 其他必要头文件 ...

class Solution {
public:
    // --- 任务 1: [任务1标题] ---
    /**
     * 🚀 你的任务
     * [任务1详细描述]
     */
    [返回类型] [函数名1]([参数]) { return [默认值]; }

    // --- 任务 2: [任务2标题] ---
    /**
     * 🚀 你的任务
     * [任务2详细描述]
     */
    [返回类型] [函数名2]([参数]) { return [默认值]; }

    // ... 其他任务 ...
};

// [如果策略是 'Official Solution'，则在此处插入 Solution_Official 类]
#if [CONDITION_FOR_OFFICIAL_SOLUTION]
class Solution_Official {
public:
    // --- 官方解 1 ---
    [返回类型] [函数名1]([参数]) {
        // [任务1的正确、完整实现]
    }
    // ... 其他官方解 ...
};
#endif


// ================================================================================
//                                  测试区域
// ================================================================================

void runAllTasks(Solution& solver) {
    // [如果策略是 'Official Solution'，在此处创建 official_solver 实例]
    #if [CONDITION_FOR_OFFICIAL_SOLUTION]
    Solution_Official official_solver;
    #endif

    // ----------- 任务 1 -----------
    std::cout << "💡 探险家提示: [任务1的生动提示]" << std::endl;
    // [根据策略生成测试用例 (带输出或不带输出)]
    // [根据策略调用 runTaskAndCheckSuccess 或 runTaskWithOfficialAndCheckSuccess]
    // if (!TestHelper::...(...)) return;

    // ----------- 任务 2 -----------
    std::cout << "💡 探险家提示: [任务2的生动提示]" << std::endl;
    // [任务2的测试用例和调用]
    // if (!TestHelper::...(...)) return;

    // ... 后续任务 ...

    std::cout << "\n🎉🎉🎉 恭喜你！你已完成本模块所有挑战！ 🎉🎉🎉\n";
}

int main() {
    Solution solver;
    std::cout << "=============== [主题] 进阶之路 开始 ===============\n";
    runAllTasks(solver);
    TestHelper::printTestSummary();
    return 0;
}
```
---

### **第三部分：用户请求**

**主题**: std::vector  
**测试策略**: 自行选择

**现在，请开始生成 l1-1-1_vector.cpp 文件。**