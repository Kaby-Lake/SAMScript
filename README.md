# SAMScript

一段可以更改 UNNC SAMS 网页出校时间的脚本

![Node CI](https://github.com/ant-design/pro-components/workflows/Node%20CI/badge.svg)
[![Written in TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![GitHub Star](https://img.shields.io/github/stars/kaby-lake/SAMScript.svg?style=flat-square&label=Star&color=4285dd&logo=github)](https://github.com/Kaby-Lake/SAMScript)
[![](https://img.shields.io/static/v1?label=%20&message=GreasyFork&style=flat-square&labelColor=7B0000&color=960000&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=)](https://greasyfork.org/en/scripts/456384-samscript)
[![Latest Tag](https://badgen.net/github/tag/Kaby-Lake/SAMScript)](https://github.com/Kaby-Lake/SAMScript)

- 脚本仅作用与 请假列表 和 请假详情 页面。
- 如果之前有过更改出校时间，脚本会记住此前的输入，并且在之后保持显示之前的更改。点击右上角个人头像后点击出现的 `dropdown` 里的大头像可以清除之前输入的缓存。
- 请在出校当天进行输入，因为脚本接受输入的 开始和结束时间 是根据脚本执行当天来算。
- 如果周末出校，会自动将申请和审批时间提前到周五，但是没考虑特殊节假日。
- 因为作者基本不会5点以前出校，所以这个脚本在涉及5点以前出校时，申请和审批时间可能存在奇怪现象（如申请时间在出校时间之后）。这个时候请多试几次（指清除缓存再重新输入）直到看上去显示一个合理的时间。有时间修一下。

### 原理

检测浏览器`localStorage`里是否设置过`sams-crack`，有则读取之前设置过的时间，没有则让用户输入新的时间。会将计算后的时间覆盖在DOM元素上。


匹配网址为 https://sams.nottingham.edu.cn/zh/Students/stuaskforleave 和 https://sams.nottingham.edu.cn/zh/students/stuaskforleave/* (如果是用appgateway登录则为 https://appgateway.nottingham.edu.cn/*/*/zh/Students/stuaskforleave )


### 安装方法

#### 通过 Greasyfork 安装 （推荐）

- 下载 Stay-用户脚本扩展管理 并在 Safari 开启扩展权限（允许作用于所有页面 ![](https://imgbed.link/file/10496)
- 打开 https://greasyfork.org/en/scripts/456384-samscript ，点击 Install this script 按钮，点击下方 Tap to install ![](https://imgbed.link/file/10497) ![](https://imgbed.link/file/10498)
- 在 Stay 中开启 SAMScript 脚本的自动更新 ![](https://imgbed.link/file/10499)
- 登录SAMS的请假列表页面，插件应该就可以用了


#### 下载脚本文件安装

#### iOS

- 下载 Stay-用户脚本扩展管理 并在 Safari 开启扩展权限（允许作用于所有页面）
- 在 Stay 中导入 `/userscript/SAMScript.js`文件
- 登录SAMS的请假列表页面，插件应该就可以用了


#### Android

下载支持油猴 Tampermonkey 插件的浏览器如 Kiwi，安装油猴 Tampermonkey 插件后载入文件。因为我没有 Android 设备，所以步骤请自行参考iOS。

### MISC 
如果您有意见和建议，欢迎提 issue 一起讨论。如果您想一起开发一些新功能，也可以提交PR。

开发文档请参考 `DEVELOPMENT.md`，项目最初是纯 js ，后面改成了 TypeScript + Webpack，日期和时间相关能力是用的 Dayjs。
