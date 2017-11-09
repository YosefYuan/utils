
 //pc
$(function() { 
	
	
	$( ".dragable" ).draggable();
	$( ".dragable" ).resizable();
	
	$( ".dragable" ).dblclick(function(e){
	 
	$("#showposi").css({"left":"200px","top":e.pageY+50});
	$("#showposi").show();
	 
	thistop = $(this).css("top");
	thisleft = $(this).css("left");
	thisw = $(this).css("width"); 
	thish = $(this).css("height");

	curposiv='position:absolute;top:'+thistop+';left:'+thisleft+';width:'+thisw+';height:'+thish+'';
	
	
	$("#showposivalue").val(curposiv);
	
	});
	
	$("#showposiclose").click(function(){$("#showposi").hide();});
 
	 
	//-------------
 
});//end ready


/*
//这是百分比的：

	$(function() { 
		$( ".dragable" ).draggable();
		$( ".dragable" ).resizable();
		
		$( ".dragable" ).dblclick(function(e){
		 
		$("#showposi").css({"left":"200px","top":e.pageY+50});
		$("#showposi").show();
		 
		 //-----------------
		 thistop = $(this).css("top");
		 thisleft = $(this).css("left");
		 thisw = $(this).css("width"); 
		 thish = $(this).css("height");
		 //-------parent w and h-----------------------------------------
		 thispar_w =  $(this).parent().css("width");
		 thispar_h =  $(this).parent().css("height");
		 
		 //----去掉px------------
		 thistop2 = Number(thistop.substring(0,thistop.length-2));
		 thisleft2 = Number(thisleft.substring(0,thisleft.length-2));
		 thisw2 = Number(thisw.substring(0,thisw.length-2));
		 thish2 = Number(thish.substring(0,thish.length-2));
		 
		 thispar_w2 = Number(thispar_w.substring(0,thispar_w.length-2));
		 thispar_h2 = Number(thispar_h.substring(0,thispar_h.length-2));
		 
		 
		 //---------得到百分比------
		 
		 cur_w = ((thisw2/thispar_w2)*100).toFixed(2);
		 cur_h = ((thish2/thispar_h2)*100).toFixed(2);
		 
		 cur_top = ((thistop2/thispar_h2)*100).toFixed(2);
		 cur_left = ((thisleft2/thispar_w2)*100).toFixed(2);
		 

		  
		  
		curposiv='top:'+cur_top+'%;left:'+cur_left+'%;width:'+cur_w+'%;height:'+cur_h+'%';
		
		
		$("#showposivalue").val(curposiv);
		
		});
		
		$("#showposiclose").click(function(){$("#showposi").hide();});
	 
		 
		//-------------
		
 
	 
	});//end ready

*/