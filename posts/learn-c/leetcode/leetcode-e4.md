---
date: 2025-05-25 17:38
modifyDate: 2025-05-25 17:58
title: 
category: leetcode
tags:
  - cpp
description:
---
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

