# CAA 类型解析记录会影响 SSL 证书的申请

之前七牛云图床 [cdn](https://en.wikipedia.org/wiki/Content\_delivery\_network) 域名 `cdn.tangjiayan.com` 的 SSL 证书到期了，试了好几次在七牛云申请 `TrustAsia DV` 和在阿里云申请 `Digicert DV`， 都没申请成功。

Google 了一下，参考 [申请SSL证书一直无法通过DNS验证的问题](https://www.tangruiping.com/post/ssl-certificate-dns.html)，将 `tangjiayan.com` DNS 记录中的 CAA 记录暂停解析，然后就申请成功了。

<figure><img src="https://cdn.tangjiayan.com/notes/default/CAA-record.png" alt=""><figcaption></figcaption></figure>

[CAA](https://en.wikipedia.org/wiki/DNS\_Certification\_Authority\_Authorization)，全称 <span style="color:red;">C</span>ertification <span style="color:red;">A</span>uthority <span style="color:red;">A</span>uthorization，证书颁发机构授权。

CAA 类型记录的作用是域名持有者向 [CA](https://en.wikipedia.org/wiki/Certificate\_authority)（证书颁发机构）表明他们是否有权为特定域名颁发数字证书。

一条 CAA 记录由三部分组成，如 `0 issue "letsencrypt.org"`：

* `0`：flag。未来才会用到，在那之前都是 `0`。
* `issue`：tag。`issue` 表示「域名持有者授权 `value` 机构颁发证书」。
* `value`：与 tag 相关联的值，`issue` tag 下，value 就是 CA 的网址。

`0 issue "letsencrypt.org"` 表示只授权 [letsencrypt.org](https://letsencrypt.org/) 机构颁发证书。

`0 issue ";"` 则表示允许任何 CA 颁发证书。
