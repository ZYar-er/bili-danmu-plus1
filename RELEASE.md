# Release v0.0.8

## 更改

- **新版直播 UI 适配** — 输入框、发送按钮、播放器容器改用新版选择器，同时保留旧版降级链
- **设置入口适配** — 新版 UI 挂到弹幕输入行左侧，全屏时自动隐藏，退出全屏恢复
- **图标主题跟随** — 设置图标颜色跟随输入框文字色，黑色/白色主题下都清晰可见
- **发送按钮查找修正** — 只在输入框所在容器内查找发送按钮，找不到就直接回车，避免全屏输入框配侧栏按钮
- **细节清理** — 复用 `getScope`、忽略 `.alma-snapshots` 目录

## 安装方法

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展。
2. 打开 [介绍页](https://zyar-er.github.io/bili-danmu-plus1/) 点击「安装脚本」。
3. Tampermonkey 自动弹出安装页，点击「安装」即可。

## 说明

- Release 产物包含最新构建的 `bili-danmu-plus1.user.js`。
- 脚本内置自动更新指向 latest release，Tampermonkey 会定期检查更新。
