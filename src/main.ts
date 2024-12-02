import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { CozeAPI, COZE_CN_BASE_URL } from '@coze/api';
import hljs from 'highlight.js' //导入代码高亮文件
import 'highlight.js/styles/monokai-sublime.css'  //导入代码高亮样式
import CozeConfig from './CozeClientConfig.json'

const client = new CozeAPI({
    token: CozeConfig.token,
    allowPersonalAccessTokenInBrowser: true,
    baseURL: COZE_CN_BASE_URL,
});

const app = createApp(App);
app.directive('highlight', function (el) {
    const blocks = el.querySelectorAll('pre');
    blocks.forEach((block: any) => {
        hljs.highlightBlock(block);
        block.classList.add('hljs'); // 添加hljs类名，以便样式控制
        // 创建复制按钮
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.style.backgroundColor = '#f0f0f0'; // 设置背景色
        button.style.border = '2px solid #ccc'; // 设置边框
        button.style.borderRadius = '4px'; // 设置圆角
        button.style.padding = '5px 10px'; // 设置内边距
        button.style.cursor = 'pointer'; // 设置鼠标指针样式
        button.style.marginLeft = '10px'; // 设置左边距
        button.textContent = '复制';
        button.addEventListener('click', () => {
            const text = block.textContent;
            navigator.clipboard.writeText(text).then(() => {
                console.log('已复制到剪贴板');
            }).catch((err) => {
                console.error('复制失败', err);
            });
        });

        // 将按钮添加到代码块容器中
        const pre = block.parentElement;
        pre.appendChild(button);
    });
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.config.globalProperties.$cozeClient = client;



app.mount('#app');