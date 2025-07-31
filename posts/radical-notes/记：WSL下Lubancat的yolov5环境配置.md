## 配置miniconda3
```shell
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash ~/Miniconda3-latest-Linux-x86_64.sh
# 同意协议并 yes 执行初始化
# fish 下
# source /home/<user name>/miniconda3/etc/fish/conf.d/conda.fish
source ~/.cofig/
# 测试:
conda -v
```

## yolov5


> [!hint]
> 注意: 以下章节弃用
> ## rknn
>
> ```shell
> mkdir rknn && cd rknn
> # 1. 使用用conda创建一个虚拟环境,并安装 Python3.6 和 pip3，
> conda create -n rknn python=3.8
> conda activate rknn
> # 2. 安装相关依赖
> sudo apt-get install libxslt1-dev zlib1g zlib1g-dev libglib2.0-0 libsm6 \
> libgl1-mesa-glx libprotobuf-dev gcc
> # 3. 拉取RKNN-Toolkit2
> git clone https://github.com/airockchip/rknn-toolkit2
> 
> # 4. 配置pip源
> pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
> 
> # 安装依赖库
> cd rknn-toolkit2
> pip3 install -r packages/x86_64/requirements_cp38-2.3.2.txt
> # 或 安装在线源
> ## pip install rknn-toolkit2 -i https://pypi.org/simple
> # 需要根据python版本和rknn_toolkit2版本选择whl文件，例如这里创建的是python3.8环境，使用带”cp38”的whl文件。
> #pip3 install packages/x86_64/rknn_toolkit2-2.3.2-cp38-cp38-manylinux_2_17_x86_64.manylinux2014_x86_64.whl
> 
> 
> ## 注意:如果是AMD平台,想要使用CPU
> ## 版本号根据 rknn_toolkit2/doc/requirements_cp38-1.5.0.txt
> # pip3 install torch==1.10.1 torchvision==0.11.2 torchaudio==0.10.1 --index-url https://download.pytorch.org/whl/cpu
> ```






https://github.com/airockchip/rknn_model_zoo/tree/main/examples/yolov5

