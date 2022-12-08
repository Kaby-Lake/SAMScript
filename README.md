# SAMScript

一段可以更改 UNNC SAMS 网页出校时间的脚本，仅作用与 请假列表 和 请假详情 页面。如果之前有过更改会一直显示之前的更改。点击右上角个人头像后点击出现的 `dropdown` 里的大头像可以清除之前输入的缓存。

### 原理

检测浏览器`localStorage`里是否设置过`sams-crack`并 prase
匹配网址为 https://sams.nottingham.edu.cn/zh/Students/stuaskforleave 和 https://sams.nottingham.edu.cn/zh/students/stuaskforleave/* (如果是用appgateway登录则为 https://appgateway.nottingham.edu.cn/*/*/zh/Students/stuaskforleave )


### 使用方法

#### iOS

- 在Files中创建一个 Scripts 文件夹
- 将 `sams.js` 文件放入该文件夹
- 下载 UserScripts 并在 Safari 开启扩展权限（允许作用与所有页面）
- 登录SAMS的请假列表页面，插件应该就可以用了


#### Android

下载支持油猴 Tampermonkey 插件的浏览器如 Kiwi，安装油猴 Tampermonkey 插件后载入文件
