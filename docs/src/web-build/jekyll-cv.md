# jekyll 个人在线简历

::: info

个人在线简历链接：[cv.tangjiayan.cn](https://cv.tangjiayan.cn/)

:::

在 jekyll 发现了 [online-cv](https://github.com/sharu725/online-cv) 这个主题，打算用其制作一个在线简历，需要在本地部署 Jekyll，运行本地服务器进行设计和预览。

首先参考 [Jekyll on Windows](https://jekyllrb.com/docs/installation/windows/) 使用 [RubyInstaller](https://rubyinstaller.org/) 安装好了 `MSYS2 and MINGW development tool chain`。

## `URI::BadURIError`

### `URI::BadURIError` - 问题

运行 `gem install jekyll bundler` 时，报错 `URI::BadURIError`，详细信息如下：

::: details `URI::BadURIError` 详细信息

```
$ gem install jekyll bundler
ERROR:  While executing gem ... (URI::BadURIError)
    both URI are relative
        C:/Ruby32-x64/lib/ruby/3.2.0/uri/generic.rb:1119:in `merge'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/source.rb:236:in `enforce_trailing_slash'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/source.rb:84:in `dependency_resolver_set'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/resolver/best_set.rb:24:in `block in pick_sets'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/source_list.rb:94:in `each'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/source_list.rb:94:in `each_source'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/resolver/best_set.rb:23:in `pick_sets'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/resolver/best_set.rb:29:in `find_all'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/resolver/installer_set.rb:173:in `find_all'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/resolver/installer_set.rb:62:in `add_always_install'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/dependency_installer.rb:319:in `resolve_dependencies'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/commands/install_command.rb:206:in `install_gem'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/commands/install_command.rb:231:in `block in install_gems'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/commands/install_command.rb:224:in `each'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/commands/install_command.rb:224:in `install_gems'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/commands/install_command.rb:170:in `execute'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/command.rb:328:in `invoke_with_build_args'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/command_manager.rb:253:in `invoke_command'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/command_manager.rb:193:in `process_args'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/command_manager.rb:151:in `run'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/gem_runner.rb:56:in `run'
        C:/Ruby32-x64/bin/gem:12:in `<main>'
```

:::

### `URI::BadURIError` - 尝试

#### 设置 cmd 代理

参考

- [windows 的cmd设置代理方法_Sherlock　Salvatore的博客-CSDN博客](https://blog.csdn.net/SHERLOCKSALVATORE/article/details/123599042)

使用 [set](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/set_1) 指令 `set http_proxy=http://127.0.0.1:端口号`、`set https_proxy=http://127.0.0.1:端口号` 设置 v2ray 代理，没有用。

#### 更换源

参考

- [ERROR: Could not find a valid gem 'jekyll' (>= 0), here is why: · Issue #34 · juthilo/run-jekyll-on-windows](https://github.com/juthilo/run-jekyll-on-windows/issues/34)
- [China : gem install jekyll do not work · Issue #1409 · jekyll/jekyll](https://github.com/jekyll/jekyll/issues/1409)

使用 `gem sources --remove`、`gem sources -a` 将 gem 源更换为：

- [http://rubygems.org/](http://rubygems.org/)
- [http://ruby.taobao.org/](http://ruby.taobao.org/)
- [https://mirrors.aliyun.com/rubygems/](https://mirrors.aliyun.com/rubygems/)
- [https://gems.ruby-china.com/](https://gems.ruby-china.com/)

没有用。

### `URI::BadURIError` - 解决

参考

- [ruby - gem update --system ERROR: While executing gem ... (URI::BadURIError) - Stack Overflow](https://stackoverflow.com/questions/77321122/gem-update-system-error-while-executing-gem-uribadurierror/77330584)

解决了问题。

原因是 gem 的源列表中多了一行空行：

```
$ gem sources -l
*** CURRENT SOURCES ***


http://rubygems.org/
```

使用 `gem sources --remove ""` 移除空行即可。

```
$ gem sources --remove ""
 removed from sources
```

```
$ gem sources -l
*** CURRENT SOURCES ***

http://rubygems.org/
```

## `Gem::Ext::BuildError: ERROR`

### `Gem::Ext::BuildError: ERROR` - 问题

运行 `bundle install` 时，提示 `Gem::Ext::BuildError: ERROR`，详细信息如下：

::: details `Gem::Ext::BuildError: ERROR` 详细信息

```
$ bundle install

Fetching gem metadata from https://rubygems.org/.........
Resolving dependencies....
Using bundler 2.3.19
Using ruby2_keywords 0.0.5
Using concurrent-ruby 1.1.10
Using minitest 5.16.2
Using thread_safe 0.3.6
Using zeitwerk 2.6.0
Using public_suffix 4.0.7
Using coffee-script-source 1.11.1
Using execjs 2.8.1
Using colorator 1.1.0
Using commonmarker 0.23.5
Using unf_ext 0.0.8.2
Using eventmachine 1.2.7
Using http_parser.rb 0.8.0
Using ffi 1.15.5
Using forwardable-extended 2.6.0
Using faraday-net_http 3.0.0
Using gemoji 3.0.1
Using rb-fsevent 0.11.1
Using rexml 3.2.5
Using liquid 4.0.3
Using mercenary 0.3.6
Using rouge 3.26.0
Using safe_yaml 1.0.5
Using mini_portile2 2.8.4
Using racc 1.6.0
Using jekyll-paginate 1.1.0
Using rubyzip 2.3.2
Using jekyll-swiss 1.0.0
Using unicode-display_width 1.8.0
Using webrick 1.8.1
Using i18n 0.9.5
Using tzinfo 1.2.10
Using addressable 2.8.0
Using coffee-script 2.4.1
Using unf 0.1.4
Using em-websocket 0.5.3
Using ethon 0.15.0
Using faraday 2.5.1
Using rb-inotify 0.10.1
Using kramdown 2.3.2
Using pathutil 0.16.2
Using jekyll-commonmark 1.4.0
Using activesupport 6.0.5.1
Using simpleidn 0.2.1
Using sawyer 0.9.2
Using typhoeus 1.4.0
Using sass-listen 4.0.0
Using listen 3.7.1
Using jekyll-coffeescript 1.1.1
Using kramdown-parser-gfm 1.1.0
Using terminal-table 1.8.0
Using dnsruby 1.61.9
Using octokit 4.25.1
Using sass 3.7.4
Using jekyll-watch 2.2.1
Using github-pages-health-check 1.17.9
Using jekyll-sass-converter 1.5.2
Using jekyll-gist 1.5.0
Using jekyll 3.9.2
Using jekyll-avatar 0.7.0
Using jekyll-commonmark-ghpages 0.2.0
Using jekyll-default-layout 0.1.4
Using jekyll-feed 0.15.1
Using jekyll-github-metadata 2.13.0
Using jekyll-include-cache 0.2.1
Using jekyll-optional-front-matter 0.3.2
Using jekyll-readme-index 0.3.0
Using jekyll-redirect-from 0.16.0
Using jekyll-relative-links 0.6.1
Using jekyll-remote-theme 0.4.3
Using jekyll-seo-tag 2.8.0
Using jekyll-sitemap 1.4.0
Using jekyll-titles-from-headings 0.5.3
Using jekyll-theme-architect 0.2.0
Using jekyll-theme-cayman 0.2.0
Using jekyll-theme-dinky 0.2.0
Using jekyll-theme-hacker 0.2.0
Using jekyll-theme-leap-day 0.2.0
Using jekyll-theme-merlot 0.2.0
Using jekyll-theme-midnight 0.2.0
Using jekyll-theme-minimal 0.2.0
Using jekyll-theme-modernist 0.2.0
Using jekyll-theme-primer 0.6.0
Using jekyll-theme-slate 0.2.0
Using jekyll-theme-tactile 0.2.0
Using jekyll-theme-time-machine 0.2.0
Using minima 2.5.1
Installing nokogiri 1.13.8 with native extensions
Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

current directory:
C:/Ruby32-x64/lib/ruby/gems/3.2.0/gems/nokogiri-1.13.8/ext/nokogiri
C:/Ruby32-x64/bin/ruby.exe extconf.rb --use-system-libraries
--with-xml2-include\=/usr/local/opt/libxml2/include/libxml2
checking for whether -std=c99 is accepted as CFLAGS... yes
checking for whether -Wno-declaration-after-statement is accepted as CFLAGS...
yes
checking for whether -g is accepted as CFLAGS... yes
checking for whether -Winline is accepted as CFLAGS... yes
checking for whether -Wmissing-noreturn is accepted as CFLAGS... yes
checking for whether  "-Idummypath" is accepted as CPPFLAGS... yes
Building nokogiri using system libraries.
checking for gzdopen() in -lz... yes
checking for xmlParseDoc() in -lxml2... no
checking for xmlParseDoc() in -llibxml2... no
checking for libxml-2.0 using `pkg_config`... no
Please install either the `pkg-config` utility or the `pkg-config` rubygem.
checking for xmlParseDoc() in -lxml2... no
checking for xmlParseDoc() in -llibxml2... no
-----
extconf.rb:285:in `ensure_package_configuration'
extconf.rb:648:in `<main>'
xml2 is missing. Please locate mkmf.log to investigate how it is failing.
-----
*** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.

Provided configuration options:
        --with-opt-dir
        --without-opt-dir
        --with-opt-include
        --without-opt-include=${opt-dir}/include
        --with-opt-lib
        --without-opt-lib=${opt-dir}/lib
        --with-make-prog
        --without-make-prog
        --srcdir=.
        --curdir
        --ruby=C:/Ruby32-x64/bin/$(RUBY_BASE_NAME)
        --help
        --clean
        --prevent-strip
        --enable-system-libraries
        --disable-system-libraries
        --use-system-libraries
        --enable-system-libraries
        --disable-system-libraries
        --use-system-libraries
        --with-zlib-dir
        --without-zlib-dir
        --with-zlib-include
        --without-zlib-include=${zlib-dir}/include
        --with-zlib-lib
        --without-zlib-lib=${zlib-dir}/lib
        --with-z-dir
        --without-z-dir
        --with-z-include
        --without-z-include=${z-dir}/include
        --with-z-lib
        --without-z-lib=${z-dir}/lib
        --with-zlib
        --without-zlib
        --with-xml2-dir
        --without-xml2-dir
        --with-xml2-include=${xml2-dir}/include
        --with-xml2-lib
        --without-xml2-lib=${xml2-dir}/lib
        --with-xml2lib
        --without-xml2lib
        --with-libxml2-dir
        --without-libxml2-dir
        --with-libxml2-include
        --without-libxml2-include=${libxml2-dir}/include
        --with-libxml2-lib
        --without-libxml2-lib=${libxml2-dir}/lib
        --with-libxml2lib
        --without-libxml2lib
        --with-libxml-2.0-dir
        --without-libxml-2.0-dir
        --with-libxml-2.0-include
        --without-libxml-2.0-include=${libxml-2.0-dir}/include
        --with-libxml-2.0-lib
        --without-libxml-2.0-lib=${libxml-2.0-dir}/lib
        --with-libxml-2.0-config
        --without-libxml-2.0-config
        --with-pkg-config
        --without-pkg-config
        --with-xml2lib
        --without-xml2lib
        --with-libxml2lib
        --without-libxml2lib

To see why this extension failed to compile, please check the mkmf.log which can
be found here:

C:/Ruby32-x64/lib/ruby/gems/3.2.0/extensions/x64-mingw-ucrt/3.2.0/nokogiri-1.13.8/mkmf.log

extconf failed, exit code 1

Gem files will remain installed in
C:/Ruby32-x64/lib/ruby/gems/3.2.0/gems/nokogiri-1.13.8 for inspection.
Results logged to
C:/Ruby32-x64/lib/ruby/gems/3.2.0/extensions/x64-mingw-ucrt/3.2.0/nokogiri-1.13.8/gem_make.out

  C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/ext/builder.rb:120:in `run'
C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/ext/ext_conf_builder.rb:28:in
`build'
C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/ext/builder.rb:188:in
`build_extension'
C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/ext/builder.rb:222:in `block
in build_extensions'
  C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/ext/builder.rb:219:in `each'
C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/ext/builder.rb:219:in
`build_extensions'
C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/installer.rb:844:in
`build_extensions'
C:/Ruby32-x64/lib/ruby/gems/3.2.0/gems/bundler-2.3.19/lib/bundler/rubygems_gem_installer.rb:72:in
`build_extensions'
C:/Ruby32-x64/lib/ruby/gems/3.2.0/gems/bundler-2.3.19/lib/bundler/rubygems_gem_installer.rb:28:in
`install'
C:/Ruby32-x64/lib/ruby/gems/3.2.0/gems/bundler-2.3.19/lib/bundler/source/rubygems.rb:207:in
`install'
C:/Ruby32-x64/lib/ruby/gems/3.2.0/gems/bundler-2.3.19/lib/bundler/installer/gem_installer.rb:54:in
`install'
C:/Ruby32-x64/lib/ruby/gems/3.2.0/gems/bundler-2.3.19/lib/bundler/installer/gem_installer.rb:16:in
`install_from_spec'
C:/Ruby32-x64/lib/ruby/gems/3.2.0/gems/bundler-2.3.19/lib/bundler/installer/parallel_installer.rb:186:in
`do_install'
C:/Ruby32-x64/lib/ruby/gems/3.2.0/gems/bundler-2.3.19/lib/bundler/installer/parallel_installer.rb:177:in
`block in worker_pool'
C:/Ruby32-x64/lib/ruby/gems/3.2.0/gems/bundler-2.3.19/lib/bundler/worker.rb:62:in
`apply_func'
C:/Ruby32-x64/lib/ruby/gems/3.2.0/gems/bundler-2.3.19/lib/bundler/worker.rb:57:in
`block in process_queue'
C:/Ruby32-x64/lib/ruby/gems/3.2.0/gems/bundler-2.3.19/lib/bundler/worker.rb:54:in
`loop'
C:/Ruby32-x64/lib/ruby/gems/3.2.0/gems/bundler-2.3.19/lib/bundler/worker.rb:54:in
`process_queue'
C:/Ruby32-x64/lib/ruby/gems/3.2.0/gems/bundler-2.3.19/lib/bundler/worker.rb:91:in
`block (2 levels) in create_threads'

An error occurred while installing nokogiri (1.13.8), and Bundler cannot
continue.

In Gemfile:
  github-pages was resolved to 227, which depends on
    jekyll-mentions was resolved to 1.6.0, which depends on
      html-pipeline was resolved to 2.14.2, which depends on
        nokogiri

```

:::

### `Gem::Ext::BuildError: ERROR` - 解决

解决办法是分别运行 `gem update` 和 `bundle update`。

运行 `gem update` 时又出现了 `Gem::RemoteFetcher::FetchError` 问题：

::: details `Gem::RemoteFetcher::FetchError` 详细信息

```
$ gem update

ERROR:  While executing gem ... (Gem::RemoteFetcher::FetchError)
    IO::TimeoutError: Failed to open TCP connection to rubygems.org:80 (http://rubygems.org/specs.4.8.gz) (Gem::RemoteFetcher::FetchError)
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/remote_fetcher.rb:266:in `rescue in fetch_path'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/remote_fetcher.rb:246:in `fetch_path'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/remote_fetcher.rb:294:in `cache_update_path'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/source.rb:191:in `load_specs'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/spec_fetcher.rb:253:in `tuples_for'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/spec_fetcher.rb:220:in `block in available_specs'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/source_list.rb:94:in `each'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/source_list.rb:94:in `each_source'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/spec_fetcher.rb:215:in `available_specs'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/spec_fetcher.rb:91:in `search_for_dependency'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/commands/update_command.rb:143:in `fetch_remote_gems'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/commands/update_command.rb:168:in `highest_remote_name_tuple'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/commands/update_command.rb:308:in `block in which_to_update'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/commands/update_command.rb:304:in `each'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/commands/update_command.rb:304:in `which_to_update'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/commands/update_command.rb:103:in `execute'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/command.rb:328:in `invoke_with_build_args'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/command_manager.rb:253:in `invoke_command'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/command_manager.rb:193:in `process_args'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/command_manager.rb:151:in `run'
        C:/Ruby32-x64/lib/ruby/site_ruby/3.2.0/rubygems/gem_runner.rb:56:in `run'
        C:/Ruby32-x64/bin/gem:10:in `<main>'
```

:::

尝试 打开系统代理 / 使用 `set http_proxy=http://127.0.0.1:端口号` 设置代理，都没有用，只好打开 Clash 的 `TUN Mode`。

`gem update` 和 `bundle update` 的运行情况如下：

::: details `gem update` 运行情况

```
$ gem update

Updating installed gems
Updating activesupport
Fetching activesupport-7.1.1.gem
Fetching tzinfo-2.0.6.gem
Fetching connection_pool-2.4.1.gem
Successfully installed tzinfo-2.0.6
Successfully installed connection_pool-2.4.1
Successfully installed activesupport-7.1.1
Parsing documentation for tzinfo-2.0.6
Installing ri documentation for tzinfo-2.0.6
Parsing documentation for connection_pool-2.4.1
Installing ri documentation for connection_pool-2.4.1
Parsing documentation for activesupport-7.1.1
Couldn't find file to include 'activesupport/README.rdoc' from lib/active_support.rb
Installing ri documentation for activesupport-7.1.1
Done installing documentation for tzinfo, connection_pool, activesupport after 4 seconds
Parsing documentation for activesupport-7.1.1
Couldn't find file to include 'activesupport/README.rdoc' from lib/active_support.rb
Parsing documentation for connection_pool-2.4.1
Parsing documentation for tzinfo-2.0.6
Done installing documentation for activesupport, connection_pool, tzinfo after 1 seconds
Updating bigdecimal
Fetching bigdecimal-3.1.4.gem
Temporarily enhancing PATH for MSYS/MINGW...
Building native extensions. This could take a while...
Successfully installed bigdecimal-3.1.4
Parsing documentation for bigdecimal-3.1.4
Installing ri documentation for bigdecimal-3.1.4
Done installing documentation for bigdecimal after 0 seconds
Parsing documentation for bigdecimal-3.1.4
Done installing documentation for bigdecimal after 0 seconds
Updating coffee-script-source
Fetching coffee-script-source-1.12.2.gem
Successfully installed coffee-script-source-1.12.2
Parsing documentation for coffee-script-source-1.12.2
Installing ri documentation for coffee-script-source-1.12.2
Done installing documentation for coffee-script-source after 0 seconds
Parsing documentation for coffee-script-source-1.12.2
Done installing documentation for coffee-script-source after 0 seconds
Updating csv
Fetching csv-3.2.7.gem
Successfully installed csv-3.2.7
Parsing documentation for csv-3.2.7
Installing ri documentation for csv-3.2.7
Done installing documentation for csv after 0 seconds
Parsing documentation for csv-3.2.7
Done installing documentation for csv after 0 seconds
Updating debug
Fetching debug-1.8.0.gem
Building native extensions. This could take a while...
Successfully installed debug-1.8.0
Parsing documentation for debug-1.8.0
Installing ri documentation for debug-1.8.0
Done installing documentation for debug after 0 seconds
Parsing documentation for debug-1.8.0
Done installing documentation for debug after 0 seconds
Updating dnsruby
Fetching dnsruby-1.70.0.gem
Installing dnsruby...
  For issues and source code: https://github.com/alexdalitz/dnsruby
  For general discussion (please tell us how you use dnsruby): https://groups.google.com/forum/#!forum/dnsruby
Successfully installed dnsruby-1.70.0
Parsing documentation for dnsruby-1.70.0
Installing ri documentation for dnsruby-1.70.0
Done installing documentation for dnsruby after 1 seconds
Parsing documentation for dnsruby-1.70.0
Done installing documentation for dnsruby after 1 seconds
Updating erb
Fetching erb-4.0.3.gem
Building native extensions. This could take a while...
Successfully installed erb-4.0.3
Parsing documentation for erb-4.0.3
Installing ri documentation for erb-4.0.3
Done installing documentation for erb after 0 seconds
Parsing documentation for erb-4.0.3
Done installing documentation for erb after 0 seconds
Updating ethon
Fetching ethon-0.16.0.gem
Successfully installed ethon-0.16.0
Parsing documentation for ethon-0.16.0
Installing ri documentation for ethon-0.16.0
Done installing documentation for ethon after 0 seconds
Parsing documentation for ethon-0.16.0
Done installing documentation for ethon after 0 seconds
Updating execjs
Fetching execjs-2.9.1.gem
Successfully installed execjs-2.9.1
Parsing documentation for execjs-2.9.1
Installing ri documentation for execjs-2.9.1
Done installing documentation for execjs after 0 seconds
Parsing documentation for execjs-2.9.1
Done installing documentation for execjs after 0 seconds
Updating faraday
Fetching faraday-2.7.11.gem
Successfully installed faraday-2.7.11
Parsing documentation for faraday-2.7.11
Installing ri documentation for faraday-2.7.11
Done installing documentation for faraday after 0 seconds
Parsing documentation for faraday-2.7.11
Done installing documentation for faraday after 0 seconds
Updating faraday-net_http
Fetching faraday-net_http-3.0.2.gem
Successfully installed faraday-net_http-3.0.2
Parsing documentation for faraday-net_http-3.0.2
Installing ri documentation for faraday-net_http-3.0.2
Done installing documentation for faraday-net_http after 0 seconds
Parsing documentation for faraday-net_http-3.0.2
Done installing documentation for faraday-net_http after 0 seconds
Updating fileutils
Fetching fileutils-1.7.1.gem
Successfully installed fileutils-1.7.1
Parsing documentation for fileutils-1.7.1
Installing ri documentation for fileutils-1.7.1
Done installing documentation for fileutils after 0 seconds
Parsing documentation for fileutils-1.7.1
Done installing documentation for fileutils after 0 seconds
Updating gemoji
Fetching gemoji-4.1.0.gem
Successfully installed gemoji-4.1.0
Parsing documentation for gemoji-4.1.0
Installing ri documentation for gemoji-4.1.0
Done installing documentation for gemoji after 0 seconds
Parsing documentation for gemoji-4.1.0
Done installing documentation for gemoji after 0 seconds
Updating github-pages-health-check
Fetching github-pages-health-check-1.18.2.gem
Successfully installed github-pages-health-check-1.18.2
Parsing documentation for github-pages-health-check-1.18.2
Installing ri documentation for github-pages-health-check-1.18.2
Done installing documentation for github-pages-health-check after 0 seconds
Parsing documentation for github-pages-health-check-1.18.2
Done installing documentation for github-pages-health-check after 0 seconds
Updating irb
Fetching irb-1.8.3.gem
Fetching reline-0.3.9.gem
Successfully installed reline-0.3.9
Successfully installed irb-1.8.3
Parsing documentation for reline-0.3.9
Installing ri documentation for reline-0.3.9
Parsing documentation for irb-1.8.3
Installing ri documentation for irb-1.8.3
Done installing documentation for reline, irb after 1 seconds
Parsing documentation for irb-1.8.3
Parsing documentation for reline-0.3.9
Done installing documentation for irb, reline after 0 seconds
Updating jekyll-avatar
Fetching jekyll-avatar-0.8.0.gem
Successfully installed jekyll-avatar-0.8.0
Parsing documentation for jekyll-avatar-0.8.0
Installing ri documentation for jekyll-avatar-0.8.0
Done installing documentation for jekyll-avatar after 0 seconds
Parsing documentation for jekyll-avatar-0.8.0
Done installing documentation for jekyll-avatar after 0 seconds
Updating jekyll-coffeescript
Fetching jekyll-coffeescript-2.0.0.gem
Successfully installed jekyll-coffeescript-2.0.0
Parsing documentation for jekyll-coffeescript-2.0.0
Installing ri documentation for jekyll-coffeescript-2.0.0
Done installing documentation for jekyll-coffeescript after 0 seconds
Parsing documentation for jekyll-coffeescript-2.0.0
Done installing documentation for jekyll-coffeescript after 0 seconds
Updating jekyll-default-layout
Fetching jekyll-default-layout-0.1.5.gem
Successfully installed jekyll-default-layout-0.1.5
Parsing documentation for jekyll-default-layout-0.1.5
Installing ri documentation for jekyll-default-layout-0.1.5
Done installing documentation for jekyll-default-layout after 0 seconds
Parsing documentation for jekyll-default-layout-0.1.5
Done installing documentation for jekyll-default-layout after 0 seconds
Updating jekyll-feed
Fetching jekyll-feed-0.17.0.gem
Successfully installed jekyll-feed-0.17.0
Parsing documentation for jekyll-feed-0.17.0
Installing ri documentation for jekyll-feed-0.17.0
Done installing documentation for jekyll-feed after 0 seconds
Parsing documentation for jekyll-feed-0.17.0
Done installing documentation for jekyll-feed after 0 seconds
Updating jekyll-github-metadata
Fetching jekyll-github-metadata-2.16.0.gem
Successfully installed jekyll-github-metadata-2.16.0
Parsing documentation for jekyll-github-metadata-2.16.0
Installing ri documentation for jekyll-github-metadata-2.16.0
Done installing documentation for jekyll-github-metadata after 0 seconds
Parsing documentation for jekyll-github-metadata-2.16.0
Done installing documentation for jekyll-github-metadata after 0 seconds
Updating jekyll-relative-links
Fetching jekyll-relative-links-0.7.0.gem
Successfully installed jekyll-relative-links-0.7.0
Parsing documentation for jekyll-relative-links-0.7.0
Installing ri documentation for jekyll-relative-links-0.7.0
Done installing documentation for jekyll-relative-links after 0 seconds
Parsing documentation for jekyll-relative-links-0.7.0
Done installing documentation for jekyll-relative-links after 0 seconds
Updating jemoji
Fetching jemoji-0.13.0.gem
Fetching nokogiri-1.15.4-x64-mingw-ucrt.gem
Successfully installed nokogiri-1.15.4-x64-mingw-ucrt
Successfully installed jemoji-0.13.0
Parsing documentation for nokogiri-1.15.4-x64-mingw-ucrt
Installing ri documentation for nokogiri-1.15.4-x64-mingw-ucrt
Parsing documentation for jemoji-0.13.0
Installing ri documentation for jemoji-0.13.0
Done installing documentation for nokogiri, jemoji after 1 seconds
Parsing documentation for jemoji-0.13.0
Parsing documentation for nokogiri-1.15.4-x64-mingw-ucrt
Done installing documentation for jemoji, nokogiri after 0 seconds
Updating liquid
Fetching liquid-5.4.0.gem
Successfully installed liquid-5.4.0
Parsing documentation for liquid-5.4.0
Installing ri documentation for liquid-5.4.0
Done installing documentation for liquid after 1 seconds
Parsing documentation for liquid-5.4.0
Done installing documentation for liquid after 0 seconds
Updating mini_portile2
Fetching mini_portile2-2.8.5.gem
Successfully installed mini_portile2-2.8.5
Parsing documentation for mini_portile2-2.8.5
Installing ri documentation for mini_portile2-2.8.5
Done installing documentation for mini_portile2 after 0 seconds
Parsing documentation for mini_portile2-2.8.5
Done installing documentation for mini_portile2 after 0 seconds
Updating minitest
Fetching minitest-5.20.0.gem
Successfully installed minitest-5.20.0
Parsing documentation for minitest-5.20.0
Couldn't find file to include 'README.rdoc' from lib/minitest.rb
Installing ri documentation for minitest-5.20.0
Done installing documentation for minitest after 0 seconds
Parsing documentation for minitest-5.20.0
Couldn't find file to include 'README.rdoc' from lib/minitest.rb
Done installing documentation for minitest after 0 seconds
Updating net-imap
Fetching net-imap-0.4.2.gem
Successfully installed net-imap-0.4.2
Parsing documentation for net-imap-0.4.2
Installing ri documentation for net-imap-0.4.2
Done installing documentation for net-imap after 0 seconds
Parsing documentation for net-imap-0.4.2
Done installing documentation for net-imap after 0 seconds
Updating net-smtp
Fetching net-smtp-0.4.0.gem
Successfully installed net-smtp-0.4.0
Parsing documentation for net-smtp-0.4.0
Installing ri documentation for net-smtp-0.4.0
Done installing documentation for net-smtp after 0 seconds
Parsing documentation for net-smtp-0.4.0
Done installing documentation for net-smtp after 0 seconds
Updating nkf
Fetching nkf-0.1.3.gem
Building native extensions. This could take a while...
Successfully installed nkf-0.1.3
Parsing documentation for nkf-0.1.3
Installing ri documentation for nkf-0.1.3
Done installing documentation for nkf after 0 seconds
Parsing documentation for nkf-0.1.3
Done installing documentation for nkf after 0 seconds
Updating octokit
Fetching octokit-7.2.0.gem
Successfully installed octokit-7.2.0
Parsing documentation for octokit-7.2.0
Installing ri documentation for octokit-7.2.0
Done installing documentation for octokit after 1 seconds
Parsing documentation for octokit-7.2.0
Done installing documentation for octokit after 0 seconds
Updating openssl
Fetching openssl-3.2.0.gem
Installing required msys2 packages: mingw-w64-ucrt-x86_64-openssl
Building native extensions. This could take a while...
Successfully installed openssl-3.2.0
Parsing documentation for openssl-3.2.0
Installing ri documentation for openssl-3.2.0
Done installing documentation for openssl after 1 seconds
Parsing documentation for openssl-3.2.0
Done installing documentation for openssl after 0 seconds
Updating psych
Fetching psych-5.1.1.1.gem
Installing required msys2 packages: mingw-w64-ucrt-x86_64-libyaml
Building native extensions. This could take a while...
Successfully installed psych-5.1.1.1
Parsing documentation for psych-5.1.1.1
Installing ri documentation for psych-5.1.1.1
Done installing documentation for psych after 0 seconds
Parsing documentation for psych-5.1.1.1
Done installing documentation for psych after 0 seconds
Updating racc
Fetching racc-1.7.1.gem
Building native extensions. This could take a while...
Successfully installed racc-1.7.1
Parsing documentation for racc-1.7.1
Installing ri documentation for racc-1.7.1
Done installing documentation for racc after 0 seconds
Parsing documentation for racc-1.7.1
Done installing documentation for racc after 0 seconds
Updating rake
Fetching rake-13.1.0.gem
Successfully installed rake-13.1.0
Parsing documentation for rake-13.1.0
Installing ri documentation for rake-13.1.0
Done installing documentation for rake after 0 seconds
Parsing documentation for rake-13.1.0
Done installing documentation for rake after 0 seconds
Updating rbs
Fetching rbs-3.2.2.gem
Building native extensions. This could take a while...
Successfully installed rbs-3.2.2
Parsing documentation for rbs-3.2.2
Installing ri documentation for rbs-3.2.2
Done installing documentation for rbs after 1 seconds
Parsing documentation for rbs-3.2.2
Done installing documentation for rbs after 0 seconds
Updating rexml
Fetching rexml-3.2.6.gem
Successfully installed rexml-3.2.6
Parsing documentation for rexml-3.2.6
Installing ri documentation for rexml-3.2.6
Done installing documentation for rexml after 1 seconds
Parsing documentation for rexml-3.2.6
Done installing documentation for rexml after 0 seconds
Updating rouge
Fetching rouge-4.2.0.gem
Successfully installed rouge-4.2.0
Parsing documentation for rouge-4.2.0
Installing ri documentation for rouge-4.2.0
Done installing documentation for rouge after 4 seconds
Parsing documentation for rouge-4.2.0
Done installing documentation for rouge after 3 seconds
Updating rss
Fetching rss-0.3.0.gem
Successfully installed rss-0.3.0
Parsing documentation for rss-0.3.0
Installing ri documentation for rss-0.3.0
Done installing documentation for rss after 1 seconds
Parsing documentation for rss-0.3.0
Done installing documentation for rss after 0 seconds
Updating sass-embedded
Fetching sass-embedded-1.69.5-x64-mingw-ucrt.gem
sass-embedded's executable "sass" conflicts with sass
Overwrite the executable? [yN]  n
ERROR:  Error installing sass-embedded:
        "sass" from sass-embedded conflicts with installed executable from sass
Updating stringio
Fetching stringio-3.0.8.gem
Building native extensions. This could take a while...
Successfully installed stringio-3.0.8
Parsing documentation for stringio-3.0.8
Installing ri documentation for stringio-3.0.8
Done installing documentation for stringio after 0 seconds
Parsing documentation for stringio-3.0.8
Done installing documentation for stringio after 0 seconds
Updating strscan
Fetching strscan-3.0.7.gem
Building native extensions. This could take a while...
Successfully installed strscan-3.0.7
Parsing documentation for strscan-3.0.7
Installing ri documentation for strscan-3.0.7
Done installing documentation for strscan after 0 seconds
Parsing documentation for strscan-3.0.7
Done installing documentation for strscan after 0 seconds
Updating syntax_suggest
Fetching syntax_suggest-1.1.0.gem
Successfully installed syntax_suggest-1.1.0
Parsing documentation for syntax_suggest-1.1.0
Installing ri documentation for syntax_suggest-1.1.0
Done installing documentation for syntax_suggest after 0 seconds
Parsing documentation for syntax_suggest-1.1.0
Done installing documentation for syntax_suggest after 0 seconds
Updating test-unit
Fetching test-unit-3.6.1.gem
Successfully installed test-unit-3.6.1
Parsing documentation for test-unit-3.6.1
Installing ri documentation for test-unit-3.6.1
Done installing documentation for test-unit after 0 seconds
Parsing documentation for test-unit-3.6.1
Done installing documentation for test-unit after 0 seconds
Updating timeout
Fetching timeout-0.4.0.gem
Successfully installed timeout-0.4.0
Parsing documentation for timeout-0.4.0
Installing ri documentation for timeout-0.4.0
Done installing documentation for timeout after 0 seconds
Parsing documentation for timeout-0.4.0
Done installing documentation for timeout after 0 seconds
Updating typeprof
Fetching typeprof-0.21.8.gem
Successfully installed typeprof-0.21.8
Parsing documentation for typeprof-0.21.8
Installing ri documentation for typeprof-0.21.8
Done installing documentation for typeprof after 1 seconds
Parsing documentation for typeprof-0.21.8
Done installing documentation for typeprof after 0 seconds
Updating uri
Fetching uri-0.12.2.gem
Successfully installed uri-0.12.2
Parsing documentation for uri-0.12.2
Installing ri documentation for uri-0.12.2
Done installing documentation for uri after 0 seconds
Parsing documentation for uri-0.12.2
Done installing documentation for uri after 0 seconds
Updating zeitwerk
Fetching zeitwerk-2.6.12.gem
Successfully installed zeitwerk-2.6.12
Parsing documentation for zeitwerk-2.6.12
Installing ri documentation for zeitwerk-2.6.12
Done installing documentation for zeitwerk after 0 seconds
Parsing documentation for zeitwerk-2.6.12
Done installing documentation for zeitwerk after 0 seconds
Gems updated: activesupport connection_pool tzinfo bigdecimal coffee-script-source csv debug dnsruby erb ethon execjs faraday faraday-net_http fileutils gemoji github-pages-health-check irb reline jekyll-avatar jekyll-coffeescript jekyll-default-layout jekyll-feed jekyll-github-metadata jekyll-relative-links jemoji nokogiri liquid mini_portile2 minitest net-imap net-smtp nkf octokit openssl psych racc rake rbs rexml rouge rss sass-embedded stringio strscan syntax_suggest test-unit timeout typeprof uri zeitwerk
```

:::

::: details `bundle update` 运行情况

```
$ bundle update

Fetching gem metadata from https://rubygems.org/..........
Resolving dependencies........
Using base64 0.1.1
Using ruby2_keywords 0.0.5
Using mutex_m 0.1.2
Using bundler 2.3.19
Using bigdecimal 3.1.4
Using concurrent-ruby 1.2.2
Using connection_pool 2.4.1
Using minitest 5.20.0
Using public_suffix 4.0.7
Using coffee-script-source 1.11.1
Using execjs 2.9.1
Using colorator 1.1.0
Using commonmarker 0.23.10
Using unf_ext 0.0.8.2
Using eventmachine 1.2.7
Using http_parser.rb 0.8.0
Using ffi 1.16.3 (x64-mingw-ucrt)
Using faraday-net_http 3.0.2
Using forwardable-extended 2.6.0
Using gemoji 3.0.1
Using rb-fsevent 0.11.2
Using rexml 3.2.6
Using drb 2.1.1
Using liquid 4.0.4
Using mercenary 0.3.6
Using rouge 3.26.0
Using safe_yaml 1.0.5
Using racc 1.7.1
Using jekyll-paginate 1.1.0
Using rubyzip 2.3.2
Using jekyll-swiss 1.0.0
Using unicode-display_width 1.8.0
Using webrick 1.8.1
Using i18n 1.14.1
Using tzinfo 2.0.6
Using addressable 2.8.5
Using coffee-script 2.4.1
Using unf 0.1.4
Using em-websocket 0.5.3
Using ethon 0.16.0
Using faraday 2.7.11
Using rb-inotify 0.10.1
Using pathutil 0.16.2
Using jekyll-commonmark 1.4.0
Using kramdown 2.3.2
Using terminal-table 1.8.0
Using activesupport 7.1.1
Using simpleidn 0.2.1
Using sawyer 0.9.2
Using typhoeus 1.4.0
Using sass-listen 4.0.0
Using listen 3.8.0
Using jekyll-coffeescript 1.1.1
Using kramdown-parser-gfm 1.1.0
Using dnsruby 1.70.0
Using octokit 4.25.1
Using sass 3.7.4
Using jekyll-watch 2.2.1
Using github-pages-health-check 1.17.9
Using jekyll-sass-converter 1.5.2
Using jekyll-gist 1.5.0
Using jekyll 3.9.3
Using jekyll-avatar 0.7.0
Using jekyll-commonmark-ghpages 0.4.0
Using jekyll-default-layout 0.1.4
Using jekyll-feed 0.15.1
Using jekyll-github-metadata 2.13.0
Using jekyll-include-cache 0.2.1
Using jekyll-optional-front-matter 0.3.2
Using jekyll-readme-index 0.3.0
Using jekyll-redirect-from 0.16.0
Using jekyll-relative-links 0.6.1
Using jekyll-remote-theme 0.4.3
Using jekyll-seo-tag 2.8.0
Using jekyll-sitemap 1.4.0
Using jekyll-titles-from-headings 0.5.3
Using jekyll-theme-architect 0.2.0
Using jekyll-theme-cayman 0.2.0
Using jekyll-theme-dinky 0.2.0
Using jekyll-theme-hacker 0.2.0
Using jekyll-theme-leap-day 0.2.0
Using jekyll-theme-merlot 0.2.0
Using jekyll-theme-midnight 0.2.0
Using jekyll-theme-minimal 0.2.0
Using jekyll-theme-modernist 0.2.0
Using jekyll-theme-primer 0.6.0
Using jekyll-theme-slate 0.2.0
Using jekyll-theme-tactile 0.2.0
Using jekyll-theme-time-machine 0.2.0
Using minima 2.5.1
Using nokogiri 1.15.4 (x64-mingw-ucrt)
Using html-pipeline 2.14.3
Using jekyll-mentions 1.6.0
Using jemoji 0.12.0
Using github-pages 228
Bundle updated!
```

:::

## 成功运行本地服务器

使用 `bundle exec jekyll serve` 即可运行本地服务器

::: details `bundle exec jekyll serve`

```
$ bundle exec jekyll serve

Configuration file: Y:/repositories/Github-Repos/online-cv/_config.yml
            Source: Y:/repositories/Github-Repos/online-cv
       Destination: Y:/repositories/Github-Repos/online-cv/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 2.128 seconds.
  Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
 Auto-regeneration: enabled for 'Y:/repositories/Github-Repos/online-cv'
    Server address: http://0.0.0.0:4000
  Server running... press ctrl-c to stop.
```

:::

在浏览器中打开 `http://localhost:4000/` 即可预览编辑。

![localhost](https://cdn.tangjiayan.com/notes/web-build/jekyll/jekyll-cv/localhost.png)

编辑好了 push 到 GitHub 就行了。

求职中往往需要 `pdf` 格式的文件，HTML 转 PDF 的在线工具有很多，试了好几个，觉得 [这个](https://www.sejda.com/html-to-pdf) 好用些，它能生成完整的一大长页的 pdf。
