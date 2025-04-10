![](/posts/files/Pasted%20image%2020250409200256.png)

[[posts/learn-c/codewars/codewars-e4|codewars-e4]]
![left|520](/posts/files/Pasted%20image%2020250409201301.png)

![](/posts/files/Pasted%20image%2020250409201049.png)

```js
// ==UserScript==
// @name         Codewars题目汉化工具（Vue路由优化版）
// @namespace    http://tampermonkey.net/
// @version      1.3.2
// @description  专为Vue路由优化的Codewars题目汉化工具，支持中英对照和智能路由监听
// @author       Cerry2025
// @match        https://*.codewars.com/kata/*
// @grant        GM_xmlhttpRequest
// @connect      open.bigmodel.cn
// @connect      generativelanguage.googleapis.com
// ==/UserScript==

(function() {
    'use strict';

    // 配置参数
    const CONFIG = {
        API_KEY: 'AIzaSyCgaqTsQ1pwyHyztdVEOm8rUH8ZHWWmO8Q',
        TARGET_SELECTOR: '#description',
        LOADING_TEXT: 'Loading description...',
        TRANSLATE_DELAY: 0,
        STORAGE_KEY: 'codewars_translate_mode',
        MAX_ROUTER_RETRY: 50,
        ROUTER_CHECK_INTERVAL: 100
    };

    // 样式注入
    const addStyles = () => {
        const startTime = performance.now();
        const style = document.createElement('style');
        style.textContent = `
            /* --- 双语容器样式 --- */

            /* 双语模式下容器本身的样式 (可选) */
            .bilingual-container {
                /* 可以添加边框或背景来视觉上分组 */
                /* border: 1px solid #e0e0e0; */
                /* background-color: #f9f9f9; */
                /* 如果希望在内层 div 周围有空间，可以添加 padding */
                /* padding: 10px; */
            }

            /* 原始文本块样式 */
            .bilingual-container > .original-text {
                opacity: 0.75; /* 使原始文本稍微不那么突出 */
                font-size: 0.95em; /* 字体稍小 */
                line-height: 1.5; /* 保证良好的可读性 */
                margin-bottom: 0; /* 重置 margin，依赖 hr 分隔 */
                /* 注意：这里没有边框 */
            }

            /* 脚本添加的分隔线样式 */
            .bilingual-container > hr.translation-separator {
                margin: 15px 0; /* 分隔线上下的垂直间距 */
                border: none; /* 移除默认边框 */
                border-top: 1px solid #eee; /* 使用虚线作为顶部边框 */
                height: 0;
            }

            /* 翻译后文本块样式 */
            .bilingual-container > .translated-text {
                border: 1px dashed #ccc; /* 为翻译后的文本块添加外虚线框 */
                padding: 5px; /* 在虚线框内部添加内边距，防止文字紧贴边框 */
                line-height: 1.6; /* 行高可以适当调整 */
                margin-top: 0; /* 重置 margin，依赖 hr 分隔 */
            }

            /* "Original:" 和 "Translated:" 标签样式 */
            .bilingual-container > .original-text > strong,
            .bilingual-container > .translated-text > strong {
                display: block; /* 让标签单独占一行 */
                margin-bottom: 0px; /* 标签下方的间距 */
                font-size: 0.8em;   /* 标签字体更小 */
                color: #777;       /* 标签使用灰色 */
                text-transform: uppercase; /* 标签大写 */
                font-weight: bold;
            }


            /* --- 双语容器内的代码块样式 --- */

            /* 针对 <pre> 标签本身设置背景、边框和间距 */
            .bilingual-container pre {
                background-color: #f0f0f0; /* 稍暗的背景以示区分 */
                border: 1px solid #e0e0e0; /* 细边框 */
                border-radius: 4px; /* 圆角 */
                padding: 0; /* 重置内边距，在 code 标签上应用 */
                margin-top: 1em; /* 上边距 */
                margin-bottom: 1em; /* 下边距 */
                overflow: hidden; /* 在 code 滚动前隐藏溢出 */
            }

            /* 针对 <pre> 内部的 <code> 标签设置代码样式 */
            .bilingual-container pre code {
                display: block;       /* 确保是块级元素 */
                white-space: pre;     /* 保留空白符和换行 */
                overflow-x: auto;   /* 需要时添加水平滚动条 */
                padding: 10px 12px;   /* 代码块内部的填充 */
                font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; /* 标准等宽字体 */
                font-size: 0.9em;     /* 代码字体稍小 */
                color: #333;          /* 代码深色文字 */
                background: none;     /* 继承 pre 的背景或透明 */
                border: none;         /* code 标签本身无边框 */
                border-radius: 0;     /* code 标签本身无圆角 */
            }


            /* --- 其他工具样式 (保持不变) --- */

            /* 头部切换按钮的样式 */
            .header-toggle {
                margin-left: auto;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            /* 翻译错误信息的样式 */
            .translation-error {
                color: #f44336 !important; /* 错误使用红色 */
                font-weight: bold;
                border: 1px solid #f44336; /* 红色边框 */
                padding: 8px 10px; /* 内边距 */
                margin: 10px 0;    /* 外边距 */
                border-radius: 4px; /* 圆角 */
                background-color: #ffebee; /* 淡红色背景 */
                display: block; /* 确保占用空间 */
            }
        `;
        document.head.appendChild(style);
        const endTime = performance.now();
        console.log(`addStyles 执行时间: ${endTime - startTime} ms`);
    };

    // 控制面板开关
    const addHeaderSwitch = () => {
        const startTime = performance.now();
        const headerContainer = document.querySelector('.mb-2.border-0.overflow-hidden.flex.items-center.justify-start');
        if (!headerContainer || headerContainer.querySelector('.header-toggle')) return;

        const toggleHTML = `
            <div class="header-toggle">
                <input type="checkbox" id="bilingualToggleHeader">
                <label for="bilingualToggleHeader">中英对照模式</label>
            </div>
        `;
        headerContainer.insertAdjacentHTML('beforeend', toggleHTML);

        const toggle = headerContainer.querySelector('#bilingualToggleHeader');
        toggle.checked = localStorage.getItem(CONFIG.STORAGE_KEY) === 'bilingual';
        toggle.addEventListener('change', () => {
            localStorage.setItem(CONFIG.STORAGE_KEY, toggle.checked ? 'bilingual' : 'replace');
            location.reload();
        });
        const endTime = performance.now();
        console.log(`addHeaderSwitch 执行时间: ${endTime - startTime} ms`);
    };

    // Vue路由监听核心
    const setupRouterListener = () => {
        const startTime = performance.now();
        let lastPath = location.pathname;
        let routerCheckAttempts = 0;
        let routerFound = false; // 添加一个标志，表示是否找到router

        const findVueRouter = () => {
            const appElement = document.querySelector('#app');
            if (appElement?._vue__?.$router) return appElement._vue__.$router;
            if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__?.Vue?.apps?.[0]?.$router) {
                return window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue.apps[0].$router;
            }
            return null;
        };

        const handleRouteChange = () => {
            const handleRouteChangeStartTime = performance.now();
            if (location.pathname === lastPath) return;
            lastPath = location.pathname;
            resetTranslationState();
            initTranslationObserver();
            const handleRouteChangeEndTime = performance.now();
            console.log(`handleRouteChange 执行时间: ${handleRouteChangeEndTime - handleRouteChangeStartTime} ms`);
        };

        const routerCheckInterval = setInterval(() => {
            if (routerFound) { // 如果已经找到router，则停止interval
                clearInterval(routerCheckInterval);
                return;
            }

            if (routerCheckAttempts++ > CONFIG.MAX_ROUTER_RETRY) {
                clearInterval(routerCheckInterval);
                return;
            }

            const router = findVueRouter();
            if (router) {
                routerFound = true; // 设置标志
                clearInterval(routerCheckInterval);
                router.afterEach(handleRouteChange);
            }

        }, CONFIG.ROUTER_CHECK_INTERVAL);

        const endTime = performance.now();
        console.log(`setupRouterListener 执行时间: ${endTime - startTime} ms`);
    };

    // 状态重置
    const resetTranslationState = () => {
        const startTime = performance.now();
        document.querySelectorAll(CONFIG.TARGET_SELECTOR).forEach(el => {
            el._translation_processed = false;
            el.removeAttribute('data-translated');
        });
        const endTime = performance.now();
        console.log(`resetTranslationState 执行时间: ${endTime - startTime} ms`);
    };

    // 在processContent函数中处理图片占位符
    const processContent = async (element) => {
        const startTime = performance.now();
        if (element._translation_processed) return;

        const checkLoadingState = () => element.textContent.includes(CONFIG.LOADING_TEXT);
        if (checkLoadingState()) {
            const loadingObserver = new MutationObserver((_, obs) => {
                if (!checkLoadingState()) {
                    obs.disconnect();
                    processContent(element);
                }
            });
            loadingObserver.observe(element, { childList: true, subtree: true });
            return;
        }

        element._translation_processed = true;
        let originalHTML = element.innerHTML;

        // 新增：提取图片并创建占位符
        const { cleanedHTML, imgPlaceholders } = extractImages(originalHTML);
        const tipElement = createTranslationTip('正在翻译...');
        element.prepend(tipElement);

        try {
            const translatedHTML = await translateContent(cleanedHTML);  // 使用清理过的HTML翻译
            applyTranslation(element, originalHTML, restoreImages(translatedHTML, imgPlaceholders), imgPlaceholders);
        } catch (error) {
            tipElement.textContent = '翻译失败，请刷新重试';
            tipElement.classList.add('translation-error');
            console.error('翻译错误:', error);
        }
        const endTime = performance.now();
        console.log(`processContent 执行时间: ${endTime - startTime} ms`);
    };

    // 新增：图片处理工具函数
    const extractImages = (html) => {
        const startTime = performance.now();
        const imgRegex = /<img\b[^>]*>/g;
        const imgPlaceholders = [];
        let index = 0;

        const cleanedHTML = html.replace(imgRegex, (match) => {
            imgPlaceholders.push(match);
            return `<!-- IMG_PLACEHOLDER_${index++} -->`;
        });

        const endTime = performance.now();
        console.log(`extractImages 执行时间: ${endTime - startTime} ms`);
        return { cleanedHTML, imgPlaceholders };
    };

    const restoreImages = (translatedHTML, imgPlaceholders) => {
        const startTime = performance.now();
        const restoredHTML = translatedHTML.replace(/<!-- IMG_PLACEHOLDER_(\d+) -->/g, (_, index) => {
            return imgPlaceholders[parseInt(index)] || '';
        });
        const endTime = performance.now();
        console.log(`restoreImages 执行时间: ${endTime - startTime} ms`);
        return restoredHTML;
    };

// 修改后的 applyTranslation 函数 (方法1 - 更新 innerHTML)
    const applyTranslation = (element, originalHTML, translated, imgPlaceholders) => {
        const startTime = performance.now();
        const isBilingual = localStorage.getItem(CONFIG.STORAGE_KEY) === 'bilingual'; // 检查双语模式

        // 1. 清理从 API 返回的原始翻译文本
        const cleanTranslation = translated
            .replace(/\\"/g, '"')      // 处理转义引号
            .replace(/^"|"$/g, '')    // 移除首尾可能存在的引号
            .replace(/\\n/g, '\n')    // 处理转义换行符
            .replace(/^```html|```$/g, ''); // 移除可能的Markdown代码块标记

        // --- 开始修改 ---

        // 移除之前可能添加的双语样式类，以防模式切换
        element.classList.remove('bilingual-container');
        // 尝试移除之前双语模式下添加的内部 div，避免重复添加
        const oldOriginal = element.querySelector('.original-text');
        const oldTranslated = element.querySelector('.translated-text');
        const oldSeparator = element.querySelector('hr.translation-separator'); // 假设分隔符有特定类
        if (oldOriginal) oldOriginal.remove();
        if (oldTranslated) oldTranslated.remove();
        if (oldSeparator) oldSeparator.remove();


        // 2. 根据是否为双语模式，更新元素的 innerHTML
        if (isBilingual) {
            element.classList.add('bilingual-container');
            element.innerHTML = `
                <div class="original-text">
                  <strong>Original:</strong><br>
                  ${originalHTML}
                </div>
                <hr class="translation-separator" >
                <div class="translated-text">
                   <strong>Translated:</strong><br>
                   ${cleanTranslation}
                </div>
            `;
        } else {
            // 非双语模式:
            // 直接用清理后的翻译内容替换元素的 innerHTML
            element.innerHTML = cleanTranslation;
        }
        // 3. 在原始元素上标记为已翻译 (这步很重要，确保不会重复翻译)
        element.setAttribute('data-translated', 'true');
        const endTime = performance.now();
        console.log(`applyTranslation 执行时间: ${endTime - startTime} ms for element:`, element.id || element.tagName + '.' + element.className.split(' ')[0]);
    };


    // 翻译功能（增加响应校验）
    const translateContent = (html) => {
        return new Promise((resolve, reject) => {
            const requestStartTime = new Date();
            console.log(`[${requestStartTime.toISOString()}] 开始翻译请求`);
            console.log(`[${requestStartTime.toISOString()}] 发送的请求内容:`, {
                prompt: [{
                    role: "user",
                    content: `专业翻译编程题目...` // 简略显示，避免日志过长
                }],
                temperature: 0.2
            });
            console.log(`[${requestStartTime.toISOString()}] 原始HTML内容长度:`, html.length);

            GM_xmlhttpRequest({
                method: 'POST',
                url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + CONFIG.API_KEY,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `仅翻译标签内的文本内容，保留富文本格式，严格保留原始HTML结构和注释标记。遇到注释请原样保留，不要修改或翻译：\n\n${html}`
                        }]
                    }]
                }),
                responseType: 'json',
                onload: (res) => {
                    const responseTime = new Date();
                    const duration = responseTime - requestStartTime;
                    console.log(`[${responseTime.toISOString()}] 收到响应 (耗时: ${duration}ms)`);
                    console.log(`[${responseTime.toISOString()}] 响应状态码:`, res.status);

                    if (res.status === 200) {
                        console.log(`[${responseTime.toISOString()}] 完整响应内容:`, res.response);

                        if (res.response.candidates?.[0]?.content?.parts?.[0]?.text) {
                            console.log(`[${responseTime.toISOString()}] 翻译成功，返回翻译后内容`);
                            console.log(`[${responseTime.toISOString()}] 翻译后内容长度:`, res.response.candidates[0].content.parts[0].text.length);
                            resolve(res.response.candidates[0].content.parts[0].text);
                        } else {
                            const errorMsg = `API返回数据格式错误，缺少有效内容`;
                            console.error(`[${responseTime.toISOString()}] ${errorMsg}`, res.response);
                            reject(errorMsg);
                        }
                    } else {
                        const errorMsg = `API错误: ${res.status}`;
                        console.error(`[${responseTime.toISOString()}] ${errorMsg}`, res);
                        reject(errorMsg);
                    }
                },
                onerror: (err) => {
                    const errorTime = new Date();
                    const duration = errorTime - requestStartTime;
                    console.error(`[${errorTime.toISOString()}] 请求失败 (耗时: ${duration}ms)`, err);
                    reject(err);
                },
                ontimeout: () => {
                    const errorTime = new Date();
                    const duration = errorTime - requestStartTime;
                    console.error(`[${errorTime.toISOString()}] 请求超时 (耗时: ${duration}ms)`);
                    reject('Request timeout');
                }
            });
        });
    };

    // DOM观察器（优化节点替换逻辑）
    const initTranslationObserver = () => {
        const startTime = performance.now();
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.matches(CONFIG.TARGET_SELECTOR)) {
                        processContent(node);
                    }
                });

                if (mutation.type === 'characterData' || mutation.type === 'childList') {
                    document.querySelectorAll(CONFIG.TARGET_SELECTOR).forEach(el => {
                        if (!el._translation_processed) processContent(el);
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });

        document.querySelectorAll(CONFIG.TARGET_SELECTOR).forEach(processContent);
         const endTime = performance.now();
        console.log(`initTranslationObserver 执行时间: ${endTime - startTime} ms`);
    };

    // 辅助函数
    const createTranslationTip = (text) => {
        const tip = document.createElement('div');
        tip.className = 'translation-tip';
        tip.innerHTML = `<span>🔄 ${text}</span>`;
        return tip;
    };

    // 初始化
    const initialize = () => {
        addStyles();
        addHeaderSwitch();
        setupRouterListener();
        setTimeout(initTranslationObserver, CONFIG.TRANSLATE_DELAY);
    };

    initialize();
})();
```
