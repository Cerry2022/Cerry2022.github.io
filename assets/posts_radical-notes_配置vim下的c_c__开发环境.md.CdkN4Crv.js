import{_ as i,c as a,o as n,ag as l}from"./chunks/framework.DPDPlp3K.js";const d=JSON.parse('{"title":"配置vim下的c/C++开发环境","description":"vim下配置c/c++开发环境","frontmatter":{"date":"2024-10-09T00:00:00.000Z","title":"配置vim下的c/C++开发环境","category":"主题","tags":["#vim","#cpp"],"description":"vim下配置c/c++开发环境"},"headers":[],"relativePath":"posts/radical-notes/配置vim下的c_c++开发环境.md","filePath":"posts/radical-notes/配置vim下的c_c++开发环境.md"}'),p={name:"posts/radical-notes/配置vim下的c_c++开发环境.md"};function t(h,s,e,k,F,r){return n(),a("div",null,s[0]||(s[0]=[l(`<h2 id="vim-c-c-开发配置" tabindex="-1">Vim C/C++开发配置 <a class="header-anchor" href="#vim-c-c-开发配置" aria-label="Permalink to &quot;Vim C/C++开发配置&quot;">​</a></h2><h3 id="_1-基础准备" tabindex="-1">1.基础准备 <a class="header-anchor" href="#_1-基础准备" aria-label="Permalink to &quot;1.基础准备&quot;">​</a></h3><p>安装g++ <a href="https://so.csdn.net/so/search?q=gcc&amp;spm=1001.2101.3001.7020" target="_blank" rel="noreferrer">gcc</a> git cmake</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> g++</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gcc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1</span></span></code></pre></div><p>安装vim</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vim</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1</span></span></code></pre></div><h3 id="_2-安装vim插件管理工具vundle" tabindex="-1">2.安装Vim插件管理工具Vundle <a class="header-anchor" href="#_2-安装vim插件管理工具vundle" aria-label="Permalink to &quot;2.安装Vim插件管理工具Vundle&quot;">​</a></h3><p>Vundle让你可以非常轻松地安装、更新、搜索和清理插件</p><ol><li><p>按<code>ctrl + alt + T</code>打开 <code>Terminal</code><br> 进入到<code>~/.vim</code>文件夹中，如果没有则创建</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ cd </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/.vim/</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#如果无文件夹</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#mkdir .vim</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">123</span></span></code></pre></div></li><li><p>在<code>~/.vim</code>目录下创建一个bundle目录,下载Vundle.vim到~/.vim/bundle目录下</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/.vim$ mkdir bundle</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/.vim$ git clone https://github.com/gmarik/Vundle.vim.git </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/.vim/bundle/Vundle.vim</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">12</span></span></code></pre></div><p>如果无法下载，可以直接点击链接下载到该文件夹中。</p></li></ol><h3 id="_3-配置-vimrc" tabindex="-1">3.配置~/.vimrc <a class="header-anchor" href="#_3-配置-vimrc" aria-label="Permalink to &quot;3.配置~/.vimrc&quot;">​</a></h3><ol><li><p>在<code>~</code>下创建文件<code>.vimrc</code></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/$ vim .vimrc</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1</span></span></code></pre></div><p>将以下内容复制到 <code>.vimrc</code>中</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">filetype</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> off</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">syntax</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rtp+=~/.vim/bundle/Vundle.vim</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">call</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vundle#begin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Plugin</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;VundleVim/Vundle.vim&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Plugin</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;scrooloose/nerdtree&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">               &quot; 文件树</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Plugin &#39;Valloric/YouCompleteMe&#39;			 &quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 代码提示补全插件</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Plugin</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;sickill/vim-monokai&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">               &quot; monokai主题</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Plugin &#39;vim-airline/vim-airline&#39;           &quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 美化状态栏</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Plugin</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vim-airline/vim-airline-themes&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot; 设置ailine</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Plugin &#39;plasticboy/vim-markdown&#39;           &quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> markdown高亮</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Plugin</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;octol/vim-cpp-enhanced-highlight&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot; C++代码高亮</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Plugin &#39;mhinz/vim-signify&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Plugin &#39;dense-analysis/ale&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Plugin &#39;morhetz/gruvbox&#39;					 &quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 主题</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Plugin</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;luochen1990/rainbow&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">				&quot;rainbow parenthesis</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">call vundle#end()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;------------------------------------</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;-------------keyboard map-----------</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-----------------------------------</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">inoremap</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jj</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">es</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">c</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;-----------------------------------</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">让vimrc配置变更立即生效</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">autocmd BufWritePost $MYVIMRC source $MYVIMRC</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">colorscheme gruvbox</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set background=dark </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">filetype on</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set signcolumn=yes &quot;强制显示侧边栏，防止时有时无</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">syntax on </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set shiftwidth=4</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set tabstop=4</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">let g:ycm_clangd_binary_path=&#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">clangd</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set number</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;搜索忽略大小写</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set ignorecase</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;搜索逐字符高亮</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set hlsearch</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set incsearch</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot; 为C程序提供自动缩进</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set smartindent</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set cursorline &quot; 突出显示当前行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;光标遇到圆括号、方括号、大括号时，自动高亮对应的另一个圆括号、方括号和大括号&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set showmatch</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;括号自动匹配补全&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">inoremap ( ()&lt;Esc&gt;i</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">inoremap [ []&lt;Esc&gt;i</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">inoremap { {}&lt;Esc&gt;i</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">inoremap { {&lt;CR&gt;}&lt;Esc&gt;O</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot; C++的编译和运行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map &lt;F5&gt; :call CompileRunGpp()&lt;CR&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">func! CompileRunGpp()</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">exec &quot;w&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">exec &quot;!g++ % -o %&lt;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">exec &quot;! ./%&lt;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">endfunc</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;rainbow parenthesis</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">let g:rainbow_active = 1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot; 文件树的设置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nmap &lt;Leader&gt;&lt;Leader&gt; :NERDTreeToggle&lt;CR&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">let NERDTreeWinSize=32</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot; 设置NERDTree子窗口宽度</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">let NERDTreeWinPos=&quot;left&quot;      &quot; 设置NERDTree子窗口位置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">let NERDTreeShowHidden=1        &quot; 显示隐藏文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">let NERDTreeMinimalUI=1         &quot; NERDTree 子窗口中不显示冗余帮助信息</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">let g:rainbow_conf = {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">\\   &#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">guifgs</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;: [&#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">royalblue3</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;, &#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">darkorange3</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;, &#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">seagreen3</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;, &#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">firebrick</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;],</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">\\   &#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ctermfgs</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;: [&#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lightblue</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;, &#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lightyellow</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;, &#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lightcyan</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;, &#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lightmagenta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;],</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">\\   &#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">operators</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;: &#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_,\\</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\|</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-_</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\\   &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">parentheses</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;: [&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">start=/(/ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">end=/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)/ fold</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">start</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> end</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fold</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;, &#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">=/{/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> end=/}/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fold&#39;],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\\   &#39;separately&#39;: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\\       &#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;: {},</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\\       &#39;tex&#39;: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\\           &#39;parentheses&#39;: [&#39;start=/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> end=/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/&#39;, &#39;start=/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> end=/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/&#39;],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\\       },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\\       &#39;css&#39;: 0,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\\   }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\\}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; 绑定F2到NERDTreeToggle</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">map &lt;F2&gt; :NERDTreeToggle&lt;CR&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; YouCompleteMe</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">set runtimepath+=~/.vim/bundle/YouCompleteMe</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ycm_collect_identifiers_from_tags_files = 1           &quot; 开启 YCM 基于标签引擎</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ycm_collect_identifiers_from_comments_and_strings = 1 &quot; 注释与字符串中的内容也用于补全</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:syntastic_ignore_files=[&quot;.*\\.py$&quot;]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ycm_seed_identifiers_with_syntax = 1                  &quot; 语法关键字补全</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ycm_complete_in_comments = 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ycm_confirm_extra_conf = 0</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ycm_key_list_select_completion = [&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">c-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">n</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, &#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Dow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">n</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;]  &quot; 映射按键, 没有这个会拦截掉tab, 导致其他插件的tab不能用.</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ycm_key_list_previous_completion = [&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">c-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">p</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, &#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">U</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">p</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ycm_complete_in_comments = 1                          &quot; 在注释输入中也能补全</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ycm_complete_in_strings = 1                           &quot; 在字符串输入中也能补全</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ycm_collect_identifiers_from_comments_and_strings = 1 &quot; 注释和字符串中的文字也会被收入补全</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ycm_global_ycm_extra_conf=&#39;~/.vim/bundle/YouCompleteMe/third_party/ycmd/cpp/ycm/.ycm_extra_conf.py&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ycm_show_diagnostics_ui = 0                           &quot; 禁用语法检查</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">inoremap &lt;expr&gt; &lt;CR&gt; pumvisible() ? &quot;\\&lt;C-y&gt;&quot; : &quot;\\&lt;CR&gt;&quot; |            &quot; 回车即选中当前项</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nnoremap &lt;c-j&gt; :YcmCompleter GoToDefinitionElseDeclaration&lt;CR&gt;|     &quot; 跳转到定义处</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;let g:ycm_min_num_of_chars_for_completion=2                 &quot; 从第2个键入字符就开始罗列匹配项</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ycm_global_ycm_extra_conf = &quot;~/.vim/plugged/YouCompleteMe/third_party/ycmd/cpp/ycm/.ycm_extra_conf.py&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  </span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot; airline</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let laststatus = 2</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:airline_powerline_fonts = 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:airline_theme = &quot;dark&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:airline#extensions#tabline#enabled = 1</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot; vim-monokai</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; colorscheme monokai</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot; vim-markdown</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; Github风格markdown语法</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:vim_markdown_no_extensions_in_markdown = 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot; vim-cpp-enhanced-highlight</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:cpp_class_scope_highlight = 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:cpp_member_variable_highlight = 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:cpp_class_decl_highlight = 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:cpp_experimental_template_highlight = 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; 自定义error和warning图标</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ale_sign_error = &#39;✗&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ale_sign_warning = &#39;⚡&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; 显示Linter名称,出错或警告等相关信息</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ale_echo_msg_error_str = &#39;E&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ale_echo_msg_warning_str = &#39;W&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ale_echo_msg_format = &#39;[%linter%]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [%severity%]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39; </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;设置状态栏显示的内容,这里必须添加%{ALEGetStatusLine()到状态栏里</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;设置ale显示内容</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ale_statusline_format = [&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">✗ %d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">⚡ %d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">✔ OK</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; 对verilog、c++、c、python单独设置linter</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ale_linters = { &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">verilog</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;: [&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">vlog</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\\   &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">c++</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;: [&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">clangd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\\   &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;: [&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gcc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\\   &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">python</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;: [&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pylint</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\\}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ale_lint_on_text_changed = 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ale_set_loclist = 0</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">let g:ale_set_quickfix = 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112113114115116117118119120121122123124125126127128129130131132133134135136137138139140141142143144145146147</span></span></code></pre></div></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>### 4.安装插件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1.  \`terminal\`中输入\`vim\`命令</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    \`\`\`shell</span></span>
<span class="line"><span>    ~$ vim</span></span>
<span class="line"><span>    1</span></span>
<span class="line"><span>    \`\`\`</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>2.  进入到\`vim\`中后输入 \`:PluginInstall\`命令安装插件  </span></span>
<span class="line"><span>    ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/202ddbf2db6df5e70f6c61e8a6f460d5.png#pic_center)  </span></span>
<span class="line"><span>    安装完成，如下如图所示![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/46f0869ad5ca4dea443ca02ea332ad23.png)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>### 5.自动补全插件\`YouCompleteMe\`的配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span>进行到这一步，\`vim\`基本已经配置差不多啦，最后来进行自动补全的配置。  </span></span>
<span class="line"><span>此时打开\`vim\`底部会出现\`YCM\`的报错，现在来解决。</span></span>
<span class="line"><span>1.  安装\`python3\`、\`python3-dev\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    \`\`\`shell</span></span>
<span class="line"><span>    ~$ sudo apt install python3 python3-dev</span></span>
<span class="line"><span>    1</span></span>
<span class="line"><span>    \`\`\`</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>2.  执行如下命令(使用绝对**路径**)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    \`\`\`shell</span></span>
<span class="line"><span>    ~$ /usr/bin/python3 ~/.vim/bundle/YouCompleteMe/install.py --all --verbose</span></span>
<span class="line"><span>    1</span></span>
<span class="line"><span>    \`\`\`</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c8be7d097bcb6146355e49d50bf4eb1c.png)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 出现如下界面表示成功</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2da9fc504429d48438de34df1a0d87f1.png)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>NoExtraConfDetected: No .ycm_extra_conf.py file detected, so no compile flags are available. Thus no semantic support for C/C++/ObjC...</span></span></code></pre></div>`,12)]))}const c=i(p,[["render",t]]);export{d as __pageData,c as default};
