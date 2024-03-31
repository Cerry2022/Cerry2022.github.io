# Bitvise Access Denied 问题

## 问题

使用 [Bitvise](https://www.bitvise.com/) 通过 SFTP 配置 `nginx.conf`，鼠标双击时，出现：

```
Opening remote file
'...\nginx.conf' failed.
Access denied.
See log for more information
```

![bitvise-access-denied](https://cdn.tangjiayan.com/notes/common/bitvise-access-denied.png)

## 解决

原因是没选对打开方式，`右键` - `Edit With...`，选择 VS Code 即可。

![bitvise-access-denied-solution](https://cdn.tangjiayan.com/notes/common/bitvise-access-denied-solution.png)
