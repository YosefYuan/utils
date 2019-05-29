//设置父容器 fontSize 使用em单位 START 
function UseEm(mbContainerName) {
    this.mbContainerName = mbContainerName;
}
UseEm.prototype = {
    setFontSize: function () {
        var wrapperEle = document.getElementsByClassName(this.mbContainerName)[0];
        if (wrapperEle == undefined) return 'undo';
        var wrapperWidth = parseFloat(window.getComputedStyle(wrapperEle).getPropertyValue("width")),
            num = wrapperWidth * 10 / 64;
        wrapperEle.style.fontSize = num + 'px';
    },
    addEvent: function () {
        var flag = this.setFontSize(this.mbContainerName),
            dynamicSetFontSize = this.setFontSize.bind(this, this.mbContainerName);
        if (flag !== 'undo') {
            if (window.onresize != null) {
                var fn = window.onresize;
                window.onresize = function () {
                    fn();
                    dynamicSetFontSize();
                };
            } else {
                window.onresize = dynamicSetFontSize;
            }
        }
    }
};
var useEm = new UseEm('pro_mobile');
useEm.setFontSize();
useEm.addEvent();
//设置父容器 fontSize 使用em单位 END

$(function () {
    // lazyLoad START
    function LazyLoad(pcContainerName, mbContainerName, lazyloadImgClsName) {
        this.pcContainerName = pcContainerName;
        this.mbContainerName = mbContainerName;
        this.lazyloadImgClsName = lazyloadImgClsName;

    }

    LazyLoad.prototype = {
        // jude the scroll location 
        judgeScollLocation: function (obj) {
            var windowScrollHeight = $(window).scrollTop(),
                windowHeight = $(window).height(),
                eleScrollHeight = obj.offset().top;
            if (eleScrollHeight <= windowScrollHeight + windowHeight * 1.5) {
                return true;
            }
        },

        // throttle节流函数
        throttle: function (fn, delay, atleast) {
            var timer = null,
                previous = null;
            return function () {
                var now = +new Date();
                // alert(now);
                if (!previous) previous = now;
                if (!atleast) atleast = 1000;
                if (now - previous > atleast) {
                    fn();
                    // 重置上一次开始时间为本次结束时间
                    previous = now;
                    clearTimeout(timer);
                } else {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        fn();
                        previous = null;
                    }, delay);
                }
            };
        },

        // Mobile 修改src（从data-src赋值）
        changeSrc: function () {
            var that = this;
            if ($('.' + that.pcContainerName).is(':visible')) {
                $('.' + that.pcContainerName + ' .' + that.lazyloadImgClsName).each(function () {
                    var _this = $(this);
                    var _src = _this.attr('data-src');
                    if (that.judgeScollLocation(_this)) {
                        _this.attr('src', _src);
                    }
                });
            } else {
                $('.' + that.mbContainerName + ' .' + that.lazyloadImgClsName).each(function () {
                    var _this = $(this);
                    var _src = _this.attr('data-src');
                    if (that.judgeScollLocation(_this)) {
                        _this.attr('src', _src);
                    }
                });
            }
        },

        // 滚动触发src更改 节流并实现 lazyload
        addEvent: function (eventName) {
            var fn1 = this.changeSrc.bind(this),
                throttleFunc = this.throttle(fn1, 500, 1000);
            if (window['on' + eventName] != null) {
                var fn = window['on' + eventName];
                window['on' + eventName] = function () {
                    fn();
                    throttleFunc();
                };
            } else {
                window['on' + eventName] = throttleFunc;
            }
        }
    };

    var lazyload = new LazyLoad('pro', 'pro_mobile', 'ld');
    lazyload.changeSrc();
    lazyload.addEvent('scroll');
    lazyload.addEvent('resize');
});