

var _dwtParam = {
    'containerID': 'dwtcontrolContainer',   
    'width': 440,       
    'height': 600,
	'onPostTransfer': Dynamsoft_OnPostTransfer
};


var gWebTwain;
(function() {
    //gWebTwain = new Dynamsoft.WebTwain(_dwtParam);
    gWebTwain = new Dynamsoft.WebTwain(_dwtParam);
})();

var seed;
function onPageLoad() {
    initInfo();            //Add guide info
    seed = setInterval(initControl, 500);
 }

 function initControl() {
      var DWObject = gWebTwain.getInstance();      
 }

function acquireImage() {
   var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        if (DWObject.SourceCount > 0) {
            DWObject.SelectSource();
            DWObject.SetViewMode(-1, -1);
            DWObject.AcquireImage();
        }
        else
            alert("No TWAIN compatible drivers detected.");
    }	
}

function Dynamsoft_OnPostTransfer() {
	addThumbnail();
}



//******************Instructions*******************//
function initInfo() {
    var MessageBody = document.getElementById("divInfo");
    if (MessageBody) {
        var ObjString = "<div>";
        ObjString += "This sample demonstrates how to use web scan with an advanced thumbnails navigation. <br />";
        ObjString += "<br />";
        ObjString += "<b>Steps to try:</b><br />";
        ObjString += "1. Connect your scanner<br />";
        ObjString += "2. Click the \"Scan\" button<br />";
        ObjString += "<br />";
        ObjString += "<b>Note:</b><br />";
        ObjString += "1. The highlighted image in the thumbnail window is displayed in the main viewer. <br />";
        ObjString += "2. You can do some simple operations such as save/delete images in the thumbnail window.";
        ObjString += "<br />";
        ObjString += "<br />";
        ObjString += "Any questions? <a target='blank' href='mailto:support@dynamsoft.com'>Please let us know!</a>";
        ObjString += "<br />";
        ObjString += "</div>";
        MessageBody.innerHTML = ObjString;
    }
}

function addThumbnail()
{
	var DWObject = gWebTwain.getInstance();
	var iImageBitDepth = 24;
		iImageBitDepth = DWObject.GetImageBitDepth(DWObject.CurrentImageIndexInBuffer);
	if(iImageBitDepth ==24)
	{
		DWObject.GetSelectedImagesSize(1); 
	}
	else
	{
		DWObject.GetSelectedImagesSize(0); 
	}
	var imagedata;
	imagedata = DWObject.SaveSelectedImagesToBase64Binary();	
	$(".thumb").removeClass("currentSelected");
	if(imagedata != undefined)
	{
		var strOutput = "<li class='thumb currentSelected'> "
						+"<div><img id='imgData"+(DWObject.CurrentImageIndexInBuffer+1)+"' width='80' height='110' src='data:image/png;base64,"+imagedata+"'></div>"
						+"<i>"+(DWObject.CurrentImageIndexInBuffer+1)+"</i>"
						+"<ul class='editIcons'>"
							+"<li><a class='editIcon-Save' title='Save as PNG'></a></li>"
							+"<li><a class='editIcon-rot_left90' title='Rotate left (90°)'></a></li>"
							+"<li><a class='editIcon-rot_right90' title='Rotate right (90°)'></a></li>"
							+"<li class='last'><a class='editIcon-remove' title='Remove'></a></li>"
						+"</ul>"        
					+"</li>";
		$("#thumbContainer>ul").append(strOutput);
	}
}

function refreshThumbnail()
{
	var DWObject = gWebTwain.getInstance();
	var iIndex = DWObject.CurrentImageIndexInBuffer + 1;
	
	var imagedata;
	//DWObject.GetSelectedImagesSize(0); 
	var iImageBitDepth = 24;
		iImageBitDepth = DWObject.GetImageBitDepth(DWObject.CurrentImageIndexInBuffer);
	if(iImageBitDepth ==24)
	{
		DWObject.GetSelectedImagesSize(1); 
	}
	else
	{
		DWObject.GetSelectedImagesSize(0); 
	}
	imagedata = DWObject.SaveSelectedImagesToBase64Binary();
	$('#imgData' + iIndex).attr("src","data:image/png;base64," + imagedata);	
}

function setCurrentThumb(objCurrentThumb)
{
	$(".thumb").removeClass("currentSelected");
	objCurrentThumb.addClass("currentSelected");
}

function getCurrentIndex(objCurrentThumb)
{
	var iIndex = objCurrentThumb.find("i").html();
	return iIndex;
}

$(function(){
	
	$("li.thumb").live("click",function(){
		var DWObject = gWebTwain.getInstance();
		setCurrentThumb($(this));
		var iIndex = getCurrentIndex($(this));
		if(iIndex!="")
		{
			DWObject.CurrentImageIndexInBuffer = iIndex-1;
		}		
	});
	
	$(".editIcon-Save").live("click",function(){
		var DWObject = gWebTwain.getInstance();
		var objThumb = $(this).closest(".thumb");
		setCurrentThumb(objThumb);		
		var iIndex = getCurrentIndex(objThumb);
		if(iIndex!="")
		{
			DWObject.CurrentImageIndexInBuffer = iIndex-1;
			DWObject.IfShowFileDialog = true;
			DWObject.SaveAsPNG("C:\\imageData_"+iIndex+".png", DWObject.CurrentImageIndexInBuffer);
		}		
	});
	
	$(".editIcon-rot_left90").live("click",function(){
		var DWObject = gWebTwain.getInstance();
		var objThumb = $(this).closest(".thumb");
		setCurrentThumb(objThumb);		
		var iIndex = getCurrentIndex(objThumb);
		if(iIndex!="")
		{
			DWObject.CurrentImageIndexInBuffer = iIndex-1;
			DWObject.RotateLeft(DWObject.CurrentImageIndexInBuffer);
			refreshThumbnail();
		}  
  	});
	
	$(".editIcon-rot_right90").live("click",function(){
		var DWObject = gWebTwain.getInstance();
		var objThumb = $(this).closest(".thumb");				
		var iIndex = getCurrentIndex(objThumb);
		if(iIndex!="")
		{
			DWObject.CurrentImageIndexInBuffer = iIndex-1;
			DWObject.RotateRight(DWObject.CurrentImageIndexInBuffer);
			refreshThumbnail();
		}  
  	});
	
	$(".editIcon-remove").live("click",function(e){
		var DWObject = gWebTwain.getInstance();
		var objThumb = $(this).closest(".thumb");		
		var iIndex = getCurrentIndex(objThumb);	
		
		if(iIndex!="")
		{
			$('#imgData' + iIndex).closest(".thumb").remove();	
			for(var i=1; i< DWObject.HowManyImagesInBuffer; i++)
			{
				$(".thumb:eq(" +i+")").find("img").attr("id", "imgData" + (i));
				$(".thumb:eq(" +i+")").find("i").html(i);
			}
		  	DWObject.CurrentImageIndexInBuffer = iIndex-1;		  
		  	DWObject.RemoveImage(DWObject.CurrentImageIndexInBuffer);			  
		}  
		refreshThumbnail();
		$(".thumb").removeClass("currentSelected");	
		$(".thumb:eq("+iIndex+")").addClass("currentSelected");	
		e.stopPropagation();
  	});
	
})