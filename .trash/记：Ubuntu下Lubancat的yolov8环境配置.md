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

## yolov8

## rknn
*参考：[toolkit2.html](https://doc.embedfire.com/linux/rk356x/Ai/zh/latest/lubancat_ai/env/toolkit2.html)*
```shell
# 创建虚拟环境
conda create -n rknn python=3.10
# 克隆官方仓库
git clone https://github.com/airockchip/rknn-toolkit2.git
pip3 install numpy

# 安装依赖库
pip3 install -r doc/requirements_cp38-1.5.0.txt
# 注意：对于AMD显卡，只能使用 CPU 的torch，需要把requirements_cp310-1.6.0.txt 中 torch注释掉
# 如果使用cpu的torch
pip3 install torch==1.13.1 --index-url https://download.pytorch.org/whl/cpu
 
# 安装RKNN-Toolkit2 wheel包
pip install rknn-toolkit2/packages/rknn_toolkit2-1.6.0+81f21f4d-cp310-cp310-linux_x86_64.whl 
# 测试：
(rknn) cerry@ROG-Flow-X13:~/project/yolo/rknn-toolkit2$ python
Python 3.10.18 (main, Jun  5 2025, 13:14:17) [GCC 11.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> from rknn.api import RKNN
>>> 

# 没有输出无报错，说明安装成功
```

## pt2rknn
将torchscript模型转为RKNN模型
参考官方代码
```python
if __name__ == '__main__':
    model_path, platform, do_quant, output_path = parse_arg()

    # Create RKNN object
    rknn = RKNN(verbose=False)

    # Pre-process config
    print('--> Config model')
    rknn.config(mean_values=[[0, 0, 0]], std_values=[
                    [255, 255, 255]], target_platform=platform)
    print('done')

    # 加载Pytorch模型，如果是使用airockchip/ultralytics_yolov8的main分支，将导入onnx模型
    print('--> Loading model')
    #ret = rknn.load_onnx(model=model_path)
    ret = rknn.load_pytorch(model=model_path, input_size_list=[[1, 3, 640, 640]])
    if ret != 0:
        print('Load model failed!')
        exit(ret)
    print('done')

    # Build model
    print('--> Building model')
    ret = rknn.build(do_quantization=do_quant, dataset=DATASET_PATH)
    if ret != 0:
        print('Build model failed!')
        exit(ret)
    print('done')

    # Export rknn model
    print('--> Export rknn model')
    ret = rknn.export_rknn(output_path)
    if ret != 0:
        print('Export rknn model failed!')
        exit(ret)
    print('done')

    # 精度分析,,输出目录./snapshot
    #print('--> Accuracy analysis')
    #ret = rknn.accuracy_analysis(inputs=['./subset/000000052891.jpg'])
    #if ret != 0:
    #    print('Accuracy analysis failed!')
    #    exit(ret)
    #print('done')

    # Release
    rknn.release()
```

保存为pt2rknn.py
```sh

```


![[IMG/Pasted image 20250918020149.png]]

https://github.com/airockchip/rknn_model_zoo/tree/main/examples/yolov5

