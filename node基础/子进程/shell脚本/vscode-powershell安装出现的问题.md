### 安装

扩展搜索 powershell 并安装

https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell

### PowerShell 下载

https://github.com/PowerShell/PowerShell

下载二进制版本:

You can also download the PowerShell binary archives for Windows, macOS and Linux.

https://github.com/PowerShell/PowerShell/releases/download/v7.1.3/PowerShell-7.1.3-win-x64.zip

好像没有用到这个版本

C:\Users\lynn\AppData\Roaming\Code\User\settings.json 文件中设置

```json
// "powershell.powerShellAdditionalExePaths": [
//         {
//             "exePath": "D:\\Program Files\\eclipse\\PowerShell\\pwsh.exe",
//             "versionName": "Downloaded PowerShell"
//         }
//     ],
//  "powershell.powerShellDefaultVersion": "Windows PowerShell (x64)"
 // 后又修改如下: 
 "powershell.powerShellAdditionalExePaths": [
        {
            "exePath": "D:\\Program Files\\eclipse\\PowerShell\\pwsh.exe",
            "versionName": "Downloaded PowerShell"
        }
    ],
    // "powershell.powerShellDefaultVersion": "Windows PowerShell (x64)",
    // "terminal.integrated.profiles.windows": {
    //     "PowerShell": {
    //         "path": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
    //     }
    // },
    "terminal.integrated.shell.windows": "D:\\Program Files\\eclipse\\PowerShell\\pwsh.exe"
```

工作区json设置:

```json
// 增加对PowerShell的支持，比如字符集、智能感知等
    // 在 C:\Users\lynn\AppData\Roaming\Code\User\settings.json 文件中
    // 加入下面的 powershell.powerShellAdditionalExePaths 才起作用
    // https://github.com/PowerShell/PowerShell 
    // You can also download the PowerShell binary archives for Windows, macOS and Linux.
    // 下载 二进制 文件, 解压, 设置执行路径
    // "powershell.powerShellAdditionalExePaths": [
    //     {
    //         "exePath": "D:\\Program Files\\eclipse\\PowerShell\\pwsh.exe",
    //         "versionName": "Downloaded PowerShell"
    //     }
    // ],
"[powershell]": {
        "editor.renderWhitespace": "all",
        "editor.renderControlCharacters": true,
        "files.trimTrailingWhitespace": true,
        "files.encoding": "utf8bom",
        "files.autoGuessEncoding": true
    }
```



### 反复提示更新解决:

https://github.com/PowerShell/vscode-powershell/issues/2824

好的。终于找到了解决方案。这个包装管理问题一直让我发疯。每次打开VScode时都会看到它，并且在需要安装新模块或软件包时会看到错误。可能有一种更简单的方法，但是这是我解决的方法，因为所有建议的安装命令都会对我造成错误。

模块路径
C:\Program Files (x86)\WindowsPowerShell\Modules
C:\Program Files\WindowsPowerShell\Modules
C:\Program Files (x86)\WindowsPowerShell\Modules

**powershellgallery 路径**
https://www.powershellgallery.com/packages/PackageManagement/
https://www.powershellgallery.com/packages/PowerShellGet/

步骤1）访问每个模块路径。
步骤2）删除 PowerShellGet ＆ PackageManagement 两个文件夹
（注：我把一切副本之前，我删除，因为我是偏执狂，和副本需要存储上面的模块文件夹的水平或其他地方干脆，只是没有在模块文件夹）
步骤3）访问 **powershellgallery 路径**
步骤4）手动下载-> 下载 RAW NUPKG 文件
步骤5）将扩展名重命名为 **ZIP** 示例：将powershellget.2.2.1.nupkg重命名为powershellget.2.2.1.zip
步骤6）解压缩
步骤7）复制解压缩的文件夹到 C:\Program Files (x86)\WindowsPowerShell\Modules
步骤8）从两个文件夹名称中删除版本号。仅保留powershellget和包管理
步骤9）以管理员身份打开VScode
步骤10）享受Vscode从未抱怨过软件包管理和无问题的模块/软件包安装经验



备份文件在: G:\soft\p_webstrom\powershell包备份, 解压后不带版本号, 复制就好 

### 直接 run code 输出控制台乱码

控制面板\时钟和区域 -> 区域 -> 更改区域设置 -> Beta版: 使用 UTF-8...