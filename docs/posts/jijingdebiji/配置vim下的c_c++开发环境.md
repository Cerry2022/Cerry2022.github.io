## Vim C/C++开发配置

### 1.基础准备

安装g++ [gcc](https://so.csdn.net/so/search?q=gcc&spm=1001.2101.3001.7020) git cmake

```shell
sudo apt-get install g++ gcc cmake git
1
```

安装vim

```shell
sudo apt-get install vim
1
```

### 2.安装Vim插件管理工具Vundle

Vundle让你可以非常轻松地安装、更新、搜索和清理插件

1.  按`ctrl + alt + T`打开 `Terminal`  
    进入到`~/.vim`文件夹中，如果没有则创建
    
    ```shell
    ~$ cd ~/.vim/
    #如果无文件夹
    #mkdir .vim
    123
    ```
    
2.  在`~/.vim`目录下创建一个bundle目录,下载Vundle.vim到~/.vim/bundle目录下
    
    ```shell
    ~/.vim$ mkdir bundle
    ~/.vim$ git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
    12
    ```
    
    如果无法下载，可以直接点击链接下载到该文件夹中。

### 3.配置~/.vimrc

1.  在`~`下创建文件`.vimrc`
    
    ```shell
    ~/$ vim .vimrc
    1
    ```
    
    将以下内容复制到 `.vimrc`中
    
    ```shell
    filetype off
    syntax on
    set rtp+=~/.vim/bundle/Vundle.vim
    call vundle#begin()
    Plugin 'VundleVim/Vundle.vim'
    Plugin 'scrooloose/nerdtree'               " 文件树
    Plugin 'Valloric/YouCompleteMe'			 " 代码提示补全插件	
    Plugin 'sickill/vim-monokai'               " monokai主题
    Plugin 'vim-airline/vim-airline'           " 美化状态栏
    Plugin 'vim-airline/vim-airline-themes'    " 设置ailine
    Plugin 'plasticboy/vim-markdown'           " markdown高亮
    Plugin 'octol/vim-cpp-enhanced-highlight'  " C++代码高亮
    Plugin 'mhinz/vim-signify'
    Plugin 'dense-analysis/ale'
    Plugin 'morhetz/gruvbox'					 " 主题	
    Plugin 'luochen1990/rainbow'				"rainbow parenthesis
    call vundle#end()
    
    "------------------------------------
    "-------------keyboard map-----------
    "-----------------------------------
    inoremap jj <esc>
    "-----------------------------------
    "让vimrc配置变更立即生效'
    autocmd BufWritePost $MYVIMRC source $MYVIMRC
    colorscheme gruvbox
    set background=dark 
    filetype on
    set signcolumn=yes "强制显示侧边栏，防止时有时无
    syntax on 
    set shiftwidth=4
    set tabstop=4
    let g:ycm_clangd_binary_path='clangd'
    set number
    "搜索忽略大小写
    set ignorecase
    "搜索逐字符高亮
    set hlsearch
    set incsearch
    " 为C程序提供自动缩进
    set smartindent
    set cursorline " 突出显示当前行
    "光标遇到圆括号、方括号、大括号时，自动高亮对应的另一个圆括号、方括号和大括号"
    set showmatch
    
    "括号自动匹配补全"
    inoremap ( ()<Esc>i
    inoremap [ []<Esc>i
    inoremap { {}<Esc>i
    inoremap { {<CR>}<Esc>O
    " C++的编译和运行
    map <F5> :call CompileRunGpp()<CR>
    func! CompileRunGpp()
    exec "w"
    exec "!g++ % -o %<"
    exec "! ./%<"
    endfunc
    
    "rainbow parenthesis
    let g:rainbow_active = 1
    " 文件树的设置
    nmap <Leader><Leader> :NERDTreeToggle<CR>
    let NERDTreeWinSize=32
    " 设置NERDTree子窗口宽度
    let NERDTreeWinPos="left"      " 设置NERDTree子窗口位置
    let NERDTreeShowHidden=1        " 显示隐藏文件
    let NERDTreeMinimalUI=1         " NERDTree 子窗口中不显示冗余帮助信息
    let g:rainbow_conf = {
    \   'guifgs': ['royalblue3', 'darkorange3', 'seagreen3', 'firebrick'],
    \   'ctermfgs': ['lightblue', 'lightyellow', 'lightcyan', 'lightmagenta'],
    \   'operators': '_,\|+\|-_',
    \   'parentheses': ['start=/(/ end=/)/ fold', 'start=/\[/ end=/\]/ fold', 'start=/{/ end=/}/ fold'],
    \   'separately': {
    \       '*': {},
    \       'tex': {
    \           'parentheses': ['start=/(/ end=/)/', 'start=/\[/ end=/\]/'],
    \       },
    \       'css': 0,
    \   }
    \}
    " 绑定F2到NERDTreeToggle
    map <F2> :NERDTreeToggle<CR>
    
    
    " YouCompleteMe
    set runtimepath+=~/.vim/bundle/YouCompleteMe
    let g:ycm_collect_identifiers_from_tags_files = 1           " 开启 YCM 基于标签引擎
    let g:ycm_collect_identifiers_from_comments_and_strings = 1 " 注释与字符串中的内容也用于补全
    let g:syntastic_ignore_files=[".*\.py$"]
    let g:ycm_seed_identifiers_with_syntax = 1                  " 语法关键字补全
    let g:ycm_complete_in_comments = 1
    let g:ycm_confirm_extra_conf = 0
    let g:ycm_key_list_select_completion = ['<c-n>', '<Down>']  " 映射按键, 没有这个会拦截掉tab, 导致其他插件的tab不能用.
    let g:ycm_key_list_previous_completion = ['<c-p>', '<Up>']
    let g:ycm_complete_in_comments = 1                          " 在注释输入中也能补全
    let g:ycm_complete_in_strings = 1                           " 在字符串输入中也能补全
    let g:ycm_collect_identifiers_from_comments_and_strings = 1 " 注释和字符串中的文字也会被收入补全
    let g:ycm_global_ycm_extra_conf='~/.vim/bundle/YouCompleteMe/third_party/ycmd/cpp/ycm/.ycm_extra_conf.py'
    let g:ycm_show_diagnostics_ui = 0                           " 禁用语法检查
    inoremap <expr> <CR> pumvisible() ? "\<C-y>" : "\<CR>" |            " 回车即选中当前项
    nnoremap <c-j> :YcmCompleter GoToDefinitionElseDeclaration<CR>|     " 跳转到定义处
    "let g:ycm_min_num_of_chars_for_completion=2                 " 从第2个键入字符就开始罗列匹配项
    let g:ycm_global_ycm_extra_conf = "~/.vim/plugged/YouCompleteMe/third_party/ycmd/cpp/ycm/.ycm_extra_conf.py"
      
    
    
    "" airline
    let laststatus = 2
    let g:airline_powerline_fonts = 1
    let g:airline_theme = "dark"
    let g:airline#extensions#tabline#enabled = 1
    
    
    
    "" vim-monokai
    " colorscheme monokai
    
    "" vim-markdown
    " Github风格markdown语法
    let g:vim_markdown_no_extensions_in_markdown = 1
    
    "" vim-cpp-enhanced-highlight
    let g:cpp_class_scope_highlight = 1
    let g:cpp_member_variable_highlight = 1
    let g:cpp_class_decl_highlight = 1
    let g:cpp_experimental_template_highlight = 1
    
    " 自定义error和warning图标
    let g:ale_sign_error = '✗'
    let g:ale_sign_warning = '⚡'
    " 显示Linter名称,出错或警告等相关信息
    let g:ale_echo_msg_error_str = 'E'
    let g:ale_echo_msg_warning_str = 'W'
    let g:ale_echo_msg_format = '[%linter%] %s [%severity%]' 
    "设置状态栏显示的内容,这里必须添加%{ALEGetStatusLine()到状态栏里
    "设置ale显示内容
    let g:ale_statusline_format = ['✗ %d', '⚡ %d', '✔ OK']
    " 对verilog、c++、c、python单独设置linter
    let g:ale_linters = { 'verilog': ['vlog'],
    \   'c++': ['clangd'],
    \   'c': ['gcc'],
    \   'python': ['pylint'],
    \}
    
    let g:ale_lint_on_text_changed = 1
    let g:ale_set_loclist = 0
    let g:ale_set_quickfix = 1
    123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112113114115116117118119120121122123124125126127128129130131132133134135136137138139140141142143144145146147
   
```

### 4.安装插件

1.  `terminal`中输入`vim`命令
    
    ```shell
    ~$ vim
    1
    ```
    
2.  进入到`vim`中后输入 `:PluginInstall`命令安装插件  
    ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/202ddbf2db6df5e70f6c61e8a6f460d5.png#pic_center)  
    安装完成，如下如图所示![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/46f0869ad5ca4dea443ca02ea332ad23.png)
    
### 5.自动补全插件`YouCompleteMe`的配置

进行到这一步，`vim`基本已经配置差不多啦，最后来进行自动补全的配置。  
此时打开`vim`底部会出现`YCM`的报错，现在来解决。
1.  安装`python3`、`python3-dev`

    ```shell
    ~$ sudo apt install python3 python3-dev
    1
    ```
    
2.  执行如下命令(使用绝对**路径**)
    
    ```shell
    ~$ /usr/bin/python3 ~/.vim/bundle/YouCompleteMe/install.py --all --verbose
    1
    ```
    

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c8be7d097bcb6146355e49d50bf4eb1c.png)

3. 出现如下界面表示成功


![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2da9fc504429d48438de34df1a0d87f1.png)



NoExtraConfDetected: No .ycm_extra_conf.py file detected, so no compile flags are available. Thus no semantic support for C/C++/ObjC...