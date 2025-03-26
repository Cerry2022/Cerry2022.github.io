# getline

[getline](https://cplusplus.com/reference/string/string/getline/) 是 [string](https://cplusplus.com/reference/string/string/) 类的一个函数，只能用于 `string` 类的输入。

使用前要：

```cpp
#include <string>
```

## 定义

(1)

```cpp
istream& getline (istream& is, string& str, char delim);
```

(2)

```cpp
istream& getline (istream& is, string& str);
```

从 `is` 获取字符，存储到 `str` 内，`str` 的内容会被新输入的数据替换。

对于 (1)，遇到 `delim` 停止输入；对于 (2)，遇到 <code>&bsol;n</code>，即 `回车`，停止输入。

## 用例

常用的形式是

```cpp
getline(std::cin, str)
```

`using namespace std` 后，简化为 `getline(cin, str)` 就好。

### 例1：`回车`停止输入

```cpp
int main(){
    string name;
    cout << "Please enter your full name: ";
    getline (cin, name);
    cout << "Ciallo, " << name << "!";
    return 0;
}
```

> Ciallo：[因幡巡](https://zh.moegirl.org.cn/zh-hans/%E5%9B%A0%E5%B9%A1%E5%B7%A1#%E7%9B%B8%E5%85%B3) 自创的打招呼方式。

运行：

```
Please enter your full name:
```

输入 `Jan Tang`，`回车`。

输出 `Ciallo, Jan Tang!`

### 例2：遇到 `*` 停止输入

```cpp
int main(){
    string name;
    cout << "Please enter your full name: , end with '*': ";
    getline (cin, name, '*');
    cout << "Ciallo, " << name << "!";
    return 0;
}
```

运行：

```
Please enter your full name: , end with '*': 
```

输入 `回车`，`Jan`，`回车`，`Tang *`。

输出

```
Ciallo,
Jan
Tang !
```
