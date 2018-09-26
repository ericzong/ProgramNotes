# 安装

```shell
npm install --save-dev jest-puppeteer puppeteer jest
```

# 使用

更新 Jest 配置：

```json
  "jest": {
    "preset": "jest-puppeteer",
    ...
  ｝
```

# 常用功能

## debug

```javascript
await jestPuppeteer.debug()
```



# 参考

[官方 Github](https://github.com/smooth-code/jest-puppeteer)