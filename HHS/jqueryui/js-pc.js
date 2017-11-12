$(function () {
	$(".dragable").draggable();
	$(".dragable").resizable();
	//獲得圖片數量 
	var allPartNum = 0,
		allPartHeight = [];
	setTimeout(function(){
		var num = $('img').length;
		for(var i = 0; i < num; i ++){
			var _height = ($('img:eq(' + i + ')').height());
			if( _height !== 0){
				allPartNum ++;
				allPartHeight.push(".part" + (i+1) + "{height:" + _height + "px}");
			}else{
				return;
			}
		}
	},500);
	$(".dragable").dblclick(function (e) {
		var index = $(this).parent().attr('data-index');
		$("#showposi").css({ "left": "200px", "top": e.pageY + 50 });
		$("#showposi").show();
		thistop = $(this).css("top");
		thisleft = $(this).css("left");
		thisw = $(this).css("width");
		thish = $(this).css("height");
		curposiv = '.part' + index + '{top:' + thistop + ';left:' + thisleft + ';width:' + thisw + ';height:' + thish + ';}';
		$("#showposivalue").val(curposiv);
		// alert(allPartHeight.join(';'));
	});
	$("#showposiclose").click(function () { $("#showposi").hide(); });	

	var styleDataArr = [];
	$('#showposiclose').click(function () {
		var styleData = $('#showposivalue').val();
		styleDataArr.push(styleData);
	})
	$("#showStyleData").click(function () {

		var html;
		
		for (var i = 0; i < allPartHeight.length; i++) {
			html = allPartHeight.join("<br>") + "<br><br>"
		}
		
		$('#styleData').html(html);
		for (var i = 0; i < styleDataArr.length; i++) {
			html += styleDataArr.join("<br>");
		}
		$('#styleData').html(html);
	})
});