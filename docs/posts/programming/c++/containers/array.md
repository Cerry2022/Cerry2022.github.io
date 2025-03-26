# array

## C数组存在的问题

参见 [Three ways to avoid arrays in modern C++](https://www.develer.com/en/blog/three-ways-to-avoid-arrays-in-modern-cpp/)，因为在 modern C++ 中，C数组（如 `int nums[MAX_N]];` ）被认为存在 <span style="color:red">越界访问</span> / <span style="color:red;">大小过大</span> 的问题，所以在 modern C++ 中，C数组用 `<array>` 或 `<vector>` 替代。

`array` 是定长数组，`vector` 是不定长数组。

## array 的特点

1. Sequence（线性）
2. Contiguous storage（顺序存储）
3. Fixed-size aggregate（固定大小）

## prototype

```cpp
template<
    class T,
    std::size_t N
> struct array;
```

`T`：`array` 存储的的元素类型

`N`：`array` 的元素个数

例：

```cpp
array<int, 5> nums = {1，2，3，4，5};
```

## 成员函数列表

### Iterators（迭代器）

* 正序迭代器 [begin](https://cplusplus.com/reference/array/array/begin/) / [end](https://cplusplus.com/reference/array/array/end/) / [cbegin](https://cplusplus.com/reference/array/array/cbegin/) / [cend](https://cplusplus.com/reference/array/array/cend/)
  * `begin`：返回指向 array 第一个元素的迭代器。
  * `end`：返回指向 array <span style="color:red">尾后元素</span> 的迭代器。
  * `cbegin` / `cend`：返回 指向第一个元素 / 尾后元素 的迭代器，不过返回的类型是 `const`。

* 逆序迭代器 [rbegin](https://cplusplus.com/reference/array/array/rbegin/) / [rend](https://cplusplus.com/reference/array/array/rend/) / [crbegin](https://cplusplus.com/reference/array/array/crbegin/) / [crend](https://cplusplus.com/reference/array/array/crend/)
  * `rbegin`：返回指向 <span style="color:red;">逆序array</span> 第一个元素的迭代器。
  * `end`：返回指向 <span style="color:red">逆序array</span> <span style="color:red">尾后元素</span> 的迭代器。
  * `crbegin` / `crend`：返回指向 逆序array 第一个元素 / 尾后元素 的迭代器，不过返回的类型是 `const`。

<figure><img src="https://upload.cppreference.com/mwiki/images/3/39/range-rbegin-rend.svg" alt="" width="800"><figcaption style="text-align:center;">图片引用自 <a href="https://upload.cppreference.com/mwiki/images/3/39/range-rbegin-rend.svg">cppreference</a> </figcaption></figure>

### Capacity

* [size](https://cplusplus.com/reference/array/array/size/)：返回 array 中元素的数量。（区别于 [sizeof](https://en.cppreference.com/w/cpp/language/sizeof) ）
* [max_size](https://cplusplus.com/reference/array/array/max_size/)：返回 array 可以容纳的最大元素数。
* [empty](https://cplusplus.com/reference/array/array/empty/)：返回 `bool` 值，表明 array 是否为空。

### Element access

* [operator[n]](https://cplusplus.com/reference/array/array/operator[]/)：返回 array 容器中位置 n 元素的 <span style="color:red;">引用</span>。如 `arr[5]`。
* [at](https://cplusplus.com/reference/array/array/at/)：和 `operator[n]` 一样，返回 array 容器中位置 n 元素的引用。如 `arr.at(5)` = `arr[5]`。
* [front](https://cplusplus.com/reference/array/array/front/)：返回 array 第一个元素的引用。
* [back](https://cplusplus.com/reference/array/array/back/)：返回 array 最后一个元素的引用。
* [data](https://cplusplus.com/reference/array/array/data/)：返回指向 array 中第一个元素的指针。

### Modifiers

* [fill](https://cplusplus.com/reference/array/array/fill/)：将 array 中所有元素赋同一个值。
* [swap](https://cplusplus.com/reference/array/array/swap/)：将 array 与另一个 array 中的元素交换，两个 array 须是同类型、同大小。

## 例

### 通过 for循环 和 迭代器 输出 array

```cpp
int main ()
{
    array<int, 5> arr{1, 2, 3, 4, 5};

    for (array<int, 5>::iterator iter = arr.begin(); iter != arr.end(); ++iter){
        cout << "old:" << *iter;

        (*iter) += 1;
        cout << ", new:" << *iter << endl;
    }
}
```

输出：

```
old:1, new:2
old:2, new:3
old:3, new:4
old:4, new:5
old:5, new:6
```

### array 降序排列

```cpp
int main ()
{
    array<int, 5> arr{3, 1, 2, 5, 4};
    
    sort(arr.begin(), arr.end());
    for(array<int, 5>::iterator iter=arr.begin(); iter!=arr.end(); ++iter){
    cout << *iter << ' ';
    }
    cout << endl;
 
    reverse(arr.begin(), arr.end());
    for(array<int, 5>::iterator iter=arr.begin(); iter!=arr.end(); ++iter){
     cout << *iter << ' ';
    }
}
```

输出：

```
1 2 3 4 5
5 4 3 2 1
```

## 参考

* [cplusplus.com/reference/array/array/](https://cplusplus.com/reference/array/array/)
* [std::array - cppreference.com](https://en.cppreference.com/w/cpp/container/array)
* [C++ 容器中 begin()、cbegin()、rbegin()、crbegin_肥喵王得福_ฅ・ω・ฅ的博客-CSDN博客](https://blog.csdn.net/u013271656/article/details/113560304)
