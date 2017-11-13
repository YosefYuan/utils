$(function () {
	$(".dragable").draggable();
	$(".dragable").resizable();
	//獲得圖片數量 
	var allPartNum = 0,
		allPartHeight = [];
	setTimeout(function () {
		var num = $('img').length;
		for (var i = 0; i < num; i++) {
			var _height = ($('img:eq(' + i + ')').height());
			if (_height !== 0) {
				allPartNum++;
				allPartHeight.push(".part" + (i + 1) + "{height:" + _height + "px}");
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
		thistop = formatNumAndPX($(this).css("top"));
		thisleft = formatNumAndPX($(this).css("left"));
		thisw = formatNumAndPX($(this).css("width"));
		thish = formatNumAndPX($(this).css("height"));
		curposiv = 'part' + index + '  top:' + thistop + ';left:' + thisleft + ';width:' + thisw + ';height:' + thish + ';';
		$("#showposivalue").val(curposiv);
		// alert(allPartHeight.join(';'));
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
		// console.dir(styleObj);
		if (isEmptyObj(styleObj)) return;
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