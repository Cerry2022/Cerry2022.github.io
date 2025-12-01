
## 🚀 目标

在 Linux 下，使用 Conda 虚拟环境隔离 ESP-IDF 依赖，并配置 VS Code IDF 插件。

## I. Conda 环境准备

   ```bash
   # 1. **创建并激活 Conda 环境：**
   conda create -n esp-idf-env python=3.11
   conda activate esp-idf-env
   
   # 2.下载 ESP-IDF 源码
   mkdir -p ~/esp
   cd ~/esp
   git clone --recursive https://github.com/espressif/esp-idf.git -b v5.4.2
   cd esp-idf
   # 3. 安装工具链和依赖
   # 在激活的 Conda 环境中运行
   ./install.sh
   ```

## II. Fish Shell 环境激活

由于 Fish Shell 不兼容 Bash 语法，不能直接运行 `./export.sh`。
需要与运行Fish的兼容脚本export.fish
   ```sh
   # 1. 运行 Fish 兼容脚本
   source ./export.fish
   
   # 2. 验证环境：
   idf.py --version
   # *(如果输出版本号，则终端环境配置成功。)*

   ```
如下：
   ```sh
   cerry@ROG-Flow-X13 ~/P/e/esp-idf ((v5.4.2))> idf.py --version                                             (esp-idf-env) 
ESP-IDF v5.4.2
cerry@ROG-Flow-X13 ~/P/e/esp-idf ((v5.4.2))>                                                              (esp-idf-env) 
   ```
 
 记录 Conda 环境的 Python 解释器完整路径，用于 VS Code 配置：
```sh
   which python
   # 输出如下
   # cerry@ROG-Flow-X13 ~/P/e/esp-idf ((v5.4.2))> which python                                                 (esp-idf-env) 
   # /home/cerry/.espressif/python_env/idf5.4_py3.11_env/bin/python
   ```

> [!note] miniconda3的虚拟环境与esp-idf
> 1. 安装后发现除了自己使用miniconda3创建的esp-idf-env环境外，esp-idf还内部管理了一个python，其路径为刚才的输出（/home/cerry/.espressif/python_env/idf5.4_py3.11_env/bin/python）
>2. 为什么我 在自己创建esp-idf-env的环境下执行 which python 显示的是esp-idf的内部环境？
>	- 因为运行 conda activate esp-idf-env 时，会把Conda 环境的 bin 目录添加到 **$PATH** 的最前边，而运行 source ./export.fish 时，会吧IDF 内部虚拟环境的 bin 目录 插入到** \$PATH **的最前端。
>	- ***关键：\$PATH遵循优先级从左到右的顺序***
>3. *可以尝试把conda创建的 esp-idf-env 的环境删除*



## III. VS Code IDF 插件配置
安装ESP-IDF 的 VSCODE插件，可参考乐鑫文档 [安装 ESP-IDF 和相关工具](https://docs.espressif.com/projects/vscode-esp-idf-extension/zh_CN/latest/installation.html)

打开 VS Code 设置 (Settings)，搜索 `esp-idf` 并配置以下 **两个关键路径**：

| 设置项 (Settings Key)  | 路径值                                                  | 描述                              |
| :------------------ | :--------------------------------------------------- | :------------------------------ |
| `idf.toolsPath`     | `/home/cerry/PATH/esp/esp-idf`                       | IDF 源码的根目录 (`IDF_PATH`)。        |
| `idf.pythonBinPath` | `/home/cerry/miniconda3/envs/esp-idf-env/bin/python` | **Conda 虚拟环境中的 Python 解释器** 路径。 |
如下：

![[posts/files/Pasted image 20251113002852.png]]

> [!note] DF_TOOLS_PATH 和 IDF_PATH
> - IDF_TOOLS_PATH 是最核心的交叉编译器 比如 xtensa-esp32-elf-gcc ，工具如 esptool.py、ninja、openocd
> - IDF_PATH 包含 IDF 框架组件，如 Wi-Fi 库、FreeRTOS 内核、驱动程序等，所有的 ESP-IDF 项目的 CMakeLists.txt 文件都会依赖于 IDF_PATH 来包含 IDF 框架。

- **配置完成后：** 打开 IDF 项目，插件会自动识别并加载 Conda 环境和工具链。尝试运行 `IDF: Build` 命令进行验证。