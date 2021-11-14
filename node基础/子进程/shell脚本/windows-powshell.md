# 介绍

### 自动化管理现状

操作系统版本差异

缺少一个具有统一界面统一使用方式的全能管理工具

产品具有独立的管理节目, 众多版本的管理工具

服务器部署, 管理, 维护工作繁杂

随着IT技术的发展以及企业IT管理, 尤其是虚拟化的迅猛发展, 对自动化提出更高的要求

# 基本概念

命令是由 动词 + 名词 构成

```ps1
Get-Service // 获取服务

Stop-Service // 停止服务

Start-Service -Name bits // 启动一个叫做 bits 的服务
```
get-verb, 动词的数量是有限的

名词: 例如: 针对磁盘 disk

动词不允许 <font color="red">扩充</font>

Get-Command 获取所有的命令

ps1文件: pwsh 脚本

别名: 短名称

配置文件: 可保留用户自定义函数, 别名

脚本执行策略: 为防止恶意脚本运行, 保护系统安全

管道: 前一个命令的输出作为后一个命令的输入

模块: 包含 pwsh 命令, 项以及函数等程序包, 它以一个整体被加载使用.

Unix 命令也可以运行, 例如: ls 是别名, 而不是 Unix 移植过来的 

​     get-ChildItems

自定义别名:new-Alias 


```ps1
> new-alias // 取新的别名
> Name: testalias // 重新取名字
> get-disk  // 别名对应的命令
```

修改执行策略:

Set-ExecutionPolicy -ExecutionPolicy Unrestricted

也可以将 Unrestricted,  会提示: 然后重试:
Unrestricted, RemoteSigned, AllSigned, Restricted, Default, Bypass, Undefined”



管道: 常用

```ps1
Get-Service BITS | Stop-Service // 开启又停止
get-service BIts // 可以看到服务停止了
```

适用范围

面向对象, 基于强大的 .net 类库

适用工具:

windows powershell ISE

powershell GUI  win7 适用, 不是微软开发的

visual studio 全面, 最贵

------

### 命令格式

> Get-Service -Name BITS

   CmdLet      

​              -Parameter 

​                    Actual Parameters

   动词+名词    参数   实参

**必选参数:** 

   除了 get 外, 其他的一般都有必选参数 [-Parameter]<Type>

**可选参数:** [-Parameter<Type>], 都在方括号里

**开关参数:** 一般不需要实参 [-Parameter]

> Get-Service -name 'bits'

> get-help Get-Service -Full

> Restart-Computer -WhatIf 
>
> // 告诉计算机要做什么, 但是 whatif 表示不是真的区执行

# 常用命令介绍

### 安装/卸载角色/功能

### 选择属性

gm get-member

### 筛选

### 格式化输出

### 操作符

### 与VMI交互

# 变量

声明变量

$var 

$var = '1'

$var = '1', '2', '3'

输出变量

write-host $var

$var

$var | Get-Member // 查看变量及变量对象上的方法

调用属性

$var.count



# 路径

知道相对路径, 获取绝对路口

> Resolve-Path .\shell脚本.md

> Resolve-Path .\初体验  // 文件夹路径

set-locatin(cd)

set-location f: // 设置 f: 盘

Set-Location \working // 设置当前盘符下 f:\working

cd F:\working\study\typescript\shell脚本 

> // 返回当前 .. 路径下的上一个文件夹下的lerna多包管理
>
> cd ..\lerna多包管理 

# 读写文件
读取文件
>  get-content .\shell脚本.md -Encoding UTF8

写入文件

> set-content -value '要写入的值' -path .\temp\test.txt -Encoding UTF8 // 需要有temp这个目录

> mkdir test 
>
> set-content -value '要写入的值' -path .\temp\test.txt -Encoding UTF8  

>  new-item -Name test  -ItemType Directory // 创建一个 test 文件目录
>
> new-item -Name test  -ItemType File// 创建一个 test 文件

























