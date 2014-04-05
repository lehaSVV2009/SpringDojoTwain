var _iLeft, _iTop, _iRight, _iBottom; //These variables are used to remember the selected area
var _dwtParam = {
'productKey': '437D8028CBA0F642AC5105A6E99BA14D1D45F21CCA3D48DF5FBB15D2B8753CCB1D45F21CCA3D48DF6BBD2BBE41CFACEF1D45F21CCA3D48DF295C5A96D999890130000000',
    'containerID': 'dwtcontrolContainer',   //The ID of Dynamic Web TWAIN control div in HTML.This value is required.
    /*
    'isTrial': 'true',  
    isTrial is used to judge whether Dynamic Web TWAIN control is trial or full. This value is optional.
    The default value is 'TRUE', which means the control is a trial one. The value of isTrial is 'TRUE' or 'FALSE'.
    */

    /*
    'version': '9,2',   
    The version of Dynamic Web TWAIN control, which is used to judge the version when downloading CAB.
    This value is optional. The default value is '9,2'.
    */                      
    
    /*
    'resourcesPath': 'Resources',   
    The relative path of MSI, CAB and PKG.
    This value is optional. The default value is 'Resources'.
    */    
   
    /*
    'width': 580,       //The width of Dynamic Web TWAIN control
     This value is optional. The default value is '580'.
     */  
       
    /*
    'height': 600       //The height of  Dynamic Web TWAIN control
    This value is optional. The default value is '600'.
     */   
      
     
    /*  These are events. The name of 'OnPostAllTransfer' shouldn't be changed, but the name of 'Dynamsoft_OnPostAllTransfers' can be modified. 
        Please pay attention, the name of 'Dynamsoft_OnPostAllTransfers' and 'function Dynamsoft_OnPostAllTransfers()' event must be coincident.
        
        Events are as follows. You can choose one or many according to you needs.
        Once an event is added, you must make sure the corresponding function is defined in your code.
        
        'onPostTransfer':Dynamsoft_OnPostTransfer,
        'onPostAllTransfers':Dynamsoft_OnPostAllTransfers,  
        'onMouseClick':Dynamsoft_OnMouseClick,   
        'onPostLoad':Dynamsoft_OnPostLoadfunction,    
        'onImageAreaSelected':Dynamsoft_OnImageAreaSelected,   
        'onMouseDoubleClick':Dynamsoft_OnMouseDoubleClick,   
        'onMouseRightClick':Dynamsoft_OnMouseRightClick,   
        'onTopImageInTheViewChanged':Dynamsoft_OnTopImageInTheViewChanged,   
        'onImageAreaDeSelected':Dynamsoft_OnImageAreaDeselected,    
        'onGetFilePath':Dynamsoft_OnGetFilePath  
    */  
    'onTopImageInTheViewChanged':Dynamsoft_OnTopImageInTheViewChanged,
    'onImageAreaSelected':Dynamsoft_OnImageAreaSelected,
    'onImageAreaDeSelected':Dynamsoft_OnImageAreaDeselected                                                        
};


var gWebTwain;
(function() {
	gWebTwain = new Dynamsoft.WebTwain(_dwtParam);
})();

var seed;
function onPageLoad() {
    initInfo();            //Add guide info

    _iLeft = 0;
    _iTop = 0;
    _iRight = 0;
    _iBottom = 0;

    var varInterpolationMethod = document.getElementById("InterpolationMethod");
    if (varInterpolationMethod) {
        varInterpolationMethod.options.length = 0;
        varInterpolationMethod.options.add(new Option("NearestNeighbor", 1));
        varInterpolationMethod.options.add(new Option("Bilinear", 2));
        varInterpolationMethod.options.add(new Option("Bicubic", 3));
    }

    seed = setInterval(initControl, 500);
}


function initControl() {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        if (DWObject.ErrorCode == 0) {
            clearInterval(seed);
            DWObject.BrokerProcessType = 1;
        }
    }
}

function acquireImage() {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        if (DWObject.SourceCount > 0) {
            DWObject.SelectSource();
            DWObject.AcquireImage();
        }
        else
            alert("No TWAIN compatible drivers detected.");
    }
}

function Dynamsoft_OnImageAreaSelected(index, left, top, right, bottom) {
    _iLeft = left;
    _iTop = top;
    _iRight = right;
    _iBottom = bottom;
}

function Dynamsoft_OnImageAreaDeselected(index) {
    _iLeft = 0;
    _iTop = 0;
    _iRight = 0;
    _iBottom = 0;
}


function Dynamsoft_OnTopImageInTheViewChanged(index) {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        DWObject.CurrentImageIndexInBuffer = index;
    }
}

//--------------------------------------------------------------------------------------
//************************** Edit Image ******************************
//--------------------------------------------------------------------------------------
function btnShowImageEditor_onclick() {
     var DWObject = gWebTwain.getInstance();
     if (DWObject) {
         if (DWObject.HowManyImagesInBuffer == 0) {
             return;
         }
         DWObject.ShowImageEditor();
     }
}

function btnRotateRight_onclick() {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        if (DWObject.HowManyImagesInBuffer == 0) {
            return;
        }
        DWObject.RotateRight(DWObject.CurrentImageIndexInBuffer);
    }
}
function btnRotateLeft_onclick() {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        if (DWObject.HowManyImagesInBuffer == 0) {
            return;
        }
        DWObject.RotateLeft(DWObject.CurrentImageIndexInBuffer);
    }
}

function btnMirror_onclick() {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        if (DWObject.HowManyImagesInBuffer == 0) {
            return;
        }
        DWObject.Mirror(DWObject.CurrentImageIndexInBuffer);
    }
}
function btnFlip_onclick() {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        if (DWObject.HowManyImagesInBuffer == 0) {
            return;
        }
        DWObject.Flip(DWObject.CurrentImageIndexInBuffer);
    }
}


function btnCrop_onclick() {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        if (DWObject.HowManyImagesInBuffer == 0) {
            return;
        }
        if (_iLeft != 0 || _iTop != 0 || _iRight != 0 || _iBottom != 0) {
            DWObject.Crop(
            DWObject.CurrentImageIndexInBuffer,
            _iLeft, _iTop, _iRight, _iBottom);
        _iLeft = 0;
        _iTop = 0;
        _iRight = 0;
        _iBottom = 0;
        return;
    }
        switch (document.getElementById("Crop").style.visibility) {
            case "visible": document.getElementById("Crop").style.visibility = "hidden"; break;
            case "hidden": document.getElementById("Crop").style.visibility = "visible"; break;
            default: break;
        }
        document.getElementById("Crop").style.top = ds_gettop(document.getElementById("btnCrop")) + document.getElementById("btnCrop").offsetHeight + "px";
        document.getElementById("Crop").style.left = ds_getleft(document.getElementById("btnCrop")) - 80 + "px";
    }
}

function btnCropCancel_onclick() {
    document.getElementById("Crop").style.visibility = "hidden";
}
function btnCropOK_onclick() {
  var DWObject = gWebTwain.getInstance();
  if (DWObject) {
      var re = /^\d+$/;
      document.getElementById("img_left").className = "";
      document.getElementById("img_top").className = "";
      document.getElementById("img_right").className = "";
      document.getElementById("img_bottom").className = "";
      if (!re.test(document.getElementById("img_left").value)) {
          document.getElementById("img_left").className += " invalid";
          document.getElementById("img_left").focus();
          alert("Please input a valid left value.");
          return;
      }
      if (!re.test(document.getElementById("img_top").value)) {
          document.getElementById("img_top").className += " invalid";
          document.getElementById("img_top").focus();
          alert("Please input a valid top value.");
          return;
      }
      if (!re.test(document.getElementById("img_right").value)) {
          document.getElementById("img_right").className += " invalid";
          document.getElementById("img_right").focus();
          alert("Please input a valid right value.");
          return;
      }
      if (!re.test(document.getElementById("img_bottom").value)) {
          document.getElementById("img_bottom").className += " invalid";
          document.getElementById("img_bottom").focus();
          alert("Please input a valid bottom value.");
          return;
      }
      DWObject.Crop(
        DWObject.CurrentImageIndexInBuffer,
        document.getElementById("img_left").value,
        document.getElementById("img_top").value,
        document.getElementById("img_right").value,
        document.getElementById("img_bottom").value);
      document.getElementById("Crop").style.visibility = "hidden";
  }
}

function btnChangeImageSize_onclick() {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        if (DWObject.HowManyImagesInBuffer == 0) {
            return;
        }
        switch (document.getElementById("ImgSizeEditor").style.visibility) {
            case "visible": document.getElementById("ImgSizeEditor").style.visibility = "hidden"; break;
            case "hidden": document.getElementById("ImgSizeEditor").style.visibility = "visible"; break;
            default: break;
        }
        document.getElementById("ImgSizeEditor").style.top = ds_gettop(document.getElementById("btnChangeImageSize")) + document.getElementById("btnChangeImageSize").offsetHeight + "px";
        document.getElementById("ImgSizeEditor").style.left = ds_getleft(document.getElementById("btnChangeImageSize")) - 30 + "px";
    }
}

function btnCancelChange_onclick() {
    document.getElementById("ImgSizeEditor").style.visibility = "hidden";
}

function btnChangeImageSizeOK_onclick() {
  var DWObject = gWebTwain.getInstance();
  if (DWObject) {
      var re = /^\d+$/;
      document.getElementById("img_height").className = "";
      document.getElementById("img_width").className = "";
      if (!re.test(document.getElementById("img_height").value)) {
          document.getElementById("img_height").className += " invalid";
          document.getElementById("img_height").focus();
          alert("Please input a valid height.");
          return;
      }
      if (!re.test(document.getElementById("img_width").value)) {
          document.getElementById("img_width").className += " invalid";
          document.getElementById("img_width").focus();
          alert("Please input a valid width.");
          return;
      }
      
      DWObject.ChangeImageSize(
        DWObject.CurrentImageIndexInBuffer,
        document.getElementById("img_width").value,
        document.getElementById("img_height").value,
        document.getElementById("InterpolationMethod").selectedIndex + 1);
     document.getElementById("ImgSizeEditor").style.visibility = "hidden";

  }
}


//--------------------------------------------------------------------------------------
//************************** Used a lot *****************************
//--------------------------------------------------------------------------------------
function ds_getleft(el) {
    var tmp = el.offsetLeft;
    el = el.offsetParent
    while (el) {
        tmp += el.offsetLeft;
        el = el.offsetParent;
    }
    return tmp;
}
function ds_gettop(el) {
    var tmp = el.offsetTop;
    el = el.offsetParent
    while (el) {
        tmp += el.offsetTop;
        el = el.offsetParent;
    }
    return tmp;
}


//******************Instructions*******************//
function initInfo() {
    var MessageBody = document.getElementById("divInfo");
    if (MessageBody) {
        var ObjString = "<div>";
        ObjString += "This sample demonstrates how to scan documents and edit them using Dynamic Web TWAIN.<br />";
        ObjString += "<br />";
        ObjString += "<b>Steps to try:</b><br />";
        ObjString += "1. Connect your scanner<br />";
        ObjString += "2. Click the \"Scan\" button<br />";
        ObjString += "3. Edit the image(s)<br />";
        ObjString += "<br />";
        ObjString += "<b>Note:</b>";
        ObjString += "<br />";
        ObjString += "By clicking  the \"Show Image Editor\" button, you are able to use the built-in Image Editor dialog to edit the image.";
        ObjString += "<br />";
        ObjString += "<br />";
        ObjString += "Any questions? <a target='blank' href='mailto:support@dynamsoft.com'>Please let us know!</a>";
        ObjString += "<br />";
        ObjString += "</div>";
        MessageBody.innerHTML = ObjString;
    }
}
