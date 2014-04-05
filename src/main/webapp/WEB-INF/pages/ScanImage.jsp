<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script src="<c:url value="/resources/dynamsoft/Scripts/dynamsoft.webtwain.initiate.js" />"></script>

<div id="scanForm" data-dojo-type="dijit/form/Form" action="sendScannedImages" method="POST">

    <div class="appBorderContainer" data-dojo-type="dijit/layout/BorderContainer" style="width: 100%; height: 6%">

        <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="splitter: true, minSize: 100, region: 'leading'">

            Sending Images:

        </div>

        <div id="imagesNamesContainer" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="splitter: true, region: 'center'">

        </div>


        <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="splitter: true, minSize: 120, region: 'trailing'">

            <button id="sendScannedImagesButton" data-dojo-type="dijit/form/Button" type="submit" role="button">Send</button>

        </div>

    </div>

</div>


<div class="appBorderContainer" data-dojo-type="dijit/layout/BorderContainer" style="width: 100%; height: 90%">


    <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="splitter:true, region:'center'">


        <div id="dwtcontrolContainer" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="splitter:true, region:'center'"></div>

        <script type="text/javascript" language="javascript">
            var gWebTwain;

            var _dwtParam = {
                'productKey': '437D8028CBA0F642AC5105A6E99BA14D1D45F21CCA3D48DF5FBB15D2B8753CCB1D45F21CCA3D48DF6BBD2BBE41CFACEF1D45F21CCA3D48DF295C5A96D999890130000000', /* please input your product key here. How to Generate Product Key>>
                 */
                'containerID': 'dwtcontrolContainer', /* the container's id. */
                'isTrial': 'true', /* true for a trial license. */
                'version': '9,2', /* The version of Dynamic Web TWAIN. */
                'resourcesPath': 'Resources', /* The relative path of MSI, CAB and PKG. */
                'width': 440,
                'height': 600
            };

            (function () {
                gWebTwain = new Dynamsoft.WebTwain(_dwtParam);
                /* create a Dynamic Web TWAIN object */
            })();

            function Simple_AcquireImage() {
                var DWObject = gWebTwain.getInstance();
                if (DWObject) {
                    DWObject.BrokerProcessType = 1;
                    /* use a separate process for document scanning */
                    DWObject.SelectSource();
                    DWObject.CloseSource();
                    DWObject.OpenSource();
                    DWObject.IfShowUI = false;
                    DWObject.AcquireImage();
                }
            }

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


            function addImageNameToImagesNamesContainer (imageName) {

                var imagesNamesContainer = document.getElementById('imagesNamesContainer');
                var imageNameElement = document.createElement('div');
                imageNameElement.innerHTML = imageName;
                imagesNamesContainer.appendChild(imageNameElement);

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

        </script>

    </div>


    <div div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="minSize: 200, region: 'trailing', splitter: true">

        <button id="scanButton" data-dojo-type="dijit/form/Button" type="button" role="button" onclick="Simple_AcquireImage();">Scan</button>
        <button id="addToSendingImagesButton" data-dojo-type="dijit/form/Button" type="button" role="button" onclick="appendImageToForm();">Add Scanned To Sending Images</button>

    </div>

</div>
