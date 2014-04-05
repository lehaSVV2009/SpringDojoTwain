<%@ page import="com.kadet.twainComparator.webEntity.SendingType" %>

<div data-dojo-type="dijit/form/Form" action="chooseSendingType" method="POST">

    <div data-dojo-type="dojox/layout/TableContainer" data-dojo-props="cols:1">

        <div data-dojo-type="dijit/form/RadioButton" title="Local Image:" name="sendingType" value="<%=SendingType.LOCAL_IMAGE%>"></div>
        <div data-dojo-type="dijit/form/RadioButton" title="Scanned Image:" name="sendingType" value="<%=SendingType.SCANNED_IMAGE%>" checked></div>

    </div>

    <button id="btnSubmit" data-dojo-type="dijit/form/Button" type="submit" role="button">Accept</button>

</div>
 