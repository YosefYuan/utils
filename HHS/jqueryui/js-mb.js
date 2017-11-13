$(function () {
	$(".dragable").draggable();
    $(".dragable").resizable();
    
    //通過圖片名字判斷是PC or MB
    function judgeDeviceByImgName(){
        var src = $('img:first').attr('src');
        var judgeStr = "/m_";
        return (src.indexOf(judgeStr) < 0) ? true : false;
    } 

    var deviceFlag = judgeDeviceByImgName();//true: 表示PC; false: 表示MB

    //根據圖片適配設備 設置容器顯示樣式 
    function showStyleByDevice(){
        var wrapper = $('.area');
        deviceFlag ? wrapper.addClass('PC') :wrapper.addClass('MB');
    }
    showStyleByDevice();
    
	//獲得圖片數量 
	var allPartNum = 0,
        allPartHeight = [];
        
	setTimeout(function () {
		var num = $('img').length;
		for (var i = 0; i < num; i++) {
			var _height = ($('img:eq(' + i + ')').height());
			if (_height !== 0) {
				allPartNum++;
				allPartHeight.push(".part" + (i + 1) + "{height:" + (_height/100).toFixed(2) + "em}");
			} else {
				return;
			}
		}
	}, 500);
	function formatNumAndPX(val){
		return(parseInt(val) + 'px');
	}
	$(".dragable").dblclick(function (e) {
		var index = $(this).parent().attr('data-index');
		$("#showposi").css({ "left": "200px", "top": e.pageY + 50 });
		$("#showposi").show();
		var thistop = parseFloat($(this).css("top")),
            thisleft = parseFloat($(this).css("left")),
            thisw = parseFloat($(this).css("width")),
            thish = parseFloat($(this).css("height"));

        //-------parent w and h---------
		var thispar_w = parseFloat($(this).parent().css("width")),
		    thispar_h = parseFloat($(this).parent().css("height"));

        //---------得到百分比------
        var cur_w = ((thisw / thispar_w) * 100).toFixed(2),
            cur_h = ((thish / thispar_h) * 100).toFixed(2);

        var cur_top = ((thistop / thispar_h) * 100).toFixed(2),
            cur_left = ((thisleft / thispar_w) * 100).toFixed(2);

        var curposivPC = 'part' + index + '  top:' + thistop + ';left:' + thisleft + ';width:' + thisw + ';height:' + thish + ';';
        var curposivMB = 'part' + index + '  top:' + cur_top + '%;left:' + cur_left + '%;width:' + cur_w + '%;height:' + cur_h + '%';
        var curposiv;
        curposiv = deviceFlag ? curposivPC : curposivMB;
		$("#showposivalue").val(curposiv);
	});
	$("#showposiclose").click(function () { $("#showposi").hide(); });

	//去重函數
	function unique(arr) {
		return Array.from(new Set(arr))
	}

	//檢查對象是否為空
	function isEmptyObj(obj) {
		for (var i in obj) {
			return false;
		}
		return true;
    }
    
	var styleDataArr = [];

	//緩存樣式數組
	var twoArr = [];
	var arrKey = [];
	var arrVal = [];
	var styleObj = {};

	$('#showposiclose').click(function () {
		var styleData = $('#showposivalue').val();
		styleDataArr.push(styleData);
	})

	$("#showStyleData").click(function () {

		var html = '',
			html1 = '',
			html2 = '';

		for (var i1 = 0; i1 < allPartHeight.length; i1++) {
			html1 = allPartHeight.join("<br>") + "<br><br>"
		}
		var formatStyleDataArr = unique(styleDataArr);
		for (var i2 = 0; i2 < formatStyleDataArr.length; i2++) {
			var onestyleData = formatStyleDataArr[i2].split("  ");
			twoArr.push(onestyleData);
		}
		for (var i3 = 0; i3 < twoArr.length; i3++) {
			arrKey.push(twoArr[i3][0]);
			arrVal.push(twoArr[i3][1]);
		}
		for (var i4 = 0; i4 < arrKey.length; i4++) {
			if (!styleObj[arrKey[i4]]) {
				styleObj[arrKey[i4]] = [];
				styleObj[arrKey[i4]].push(arrVal[i4]);
			} else {
				styleObj[arrKey[i4]].push(arrVal[i4]);
				unique(styleObj[arrKey[i4]]);
			}
		}
		// if (isEmptyObj(styleObj)) return;
		for (var arr in styleObj) {
			var start = '.' + arr + ' .demolink-------';
			unique(styleObj[arr]);
			for (var i5 = 0; i5 < styleObj[arr].length; i5 ++){
				html2 += start + (i5 + 1) + "{" + styleObj[arr][i5] + "}<br>";
			}
		}
		console.log(html2);

		html = html1 + html2;
		$('#styleData').html(html);
	})
});