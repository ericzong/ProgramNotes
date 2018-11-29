# API

## 变量

```js
pm.globals
pm.environment
pm.variables
// --- xxx: above 3
xxx.get('key')
xxx.set('key', 'value')
// clear
xxx.unset('key')
```

## 请求对象

```js
pm.request.url
pm.request.headers
```

## 响应消息

```js
pm.response.code
pm.response.reason()
pm.response.headers
pm.response.responseTime
pm.response.text()
pm.response.json()
```

## Assert

```js
// 字符串包含
pm.expect('all').to.include('part')
// 数组包含
pm.expect('actual').to.be.oneOf(expected_array)
// 比较
pm.expect('actual').to.eql('expected')
pm.expect('actual').to.be.below('expected')
// --- status
pm.response.to.have.status('code or reason')
// 1XX
pm.response.to.be.info
// 2XX
pm.response.to.be.success
// 3XX
pm.response.to.be.redirection
// 4XX
pm.response.to.be.clientError
// 5XX
pm.response.to.be.serverError
// 4XX or 5XX
pm.response.to.be.error
// 200
pm.response.to.be.ok
// 202
pm.response.to.be.accepted
// 400
pm.response.to.be.badRequest
// 401
pm.response.to.be.unauthorized
// 403
pm.response.to.be.forbidden
// 404 
pm.response.to.be.notFound
// 429
pm.response.to.be.rateLimited
// --- header
pm.response.to.have.header('header-name', 'optionalValue')
// --- body
pm.response.to.be.withBody;
pm.response.to.be.json;
pm.response.to.have.body('response_body_string')
pm.response.to.not.have.jsonBody('response_body_string');
```

# 示例

## 状态

```js
// response is ok
pm.response.to.have.status(200);
```

## 响应消息

```js
// contain
pm.expect(pm.response.text()).to.include('search_text');
// equal
pm.response.to.have.body('response_body_string');
// header
pm.response.to.have.header("Content-Type")

// JSON validate
var schema = {
  "type": "object",
  "properties": {
      "totalRecord": "integer",
      "data": "Array"
  },
  "required": ["totalRecord", "data"]
};
pm.test('The totalRecord and data properties required for response object', function() {
  pm.expect(tv4.validate(pm.response.json(), schema)).to.be.true;
});
```

