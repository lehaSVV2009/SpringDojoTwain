<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script src="<c:url value="/resources/dynamsoft/js/initWebTwain.js" />"></script>

<div id="scanForm" data-dojo-type="dijit/form/Form" action="sendScannedImages" method="POST">

    <div class="appBorderContainer" data-dojo-type="dijit/layout/BorderContainer" style="width: 100%; height: 6%">

        <div data-dojo-type="dijit/layout/ContentPane"
             data-dojo-props="splitter: true, minSize: 100, region: 'leading'">

            Sending Images:

        </div>

        <div id="imagesNamesContainer" data-dojo-type="dijit/layout/ContentPane"
             data-dojo-props="splitter: true, region: 'center'">

        </div>


        <div data-dojo-type="dijit/layout/ContentPane"
             data-dojo-props="splitter: true, minSize: 120, region: 'trailing'">

            <button id="sendScannedImagesButton" data-dojo-type="dijit/form/Button" type="submit" role="button">Send
            </button>

        </div>

    </div>

</div>


<div class="appBorderContainer" data-dojo-type="dijit/layout/BorderContainer" style="width: 100%; height: 90%">


    <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="splitter:true, region:'center'">

        <div id="dwtcontrolContainer" data-dojo-type="dijit/layout/ContentPane"
             data-dojo-props="splitter:true, region:'center'"></div>

    </div>


    <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="minSize: 200, region: 'trailing', splitter: true">

        <!-- Scan Buttons -->

        <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="splitter: true">

            <div data-dojo-type="dojox/layout/TableContainer" data-dojo-props="cols:1">

                <select size="1" id="source"
                        title="Select Source"
                        data-dojo-type="dijit/form/Select"
                        onchange="source_onchange()">
                    <option value=""></option>
                </select>

                <div type='checkbox' title="Show UI" data-dojo-type="dijit/form/CheckBox" id='ShowUI'></div>
                <div type='checkbox' title="ADF" data-dojo-type="dijit/form/CheckBox" id='ADF'></div>
                <div type='checkbox' title="Duplex" data-dojo-type="dijit/form/CheckBox" id='Duplex'></div>
                <div type='radio' title="B&amp;W" data-dojo-type="dijit/form/RadioButton" id='BW'
                     name='PixelType'></div>
                <div type='radio' title="Gray" data-dojo-type="dijit/form/RadioButton" id='Gray' name='PixelType'></div>
                <div type='radio' title="Color" data-dojo-type="dijit/form/RadioButton" id='RGB' name='PixelType'></div>
                <select size='1' id='Resolution'
                        title="Resolution"
                        data-dojo-type="dijit/form/Select">
                    <option value=''></option>
                </select>

            </div>

            <button id="scanButton" data-dojo-type="dijit/form/Button" type="button" role="button"
                    onclick="acquireImage();">Scan
            </button>

        </div>

        <div style="height:15px;"></div>

        <!-- Edit Image Buttons -->

        <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="splitter: true">

            <button data-dojo-type="dijit/form/Button" type="button" role="button"
                    onclick="btnShowImageEditor_onclick();">Show Image Editor
            </button>
            <button data-dojo-type="dijit/form/Button" type="button" role="button"
                    onclick="btnRotateLeft_onclick();">Rotate Left
            </button>
            <button data-dojo-type="dijit/form/Button" type="button" role="button"
                    onclick="btnRotateRight_onclick();">Rotate Right
            </button>

            <br/>

            <button data-dojo-type="dijit/form/Button" type="button" role="button"
                    onclick="btnMirror_onclick();">Mirror
            </button>
            <button data-dojo-type="dijit/form/Button" type="button" role="button"
                    onclick="btnFlip_onclick();">Flip
            </button>
            <button data-dojo-type="dijit/form/Button" type="button" role="button" id="btnCrop"
                    onclick="btnCrop_onclick();">Crop
            </button>
            <button data-dojo-type="dijit/form/Button" type="button" role="button"
                    id="btnChangeImageSize"
                    onclick="btnChangeImageSize_onclick();">Change Image Size
            </button>

        </div>

        <!-- Save Image On Local Computer -->

        <div style="height:15px;"></div>

        <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="splitter: true">

            <div data-dojo-type="dojox/layout/TableContainer" data-dojo-props="cols:1">

                <div id="txtFileNameforSave" data-dojo-type="dijit/form/TextBox" title="File Name:"
                     name="text_box"
                     value="WebTWAINImage"></div>

                <div type='radio' title="BMP" data-dojo-type="dijit/form/RadioButton" id='imgTypebmp'
                     onclick="rdsave_onclick();"
                     value="bmp"
                     name='imgType_save'></div>
                <div type='radio' title="JPEG" data-dojo-type="dijit/form/RadioButton" id='imgTypejpeg'
                     onclick="rdsave_onclick();"
                     value="jpeg"
                     name='imgType_save'></div>
                <div type='radio' title="TIFF" data-dojo-type="dijit/form/RadioButton" id='imgTypetiff'
                     onclick="rdTIFFsave_onclick();"
                     value="tiff"
                     name='imgType_save'></div>
                <div type='radio' title="PNG" data-dojo-type="dijit/form/RadioButton" id='imgTypepng'
                     onclick="rdsave_onclick();"
                     name='imgType_save'></div>
                <div type='radio' title="PDF" data-dojo-type="dijit/form/RadioButton" id='imgTypepdf'
                     onclick="rdPDFsave_onclick();"
                     value="pdf"
                     name='imgType_save'></div>

                <div type='checkbox' title="Multi-Page TIFF" data-dojo-type="dijit/form/CheckBox"
                     id='MultiPageTIFF_save'></div>
                <div type='checkbox' title="Multi-Page PDF" data-dojo-type="dijit/form/CheckBox"
                     id='MultiPagePDF_save'></div>


            </div>

            <button data-dojo-type="dijit/form/Button" type="button" role="button"
                    id="btnSave"
                    onclick="btnSave_onclick();">Save Image
            </button>

        </div>

        <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="splitter: true">

            <button id="addToSendingImagesButton" data-dojo-type="dijit/form/Button" type="button" role="button"
                    onclick="appendImageToForm();">Add Scanned To Sending Images
            </button>

        </div>


    </div>


    <!-- Help element for image Editing (Image size Editing) -->

    <div id="ImgSizeEditor" style="visibility:hidden; text-align:left;">
        <ul>
            <li><label for="img_height"><b>New Height :</b>
                <input type="text" id="img_height" style="width:50%;" size="10"/>pixel</label></li>
            <li><label for="img_width"><b>New Width :</b>&nbsp;
                <input type="text" id="img_width" style="width:50%;" size="10"/>pixel</label></li>
            <li>Interpolation method:
                <select size="1" id="InterpolationMethod">
                    <option value=""></option>
                </select></li>
            <li style="text-align:center;">
                <input type="button" value="   OK   " id="btnChangeImageSizeOK"
                       onclick="btnChangeImageSizeOK_onclick();"/>
                <input type="button" value=" Cancel " id="btnCancelChange" onclick="btnCancelChange_onclick();"/></li>
        </ul>
    </div>

    <!-- Help element for image Editing (Crop image) -->

    <div id="Crop" style="visibility:hidden ;">
        <div style="width:50%; height:100%; float:left; text-align:left;">
            <ul>
                <li><label for="img_left"><b>left: </b>
                    <input type="text" id="img_left" style="width:50%;" size="4"/></label></li>
                <li><label for="img_top"><b>top: </b>
                    <input type="text" id="img_top" style="width:50%;" size="4"/></label></li>
                <li style="text-align:center;">
                    <input type="button" value="  OK  " id="btnCropOK" onclick="btnCropOK_onclick()"/></li>
            </ul>
        </div>
        <div style="width:50%; height:100%; float:left; text-align:right;">

            <ul>
                <li><label for="img_right"><b>right : </b>
                    <input type="text" id="img_right" style="width:50%;" size="4"/></label></li>
                <li><label for="img_bottom"><b>bottom:</b>
                    <input type="text" id="img_bottom" style="width:50%;" size="4"/></label></li>
                <li style=" text-align:center;">
                    <input type="button" value="Cancel" id="cancelcrop" onclick="btnCropCancel_onclick()"/></li>
            </ul>

        </div>

    </div>

</div>


<!-- Transform page elements for scanning images -->
<script src="<c:url value="/resources/dynamsoft/js/webTwainActions.js" />"></script>