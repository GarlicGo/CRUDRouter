# CRUDRouter API v2.1

## 增

+ METHOD : POST
+ 格式 :

    ```http
        ROOT_URL/api/${表名}
    ```

+ 请求示例（jqAjax） :

    ```js
        $.ajax({
            type: "post",
            url: rootUrl+`/${表名}`,
            data: {
                /*
                    mode（插入模式，选填）:
                        'single'（默认）: 插入单个条目;
                        'multiple': 插入多个条目,
                    doc（插入条目，'single'模式下，必填，对象）,
                    docs（插入的条目组，'multiple'模式下，必填，对象数组）,
                    options（执行参数，选填）: 默认为 {}
                */
                mode: 'single',
                doc: {
                    /* 键值对 */
                }
            },
            dataType: "json",
            /* other */
        });
    ```

## 删

+ METHOD : DELETE
+ 格式 :

    ```http
        ROOT_URL/api/${表名}/${_id}
    ```

+ 请求示例（jqAjax） :

    ```js
        $.ajax({
            type: "delete",
            url: rootUrl+`/${表名}/${_id}`,
            /* other */
        });
    ```

## 改

+ METHOD : PUT
+ 格式1 :

    ```http
        ROOT_URL/api/${表名}
    ```

+ 格式2 :

    ```http
        ROOT_URL/api/${表名}/${_id}
    ```

+ 请求示例（jqAjax） :

    ```js
        $.ajax({
            type: "put",
            url: rootUrl+`/${表名}`,
            data: {
                /*
                    mode（插入模式，选填，字符串）:
                        'single'（默认）: 更新过滤后的第一个条目;
                        'multiple': 更新过滤后的所有条目,
                    filter（过滤条件，选填，对象）: 默认为{},
                    update（更新字段，必填，对象）,
                    options（执行参数，选填，对象）: 默认为{}
                */
                mode: 'single',
                filter: {
                    /* 键值对 */
                },
                update: {
                    /* 键值对 */
                }
            },
            dataType: "json",
            /* other */
        });

        $.ajax({
            type: "put",
            url: rootUrl+`/${表名}/${_id}`,
            data: {
                update: {
                    /* 键值对 */
                }
            },
            dataType: "json",
            /* other */
        });
    ```

## 查

+ METHOD : GET
+ 格式1 :

    ```http
        ROOT_URL/api/${表名}
    ```

+ 格式2 :

    ```http
        ROOT_URL/api/${表名}/${_id}
    ```

+ 请求示例（jqAjax） :

    ```js
        $.ajax({
            type: "get",
            url: rootUrl+`/${表名}`,
            data: {
                /*
                    filter（过滤条件，选填，对象字符串）: 默认为{},
                    projection（返回字段，选填，对象字符串）:
                        {}（默认）: 返回查询到条目的所有字段;
                        {field1: true}: 仅返回查询条目的field1字段;
                        {filed1: true, field2: true}: 仅返回查询条目的field1和field2字段;
                        {field1: false}: 返回查询条目除field1的所有字段;
                        {filed1: true, field2: true}: 返回查询条目除field1和field2的所有字段;
                        ...
                    注：因为get请求无法真正传递json格式的数据，因此这里一定要使用JSON.stringify()将对象转化为对象字符串传递给后端解析
                */
                filter: JSON.stringify({
                    /* 键值对 */
                })
                projection: JSON.stringify({})
            },
            dataType: "json",
            /* other */
        });

        $.ajax({
            type: "get",
            url: rootUrl+`/${表名}/${_id}`,
            data: {
            },
            dataType: "json",
            /* other */
        });
    ```
