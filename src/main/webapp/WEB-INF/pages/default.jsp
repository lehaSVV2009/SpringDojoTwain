<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="Content-Language" content="en"/>
    <title>IBA Twain</title>

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
    <title>

        Spring Twain Dojo

    </title>
</head>
<body class="claro">

<div class="appBorderContainer" data-dojo-type="dijit/layout/BorderContainer" style="width: 100%; height: 100%">

    <!-- HEADER -->

    <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'top', splitter:false">

        <tiles:insertAttribute name="header" ignore="true"/>

    </div>

    <!-- BODY -->


    <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'center', splitter:false">

        <tiles:insertAttribute name="body"/>

    </div>

    <!-- FOOTER -->

    <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'bottom', splitter:false">

        <tiles:insertAttribute name="footer" ignore="true"/>

    </div>

</div>


</body>
</html>