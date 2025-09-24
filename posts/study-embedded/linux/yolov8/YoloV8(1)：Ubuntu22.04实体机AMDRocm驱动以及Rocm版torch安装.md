---
date: 2025-09-08 23:18
modifyDate: 2025-09-25 01:16
title: YoloV8(1)：Ubuntu22.04实体机AMDRocm驱动以及Rocm版torch安装
category: Linux
tags:
  - YoloV8
description:
---
## 0.安装Ubutu22.04
WSL方案目前不可行，需要安装实体机Ubuntu22.04

> [!hint]
> 注意: 以下章节弃用, WSL方案目前不可行
>
>```shell
wsl --install -d Ubuntu-24.04
wsl --export Ubuntu-24.04 D:\WSL\Ubuntu-24.04\Ubuntu-24.04.tar
wsl --unregister Ubuntu-24.04
wsl --import Ubuntu-24.04 D:\WSL\Ubuntu-24.04 D:\WSL\Ubuntu-24.04\Ubuntu-24.04.tar --version 2
wsl -d Ubuntu-24.04
#配置默认用户
ubuntu2404 config --default-user cerry
>
>
># 确保DNS服务器固定，网络正常访问
echo 'nameserver 8.8.8.8' | sudo tee /etc/resolv.conf > /dev/null
echo '[network]' | sudo tee /etc/wsl.conf > /dev/null
echo 'generateResolvConf = false' | sudo tee -a /etc/wsl.conf > /dev/null
>
># 换源
sudo mv /etc/apt/sources.list.d/ubuntu.sources  /etc/apt/backup-sources.list.d-ubuntu.sources
sudo vim /etc/apt/sources.list.d/tuna.sources
>
 >input
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu/
#如果使用其他镜像站，上面这行可以改成其他镜像站的网址
Suites: noble noble-updates noble-backports
Components: main universe restricted multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
>
Types: deb
URIs: http://security.ubuntu.com/ubuntu
#如果安全更新需要使用镜像站，上面这行也改成 URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu/
Suites: noble-security
Components: main universe restricted multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
>
>```



## 1. 安装Miniconda3

```shell
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh 
chmod a+x Miniconda3-latest-Linux-x86_64.sh
./Miniconda3-latest-Linux-x86_64.sh

```

## 2.安装 驱动包

form [WSL How to guide - Use ROCm on Radeon GPUs](https://rocm.docs.amd.com/projects/radeon/en/latest/docs/install/wsl/howto_wsl.html)
```shell
# 1. 安装AMD 统一内核模式 GPU 驱动程序、ROCm 和图形
sudo apt update
wget https://repo.radeon.com/amdgpu-install/6.4.2.1/ubuntu/noble/amdgpu-install_6.4.60402-1_all.deb
sudo apt install ./amdgpu-install_6.4.60402-1_all.deb

# 2. 安装WSL 用例
amdgpu-install -y --usecase=wsl,rocm --no-dkms
<output
[sudo] password for cerry:
Hit:1 https://mirrors.tuna.tsinghua.edu.cn/ubuntu noble InRelease
Hit:2 https://mirrors.tuna.tsinghua.edu.cn/ubuntu noble-updates InRelease
Hit:3 https://mirrors.tuna.tsinghua.edu.cn/ubuntu noble-backports InRelease
Hit:4 http://security.ubuntu.com/ubuntu noble-security InRelease
Hit:5 https://repo.radeon.com/amdgpu/6.4.2.1/ubuntu noble InRelease
Hit:6 https://repo.radeon.com/rocm/apt/6.4.2 noble InRelease
Reading package lists... Done
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
hsa-runtime-rocr4wsl-amdgpu is already the newest version (25.10-2188619.24.04).
rocm is already the newest version (6.4.2.60402-120~24.04).
0 upgraded, 0 newly installed, 0 to remove and 2 not upgraded.


```

验证：
```shell
(base) cerry@cerry-ROG-Flow-X13-GV301RA-GV301RA:~$ rocminfo
ROCk module version 6.12.12 is loaded
=====================    
HSA System Attributes    
=====================    
Runtime Version:         1.15
Runtime Ext Version:     1.7
System Timestamp Freq.:  1000.000000MHz
Sig. Max Wait Duration:  18446744073709551615 (0xFFFFFFFFFFFFFFFF) (timestamp count)
Machine Model:           LARGE                              
System Endianness:       LITTLE                             
Mwaitx:                  DISABLED
XNACK enabled:           NO
DMAbuf Support:          YES
VMM Support:             YES

==========               
HSA Agents               
==========               
*******                  
Agent 1                  
*******                  
  Name:                    AMD Ryzen 7 6800HS with Radeon Graphics
  Uuid:                    CPU-XX                             
  Marketing Name:          AMD Ryzen 7 6800HS with Radeon Graphics
  Vendor Name:             CPU                                
  Feature:                 None specified                     
  Profile:                 FULL_PROFILE                       
  Float Round Mode:        NEAR                               
  Max Queue Number:        0(0x0)                             
  Queue Min Size:          0(0x0)                             
  Queue Max Size:          0(0x0)                             
  Queue Type:              MULTI                              
  Node:                    0                                  
  Device Type:             CPU                                
  Cache Info:              
    L1:                      32768(0x8000) KB                   
  Chip ID:                 0(0x0)                             
  ASIC Revision:           0(0x0)                             
  Cacheline Size:          64(0x40)                           
  Max Clock Freq. (MHz):   4785                               
  BDFID:                   0                                  
  Internal Node ID:        0                                  
  Compute Unit:            16                                 
  SIMDs per CU:            0                                  
  Shader Engines:          0                                  
  Shader Arrs. per Eng.:   0                                  
  WatchPts on Addr. Ranges:1                                  
  Memory Properties:       
  Features:                None
  Pool Info:               
    Pool 1                   
      Segment:                 GLOBAL; FLAGS: FINE GRAINED        
      Size:                    15591488(0xede840) KB              
      Allocatable:             TRUE                               
      Alloc Granule:           4KB                                
      Alloc Recommended Granule:4KB                                
      Alloc Alignment:         4KB                                
      Accessible by all:       TRUE                               
    Pool 2                   
      Segment:                 GLOBAL; FLAGS: EXTENDED FINE GRAINED
      Size:                    15591488(0xede840) KB              
      Allocatable:             TRUE                               
      Alloc Granule:           4KB                                
      Alloc Recommended Granule:4KB                                
      Alloc Alignment:         4KB                                
      Accessible by all:       TRUE                               
    Pool 3                   
      Segment:                 GLOBAL; FLAGS: KERNARG, FINE GRAINED
      Size:                    15591488(0xede840) KB              
      Allocatable:             TRUE                               
      Alloc Granule:           4KB                                
      Alloc Recommended Granule:4KB                                
      Alloc Alignment:         4KB                                
      Accessible by all:       TRUE                               
    Pool 4                   
      Segment:                 GLOBAL; FLAGS: COARSE GRAINED      
      Size:                    15591488(0xede840) KB              
      Allocatable:             TRUE                               
      Alloc Granule:           4KB                                
      Alloc Recommended Granule:4KB                                
      Alloc Alignment:         4KB                                
      Accessible by all:       TRUE                               
  ISA Info:                
*******                  
Agent 2                  
*******                  
  Name:                    gfx1035                            
  Uuid:                    GPU-XX                             
  Marketing Name:          AMD Radeon Graphics                
  Vendor Name:             AMD                                
  Feature:                 KERNEL_DISPATCH                    
  Profile:                 BASE_PROFILE                       
  Float Round Mode:        NEAR                               
  Max Queue Number:        128(0x80)                          
  Queue Min Size:          64(0x40)                           
  Queue Max Size:          131072(0x20000)                    
  Queue Type:              MULTI                              
  Node:                    1                                  
  Device Type:             GPU                                
  Cache Info:              
    L1:                      16(0x10) KB                        
    L2:                      2048(0x800) KB                     
  Chip ID:                 5761(0x1681)                       
  ASIC Revision:           2(0x2)                             
  Cacheline Size:          128(0x80)                          
  Max Clock Freq. (MHz):   2200                               
  BDFID:                   2048                               
  Internal Node ID:        1                                  
  Compute Unit:            12                                 
  SIMDs per CU:            2                                  
  Shader Engines:          1                                  
  Shader Arrs. per Eng.:   2                                  
  WatchPts on Addr. Ranges:4                                  
  Coherent Host Access:    FALSE                              
  Memory Properties:       APU
  Features:                KERNEL_DISPATCH 
  Fast F16 Operation:      TRUE                               
  Wavefront Size:          32(0x20)                           
  Workgroup Max Size:      1024(0x400)                        
  Workgroup Max Size per Dimension:
    x                        1024(0x400)                        
    y                        1024(0x400)                        
    z                        1024(0x400)                        
  Max Waves Per CU:        32(0x20)                           
  Max Work-item Per CU:    1024(0x400)                        
  Grid Max Size:           4294967295(0xffffffff)             
  Grid Max Size per Dimension:
    x                        4294967295(0xffffffff)             
    y                        4294967295(0xffffffff)             
    z                        4294967295(0xffffffff)             
  Max fbarriers/Workgrp:   32                                 
  Packet Processor uCode:: 122                                
  SDMA engine uCode::      47                                 
  IOMMU Support::          None                               
  Pool Info:               
    Pool 1                   
      Segment:                 GLOBAL; FLAGS: COARSE GRAINED      
      Size:                    7795744(0x76f420) KB               
      Allocatable:             TRUE                               
      Alloc Granule:           4KB                                
      Alloc Recommended Granule:2048KB                             
      Alloc Alignment:         4KB                                
      Accessible by all:       FALSE                              
    Pool 2                   
      Segment:                 GLOBAL; FLAGS: EXTENDED FINE GRAINED
      Size:                    7795744(0x76f420) KB               
      Allocatable:             TRUE                               
      Alloc Granule:           4KB                                
      Alloc Recommended Granule:2048KB                             
      Alloc Alignment:         4KB                                
      Accessible by all:       FALSE                              
    Pool 3                   
      Segment:                 GROUP                              
      Size:                    64(0x40) KB                        
      Allocatable:             FALSE                              
      Alloc Granule:           0KB                                
      Alloc Recommended Granule:0KB                                
      Alloc Alignment:         0KB                                
      Accessible by all:       FALSE                              
  ISA Info:                
    ISA 1                    
      Name:                    amdgcn-amd-amdhsa--gfx1035         
      Machine Models:          HSA_MACHINE_MODEL_LARGE            
      Profiles:                HSA_PROFILE_BASE                   
      Default Rounding Mode:   NEAR                               
      Default Rounding Mode:   NEAR                               
      Fast f16:                TRUE                               
      Workgroup Max Size:      1024(0x400)                        
      Workgroup Max Size per Dimension:
        x                        1024(0x400)                        
        y                        1024(0x400)                        
        z                        1024(0x400)                        
      Grid Max Size:           4294967295(0xffffffff)             
      Grid Max Size per Dimension:
        x                        4294967295(0xffffffff)             
        y                        4294967295(0xffffffff)             
        z                        4294967295(0xffffffff)             
      FBarrier Max Size:       32                                 
    ISA 2                    
      Name:                    amdgcn-amd-amdhsa--gfx10-3-generic 
      Machine Models:          HSA_MACHINE_MODEL_LARGE            
      Profiles:                HSA_PROFILE_BASE                   
      Default Rounding Mode:   NEAR                               
      Default Rounding Mode:   NEAR                               
      Fast f16:                TRUE                               
      Workgroup Max Size:      1024(0x400)                        
      Workgroup Max Size per Dimension:
        x                        1024(0x400)                        
        y                        1024(0x400)                        
        z                        1024(0x400)                        
      Grid Max Size:           4294967295(0xffffffff)             
      Grid Max Size per Dimension:
        x                        4294967295(0xffffffff)             
        y                        4294967295(0xffffffff)             
        z                        4294967295(0xffffffff)             
      FBarrier Max Size:       32                                 
*** Done ***             

```

## 3. # Install PyTorch for ROCm

form: [Install PyTorch for Radeon GPUs on WSL  ](https://rocm.docs.amd.com/projects/radeon/en/latest/docs/install/wsl/install-pytorch.html#)

```shell
conda create -n ROCm python=3.12

conda activite ROCm

sudo apt install python3-pip -y
pip3 install --upgrade pip wheel

wget https://repo.radeon.com/rocm/manylinux/rocm-rel-6.4.2/torch-2.6.0%2Brocm6.4.2.git76481f7c-cp312-cp312-linux_x86_64.whl
wget https://repo.radeon.com/rocm/manylinux/rocm-rel-6.4.2/torchvision-0.21.0%2Brocm6.4.2.git4040d51f-cp312-cp312-linux_x86_64.whl
wget https://repo.radeon.com/rocm/manylinux/rocm-rel-6.4.2/pytorch_triton_rocm-3.2.0%2Brocm6.4.2.git7e948ebf-cp312-cp312-linux_x86_64.whl
wget https://repo.radeon.com/rocm/manylinux/rocm-rel-6.4.2/torchaudio-2.6.0%2Brocm6.4.2.gitd8831425-cp312-cp312-linux_x86_64.whl
pip3 uninstall torch torchvision pytorch-triton-rocm
pip3 install torch-2.6.0+rocm6.4.2.git76481f7c-cp312-cp312-linux_x86_64.whl torchvision-0.21.0+rocm6.4.2.git4040d51f-cp312-cp312-linux_x86_64.whl torchaudio-2.6.0+rocm6.4.2.gitd8831425-cp312-cp312-linux_x86_64.whl pytorch_triton_rocm-3.2.0+rocm6.4.2.git7e948ebf-cp312-cp312-linux_x86_64.whl

# 检查安装是否成功
python3 -c 'import torch' 2> /dev/null && echo 'Success' || echo 'Failure'
(ROCm) cerry@cerry-ROG-Flow-X13-GV301RA-GV301RA:~$ python3 -c 'import torch' 2> /dev/null && echo 'Success' || echo 'Failure'
Success
(ROCm) cerry@cerry-ROG-Flow-X13-GV301RA-GV301RA:~$ python3 -c 'import torch; print(torch.cuda.is_available())'
True
(ROCm) cerry@cerry-ROG-Flow-X13-GV301RA-GV301RA:~$ python3 -c "import torch; print(f'device name [0]:', torch.cuda.get_device_name(0))"
device name [0]: AMD Radeon Graphics
(ROCm) cerry@cerry-ROG-Flow-X13-GV301RA-GV301RA:~$ python3 -m torch.utils.collect_env


```

