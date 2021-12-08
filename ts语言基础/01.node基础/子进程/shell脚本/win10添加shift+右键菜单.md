### win10 添加 powershell_ise 管理员右键菜单

 [shift+rightClick 添加 PsIse](https://www.e-learn.cn/content/qita/2002759)

1. 管理员权限打开注册表编辑器

​     定位到: 计算机\HKEY_CLASSES_ROOT\Directory\Background\shell

2. 新建项:  PowershellAdminISE 
3. 在新建项内 新建字符串值:  Extended ，数值数据为空 

​     功能：使右键选项在平时不显示，在按下 Shift时才会显示

4. 新建字符串值: MUIVerb

​    功能：UI 嘛，界面啊，所以它就是为了让菜单中显示的是

​    “在此处打开管理员 Powershell ISE 窗口(A)”

5. 新建字符串值，命名为 NoWorkingDirectory，数值数据为空

​     功能：emmm，我也不是很清楚，在网上查也查不到。

​     “在此处打开 Powershell 窗口(S)”这条命令相关的注册表项里面有这个，

​     我也就加上了，估计是和这个项相关的命令在哪可以生效执行有关系。

6. 新建 DWORD(32位值)(D)，命名为: ShowBasedOnVelocityId ，

   数值数据为：基数十六进制(H)的 639bc8

7. 接下来新建命令项, 右击 PowershellAdminISE 项

   cmd.exe /s /k pushd "%V"&& C:\Windows\System32\WindowsPowerShell\v1.0\powershell_ise.exe

8. 如果设置图标: Icon 字符串值 powershell_ise.exe