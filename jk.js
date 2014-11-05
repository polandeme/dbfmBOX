/* @命名  _ 私有变量 * 驼峰变量命名 * 下划线函数命名 * 末尾 _A数组
 * 
 */ 

(function() {
    var jk = function(el) {
        return  new jk.prototype.init(el);
    };
    /* 
     * To Do
     * 一些jk内部使用的方法待完善，参考jq extend
     * 2014/10/13 22:10:21
     */
       
      
    jk.prototype = {
        element: [], // 全局变量 获取的元素的数组
        init: function(el) {
            //el_flag: 判断是id,class,tag 
            if(!el) {
                return this;
            }
            var el_flag;
            el_flag = el[0];
            this.element = [];
            if(el_flag === '#') {
                el = el.slice(1);
                el = document.getElementById(el);
                this.element.push(el);
            } else if(el_flag === '.') {
                el = el.slice(1);
                el = document.getElementsByClassName(el);
                for(var i = 0; i < el.length; i++) {
                    this.element.push(el[i]);
                }
            } 
            return this;
        },

        click: function(callback) {
            var el = this.element;
            this.each(el, callback, 'click');
            return this;
        },
        mover: function(callback) {
            var el = this.element;
            this.each(el, callback, 'mouseover');
            return this;
        },
        mout: function(callback) {
            var el = this.element; 
            this.each(el, callback, 'mouseout');
            return this;
        },
        hover: function(c, d) {
            var el = this.element;
            return this.mover(c).mout(d);
        },
        // el: elements Array, e: event
        each: function(el, callback, e) {
            for(var i = 0; i<this.element.length; i ++) {
                this.element[i].addEventListener(e, callback, false);
            }
        },
        html: function(html) {
            var self = this;
            function get_html() {
                var html = '';
                var html_tmp = '';
                for(var i = 0; i < self.element.length; i++) {
                    html_tmp += self.element[i].innerHTML;//.nodeValue;
                    if(html_tmp === 'undefined'){
                        html_tmp = '';
                    }
                    html += html_tmp;
                    html_tmp = '';
                }
                return html;
            }
            function change_html(html) {
                for(var i = 0; i < self.element.length; i++) {
                    self.element[i].innerHTML = html;//.nodeValue;
                }
            }
            html ? change_html(html) : get_html();
        },
        text: function(text) {
            var self = this;
            // 得到text
            var change_text = function (text) {
                for(var i = 0; i < self.element.length; i++) {
                    self.element[i].firstChild.nodeValue = text;
                    }
                    return;
                }
            // 改变text 
            // To Do: 多层？
            var get_text = function () {
                console.log('ddddd');
                var text = '';
                var text_tmp = '';
                for(var i = 0; i < self.element.length; i++) {
                    text_tmp += self.element[i].firstChild.nodeValue;
                    if(text_tmp === 'undefined') {
                        text_tmp = ''
                    }
                    text += text_tmp;
                    text_tmp = '';
                }
                return text;
            }
            text ? change_text(text) : get_text();
        },
        // dom_each: function() {
        //     // for(var i = 0; i < this.element.length; i++) {
        //     //     this.element[i].dom
        //     // }
        // },
        value: function() {
            
        },
        css: function(obj) {
            var el = this.element;
            var obj_length = Object.getOwnPropertyNames(obj).length;
            // var attr = this.o2a(obj);
            // To Do 循环嵌套，效率，封装循环
            //
            for(key in obj) {
                el.forEach(function(value, i) { // forEach 不支持 7 、8
                    el[i].style[key] = obj[key];
                });
            }
            return this;
        },
        o2a: function(o) {
             var a = [];
             for(var key in o) {
                a.push({key: o[key]});
             }
             return a;
        },
        // 显示效果
        toggle: function() {
            var el = this.element;
            var self = this;
            var c_s;
            el.forEach(function(value, i) {
                c_s = self._get_style('display', el[i]);
            });
            var n_s = (c_s === 'block') ? 'none' : 'block';
            self.css({'display': n_s});
            return this;
        },
        // 得到特定css值
        _get_style: function(attr,el) {
            // var el = this.element;
            // console.log(el);
           return window.getComputedStyle(el, null)[attr];
        },
        //hide method use display
        hide: function() {
            var el = this.element;
            el.forEach(function(value, i) {
                el[i].style.display = 'none';
            })
        },
        // remove node 
        remove: function() {
            var el = this.element;
            var oldNode_A = [];
            var parentNode, oldNode;
            el.forEach(function(value, i) {
                parentNode = el[i].parentNode || null;
                oldNode = parentNode.removeChild(el[i]); 
                oldNode_A.push(oldNode_A);
            });
            return oldNode_A;
        },

        // get the index of array
        index: function() {
            var el = this.element;
       },
        //To Do: index, eq method;
        //scoll event
        // To Do: e.type 
        // _call_event: function(e) {
        //     var el = this.element;
        //     el.forEach(function(value, i) {
        //         // el.
        //     });
        // },
        // event_type: function(e) {
        //     return e.type;
        // }

        // Ajax 
        // url, data, dataType, cache, header, success, error;
        //
        ajax: function(data) {
            var request = new XMLHttpRequest();

            var _data = data.data || null;

            request.open(data.type, data.url);

            if(!!data.header) { // 存在header则设置
                request.setRequestHeader(data.header);
            }
            // wait
            request.onreadystatechange = function() {

                data.wait() || ''; 

                if(request.readyState === 4 && request.status === 200) {
                    var type = request.getResponseHeader('Content-Type');
                    if(type === 'application/json') {
                        data.success(JSON.parse(request.responseText)); 
                    } else {
                        data.success(request.responseText);
                        console.log('not json');
                    }
                } else{
                    return request.status;
                }
            };
            request.send(_data, data.Async || true);
        }

    };
    jk.prototype.init.prototype = jk.prototype;

    window.$ = window.jk = jk;
})();

