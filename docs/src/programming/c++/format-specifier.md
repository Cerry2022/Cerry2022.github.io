# 格式说明符

格式说明符，[format specifier](https://cplusplus.com/reference/cstdio/printf/#parameters)

格式说明符更多是用在 printf 格式化输出。

## prototype

```cpp
%[flags][width][.precision][length]specifier
```

## specifier

<table><thead><tr><th width="123.33333333333331">specifier</th><th width="474">输出</th><th>例</th></tr></thead><tbody><tr><td>d / i</td><td>Signed decimal integer<br>有符号十进制整数<br><code>int</code></td><td>392</td></tr><tr><td>u</td><td>Unsigned decimal integer<br>无符号十进制整数<br><code>unsigned int</code></td><td>7235</td></tr><tr><td>o</td><td>Unsigned octal<br>无符号八进制整数<br><code>unsigned int</code></td><td>610</td></tr><tr><td>x / X</td><td>Unsigned hexadecimal integer<br>无符号十六进制整数，小写 / 大写<br><code>unsigned int</code></td><td>7fa / 7FA</td></tr><tr><td>f / F</td><td>Decimal floating point, lowercase<br>十进制浮点数，小写 / 大写 (?)<br><code>double</code></td><td>392.65</td></tr><tr><td>e / E</td><td>Scientific notation (mantissa/exponent)<br>科学计数法 (尾数/指数)，小写 / 大写</td><td>3.9265e+2<br>3.9265E+2</td></tr><tr><td>g / G</td><td>Use the shortest representation: %e / %E or %f / %F<br>最短形式表示 %e / %E、%f / %F</td><td>392.65</td></tr><tr><td>a / A</td><td>Hexadecimal floating point<br>十六进制浮点数，小写/大写<br></td><td>-0xc.90fep-2<br>-0xc.90FEP-2</td></tr><tr><td>c</td><td><p>Character<br>字符</p><p><code>char</code></p></td><td>a</td></tr><tr><td>s</td><td>String of characters<br>字符串</td><td>sample</td></tr><tr><td>p</td><td>Pointer address<br>指针地址</td><td>b8000000</td></tr><tr><td>n</td><td>不输出任何内容。相应的参数须是指向 `signed int` 的指针</td><td></td></tr><tr><td>%</td><td><code>%%</code> 输出百分号</td><td>%</td></tr></tbody></table>

## flags

<table><thead><tr><th width="160.1609130798562">flags</th><th>说明</th></tr></thead><tbody><tr><td>-</td><td>在给定的宽度内 左对齐。（默认是右对齐）</td></tr><tr><td>+</td><td>强制输出结果带 +号（正数） 或 -号（负数）。</td></tr><tr><td>空格<br>(一个或多个)</td><td>在值之前插入一个空格。</td></tr><tr><td>#</td><td>与 o、x、X 说明符一起使用时，对于不为零的值，前面分别加上 0、0x、0X；<br>与 a/A、e/E、f/F、g/G 一起使用时，即使后面没有数字，也会强制输出包含一个小数点。</td></tr><tr><td>0</td><td>在给定的宽度内 用0向左填充。</td></tr></tbody></table>

例：

```cpp
printf("[%-6d]\n", 233);  // -
printf("[%+d]\n", -233);  // +
printf("[%      d]\n", 233);  // 空格
printf("[%#x]\n", 100);  // #
printf("[%06d]", 100);  // 0
```

输出：

```
[233   ]
[-233]
[ 233]
[0x64]
[000100]
```

## width

<table><thead><tr><th width="106.14679187498098">width</th><th>说明</th></tr></thead><tbody><tr><td>数字</td><td>指定输出位数，不足在结果前用<span style="color:red;">空格</span>填充，右对齐。<br>位数长于 width 也不会被截断。</td></tr><tr><td>*</td><td>width 不在格式说明符中指定，而是在被输出的值参数之前附加。</td></tr></tbody></table>

例：

```cpp
printf("[%6d]\n", 233);  // 数字
printf("[%*d]", 6, 233);  // *
```

输出：

```
[   233]
[   233]
```

## .precision

<table><thead><tr><th width="135.02050113895217">.precision</th><th>说明</th></tr></thead><tbody><tr><td>.number</td><td>对于整数说明符 (d, i, o, u, x, X)：指定输出位数，不足用前导零填充，过长也不会被截断。number 为 0 时意味着不为值0 写入/输出 任何字符。<br>对于 a/A、e/E、f/F 说明符：小数点后要输出的位数（默认为6）。<br>对于 g/G 说明符：要输出的有效数字的最大数量。<br>对于 s 说明符：要输出的最大字符数。（默认情况遇空字符结束输出）<br>如果 number 为空，默认为0。</td></tr><tr><td>.*</td><td>precision 不在格式说明符中指定，而是在被输出的值参数之前附加。</td></tr></tbody></table>

```cpp
printf("%.6d\n", 233);
printf("%.6f\n", 0.233);
printf("%.6g\n", 23.3e+3);
printf("%.6s\n", "prprprpr");
printf("[%6.d]", 0);
```

```
000233
0.233000
23300
prprpr
[      ]
```

## length

<table><thead><tr><th width="113">-</th><th width="107">specifiers</th><th width="175">-</th><th width="160">-</th><th width="143">-</th><th>-</th><th>-</th><th width="140">-</th></tr></thead><tbody><tr><td>length</td><td>d i</td><td>u o x/X</td><td>f/F e/E g/G a/A</td><td>c</td><td>s</td><td>p</td><td>n</td></tr><tr><td>(无)</td><td>int</td><td>unsigned int</td><td>double</td><td>int</td><td>char*</td><td>void*</td><td>int*</td></tr><tr><td>h</td><td>short int</td><td>unsigned short int</td><td></td><td></td><td></td><td></td><td>short int*</td></tr><tr><td>l</td><td>long int</td><td>unsigned long int</td><td></td><td>wint_t</td><td>wchar_t*</td><td></td><td>long int*</td></tr><tr><td>L</td><td></td><td></td><td></td><td>long double</td><td></td><td></td><td></td></tr></tbody></table>
