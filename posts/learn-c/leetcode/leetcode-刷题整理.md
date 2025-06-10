---
date: 2025-06-10 11:56
modifyDate: 2025-06-10 11:01
title: leetcode-刷题整理
category: leetcode
tags:
  - c
  - cpp
description:
---


# e1:
## 27.移除元素
> 给你一个数组 `nums` 和一个值 `val`，你需要 **[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)** 移除所有数值等于 `val` 的元素。元素的顺序可能发生改变。然后返回 `nums` 中与 `val` 不同的元素的数量。
> 假设 `nums` 中不等于 `val` 的元素数量为 `k`，要通过此题，您需要执行以下操作：
> - 更改 `nums` 数组，使 `nums` 的前 `k` 个元素包含不等于 `val` 的元素。`nums` 的其余元素和 `nums` 的大小并不重要。
> - 返回 `k`。
> 
> 这五个元素可以任意顺序返回。
> 你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。



我的解答:
```c
#include "stdio.h"
#include "stdlib.h"
#include "string.h"


int removeElement(int* nums, int numsSize, int val) {
    int *new_nums = (int*)malloc(numsSize * sizeof(int));
    memcpy(new_nums, nums, sizeof(nums));
    int i = 0, c = 0;
    while(numsSize--){
        if(new_nums[numsSize] != val){
            nums[c++] = new_nums[numsSize];
        }
    }
    return c;
}
```

# e2

## 20. 有效的括号
> 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
> 有效字符串需满足：
> 左括号必须用相同类型的右括号闭合。
> 左括号必须以正确的顺序闭合。
> 每个右括号都有一个对应的相同类型的左括号。

思路: 使用栈, 遇到左括弧入栈,右括弧弹栈, 使用stack.top()看栈顶元素匹配
```cpp
#include <stack>
#include <string>
class Solution {
public:
    bool isValid(const std::string& s) {
        if (s.length() % 2 != 0) {
            return false;
        }

        std::stack<char> leftchar;
        
        for (char c : s) {
            switch(c){
                case '(':
                case '[':
                case '{':
                    leftchar.push(c);
                    break;
                case ')':
                    if(!leftchar.empty() && leftchar.top() == '('){
                        leftchar.pop();
                    } else {
                        return false;
                    }
                    break;
                case '}':
                    if(!leftchar.empty() && leftchar.top() == '{'){
                        leftchar.pop();
                    } else {
                        return false;
                    }
                    break;
                case ']':
                    if(!leftchar.empty() && leftchar.top() == '['){
                        leftchar.pop();
                    } else {
                        return false;
                    }
                    break;
                default:
                    break; 
            }
        }
        
        return leftchar.empty(); 
    }
};
```



# e3
## 204.计算质数
>给定整数 `n` ，返回 _所有小于非负整数 `n` 的质数的数量_ 。

思路：
质数（素数）：一个大于1的自然数，除了1和它自身外，不能被其他自然数整除的数
素数筛法，删除2-n内所有的倍数即可

C++:
```cpp
class Solution {
public:
    int countPrimes(int n) {
        vector<bool> nums(n, true);
        // 只统计sqrt(n)内的i的倍数，优化
        for(int i = 2; i*i<n; i++){
            int j = 2;
            // i的j倍数
            while(i*j < n){
                nums[i*j] = false;
                j++;
            }
        }
  
        int res = 0;
        for(int i = 2; i<n; i++){
            if(nums[i]) res++;
        }
        return res;
    }
};
```


# e4
## 48.旋转图像
>描述：给定一个 _n_ × _n_ 的二维矩阵 `matrix` 表示一个图像。请你将图像顺时针旋转 90 度。
>你必须在 **[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)** 旋转图像，这意味着你需要直接修改输入的二维矩阵。**请不要** 使用另一个矩阵来旋转图像。

思路：先转置再逐行逆序
```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int size = matrix.size();
        for(int y = 0; y < size; y++){
            for(int x = y + 1; x < size; x++ ){
                int temp = matrix[y][x];
                matrix[y][x] = matrix[x][y];
                matrix[x][y] = temp;
            }
        }
        for(int y = 0; y < size; y++){
            for(int x = 0; x < size/2; x++){
                int temp = matrix[y][x];
                matrix [y][x] = matrix[y][size-x-1];
                matrix [y][size-x-1] = temp;
            }
        }
    }
};
```

## 387.字符串中的第一个唯一字符
>描述： 给定一个字符串 `s` ，找到 _它的第一个不重复的字符，并返回它的索引_ 。如果不存在，则返回 `-1` 。

思路:因为只有小写字母26个,使用简单的数组标记即可
```cpp
class Solution {
public:
    int firstUniqChar(string s) {
        vector<unsigned int> sum(26);
        for(char c : s)
            sum[c-'a']++;
        for(int i = 0; i < s.length(); i++)
            if(sum[s[i]-'a'] == 1) return i;
        return -1;
    }
};
```

## 94.二叉树的中序遍历
>给定一个二叉树的根节点 `root` ，返回 _它的 **中序  ** 遍历_ 。

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    void traversal(TreeNode* cur, vector<int>& vec){
        if(cur == NULL) return;
        traversal(cur->left, vec); // 前
        vec.push_back(cur->val);   // 中
        traversal(cur->right, vec);// 后
    }
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        traversal(root, res);
        return res;
    }
};
```

# e5
## 316. 去除重复字母
>给你一个字符串 `s` ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 **返回结果的字典序最小**（要求不能打乱其他字符的相对位置）。

思路 : 单调栈+贪心

```cpp
class Solution {
public:
    string removeDuplicateLetters(string s) {
        vector<char> stk;
        set<char> set;
        int dic[26] = {0};

        for(int i = 0; i < s.length(); i++){
            dic[s[i]-'a'] = i;
        }

        for(int i = 0; i < s.length(); i++){
            if (set.count(s[i])) {
                continue; 
            }

            while((!stk.empty()) && (stk.back() > s[i]) && (dic[stk.back()-'a'] > i)){
                set.erase(stk.back());
                stk.pop_back();
            }
            stk.push_back(s[i]);
            set.insert(s[i]);
        }
        string res = "";
        for(char c : stk){
            res += c;
        }
        return res;
    }
};
```



## 402. 移掉 K 位数字
>给你一个以字符串表示的非负整数 `num` 和一个整数 `k` ，移除这个数中的 `k` 位数字，使得剩下的数字最小。请你以字符串形式返回这个最小的数字。

思路：单调栈+贪心
```cpp
class Solution {
public:
    string removeKdigits(string num, int k) {
        vector<char> s;

        for (char digit : num) {
            while (k && !s.empty() && s.back() > digit) {
                s.pop_back();
                k--;
            }
            s.push_back(digit);
        }

        while ( k && !s.empty() ) {
            s.pop_back();
            k--;
        }

        string result = "";
        bool t = true;
        for(char c : s){
            if( t && c != '0') t = false;
            if( !t ) result += c;
        }
        return result == "" ? "0" : result;
    }
};
```


# e6
## 409.最长回文串 #贪心
> [!tip]-
> 给定一个包含大写字母和小写字母的字符串 `s` ，返回 *通过这些字母构造成的* **最长的回文串** 的长度。
> 
> 在构造过程中，请注意 **区分大小写** 。比如 `"Aa"` 不能当做一个回文字符串。
> **示例 1:**
> 
> **输入:** s = "abccccdd"
> **输出:** 7
> **解释:**
> 我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
> 
> **示例 2:**
> 
> **输入:** s = "a"
> **输出:** 1
> **解释：** 可以构造的最长回文串是"a"，它的长度是 1。
> 
> **提示:**
> - `1 <= s.length <= 2000`
> - `s` 只由小写 **和/或** 大写英文字母组成

思路： ASCII 码的范围是 0-127 共128个字符 直接开辟一个char类型128大小的 数组，统计字符数量，然后分奇偶数目处理，对于第一个奇数个数的字符的优先放置于中心，属于贪心策略
```c++
class Solution {
public:
    int longestPalindrome(string s) {
        int cnt[128] = {0}; // 使用更大的数组来容纳所有ASCII字符
        for (char c : s) {
            cnt[c]++;
        }

        int length = 0;
        bool has_odd = false;

        for (int i = 0; i < 128; ++i) { // 遍历所有可能的ASCII字符
            if (cnt[i] > 0) {
                if (cnt[i] % 2 == 0) {
                    length += cnt[i];
                } else {
                    length += cnt[i] - 1; // 减去1，用于对称排列
                    has_odd = true; // 标记存在出现次数为奇数的字符
                }
            }
        }

        // 如果存在出现次数为奇数的字符，可以将其中的一个放在中心
        if (has_odd) {
            length += 1;
        }

        return length;
    }
};
```


## 455.分发饼干 #贪心 

> [!tip]-
> 假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。
> 
> 对每个孩子 `i`，都有一个胃口值 `g[i]`，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 `j`，都有一个尺寸 `s[j]` 。如果 `s[j] >= g[i]`，我们可以将这个饼干 `j` 分配给孩子 `i` ，这个孩子会得到满足。你的目标是满足尽可能多的孩子，并输出这个最大数值。
> 
>  
> 
> **示例 1:**
> 
> **输入:** g = [1,2,3], s = [1,1]
> **输出:** 1
> **解释:** 
> 你有三个孩子和两块小饼干，3 个孩子的胃口值分别是：1,2,3。
> 虽然你有两块小饼干，由于他们的尺寸都是 1，你只能让胃口值是 1 的孩子满足。
> 所以你应该输出 1。
> 
> **示例 2:**
> 
> **输入:** g = [1,2], s = [1,2,3]
> **输出:** 2
> **解释:** 
> 你有两个孩子和三块小饼干，2 个孩子的胃口值分别是 1,2。
> 你拥有的饼干数量和尺寸都足以让所有孩子满足。
> 所以你应该输出 2。
> 
> **提示：**
> 
> - `1 <= g.length <= 3 * 104`
> - `0 <= s.length <= 3 * 104`
> - `1 <= g[i], s[j] <= 231 - 1`

思路：排序数组，由小到大遍历，优先让小的胃口找到满足的最小的饼干即可

```cpp
class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        sort(g.begin(), g.end());
        sort(s.begin(), s.end());
        int g_size = g.size();
        int s_size = s.size();
        int g_i = 0, s_i = 0;
        while(s_i < s_size && g_i < g_size) {            
            if(g[g_i] <= s[s_i++]) {
                g_i ++;
            }
        }

        return g_i;
    }
};
```