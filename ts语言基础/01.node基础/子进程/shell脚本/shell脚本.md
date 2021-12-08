# shell 脚本

* 需要解释器解释

1. 命令的堆积
2. 特点的语法 + 特定的系统的命令 = 文件
3. 带后缀, 方便理解, 可以不带后缀(不推荐)



* 脚本能做什么

1. 简化操作步骤, 提高效率, 减少人为干预, 减少系统故障
2. 自动化的完成基础配置(系统初始化操作, 系统更新, 内核调整, 网络, 时区, SSH优化)
3. 基于标准化之上的 -> 工具化
4. 定期备份恢复程序( MySql 全备 + 增量 + binlog + crond + shell脚本).
5. 自动化信息的采集 硬件, 昔日, 服务, 网络, 等等
6. 自动化安装程序(自动化安装LNMP, LAMP, MySqk, Ngbix)
7. 自动化调整配置文件.(Nginx conf, MySql conf )
8. 自动话日志收集, 日志分析.
9. 自动化扩容/缩容...

# 脚本是什么?

```sh
#! /bin/bash 
echo "123
```

执行:

命令行窗口

```bash
> bash gc.sh // 要带后缀名
// 在 bash 命令行工具下, 可以直接 ./ 执行
> ./gc.sh
```



获取当前脚本的路径

```bash
#! /bin/bash
# gc.sh

MYDIR=`dirname $(pwd)/$0`
echo $MYDIR
# 在文件所在目录下执行:
# bash gc.sh 得到: 
# /f/working/study/typescript/sh脚本
# /f/working/study/typescript/sh脚本
```


## 管道

```ps1
> ls | Format-Table name, mode
> ls | Format-Table name, mode > demo.txt // 结果写入 demo.txt 文件
```

## 执行策略

.ps1 文件   ise 拖拽运行

​           ps 拖拽运行

.bat 文件  > .\demo.bat  运行

https://www.bilibili.com/video/BV1Et4y1C7ZB?p=17&spm_id_from=pageDriver
