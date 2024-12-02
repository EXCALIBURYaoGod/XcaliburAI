## 项目背景

当前大模型应用如火如荼，最常见的交互模式就是对话框模式，因此作为用户对话交互的核心，前端界面的开发显得尤为重要。这种模式下，出现了ChatGPT、Claude、Coze等常见LLM对话应用。

本次青训营的前端项目就是要求我们设计一个LLM对话框。本项目基于以上情景，借着青训营提供的宝贵机会进行了开发和探索，这个项目对我个人的技术成长追求也是一大帮助。项目还有很多功能和bug没有完善，后面我会一直维护它，也欢迎大家找我一起交流。

技术栈：Vue2、Coze API、Element-plus、Vite、hljs、markdown-it等

## 核心功能

### 1、组件能力

*   能够支持用户输入对话，且对话内容支持图片、pdf等多媒体格式

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/4a4c3aba74c348939ec6836642bd3213~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgRnBzTHVQaW5n:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNTA5OTQwOTMyNDI4MjUifQ%3D%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733735309&x-orig-sign=4rlUKWjpNnjCuj%2FsK%2Fm3FKDbcFs%3D)

*   能够显示大模型返回的执行结果，包括图片、markdown等格式内容

![img\_v3\_02h3\_e8315b24-e5eb-4c83-998a-d13d8d5dc3fg.jpg](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/03b0aff3f53240939c20e0a06f2143ef~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgRnBzTHVQaW5n:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNTA5OTQwOTMyNDI4MjUifQ%3D%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733735309&x-orig-sign=ccHbtKuROmKAt6KIcbGB7alzTTw%3D)

*   支持流式打印返回结果
*   支持代码高亮和复制

![img\_v3\_02gp\_bc08a742-c925-4f70-b7b3-6b3886a72e0g.jpg](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a5031ca8cb5e42e8805f511e1d1959bd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgRnBzTHVQaW5n:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNTA5OTQwOTMyNDI4MjUifQ%3D%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733735309&x-orig-sign=WlonnfLJDn0TnnpM51eSp%2FsPuBE%3D)

### 2、内联模式

*   支持表现为收缩状态的搜索框

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e0c0cc28b465434fa66e35666c3b3920~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgRnBzTHVQaW5n:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNTA5OTQwOTMyNDI4MjUifQ%3D%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733735309&x-orig-sign=6z6r42IRnbaMeOTpRx3U1Wawm28%3D)

*   支持表现为展开形态的聊天弹框

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/36dabe2da9414839b0bbab745b0b8301~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgRnBzTHVQaW5n:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNTA5OTQwOTMyNDI4MjUifQ%3D%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733735309&x-orig-sign=Kw7C%2FlzI5D1fCVUl2M8EdlRO%2Fwc%3D)

*   支持在聊天弹框内与LLM交互

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2edb451579544316b8862a2532940329~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgRnBzTHVQaW5n:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNTA5OTQwOTMyNDI4MjUifQ%3D%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733735309&x-orig-sign=8fDBTSUmEwEEXKFfW9FVrS8gWNg%3D)

### 3、对话框模式

与内联模式窗口的对话功能相同，组件应该布局在侧边栏处，以显示多个聊天会话。

![img_v3_02h6_05618317-9f41-4d45-aa6a-57917545080g](https://github.com/user-attachments/assets/972fd673-caff-476d-83f0-0103e51d890a)

## 项目安装
首先将项目克隆到本地
然后安装pnpm包管理器
```
npm install -g pnpm
```
然后执行
```
pnpm install
```
然后启动项目
```
pnpm run dev
```
## 实践技术特征

### 项目布局

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ad0f3dcd13194b989615e875c2c5c154~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgRnBzTHVQaW5n:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNTA5OTQwOTMyNDI4MjUifQ%3D%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733735309&x-orig-sign=TFcykfAN21foeNlET7TBLdY%2FdIA%3D)

### 1、Coze-js API的使用

<https://github.com/coze-dev/coze-js>

Coze-js基于axios将与Coze API相关的http请求和接收内容进行了接口封装，在使用中只需要调用相关JS的API即可。

### 2、Element-plus的使用

基于Element-plus中的el-upload组件实现了图片、文件上传功能

### 3、代码高亮

基于hljs实现

### 4、markdown格式图文展示

基于markdown-it将聊天信息渲染为html
### 5、localStorage存储会话信息
设计了chatwindowList数组存储会话信息，并保存到浏览器localStorage中，实现会话消息记录功能。

## TODO

1.  完善文档
2.  以提高用户体验为目的，完善相关操作按钮和美化样式。
3.  以提高开发效率为目的，完善开发工程化和技术工具引入。

## 最后

欢迎青训营的同学一起探讨前端技术、LLM对话框项目，有兴趣可以私信或者评论区留言。
