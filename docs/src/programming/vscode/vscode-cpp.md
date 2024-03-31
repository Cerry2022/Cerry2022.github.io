# VS Code 配置 C++ 运行环境

## 下载安装 MinGW

> [MinGW](https://zh.wikipedia.org/wiki/MinGW)，<span style='color:red'>Min</span>imalist <span style='color:red'>G</span>NU for <span style='color:red'>W</span>indows，是一套移植到 Win32 平台的 [GNU](https://zh.wikipedia.org/wiki/GNU) 工具集合，能在没有第三方动态链接库的情况下使用 [GCC](https://zh.wikipedia.org/wiki/GCC) 产生 Windows32 程序。

下载安装好 VS Code 后，在 [MinGW Distro - nuwen.net](https://nuwen.net/mingw.html) 下载 `mingw-18.0-without-git.exe` (版本号可能会随时间更新)。

## 添加环境变量

将 MinGW 的安装路径添加到用户环境变量。我是安装在了 E 盘，所以添加的环境变量路径是：

```
E:\Program Files\MinGW\bin
```

使用 `g++ --version` 来测试是否成功：

```
$ g++ --version
g++ (GCC) 11.2.0
Copyright (C) 2021 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

## 配置 VS Code

### 安装 C/C++ 插件

在 `Extensions` 页面搜索 `C/C++`，安装。

### 配置 `.vscode` 文件夹

创建 `.vscode` 文件夹，在里面创建四个文件，名字分别是：

- `c_cpp_properties.json`
- `launch.json`
- `settings.json`
- `tasks.json`

它们的内容分别填入：

::: details c_cpp_properties.json

```json
{
  "configurations": [
    {
      "name": "Win64",
      "includePath": ["${workspaceFolder}/**"],
      "defines": ["_DEBUG", "UNICODE", "_UNICODE"],
      "windowsSdkVersion": "10.0.18362.0",
      "compilerPath": "E:\\Program Files\\MinGW\\bin\\g++.exe",
      "cStandard": "c17",
      "cppStandard": "c++17",
      "intelliSenseMode": "gcc-x64"
    }
  ],
  "version": 4
}
```

:::

::: details launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "(gdb) Launch", 
      "type": "cppdbg", 
      "request": "launch", 
      "program": "${fileDirname}\\${fileBasenameNoExtension}.exe", 
      "args": [], 
      "stopAtEntry": false,
      "cwd": "${workspaceRoot}",
      "environment": [],
      "externalConsole": true, 
      "MIMode": "gdb",
      "miDebuggerPath": "E:\\Program Files\\MinGW\\bin\\gdb.exe",
      "preLaunchTask": "g++",
      "setupCommands": [
        {
          "description": "Enable pretty-printing for gdb",
          "text": "-enable-pretty-printing",
          "ignoreFailures": true
        }
      ]
    }
  ]
}
```

:::

::: details settings.json

```json
{
  "files.associations": {
    "*.py": "python",
    "iostream": "cpp",
    "*.tcc": "cpp",
    "string": "cpp",
    "unordered_map": "cpp",
    "vector": "cpp",
    "ostream": "cpp",
    "new": "cpp",
    "typeinfo": "cpp",
    "deque": "cpp",
    "initializer_list": "cpp",
    "iosfwd": "cpp",
    "fstream": "cpp",
    "sstream": "cpp",
    "map": "c",
    "stdio.h": "c",
    "algorithm": "cpp",
    "atomic": "cpp",
    "bit": "cpp",
    "cctype": "cpp",
    "clocale": "cpp",
    "cmath": "cpp",
    "compare": "cpp",
    "concepts": "cpp",
    "cstddef": "cpp",
    "cstdint": "cpp",
    "cstdio": "cpp",
    "cstdlib": "cpp",
    "cstring": "cpp",
    "ctime": "cpp",
    "cwchar": "cpp",
    "exception": "cpp",
    "ios": "cpp",
    "istream": "cpp",
    "iterator": "cpp",
    "limits": "cpp",
    "memory": "cpp",
    "random": "cpp",
    "set": "cpp",
    "stack": "cpp",
    "stdexcept": "cpp",
    "streambuf": "cpp",
    "system_error": "cpp",
    "tuple": "cpp",
    "type_traits": "cpp",
    "utility": "cpp",
    "xfacet": "cpp",
    "xiosbase": "cpp",
    "xlocale": "cpp",
    "xlocinfo": "cpp",
    "xlocnum": "cpp",
    "xmemory": "cpp",
    "xstddef": "cpp",
    "xstring": "cpp",
    "xtr1common": "cpp",
    "xtree": "cpp",
    "xutility": "cpp",
    "stdlib.h": "c",
    "string.h": "c"
  },
  "editor.suggest.snippetsPreventQuickSuggestions": false,
  "aiXcoder.showTrayIcon": true
}
```

:::

::: details tasks.json

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "g++",
      "command": "g++",
      "args": [
        "-g",
        "${file}",
        "-o",
        "${fileDirname}/${fileBasenameNoExtension}.exe"
      ],
      "problemMatcher": {
        "owner": "cpp",
        "fileLocation": ["relative", "${workspaceRoot}"],
        "pattern": {
          "regexp": "^(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
          "file": 1,
          "line": 2,
          "column": 3,
          "severity": 4,
          "message": 5
        }
      },
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

:::

## 结果

![hello](https://cdn.tangjiayan.com/notes/programming/vscode/vscode-cpp/hello.png)

## 参考

- [vscode配置C/C++环境（超详细保姆级教学）_TingLans的博客-CSDN博客](https://blog.csdn.net/m0_62721576/article/details/127207028)
