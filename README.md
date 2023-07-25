# WeOps Framework Web
![](https://wedoc.canway.net/imgs/img/嘉为蓝鲸.jpg)

> 嘉为蓝鲸WeOps基础框架前端源码

#### 更多问题欢迎添加“小嘉”微信，加入官方沟通群
![](https://wedoc.canway.net/imgs/img/小嘉.jpg)

# 嘉为蓝鲸WeOps基础前端框架使用说明

## 开发使用

### 框架目录
```markdown
├── build # 构建相关
├── config # 配置相关
├── src  # 源代码
│    ├── api # 所有请求（请求封装 + 请求定义）
│    ├── assets # 静态文件
│    ├── common # 公用方法定义
│    ├── components # 全局UI组件
│    ├── controller # 控制器
│    ├── directive # 指令
│    ├── fiter # 过滤器
│    ├── microRouter # 所有projects子应用资源注册的路由合并
│    ├── projects # 自定义添加应用代码
│    ├── router # 路由
│    ├── store # 全局store管理
├── App.vue # 入口文件
├── main.ts # 入口 加载组件 初始化等
├── static  # 静态资源
│    ├── css # css
│    ├── js # js
├── .babelrc                   # babel-loader 配置
├── eslintrc.js                # eslint 配置项
├── eslintignore               # eslint 忽略项
├── .gitignore                 # git 忽略项
├── stylelintrc.js             # stylelintrc 配置项
├── index-dev.html             # 本地调试入口文件
├── index.html                 # html模板
└── package.json               # package.json
```

### 分支管理

- main

main 是主分支。

### 开发

#### 快速上手

```shell
# 克隆项目
git clone https://github.com/herozhou/vue-framework-wz.git

# 安装依赖
npm install --registry=https://registry.npm.taobao.org

// or 使用cnpm代替npm来进行依赖安装

npm install -g cnpm --registry=https://registry.npm.taobao.org

# 安装依赖
npm install

# 服务启动
npm run dev

# 生产环境build
npm run build
```
如果想知道相关的[底层工作原理](http://vuejs-templates.github.io/webpack/) 、 [vue-loader 相关文档](http://vuejs.github.io/vue-loader) 和 [开发示例指引](docs/use.md)



