# XAMPP - phpmyadmin：Error establishing a database connection

## BUG

参见 [Windows 本地 Wordpress CMS 搭建]，打开本地 wordpress 界面，提示 `Error-establishing a database connection`

<figure><img src="https://cdn.tangjiayan.com/notes/web-build/debug/error-establishing/1-error-establishing.png" alt="" width="600"><figcaption></figcaption></figure>

打开 `http://localhost/phpmyadmin/` phpMyAdmin 界面，提示

```
The phpMyAdmin configuration storage is not completely configured, some extended features have been deactivated. Find out why.
Or alternately go to 'Operations' tab of any database to set it up there.
```

<figure><img src="https://cdn.tangjiayan.com/notes/web-build/debug/error-establishing/find-out-why.png" alt="" width="800"><figcaption></figcaption></figure>

点击 `Find out why`，提示

```
phpMyAdmin configuration storage

Configuration of pmadb… not OK Documentation
General relation features Disabled

Create a database named 'phpmyadmin' and setup the phpMyAdmin configuration storage there.
```

<figure><img src="https://cdn.tangjiayan.com/notes/web-build/debug/error-establishing/pmadb-not-ok.png" alt="" width="650"><figcaption></figcaption></figure>

## 解决

不知道是哪一步生效的。

1. `Databases` → `mysql` / `phpmyadmin` / `wordpress` → `Check all` → `Repair table`
2. `User accounts` → `pma` / `wordpress` → `Edit privileges` → `Check all` → `Go`
3. 运行 `\xampp\mysql\bin\mysql_upgrade.exe`

## 参考

* [Fix “Configuration of pmadb… not OK” in phpMyAdmin | by Eneko | enekochan | Medium](https://medium.com/enekochan/fix-configuration-of-pmadb-not-ok-in-phpmyadmin-9340cb604f2d)
* [mysql - #1030 - Got error 176 "Read page with wrong checksum" from storage engine Aria - Stack Overflow](https://stackoverflow.com/questions/60864367/1030-got-error-176-read-page-with-wrong-checksum-from-storage-engine-aria)
* [How repair corrupt xampp 'mysql.user' table? - Stack Overflow](https://stackoverflow.com/a/73564645/20834092)
