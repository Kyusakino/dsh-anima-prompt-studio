# Anima 提示词工作台

适用于 DSH Web 的提示词编辑插件。提供 Anima 预设、标签和画师补全、权重编辑、语法高亮与正负向实时预览。

## 安装

1. 将本仓库克隆到本机。
2. 在 DSH Web 打开「插件」安装界面，输入克隆目录的绝对路径。
3. 安装完成后启用插件，刷新页面，在左侧栏打开「Anima 提示词工作台」。

## 使用

- 选择预设，在编辑区输入标签。输入 @ 可查找内置的画师标签。
- 按方向键选择补全项，按 Enter 或 Tab 插入，按 Esc 关闭。
- 可在预览区复制正向或负向提示词，例如分别粘贴到 ComfyUI 的 CLIPTextEncode 节点。
- 工作台支持自检、快照，以及 TXT、JSON 和 shotlist v2 片段导出。草稿和快照保存在当前浏览器的本地存储中。

## 开发

插件无需构建。修改 client.js 后运行 node --check client.js，并刷新 DSH Web。

画师补全包含来自 [Anima 2B Style Explorer](https://github.com/ThetaCursed/Anima-Style-Explorer) 的标签。许可见 [第三方声明](THIRD_PARTY_NOTICES.md)。

## 许可

插件采用 [MIT 许可证](LICENSE)。内置画师标签的版权和许可信息见 [第三方声明](THIRD_PARTY_NOTICES.md)。
