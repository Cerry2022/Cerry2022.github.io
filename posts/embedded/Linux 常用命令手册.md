**Linux常用命令手册（2025版）**

**以下是《Linux常用命令手册》完整命令列表，按功能分类整理：**

**一、基础文件操作（20个）**

**1. `ls` - 显示目录内容**

**2. `cd` - 切换工作目录**

**3. `mkdir` - 创建目录**

**4. `rm` - 删除文件/目录**

**5. `cp` - 复制文件/目录**

**6. `mv` - 移动/重命名文件**

**7. `touch` - 创建空文件或更新时间戳**

**8. `cat` - 查看文件内容**

**9. `more` - 分页查看文件**

**10. `less` - 增强分页查看文件**

**11. `head` - 显示文件头部内容**

**12. `tail` - 显示文件尾部内容**

**13. `ln` - 创建硬链接/符号链接**

**14. `tree` - 树形显示目录结构**

**15. `find` - 查找文件/目录**

**16. `locate` - 快速查找文件路径**

**17. `grep` - 搜索文本模式**

**18. `awk` - 文本处理与数据分析**

**19. `sed` - 流编辑器**

**20. `diff` - 比较文件差异**

****二、系统管理（15个）****

**21. `top` - 实时监控系统资源**

**22. `free` - 查看内存使用情况**

**23. `df` - 查看磁盘空间占用**

**24. `du` - 查看目录/文件大小**

**25. `uptime` - 系统运行时间与负载**

**26. `who` - 查看当前登录用户**

**27. `last` - 查看用户登录历史**

**28. `shutdown` - 关机/重启系统**

**29. `reboot` - 重启系统**

**30. `poweroff` - 关闭系统**

**31. `date` - 显示/设置系统时间**

**32. `cal` - 查看日历**

**33. `clear` - 清空终端屏幕**

**34. `history` - 查看命令历史记录**

**35. `uname` - 查看系统信息**

**三、网络通信（15个）**

**36. `ping` - 测试网络连通性**

**37. `ssh` - 远程登录到Linux服务器**

**38. `scp` - 安全复制文件**

**39. `sftp` - 安全文件传输协议**

**40. `netstat` - 查看网络连接状态**

**41. `ifconfig` - 查看/配置网络接口**

**42. `ip` - 新一代网络配置工具**

**43. `traceroute` - 追踪网络路由路径**

**44. `nslookup` - 查询DNS信息**

**45. `dig` - 高级DNS查询工具**

**46. `wget` - 下载网络文件**

**47. `curl` - 发送HTTP请求**

**48. `ftp` - 文件传输协议客户端**

**49. `telnet` - 远程登录（不安全）**

**50. `arp` - 查看/管理ARP缓存**

**四、文本处理（20个）***

**51. `cut` - 提取文本字段**

**52. `sort` - 对文本进行排序**

**53. `uniq` - 去除重复行**

**54. `wc` - 统计行数/字数/字符数**

**55. `comm` - 比较两个文件差异**

**56. `join` - 合并文件内容**

**57. `paste` - 合并文件列**

**58. `tr` - 字符转换与删除**

**59. `col` - 过滤控制字符**

**60. `fmt` - 格式化文本段落**

**61. `pr` - 分页显示文本**

**62. `fold` - 限制文本行宽**

**63. `expand` - 制表符转空格**

**64. `csplit` - 按模式分割文件**

**65. `split` - 分割大文件**

**66. `patch` - 应用补丁文件**

**67. `cmp` - 比较二进制文件**

**68. `diffstat` - 统计差异报告**

**69. `spell` - 拼写检查**

**70. `look` - 字典式查找**

**五、压缩解压（10个）***

**71. `tar` - 打包/解包文件**

**72. `gzip` - 压缩/解压文件（.gz格式）**

**73. `bzip2` - 高压缩比压缩（.bz2格式）**

**74. `zip` - 创建/解压ZIP文件**

**75. `xz` - 最高压缩比压缩（.xz格式）**

**76. `7z` - 7-Zip格式压缩/解压**

**77. `gunzip` - 解压.gz文件**

**78. `bunzip2` - 解压.bz2文件**

**79. `unxz` - 解压.xz文件**

**80. `zipinfo` - 查看ZIP文件信息**

**六、权限管理（10个）**

**81. `chmod` - 修改文件权限**

**82. `chown` - 修改文件所有者**

**83. `chgrp` - 修改文件所属组**

**84. `umask` - 设置默认文件权限掩码**

**85. `lsattr` - 查看文件特殊属性**

**86. `chattr` - 设置文件特殊属性**

**87. `setfacl` - 设置访问控制列表（ACL）**

**88. `getfacl` - 查看文件ACL信息**

**89. `su` - 切换用户身份**

**90. `sudo` - 以管理员权限执行命令**

**七、进程管理（10个）**

**91. `ps` - 查看进程状态**

**92. `top` - 实时监控进程资源**

**93. `kill` - 终止进程**

**94. `pkill` - 按名称终止进程**

**95. `killall` - 终止所有同名进程**

**96. `pgrep` - 查找进程ID**

**97. `nice` - 调整进程优先级**

**98. `renice` - 重新调整进程优先级**

**99. `jobs` - 查看后台作业**

**100. `fg/bg` - 前后台任务切换**

**八、其他实用工具（10个）**

**101. `echo` - 输出文本内容**

**102. `export` - 设置环境变量**

**103. `alias` - 创建命令别名**

**104. `type` - 查看命令类型**

**105. `which` - 查找命令路径**

**106. `whereis` - 查找命令相关文件**

**107. `man` - 查看命令手册**

**108. `help` - 查看内置命令帮助**

**109. `time` - 测量命令执行时间**

**110. `screen/tmux` - 终端会话管理**

**一、基础文件操作（20 个）**

**1. ls - 目录内容查看**

ls -l # 长格式显示

ls -a # 显示隐藏文件

ls -R # 递归显示子目录

ls -S # 按文件大小排序

**2. cd - 目录切换**

cd /var/log # 绝对路径切换

cd ~/projects # 用户目录跳转

cd - # 返回上次目录

**3. mkdir - 创建目录**

mkdir project # 单级目录

mkdir -p dir/subdir # 递归创建

**4. rm - 删除文件 / 目录**

rm file.txt # 删除文件

rm -r dir/ # 删除目录

rm -f *.tmp # 强制删除

**5. cp - 文件复制**

cp src.txt dest/ # 简单复制

cp -r dir/ backup/ # 复制目录

cp -i file.txt # 覆盖前询问

**6. mv - 移动 / 重命名**

mv old.txt new.txt # 重命名

mv docs/ /var/ # 移动目录

**7. touch - 创建空文件**

touch log.txt # 创建空文件

touch -t 202504031200 file.txt # 修改时间戳

**8. cat - 查看文件内容**

cat file.txt # 直接显示

cat -n file.txt # 显示行号

**9. more - 分页查看**

more large.log # 空格翻页

more +/ERROR log.txt # 从关键词开始

**10. less - 增强分页**

less /var/log/syslog # 上下键滚动

/error # 搜索关键词

**11. head - 查看头部**

head -n 10 data.csv # 查看前10行

head -c 100 file.bin # 查看前100字节

**12. tail - 查看尾部**

tail -f app.log # 实时监控日志

tail -n +100 file.txt # 查看第100行后内容

**13. ln - 创建链接**

ln file.txt hardlink # 硬链接

ln -s target symlink # 符号链接

**14. tree - 目录树展示**

tree -L 2 /var/lib # 显示两层目录

tree -a # 包含隐藏文件

**15. find - 文件搜索**

find /home -name "\*.jpg" # 按文件名搜索

find . -type d -empty # 查找空目录

**16. locate - 快速查找**

locate passwd # 查找文件路径

updatedb # 更新数据库

**17. grep - 文本搜索**

grep "error" /var/log/syslog # 基本搜索

grep -i "warning" log.txt # 忽略大小写

grep -v "OK" output.txt # 排除关键词

**18. awk - 文本处理**

awk '{print $3}' data.csv # 打印第三列

awk -F, '{print $1}' file.csv # 指定分隔符

**19. sed - 流编辑**

sed 's/old/new/g' file.txt # 全局替换

sed -i 's/^#//' config.conf # 直接修改文件

**20. diff - 比较文件**

diff file1.txt file2.txt # 显示差异

diff -r dir1/ dir2/ # 比较目录

**二、系统管理（15 个）**

**21. top - 实时监控**

top # 启动监控

M # 按内存排序

P # 按CPU排序

**22. free - 内存查看**

free -h # 人性化显示

free -m # 以MB为单位

**23. df - 磁盘空间**

df -h # 查看分区使用情况

df -i # 查看inode使用

**24. du - 目录大小**

du -sh /var/log # 总大小

du -a # 显示所有文件

**25. uptime - 系统运行时间**

uptime # 显示负载

**26. who - 当前用户**

whoami # 当前用户名

w # 详细用户信息

**27. last - 登录记录**

last -n 5 # 最后5条记录

lastlog # 所有用户最后登录时间

**28. shutdown - 关机 / 重启**

shutdown -h +10 # 10分钟后关机

shutdown -r now # 立即重启

**29. date - 时间管理**

date "+%Y-%m-%d" # 格式化输出

date -s "2025-04-03 12:00:00" # 设置时间

**30. cal - 日历查看**

cal 2025 # 全年日历

cal -3 # 显示前后月

**31. clear - 清屏**

clear # 清除终端内容

**32. history - 命令历史**

history # 查看历史

history -c # 清空历史

**33. uname - 系统信息**

uname -a # 完整信息

uname -r # 内核版本

**34. dmidecode - 硬件信息**

dmidecode -t 1 # 主板信息

dmidecode -t 2 # CPU信息

**35. lshw - 硬件列表**

lshw -short # 简要硬件信息

**三、网络通信（15 个）**

**36. ping - 网络测试**

ping -c 5 192.168.1.1 # 发送5个包

ping -W 1 192.168.1.1 # 设置超时时间

**37. ssh - 远程登录**

ssh user@host # 基本登录

ssh -p 2222 user@host # 指定端口

**38. scp - 安全复制**

scp local.txt user@host:/remote/ # 上传文件

scp -r dir/ user@host:/remote/ # 上传目录

**39. sftp - 安全文件传输**

sftp user@host # 启动sftp

get remote.txt # 下载文件

**40. netstat - 网络状态**

netstat -tunlp # 查看监听端口

netstat -s # 统计网络数据

**41. ifconfig - 网络接口**

ifconfig eth0 # 查看接口信息

ifconfig eth0 192.168.1.100 netmask 255.255.255.0 # 设置IP

**42. ip - 新网络工具**

ip addr show # 显示IP地址

ip route add default via 192.168.1.1 # 设置默认路由

**43. traceroute - 路由追踪**

traceroute www.google.com # 追踪路径

**44. nslookup - DNS 查询**

nslookup example.com # 查询域名

**45. dig - 高级 DNS**

dig @8.8.8.8 example.com # 指定DNS服务器

**46. wget - 文件下载**

wget https://example.com/file.zip # 直接下载

wget -c file.zip # 断点续传

**47. curl - 网络请求**

curl example.com # 获取网页内容

curl -O https://example.com/file.txt # 下载文件

**48. ftp - 文件传输**

ftp ftp.example.com # 连接FTP服务器

put local.txt # 上传文件

**49. telnet - 远程登录**

telnet host 22 # 测试端口

**50. arp - ARP 表管理**

arp -a # 查看ARP缓存

arp -d 192.168.1.1 # 删除条目

**四、文本处理（20 个）**

**51. cut - 字段提取**

cut -d, -f1 data.csv # 提取第一列

cut -c 1-5 file.txt # 提取前5个字符

**52. sort - 排序**

sort -n data.txt # 数字排序

sort -r # 降序排列

**53. uniq - 去重**

uniq file.txt # 去除连续重复行

uniq -c # 统计重复次数

**54. wc - 统计**

wc -l file.txt # 行数统计

wc -w # 单词数

**55. comm - 比较文件**

comm file1.txt file2.txt # 显示差异

**56. join - 合并文件**

join file1.txt file2.txt # 按共同字段合并

**57. paste - 列合并**

paste file1.txt file2.txt # 横向合并

**58. tr - 字符转换**

tr 'a-z' 'A-Z' < file.txt # 转大写

tr -d '\n' # 删除换行符

**59. col - 格式转换**

col -x # 转换制表符

**60. fmt - 文本格式化**

fmt -w 80 file.txt # 设置行宽

**61. pr - 分页显示**

pr -h "Report" file.txt # 添加标题

**62. fold - 限制行宽**

fold -w 60 file.txt # 折叠长行

**63. expand - 制表符转空格**

expand -t 4 file.txt # 每个制表符转4个空格

**64. csplit - 分割文件**

csplit file.txt /ERROR/ # 按模式分割

**65. split - 大文件分割**

split -b 100m largefile.iso # 按大小分割

**66. patch - 应用补丁**

patch original.txt patch.diff # 打补丁

**67. cmp - 二进制比较**

cmp file1 file2 # 比较文件差异

**68. diffstat - 差异统计**

diff file1 file2 | diffstat # 生成差异报告

**69. spell - 拼写检查**

spell file.txt # 检查拼写错误

**70. look - 字典查找**

look "test" /usr/share/dict/words # 查找单词

**五、压缩解压（10 个）**

**71. tar - 打包工具**

tar -czvf backup.tar.gz /data # 压缩

tar -xzvf backup.tar.gz # 解压

**72. gzip - 压缩文件**

gzip file.txt # 压缩为file.txt.gz

gzip -d file.txt.gz # 解压

**73. bzip2 - 高压缩比**

bzip2 file.txt # 压缩

bunzip2 file.txt.bz2 # 解压

**74. zip - ZIP 格式**

zip -r archive.zip dir/ # 压缩目录

unzip archive.zip # 解压

**75. xz - 最高压缩比**

xz file.txt # 压缩为file.txt.xz

unxz file.txt.xz # 解压

**76. 7z - 7-Zip 格式**

7z a archive.7z file.txt # 压缩

7z x archive.7z # 解压

**77. gunzip - 解压工具**

gunzip *.gz # 批量解压

**78. tar.gz - 组合格式**

tar -zxvf package.tar.gz # 直接解压

**79. tar.bz2 - 组合格式**

tar -jxvf package.tar.bz2 # 直接解压

**80. zipinfo - 查看压缩包信息**

zipinfo archive.zip # 显示内容

**六、权限管理（10 个）**

**81. chmod - 修改权限**

chmod 755 script.sh # 设置执行权限

chmod u+s file # 设置SUID

**82. chown - 修改所有者**

chown user:group file.txt # 更改属主属组

**83. chgrp - 修改所属组**

chgrp staff file.txt # 更改所属组

**84. umask - 默认权限**

umask 022 # 设置默认权限

**85. lsattr - 查看特殊属性**

lsattr file.txt # 显示隐藏属性

**86. chattr - 设置特殊属性**

chattr +i file.txt # 设置不可修改

**87. setfacl - 设置 ACL**

setfacl -m u:user:rwx file.txt # 添加ACL权限

**88. getfacl - 查看 ACL**

getfacl file.txt # 显示ACL信息

**89. su - 切换用户**

su - user # 切换并加载环境

**90. sudo - 管理员权限**

sudo apt update # 以管理员身份执行

**七、进程管理（10 个）**

**91. ps - 进程查看**

ps aux # 显示所有进程

ps -ef # 显示进程树

**92. top - 实时监控**

top -p PID # 监控指定进程

**93. kill - 终止进程**

kill -9 PID # 强制终止

**94. pkill - 按名称终止**

pkill -9 firefox # 终止火狐进程

**95. killall - 终止所有**

killall -9 python # 终止所有Python进程

**96. pgrep - 查找进程 ID**

pgrep -l nginx # 显示进程名和ID

**97. nice - 调整优先级**

nice -n 10 command # 降低优先级

**98. renice - 重新调整**

renice -n -5 PID # 提高优先级

**99. jobs - 后台作业**

jobs -l # 显示后台作业

**100. fg/bg - 前后台切换**

fg 1 # 将作业调至前台

bg 1 # 继续后台运行

**八、其他实用工具（10 个）**

**101. echo - 输出文本**

echo "Hello World" # 简单输出

**102. export - 环境变量**

export PATH=$PATH:/new/path # 添加到环境变量

**103. alias - 命令别名**

alias ll='ls -l' # 创建别名

**104. type - 查看命令类型**

type ls # 查看是否为内置命令

**105. which - 查找命令路径**

which python # 显示Python路径

**106. whereis - 查找文件**

whereis passwd # 查找二进制文件

**107. man - 帮助手册**

man 5 passwd # 查看第5章节

**108. help - 内置命令帮助**

help cd # 查看cd命令帮助

**109. time - 测量时间**

time command # 显示执行时间

**110. screen - 终端会话**

screen -S session # 创建会话

screen -r session # 恢复会话

**附录：快速查找**

1. **获取帮助**：man [命令] 或 [命令] --help
2. **命令历史**：history + !数字 重复执行
3. **自动补全**：按 Tab 键自动补全路径或命令
4. **通配符**：* 匹配任意字符，? 匹配单个字符

**注意事项**：

  

- 部分命令需要管理员权限（使用sudo）
- 不同 Linux 发行版可能存在命令差异
- 建议通过man命令查看完整文档