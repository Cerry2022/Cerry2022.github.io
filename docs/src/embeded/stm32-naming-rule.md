# STM32 命名规则

## 命名规则

STM32 xx ww y z α β

- `xx`：系列家族
- `ww`：子类型，因系列家族的不同而异
- `y`：封装引脚数
- `z`：闪存 (Flash) 容量
- `α`：封装类型
- `β`：工作温度

## 例

### STM32 F1 03 C 8 T 6

- `F1`：F1 系列
- `03`：03 子系列
- `C`：48 个引脚
- `8`：64 KB Flash
- `T`：[LQFP](https://en.wikipedia.org/wiki/Quad_flat_package#LQFP) 封装
- `6`：-40℃ ~ 85℃

### STM32 F4 07 Z G T 6

- `F4`：F4 系列
- `07`：07 子系列
- `Z`：144 引脚
- `G`：1024 KB Flash
- `T`：LQFP 封装
- `6`：-40℃ ~ 85℃

具体编码对应数值见后续表格。

::: details 数据来源

系列家族、引脚数、闪存容量 来自 [STM32_Part number decoding - Wikipedia](https://en.wikipedia.org/wiki/STM32#Part_number_decoding)，使用 [Convert HTML Table to Markdown Table - Table Convert Online](https://tableconvert.com/html-to-markdown) 工具，将 HTML &lt;table&gt; 转化为 Markdown Table

封装类型、工作温度 来自 [Understanding STM32 Naming Conventions](https://www.digikey.com/en/maker/blogs/2020/understanding-stm32-naming-conventions)

:::

## xx：系列家族

| Code | Core | Max freq [MHz]| Max FLASH [KB] | Max SRAM [KB] | Target |
|---|---|---|---|---|---|
| F0    | Cortex-M0   | 48              | 256             | 32             | Mainstream |
| F1    | Cortex-M3   | 72              | 1024            | 96             | Mainstream |
| F2    | Cortex-M3   | 120             | 1024            | 128            | High performance |
| F3    | Cortex-M4F  | 72              | 512             | 80             | Mainstream |
| F4    | Cortex-M4F  | 180             | 2048            | 384            | High performance |
| G0    | Cortex-M0+  | 64              | 512             | 144            | Mainstream |
| G4    | Cortex-M4F  | 170             | 512             | 128            | Mainstream |
| F7    | Cortex-M7F  | 216             | 2048            | 512            | High performance |
| H7    | Cortex-M7F  | 480             | 2048            | 1024           | High performance |
| L0    | Cortex-M0+  | 32              | 192             | 20             | Ultra low power |
| L1    | Cortex-M3   | 32              | 512             | 80             | Ultra low power |
| L4    | Cortex-M4F  | 80              | 1024            | 320            | Ultra low power |
| L4+   | Cortex-M4F  | 120             | 2048            | 640            | Ultra low power |
| L5    | Cortex-M33F | 110             | 512             | 256            | Ultra low power  |
| U5    | Cortex-M33F | 160             | 2048            | 786            | Ultra low power |
| WB    | Cortex-M4F  | 64              | 1024            | 256            | Wireless |
| WL    | Cortex-M4   | 48              | 256             | 64             | Wireless |

## y：封装引脚数

| Code | Number of pins |
|-------|-----------------|
| A     | 169 |
| B     | 208 |
| C     | 48  |
| F     | 20  |
| G     | 28  |
| H     | 40  |
| I     | 176 |
| J     | 8/72 |
| K     | 32  |
| M     | 81 |
| N     | 216 |
| Q     | 132 |
| R     | 64 |
| T     | 36 |
| U     | 63 |
| V     | 100 |
| Z     | 144 |

## z：闪存容量

| Code | FLASH size [KB] |
|-------|------------------|
| 4     | 16 |
| 6     | 32 |
| 8     | 64 |
| B     | 128 |
| Z     | 192 |
| C     | 256 |
| D     | 384 |
| E     | 512 |
| F     | 768 |
| G     | 1024 |
| H     | 1536 |
| I     | 2048 |

## α：封装类型

| Code | Package |
|-------|------------------|
|   P   | TSOOP |
|   H   | BGA |
|   U   | VFQFPN |
|   T   | LQFP |
|   Y   | WLCSP |

## β：工作温度

| Code | Temperature |
|-------|------------|
|   6   | -40℃ ~ 85℃ |
|   7   | -40℃ ~ 105℃ |

## 参考

- [STM32_Part number decoding - Wikipedia](https://en.wikipedia.org/wiki/STM32#Part_number_decoding)
- [Understanding STM32 Naming Conventions](https://www.digikey.com/en/maker/blogs/2020/understanding-stm32-naming-conventions)
