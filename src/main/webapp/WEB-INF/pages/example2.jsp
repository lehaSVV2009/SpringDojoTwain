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


<div data-dojo-type="dijit/form/Form" enctype="multipart/form-data" action="" method="POST">
    <div data-dojo-type="dojox/layout/TableContainer" data-dojo-props="cols:1">
        <div data-dojo-type="app/form/AjaxValidationTextBox" data-dojo-props="ajaxUrl:'validate', invalidMessage:'Username is already taken'" title="Username:" name="username" value=""></div>
    </div>
    <button id="btnSubmit" data-dojo-type="dijit/form/Button" type="button" role="button">Submit</button>
</div>


<button id="btnClickMe" data-dojo-type="dijit/form/Button" type="button" role="button">Click me!</button>


<div data-dojo-type="dijit/form/Form" enctype="multipart/form-data" action="" method="POST">
    <div data-dojo-type="dojox/layout/TableContainer" data-dojo-props="cols:1">
        <div data-dojo-type="dijit/form/TextBox" title="TextBox:" name="text_box" value="Some text"></div>
        <div data-dojo-type="dijit/form/CurrencyTextBox" data-dojo-props="currency:'USD', invalidMessage:'Invalid value'" title="CurrencyTextBox:" name="currency_text_box" value="666.99"></div>
        <div data-dojo-type="dijit/form/DateTextBox" title="DateTextBox:" name="date_text_box" value="2013-06-22"></div>
        <div data-dojo-type="dijit/form/NumberSpinner" title="NumberSpinner:" name="number_spinner" value="123"></div>
        <div data-dojo-type="dijit/form/NumberTextBox" title="NumberTextBox:" name="number_text_box" value="123"></div>
        <div data-dojo-type="dijit/form/TimeTextBox" title="TimeTextBox:" name="time_text_box" value="T11:12:13"></div>
        <div data-dojo-type="dijit/form/ValidationTextBox" data-dojo-props="regExp:'^[a-zA-Z]+$', invalidMessage:'Invalid value'" title="ValidationTextBox:" name="validation_text_box" value="CharactersOnly"></div>
        <div data-dojo-type="dijit/form/Textarea" title="Textarea:" name="textarea" value="Some text in Textarea"></div>
        <select data-dojo-type="dijit/form/Select" title="Select:" name="select">
            <option value="Johnnie Walker">Johnnie Walker</option>
            <option value="Jack Daniels">Jack Daniels</option>
            <option value="Grant's Scotch">Grant's Scotch</option>
        </select>
        <select data-dojo-type="dijit/form/ComboBox" title="ComboBox:" name="combo_box">
            <option value="Johnnie Walker">Johnnie Walker</option>
            <option value="Jack Daniels">Jack Daniels</option>
            <option value="Grant's Scotch">Grant's Scotch</option>
        </select>
        <select data-dojo-type="dijit/form/MultiSelect" title="MultiSelect:" name="multi_select">
            <option value="Johnnie Walker">Johnnie Walker</option>
            <option value="Jack Daniels">Jack Daniels</option>
            <option value="Grant's Scotch">Grant's Scotch</option>
        </select>
        <select data-dojo-type="dijit/form/FilteringSelect" title="FilteringSelect:" name="filtering_select">
            <option value="Johnnie Walker">Johnnie Walker</option>
            <option value="Jack Daniels">Jack Daniels</option>
            <option value="Grant's Scotch">Grant's Scotch</option>
        </select>
        <div data-dojo-type="dijit/form/CheckBox" title="CheckBox:" name="check_box"></div>
        <div data-dojo-type="dijit/form/RadioButton" title="RadioButton:" name="radio_button" value="xxx"></div>
        <div data-dojo-type="dijit/form/RadioButton" title="RadioButton:" name="radio_button" value="xxx"></div>
        <div data-dojo-type="dijit/form/RadioButton" title="RadioButton:" name="radio_button" value="xxx"></div>
        <div data-dojo-type="dijit/form/HorizontalSlider" data-dojo-props="" title="HorizontalSlider:">
            <ol data-dojo-type="dijit/form/HorizontalRuleLabels" container="topDecoration" style="height:1.5em; font-size:0.7em;">
                <li>0%</li>
                <li></li>
                <li>50%</li>
                <li></li>
                <li>100%</li>
            </ol>
            <ol data-dojo-type="dijit/form/HorizontalRuleLabels" container="bottomDecoration" style="height:1.5em; font-size:0.7em;">
                <li></li>
                <li>25%</li>
                <li></li>
                <li>75%</li>
                <li></li>
            </ol>
        </div>
        <div data-dojo-type="dijit/form/VerticalSlider" data-dojo-props="" title="VerticalSlider:" style="height:300px">
            <ol data-dojo-type="dijit/form/VerticalRuleLabels" container="leftDecoration" style="height:300px; width:30px; font-size:0.7em;">
                <li>0%</li>
                <li></li>
                <li>50%</li>
                <li></li>
                <li>100%</li>
            </ol>
            <ol data-dojo-type="dijit/form/VerticalRuleLabels" container="rightDecoration" style="height:300px; width:30px; font-size:0.7em;">
                <li></li>
                <li>25%</li>
                <li></li>
                <li>75%</li>
                <li></li>
            </ol>
        </div>
    </div>
    <button data-dojo-type="dijit/form/Button" type="button" role="button">Submit</button>
</div>


</body>
</html>
