---
page: true
date: 2025-05-29 20:09
modifyDate: 2025-06-10 11:11
title: 
category: leetcode
tags:
  - cpp
description:
---
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