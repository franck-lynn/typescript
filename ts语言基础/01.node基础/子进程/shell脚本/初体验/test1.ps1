# https://www.zhihu.com/question/318656467/answer/1808063880
$OutputEncoding = [System.Text.Encoding]::GetEncoding("utf-8")

$OutputEncoding
$date = Get-Date

Write-Output $date 