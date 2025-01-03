var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");


function getXmlHttpRequest()
{
	var httpRequest = null;
	try
	{
		httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (e)
	{
		try
		{
			httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch (e)
		{
			httpRequest = null;
		}
	}
	
	if (!httpRequest && typeof XMLHttpRequest != "undefined")
	{
		httpRequest = new XMLHttpRequest();
	}
	
	return httpRequest;
}

function getUrlSync(url)
{
	return getUrl(url, false, null);
}

function getUrlAsync(url, handleStateChange)
{
	return getUrl(url, true, handleStateChange);
}


// call a url
function getUrl(url, async, handleStateChange) {
	var xmlHttpReq = getXmlHttpRequest();

	if (!xmlHttpReq)
		return;

	if (handleStateChange)
	{
		xmlHttpReq.onreadystatechange = function()
			{
				handleStateChange(xmlHttpReq);
			};
	}
	else
	{
		xmlHttpReq.onreadystatechange = function() {;}
	}

	xmlHttpReq.open("GET", url, async);
	xmlHttpReq.send(null);
}

function postUrl(url, data, async, stateChangeCallback)
{ 
	var xmlHttpReq = getXmlHttpRequest(); 

	if (!xmlHttpReq)
		return;

	xmlHttpReq.open("POST", url, async);
	xmlHttpReq.onreadystatechange = function()
		{
			stateChangeCallback(xmlHttpReq);
		};
	xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlHttpReq.send(data);
	//alert ('url: ' + url + '\ndata: ' + data);
}

function urlEncodeDict(dict)
{ 
	var result = "";
	for (var i=0; i<dict.length; i++) {
		result += "&" + encodeURIComponent(dict[i].name) + "=" + encodeURIComponent(dict[i].value);
	}
	return result;
}

function execOnSuccess(stateChangeCallback)
{
	return function(xmlHttpReq)
		{
			if (xmlHttpReq.readyState == 4 &&
					xmlHttpReq.status == 200)
				stateChangeCallback(xmlHttpReq);
			//alert(xmlHttpReq + " " + xmlHttpReq.readyState + " " + xmlHttpReq.status);
		};
}


function postFormByForm(form, async, successCallback) {
	var formVars = new Array();
	for (var i = 0; i < form.elements.length; i++)
	{
		var formElement = form.elements[i];
		
		// Special handling for checkboxes (we need an array of selected checkboxes..)!
		if(formElement.type=='checkbox' && !formElement.checked) {
			continue;
		} 
		var v=new Object;
		v.name=formElement.name;
		v.value=formElement.value;
		formVars.push(v);		
	} 
	postUrl(form.action, urlEncodeDict(formVars), async, execOnSuccess(successCallback));
}

function postForm(formName, async, successCallback)
{
	// postFormByName
	var form = document.forms[formName];
	return postFormByForm(form, async, successCallback);
}

function replaceDivContents(xmlHttpRequest, dstDivId)
{
	var dstDiv = document.getElementById(dstDivId);
	dstDiv.innerHTML = xmlHttpRequest.responseText;
}


function getUrlXMLResponseCallback(xmlHttpReq) {
	if(xmlHttpReq.responseXML == null) {
		alert("Error while processing your request.");
		return;
	}
	var root_node = getRootNode(xmlHttpReq);
	var return_code = getNodeValue(root_node, 'return_code');
	//alert("return code " + return_code);

	if(return_code == 0) {
		redirect_val = getNodeValue(root_node, 'redirect_on_success');
		if(redirect_val != null) {
			window.location=redirect_val;
		} else {
			success_message = getNodeValue(root_node, 'success_message');
			if (success_message != null) {
				alert(success_message);
			}
			if(this.successCallback != null) {
				this.successCallback(xmlHttpReq);
			}
		}
	} else {
		var error_msg = getNodeValue(root_node, 'error_message');
		if (error_msg == null || error_msg.length == 0) {
			if(return_code==2) {
				error_msg = "You must be logged in to perform this operation.";
			} else {
				error_msg = "An error occured while performing this operation.";
			}
		}
		alert(error_msg)
	}
}

function getUrlXMLResponseCallbackFillDiv(xmlHttpReq) {
	getUrlXMLResponseCallback(xmlHttpReq);
	document.getElementById(this.div_id).innerHTML=getNodeValue(xmlHttpReq.responseXML, "html_content");
}

function getNodeValue(obj,tag)
{
	node=obj.getElementsByTagName(tag);
	if(node!=null && node.length>0) {
		return node[0].firstChild.nodeValue;
	} else {
		return null;
	}
}

function getRootNode(xmlHttpReq) {
	return xmlHttpReq.responseXML.getElementsByTagName('root')[0];
}

function getUrlXMLResponse(url, successCallback) {
	this.successCallback = successCallback;
	this.urlResponseCallback = getUrlXMLResponseCallback;
	getUrl(url, true, execOnSuccess(this.urlResponseCallback)) 
}

function getUrlXMLResponseAndFillDiv(url, div_id, successCallback) {
	this.successCallback = successCallback;
	this.urlResponseCallback = getUrlXMLResponseCallbackFillDiv;
	this.div_id = div_id;
	getUrl(url, true, execOnSuccess(this.urlResponseCallback)) 
}

function postUrlXMLResponse(url, data, successCallback) {
	this.successCallback = successCallback;
	this.urlResponseCallback = getUrlXMLResponseCallback;
	postUrl(url, data, true, execOnSuccess(this.urlResponseCallback))
}

function confirmAndPostUrlXMLResponse(url, confirmMessage, data, successCallback) {
	if (confirm(confirmMessage)) {
		postUrlXMLResponse(url, data, successCallback);
	}
}

function postFormXMLResponse(formName, successCallback) {
	this.successCallback = successCallback;
	postForm(formName, true, execOnSuccess(getUrlXMLResponseCallback))
}


}
/*
     FILE ARCHIVED ON 23:39:17 Mar 19, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:59:37 Dec 17, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.912
  exclusion.robots: 0.026
  exclusion.robots.policy: 0.012
  esindex: 0.014
  cdx.remote: 6.467
  LoadShardBlock: 183.489 (6)
  PetaboxLoader3.datanode: 196.309 (7)
  load_resource: 74.201
  PetaboxLoader3.resolve: 40.144
*/