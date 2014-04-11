
/**
 *  Main Dynamic Web Twain Object
 */
var gWebTwain;

/**
 *  Settings for Main Dynamic Twain Object
 */
var _dwtParam = {
    'productKey': '437D8028CBA0F642AC5105A6E99BA14D1D45F21CCA3D48DF5FBB15D2B8753CCB1D45F21CCA3D48DF6BBD2BBE41CFACEF1D45F21CCA3D48DF295C5A96D999890130000000', /* please input your product key here. How to Generate Product Key>>
     */
    'containerID': 'dwtcontrolContainer', /* the container's id. */
    'isTrial': 'true', /* true for a trial license. */
    'version': '9,2', /* The version of Dynamic Web TWAIN. */
    'resourcesPath': 'Resources', /* The relative path of MSI, CAB and PKG. */
    'width': 440,
    'height': 600,

    //  for image editing
    'onImageAreaSelected': Dynamsoft_OnImageAreaSelected,
    'onImageAreaDeSelected': Dynamsoft_OnImageAreaDeselected,
    //  for custom scan
    'onTopImageInTheViewChanged': Dynamsoft_OnTopImageInTheViewChanged
};

(function () {
    gWebTwain = new Dynamsoft.WebTwain(_dwtParam);
    /* create a Dynamic Web TWAIN object */
})();


var seed;

/*
 * Call checking plugin on install
 */
(function () {

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

    initPara();

    seed = setInterval(initControl, 500);
})();


/**
 *  Check Plugin on Install
 */
function initControl() {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        if (DWObject.ErrorCode == 0) {
            clearInterval(seed);
            DWObject.BrokerProcessType = 1;

            var vDWTSource = document.getElementById("source");
            if (vDWTSource) {
                vDWTSource.options.length = 0;
                // fill in the source items.
                for (var i = 0; i < DWObject.SourceCount; i++) {
                    vDWTSource.options.add(new Option(DWObject.GetSourceNameItems(i), i));
                }

                if (DWObject.SourceCount > 0) {
                    source_onchange();
                }
            }

// Fill the init data for preview mode selection
            var vResolution = document.getElementById("Resolution");
            if (vResolution) {
                vResolution.options.length = 0;
                vResolution.options.add(new Option("100", 100));
                vResolution.options.add(new Option("150", 150));
                vResolution.options.add(new Option("200", 200));
                vResolution.options.add(new Option("300", 300));
            }

            var vGray = document.getElementById("Gray");
            if (vGray)
                vGray.checked = true;
        }
    }
}


/**
 *  Change TWAIN Source for scanning
 */
function source_onchange() {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        var vDWTSource = document.getElementById("source");
        if (vDWTSource) {

            if (vDWTSource)
                DWObject.SelectSourceByIndex(vDWTSource.selectedIndex);
            else
                DWObject.SelectSource();
        }

        DWObject.CloseSource();
    }
}


/**
 *  Select TWAIN Source (Scanner) and Acquire Image
 */
function acquireImage() {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        if (DWObject.SourceCount > 0) {
            var vDWTSource = document.getElementById("source");
            if (vDWTSource) {

                if (vDWTSource)
                    DWObject.SelectSourceByIndex(vDWTSource.selectedIndex);
                else
                    DWObject.SelectSource();
            }
            DWObject.CloseSource();
            DWObject.OpenSource();

            DWObject.IfShowUI = document.getElementById("ShowUI").checked;
            var i;
            for (i = 0; i < 3; i++) {
                if (document.getElementsByName("PixelType").item(i).checked == true)
                    DWObject.PixelType = i;
            }
            DWObject.Resolution = Resolution.value;
            DWObject.IfFeederEnabled = document.getElementById("ADF").checked;
            DWObject.IfDuplexEnabled = document.getElementById("Duplex").checked;

            DWObject.IfDisableSourceAfterAcquire = true;
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
            case "visible":
                document.getElementById("Crop").style.visibility = "hidden";
                break;
            case "hidden":
                document.getElementById("Crop").style.visibility = "visible";
                break;
            default:
                break;
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
            case "visible":
                document.getElementById("ImgSizeEditor").style.visibility = "hidden";
                break;
            case "hidden":
                document.getElementById("ImgSizeEditor").style.visibility = "visible";
                break;
            default:
                break;
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


//--------------------------------------------------------------------------------------
//************************** Save Image***********************************
//--------------------------------------------------------------------------------------
function btnSave_onclick() {
    var DWObject = gWebTwain.getInstance();
    if (DWObject) {
        if (DWObject.HowManyImagesInBuffer == 0) {
            return;
        }
        var i, strimgType_save;
        var NM_imgType_save = document.getElementsByName("imgType_save");
        for (i = 0; i < 5; i++) {
            if (NM_imgType_save.item(i).checked == true) {
                strimgType_save = NM_imgType_save.item(i).value;
                break;
            }
        }
        DWObject.IfShowFileDialog = true;
        varFileName.className = "";
        var nSaveType = -1;
        var strFilePath = "C:\\" + varFileName.value + "." + strimgType_save;
        if (strimgType_save == "tif" && varMultiPageTIFF.checked) {
            if ((DWObject.SelectedImagesCount == 1) || (DWObject.SelectedImagesCount == DWObject.HowManyImagesInBuffer)) {
                DWObject.SaveAllAsMultiPageTIFF(strFilePath);
            }
            else {
                DWObject.SaveSelectedImagesAsMultiPageTIFF(strFilePath);
            }
        }
        else if (strimgType_save == "pdf" && varMultiPagePDF.checked) {
            if ((DWObject.SelectedImagesCount == 1) || (DWObject.SelectedImagesCount == DWObject.HowManyImagesInBuffer)) {
                DWObject.SaveAllAsPDF(strFilePath);
            }
            else {
                DWObject.SaveSelectedImagesAsMultiPagePDF(strFilePath);
            }
        }
        else {
            nSaveType = i;
            switch (i) {
                case 0:
                    DWObject.SaveAsBMP(strFilePath, DWObject.CurrentImageIndexInBuffer);
                    break;
                case 1:
                    DWObject.SaveAsJPEG(strFilePath, DWObject.CurrentImageIndexInBuffer);
                    break;
                case 2:
                    DWObject.SaveAsTIFF(strFilePath, DWObject.CurrentImageIndexInBuffer);
                    break;
                case 3:
                    DWObject.SaveAsPNG(strFilePath, DWObject.CurrentImageIndexInBuffer);
                    break;
                case 4:
                    DWObject.SaveAsPDF(strFilePath, DWObject.CurrentImageIndexInBuffer);
                    break;
            }
        }


        if (DWObject.ErrorCode != 0 && DWObject.ErrorCode != -2115)  //cancel
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

    varFileName = document.getElementById("txtFileNameforSave");
    if (varFileName)
        varFileName.value = "WebTWAINImage";

    varMultiPageTIFF = document.getElementById("MultiPageTIFF_save");
    if (varMultiPageTIFF)
        varMultiPageTIFF.disabled = true;
    varMultiPagePDF = document.getElementById("MultiPagePDF_save");
    if (varMultiPagePDF)
        varMultiPagePDF.disabled = true;
}

function rdTIFFsave_onclick() {
    varMultiPageTIFF.disabled = false;

    varMultiPageTIFF.checked = true;
    varMultiPagePDF.checked = false;
    varMultiPagePDF.disabled = true;
}
function rdPDFsave_onclick() {
    varMultiPagePDF.disabled = false;

    varMultiPageTIFF.checked = false;
    varMultiPagePDF.checked = true;
    varMultiPageTIFF.disabled = true;
}
function rdsave_onclick() {
    varMultiPageTIFF.checked = false;
    varMultiPagePDF.checked = false;

    varMultiPageTIFF.disabled = true;
    varMultiPagePDF.disabled = true;
}


//--------------------------------------------------------------------------------------
//************************** Adding images to form *****************************
//--------------------------------------------------------------------------------------

/*

 Allowed Values

 Image Type

 0	BMP, DIB
 1	JPG, JPEG, JPE, JFIF
 2	TIF, TIFF
 3	PNG
 4	PDF

 //	Worked fine: 1, 4

 */

var hiddenInputsNumber = 0;

var BEGIN_OF_NEW_IMAGE_NAME = 'scannedImage';
var END_OF_NEW_IMAGE_NAME = '.jpg';

function createHiddenInputElement(name, value) {
    var hiddenElement = document.createElement('input');
    hiddenElement.type = 'hidden';
    hiddenElement.name = name;
    hiddenElement.value = value;
    return hiddenElement;
}


function addElementToMainForm(element) {
    var form = document.getElementById('scanForm');
    form.appendChild(element);
}


function getBytesBase64FromSelectedImages() {
    var DWObject = gWebTwain.getInstance();
    DWObject.GetSelectedImagesSize(1); //jpeg
    return DWObject.SaveSelectedImagesToBase64Binary();
}


function addImageNameToImagesNamesContainer(imageName) {
    var imagesNamesContainer = document.getElementById('imagesNamesContainer');
    var imageNameElement = document.createElement('div');
    imageNameElement.name = imageName;
    var imageNameSpan = createSpan(imageName);
    var removeImageButton = createButton(new Function('removeImage("' + imageName + '")'), ' x ');
    imageNameElement.appendChild(imageNameSpan);
    imageNameElement.appendChild(removeImageButton);
    imagesNamesContainer.appendChild(imageNameElement);
}


function createSpan(innerText) {
    var span = document.createElement('span');

    if (typeof(span.innerText) != String(undefined)) {
        span.innerText = innerText;
    } else {
        span.textContent = innerText;                           //  For Mozilla Based Browsers
    }

    return span;
}

function createButton(onClick, value) {
    var button = document.createElement('input');
    button.type = 'button';
    button.value = value;
    try {
        button.attachEvent('onclick', onClick);
    } catch (e) {
        button.addEventListener('click', onClick);
    }
    return button;
}


function appendImageToForm() {
    var base64image
        = getBytesBase64FromSelectedImages();
    var imageName = BEGIN_OF_NEW_IMAGE_NAME + hiddenInputsNumber + END_OF_NEW_IMAGE_NAME;
    var newHiddenInput
        = createHiddenInputElement(imageName, base64image);
    addElementToMainForm(newHiddenInput);
    addImageNameToImagesNamesContainer(imageName);
    ++hiddenInputsNumber;
}


function removeImage(imageName) {
    removeElementFromMainForm(imageName);
    removeElementFromImagesNamesContainer(imageName);
}

function removeElementFromMainForm(imageName) {
    var form = document.getElementById('scanForm');
    removeOneElementFromParentByName(imageName, form, 'input');
}
function removeElementFromImagesNamesContainer(imageName) {
    var imagesNamesContainer = document.getElementById('imagesNamesContainer');
    removeOneElementFromParentByName(imageName, imagesNamesContainer, 'div');
}

function removeOneElementFromParentByName(name, parent, type) {
    var elements = parent.getElementsByTagName(type);
    var elementsWithSuchName = new Array();
    for (var index = 0; index < elements.length; ++index) {
        if (elements[index].name == name) {
            elementsWithSuchName.push(elements[index]);
        }
    }
    if (elementsWithSuchName.length != 1) {
        return false;
    }
    parent.removeChild(elementsWithSuchName[0]);
    return true;
}


