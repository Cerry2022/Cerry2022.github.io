---
date: 2025-07-17 09:16
modifyDate: 2025-09-25 00:45
title: NFS 配置记录：为嵌入式开发搭建共享环境
category:
tags:
description:
---

## NFS 配置记录：为嵌入式开发搭建共享环境

本篇笔记详细记录了在 Linux 环境（以 WSL2 为例）下搭建 NFS 服务器，并从一个嵌入式 Linux 开发板（以 `lubancat` 为例）挂载 NFS 共享的过程，记录了遇到的问题和解决方案。

### 环境概览

*   **宿主机：** Windows 10
*   **宿主机网络：** 校园网，NAT 模式，宿主机 IP：`10.101.8.47`
*   **WSL2 环境：** Debian
*   **客户端设备：** 嵌入式开发板 (`lubancat`)
*   **客户端网络：** 校园网，位于不同子网，IP：`10.103.6.37`

### 搭建步骤

#### 一、 WSL2 (Ubuntu) 作为 NFS 服务器端配置

1.  **安装 NFS 服务所需软件包：**
    ```bash
    sudo apt update
    sudo apt install nfs-kernel-server nfs-common
    ```
    *   `nfs-kernel-server`: 提供 NFS 服务核心功能。
    *   `nfs-common`: 提供 NFS 客户端工具（如 `showmount`）和一些辅助库。

2.  **创建共享目录并设置权限：**
    在 WSL2 的 Linux 文件系统内创建目录。
    ```bash
    sudo mkdir -p /mnt/nfs_share
    sudo chmod 777 /mnt/nfs_share
    ```
    *   `chmod 777` 提供最宽松的权限，方便调试。后续可根据安全需求调整。

3.  **配置 `/etc/exports` 文件：**
    此文件定义了哪些目录被导出以及允许访问的客户端。
    *   编辑文件： `sudo nano /etc/exports`
    *   添加以下行：
        ```
        /mnt/nfs_share 172.26.144.0/20(rw,sync,no_root_squash,insecure,no_subtree_check)
        ```
        **选项解析：**
        *   `/mnt/nfs_share`: 共享的目录。
        *   `172.26.144.0/20`: 允许访问的客户端 IP 地址范围。通过 `tcpdump` 分析，WSL 网络适配器在宿主机上表现为 `172.26.144.x` 网段，这是服务器识别到的客户端源 IP 段。
        *   `rw`: 允许读写。
        *   `sync`: 确保所有写入操作立即同步到磁盘。
        *   `no_root_squash`: 允许客户端的 root 用户以服务器上的 root 身份访问。
        *   `insecure`: **核心配置！** 允许来自非特权端口（大于 1024）的客户端连接请求，解决了 `rpc.mountd` 的 "illegal port" 错误。
        *   `no_subtree_check`: 关闭子目录权限检查，提升性能。

4.  **应用 `/etc/exports` 更改并重启服务：**
    ```bash
    sudo exportfs -ra
    sudo systemctl restart nfs-kernel-server
    sudo systemctl status nfs-kernel-server # 确认服务正常运行
    ```
    *   `exportfs -ra`: 重新读取所有导出配置并应用。
    *   `systemctl restart nfs-kernel-server`: 重启 NFS 服务以加载所有更改。

5.  **（可选但推荐）固定 NFS 相关服务端口：**
    为了确保端口转发稳定，固定 NFS 的一些关键 RPC 服务端口是个好做法。
    *   确认 `/etc/default/nfs-kernel-server` 或 `/etc/sysconfig/nfs` 中的配置，设置 `RPCMOUNTDOPTS`、`STATDOPTS` 等为固定端口（例如：`mountd: 20048`, `statd: 32765`）。
    *   确保 `/etc/modprobe.d/nfsd.conf` 文件包含 `options nfsd nfsd_tcp_port=2049 nfsd_udp_port=2049`。
    *   然后重启 NFS 服务。

#### 二、 Windows 宿主机网络配置

1.  **获取 WSL2 的动态 IP：**
    WSL2 的 IP 可能在重启后改变，需要脚本动态获取。
    ```powershell
    $wslIp = (wsl.exe hostname -I | Select-Object -First 1).Trim()
    ```

2.  **配置端口转发规则 (TCP)：**
    使用管理员权限运行 PowerShell。将宿主机监听的 NFS TCP 端口流量转发到 WSL2 的对应 IP 和端口。
    ```powershell
    $nfsTcpPorts = @(111, 2049, 20048, 32765, 32803) # NFS 所需的关键 TCP 端口
    foreach ($port in $nfsTcpPorts) {
        # 清理旧规则以避免冲突
        netsh interface portproxy delete v4tov4 listenport=$port listenaddress=0.0.0.0 | Out-Null
        # 添加新规则
        netsh interface portproxy add v4tov4 listenport=$port connectaddress=$wslIp connectport=$port listenaddress=0.0.0.0
    }
    ```

3.  **配置 Windows 防火墙规则：**
    确保入站 TCP 连接能够通过防火墙。
    ```powershell
    foreach ($port in $nfsTcpPorts) {
        $ruleName = "WSL NFS Port $port (TCP)"
        # 清理旧规则
        Remove-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue | Out-Null
        # 添加新规则
        New-NetFirewallRule -DisplayName $ruleName -Direction Inbound -Action Allow -Protocol TCP -LocalPort $port
    }
    ```
    **重要提示：** 以上 PowerShell 命令必须在 **“以管理员身份运行”** 的 PowerShell 窗口中执行。

#### 三、 嵌入式开发板 (`lubancat`) 客户端配置

1.  **确认网络互通性：**
    *   从 `lubancat` Ping Windows 宿主机 IP (`10.101.8.47`)，确保网络层可达。
    *   如果 Ping 不通，需要检查宿主机防火墙的 ICMP 规则，或校园网的网络策略。

2.  **创建挂载点：**
    在开发板上为挂载 NFS 共享创建目录。
    ```bash
    sudo mkdir -p /mnt/nfs
    ```

3.  **执行 NFS 挂载命令：**
    使用客户端的真实 IP (`10.103.6.37`)，但指定宿主机的 IP (`10.101.8.47`) 来连接 NFS 服务器。
    ```bash
    sudo mount -t nfs -o vers=4,proto=tcp,mountproto=tcp,nolock,insecure 10.101.8.47:/mnt/nfs_share /mnt/nfs/
    ```
    *   **关键选项 `insecure` 允许了来自非特权端口的连接，解决了 `rpc.mountd` 拒绝问题。**

### 遇到的问题与解决

*   **`mount.nfs: access denied by server`：**
    *   **原因：** NFS 服务器 `rpc.mountd` 拒绝了来自非特权端口的挂载请求（`illegal port`）。
    *   **根源分析：** WSL 的网络转换导致 NFS 服务器看到的客户端源 IP 是宿主机在 WSL 内网的 IP (`172.26.144.1`)，且该连接使用了非特权端口。
    *   **解决方案：** 在 WSL 的 `/etc/exports` 文件中为 `172.26.144.0/20` 添加 `insecure` 选项。
