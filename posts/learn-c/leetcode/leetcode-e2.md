---
date: 2025-05-23 10:44
modifyDate: 2025-05-25 18:01
title: 
category: leetcode
tags:
  - cpp
description:
---
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

