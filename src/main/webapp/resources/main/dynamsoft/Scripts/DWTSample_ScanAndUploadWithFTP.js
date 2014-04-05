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
     'onTopImageInTheViewChanged':Dynamsoft_OnTopImageInTheViewChanged                            
};


var gWebTwain;
(function() {
	gWebTwain = new Dynamsoft.WebTwain(_dwtParam);
})();

var seed;
function onPageLoad() {
    initInfo();            //Add guide info
    initPara();
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

function Dynamsoft_OnTopImageInTheViewChanged(index) {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        DWObject.CurrentImageIndexInBuffer = index;
    }
}

//--------------------------------------------------------------------------------------
//************************** Upload Image***********************************
//--------------------------------------------------------------------------------------

function btnUpload_onclick() {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        if (DWObject.HowManyImagesInBuffer == 0) {
            return;
        }
        varFileName.className = "";

        var strFTPServer = document.getElementById("txtFTPServer").value;
        DWObject.FTPPort = document.getElementById("txtFTPPort").value;
        var varUserName = document.getElementById("txtUserName");
        if (varUserName) {
            if (varUserName.value != "") {
                DWObject.FTPUserName = varUserName.value;

                var varPassword = document.getElementById("txtPassword");
                if (varPassword) {
                    DWObject.FTPPassword = varPassword.value;
                }
            }
            else {
                DWObject.FTPUserName = "";
                DWObject.FTPPassword = "";
            }
        }
        
        for (i = 0; i < 4; i++) {
            if (document.getElementsByName("ImageType").item(i).checked == true) {
                strImageType = i + 1;
                break;
            }
        }
        var uploadFullPath = varFileName.value + "." + document.getElementsByName("ImageType").item(i).value;
        if (strImageType == 2 && MultiPageTIFF.checked) {
            if ((DWObject.SelectedImagesCount == 1) || (WebTWAIN.SelectedImagesCount == WebTWAIN.HowManyImagesInBuffer)) {
                DWObject.FTPUploadAllAsMultiPageTIFF(strFTPServer, uploadFullPath);
            }
            else {
                DWObject.FTPUploadAsMultiPageTIFF(strFTPServer, uploadFullPath);
            }
        }
        else if (strImageType == 4 && MultiPagePDF.checked) {
            if ((DWObject.SelectedImagesCount == 1) || (WebTWAIN.SelectedImagesCount == WebTWAIN.HowManyImagesInBuffer)) {
                DWObject.FTPUploadAllAsPDF(strFTPServer, uploadFullPath);
            }
            else {
                DWObject.FTPUploadAsMultiPagePDF(strFTPServer, uploadFullPath);
            }
        }
        else {
            DWObject.FTPUploadEx(
            strFTPServer,
            DWObject.CurrentImageIndexInBuffer,
            uploadFullPath,
            strImageType);
        }
        
        alert(DWObject.ErrorString);
    }
}

//--------------------------------------------------------------------------------------
//*********************************radio response***************************************
//--------------------------------------------------------------------------------------
var varFileName, varMultiPageTIFF, varMultiPagePDF;
function initPara() {
    var varImgTypejpeg = document.getElementById("imgTypejpeg");
    if (varImgTypejpeg)
        varImgTypejpeg.checked = true;

    varFileName = document.getElementById("txtFileName");
    if (varFileName)
        varFileName.value = "WebTWAINImage";

    varMultiPageTIFF = document.getElementById("MultiPageTIFF");
    if (varMultiPageTIFF)
        varMultiPageTIFF.disabled = true;
    varMultiPagePDF = document.getElementById("MultiPagePDF");
    if (varMultiPagePDF)
        varMultiPagePDF.disabled = true;
}


function rdTIFF_onclick() {
    varMultiPageTIFF.disabled = false;

    varMultiPageTIFF.checked = false;
    varMultiPagePDF.checked = false;
    varMultiPagePDF.disabled = true;
}
function rdPDF_onclick() {
    varMultiPagePDF.disabled = false;

    varMultiPageTIFF.checked = false;
    varMultiPagePDF.checked = true;
    varMultiPageTIFF.disabled = true;
}
function rd_onclick() {
    varMultiPageTIFF.checked = false;
    varMultiPagePDF.checked = false;

    varMultiPageTIFF.disabled = true;
    varMultiPagePDF.disabled = true;
}


//******************Instructions*******************//
function initInfo() {
    var MessageBody = document.getElementById("divInfo");
    if (MessageBody) {
        var ObjString = "<div>";
        ObjString += "This sample demonstrates how to scan documents and upload them to your FTP server using Dynamic Web TWAIN.<br />";
        ObjString += "<br />";
        ObjString += "<b>Steps to try:</b><br />";
        ObjString += "1. Connect your scanner<br />";
        ObjString += "2. Click the \"Scan\" button<br />";
        ObjString += "3. Fill in all the uploading fields<br />";
        ObjString += "4. Click the \"Upload Image\" button<br />";
        ObjString += "<br />";
        ObjString += "<b>Note:</b><br />";
        ObjString += "You must configure an FTP server to receive the uploaded images.";
        ObjString += "<br />";
        ObjString += "<br />";
        ObjString += "Any questions? <a target='blank' href='mailto:support@dynamsoft.com'>Please let us know!</a>";
        ObjString += "<br />";
        ObjString += "</div>";
        MessageBody.innerHTML = ObjString;
    }
}
