 ![[/posts/files/Pasted image 20250409200256.png]]

[[posts/learn-c/codewars/codewars-e4|codewars-e4]]
![left|520](/posts/files/Pasted%20image%2020250409201301.png)

![](/posts/files/Pasted%20image%2020250409201049.png)

```js
// ==UserScript==
// @name         Codewars 题目汉化工具（Reload on Route Change）
// @namespace    http://tampermonkey.net/
// @version      1.5.0_reload
// @description  Codewars 题目汉化工具，支持中英对照、用户 API Key，并在 Kata 切换时自动刷新页面。
// @author       Cerry2025 & AI Assistant & User Request
// @match        https://*.codewars.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @connect      generativelanguage.googleapis.com
// ==/UserScript==

(function() {
    'use strict';

    // 配置
    const CONFIG = {
        TARGET_SELECTOR: '#description',             // 题目描述选择器
        LOADING_TEXT: 'Loading description...',      // 加载中文本
        TRANSLATE_DELAY: 350,                        // 翻译延迟（毫秒）
        STORAGE_KEY_MODE: 'codewars_translate_mode', // 翻译模式存储键
        STORAGE_KEY_APIKEY: 'codewars_gemini_apikey',// API Key 存储键
        ROUTE_CHECK_INTERVAL: 500,                   // 路由检查间隔（毫秒）
        API_ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', // Gemini API 端点
        TRANSLATION_STATE_ATTR: 'data-translation-state' // 翻译状态属性
    };

    // API Key 管理

    /**
     * 获取 API Key。
     * 如果未设置，则提示用户输入并存储。
     * @returns {string|null} API Key 或 null（如果未设置）
     */
    function getApiKey() {
        let apiKey = GM_getValue(CONFIG.STORAGE_KEY_APIKEY, null);
        if (!apiKey || apiKey.trim() === '') {
            apiKey = prompt('请输入您的 Google AI Gemini API 密钥以启用翻译功能。\n（您可以在 Google AI Studio 免费获取）');
            if (apiKey && apiKey.trim() !== '') {
                apiKey = apiKey.trim();
                GM_setValue(CONFIG.STORAGE_KEY_APIKEY, apiKey);
                alert('API 密钥已保存。');
                return apiKey;
            } else {
                alert('未提供有效的 API 密钥。翻译功能将无法使用。\n您可以通过油猴菜单 "设置/更新 API 密钥" 来设置。');
                return null;
            }
        }
        return apiKey;
    }

    // 注册油猴菜单命令，用于设置或更新 API Key
    GM_registerMenuCommand('设置/更新 API 密钥', () => {
        const currentKey = GM_getValue(CONFIG.STORAGE_KEY_APIKEY, '');
        const newKey = prompt('请输入或更新您的 Google AI Gemini API 密钥:', currentKey);
        if (newKey !== null) {
            const trimmedKey = newKey.trim();
            GM_setValue(CONFIG.STORAGE_KEY_APIKEY, trimmedKey);
            alert(trimmedKey ? 'API 密钥已更新！请刷新页面或导航到新题目以生效。' : 'API 密钥已清除。');
        } else {
            alert('操作已取消。');
        }
    });

    // 样式与 UI

    /**
     * 注入 CSS 样式。
     */
    function addStyles() {
        const style = document.createElement('style');
        style.id = 'codewars-translator-styles';
        style.textContent = `
            .bilingual-container .original-text { opacity: 0.75; font-size: 0.95em; line-height: 1.3; margin-bottom: 0; }
            .bilingual-container hr.translation-separator { margin: 15px 0; border: none; border-top: 1px solid #eee; }
            .bilingual-container .translated-text { border: 1px dashed #ccc; padding: 5px; line-height: 1.3; margin-top: 0; }
            .bilingual-container .original-text strong,
            .bilingual-container .translated-text strong { display: block; margin-bottom: 0px; font-size: 0.8em; color: #777; text-transform: uppercase; font-weight: bold; }
            .header-toggle { margin-left: auto; display: flex; align-items: center; gap: 6px; cursor: pointer; padding-right: 10px; }
            .translation-status-tip { padding: 5px 0; margin-bottom: 10px; display: block; font-size: 0.9em; }
            .translation-status-tip.tip { color: #666; font-style: italic; border-bottom: 1px dashed #eee; }
            .translation-status-tip.error { color: #f44336; font-weight: bold; border: 1px solid #f44336; padding: 8px 10px; background-color: #ffebee; border-radius: 4px; margin: 10px 0; }
        `;
        if (!document.getElementById(style.id)) {
            document.head.appendChild(style);
        }
    }

    /**
     * 添加中英对照切换开关到页面头部。
     */
    function addHeaderSwitch() {
        const checkHeaderInterval = setInterval(() => {
            const headerContainer = document.querySelector('.flex.items-center.justify-start .bg-ui-section');
            const targetArea = headerContainer?.closest('.px-4.md\\:px-6');

            if (targetArea && !targetArea.querySelector('.header-toggle')) {
                clearInterval(checkHeaderInterval);

                const isBilingual = localStorage.getItem(CONFIG.STORAGE_KEY_MODE) === 'bilingual';
                const toggleDiv = document.createElement('div');
                toggleDiv.className = 'header-toggle';
                toggleDiv.innerHTML = `
                    <input type="checkbox" id="bilingualToggleHeader" style="cursor: pointer; margin-left: 10px;" ${isBilingual ? 'checked' : ''}>
                    <label for="bilingualToggleHeader" style="cursor: pointer; user-select: none;">中英对照</label>
                `;

                const referenceNode = targetArea.querySelector('button, a');
                if(referenceNode){
                    targetArea.insertBefore(toggleDiv, referenceNode);
                } else {
                     targetArea.appendChild(toggleDiv);
                }

                const toggle = toggleDiv.querySelector('#bilingualToggleHeader');
                toggle.addEventListener('change', () => {
                    localStorage.setItem(CONFIG.STORAGE_KEY_MODE, toggle.checked ? 'bilingual' : 'replace');
                    alert('模式已切换。刷新页面或导航到新题目以查看效果。');
                     location.reload();
                });
            }
        }, 300);

        setTimeout(() => clearInterval(checkHeaderInterval), 10000);
    }

    /**
     * 设置状态提示。
     * @param {HTMLElement} element 目标元素
     * @param {string} text 提示文本
     * @param {boolean} isError 是否为错误提示
     */
    function setStatusTip(element, text, isError = false) {
        removeStatusTip(element);
        const tipElement = document.createElement('div');
        tipElement.className = `translation-status-tip ${isError ? 'error' : 'tip'}`;
        tipElement.textContent = text;
        element.insertBefore(tipElement, element.firstChild);
    }

    /**
     * 移除状态提示。
     * @param {HTMLElement} element
     */
    function removeStatusTip(element) {
        const tipElement = element.querySelector(':scope > .translation-status-tip');
        if (tipElement) {
            tipElement.remove();
        }
    }

    // 路由变化检测（简化：页面刷新）
    const initialPath = location.pathname;

    function checkForRouteChange() {
        if (location.pathname !== initialPath && location.pathname.includes('/kata/')) {
            console.log(`Codewars Translator: Kata 切换，从 ${initialPath} 到 ${location.pathname}。 刷新页面。`);
            clearInterval(routeCheckInterval);
            location.reload();
        }
    }

    const routeCheckInterval = setInterval(checkForRouteChange, CONFIG.ROUTE_CHECK_INTERVAL);

    // 翻译核心逻辑

    /**
     * 检查元素是否包含加载文本。
     * @param {HTMLElement} element
     * @returns {boolean}
     */
    const isLoading = (element) => element.textContent.includes(CONFIG.LOADING_TEXT);

    /**
     * 等待内容加载完成。
     * @param {HTMLElement} element
     * @returns {Promise<void>}
     */
    function waitForContentReady(element) {
        return new Promise((resolve, reject) => {
            if (!isLoading(element)) return resolve();

            let resolved = false;
            const observer = new MutationObserver(() => {
                if (!isLoading(element)) {
                    if(resolved) return;
                    resolved = true;
                    observer.disconnect();
                    resolve();
                }
            });
            observer.observe(element, { childList: true, subtree: true, characterData: true });

             const timeoutId = setTimeout(() => {
                if (resolved) return;
                observer.disconnect();
                console.warn("waitForContentReady 超时。");
                resolve();
            }, 10000);

             const originalResolve = resolve;
             resolve = () => {
                 clearTimeout(timeoutId);
                 originalResolve();
             }
        });
    }


    /**
     * 处理单个元素：检查状态、加载、API Key，然后翻译。
     * @param {HTMLElement} element
     */
    async function processElement(element) {
        const currentState = element.getAttribute(CONFIG.TRANSLATION_STATE_ATTR);

        if (['processing', 'translated', 'error'].includes(currentState)) {
            return;
        }

        if (!element.textContent || element.textContent.trim() === '') {
             setTimeout(() => {
                if (!element.textContent || element.textContent.trim() === '') {
                    element.setAttribute(CONFIG.TRANSLATION_STATE_ATTR, 'empty');
                } else {
                     processElement(element);
                }
             }, 300);
            return;
        }

        if (isLoading(element)) {
            element.setAttribute(CONFIG.TRANSLATION_STATE_ATTR, 'loading');
            setStatusTip(element, '等待题目内容加载...');
            await waitForContentReady(element);
            removeStatusTip(element);
            if (!element.textContent || element.textContent.trim() === '') {
                element.setAttribute(CONFIG.TRANSLATION_STATE_ATTR, 'empty');
                return;
            }
            element.removeAttribute(CONFIG.TRANSLATION_STATE_ATTR);
        }

        const apiKey = getApiKey();
        if (!apiKey) {
            setStatusTip(element, '错误：未设置 API 密钥。请通过脚本菜单设置。', true);
            element.setAttribute(CONFIG.TRANSLATION_STATE_ATTR, 'error');
            return;
        }

        element.setAttribute(CONFIG.TRANSLATION_STATE_ATTR, 'processing');
        setStatusTip(element, '正在翻译 (使用 Gemini)...');

        if (!element.dataset.originalHtml) {
             element.dataset.originalHtml = element.innerHTML;
        }
        const originalHTML = element.dataset.originalHtml;

        try {
            const { cleanedHTML, placeholders } = extractPlaceholders(originalHTML);

            if (cleanedHTML.replace(/<!-- PLACEHOLDER_\d+ -->/g, '').trim() === '') {
                 removeStatusTip(element);
                 element.setAttribute(CONFIG.TRANSLATION_STATE_ATTR, 'translated');
                 element.innerHTML = originalHTML;
                 return;
            }

            const translatedHTMLRaw = await callTranslationAPI(cleanedHTML, apiKey);
            applyTranslation(element, originalHTML, translatedHTMLRaw, placeholders);

            removeStatusTip(element);
            element.setAttribute(CONFIG.TRANSLATION_STATE_ATTR, 'translated');

        } catch (error) {
            console.error('翻译错误:', error);
            setStatusTip(element, `翻译失败：${error.message || error}`, true);
            element.setAttribute(CONFIG.TRANSLATION_STATE_ATTR, 'error');
        }
    }

    /**
     * 提取 HTML 中的 img 和 pre/code 标签，替换为占位符。
     * @param {string} html
     * @returns {{cleanedHTML: string, placeholders: Array<string>}}
     */
    function extractPlaceholders(html) {
        const placeholders = [];
        let index = 0;
        const cleanedHTML = html.replace(/<(img|pre|code)\b[^>]*>.*?<\/\1>|<(img)\b[^>]*?\/?>(?!\s*<\/(img)>)/gis, (match) => {
            placeholders.push(match);
            return `<!-- PLACEHOLDER_${index++} -->`;
        });
        return { cleanedHTML, placeholders };
    }

    /**
     * 恢复占位符。
     * @param {string} translatedHTML
     * @param {Array<string>} placeholders
     * @returns {string}
     */
    function restorePlaceholders(translatedHTML, placeholders) {
        return translatedHTML.replace(/<!-- PLACEHOLDER_(\d+) -->/g, (_, indexStr) => {
            const index = parseInt(indexStr, 10);
            return placeholders[index] !== undefined ? placeholders[index] : `<!-- MISSING_PLACEHOLDER_${index} -->`;
        });
    }

    /**
     * 调用 Gemini API 翻译。
     * @param {string} htmlToTranslate - 清理后的 HTML
     * @param {string} apiKey
     * @returns {Promise<string>} 翻译后的 HTML
     */
    function callTranslationAPI(htmlToTranslate, apiKey) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'POST',
                url: `${CONFIG.API_ENDPOINT}?key=${apiKey}`,
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `将以下 HTML 片段中的可读文本内容翻译成 **简体中文**。
请严格保留所有原始 HTML 标签（例如 <img>、<pre>、<code>、<a>、<strong>、<em> 等），其属性、结构以及任何占位符（例如 <!-- PLACEHOLDER_0 -->）。
**不要翻译** <pre>...</pre> 或 <code>...</code> 标签内的内容。
仅翻译这些受保护元素之外的用户可见文本。确保输出是有效的 HTML。

输入 HTML:
\`\`\`html
${htmlToTranslate}
\`\`\`

翻译后的 HTML (简体中文):`
                        }]
                    }],
                     generationConfig: {
                    }
                }),
                responseType: 'json',
                timeout: 45000,
                onload: (res) => {
                    if (res.status === 200 && res.response) {
                        const candidate = res.response.candidates?.[0];
                        let text = candidate?.content?.parts?.[0]?.text;
                        const finishReason = candidate?.finishReason;
                        const blockReason = res.response.promptFeedback?.blockReason;

                        if (blockReason) {
                            return reject(new Error(`API 请求被阻止: ${blockReason}。检查内容安全设置或提示。`));
                        }
                        if (finishReason && finishReason !== "STOP" && finishReason !== "MAX_TOKENS") {
                             if(finishReason === "MAX_TOKENS"){
                                console.warn("翻译可能由于 MAX_TOKENS 限制而不完整。");
                             } else {
                                return reject(new Error(`API 完成原因问题: ${finishReason}。内容可能不安全或发生错误。`));
                             }
                        }
                        if (text) {
                            text = text.replace(/^```(?:html)?\s*|```$/gi, '').trim();
                            resolve(text);
                        } else if (finishReason === "STOP" && !text) {
                            console.warn("API 返回 STOP 但没有文本。假设没有可翻译内容。");
                            resolve("");
                        }
                        else {
                            console.error("API 响应详情:", JSON.stringify(res.response, null, 2));
                            reject(new Error('API 响应格式错误：在 candidate 部分中未找到有效的文本。'));
                        }
                    } else {
                        let errorMsg = `API 请求失败，状态码 ${res.status}`;
                        let errorDetails = '(无更多详细信息)';
                         try {
                             if (res.response && res.response.error) {
                                 errorDetails = res.response.error.message || JSON.stringify(res.response.error);
                             } else if (res.responseText) {
                                 try {
                                    const errJson = JSON.parse(res.responseText);
                                    errorDetails = errJson.error?.message || res.responseText;
                                 } catch(e) { errorDetails = res.responseText; }
                             }
                             if (errorDetails) errorMsg += `: ${errorDetails}`;
                             if (res.status === 400) errorMsg += " (Bad request - 检查 API key/请求格式)";
                             if (res.status === 403) errorMsg += " (Forbidden - 检查 API key 权限)";
                             if (res.status === 429) errorMsg += " (Rate limit exceeded)";
                             if (res.status >= 500) errorMsg += " (服务器端 API 错误)";
                         } catch (e) {
                             console.error("错误解析错误响应:", e);
                         }
                         reject(new Error(errorMsg));
                    }
                },
                onerror: (err) => reject(new Error(`翻译期间的网络错误: ${err.error || '未知网络问题'}`)),
                ontimeout: () => reject(new Error('翻译请求超时'))
            });
        });
    }

    /**
     * 应用翻译结果。
     * @param {HTMLElement} element 目标元素
     * @param {string} originalHTML 原始 HTML
     * @param {string} translatedRaw 翻译后的原始文本
     * @param {Array<string>} placeholders 占位符
     */
    function applyTranslation(element, originalHTML, translatedRaw, placeholders) {
        const isBilingual = localStorage.getItem(CONFIG.STORAGE_KEY_MODE) === 'bilingual';
        const cleanTranslation = translatedRaw
            .replace(/^```(?:html)?\s*|```$/gi, '')
            .trim();

        const translatedWithContent = restorePlaceholders(cleanTranslation, placeholders);

        element.innerHTML = '';
        element.classList.remove('bilingual-container');

        if (isBilingual) {
            element.classList.add('bilingual-container');
            element.innerHTML = `
                <div class="original-text">
                  <strong>原文:</strong>
                  <div>${originalHTML}</div>
                </div>
                <hr class="translation-separator">
                <div class="translated-text">
                   <strong>翻译:</strong>
                   <div>${translatedWithContent || '(翻译为空)'}</div>
                </div>
            `;
        } else {
            element.innerHTML = translatedWithContent || originalHTML;
        }
    }

    // 初始化

    /**
     * 脚本初始化。
     */
    function initialize() {
        console.log("Codewars Translator (Reload Version) 初始化...");
        addStyles();
        addHeaderSwitch();

        setTimeout(() => {
            const targetElement = document.querySelector(CONFIG.TARGET_SELECTOR);

            if (targetElement) {
                processElement(targetElement);
            } else {
                console.warn(`在延迟后未找到目标元素 "${CONFIG.TARGET_SELECTOR}"。`);
                 const fallbackObserver = new MutationObserver((mutations, obs) => {
                    const element = document.querySelector(CONFIG.TARGET_SELECTOR);
                     if (element) {
                        console.log("通过回退 MutationObserver 找到目标元素。");
                        processElement(element);
                        obs.disconnect();
                     }
                 });
                 fallbackObserver.observe(document.body, { childList: true, subtree: true });
                 setTimeout(() => fallbackObserver.disconnect(), 8000);
            }
        }, CONFIG.TRANSLATE_DELAY);

        console.log("Codewars Translator 初始化完成。 监控路由变化以进行页面刷新。");
    }

    // 启动脚本
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();
```
