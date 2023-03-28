# GitHub_Search

这是一个使用React实现的GitHub_Search案例

### `npm start`

### `node server.js`

由于当多次频繁调用接口时，可能会出现401(未授权错误)。

server文件夹里面是一个5000端口号的服务器。里面有两个接口，一个真实接口，一个伪造接口

请求github真实数据请访问：http://localhost:5000/search/users
请求本地模拟数据请访问：http://localhost:5000/search/users2

(当访问出错时，可以使用伪造接口，不管搜索什么，返回的都是固定人物信息)，因为本案例主要练习发送网络请求。

## 配置代理

##### `setupProxy.js`

```js
const {createProxyMiddleware}=require("http-proxy-middleware");
module.exports=function(app) {
    app.use(
        createProxyMiddleware("/api",{
            target:"http://localhost:5000",
            changeOrigin:true,
            pathRewrite:{"^/api":""},
        })
    )
}
```

