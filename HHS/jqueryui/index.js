$(function () {
	// 默认每部分排序前缀
	var prefix = 'part';
	//默认图片数量 
	var len = 30;
	for (var i = 0; i < len; i++) {
		//add pr
		var htmls = '<div class="pr" data-index="' + (i + 1) + '" data-count="' + 1 +
			'"> <img src="" title="" alt=""></div>';
		$('.area').append(htmls);
	}

	$('.pr').each(function (i) {
		//add src
		var count = ('0' + (i + 1)).slice(Math.min(-2, -(i + 1).toString().length));
		$(this).find('img:first').attr('src', src + count + '.jpg');
		//add dragable
		var dragCount = $(this).data('count');
		for (var i = 0; i < dragCount; i++) {
			var html = '<div class="dragable"></div>'
			$(this).append(html);
		}
	})

	$(".dragable").draggable();
	$(".dragable").resizable();

	//通過圖片名字判斷是PC or MB
	function judgeDeviceByImgName() {
		var src = $('img:first').attr('src');
		var judgeStr = /\/m[\S]{1,3}\.(png|jpg|gif|bmp)$/gi;
		return !src.match(judgeStr);
	}

	var deviceFlag = judgeDeviceByImgName(); //true: 表示PC; false: 表示MB

	//根據圖片適配設備 設置容器顯示樣式 
	function showStyleByDevice() {
		var wrapper = $('.area');
		deviceFlag ? wrapper.addClass('PC') : wrapper.addClass('MB');
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
				if (deviceFlag) {
					allPartHeight.push("." + prefix + (i + 1) + "{height:" + _height + "px;}");
				} else {
					allPartHeight.push("." + prefix + (i + 1) + "{height:" + (_height / 100).toFixed(2) + "em;}");
				}
			} else {
				$('.pr:eq(' + i + ')').addClass('removeEle');
			}
		}
		$('.removeEle').remove();
	}, 20);

	$(".dragable").dblclick(function (e) {
		var index = $(this).parent().attr('data-index');
		$("#showposi").css({
			"left": "200px",
			"top": e.pageY + 50
		});
		$("#showposi").show();
		var thistop = parseInt($(this).css("top")),
			thisleft = parseInt($(this).css("left")),
			thisw = parseInt($(this).css("width")),
			thish = parseInt($(this).css("height"));

		//-------parent w and h---------
		var thispar_w = parseInt($(this).parent().css("width")),
			thispar_h = parseInt($(this).parent().css("height"));

		//---------得到百分比------
		var cur_w = ((thisw / thispar_w) * 100).toFixed(2),
			cur_h = ((thish / thispar_h) * 100).toFixed(2);

		var cur_top = ((thistop / thispar_h) * 100).toFixed(2),
			cur_left = ((thisleft / thispar_w) * 100).toFixed(2);

		var curposivPC = prefix + index + '  top:' + thistop + 'px;left:' + thisleft + 'px;width:' + thisw + 'px;height:' + thish + 'px;',
			curposivMB = prefix + index + '  top:' + cur_top + '%;left:' + cur_left + '%;width:' + cur_w + '%;height:' + cur_h + '%;',
			curposiv;
		curposiv = deviceFlag ? curposivPC : curposivMB;
		$("#showposivalue").val(curposiv);
	});


	//去重函數
	function unique(arr) {
		return Array.from(new Set(arr))
	}

	var styleDataArr = [],
		uniqueStyleDataArr = [];
	$('#pushPosiData').click(function () {
		$("#showposi").hide();
		var styleData = $('#showposivalue').val();
		styleDataArr.push(styleData);
		uniqueStyleDataArr = unique(styleDataArr);
	})
	$('#deleteLastStyle').click(function () {
		$("#showposi").hide();
		if (uniqueStyleDataArr.length < 1) {
			alert("暂无数据");
			return;
		};
		var lastData = uniqueStyleDataArr[uniqueStyleDataArr.length - 1];
		$('#showDelContent').val(lastData);
		$("#showDel").show();
		$(".mask").show();
	})

	$('#deleteAfirm').click(function () {
		$("#showDel").hide();
		$(".mask").hide();
		uniqueStyleDataArr.pop();
	})
	$('#cancelDelete').click(function () {
		$("#showDel").hide();
		$(".mask").hide();
	})

	$("#showStyleData").click(function () {
		//緩存樣式數組
		var twoArr = [],
			arrKey = [],
			arrVal = [],
			styleObj = {},
			html = allPartHeight.join("<br>") + "<br><br>";

		//排序函數
		function arrSort(a, b) {
			function preGetNum(str) {
				return parseInt(str.split(prefix).join(''));
			}
			var num1 = preGetNum(a[0]),
				num2 = preGetNum(b[0]);
			return num1 - num2;
		}


		for (var i2 = 0; i2 < uniqueStyleDataArr.length; i2++) {
			var onestyleData = uniqueStyleDataArr[i2].split("  ");
			twoArr.push(onestyleData);
		}
		// 按照從前往後的順序排列每部分img-part
		twoArr.sort(arrSort);

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
			}
		}
		for (var arr in styleObj) {
			var start = '.' + arr + ' .link';
			for (var i5 = 0; i5 < styleObj[arr].length; i5++) {
				html += start + (i5 + 1) + "{" + styleObj[arr][i5] + "}<br>";
			}
		}
		$('#styleData').html(html);
	})
});