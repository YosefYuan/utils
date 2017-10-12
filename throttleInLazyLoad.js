$(function () {
    lazyLoad('pr');
    pvuv("pageview");
    $(".pr a").each(function () {
        $(this).bind("click", function () {
            var labelId = $(this).data("labelid");
            if (!!labelId) {//有labelid才进行tracking
                gaTracker("Truemetrics.send", "event", "U8", "PC", labelId);
                pvuv(labelId);
            }
        })
    })
    //changeSrc遍历block动态更换src
    function changeSrc(sectionBlockName) {
        var wH = $(window).height();
        var sH = $(window).scrollTop();
        var scrollFnFlag = false;//设立监测onscroll事件开关 初始值为false
        $('.' + sectionBlockName).each(function () {
            if ($(this).attr('isChangeSrc') == "false") {//遍历所有的block看是否已经更换 false即等待动态更换 true即完成
                scrollFnFlag = true;//如果还有没被动态changeSrc的block即继续允许onscroll
                if ($(this).offset().top <= (sH + wH)) {
                    var pageId = $(this).data("pageid");//根据gapMAP抓取添加页面深度id
                    if (!!pageId) {
                        console.log("现在是page" + pageId);
                        gaTracker('Truemetrics.send', 'event', 'U8', 'PC', ('pageview/p' + pageId), { nonInteraction: true });
                    }
                    var dataSrc = $(this).find("img").attr('datasrc');
                    $(this).find("img").eq(0).attr('src', dataSrc);
                    $(this).attr('isChangeSrc', true);
                }
            }
        })
        //如果遍历完成src已经全部被更换即清除onscroll
        if (!scrollFnFlag) {
            console.log('页面图片全部加载完毕');
            window.onscroll = null;
        }
    }
    //节流函数作用：为了避免大量onscroll造成性能问题
    /*实现思路：throttle 被调用后返回的 function 才是真正的 onscroll 触发时需要调用的函数 用了闭包避免了变量冲突
    正常滚动情况下直接延迟加载即可；但是还有一种情况需要考虑即当用户不断滚动的时候也要在一定的时间段内触发函数
    参数说明如下：
     * @param Function fn 延时调用函数
     * @param Number delay 延迟多长时间
     * @param Number atleast 至少多长时间触发一次
     * @return Function 延迟执行的方法*/
    function throttle(fn, delay, atleast) {
        var timer = null;
        var previous = null;
        return function () {
            var now = +new Date();
            if (!previous) previous = now;
            if (atleast && now - previous > atleast) {
                fn();
                previous = now; //重置上一次开始时间为本次结束时间
                clearTimeout(timer);
            } else {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn();
                    previous = null;
                }, delay);
            }
        }
    }
    //lazyLoad懒加载执行函数
    function lazyLoad(sectionBlockName) {
        changeSrc(sectionBlockName);
        window.onscroll = throttle(changeSrc.bind(null, sectionBlockName), 50, 200);
    }

    //Start of DoubleClick Floodlight Tag: Please do not remove
    function pvuv(lablename) {
        //FL PV
        var axel = Math.random() + "";
        var a = axel * 10000000000000;
        var flDiv = document.body.appendChild(document.createElement("div"));
        flDiv.setAttribute("id", "DCLK_FLDiv1");
        flDiv.style.position = "absolute";
        flDiv.style.top = "0";
        flDiv.style.left = "0";
        flDiv.style.width = "1px";
        flDiv.style.height = "1px";
        flDiv.style.display = "none";
        flDiv.innerHTML = '<iframe src="http://4233034.fls.doubleclick.net/activityi;src=4233034;type=ultim0;cat=shu200;u2=SHU;u3=http://www.shuuemura.com.cn/shuuemura/_zh/_cn/landing/u8/index.aspx;u4=PC;u5=' + lablename + ';ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>';

        //FL UV
        var axel = Math.random() + "";
        var a = axel * 10000000000000;
        var flDiv2 = document.body.appendChild(document.createElement("div"));
        flDiv2.setAttribute("id", "DCLK_FLDiv2");
        flDiv2.style.position = "absolute";
        flDiv2.style.top = "0";
        flDiv2.style.left = "0";
        flDiv2.style.width = "1px";
        flDiv2.style.height = "1px";
        flDiv2.style.display = "none";
        flDiv2.innerHTML = '<iframe src="http://4233034.fls.doubleclick.net/activityi;src=4233034;type=ultim0;cat=shu2000;u2=SHU;u3=http://www.shuuemura.com.cn/shuuemura/_zh/_cn/landing/u8/index.aspx;u4=PC;u5=' + lablename + ';ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>';
    }
    //End of DoubleClick Floodlight Tag: Please do not remove
});
