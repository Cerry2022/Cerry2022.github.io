 
#### gcc预处理c文件

```shell
sudo gcc -E ./hello_arm.c -o hello_arm.i -v

/usr/libexec/gcc/x86_64-linux-gnu/14/cc1 
-E -quiet -v -imultiarch x86_64-linux-gnu ./hello_arm.c -o hello_arm.i 
-mtune=generic -march=x86-64 -fasynchronous-unwind-tables -dumpbase hello_arm.c -dumpba*
```

#### gcc 编译c文件
```shell
sudo gcc -S hello_arm.i -o hello_arm.s -v

/usr/libexec/gcc/x86_64-linux-gnu/14/cc1 -fpreprocessed hello_arm.i -quiet -dumpbase hello_arm.i -dumpbase-ext .i -mtune=generic -march=x86-64 -version -o hello_arm.s -fasynchronous-unwind-tables
```
注意：这里是大写S 如果输入小写s就相当于编译了一个可执行文件了
编译后的汇编文件输出
![[Pasted image 20250717100125.png]]
#### gcc编译汇编
```shell
gcc -c hello_arm.s -o hello_arm.o -v 

as -v --64 -o hello_arm.o hello_arm.s
```
#### gcc链接可重定位文件

```shell
gcc hello_arm.o -o hello_arm -v

 /usr/libexec/gcc/x86_64-linux-gnu/14/collect2 -plugin /usr/libexec/gcc/x86_64-linux-gnu/14/liblto_plugin.so -plugin-opt=/usr/libexec/gcc/x86_64-linux-gnu/14/lto-wrapper -plugin-opt=-fresolution=/tmp/ccu8Dzjz.res -plugin-opt=-pass-through=-lgcc -plugin-opt=-pass-through=-lgcc_s -plugin-opt=-pass-through=-lc -plugin-opt=-pass-through=-lgcc -plugin-opt=-pass-through=-lgcc_s --build-id --eh-frame-hdr -m elf_x86_64 --hash-style=gnu --as-needed -dynamic-linker /lib64/ld-linux-x86-64.so.2 -pie -o hello_arm /usr/lib/gcc/x86_64-linux-gnu/14/../../../x86_64-linux-gnu/Scrt1.o /usr/lib/gcc/x86_64-linux-gnu/14/../../../x86_64-linux-gnu/crti.o /usr/lib/gcc/x86_64-linux-gnu/14/crtbeginS.o -L/usr/lib/gcc/x86_64-linux-gnu/14 -L/usr/lib/gcc/x86_64-linux-gnu/14/../../../x86_64-linux-gnu -L/usr/lib/gcc/x86_64-linux-gnu/14/../../../../lib -L/lib/x86_64-linux-gnu -L/lib/../lib -L/usr/lib/x86_64-linux-gnu -L/usr/lib/../lib -L/usr/lib/gcc/x86_64-linux-gnu/14/../../.. hello_arm.o -lgcc --push-state --as-needed -lgcc_s --pop-state -lc -lgcc --push-state --as-needed -lgcc_s --pop-state /usr/lib/gcc/x86_64-linux-gnu/14/crtendS.o /usr/lib/gcc/x86_64-linux-gnu/14/../../../x86_64-linux-gnu/crtn.o
```
collect2 封装了ld链接器（ld就是gcc的标准链接器）
-dynamic-linker 表明动态编译（默认）

如果启用动态(使用 -static参数)
```shell
gcc hello_arm.o -o hello_arm -v -static

 /usr/libexec/gcc/x86_64-linux-gnu/14/collect2 -plugin /usr/libexec/gcc/x86_64-linux-gnu/14/liblto_plugin.so -plugin-opt=/usr/libexec/gcc/x86_64-linux-gnu/14/lto-wrapper -plugin-opt=-fresolution=/tmp/ccyTPuMR.res -plugin-opt=-pass-through=-lgcc -plugin-opt=-pass-through=-lgcc_eh -plugin-opt=-pass-through=-lc --build-id -m elf_x86_64 --hash-style=gnu --as-needed -static -o hello_arm /usr/lib/gcc/x86_64-linux-gnu/14/../../../x86_64-linux-gnu/crt1.o /usr/lib/gcc/x86_64-linux-gnu/14/../../../x86_64-linux-gnu/crti.o /usr/lib/gcc/x86_64-linux-gnu/14/crtbeginT.o -L/usr/lib/gcc/x86_64-linux-gnu/14 -L/usr/lib/gcc/x86_64-linux-gnu/14/../../../x86_64-linux-gnu -L/usr/lib/gcc/x86_64-linux-gnu/14/../../../../lib -L/lib/x86_64-linux-gnu -L/lib/../lib -L/usr/lib/x86_64-linux-gnu -L/usr/lib/../lib -L/usr/lib/gcc/x86_64-linux-gnu/14/../../.. hello_arm.o --start-group -lgcc -lgcc_eh -lc --end-group /usr/lib/gcc/x86_64-linux-gnu/14/crtend.o /usr/lib/gcc/x86_64-linux-gnu/14/../../../x86_64-linux-gnu/crtn.o
```


静态编译与动态编译比较

静态
![[Pasted image 20250717101331.png]]
静态
![[Pasted image 20250717101341.png]]

![[Pasted image 20250717101522.png]]

可见 静态编译耗时更久，且生成文件体积更大

### Makefile
#### 如何学习Makefile
Makefile的本质： 无论多么复杂的的语法，都是为了更好的解决项目文件之间的依赖关系。

#### 三要素
目标、依赖、命令
目标:依赖的文件或其它目标
\<tab>命令1
\<tab>命令2
\<tab>命令...

```shell
vim Makefile

targeta:targetb targetc
        echo "targeta"
targetb:
        echo "targetb"
targetc:
        echo "targetc"
保存退出执行：
make
输出：
echo "targetb"
targetb
echo "targetc"
targetc
echo "targeta"
targeta
```

通过.PHONY: 可以指定伪目标，不需要目标文件存在，而直接执行目标对应的命令

#### 变量
##### 系统变量
$(CC) $(AS) $(MAKE)
##### 自定义变量
= ， 延时赋值  直到引用这个变量时才会赋值
:= ， 立即赋值  普通含义的赋值
?= , 空赋值   变量为空赋值才有效
+=，追加赋值 在原值后加入新的值
##### 自动化变量
$< , 第一个依赖文件
$^ , 全部的依赖文件
$@ , 目标

##### 模式匹配
%: 匹配任意多个非空字符
shell:  * 通配符

.o后缀的目标文件依赖同名的.c文件
使用CC变量，即gcc，编译，$<第一个依赖 $@目标
```shell
%.o:%.c
        $(CC) -c $< -o $@
```

##### 默认规则
.o文件默认使用.c文件编译

##### 条件分支
```shell
ARCH ?= x86

ifeq ($(ARCH),x86)
        CC=gcc

else
        CC=aarch64-linux-gnu-gcc-12
endif
```



### Linux文件虚拟文件系统
#### 一切皆文件
屏蔽硬件区别，所有硬件设备抽象成文件，提供统一接口
抽象层，对文件的访问实际是对抽象层的访问
- 抽象对象：封装了底层的读写细节，使用多态来实现具体的文件系统接口
#### 普通文件系统
- ext4
- fat32
- ubifs
#### 特殊文件系统
- 进程文件系统:procfs,挂载在/proc,存放进程相关信息,任务管理器
- 设备文件系统:devfs/,挂载在/dev.存放硬件操作接口
![[Pasted image 20250717180747.png]]

### 文件描述符和打开模式
#### 系统io编程
- open
- write
- read
- lseek
- close

VFS->file_operation
```c
int fd;
fd = open(filename, flags, mode);
lseek(fd,offset,whence);
write(fd,buf,write_len);
read(fd,buf,read_len);
close(fd);
```

#### 文件描述符
实际就是进程中file_struct结构体成员fd_array的数组下标

#### Linux系统文件操作（系统调用）

##### open_close
```c
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
int open(const char *pathname, int flags);  // 当文件操存在时
int open(const char *pathname, int flags, mode_t mode);  // 当文件不存在时,指定文件权限
```
返回值:
- 成功：文件描述符
- 失败：-1
###### 文件打开模式
主模式:
- O_RDONLY:只读模式
- O_WRONLY:只写模式
- O_RDWR:读写模式
副模式:
- O_CREATE:当文件不存在,需要创建文件
- O_APPEND:追加模式
- O_DIRECT:直接IO模式
- O_SYNC:同步模式
- O_NoBLOCK:非阻塞模式
```c
#include <unistd.h>
int close(int fd);
```
返回:
- 成功：0
- 失败：-1


```c
#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>

int main()
{
    int fd;
    fd = open("./b.txt", O_RDONLY|O_CREAT, 0666);
    if (fd < 0) {
        printf("open error!!\r\n");
    }
    printf("fd:%d\r\n",fd);
    close(fd);
    return 0;
}
```
##### read_write函数的使用
###### read函数
```c
#include <unistd.h>
ssize_t read(int fd, void *buf, size_t count);
```
read函数用于从文件中读取若干个字节的数据，保存到数据缓冲区buf中，并返 回实际读取的字节数，具体函数参数如下：
- fd：文件对应的文件描述符，可以通过fopen函数获得。另外，当一个程序 运行时，Linux默认有0、1、2这三个已经打开的文件描述符，分别对应了标准输入、标准输出、标准错误输出，即可以直接访问这三种文件描述符；    
- buf：指向数据缓冲区的指针；    
- count：读取多少个字节的数据。
返回值：
- count： 成功读取全部
- 0-count:
	- 剩余文件长度小于count
	- 读取期间被异步信号打断
- -1: 失败

###### write函数
```c
#include <unistd.h>
size_t write(int fd, const void *buf, size_t count);
```
write函数用于往文件写入内容，并返回实际写入的字节长度，具体函数参数如下：
- fd：文件对应的文件描述符，可以通过fopen函数获得。
- buf：指向数据缓冲区的指针；
- count：往文件中写入多少个字节。
返回值：
- count： 成功写入全部
- 0-count:
	- 写入期间被异步信号打断
- -1: 失败

##### lseek_sync
lseek函数可以用与设置文件指针的位置，并返回文件指针相对于文件头 的位置。其函数原型如下：
```c
# include<unistd.h>
off_t lseek(int fd, off_t offset, int whence);
```
它的用法与flseek一样，其中的offset参数用于指定位置，whence参数则定义了offset的意义，whence的可取值如下：
- SEEK_SET：offset是以文件开头为参考点。  
- SEEK_END：offset是以文件尾为参考点的相对位置。
- SEEK_CUR：offset是以当前位置为参考点的相对位置。
返回：
- 成功：文件偏移值
- 失败：-1
sync：强制把修改后的页缓存区数据写入磁盘
```c
#include <unistd.h>
void sync(void);
```
返回:无

```c
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main() {
    int fd = open("file", O_RDWR|O_CREAT, 0666);
    write(fd, "123", 3);
    lseek(fd, 100, SEEK_CUR);
    write(fd, "abc", 3);
    sync();
    close(fd);
    return 0;
}
```

#### IO文件标准库
标准库实际是对系统调用再次进行了封装。
使用C标准库编写的代码，能方便地在不同的系统上移植。

例如Windows系统打开文件操作的系统API为OpenFile，Linux则为open，C标准库都把它们封装为fopen，Windows下的C库会通过fopen调用OpenFile函数实现操作，而Linux下则通过glibc调用open打开文件。用户代码如果使用fopen，那么只要根据不同的系统重 新编译程序即可，而不需要修改对应的代码。

#### 8.5.1.1. fopen函数
fopen库函数用于打开或创建文件，返回相应的文件流。它的函数原型如下：
```c
#include <stdio.h>
FILE *fopen(const char *pathname, const char *mode)
```
- pathname参数用于指定要打开或创建的文件名。    
- mode参数用于指定文件的打开方式，注意该参数是一个字符串，输入时需要带双引号：    
- “r”：以只读方式打开，文件指针位于文件的开头。    
- “r+”：以读和写的方式打开，文件指针位于文件的开头。    
- “w”：以写的方式打开，不管原文件是否有内容都把原内容清空掉，文件指针位于文件的开头。    
- “w+”： 同上，不过当文件不存在时，前面的“w”模式会返回错误，而此处的“w+”则会创建新文件。    
- “a”：以追加内容的方式打开，若文件不存在会创建新文件，文件指针位于文件的末尾。与“w+”的区别是它不会清空原文件的内容而是追加。    
- “a+”：以读和追加的方式打开，其它同上。    
- fopen的返回值是FILE类型的文件文件流，当它的值不为NULL时表示正常，后续的fread、fwrite等函数可通过文件流访问对应的文件。
    

#### 8.5.1.2. fread函数

fread库函数用于从文件流中读取数据。它的函数原型如下：
```c
#include <stdio.h>
size_t fread(void *ptr, size_t size, size_t nmemb, FILE *stream);
```
stream是使用fopen打开的文件流，fread通过它指定要访问的文件，它从该文件中读取nmemb项 数据，每项的大小为size，读取到的数据会被存储在ptr指向的数组中。fread的返回值为成功读取的项数（项的单位为size）。

#### 8.5.1.3. fwrite函数

fwrite库函数用于把数据写入到文件流。它的函数原型如下：
```c
#include <stdio.h>
size_t fwrite(void *ptr, size_t size, size_t nmemb, FILE *stream
);```

它的操作与fread相反，把ptr数组中的内容写入到stream文件流，写入的项数为nmemb，每项 大小为size，返回值为成功写入的项数（项的单位为size）。

#### 8.5.1.4. fclose函数

fclose库函数用于关闭指定的文件流，关闭时它会把尚未写到文件的内容都写出。因为标准 库会对数据进行缓冲，所以需要使用fclose来确保数据被写出。它的函数原型如下：
```c
#include <unistd.h>
int close(int fd);
```
#### 8.5.1.5. fflush函数

fflush函数用于把尚未写到文件的内容立即写出。常用于确保前面操作的数据被写 入到磁盘上。fclose函数本身也包含了fflush的操作。fflush的函数原型如下：
```c
#include <stdio.h>
int fflush(FILE *stream);
```
#### 8.5.1.6. fseek函数

fseek函数用于设置下一次读写函数操作的位置。它的函数原型如下：
```c
#include <stdio.h>
int fseek(FILE *stream, long offset, int whence);
```
其中的offset参数用于指定位置，whence参数则定义了offset的意义，whence的可取值如下：
- SEEK_SET：offset是一个绝对位置。    
- SEEK_END：offset是以文件尾为参考点的相对位置。    
- SEEK_CUR：offset是以当前位置为参考点的相对位置。

表 fopen的mode与open的flags参数关系

| fopen的mode参数 | open的flags参数                    |
| ------------ | ------------------------------- |
| r            | O_RDONLY                        |
| w            | O_WRONLY \| O_CREAT \| O_TRUNC  |
| a            | O_WRONLY \| O_CREAT \| O_APPEND |
| r+           | O_RDWR                          |
| w+           | O_RDWR \| O_CREAT \| O_TRUNC    |
| a+           | O_RDWR \| O_CREAT \| O_APPEND   |
		- mode：当open函数的flag值设置为O_CREAT时，必须使用mode参数来设置文件 与用户相关的权限。mode可用的权限如下表所示，表中各个参数可使用“| ”来组 合。