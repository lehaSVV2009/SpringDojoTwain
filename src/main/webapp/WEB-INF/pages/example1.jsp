<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="Content-Language" content="en"/>
    <title>Dojo Tutorial</title>

    <link rel="shortcut icon" href="<c:url value="/resources/images/favicon.png"/>"/>
    <link rel="stylesheet" href="<c:url value="/resources/css/reset.css"/>"/>
    <link rel="stylesheet" href="http://cdn.devgrid.net/ajax/dojo/1.9.0/dijit/themes/claro/claro.css"/>
    <link rel="stylesheet" href="<c:url value="/resources/css/main.css"/>"/>
    <script type="text/javascript">
        // Configure application.
        appConfig = {
            // Get base url from current url.
            baseUrl: location.href.substring(0, location.href.lastIndexOf("/") + 1)
        };

        // Configure Dojo.
        dojoConfig = {
            parseOnLoad: true
        };
    </script>
    <script type="text/javascript" src="http://cdn.devgrid.net/ajax/dojo/1.9.0/dojo/dojo.js"></script>
    <%--<script src="<c:url value="/resources/js/main.js" />"></script>--%>
    <script type="text/javascript">
        // Load application.
        require(
                {
                    packages: [
                        { name: 'app', location: appConfig.baseUrl + 'resources' }
                    ]
                },
                [
                    "app"
                ]
        );
    </script>
</head>
<body id="body" class="claro">


<div class="appBorderContainer" data-dojo-type="dijit/layout/BorderContainer" style="width: 1600px; height: 800px;">
    <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'top', splitter:false">
        This is the header content pane.
    </div>
    <div class="appLeadingAccordionContainer" data-dojo-type="dijit/layout/AccordionContainer" data-dojo-props="minSize:20, region:'leading', splitter:true">
        <div data-dojo-type="dijit/layout/AccordionPane" title="First pane">
            First pane content.
        </div>
        <div data-dojo-type="dijit/layout/AccordionPane" title="Second pane">
            Second pane content.
        </div>
        <div data-dojo-type="dijit/layout/AccordionPane" title="Third pane">
            Third pane content.
        </div>
    </div>
    <div id="appCenterTabContainer" data-dojo-type="dijit/layout/TabContainer" data-dojo-props="splitter:true, region:'center'">
        <div data-dojo-type="dijit/layout/ContentPane" title="Inline tab">
            First tab inline content.
        </div>
        <div data-dojo-type="dijit/layout/ContentPane" title="Remote html tab" href="<c:url value="/resources/view/second.html"/>">
        </div>
        <div data-dojo-type="dojox/layout/ContentPane" title="Dojox ContentPane tab" href="<c:url value="/resources/view/third.html"/>" data-dojo-props="closable:true">
        </div>
    </div>
    <div class="appTrailingAccordionContainer" data-dojo-type="dijit/layout/AccordionContainer" data-dojo-props="minSize:20, region:'trailing', splitter:true">
        <div data-dojo-type="dijit/layout/AccordionPane" title="First pane">
            First pane content.
        </div>
        <div data-dojo-type="dijit/layout/AccordionPane" title="Second pane">
            Second pane content.
        </div>
    </div>
    <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'bottom', splitter:false">
        This is the footer content pane.
    </div>
</div>


<div data-dojo-type="dijit/MenuBar">
    <div data-dojo-type="dijit/PopupMenuBarItem">
        <span>File</span>

        <div data-dojo-type="dijit/DropDownMenu">
            <div data-dojo-type="dijit/MenuItem" data-dojo-props="iconClass:'dijitEditorIcon appIconFileNew'">New</div>
            <div data-dojo-type="dijit/MenuItem" data-dojo-props="iconClass:'dijitEditorIcon appIconFileOpen'">Open
            </div>
            <div data-dojo-type="dijit/MenuItem" data-dojo-props="iconClass:'dijitEditorIcon appIconFileSave'">Save
            </div>
            <div data-dojo-type="dijit/MenuItem" data-dojo-props="iconClass:'dijitEditorIcon appIconFileSaveAs'">Save
                As...
            </div>
            <div data-dojo-type="dijit/MenuItem" data-dojo-props="iconClass:'dijitEditorIcon appIconFileClose'">Close
            </div>
            <div data-dojo-type="dijit/MenuItem" data-dojo-props="iconClass:'dijitEditorIcon appIconExit'">Exit</div>
        </div>
    </div>
    <div data-dojo-type="dijit/PopupMenuBarItem">
        <span>Edit</span>

        <div data-dojo-type="dijit/DropDownMenu">
            <div data-dojo-type="dijit/MenuItem" data-dojo-props="iconClass:'dijitEditorIcon appIconUndo'">Undo</div>
            <div data-dojo-type="dijit/MenuItem" data-dojo-props="iconClass:'dijitEditorIcon appIconRedo'">Redo</div>
            <div data-dojo-type="dijit/MenuSeparator"></div>
            <div data-dojo-type="dijit/MenuItem" data-dojo-props="iconClass:'dijitEditorIcon appIconEditCut'">Cut</div>
            <div data-dojo-type="dijit/MenuItem" data-dojo-props="iconClass:'dijitEditorIcon appIconEditCopy'">Copy
            </div>
            <div data-dojo-type="dijit/MenuItem" data-dojo-props="iconClass:'dijitEditorIcon appIconEditPaste'">Paste
            </div>
        </div>
    </div>
    <div data-dojo-type="dijit/PopupMenuBarItem">
        <span>Help</span>

        <div data-dojo-type="dijit/DropDownMenu">
            <div id="mbtnHelp" data-dojo-type="dijit/MenuItem"
                 data-dojo-props="iconClass:'dijitEditorIcon appIconHelp'">About
            </div>
        </div>
    </div>
</div>

<div data-dojo-type="dijit/Menu" contextMenuForWindow="true" style="display:none;">
    <div data-dojo-type="dijit/MenuItem" data-dojo-props="iconClass:'dijitEditorIcon appIconEditCut'">Cut</div>
    <div data-dojo-type="dijit/MenuItem" data-dojo-props="iconClass:'dijitEditorIcon appIconEditCopy'">Copy</div>
    <div data-dojo-type="dijit/MenuItem" data-dojo-props="iconClass:'dijitEditorIcon appIconEditPaste'">Paste</div>
    <div data-dojo-type="dijit/MenuSeparator"></div>
    <div data-dojo-type="dijit/PopupMenuItem">
        <span>Submenu</span>

        <div data-dojo-type="dijit/DropDownMenu" id="">
            <div id="mbtnAction1" data-dojo-type="dijit/MenuItem">Action 1</div>
            <div id="mbtnAction2" data-dojo-type="dijit/MenuItem">Action 2</div>
            <div id="mbtnAction3" data-dojo-type="dijit/MenuItem">Action 3</div>
        </div>
    </div>
</div>

<button id="btnClickMe" data-dojo-type="dijit/form/Button" type="button" role="button">Click me!</button>

<p>
    Click somewhere with right mouse button.
</p>


</body>
</html>
