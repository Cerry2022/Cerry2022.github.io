# 用户管理

Linux 中一般不会直接使用 root 管理员进行操作，因为其权限高，一旦失误 `rm -rf /*` 就追悔莫及了。所以一般是使用普通用户，有需要时再通过 `sudo` 指令执行 root 命令。 &#x20;

## 添加用户

添加新用户的步骤：[useradd](https://www.runoob.com/linux/linux-comm-useradd.html) → 设置密码

```bash
useradd 选项 用户名
#[选项] 可有可无，<用户名> 必须有。
```

例：`useradd jan`

`useradd` 创建的新用户没有密码，需要手动设置密码。

```sh
passwd 用户名 
```

`passwd` 设置的密码是隐藏输入的，可以使用 [chpasswd](https://blog.csdn.net/qq\_21816375/article/details/76377182) 明文添加密码，命令格式：

```sh
echo 用户名:明文密码 | chpasswd
```

如

```sh
echo jan:123456 | chpasswd
```

<figure><img src="https://cdn.tangjiayan.com/notes/linux/chpasswd.png" alt=""><figcaption></figcaption></figure>

```bash
$ passwd -S jan
# -S 表示 status，显示密码信息

jan NP 08/23/2023 0 99999 7 -1
# NP 表示 No Password

$ echo jan:135246 | chpasswd

$ passwd -S jan
jan P 08/23/2023 0 99999 7 -1
# P 表示有一个 Password
```

参考：[What does the L returned from passwd --status mean - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/526761/what-does-the-l-returned-from-passwd-status-mean)

## 列出所有用户

```bash
less /etc/passwd
```

## 切换用户

```bash
su - <用户名>
```

或

```bash
su <用户名>
```

## 设置密码

```bash
passwd <用户名>
```
