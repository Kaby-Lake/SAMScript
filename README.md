# SAMScript

一段可以更改 UNNC SAMS 网页出校时间的脚本，如果之前输入过会一直显示之前的输入（不会出现弹窗），点击右上角个人头像后点击出现的 `dropdown` 里的大头像可以清除之前的输入 `localStorage`，匹配网址为 https://sams.nottingham.edu.cn/zh/Students/stuaskforleave/* 和 https://sams.nottingham.edu.cn/zh/students/stuaskforleave/index

### 原理

检测浏览器`localStorage`里是否设置过`sams-crack`并 prase

### 使用方法

#### iOS

下载 UserScripts 并在 Safari 开启扩展权限, 并将此脚本放入 Files 中的 Scripts 目录下，再在 UserScripts 中选择该 Script 文件夹。

#### Android

下载支持油猴 Tampermonkey 插件的浏览器如 Kiwi，安装油猴 Tampermonkey 插件后载入文件
