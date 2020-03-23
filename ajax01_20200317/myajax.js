window._ = {
    get: function (url, config, callback) {
        var httpRequest;
        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }


        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4) {
                if (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304) {
                    callback(JSON.parse(httpRequest.responseText), null);
                } else {
                    callback(null, new Error("请求错误"));
                }
            }
        }


        httpRequest.open("get", url + "?" + _.jsonToUrl(config), true);
        httpRequest.send(null);
    },
    post: function (url, config, callback) {

    },
    jsonToUrl: function (jsObj) {
        var res = [];
        for (var k in jsObj) {
            res.push(k + "=" + jsObj[k])
        }
        return res.join("&");
    }
}