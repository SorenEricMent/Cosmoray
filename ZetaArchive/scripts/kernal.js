console.log("%cCOSMORAY ZETA","color: #BCBFE4; font-size: 20px");
console.log("%cKERNAL VERSION: COSMO2.0 F1","color: #BCBFE4; font-size: 20px");
console.log("%cZENITHIUM STUDIO - WINSLOWSORENERICMENT","color: #BCBFE4; font-size: 20px");
mdui_CSS = $('<link>', {
		rel : "stylesheet",
		href : "https://cdnjs.loli.net/ajax/libs/mdui/0.4.3/css/mdui.min.css"
	});
	mdui_JS = $('<script>', {
		src : "https://cdnjs.loli.net/ajax/libs/mdui/0.4.3/js/mdui.min.js"
	});
	mdui_CSS.appendTo('body');
	mdui_JS.appendTo('body');
try { 
	console.log(window); 
} catch(e){ 
	console.error("COSMORAY INIT ERROR");
	alert("COSMORAY初始化失败：环境错误");
}
if(typeof chrome.extension == "undefined"){
	console.error("COSMORAY INIT ERROR");
	alert("COSMORAY初始化失败：环境错误");
}else{
	webdriver = window.navigator.webdriver;
	if (webdriver) {
		alert("selenium");
	}else{
	CosmorayBasicModule();
	if (CosmorayBasicDataset.domainName == "tieba.baidu.com") {
		CosmoraySecurityController = new CosmoraySecurityModule();
		CosmorayKernalProtector = new KernalVirtualizationModule();
		CosmorayKernalProtector.AntiDebugging();
		if (CSMCalled && typeof (CosmorayDateObject) == "object") {
			mduiOnload();
			isActivate = false;
			var stTransferElement = document.createElement('script');
			stTransferElement.type = 'text/javascript';
			stTransferElement.innerHTML = "document.body.setAttribute('tbst', PageData.product);";
			document.head.appendChild(stTransferElement);
			document.head.removeChild(stTransferElement);
			var nTransferElement = document.createElement('script');
			nTransferElement.type = 'text/javascript';
			nTransferElement.innerHTML = "document.body.setAttribute('tbun', PageData.user.name);";
			document.head.appendChild(nTransferElement);
			document.head.removeChild(nTransferElement);
			tiebaST = document.body.getAttribute('tbst');
			tiebaID = document.body.getAttribute('tbun');
			if(tiebaID == "undefined" || tiebaID == null){
				var TransferElement1 = document.createElement('script');
				TransferElement1.type = 'text/javascript';
				TransferElement1.innerHTML = "document.body.setAttribute('tbun', PageData.user.user_name);";
			document.head.appendChild(TransferElement1);
			document.head.removeChild(TransferElement1);
			tiebaID = document.body.getAttribute('tbun');
			}
			if(tiebaST != "msg_center" && tiebaST != "itieba3" && tiebaST != "index" && tiebaST != "pmc"){
				__ACTIVATE__();
				console.log(CosmoraySecurityController.kernalEncryptMethod(CosmoraySecurityModule.toString()));
				console.log(CosmoraySecurityController.kernalEncryptMethod(CosmorayBasicModule.toString()));
				console.log(CosmoraySecurityController.kernalEncryptMethod(CosmorayInitiation.toString()));
				CosmorayInitiation(CSMCalled);
			}else if(tiebaST != "msg_center"&& tiebaST != "pmc"){
				__ACTIVATE__();
			}
		}
	}
	}
	}
	$(document).ajaxError(function (event, xhr, options) {
			mdui.snackbar({
				message: '检测到连接出现错误 请检查你的网络连接',
				position: 'right-top'
 			 });
 			 mdui.mutation();
	});
function mduiOnload(){
/*!
 * mdui v0.4.3 (https://mdui.org)
 * Copyright 2016-2019 zdhxiong
 * Licensed under MIT
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.mdui=e()}(this,function(){"use strict";var a,d={};a=0,window.requestAnimationFrame||(window.requestAnimationFrame=window.webkitRequestAnimationFrame,window.cancelAnimationFrame=window.webkitCancelAnimationFrame),window.requestAnimationFrame||(window.requestAnimationFrame=function(t,e){var n=(new Date).getTime(),i=Math.max(0,16.7-(n-a)),o=window.setTimeout(function(){t(n+i)},i);return a=n+i,o}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)});var n,g=function(){var c=function(t){for(var e=0;e<t.length;e+=1)this[e]=t[e];return this.length=t.length,this};function v(t){var e=[];if(!t)return new c(e);if(t instanceof c)return t;if("string"==typeof t){var n=t.trim();if("<"===n[0]&&">"===n[n.length-1]){var i="div";0===n.indexOf("<li")&&(i="ul"),0===n.indexOf("<tr")&&(i="tbody"),0!==n.indexOf("<td")&&0!==n.indexOf("<th")||(i="tr"),0===n.indexOf("<tbody")&&(i="table"),0===n.indexOf("<option")&&(i="select");var o=document.createElement(i);o.innerHTML=n;for(var a=0;a<o.childNodes.length;a+=1)e.push(o.childNodes[a])}else for(var s="#"!==t[0]||t.match(/[ .<>:~]/)?document.querySelectorAll(t):[document.getElementById(t.slice(1))],r=0;r<s.length;r+=1)s[r]&&e.push(s[r])}else{if("function"==typeof t)return v(document).ready(t);if(t.nodeType||t===window||t===document)e.push(t);else if(0<t.length&&t[0].nodeType)for(var d=0;d<t.length;d+=1)e.push(t[d])}return new c(e)}function t(){for(var e=this,n=[],t=arguments.length;t--;)n[t]=arguments[t];if(!n.length)return this;if(1===n.length)return Object.keys(n[0]).forEach(function(t){e[t]=n[0][t]}),this;for(var i=n.shift(),o=function(e){Object.keys(n[e]).forEach(function(t){i[t]=n[e][t]})},a=0;a<n.length;a+=1)o(a);return i}function u(t){return"object"==typeof t&&null!==t}function g(t){return"function"==typeof t}function b(t){return"string"==typeof t}function a(t){return"number"==typeof t.length}function x(t,e){if(a(t)){for(var n=0;n<t.length;n+=1)if(!1===e.call(t[n],n,t[n]))return t}else for(var i=Object.keys(t),o=0;o<i.length;o+=1)if(!1===e.call(t[i[o]],i[o],t[i[o]]))return t;return t}function e(t,n){var e,i,o=[];return x(t,function(t,e){null!=(i=n(e,t))&&o.push(i)}),(e=[]).concat.apply(e,o)}function s(n,t){return x(t,function(t,e){n.push(e)}),n}function r(t){for(var e=[],n=0;n<t.length;n+=1)-1===e.indexOf(t[n])&&e.push(t[n]);return e}(v.fn=c.prototype).extend=t,v.extend=t;var i={};function n(t,n,i,o){var a,s=[];return t.each(function(t,e){for(a=e[o];a;){if(2===i){if(!n||n&&v(a).is(n))break;s.push(a)}else{if(0===i){(!n||n&&v(a).is(n))&&s.push(a);break}(!n||n&&v(a).is(n))&&s.push(a)}a=a[o]}}),new c(r(s))}v.extend({each:x,merge:s,unique:r,map:e,contains:function(t,e){return t&&!e?document.documentElement.contains(t):t!==e&&t.contains(e)},param:function(t){if(!u(t))return"";var s=[];return x(t,function(t,e){!function n(i,o){var a;u(o)?x(o,function(t,e){a=Array.isArray(o)&&!u(e)?"":t,n(i+"["+a+"]",e)}):(a=null!==o&&""!==o?"="+encodeURIComponent(o):"",s.push(encodeURIComponent(i)+a))}(t,e)}),s.join("&")}}),v.fn.extend({each:function(t){return x(this,t)},map:function(n){return new c(e(this,function(t,e){return n.call(t,e,t)}))},get:function(t){return void 0===t?[].slice.call(this):this[0<=t?t:t+this.length]},slice:function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return new c([].slice.apply(this,t))},filter:function(n){if(g(n))return this.map(function(t,e){return n.call(e,t,e)?e:void 0});var i=v(n);return this.map(function(t,e){return-1<i.index(e)?e:void 0})},not:function(t){var n=this.filter(t);return this.map(function(t,e){return-1<n.index(e)?void 0:e})},offset:function(){if(this[0]){var t=this[0].getBoundingClientRect();return{left:t.left+window.pageXOffset,top:t.top+window.pageYOffset,width:t.width,height:t.height}}return null},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent;t&&"static"===v(t).css("position");)t=t.offsetParent;return t||document.documentElement})},position:function(){var t,e,n=this;if(!n[0])return null;var i,o,a={top:0,left:0};return"fixed"===n.css("position")?e=n[0].getBoundingClientRect():(t=n.offsetParent(),e=n.offset(),i=t[0],o="html",i.nodeName&&i.nodeName.toLowerCase()===o.toLowerCase()||(a=t.offset()),a={top:a.top+t.css("borderTopWidth"),left:a.left+t.css("borderLeftWidth")}),{top:e.top-a.top-n.css("marginTop"),left:e.left-a.left-n.css("marginLeft"),width:e.width,height:e.height}},show:function(){return this.each(function(){var t,e,n;"none"===this.style.display&&(this.style.display=""),"none"===window.getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=(t=this.nodeName,i[t]||(e=document.createElement(t),document.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"===n&&(n="block"),i[t]=n),i[t]))})},hide:function(){return this.each(function(){this.style.display="none"})},toggle:function(){return this.each(function(){this.style.display="none"===this.style.display?"":"none"})},hasClass:function(t){return!(!this[0]||!t)&&this[0].classList.contains(t)},removeAttr:function(t){return this.each(function(){this.removeAttribute(t)})},removeProp:function(t){return this.each(function(){try{delete this[t]}catch(t){}})},eq:function(t){var e=-1===t?this.slice(t):this.slice(t,+t+1);return new c(e)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},index:function(t){return t?b(t)?v(t).eq(0).parent().children().get().indexOf(this[0]):this.get().indexOf(t):this.eq(0).parent().children().get().indexOf(this[0])},is:function(t){var e=this[0];if(!e||null==t)return!1;if(b(t))return e!==document&&e!==window&&(e.matches||e.matchesSelector||e.webkitMatchesSelector||e.mozMatchesSelector||e.oMatchesSelector||e.msMatchesSelector).call(e,t);if(t===document||t===window)return e===t;if(t.nodeType||a(t)){for(var n=t.nodeType?[t]:t,i=0;i<n.length;i+=1)if(n[i]===e)return!0;return!1}return!1},find:function(i){var o=[];return this.each(function(t,e){var n=e.nodeType;1!==n&&9!==n||s(o,e.querySelectorAll(i))}),new c(o)},children:function(n){var i=[];return this.each(function(t,e){x(e.childNodes,function(t,e){1===e.nodeType&&(!n||n&&v(e).is(n))&&i.push(e)})}),new c(r(i))},has:function(t){var e=b(t)?this.find(t):v(t),n=e.length;return this.filter(function(){for(var t=0;t<n;t+=1)if(v.contains(this,e[t]))return!0;return!1})},siblings:function(t){return this.prevAll(t).add(this.nextAll(t))},closest:function(t){var e=this;return e.is(t)||(e=e.parents(t).eq(0)),e},remove:function(){return this.each(function(t,e){e.parentNode&&e.parentNode.removeChild(e)})},add:function(t){return new c(r(s(this.get(),v(t))))},empty:function(){return this.each(function(){this.innerHTML=""})},clone:function(){return this.map(function(){return this.cloneNode(!0)})},replaceWith:function(t){return this.before(t).remove()},serializeArray:function(){var n=[],t=this[0];return t&&t.elements&&v([].slice.call(t.elements)).each(function(){var t=v(this),e=t.attr("type");"fieldset"===this.nodeName.toLowerCase()||this.disabled||-1!==["submit","reset","button"].indexOf(e)||-1!==["radio","checkbox"].indexOf(e)&&!this.checked||n.push({name:t.attr("name"),value:t.val()})}),n},serialize:function(){var n=[];return x(this.serializeArray(),function(t,e){n.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),n.join("&")}}),x(["val","html","text"],function(i,t){var o={0:"value",1:"innerHTML",2:"textContent"},e={0:void 0,1:void 0,2:null};v.fn[t]=function(n){return void 0===n?this[0]?this[0][o[i]]:e[i]:this.each(function(t,e){e[o[i]]=n})}}),x(["attr","prop","css"],function(a,t){function s(t,e,n){0===a?t.setAttribute(e,n):1===a?t[e]=n:t.style[e]=n}v.fn[t]=function(e,i){var o=arguments.length;return 1===o&&b(e)?function(t,e){if(t)return 0===a?t.getAttribute(e):1===a?t[e]:window.getComputedStyle(t,null).getPropertyValue(e)}(this[0],e):this.each(function(t,n){2===o?s(n,e,i):x(e,function(t,e){s(n,t,e)})})}}),x(["add","remove","toggle"],function(t,i){v.fn[i+"Class"]=function(t){if(!t)return this;var e=t.split(" ");return this.each(function(t,n){x(e,function(t,e){n.classList[i](e)})})}}),x({Width:"width",Height:"height"},function(r,d){v.fn[d]=function(t){if(void 0!==t)return isNaN(Number(t))||""===t||(t+="px"),this.css(d,t);var e,n,i=this[0];if((n=i)&&n===n.window)return i["inner"+r];if((e=i)&&e.nodeType===e.DOCUMENT_NODE)return i.documentElement["scroll"+r];var o=v(i),a=0,s="width"===d;return"ActiveXObject"in window&&"border-box"===o.css("box-sizing")&&(a=parseFloat(o.css("padding-"+(s?"left":"top")))+parseFloat(o.css("padding-"+(s?"right":"bottom")))+parseFloat(o.css("border-"+(s?"left":"top")+"-width"))+parseFloat(o.css("border-"+(s?"right":"bottom")+"-width"))),parseFloat(v(i).css(d))+a}}),x({Width:"width",Height:"height"},function(t,n){v.fn["inner"+t]=function(){var t=this[n](),e=v(this[0]);return"border-box"!==e.css("box-sizing")&&(t+=parseFloat(e.css("padding-"+("width"===n?"left":"top"))),t+=parseFloat(e.css("padding-"+("width"===n?"right":"bottom")))),t}}),x(["","All","Until"],function(e,t){v.fn["prev"+t]=function(t){return n(0===e?this:v(this.get().reverse()),t,e,"previousElementSibling")}}),x(["","All","Until"],function(e,t){v.fn["next"+t]=function(t){return n(this,t,e,"nextElementSibling")}}),x(["","s","sUntil"],function(e,t){v.fn["parent"+t]=function(t){return n(0===e?this:v(this.get().reverse()),t,e,"parentNode")}}),x(["append","prepend"],function(a,t){v.fn[t]=function(t){var e,o=1<this.length;if(!b(t)||"<"===t[0]&&">"===t[t.length-1])e=v(t).get();else{var n=document.createElement("div");n.innerHTML=t,e=[].slice.call(n.childNodes)}return 1===a&&e.reverse(),this.each(function(n,i){x(e,function(t,e){o&&0<n&&(e=e.cloneNode(!0)),0===a?i.appendChild(e):i.insertBefore(e,i.childNodes[0])})})}}),x(["insertBefore","insertAfter"],function(o,t){v.fn[t]=function(t){var i=v(t);return this.each(function(t,n){i.each(function(t,e){e.parentNode.insertBefore(1===i.length?n:n.cloneNode(!0),0===o?e:e.nextSibling)})})}}),x({appendTo:"append",prependTo:"prepend",before:"insertBefore",after:"insertAfter",replaceAll:"replaceWith"},function(t,e){v.fn[t]=function(t){return v(t)[e](this),this}});var d="mduiElementDataStorage";v.extend({data:function(n,t,e){var i={};if(void 0!==e)i[t]=e;else{if(!u(t)){if(void 0===t){var o={};return x(n.attributes,function(t,e){var n=e.name;if(0===n.indexOf("data-")){var i=n.slice(5).replace(/-./g,function(t){return t.charAt(1).toUpperCase()});o[i]=e.value}}),n[d]&&x(n[d],function(t,e){o[t]=e}),o}if(n[d]&&t in n[d])return n[d][t];var a=n.getAttribute("data-"+t);return a||void 0}i=t}n[d]||(n[d]={}),x(i,function(t,e){n[d][t]=e})},removeData:function(t,e){t[d]&&t[d][e]&&(t[d][e]=null,delete t[d][e])}}),v.fn.extend({data:function(n,i){return void 0===i?u(n)?this.each(function(t,e){v.data(e,n)}):this[0]?v.data(this[0],n):void 0:this.each(function(t,e){v.data(e,n,i)})},removeData:function(n){return this.each(function(t,e){v.removeData(e,n)})}}),function(){try{return new t("test")}catch(t){}var t=function(t,e){e=e||{bubbles:!1,cancelable:!1};var n=document.createEvent("MouseEvent");return n.initMouseEvent(t,e.bubbles,e.cancelable,window,0,0,0,0,0,!1,!1,!1,!1,0,null),n};t.prototype=Event.prototype,window.MouseEvent=t}(),function(){function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}"function"!=typeof window.CustomEvent&&(t.prototype=window.Event.prototype,window.CustomEvent=t)}();var l={},o=1;function f(){return!1}function p(t){return t.mduiElementId||(o+=1,t.mduiElementId=o),t.mduiElementId}function h(a,t,s,r){(t||"").split(" ").forEach(function(t){var e,n,i,o;(e=a,n=t,i=s,o=r,(l[p(e)]||[]).filter(function(t){return t&&(!n||t.e===n)&&(!i||t.fn.toString()===i.toString())&&(!o||t.sel===o)})).forEach(function(t){delete l[p(a)][t.i],a.removeEventListener(t.e,t.proxy,!1)})})}v.fn.extend({ready:function(t){return/complete|loaded|interactive/.test(document.readyState)&&document.body?t(v):document.addEventListener("DOMContentLoaded",function(){t(v)},!1),this},on:function(t,n,i,e,o){var a=this;if(t&&!b(t))return x(t,function(t,e){a.on(t,n,i,e)}),a;if(b(n)||g(e)||!1===e||(e=i,i=n,n=void 0),(g(i)||!1===i)&&(e=i,i=void 0),!1===e&&(e=f),1===o){var s=e;e=function(){return a.off(t,n,e),s.apply(this,arguments)}}return this.each(function(){!function(o,t,a,s,r){var d=p(o);l[d]||(l[d]=[]);var c=!1;u(s)&&s.useCapture&&(c=!0),t.split(" ").forEach(function(t){var e={e:t,fn:a,sel:r,i:l[d].length};function n(t,e){!1===a.apply(e,void 0===t._detail?[t]:[t].concat(t._detail))&&(t.preventDefault(),t.stopPropagation())}function i(e){e._data=s,r?v(o).find(r).get().reverse().forEach(function(t){(t===e.target||v.contains(t,e.target))&&n(e,t)}):n(e,o)}e.proxy=i,l[d].push(e),o.addEventListener(e.e,i,c)})}(this,t,e,i,n)})},one:function(t,n,i,e){var o=this;return b(t)?t.split(" ").forEach(function(t){o.on(t,n,i,e,1)}):x(t,function(t,e){t.split(" ").forEach(function(t){o.on(t,n,i,e,1)})}),this},off:function(t,n,e){var i=this;return t&&!b(t)?(x(t,function(t,e){i.off(t,n,e)}),i):(b(n)||g(e)||!1===e||(e=n,n=void 0),!1===e&&(e=f),i.each(function(){h(this,t,e,n)}))},trigger:function(t,e){var n,i=-1<["click","mousedown","mouseup","mousemove"].indexOf(t);return(n=i?new MouseEvent(t,{bubbles:!0,cancelable:!0}):new CustomEvent(t,{detail:e,bubbles:!0,cancelable:!0}))._detail=e,this.each(function(){this.dispatchEvent(n)})}});var y={},w=0,$={ajaxStart:"start.mdui.ajax",ajaxSuccess:"success.mdui.ajax",ajaxError:"error.mdui.ajax",ajaxComplete:"complete.mdui.ajax"};function C(t){return 0<=["GET","HEAD"].indexOf(t)}function k(t,e){return(t+"&"+e).replace(/[&?]{1,2}/,"?")}return v.extend({ajaxSetup:function(t){v.extend(y,t||{})},ajax:function(a){var n={method:"GET",data:!1,processData:!0,async:!0,cache:!0,username:"",password:"",headers:{},xhrFields:{},statusCode:{},dataType:"text",jsonp:"callback",jsonpCallback:function(){return w+=1,"mduijsonp_"+Date.now()+"_"+w},contentType:"application/x-www-form-urlencoded",timeout:0,global:!0},i=["beforeSend","success","error","statusCode","complete"],s=!1,r=y,e={};function d(t,e){a.global&&v(document).trigger(t,e)}function c(t){for(var e,n,i=[],o=arguments.length-1;0<o--;)i[o]=arguments[o+1];t&&(t in r&&(e=r[t].apply(r,i)),a[t]&&(n=a[t].apply(a,i)),"beforeSend"!==t||!1!==e&&!1!==n||(s=!0))}x(r,function(t,e){i.indexOf(t)<0&&(n[t]=e)});var t,u=(a=v.extend({},n,a)).method.toUpperCase();if(a.url||(a.url=window.location.toString()),t=(C(u)||a.processData)&&a.data&&[ArrayBuffer,Blob,Document,FormData].indexOf(a.data.constructor)<0?b(a.data)?a.data:v.param(a.data):a.data,C(u)&&t&&(a.url=k(a.url,t),t=null),"jsonp"===a.dataType){var o,l=g(a.jsonpCallback)?a.jsonpCallback():a.jsonpCallback,f=k(a.url,a.jsonp+"="+l);if(e.options=a,d($.ajaxStart,e),c("beforeSend",null),s)return;var p=document.createElement("script");return p.type="text/javascript",p.onerror=function(){o&&clearTimeout(o),d($.ajaxError,e),c("error",null,"scripterror"),d($.ajaxComplete,e),c("complete",null,"scripterror")},p.src=f,window[l]=function(t){o&&clearTimeout(o),e.data=t,d($.ajaxSuccess,e),c("success",t,"success",null),v(p).remove(),p=null,delete window[l]},v("head").append(p),void(0<a.timeout&&(o=setTimeout(function(){v(p).remove(),p=null,d($.ajaxError,e),c("error",null,"timeout")},a.timeout)))}C(u)&&!a.cache&&(a.url=k(a.url,"_="+Date.now()));var h,m=new XMLHttpRequest;return m.open(u,a.url,a.async,a.username,a.password),(a.contentType||t&&!C(u)&&!1!==a.contentType)&&m.setRequestHeader("Content-Type",a.contentType),"json"===a.dataType&&m.setRequestHeader("Accept","application/json, text/javascript"),a.headers&&x(a.headers,function(t,e){m.setRequestHeader(t,e)}),void 0===a.crossDomain&&(a.crossDomain=/^([\w-]+:)?\/\/([^/]+)/.test(a.url)&&RegExp.$2!==window.location.host),a.crossDomain||m.setRequestHeader("X-Requested-With","XMLHttpRequest"),a.xhrFields&&x(a.xhrFields,function(t,e){m[t]=e}),e.xhr=m,e.options=a,m.onload=function(){var n;h&&clearTimeout(h);var i,o=200<=m.status&&m.status<300||0===m.status;if(o)if(n=204===m.status||"HEAD"===u?"nocontent":304===m.status?"notmodified":"success","json"===a.dataType){try{i=JSON.parse(m.responseText),e.data=i}catch(t){n="parsererror",d($.ajaxError,e),c("error",m,n)}"parsererror"!==n&&(d($.ajaxSuccess,e),c("success",i,n,m))}else i="text"===m.responseType||""===m.responseType?m.responseText:m.response,e.data=i,d($.ajaxSuccess,e),c("success",i,n,m);else n="error",d($.ajaxError,e),c("error",m,n);x([r.statusCode,a.statusCode],function(t,e){e&&e[m.status]&&(o?e[m.status](i,n,m):e[m.status](m,n))}),d($.ajaxComplete,e),c("complete",m,n)},m.onerror=function(){h&&clearTimeout(h),d($.ajaxError,e),c("error",m,m.statusText),d($.ajaxComplete,e),c("complete",m,"error")},m.onabort=function(){var t="abort";h&&(t="timeout",clearTimeout(h)),d($.ajaxError,e),c("error",m,t),d($.ajaxComplete,e),c("complete",m,t)},d($.ajaxStart,e),c("beforeSend",m),s||(0<a.timeout&&(h=setTimeout(function(){m.abort()},a.timeout)),m.send(t)),m}}),x($,function(t,e){v.fn[t]=function(n){return this.on(e,function(t,e){n(t,e.xhr,e.options,e.data)})}}),v}(),f=g(document),T=g(window),l={};n=[],l.queue=function(t,e){if(void 0===n[t]&&(n[t]=[]),void 0===e)return n[t];n[t].push(e)},l.dequeue=function(t){void 0!==n[t]&&n[t].length&&n[t].shift()()};var r={touches:0,isAllow:function(t){var e=!0;return r.touches&&-1<["mousedown","mouseup","mousemove","click","mouseover","mouseout","mouseenter","mouseleave"].indexOf(t.type)&&(e=!1),e},register:function(t){"touchstart"===t.type?r.touches+=1:-1<["touchmove","touchend","touchcancel"].indexOf(t.type)&&setTimeout(function(){r.touches&&(r.touches-=1)},500)},start:"touchstart mousedown",move:"touchmove mousemove",end:"touchend mouseup",cancel:"touchcancel mouseleave",unlock:"touchend touchmove touchcancel"};g(function(){setTimeout(function(){g("body").addClass("mdui-loaded")},0)});var i,s=function(t){var e={};if(null===t||!t)return e;if("object"==typeof t)return t;var n=t.indexOf("{");try{e=new Function("","var json = "+t.substr(n)+"; return JSON.parse(JSON.stringify(json));")()}catch(t){}return e},p=function(t,e,n,i,o){o||(o={}),o.inst=n;var a=t+".mdui."+e;"undefined"!=typeof jQuery&&jQuery(i).trigger(a,o),g(i).trigger(a,o)};g.fn.extend({reflow:function(){return this.each(function(){return this.clientLeft})},transition:function(t){return"string"!=typeof t&&(t+="ms"),this.each(function(){this.style.webkitTransitionDuration=t,this.style.transitionDuration=t})},transitionEnd:function(e){var n,i=["webkitTransitionEnd","transitionend"],o=this;function a(t){if(t.target===this)for(e.call(this,t),n=0;n<i.length;n++)o.off(i[n],a)}if(e)for(n=0;n<i.length;n++)o.on(i[n],a);return this},transformOrigin:function(t){return this.each(function(){this.style.webkitTransformOrigin=t,this.style.transformOrigin=t})},transform:function(t){return this.each(function(){this.style.webkitTransform=t,this.style.transform=t})}}),g.extend({showOverlay:function(t){var e=g(".mdui-overlay");e.length?(e.data("isDeleted",0),void 0!==t&&e.css("z-index",t)):(void 0===t&&(t=2e3),e=g('<div class="mdui-overlay">').appendTo(document.body).reflow().css("z-index",t));var n=e.data("overlay-level")||0;return e.data("overlay-level",++n).addClass("mdui-overlay-show")},hideOverlay:function(t){var e=g(".mdui-overlay");if(e.length){var n=t?1:e.data("overlay-level");1<n?e.data("overlay-level",--n):e.data("overlay-level",0).removeClass("mdui-overlay-show").data("isDeleted",1).transitionEnd(function(){e.data("isDeleted")&&e.remove()})}},lockScreen:function(){var t=g("body"),e=t.width();t.addClass("mdui-locked").width(e);var n=t.data("lockscreen-level")||0;t.data("lockscreen-level",++n)},unlockScreen:function(t){var e=g("body"),n=t?1:e.data("lockscreen-level");1<n?e.data("lockscreen-level",--n):e.data("lockscreen-level",0).removeClass("mdui-locked").width("")},throttle:function(n,i){var o=null;return(!i||i<16)&&(i=16),function(){var t=this,e=arguments;null===o&&(o=setTimeout(function(){n.apply(t,e),o=null},i))}}}),i={},g.extend({guid:function(t){if(void 0!==t&&void 0!==i[t])return i[t];function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}var n=e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e();return void 0!==t&&(i[t]=n),n}}),function(){var a={};function s(t,e,n,i,o){var a=g(n),s=a.data("mdui.mutation");s||(s=[],a.data("mdui.mutation",s)),-1===s.indexOf(t)&&(s.push(t),e.call(n,i,o))}g.fn.extend({mutation:function(){return this.each(function(t,e){var o=g(this);g.each(a,function(n,i){o.is(n)&&s(n,i,o[0],t,e),o.find(n).each(function(t,e){s(n,i,this,t,e)})})})}}),d.mutation=function(n,i){"string"==typeof n&&"function"==typeof i?(a[n]=i,g(n).each(function(t,e){s(n,i,this,t,e)})):g(document).mutation()}}(),d.Headroom=function(){var a={tolerance:5,offset:0,initialClass:"mdui-headroom",pinnedClass:"mdui-headroom-pinned-top",unpinnedClass:"mdui-headroom-unpinned-top"};function t(t,e){var n=this;if(n.$headroom=g(t).eq(0),n.$headroom.length){var i=n.$headroom.data("mdui.headroom");if(i)return i;n.options=g.extend({},a,e||{});var o=n.options.tolerance;o!==Object(o)&&(n.options.tolerance={down:o,up:o}),n._init()}}t.prototype._init=function(){var t=this;t.state="pinned",t.$headroom.addClass(t.options.initialClass).removeClass(t.options.pinnedClass+" "+t.options.unpinnedClass),t.inited=!1,t.lastScrollY=0,t._attachEvent()},t.prototype._attachEvent=function(){var t=this;t.inited||(t.lastScrollY=window.pageYOffset,t.inited=!0,T.on("scroll",function(){t._scroll()}))},t.prototype._scroll=function(){var i=this;i.rafId=window.requestAnimationFrame(function(){var t=window.pageYOffset,e=t>i.lastScrollY?"down":"up",n=Math.abs(t-i.lastScrollY)>=i.options.tolerance[e];t>i.lastScrollY&&t>=i.options.offset&&n?i.unpin():(t<i.lastScrollY&&n||t<=i.options.offset)&&i.pin(),i.lastScrollY=t})};var e=function(t){"pinning"===t.state&&(t.state="pinned",p("pinned","headroom",t,t.$headroom)),"unpinning"===t.state&&(t.state="unpinned",p("unpinned","headroom",t,t.$headroom))};return t.prototype.pin=function(){var t=this;"pinning"!==t.state&&"pinned"!==t.state&&t.$headroom.hasClass(t.options.initialClass)&&(p("pin","headroom",t,t.$headroom),t.state="pinning",t.$headroom.removeClass(t.options.unpinnedClass).addClass(t.options.pinnedClass).transitionEnd(function(){e(t)}))},t.prototype.unpin=function(){var t=this;"unpinning"!==t.state&&"unpinned"!==t.state&&t.$headroom.hasClass(t.options.initialClass)&&(p("unpin","headroom",t,t.$headroom),t.state="unpinning",t.$headroom.removeClass(t.options.pinnedClass).addClass(t.options.unpinnedClass).transitionEnd(function(){e(t)}))},t.prototype.enable=function(){this.inited||this._init()},t.prototype.disable=function(){var t=this;t.inited&&(t.inited=!1,t.$headroom.removeClass([t.options.initialClass,t.options.pinnedClass,t.options.unpinnedClass].join(" ")),T.off("scroll",function(){t._scroll()}),window.cancelAnimationFrame(t.rafId))},t.prototype.getState=function(){return this.state},t}(),g(function(){d.mutation("[mdui-headroom]",function(){var t=g(this),e=s(t.attr("mdui-headroom")),n=t.data("mdui.headroom");n||(n=new d.Headroom(t,e),t.data("mdui.headroom",n))})});var c,h,u,t,e,o,m,v=function(){var s={accordion:!1};function t(t,e,n){var i=this;i.ns=n;var o="mdui-"+i.ns+"-item";if(i.class_item=o,i.class_item_open=o+"-open",i.class_header=o+"-header",i.class_body=o+"-body",i.$collapse=g(t).eq(0),i.$collapse.length){var a=i.$collapse.data("mdui."+i.ns);if(a)return a;i.options=g.extend({},s,e||{}),i.$collapse.on("click","."+i.class_header,function(){var t=g(this).parent("."+i.class_item);i.$collapse.children(t).length&&i.toggle(t)}),i.$collapse.on("click","[mdui-"+i.ns+"-item-close]",function(){var t=g(this).parents("."+i.class_item).eq(0);i._isOpen(t)&&i.close(t)})}}t.prototype._isOpen=function(t){return t.hasClass(this.class_item_open)},t.prototype._getItem=function(t){return parseInt(t)===t?this.$collapse.children("."+this.class_item).eq(t):g(t).eq(0)};var o=function(t,e,n){t._isOpen(n)?(e.transition(0).height("auto").reflow().transition(""),p("opened",t.ns,t,n[0])):(e.height(""),p("closed",t.ns,t,n[0]))};return t.prototype.open=function(t){var e=this,n=e._getItem(t);if(!e._isOpen(n)){e.options.accordion&&e.$collapse.children("."+e.class_item_open).each(function(){var t=g(this);t!==n&&e.close(t)});var i=n.children("."+e.class_body);i.height(i[0].scrollHeight).transitionEnd(function(){o(e,i,n)}),p("open",e.ns,e,n[0]),n.addClass(e.class_item_open)}},t.prototype.close=function(t){var e=this,n=e._getItem(t);if(e._isOpen(n)){var i=n.children("."+e.class_body);p("close",e.ns,e,n[0]),n.removeClass(e.class_item_open),i.transition(0).height(i[0].scrollHeight).reflow().transition("").height("").transitionEnd(function(){o(e,i,n)})}},t.prototype.toggle=function(t){var e=this._getItem(t);this._isOpen(e)?this.close(e):this.open(e)},t.prototype.openAll=function(){var e=this;e.$collapse.children("."+e.class_item).each(function(){var t=g(this);e._isOpen(t)||e.open(t)})},t.prototype.closeAll=function(){var e=this;e.$collapse.children("."+e.class_item).each(function(){var t=g(this);e._isOpen(t)&&e.close(t)})},t}();return d.Collapse=function(t,e){return new v(t,e,"collapse")},g(function(){d.mutation("[mdui-collapse]",function(){var t=g(this),e=t.data("mdui.collapse");if(!e){var n=s(t.attr("mdui-collapse"));e=new d.Collapse(t,n),t.data("mdui.collapse",e)}})}),function(){var i=function(t){return"<"+t+' class="mdui-table-cell-checkbox"><label class="mdui-checkbox"><input type="checkbox"/><i class="mdui-checkbox-icon"></i></label></'+t+">"};function n(t){this.$table=g(t).eq(0),this.$table.length&&this.init()}n.prototype.init=function(){var t=this;t.$thRow=t.$table.find("thead tr"),t.$tdRows=t.$table.find("tbody tr"),t.$tdCheckboxs=g(),t.selectable=t.$table.hasClass("mdui-table-selectable"),t.selectedRow=0,t._updateThCheckbox(),t._updateTdCheckbox(),t._updateNumericCol()},n.prototype._updateThCheckboxStatus=function(){var t=this,e=t.$thCheckbox[0];e.checked=t.selectedRow===t.$tdRows.length,e.indeterminate=t.selectedRow&&t.selectedRow!==t.$tdRows.length},n.prototype._updateTdCheckbox=function(){var n=this;n.$tdRows.each(function(){var t=g(this);if(t.find(".mdui-table-cell-checkbox").remove(),n.selectable){var e=g(i("td")).prependTo(t).find('input[type="checkbox"]');t.hasClass("mdui-table-row-selected")&&(e[0].checked=!0,n.selectedRow++),n._updateThCheckboxStatus(),e.on("change",function(){e[0].checked?(t.addClass("mdui-table-row-selected"),n.selectedRow++):(t.removeClass("mdui-table-row-selected"),n.selectedRow--),n._updateThCheckboxStatus()}),n.$tdCheckboxs=n.$tdCheckboxs.add(e)}})},n.prototype._updateThCheckbox=function(){var t=this;t.$thRow.find(".mdui-table-cell-checkbox").remove(),t.selectable&&(t.$thCheckbox=g(i("th")).prependTo(t.$thRow).find('input[type="checkbox"]').on("change",function(){var n=t.$thCheckbox[0].checked;t.selectedRow=n?t.$tdRows.length:0,t.$tdCheckboxs.each(function(t,e){e.checked=n}),t.$tdRows.each(function(t,e){g(e)[n?"addClass":"removeClass"]("mdui-table-row-selected")})}))},n.prototype._updateNumericCol=function(){var n,i,o=this;o.$thRow.find("th").each(function(e,t){n=g(t),o.$tdRows.each(function(){i=g(this);var t=n.hasClass("mdui-table-col-numeric")?"addClass":"removeClass";i.find("td").eq(e)[t]("mdui-table-col-numeric")})})},d.mutation(".mdui-table",function(){var t=g(this);t.data("mdui.table")||t.data("mdui.table",new n(t))}),d.updateTables=function(){g(arguments.length?arguments[0]:".mdui-table").each(function(){var t=g(this),e=t.data("mdui.table");e?e.init():t.data("mdui.table",new n(t))})}}(),c={delay:200,show:function(t,e){if(2!==t.button){var n,i=(n="touches"in t&&t.touches.length?t.touches[0]:t).pageX,o=n.pageY,a=e.offset(),s=i-a.left,r=o-a.top,d=e.innerHeight(),c=e.innerWidth(),u=Math.max(Math.pow(Math.pow(d,2)+Math.pow(c,2),.5),48),l="translate3d("+(c/2-s)+"px, "+(d/2-r)+"px, 0) scale(1)";g('<div class="mdui-ripple-wave" style="width: '+u+"px; height: "+u+"px; margin-top:-"+u/2+"px; margin-left:-"+u/2+"px; left:"+s+"px; top:"+r+'px;"></div>').data("translate",l).prependTo(e).reflow().transform(l)}},hide:function(t,e){var n=g(e||this);n.children(".mdui-ripple-wave").each(function(){!function(t){if(!t.length||t.data("isRemoved"))return;t.data("isRemoved",!0);var e=setTimeout(function(){t.remove()},400),n=t.data("translate");t.addClass("mdui-ripple-wave-fill").transform(n.replace("scale(1)","scale(1.01)")).transitionEnd(function(){clearTimeout(e),t.addClass("mdui-ripple-wave-out").transform(n.replace("scale(1)","scale(1.01)")),e=setTimeout(function(){t.remove()},700),setTimeout(function(){t.transitionEnd(function(){clearTimeout(e),t.remove()})},0)})}(g(this))}),n.off("touchmove touchend touchcancel mousemove mouseup mouseleave",c.hide)}},f.on(r.start,function(e){if(r.isAllow(e)&&(r.register(e),e.target!==document)){var n,t=g(e.target);if((n=t.hasClass("mdui-ripple")?t:t.parents(".mdui-ripple").eq(0)).length){if(n[0].disabled||null!==n.attr("disabled"))return;if("touchstart"===e.type){var i=!1,o=setTimeout(function(){o=null,c.show(e,n)},c.delay),a=function(t){o&&(clearTimeout(o),o=null,c.show(e,n)),i||(i=!0,c.hide(t,n))};n.on("touchmove",function(t){o&&(clearTimeout(o),o=null),a(t)}).on("touchend touchcancel",a)}else c.show(e,n),n.on("touchmove touchend touchcancel mousemove mouseup mouseleave",c.hide)}}}).on(r.unlock,r.register),h=function(t,e){return!("object"!=typeof t||null===t||void 0===t[e]||!t[e])&&t[e]},f.on("input focus blur",".mdui-textfield-input",{useCapture:!0},function(t){var e=t.target,n=g(e),i=t.type,o=n.val(),a=h(t.detail,"reInit"),s=h(t.detail,"domLoadedEvent"),r=n.attr("type")||"";if(!(0<=["checkbox","button","submit","range","radio","image"].indexOf(r))){var d=n.parent(".mdui-textfield");if("focus"===i&&d.addClass("mdui-textfield-focus"),"blur"===i&&d.removeClass("mdui-textfield-focus"),"blur"!==i&&"input"!==i||d[o&&""!==o?"addClass":"removeClass"]("mdui-textfield-not-empty"),d[e.disabled?"addClass":"removeClass"]("mdui-textfield-disabled"),"input"!==i&&"blur"!==i||s||e.validity&&d[e.validity.valid?"removeClass":"addClass"]("mdui-textfield-invalid-html5"),"textarea"===t.target.nodeName.toLowerCase()){var c=n.val(),u=!1;""===c.replace(/[\r\n]/g,"")&&(n.val(" "+c),u=!0),n.height("");var l=n.height(),f=e.scrollHeight;l<f&&n.height(f),u&&n.val(c)}a&&d.find(".mdui-textfield-counter").remove();var p=n.attr("maxlength");p&&((a||s)&&g('<div class="mdui-textfield-counter"><span class="mdui-textfield-counter-inputed"></span> / '+p+"</div>").appendTo(d),d.find(".mdui-textfield-counter-inputed").text(o.length.toString())),(d.find(".mdui-textfield-helper").length||d.find(".mdui-textfield-error").length||p)&&d.addClass("mdui-textfield-has-bottom")}}),f.on("click",".mdui-textfield-expandable .mdui-textfield-icon",function(){g(this).parents(".mdui-textfield").addClass("mdui-textfield-expanded").find(".mdui-textfield-input")[0].focus()}),f.on("click",".mdui-textfield-expanded .mdui-textfield-close",function(){g(this).parents(".mdui-textfield").removeClass("mdui-textfield-expanded").find(".mdui-textfield-input").val("")}),d.updateTextFields=function(){g(arguments.length?arguments[0]:".mdui-textfield").each(function(){g(this).find(".mdui-textfield-input").trigger("input",{reInit:!0})})},g(function(){d.mutation(".mdui-textfield",function(){g(this).find(".mdui-textfield-input").trigger("input",{domLoadedEvent:!0})})}),u=function(t){var e=t.data(),n=e.$track,i=e.$fill,o=e.$thumb,a=e.$input,s=e.min,r=e.max,d=e.disabled,c=e.discrete,u=e.$thumbText,l=a.val(),f=(l-s)/(r-s)*100;i.width(f+"%"),n.width(100-f+"%"),d&&(i.css("padding-right","6px"),n.css("padding-left","6px")),o.css("left",f+"%"),c&&u.text(l),t[0===parseFloat(f)?"addClass":"removeClass"]("mdui-slider-zero")},t=function(t){var e=g('<div class="mdui-slider-track"></div>'),n=g('<div class="mdui-slider-fill"></div>'),i=g('<div class="mdui-slider-thumb"></div>'),o=t.find('input[type="range"]'),a=o[0].disabled;t[a?"addClass":"removeClass"]("mdui-slider-disabled"),t.find(".mdui-slider-track").remove(),t.find(".mdui-slider-fill").remove(),t.find(".mdui-slider-thumb").remove(),t.append(e).append(n).append(i);var s,r=t.hasClass("mdui-slider-discrete");r&&(s=g("<span></span>"),i.empty().append(s)),t.data({$track:e,$fill:n,$thumb:i,$input:o,min:o.attr("min"),max:o.attr("max"),disabled:a,discrete:r,$thumbText:s}),u(t)},e='.mdui-slider input[type="range"]',f.on("input change",e,function(){var t=g(this).parent();u(t)}).on(r.start,e,function(t){r.isAllow(t)&&(r.register(t),this.disabled||g(this).parent().addClass("mdui-slider-focus"))}).on(r.end,e,function(t){r.isAllow(t)&&(this.disabled||g(this).parent().removeClass("mdui-slider-focus"))}).on(r.unlock,e,r.register),d.updateSliders=function(){g(arguments.length?arguments[0]:".mdui-slider").each(function(){t(g(this))})},g(function(){d.mutation(".mdui-slider",function(){t(g(this))})}),d.Fab=function(){var o={trigger:"hover"};function t(t,e){var n=this;if(n.$fab=g(t).eq(0),n.$fab.length){var i=n.$fab.data("mdui.fab");if(i)return i;n.options=g.extend({},o,e||{}),n.state="closed",n.$btn=n.$fab.find(".mdui-fab"),n.$dial=n.$fab.find(".mdui-fab-dial"),n.$dialBtns=n.$dial.find(".mdui-fab"),"hover"===n.options.trigger&&(n.$btn.on("touchstart mouseenter",function(){n.open()}),n.$fab.on("mouseleave",function(){n.close()})),"click"===n.options.trigger&&n.$btn.on(r.start,function(){n.open()}),f.on(r.start,function(t){g(t.target).parents(".mdui-fab-wrapper").length||n.close()})}}return t.prototype.open=function(){var n=this;"opening"!==n.state&&"opened"!==n.state&&(n.$dialBtns.each(function(t,e){e.style["transition-delay"]=e.style["-webkit-transition-delay"]=15*(n.$dialBtns.length-t)+"ms"}),n.$dial.css("height","auto").addClass("mdui-fab-dial-show"),n.$btn.find(".mdui-fab-opened").length&&n.$btn.addClass("mdui-fab-opened"),n.state="opening",p("open","fab",n,n.$fab),n.$dialBtns.eq(0).transitionEnd(function(){n.$btn.hasClass("mdui-fab-opened")&&(n.state="opened",p("opened","fab",n,n.$fab))}))},t.prototype.close=function(){var t=this;"closing"!==t.state&&"closed"!==t.state&&(t.$dialBtns.each(function(t,e){e.style["transition-delay"]=e.style["-webkit-transition-delay"]=15*t+"ms"}),t.$dial.removeClass("mdui-fab-dial-show"),t.$btn.removeClass("mdui-fab-opened"),t.state="closing",p("close","fab",t,t.$fab),t.$dialBtns.eq(-1).transitionEnd(function(){t.$btn.hasClass("mdui-fab-opened")||(t.state="closed",p("closed","fab",t,t.$fab),t.$dial.css("height",0))}))},t.prototype.toggle=function(){var t=this;"opening"===t.state||"opened"===t.state?t.close():"closing"!==t.state&&"closed"!==t.state||t.open()},t.prototype.getState=function(){return this.state},t.prototype.show=function(){this.$fab.removeClass("mdui-fab-hide")},t.prototype.hide=function(){this.$fab.addClass("mdui-fab-hide")},t}(),g(function(){f.on("touchstart mousedown mouseover","[mdui-fab]",function(t){var e=g(this),n=e.data("mdui.fab");if(!n){var i=s(e.attr("mdui-fab"));n=new d.Fab(e,i),e.data("mdui.fab",n)}})}),d.Select=function(){var a={position:"auto",gutter:16};function t(t,e){var n=this,i=n.$selectNative=g(t).eq(0);if(i.length){var o=i.data("mdui.select");if(o)return o;i.hide(),n.options=g.extend({},a,e||{}),n.uniqueID=g.guid(),n.state="closed",n.handleUpdate(),f.on("click touchstart",function(t){var e=g(t.target);"opening"!==n.state&&"opened"!==n.state||e.is(n.$select)||g.contains(n.$select[0],e[0])||n.close()})}}t.prototype.handleUpdate=function(){var i=this;"opening"!==i.state&&"opened"!==i.state||i.close();var n=i.$selectNative;i.value=n.val(),i.text="",i.$items=g(),n.find("option").each(function(t,e){var n={value:e.value,text:e.textContent,disabled:e.disabled,selected:i.value===e.value,index:t};i.value===n.value&&(i.text=n.text,i.selectedIndex=t),i.$items=i.$items.add(g('<div class="mdui-select-menu-item mdui-ripple"'+(n.disabled?" disabled":"")+(n.selected?" selected":"")+">"+n.text+"</div>").data(n))}),i.$selected=g('<span class="mdui-select-selected">'+i.text+"</span>"),i.$select=g('<div class="mdui-select mdui-select-position-'+i.options.position+'" style="'+i.$selectNative.attr("style")+'" id="'+i.uniqueID+'"></div>').show().append(i.$selected),i.$menu=g('<div class="mdui-select-menu"></div>').appendTo(i.$select).append(i.$items),g("#"+i.uniqueID).remove(),n.after(i.$select),i.size=parseInt(i.$selectNative.attr("size")),(!i.size||i.size<0)&&(i.size=i.$items.length,8<i.size&&(i.size=8)),i.$items.on("click",function(){if("closing"!==i.state){var t=g(this);if(!t.data("disabled")){var e=t.data();i.$selected.text(e.text),n.val(e.value),i.$items.removeAttr("selected"),t.attr("selected",""),i.selectedIndex=e.index,i.value=e.value,i.text=e.text,n.trigger("change"),i.close()}}}),i.$select.on("click",function(t){var e=g(t.target);e.is(".mdui-select-menu")||e.is(".mdui-select-menu-item")||i.toggle()})};var e=function(t){t.$select.removeClass("mdui-select-closing"),"opening"===t.state&&(t.state="opened",p("opened","select",t,t.$selectNative),t.$menu.css("overflow-y","auto")),"closing"===t.state&&(t.state="closed",p("closed","select",t,t.$selectNative),t.$select.width(""),t.$menu.css({"margin-top":"",height:"",width:""}))};return t.prototype.open=function(){var t=this;"opening"!==t.state&&"opened"!==t.state&&(t.state="opening",p("open","select",t,t.$selectNative),function(t){var e,n,i=T.height(),o=t.options.gutter,a=t.options.position,s=parseInt(t.$select.height()),r=t.$items.eq(0),d=parseInt(r.height()),c=parseInt(r.css("margin-top")),u=parseFloat(t.$select.width()+.01),l=d*t.size+2*c,f=t.$select[0].getBoundingClientRect().top;if("auto"===a){var p=i-2*o;p<l&&(l=p),n=-(c+t.selectedIndex*d+(d-s)/2);var h=-(c+(t.size-1)*d+(d-s)/2);n<h&&(n=h);var m=f+n;m<o?n=-(f-o):i<m+l+o&&(n=-(f+l+o-i)),e=t.selectedIndex*d+d/2+c+"px"}else"bottom"===a?(n=s,e="0px"):"top"===a&&(n=-l-1,e="100%");t.$select.width(u),t.$menu.width(u).height(l).css({"margin-top":n+"px","transform-origin":"center "+e+" 0"})}(t),t.$select.addClass("mdui-select-open"),t.$menu.transitionEnd(function(){e(t)}))},t.prototype.close=function(){var t=this;"closing"!==t.state&&"closed"!==t.state&&(t.state="closing",p("close","select",t,t.$selectNative),t.$menu.css("overflow-y",""),t.$select.removeClass("mdui-select-open").addClass("mdui-select-closing"),t.$menu.transitionEnd(function(){e(t)}))},t.prototype.toggle=function(){var t=this;"opening"===t.state||"opened"===t.state?t.close():"closing"!==t.state&&"closed"!==t.state||t.open()},t}(),g(function(){d.mutation("[mdui-select]",function(){var t=g(this),e=t.data("mdui.select");e||(e=new d.Select(t,s(t.attr("mdui-select"))),t.data("mdui.select",e))})}),g(function(){d.mutation(".mdui-appbar-scroll-hide",function(){var t=g(this);t.data("mdui.headroom",new d.Headroom(t))}),d.mutation(".mdui-appbar-scroll-toolbar-hide",function(){var t=g(this),e=new d.Headroom(t,{pinnedClass:"mdui-headroom-pinned-toolbar",unpinnedClass:"mdui-headroom-unpinned-toolbar"});t.data("mdui.headroom",e)})}),d.Tab=function(){var a={trigger:"click",loop:!1},s=function(t){return t[0].disabled||null!==t.attr("disabled")};function t(t,e){var n=this;if(n.$tab=g(t).eq(0),n.$tab.length){var i=n.$tab.data("mdui.tab");if(i)return i;n.options=g.extend({},a,e||{}),n.$tabs=n.$tab.children("a"),n.$indicator=g('<div class="mdui-tab-indicator"></div>').appendTo(n.$tab),n.activeIndex=!1;var o=location.hash;o&&n.$tabs.each(function(t,e){if(g(e).attr("href")===o)return n.activeIndex=t,!1}),!1===n.activeIndex&&n.$tabs.each(function(t,e){if(g(e).hasClass("mdui-tab-active"))return n.activeIndex=t,!1}),n.$tabs.length&&!1===n.activeIndex&&(n.activeIndex=0),n._setActive(),T.on("resize",g.throttle(function(){n._setIndicatorPosition()},100)),n.$tabs.each(function(t,e){n._bindTabEvent(e)})}}return t.prototype._bindTabEvent=function(e){var n=this,i=g(e),t=function(t){s(i)?t.preventDefault():(n.activeIndex=n.$tabs.index(e),n._setActive())};i.on("click",t),"hover"===n.options.trigger&&i.on("mouseenter",t),i.on("click",function(t){0===i.attr("href").indexOf("#")&&t.preventDefault()})},t.prototype._setActive=function(){var o=this;o.$tabs.each(function(t,e){var n=g(e),i=n.attr("href");t!==o.activeIndex||s(n)?(n.removeClass("mdui-tab-active"),g(i).hide()):(n.hasClass("mdui-tab-active")||(p("change","tab",o,o.$tab,{index:o.activeIndex,id:i.substr(1)}),p("show","tab",o,n),n.addClass("mdui-tab-active")),g(i).show(),o._setIndicatorPosition())})},t.prototype._setIndicatorPosition=function(){var t,e,n=this;!1!==n.activeIndex?(t=n.$tabs.eq(n.activeIndex),s(t)||(e=t.offset(),n.$indicator.css({left:e.left+n.$tab[0].scrollLeft-n.$tab[0].getBoundingClientRect().left+"px",width:t.width()+"px"}))):n.$indicator.css({left:0,width:0})},t.prototype.next=function(){var t=this;!1!==t.activeIndex&&(t.$tabs.length>t.activeIndex+1?t.activeIndex++:t.options.loop&&(t.activeIndex=0),t._setActive())},t.prototype.prev=function(){var t=this;!1!==t.activeIndex&&(0<t.activeIndex?t.activeIndex--:t.options.loop&&(t.activeIndex=t.$tabs.length-1),t._setActive())},t.prototype.show=function(n){var i=this;!1!==i.activeIndex&&(parseInt(n)===n?i.activeIndex=n:i.$tabs.each(function(t,e){if(e.id===n)return i.activeIndex=t,!1}),i._setActive())},t.prototype.handleUpdate=function(){var n=this,t=n.$tabs,e=n.$tab.children("a"),i=t.get(),o=e.get();if(!e.length)return n.activeIndex=!1,n.$tabs=e,void n._setIndicatorPosition();e.each(function(t,e){i.indexOf(e)<0&&(n._bindTabEvent(e),!1===n.activeIndex?n.activeIndex=0:t<=n.activeIndex&&n.activeIndex++)}),t.each(function(t,e){o.indexOf(e)<0&&(t<n.activeIndex?n.activeIndex--:t===n.activeIndex&&(n.activeIndex=0))}),n.$tabs=e,n._setActive()},t}(),g(function(){d.mutation("[mdui-tab]",function(){var t=g(this),e=t.data("mdui.tab");e||(e=new d.Tab(t,s(t.attr("mdui-tab"))),t.data("mdui.tab",e))})}),d.Drawer=function(){var o={overlay:!1,swipe:!1},a=function(){return 1024<=T.width()};function t(t,e){var n=this;if(n.$drawer=g(t).eq(0),n.$drawer.length){var i=n.$drawer.data("mdui.drawer");if(i)return i;n.options=g.extend({},o,e||{}),n.overlay=!1,n.position=n.$drawer.hasClass("mdui-drawer-right")?"right":"left",n.$drawer.hasClass("mdui-drawer-close")?n.state="closed":n.$drawer.hasClass("mdui-drawer-open")?n.state="opened":a()?n.state="opened":n.state="closed",T.on("resize",g.throttle(function(){a()?(n.overlay&&!n.options.overlay&&(g.hideOverlay(),n.overlay=!1,g.unlockScreen()),n.$drawer.hasClass("mdui-drawer-close")||(n.state="opened")):n.overlay||"opened"!==n.state||(n.$drawer.hasClass("mdui-drawer-open")?(g.showOverlay(),n.overlay=!0,g.lockScreen(),g(".mdui-overlay").one("click",function(){n.close()})):n.state="closed")},100)),n.$drawer.find("[mdui-drawer-close]").each(function(){g(this).on("click",function(){n.close()})}),function(a){var e,s,r,d,c=!1,u=!1,l=g("body"),n=24;function f(t,e){var n="right"===a.position?-1:1,i="translate("+-1*n*t+"px, 0) !important;";a.$drawer.css("cssText","transform:"+i+(e?"transition: initial !important;":""))}function o(){a.$drawer.css({transform:"",transition:""})}function p(){return a.$drawer.width()+10}function h(t){return Math.min(Math.max("closing"===c?d-t:p()+d-t,0),p())}function i(t){s=t.touches[0].pageX,"right"===a.position&&(s=l.width()-s),r=t.touches[0].pageY,"opened"!==a.state&&(n<s||e!==i)||(u=!0,l.on({touchmove:m,touchend:v,touchcancel:m}))}function m(t){var e=t.touches[0].pageX;"right"===a.position&&(e=l.width()-e);var n=t.touches[0].pageY;if(c)f(h(e),!0);else if(u){var i=Math.abs(e-s),o=Math.abs(n-r);8<i&&o<=8?(d=e,c="opened"===a.state?"closing":"opening",g.lockScreen(),f(h(e),!0)):i<=8&&8<o&&v()}}function v(t){if(c){var e=t.changedTouches[0].pageX;"right"===a.position&&(e=l.width()-e);var n=h(e)/p();u=!1;var i=c;c=null,"opening"===i?n<.92?(o(),a.open()):o():.08<n?(o(),a.close()):o(),g.unlockScreen()}else u=!1;l.off({touchmove:m,touchend:v,touchcancel:m})}a.options.swipe&&(e||(l.on("touchstart",i),e=i))}(n)}}var e=function(t){t.$drawer.hasClass("mdui-drawer-open")?(t.state="opened",p("opened","drawer",t,t.$drawer)):(t.state="closed",p("closed","drawer",t,t.$drawer))};return t.prototype.open=function(){var t=this;"opening"!==t.state&&"opened"!==t.state&&(t.state="opening",p("open","drawer",t,t.$drawer),t.options.overlay||g("body").addClass("mdui-drawer-body-"+t.position),t.$drawer.removeClass("mdui-drawer-close").addClass("mdui-drawer-open").transitionEnd(function(){e(t)}),a()&&!t.options.overlay||(t.overlay=!0,g.showOverlay().one("click",function(){t.close()}),g.lockScreen()))},t.prototype.close=function(){var t=this;"closing"!==t.state&&"closed"!==t.state&&(t.state="closing",p("close","drawer",t,t.$drawer),t.options.overlay||g("body").removeClass("mdui-drawer-body-"+t.position),t.$drawer.addClass("mdui-drawer-close").removeClass("mdui-drawer-open").transitionEnd(function(){e(t)}),t.overlay&&(g.hideOverlay(),t.overlay=!1,g.unlockScreen()))},t.prototype.toggle=function(){var t=this;"opening"===t.state||"opened"===t.state?t.close():"closing"!==t.state&&"closed"!==t.state||t.open()},t.prototype.getState=function(){return this.state},t}(),g(function(){d.mutation("[mdui-drawer]",function(){var t=g(this),e=s(t.attr("mdui-drawer")),n=e.target;delete e.target;var i=g(n).eq(0),o=i.data("mdui.drawer");o||(o=new d.Drawer(i,e),i.data("mdui.drawer",o)),t.on("click",function(){o.toggle()})})}),d.Dialog=function(){var n,i,a,o={history:!0,overlay:!0,modal:!1,closeOnEsc:!0,closeOnCancel:!0,closeOnConfirm:!0,destroyOnClosed:!1},s="__md_dialog",r=function(){if(a){var t=a.$dialog,e=t.children(".mdui-dialog-title"),n=t.children(".mdui-dialog-content"),i=t.children(".mdui-dialog-actions");t.height(""),n.height("");var o=t.height();t.css({top:(T.height()-o)/2+"px",height:o+"px"}),n.height(o-(e.height()||0)-(i.height()||0))}},d=function(){location.hash.substring(1).indexOf("mdui-dialog")<0&&a.close(!0)},c=function(t){g(t.target).hasClass("mdui-overlay")&&a&&a.close()};function t(t,e){var n=this;if(n.$dialog=g(t).eq(0),n.$dialog.length){var i=n.$dialog.data("mdui.dialog");if(i)return i;g.contains(document.body,n.$dialog[0])||(n.append=!0,g("body").append(n.$dialog)),n.options=g.extend({},o,e||{}),n.state="closed",n.$dialog.find("[mdui-dialog-cancel]").each(function(){g(this).on("click",function(){p("cancel","dialog",n,n.$dialog),n.options.closeOnCancel&&n.close()})}),n.$dialog.find("[mdui-dialog-confirm]").each(function(){g(this).on("click",function(){p("confirm","dialog",n,n.$dialog),n.options.closeOnConfirm&&n.close()})}),n.$dialog.find("[mdui-dialog-close]").each(function(){g(this).on("click",function(){n.close()})})}}var u=function(t){t.$dialog.hasClass("mdui-dialog-open")?(t.state="opened",p("opened","dialog",t,t.$dialog)):(t.state="closed",p("closed","dialog",t,t.$dialog),t.$dialog.hide(),0===l.queue(s).length&&!a&&i&&(g.unlockScreen(),i=!1),T.off("resize",g.throttle(function(){r()},100)),t.options.destroyOnClosed&&t.destroy())};return t.prototype._doOpen=function(){var t=this;if(a=t,i||(g.lockScreen(),i=!0),t.$dialog.show(),r(),T.on("resize",g.throttle(function(){r()},100)),t.state="opening",p("open","dialog",t,t.$dialog),t.$dialog.addClass("mdui-dialog-open").transitionEnd(function(){u(t)}),n||(n=g.showOverlay(5100)),n[t.options.modal?"off":"on"]("click",c).css("opacity",t.options.overlay?"":0),t.options.history){var e=location.hash.substring(1);-1<e.indexOf("mdui-dialog")&&(e=e.replace(/[&?]?mdui-dialog/g,"")),location.hash=e?e+(-1<e.indexOf("?")?"&":"?")+"mdui-dialog":"mdui-dialog",T.on("hashchange",d)}},t.prototype.open=function(){var t=this;"opening"!==t.state&&"opened"!==t.state&&(a&&("opening"===a.state||"opened"===a.state)||l.queue(s).length?l.queue(s,function(){t._doOpen()}):t._doOpen())},t.prototype.close=function(){var t=this,e=arguments;setTimeout(function(){"closing"!==t.state&&"closed"!==t.state&&(a=null,t.state="closing",p("close","dialog",t,t.$dialog),0===l.queue(s).length&&n&&(g.hideOverlay(),n=null),t.$dialog.removeClass("mdui-dialog-open").transitionEnd(function(){u(t)}),t.options.history&&0===l.queue(s).length&&(e[0]||window.history.back(),T.off("hashchange",d)),setTimeout(function(){l.dequeue(s)},100))},0)},t.prototype.toggle=function(){var t=this;"opening"===t.state||"opened"===t.state?t.close():"closing"!==t.state&&"closed"!==t.state||t.open()},t.prototype.getState=function(){return this.state},t.prototype.destroy=function(){this.append&&this.$dialog.remove(),this.$dialog.removeData("mdui.dialog"),0!==l.queue(s).length||a||(n&&(g.hideOverlay(),n=null),i&&(g.unlockScreen(),i=!1))},t.prototype.handleUpdate=function(){r()},f.on("keydown",function(t){a&&a.options.closeOnEsc&&"opened"===a.state&&27===t.keyCode&&a.close()}),t}(),g(function(){f.on("click","[mdui-dialog]",function(){var t=g(this),e=s(t.attr("mdui-dialog")),n=e.target;delete e.target;var i=g(n).eq(0),o=i.data("mdui.dialog");o||(o=new d.Dialog(i,e),i.data("mdui.dialog",o)),o.open()})}),d.dialog=function(n){var i={text:"",bold:!1,close:!0,onClick:function(t){}};n=g.extend({},{title:"",content:"",buttons:[],stackedButtons:!1,cssClass:"",history:!0,overlay:!0,modal:!1,closeOnEsc:!0,destroyOnClosed:!0,onOpen:function(){},onOpened:function(){},onClose:function(){},onClosed:function(){}},n||{}),g.each(n.buttons,function(t,e){n.buttons[t]=g.extend({},i,e)});var o="";n.buttons.length&&(o='<div class="mdui-dialog-actions '+(n.stackedButtons?"mdui-dialog-actions-stacked":"")+'">',g.each(n.buttons,function(t,e){o+='<a href="javascript:void(0)" class="mdui-btn mdui-ripple mdui-text-color-primary '+(e.bold?"mdui-btn-bold":"")+'">'+e.text+"</a>"}),o+="</div>");var t='<div class="mdui-dialog '+n.cssClass+'">'+(n.title?'<div class="mdui-dialog-title">'+n.title+"</div>":"")+(n.content?'<div class="mdui-dialog-content">'+n.content+"</div>":"")+o+"</div>",a=new d.Dialog(t,{history:n.history,overlay:n.overlay,modal:n.modal,closeOnEsc:n.closeOnEsc,destroyOnClosed:n.destroyOnClosed});return n.buttons.length&&a.$dialog.find(".mdui-dialog-actions .mdui-btn").each(function(t,e){g(e).on("click",function(){"function"==typeof n.buttons[t].onClick&&n.buttons[t].onClick(a),n.buttons[t].close&&a.close()})}),"function"==typeof n.onOpen&&a.$dialog.on("open.mdui.dialog",function(){n.onOpen(a)}).on("opened.mdui.dialog",function(){n.onOpened(a)}).on("close.mdui.dialog",function(){n.onClose(a)}).on("closed.mdui.dialog",function(){n.onClosed(a)}),a.open(),a},d.alert=function(t,e,n,i){"function"==typeof e&&(e="",n=arguments[1],i=arguments[2]),void 0===n&&(n=function(){}),void 0===i&&(i={});return i=g.extend({},{confirmText:"ok",history:!0,modal:!1,closeOnEsc:!0},i),d.dialog({title:e,content:t,buttons:[{text:i.confirmText,bold:!1,close:!0,onClick:n}],cssClass:"mdui-dialog-alert",history:i.history,modal:i.modal,closeOnEsc:i.closeOnEsc})},d.confirm=function(t,e,n,i,o){"function"==typeof e&&(e="",n=arguments[1],i=arguments[2],o=arguments[3]),void 0===n&&(n=function(){}),void 0===i&&(i=function(){}),void 0===o&&(o={});return o=g.extend({},{confirmText:"ok",cancelText:"cancel",history:!0,modal:!1,closeOnEsc:!0},o),d.dialog({title:e,content:t,buttons:[{text:o.cancelText,bold:!1,close:!0,onClick:i},{text:o.confirmText,bold:!1,close:!0,onClick:n}],cssClass:"mdui-dialog-confirm",history:o.history,modal:o.modal,closeOnEsc:o.closeOnEsc})},d.prompt=function(t,e,i,n,o){"function"==typeof e&&(e="",i=arguments[1],n=arguments[2],o=arguments[3]),void 0===i&&(i=function(){}),void 0===n&&(n=function(){}),void 0===o&&(o={});var a='<div class="mdui-textfield">'+(t?'<label class="mdui-textfield-label">'+t+"</label>":"")+("text"===(o=g.extend({},{confirmText:"ok",cancelText:"cancel",history:!0,modal:!1,closeOnEsc:!0,type:"text",maxlength:"",defaultValue:"",confirmOnEnter:!1},o)).type?'<input class="mdui-textfield-input" type="text" value="'+o.defaultValue+'" '+(o.maxlength?'maxlength="'+o.maxlength+'"':"")+"/>":"")+("textarea"===o.type?'<textarea class="mdui-textfield-input" '+(o.maxlength?'maxlength="'+o.maxlength+'"':"")+">"+o.defaultValue+"</textarea>":"")+"</div>",s=n;"function"==typeof n&&(s=function(t){var e=t.$dialog.find(".mdui-textfield-input").val();n(e,t)});var r=i;return"function"==typeof i&&(r=function(t){var e=t.$dialog.find(".mdui-textfield-input").val();i(e,t)}),d.dialog({title:e,content:a,buttons:[{text:o.cancelText,bold:!1,close:!0,onClick:s},{text:o.confirmText,bold:!1,close:!0,onClick:r}],cssClass:"mdui-dialog-prompt",history:o.history,modal:o.modal,closeOnEsc:o.closeOnEsc,onOpen:function(n){var t=n.$dialog.find(".mdui-textfield-input");d.updateTextFields(t),t[0].focus(),"text"===o.type&&!0===o.confirmOnEnter&&t.on("keydown",function(t){if(13===t.keyCode){var e=n.$dialog.find(".mdui-textfield-input").val();i(e,n),n.close()}}),"textarea"===o.type&&t.on("input",function(){n.handleUpdate()}),o.maxlength&&n.handleUpdate()}})},d.Tooltip=function(){var o={position:"auto",delay:0,content:""};function i(t){var e,n,i,o=t.$target[0].getBoundingClientRect(),a=1024<T.width()?14:24,s=t.$tooltip[0].offsetWidth,r=t.$tooltip[0].offsetHeight;switch(i=t.options.position,-1===["bottom","top","left","right"].indexOf(i)&&(i=o.top+o.height+a+r+2<T.height()?"bottom":a+r+2<o.top?"top":a+s+2<o.left?"left":o.width+a+s+2<T.width()-o.left?"right":"bottom"),i){case"bottom":e=s/2*-1,n=o.height/2+a,t.$tooltip.transformOrigin("top center");break;case"top":e=s/2*-1,n=-1*(r+o.height/2+a),t.$tooltip.transformOrigin("bottom center");break;case"left":e=-1*(s+o.width/2+a),n=r/2*-1,t.$tooltip.transformOrigin("center right");break;case"right":e=o.width/2+a,n=r/2*-1,t.$tooltip.transformOrigin("center left")}var d=t.$target.offset();t.$tooltip.css({top:d.top+o.height/2+"px",left:d.left+o.width/2+"px","margin-left":e+"px","margin-top":n+"px"})}function t(t,e){var n=this;if(n.$target=g(t).eq(0),n.$target.length){var i=n.$target.data("mdui.tooltip");if(i)return i;n.options=g.extend({},o,e||{}),n.state="closed",n.$tooltip=g('<div class="mdui-tooltip" id="'+g.guid()+'">'+n.options.content+"</div>").appendTo(document.body),n.$target.on("touchstart mouseenter",function(t){this.disabled||r.isAllow(t)&&(r.register(t),n.open())}).on("touchend mouseleave",function(t){this.disabled||r.isAllow(t)&&n.close()}).on(r.unlock,function(t){this.disabled||r.register(t)})}}var e=function(t){t.$tooltip.hasClass("mdui-tooltip-open")?(t.state="opened",p("opened","tooltip",t,t.$target)):(t.state="closed",p("closed","tooltip",t,t.$target))};return t.prototype._doOpen=function(){var t=this;t.state="opening",p("open","tooltip",t,t.$target),t.$tooltip.addClass("mdui-tooltip-open").transitionEnd(function(){e(t)})},t.prototype.open=function(t){var e=this;if("opening"!==e.state&&"opened"!==e.state){var n=g.extend({},e.options);g.extend(e.options,s(e.$target.attr("mdui-tooltip"))),t&&g.extend(e.options,t),n.content!==e.options.content&&e.$tooltip.html(e.options.content),i(e),e.options.delay?e.timeoutId=setTimeout(function(){e._doOpen()},e.options.delay):(e.timeoutId=!1,e._doOpen())}},t.prototype.close=function(){var t=this;t.timeoutId&&(clearTimeout(t.timeoutId),t.timeoutId=!1),"closing"!==t.state&&"closed"!==t.state&&(t.state="closing",p("close","tooltip",t,t.$target),t.$tooltip.removeClass("mdui-tooltip-open").transitionEnd(function(){e(t)}))},t.prototype.toggle=function(){var t=this;"opening"===t.state||"opened"===t.state?t.close():"closing"!==t.state&&"closed"!==t.state||t.open()},t.prototype.getState=function(){return this.state},t}(),g(function(){f.on("touchstart mouseover","[mdui-tooltip]",function(){var t=g(this),e=t.data("mdui.tooltip");if(!e){var n=s(t.attr("mdui-tooltip"));e=new d.Tooltip(t,n),t.data("mdui.tooltip",e)}})}),function(){var n,i="__md_snackbar",a={timeout:4e3,buttonText:"",buttonColor:"",position:"bottom",closeOnButtonClick:!0,closeOnOutsideClick:!0,onClick:function(){},onButtonClick:function(){},onOpen:function(){},onOpened:function(){},onClose:function(){},onClosed:function(){}},o=function(t){var e=g(t.target);e.hasClass("mdui-snackbar")||e.parents(".mdui-snackbar").length||n.close()};function s(t,e){var n=this;if(n.message=t,n.options=g.extend({},a,e||{}),n.message){n.state="closed",n.timeoutId=!1;var i="",o="";0===n.options.buttonColor.indexOf("#")||0===n.options.buttonColor.indexOf("rgb")?i='style="color:'+n.options.buttonColor+'"':""!==n.options.buttonColor&&(o="mdui-text-color-"+n.options.buttonColor),n.$snackbar=g('<div class="mdui-snackbar"><div class="mdui-snackbar-text">'+n.message+"</div>"+(n.options.buttonText?'<a href="javascript:void(0)" class="mdui-snackbar-action mdui-btn mdui-ripple mdui-ripple-white '+o+'" '+i+">"+n.options.buttonText+"</a>":"")+"</div>").appendTo(document.body),n._setPosition("close"),n.$snackbar.reflow().addClass("mdui-snackbar-"+n.options.position)}}s.prototype._setPosition=function(t){var e,n,i=this.$snackbar[0].clientHeight,o=this.options.position;e="bottom"===o||"top"===o?"-50%":"0","open"===t?n="0":("bottom"===o&&(n=i),"top"===o&&(n=-i),"left-top"!==o&&"right-top"!==o||(n=-i-24),"left-bottom"!==o&&"right-bottom"!==o||(n=i+24)),this.$snackbar.transform("translate("+e+","+n+"px)")},s.prototype.open=function(){var e=this;e.message&&"opening"!==e.state&&"opened"!==e.state&&(n?l.queue(i,function(){e.open()}):((n=e).state="opening",e.options.onOpen(),e._setPosition("open"),e.$snackbar.transitionEnd(function(){"opening"===e.state&&(e.state="opened",e.options.onOpened(),e.options.buttonText&&e.$snackbar.find(".mdui-snackbar-action").on("click",function(){e.options.onButtonClick(),e.options.closeOnButtonClick&&e.close()}),e.$snackbar.on("click",function(t){g(t.target).hasClass("mdui-snackbar-action")||e.options.onClick()}),e.options.closeOnOutsideClick&&f.on(r.start,o),e.options.timeout&&(e.timeoutId=setTimeout(function(){e.close()},e.options.timeout)))})))},s.prototype.close=function(){var t=this;t.message&&"closing"!==t.state&&"closed"!==t.state&&(t.timeoutId&&clearTimeout(t.timeoutId),t.options.closeOnOutsideClick&&f.off(r.start,o),t.state="closing",t.options.onClose(),t._setPosition("close"),t.$snackbar.transitionEnd(function(){"closing"===t.state&&(n=null,t.state="closed",t.options.onClosed(),t.$snackbar.remove(),l.dequeue(i))}))},d.snackbar=function(t,e){"string"!=typeof t&&(t=(e=t).message);var n=new s(t,e);return n.open(),n}}(),f.on("click",".mdui-bottom-nav>a",function(){var n,i=g(this),o=i.parent();o.children("a").each(function(t,e){(n=i.is(e))&&p("change","bottomNav",null,o,{index:t}),g(e)[n?"addClass":"removeClass"]("mdui-bottom-nav-active")})}),d.mutation(".mdui-bottom-nav-scroll-hide",function(){var t=g(this),e=new d.Headroom(t,{pinnedClass:"mdui-headroom-pinned-down",unpinnedClass:"mdui-headroom-unpinned-down"});t.data("mdui.headroom",e)}),o=function(){var t=!!arguments.length&&arguments[0];return'<div class="mdui-spinner-layer '+(t?"mdui-spinner-layer-"+t:"")+'"><div class="mdui-spinner-circle-clipper mdui-spinner-left"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-gap-patch"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-circle-clipper mdui-spinner-right"><div class="mdui-spinner-circle"></div></div></div>'},m=function(t){var e,n=g(t);e=n.hasClass("mdui-spinner-colorful")?o("1")+o("2")+o("3")+o("4"):o(),n.html(e)},g(function(){d.mutation(".mdui-spinner",function(){m(this)})}),d.updateSpinners=function(){g(arguments.length?arguments[0]:".mdui-spinner").each(function(){m(this)})},d.Panel=function(t,e){return new v(t,e,"panel")},g(function(){d.mutation("[mdui-panel]",function(){var t=g(this),e=t.data("mdui.panel");if(!e){var n=s(t.attr("mdui-panel"));e=new d.Panel(t,n),t.data("mdui.panel",e)}})}),d.Menu=function(){var a={position:"auto",align:"auto",gutter:16,fixed:!1,covered:"auto",subMenuTrigger:"hover",subMenuDelay:200},s=function(t){var e,n,i,o,a,s,r=T.height(),d=T.width(),c=t.options.gutter,u=t.isCovered,l=t.options.fixed,f=t.$menu.width(),p=t.$menu.height(),h=t.$anchor,m=h[0].getBoundingClientRect(),v=m.top,g=m.left,b=m.height,x=m.width,y=r-v-b,w=d-g-x,$=h[0].offsetTop,C=h[0].offsetLeft;if(i="auto"===t.options.position?p+c<y+(u?b:0)?"bottom":p+c<v+(u?b:0)?"top":"center":t.options.position,o="auto"===t.options.align?f+c<w+x?"left":f+c<g+x?"right":"center":t.options.align,"bottom"===i)s="0",n=(u?0:b)+(l?v:$);else if("top"===i)s="100%",n=(u?b:0)+(l?v-p:$-p);else{s="50%";var k=p;t.isCascade||r<p+2*c&&(k=r-2*c,t.$menu.height(k)),n=(r-k)/2+(l?0:$-v)}if(t.$menu.css("top",n+"px"),"left"===o)a="0",e=l?g:C;else if("right"===o)a="100%",e=l?g+x-f:C+x-f;else{a="50%";var O=f;d<f+2*c&&(O=d-2*c,t.$menu.width(O)),e=(d-O)/2+(l?0:C-g)}t.$menu.css("left",e+"px"),t.$menu.transformOrigin(a+" "+s)},u=function(t){var e,n,i,o,a,s,r,d,c,u,l,f,p,h,m,v,g;d=(e=t).parent(".mdui-menu-item"),c=T.height(),u=T.width(),l=e.width(),f=e.height(),p=d[0].getBoundingClientRect(),h=p.width,m=p.height,v=p.left,g=p.top,a=l<u-v-h?"left":l<v?"right":"left","bottom"==(o=f<c-g?"bottom":f<g+m?"top":"bottom")?n=r="0":"top"===o&&(r="100%",n=-f+m),e.css("top",n+"px"),"left"===a?(s="0",i=h):"right"===a&&(s="100%",i=-l),e.css("left",i+"px"),e.transformOrigin(s+" "+r),t.addClass("mdui-menu-open").parent(".mdui-menu-item").addClass("mdui-menu-item-active")},l=function(t){t.removeClass("mdui-menu-open").addClass("mdui-menu-closing").transitionEnd(function(){t.removeClass("mdui-menu-closing")}).parent(".mdui-menu-item").removeClass("mdui-menu-item-active"),t.find(".mdui-menu").each(function(){var t=g(this);t.removeClass("mdui-menu-open").addClass("mdui-menu-closing").transitionEnd(function(){t.removeClass("mdui-menu-closing")}).parent(".mdui-menu-item").removeClass("mdui-menu-item-active")})},r=function(r){var d,c;(r.$menu.on("click",".mdui-menu-item",function(t){var e=g(this),n=g(t.target);if(null===e.attr("disabled")&&!n.is(".mdui-menu")&&!n.is(".mdui-divider")&&n.parents(".mdui-menu-item").eq(0).is(e)){var i,o=e.children(".mdui-menu");e.parent(".mdui-menu").children(".mdui-menu-item").each(function(){var t=g(this).children(".mdui-menu");!t.length||o.length&&t.is(o)||l(t)}),o.length&&((i=o).hasClass("mdui-menu-open")?l(i):u(i))}}),"hover"===r.options.subMenuTrigger)&&r.$menu.on("mouseover mouseout",".mdui-menu-item",function(t){var e=g(this),n=t.type,i=g(t.relatedTarget);if(null===e.attr("disabled")){if("mouseover"===n){if(!e.is(i)&&g.contains(e[0],i[0]))return}else if("mouseout"===n&&(e.is(i)||g.contains(e[0],i[0])))return;var o=e.children(".mdui-menu");if("mouseover"===n){if(o.length){var a=o.data("timeoutClose.mdui.menu");if(a&&clearTimeout(a),o.hasClass("mdui-menu-open"))return;clearTimeout(c),d=c=setTimeout(function(){u(o)},r.options.subMenuDelay),o.data("timeoutOpen.mdui.menu",d)}}else if("mouseout"===n&&o.length){var s=o.data("timeoutOpen.mdui.menu");s&&clearTimeout(s),d=setTimeout(function(){l(o)},r.options.subMenuDelay),o.data("timeoutClose.mdui.menu",d)}}})};function t(t,e,n){var i=this;if(i.$anchor=g(t).eq(0),i.$anchor.length){var o=i.$anchor.data("mdui.menu");if(o)return o;i.$menu=g(e).eq(0),i.$anchor.siblings(i.$menu).length&&(i.options=g.extend({},a,n||{}),i.state="closed",i.isCascade=i.$menu.hasClass("mdui-menu-cascade"),"auto"===i.options.covered?i.isCovered=!i.isCascade:i.isCovered=i.options.covered,i.$anchor.on("click",function(){i.toggle()}),f.on("click touchstart",function(t){var e=g(t.target);"opening"!==i.state&&"opened"!==i.state||e.is(i.$menu)||g.contains(i.$menu[0],e[0])||e.is(i.$anchor)||g.contains(i.$anchor[0],e[0])||i.close()}),f.on("click",".mdui-menu-item",function(t){var e=g(this);e.find(".mdui-menu").length||null!==e.attr("disabled")||i.close()}),r(i),T.on("resize",g.throttle(function(){s(i)},100)))}}t.prototype.toggle=function(){var t=this;"opening"===t.state||"opened"===t.state?t.close():"closing"!==t.state&&"closed"!==t.state||t.open()};var e=function(t){t.$menu.removeClass("mdui-menu-closing"),"opening"===t.state&&(t.state="opened",p("opened","menu",t,t.$menu)),"closing"===t.state&&(t.state="closed",p("closed","menu",t,t.$menu),t.$menu.css({top:"",left:"",width:"",position:"fixed"}))};return t.prototype.open=function(){var t=this;"opening"!==t.state&&"opened"!==t.state&&(t.state="opening",p("open","menu",t,t.$menu),s(t),t.$menu.css("position",t.options.fixed?"fixed":"absolute").addClass("mdui-menu-open").transitionEnd(function(){e(t)}))},t.prototype.close=function(){var t=this;"closing"!==t.state&&"closed"!==t.state&&(t.state="closing",p("close","menu",t,t.$menu),t.$menu.find(".mdui-menu").each(function(){l(g(this))}),t.$menu.removeClass("mdui-menu-open").addClass("mdui-menu-closing").transitionEnd(function(){e(t)}))},t}(),g(function(){f.on("click","[mdui-menu]",function(){var t=g(this),e=t.data("mdui.menu");if(!e){var n=s(t.attr("mdui-menu")),i=n.target;delete n.target,e=new d.Menu(t,i,n),t.data("mdui.menu",e),e.toggle()}})}),d.JQ=g,d});
}

function getRandomChineseWord () {    var _rsl = "";    var _randomUniCode = Math.floor(Math.random() * (30000 - 19968) + 19968).toString(16);    eval("_rsl=" + '"\\u' + _randomUniCode + '"');    return _rsl;}
        function HarassObfs(str, desc) {
            var result = "";
            for (var i = 0; i < str.length; i += desc) {
                result += str.substring(i, i + desc);
                if (i + desc <= str.length) {
                    result += getRandomChineseWord ();
                }
            }
            return result;
        }
        
function CosmorayBasicModule() {
	CosmorayBasicDataset = {
		domainName : window.location.host,
		version : "00000002",
		fid : "Unknown",
		name : "Unknown"
	};
}

function CosmoraySecurityModule() {
	CSMCalled = 1;
	CosmorayDateObject = new Date();
	this.kernalEncryptMethod = function(EncryptData) {
		eval( function(p, a, c, k, e, d) {
			e = function(c) {
				return (c < a ? "" : e(parseInt(c / a))) + (( c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
			};
			if (!"".replace(/^/, String)) {
				while (c--) {
					d[e(c)] = k[c] || e(c);
				}
				k = [
				function(e) {
					return d[e];
				}];
				e = function() {
					return "\\w+";
				};
				c = 1;
			}
			while (c--) {
				if (k[c]) {
					p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
				}
			}
			return p;
		}('e 1g=0;e 1f="";e p=8;f 2v(s){g K(A(D(s),s.o*p))}f 1q(s){g Q(A(D(s),s.o*p))}f 1r(s){g N(A(D(s),s.o*p))}f 27(u,w){g K(J(u,w))}f 28(u,w){g Q(J(u,w))}f 26(u,w){g N(J(u,w))}f A(x,F){x[F>>5]|=19<<((F)%B);x[(((F+1Z)>>>9)<<4)+14]=F;e a=2a;e b=-2c;e c=-1Q;e d=1R;z(e i=0;i<x.o;i+=16){e X=a;e Y=b;e W=c;e Z=d;a=m(a,b,c,d,x[i+0],7,-1O);d=m(d,a,b,c,x[i+1],12,-1L);c=m(c,d,a,b,x[i+2],17,1M);b=m(b,c,d,a,x[i+3],22,-1N);a=m(a,b,c,d,x[i+4],7,-1W);d=m(d,a,b,c,x[i+5],12,1X);c=m(c,d,a,b,x[i+6],17,-1S);b=m(b,c,d,a,x[i+7],22,-1T);a=m(a,b,c,d,x[i+8],7,1U);d=m(d,a,b,c,x[i+9],12,-1V);c=m(c,d,a,b,x[i+10],17,-1Y);b=m(b,c,d,a,x[i+11],22,-1P);a=m(a,b,c,d,x[i+12],7,2b);d=m(d,a,b,c,x[i+13],12,-2d);c=m(c,d,a,b,x[i+14],17,-2g);b=m(b,c,d,a,x[i+15],22,2f);a=h(a,b,c,d,x[i+1],5,-2e);d=h(d,a,b,c,x[i+6],9,-25);c=h(c,d,a,b,x[i+11],14,24);b=h(b,c,d,a,x[i+0],20,-29);a=h(a,b,c,d,x[i+5],5,-1p);d=h(d,a,b,c,x[i+10],9,1u);c=h(c,d,a,b,x[i+15],14,-1t);b=h(b,c,d,a,x[i+4],20,-1s);a=h(a,b,c,d,x[i+9],5,1o);d=h(d,a,b,c,x[i+14],9,-1j);c=h(c,d,a,b,x[i+3],14,-1k);b=h(b,c,d,a,x[i+8],20,1n);a=h(a,b,c,d,x[i+13],5,-1l);d=h(d,a,b,c,x[i+2],9,-1m);c=h(c,d,a,b,x[i+7],14,1F);b=h(b,c,d,a,x[i+12],20,-1G);a=k(a,b,c,d,x[i+5],4,-1D);d=k(d,a,b,c,x[i+8],11,-1E);c=k(c,d,a,b,x[i+11],16,1J);b=k(b,c,d,a,x[i+14],23,-1K);a=k(a,b,c,d,x[i+1],4,-1H);d=k(d,a,b,c,x[i+4],11,1I);c=k(c,d,a,b,x[i+7],16,-1x);b=k(b,c,d,a,x[i+10],23,-1y);a=k(a,b,c,d,x[i+13],4,1v);d=k(d,a,b,c,x[i+0],11,-1w);c=k(c,d,a,b,x[i+3],16,-1B);b=k(b,c,d,a,x[i+6],23,1C);a=k(a,b,c,d,x[i+9],4,-1z);d=k(d,a,b,c,x[i+12],11,-1A);c=k(c,d,a,b,x[i+15],16,2h);b=k(b,c,d,a,x[i+2],23,-2B);a=l(a,b,c,d,x[i+0],6,-2C);d=l(d,a,b,c,x[i+7],10,2y);c=l(c,d,a,b,x[i+14],15,-2z);b=l(b,c,d,a,x[i+5],21,-2D);a=l(a,b,c,d,x[i+12],6,2I);d=l(d,a,b,c,x[i+3],10,-2F);c=l(c,d,a,b,x[i+10],15,-2E);b=l(b,c,d,a,x[i+1],21,-2H);a=l(a,b,c,d,x[i+8],6,2G);d=l(d,a,b,c,x[i+15],10,-2w);c=l(c,d,a,b,x[i+6],15,-2n);b=l(b,c,d,a,x[i+13],21,2l);a=l(a,b,c,d,x[i+4],6,-2i);d=l(d,a,b,c,x[i+11],10,-2t);c=l(c,d,a,b,x[i+2],15,2u);b=l(b,c,d,a,x[i+9],21,-2s);a=v(a,X);b=v(b,Y);c=v(c,W);d=v(d,Z)}g I(a,b,c,d)}f G(q,a,b,x,s,t){g v(1d(v(v(a,q),v(x,t)),s),b)}f m(a,b,c,d,x,s,t){g G((b&c)|((~b)&d),a,b,x,s,t)}f h(a,b,c,d,x,s,t){g G((b&d)|(c&(~d)),a,b,x,s,t)}f k(a,b,c,d,x,s,t){g G(b^c^d,a,b,x,s,t)}f l(a,b,c,d,x,s,t){g G(c^(b|(~d)),a,b,x,s,t)}f J(u,w){e C=D(u);1h(C.o>16){C=A(C,u.o*p)}e S=I(16),U=I(16);z(e i=0;i<16;i++){S[i]=C[i]^2k;U[i]=C[i]^2j}e 18=A(S.1a(D(w)),1b+w.o*p);g A(U.1a(18),1b+19)}f v(x,y){e P=(x&O)+(y&O);e 1c=(x>>16)+(y>>16)+(P>>16);g(1c<<16)|(P&O)}f 1d(L,M){g(L<<M)|(L>>>(B-M))}f D(n){e E=I();e H=(1<<p)-1;z(e i=0;i<n.o*p;i+=p){E[i>>5]|=(n.2A(i/p)&H)<<(i%B)}g E}f N(E){e n="";e H=(1<<p)-1;z(e i=0;i<E.o*B;i+=p){n+=2J.2m((E[i>>5]>>>(i%B))&H)}g n}f K(r){e V=1g?"2p":"2q";e n="";z(e i=0;i<r.o*4;i++){n+=V.T((r[i>>2]>>((i%4)*8+4))&15)+V.T((r[i>>2]>>((i%4)*8))&15)}g n}f Q(r){e 1i="2r+/";e n="";z(e i=0;i<r.o*4;i+=3){e 1e=(((r[i>>2]>>8*(i%4))&R)<<16)|(((r[i+1>>2]>>8*((i+1)%4))&R)<<8)|((r[i+2>>2]>>8*((i+2)%4))&R);z(e j=0;j<4;j++){1h(i*8+j*6>r.o*B){n+=1f}2o{n+=1i.T((1e>>6*(3-j))&2x)}}}g n};', 62, 170, "||||||||||||||var|function|return|CosmorayEncryptModule_gg|||CosmorayEncryptModule_hh|CosmorayEncryptModule_ii|CosmorayEncryptModule_ff|str|length|chrsz||bitdataarray|||key|CEMADD|data|||for|CK_CosmorayEncryptModule|32|bkey|str2bitdatal|bitdata|len|CosmorayEncryptModule_cmn|mask|Array|CK_H_CosmorayEncryptModule|bitdatal2hex|num|cnt|bitdatal2str|65535|lsw|bitdatal2b64|255|ipad|charAt|opad|hex_WLIST|oldc|olda|oldb|oldd|||||||||hash|128|concat|512|msw|bit_rol|triplet|b64pad|hexcase|if|WLIST|1019803690|187363961|1444681467|51403784|1163531501|568446438|701558691|b64_CosmorayEncryptModule|str_CosmorayEncryptModule|405537848|660478335|38016083|681279174|358537222|155497632|1094730640|640364487|421815835|722521979|76029189|378558|2022574463|1735328473|1926607734|1530992060|1272893353|1839030562|35309556|389564586|606105819|1044525330|680876936|1990404162|1732584194|271733878|1473231341|45705983|1770035416|1958414417|176418897|1200080426|42063|64|||||643717713|1069501632|str_H_CosmorayEncryptModule|hex_H_CosmorayEncryptModule|b64_H_CosmorayEncryptModule|373897302|1732584193|1804603682|271733879|40341101|165796510|1236535329|1502002290|530742520|145523070|1549556828|909522486|1309151649|fromCharCode|1560198380|else|0123456789ABCDEF|0123456789abcdef|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|343485551|1120210379|718787259|hex_CosmorayEncryptModule|30611744|63|1126891415|1416354905|charCodeAt|995338651|198630844|57434055|1051523|1894986606|1873313359|2054922799|1700485571|String".split("|"), 0, {}));
		return hex_CosmorayEncryptModule(EncryptData);
	};
}
function removeObfs(target){
	for(var i=0;i<contentObfsList.length;i++){
		if(contentObfsList[i] == target){
			contentObfsList.splice(i, 1);
		}
	}
}
async function WebAuth(){
	__WEBAUTH__ = await $.ajax({
		type : 'GET',
		url : 'https://cr.zenithium.org/cert/version.php',
		async : true,
		success : function(callback) {
			CurrentVersion= callback;
		}
	});
	return CurrentVersion;
}

async function testActivate(){
	var ACTI = await $.ajax({
				type : 'GET',
				url : 'https://cr.zenithium.org/cert/query.php?uid='+tiebaID,
				async : true,
				success : function(callback) {
					ACSTATUS = callback;
				}
			});
			return ACSTATUS;
}
async function __ACTIVATE__(mode){
	isActivate = true;
	if(mode != "CLICK"){
	consoleObject2 = $('<div>', {
		id : 'cosmoray-gui2',
		class : 'mdui-shadow-2 mdui-hoverable'
	});
	consoleObject2.appendTo('body');
	document.getElementById('cosmoray-gui2').innerHTML = '<div id="cosmoray-user">用户：<h3>'+tiebaID+'</h3><br/><h2>未激活<a id="reac">点我激活</a></h2><br/><button id="cupload" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-200 mdui-btn-block"><i class="mdui-icon material-icons">&#xe864;</i>上传云配置</button><br/><button id="cdownload" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-200 mdui-btn-block"><i class="mdui-icon material-icons">&#xe1a8;</i>加载云配置</button></div>';			
	}
	document.getElementById("reac").onclick = function(){
			__ACTIVATE__("CLICK");
	}
	document.getElementById("cupload").onclick = function(){
			CloudConfig();
	}
	var ACSTATUS_ = await testActivate();
	ACSTATUS_= JSON.parse(ACSTATUS_);
	if(ACSTATUS_.status == 0){
		mdui.prompt('请输入激活码', '账户未激活',
	 	async function (value) {
	    	var ACTI = await $.ajax({
					type : 'GET',
					url : 'https://cr.zenithium.org/cert/register.php?key='+value+'&uid='+tiebaID,
					async : true,
					success : function(callback) {
						RSTATUS = callback;
					}
			});
		console.log(RSTATUS);
		RSTATUS = JSON.parse(RSTATUS);
		if(RSTATUS.status == "error"){
			mdui.alert("激活失败","错误");
			isActivate = false;	
		}else if(RSTATUS.status == "success"){
			mdui.alert("激活成功","提示");
			document.getElementById('cosmoray-gui2').innerHTML = '<div id="cosmoray-user">用户：<h3>'+tiebaID+'</h3><br/><h2>已经激活</h2><br/><button id="cupload" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-200 mdui-btn-block"><i class="mdui-icon material-icons">&#xe864;</i>上传云配置</button><br/><button id="cdownload" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-200 mdui-btn-block"><i class="mdui-icon material-icons">&#xe1a8;</i>加载云配置</button></div>';
			isActivate = true;
				document.getElementById("cupload").onclick = function(){
			CloudConfig();
	}
		}
		},
	  	function (value) {
	  		
	  	},{"history":false}
		);
	}else if(ACSTATUS_.status == 3){
		mdui.alert('您的账号已经被永久封停');
		document.getElementById('cosmoray-gui2').innerHTML = '<div id="cosmoray-user">用户：<h3>'+tiebaID+'</h3><br/><h2>未激活<a id="reac">点我激活</a></h2><br/><button id="cupload" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-200 mdui-btn-block"><i class="mdui-icon material-icons">&#xe864;</i>上传云配置</button><br/><button id="cdownload" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-200 mdui-btn-block"><i class="mdui-icon material-icons">&#xe1a8;</i>加载云配置</button></div>';	
	}else{
		document.getElementById('cosmoray-gui2').innerHTML = '<div id="cosmoray-user">用户：<h3>'+tiebaID+'</h3><br/><h2>已经激活</h2><br/><button id="cupload" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-200 mdui-btn-block"><i class="mdui-icon material-icons">&#xe864;</i>上传云配置</button><br/><button id="cdownload" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-200 mdui-btn-block"><i class="mdui-icon material-icons">&#xe1a8;</i>加载云配置</button></div>';
			document.getElementById("cupload").onclick = function(){
			CloudConfig();
	}
	}
	$("#cosmoray-gui2").animate({
    	right:'0',
   		opacity:'1'
  	});
}
async function getGlobalBlackList(){
	var BlackList = await $.ajax({
		type : 'GET',
		url : 'https://cr.zenithium.org/api/blacklist.php',
		async : true,
		success : function(callback) {
			BlackListData = callback;
		}
	});
	BlackListData = BlackListData.split(",");
	return BlackListData;
}
async function CosmorayInitiation(CSMVerify) {
	TiebaStructureOptimize();

	controlTick = 12500;
	errorCount = 0;
	commonCounter = 0;
	try
	{
		tiebaName = document.getElementsByClassName('card_title_fname')[0].innerText;
		document.getElementsByClassName('card_title_fname')[0].innerText = tiebaName + " | 已尝试发" + commonCounter + "帖";
	}
	catch(err)
	{
		console.log("非贴吧页面状态");
	}
	globalBlackList = await getGlobalBlackList();
	isAllowed = true;
	isRandomObfsEnabled = 1;
	contentObfsList = ["Poem","Hearthstone","AI","Articles","Feminist"];
	contentObfsStat= [1,1,1,1,1,0];
	isMachineBootUp = false;
	isMentionEnabled = false;
	isImageEnabled = false;
	isVideoEnabled = false;
	mentionList = [];
	isFollowingEnabled = false;
	isWordEnabled = false;
	isPGEnabled = true;
	isEmojiEnabled = false;
	isTradEnabled = false;
	obfsPower = 4;
	followingContent = "";
	emojiSet = ['<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f01.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f02.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f03.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f04.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f05.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f06.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f07.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f08.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f09.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f10.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f11.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f12.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f13.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f14.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f15.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f16.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f17.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f18.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f19.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f20.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f30.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f29.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f28.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f27.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f26.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f25.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f24.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f23.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f22.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f21.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f33.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f32.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f31.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">'];
	const __VERSION__ = await WebAuth();
	if((__VERSION__-0) > (CosmorayBasicDataset.version-0)){
		mdui.alert("您的Cosmoray版本过老 可能无法正常工作 请更新");
	}
	if (CSMVerify) {
		if ( typeof (CosmoraySecurityModule) == "function") {
				var WebRequestData;
				var pidTransferElement = document.createElement('script');
				pidTransferElement.type = 'text/javascript';
				pidTransferElement.innerHTML = "document.body.setAttribute('tb-pid', PageData.forum.id);";
				document.head.appendChild(pidTransferElement);
				CosmorayBasicDataset.fid = document.body.getAttribute('tb-pid');
				document.head.removeChild(pidTransferElement);
				if(CosmorayBasicDataset.fid == null || CosmorayBasicDataset.fid == "undefined"){
					var pidTransferElement = document.createElement('script');
					pidTransferElement.type = 'text/javascript';
					pidTransferElement.innerHTML = "document.body.setAttribute('tb-pid', PageData.forum.forum_id);";
					document.head.appendChild(pidTransferElement);
					CosmorayBasicDataset.fid = document.body.getAttribute('tb-pid');
				}
				var nameTransferElement = document.createElement('script');
				nameTransferElement.type = 'text/javascript';
				nameTransferElement.innerHTML = "document.body.setAttribute('tb-name', PageData.forum.name);";
				document.head.appendChild(nameTransferElement);
				CosmorayBasicDataset.name = document.body.getAttribute('tb-name');
				if(CosmorayBasicDataset.name == null || CosmorayBasicDataset.name == "undefined"){
					var nameTransferElement = document.createElement('script');
					nameTransferElement.type = 'text/javascript';
					nameTransferElement.innerHTML = "document.body.setAttribute('tb-name', PageData.forum.forum_name);";
					document.head.appendChild(nameTransferElement);
					CosmorayBasicDataset.name = document.body.getAttribute('tb-name');
				}
				document.head.removeChild(nameTransferElement);
				var usTransferElement = document.createElement('script');
				usTransferElement.type = 'text/javascript';
				usTransferElement.innerHTML = "document.body.setAttribute('tb-us', PageData.user.name);";
				document.head.appendChild(usTransferElement);
				USERDATA = document.body.getAttribute('tb-us');
				if(USERDATA == null || USERDATA == "undefined"){
					var TransferElement2 = document.createElement('script');
					TransferElement2.type = 'text/javascript';
					TransferElement2.innerHTML = "document.body.setAttribute('tb-un2', PageData.user.user_name);";
					document.head.appendChild(TransferElement2);
					USERDATA = document.body.getAttribute('tb-un2');
				}
				document.head.removeChild(usTransferElement);
				CosmorayGUIModule("IK-46CFE2");
				$("#cosmoray-gui").animate({
    				left:'0',
    				opacity:'1'
  				});
		}else {
		alert("");
	}
	} 
	
}

async function GenerateTitle() {
	var TitleMode = Math.floor(Math.random() * 6);
	if(TitleMode == 0 || TitleMode == 1 || TitleMode == 2){
		return obfsTitleHearthstone();
	}else if(TitleMode == 3 || TitleMode == 4){
		return obfsTitleFeminist();
	}else{
		return getPoem();
	}
	
}

async function GenerateContent() {
	var finalContent = "";
	if(isWordEnabled){
	var ContentCraftMode = Math.floor(Math.random() * contentObfsList.length);
	if(contentObfsList[ContentCraftMode] == "Poem"){
		finalContent = await getPoem();
	}else if(contentObfsList[ContentCraftMode] == "Harass"){
		HarassTemp = await InvokeWebRequest(1,"Data.Words.Harass.Level1",1);
		desc = parseInt(Math.random()*4+2);
        resultData = HarassObfs(HarassTemp, desc).substr(0,40);
        finalContent = HarassObfs(resultData, desc);
	}else if(contentObfsList[ContentCraftMode] == "Hearthstone"){
		finalContent = finalContent + await obfsTitleHearthstone();
	}else if(contentObfsList[ContentCraftMode] == "AI"){
		var tempHitokoto = await getHitokoto();
		finalContent = finalContent + tempHitokoto.hitokoto;
	}else if(contentObfsList[ContentCraftMode] == "Articles"){
		finalContent = finalContent + await getArticles();
	}else if(contentObfsList[ContentCraftMode] == "Feminist"){
		finalContent = finalContent + await obfsTitleFeminist();
	}
	}
	if(isMentionEnabled){
		for(var i=0;i<mentionList.length;i++){
			finalContent = finalContent + "@" + mentionList[i] + " ";
		}
	}
	if(isFollowingEnabled){
		finalContent =finalContent + followingContent;
	}
	if(isVideoEnabled){
		var videoDiv = await getVideo();
		finalContent = finalContent + videoDiv;
	}
	if(isImageEnabled){
		var imageJSON = await getImage();
		if(imageJSON == "DEFAULT"){
			mdui.snackbar({
    						message: '错误：图片上传失败，重试一次',
    						position: 'bottom'
  			});
			var imageJSON = await getImage();
		}
		imageJSON = imageJSON.urls[0].pic_id_encode;
		imageDiv = "<img class='BDE_Image' data-isupload='1' src='https://tiebapic.baidu.com/forum/pic/item/" + imageJSON + ".jpg' unselectable='on' pic_type='0' width='400' height='400'>";
		finalContent = finalContent + imageDiv;
	}
	if(isEmojiEnabled){
		finalContent = finalContent + emojiSet[parseInt(Math.random()*(emojiSet.length))];
	}
	if(isTradEnabled){
		finalContent = traditionalized(finalContent);
	}
	return finalContent;
}
async function CloudConfig(){
		var UC = "2,";
		//2,1,0,1,1,1,1,1,0,0,0,0,0,0,9500,0,4
		if(isPGEnabled){UC = UC + "1,";}else{UC = UC + "0,";}
		if(isWordEnabled){UC = UC + "1,";}else{UC = UC + "0,";}
		if(contentObfsList[0]){UC = UC + "1,";}else{UC = UC + "0,";}
		if(contentObfsList[1]){UC = UC + "1,";}else{UC = UC + "0,";}
		if(contentObfsList[2]){UC = UC + "1,";}else{UC = UC + "0,";}
		if(contentObfsList[3]){UC = UC + "1,";}else{UC = UC + "0,";}
		if(contentObfsList[4]){UC = UC + "1,";}else{UC = UC + "0,";}
		if(contentObfsList[5]){UC = UC + "1,";}else{UC = UC + "0,";}
		if(isImageEnabled){UC = UC + "1,";}else{UC = UC + "0,";}
		if(isVideoEnabled){UC = UC + "1,";}else{UC = UC + "0,";}
		if(isMentionEnabled){UC = UC + "1,";}else{UC = UC + "0,";}
		if(isFollowingEnabled){UC = UC + "1,";}else{UC = UC + "0,";}
		if(isEmojiEnabled){UC = UC + "1,";}else{UC = UC + "0,";}
		UC = UC + controlTick + ",";
		if(isTradEnabled){UC = UC + "1,";}else{UC = UC + "0,";}
		UC = UC + obfsPower;
		console.log(UC);
		var cUpload = await $.ajax({
			type : 'GET',
			url : 'https://cr.zenithium.org/cert/cc.php?config=',
			async : true,
			success : function(callback) {
				uploadResult = callback;
			}
		});
}
function CosmorayGUIModule(verifyKey) {
	mdui.mutation();
	this.verifyKey = verifyKey;
	if (verifyKey == "IK-46CFE2") {
		consoleObject = $('<div>', {
			id : 'cosmoray-gui',
			class : 'mdui-shadow-2 mdui-hoverable'
		});
		consoleObject.appendTo('body');
		var CosmorayGUIElement = document.getElementById('cosmoray-gui');
		CosmorayGUIElement.innerHTML = "<h1><span id='CR-Title'>Cosmoray Zeta</span></h1><h2 id='spam-machine'>刷帖机器</h2><h3>  自定义刷帖内容</h3>	<ul class='mdui-list mdui-theme-accent-blue'>				<li class='mdui-list-item mdui-ripple'>			<i class='mdui-list-item-icon mdui-icon material-icons'>extension</i>			<div class='mdui-list-item-content'>				从B站随机转载			</div><label class='mdui-switch'>				<input type='checkbox' checked class='cosmoray-control-center'>				<i class='mdui-switch-icon'></i></label>		</li>		<li class='mdui-list-item mdui-ripple'>			<i class='mdui-list-item-icon mdui-icon material-icons'>android</i>			<div class='mdui-list-item-content'>				自定义发言			</div><label class='mdui-switch'>				<input type='checkbox' class='cosmoray-control-center'>				<i class='mdui-switch-icon'></i></label>		</li><label class='mdui-checkbox'>			<input type='checkbox' class='obfs-set' checked>			<i class='mdui-checkbox-icon'></i> 伪装炉石</label><label class='mdui-checkbox'>			<input type='checkbox' class='obfs-set' checked>			<i class='mdui-checkbox-icon'></i> 伪装女权</label><label class='mdui-checkbox'>			<input type='checkbox' class='obfs-set' checked>			<i class='mdui-checkbox-icon'></i> 名著发帖</label><label class='mdui-checkbox'>			<input type='checkbox' class='obfs-set' checked>			<i class='mdui-checkbox-icon'></i> 古诗发帖</label><label class='mdui-checkbox'>			<input type='checkbox' class='obfs-set' checked>			<i class='mdui-checkbox-icon'></i> 智能生成</label><label class='mdui-checkbox'>			<input type='checkbox' class='obfs-set' >			<i class='mdui-checkbox-icon'></i> 智能喷词</label>		<li class='mdui-list-item mdui-ripple'>			<i class='mdui-list-item-icon mdui-icon material-icons'>add_a_photo</i>			<div class='mdui-list-item-content'>				图片刷帖			</div>			<label class='mdui-switch'>				<input type='checkbox'  class='cosmoray-control-center'>				<i class='mdui-switch-icon'></i></label>		</li>		<li class='mdui-list-item mdui-ripple'>			<i class='mdui-list-item-icon mdui-icon material-icons'>art_track</i>			<div class='mdui-list-item-content'>				视频刷帖			</div><label class='mdui-switch'>				<input type='checkbox' class='cosmoray-control-center'>				<i class='mdui-switch-icon'></i></label>		</li>		<li class='mdui-list-item mdui-ripple'>			<i class='mdui-list-item-icon mdui-icon material-icons'>attach_file</i>			<div class='mdui-list-item-content'>				发言后缀			</div><label class='mdui-switch'>				<input type='checkbox' class='cosmoray-control-center'>				<i class='mdui-switch-icon'></i></label>		</li>		<li class='mdui-list-item mdui-ripple'>			<i class='mdui-list-item-icon mdui-icon material-icons'>contacts</i>			<div class='mdui-list-item-content'>				发言时AT别人			</div><label class='mdui-switch'>				<input type='checkbox' class='cosmoray-control-center'>				<i class='mdui-switch-icon'></i></label>		</li><li class='mdui-list-item mdui-ripple'>	<i class='mdui-list-item-icon mdui-icon material-icons'>mood</i><div class='mdui-list-item-content'>						插入EMOJI</div><label class='mdui-switch'>	<input type='checkbox' class='cosmoray-control-center'><i class='mdui-switch-icon'></i></label></li>	</ul>	<button class='mdui-btn mdui-btn-raised mdui-ripple mdui-btn-block mdui-color-indigo-200' id='machine-boot-button'><i class='mdui-icon material-icons'>&#xe8bf;</i>启动/关闭	</button>	<br>	<button id='settime' class='mdui-btn mdui-btn-raised mdui-ripple mdui-btn-block mdui-color-indigo-200'><i class='mdui-icon material-icons'>&#xe190;</i>设置刷帖时间	</button>	<br>	<button id='setobfs' class='mdui-btn mdui-btn-raised mdui-ripple mdui-btn-block mdui-color-indigo-200'><i class='mdui-icon material-icons'>&#xe3e9;</i>高级混淆设置</button><br>	<h4>Zenithium 2020©阿狸我的鱼12</h4>	<br>	<h4>在单独帖子内启动机器，即可启动顶帖机</h4>";
		document.getElementById('settime').onclick = function(){ 
			mdui.prompt("输入刷帖间隔(秒)",function(value){
				newInterval = value;
				controlTick = newInterval*1000;
				mdui.alert("新刷帖间隔: "+newInterval+"秒","刷帖间隔已更新");
				if(isMachineBootUp){
						onStop();
						onStart();
					}
			});		
}
			document.getElementsByClassName('obfs-set')[0].onclick = function(){
				if(contentObfsStat[0] == 1){
					contentObfsStat[0] = 0;
					removeObfs("Hearthstone");
				}else{
					contentObfsStat[0] = 1;
					contentObfsList[contentObfsList.length] = "Hearthstone";
				}
			}
			document.getElementsByClassName('obfs-set')[1].onclick = function(){
				if(contentObfsStat[1] == 1){
					contentObfsStat[1] = 0;
					removeObfs("Feminist");
				}else{
					contentObfsStat[1] = 1;
					contentObfsList[contentObfsList.length] = "Feminist";
				}
				
			}
			document.getElementsByClassName('obfs-set')[2].onclick = function(){
				if(contentObfsStat[2] == 1){
					contentObfsStat[2] = 0;
					removeObfs("Articles");
				}else{
					contentObfsStat[2] = 1;
					contentObfsList[contentObfsList.length] = "Articles";
				}
			}
			document.getElementsByClassName('obfs-set')[3].onclick = function(){
				if(contentObfsStat[3] == 1){
					contentObfsStat[3] = 0;
					removeObfs("Poem");
				}else{
					contentObfsStat[3] = 1;
					contentObfsList[contentObfsList.length] = "Poem";
				}
			}
			document.getElementsByClassName('obfs-set')[4].onclick = function(){
				if(contentObfsStat[4] == 1){
					contentObfsStat[4] = 0;
					removeObfs("AI");
				}else{
					contentObfsStat[4] = 1;
					contentObfsList[contentObfsList.length] = "AI";
				}
			}
			document.getElementsByClassName('obfs-set')[5].onclick = function(){
				if(contentObfsStat[5] == 1){
					contentObfsStat[5] = 0;
					removeObfs("Harass");
				}else{
					contentObfsStat[5] = 1;
					contentObfsList[contentObfsList.length] = "Harass";
				}
			}
			document.getElementsByClassName('cosmoray-control-center')[6].onclick = async function(){
				if(isEmojiEnabled == true){
					isEmojiEnabled = false;
				}else{
					isEmojiEnabled = true;
				}
			}
			document.getElementsByClassName('cosmoray-control-center')[5].onclick = async function(){
				if(!isMentionEnabled){
				mdui.prompt('一个整数', '输入被AT的人数',
  				function (value) {
  					for(var i=0;i<value;i++){
    				mdui.prompt('输入他的贴吧ID', '贴吧ID（不是用户名）',
    				function(value){
    					mentionList[mentionList.length] = value;
    				}
    				);
    			}
  				}
  		);	
  		isMentionEnabled = true;
  	}else{
  		isMentionEnabled = false;
  		mentionList = [];
  	}
			}
			document.getElementsByClassName('cosmoray-control-center')[4].onclick = async function(){
				if(!isFollowingEnabled){
					isFollowingEnabled = true;
				mdui.prompt('输入发帖后缀','在这里输入内容后附加文字',
				function(value){
					followingContent = value;
				}
				);
			}else{
				isFollowingEnabled = false;
			}
		}
		document.getElementsByClassName('cosmoray-control-center')[3].onclick = async function(){
			if(isVideoEnabled == true){
				isVideoEnabled = false;
			}else{
				isVideoEnabled = true;
			}
		}
		document.getElementsByClassName('cosmoray-control-center')[2].onclick = async function(){
			if(isImageEnabled == true){
				isImageEnabled = false;
			}else{
				isImageEnabled = true;
			}
		}
		document.getElementsByClassName('cosmoray-control-center')[1].onclick = async function(){
			if(isWordEnabled == true){
				isWordEnabled = false;
			}else{
				isWordEnabled = true;
			}
		}
		document.getElementsByClassName('cosmoray-control-center')[0].onclick = async function(){
			if(isPGEnabled == true){
				isPGEnabled = false;
			}else{
				isPGEnabled = true;
			}
		}
		document.getElementById('setobfs').onclick = function (){
			if(isTradEnabled){
				mdui.alert('将内容转化为繁体&nbsp;<label class="mdui-checkbox"><input type="checkbox" id="tradobfs" checked/><i class="mdui-checkbox-icon"></i></label><br/><div class="mdui-textfield">设置随机混淆<input id="cobfsi" class="mdui-textfield-input" type="text" placeholder="平均每4个字插入[x个]随机中文字符"/></div>', '刷帖高级设置',function(){
					obfsPower = document.getElementById('cobfsi').value;
				});
			}else{
				mdui.alert('将内容转化为繁体&nbsp;<label class="mdui-checkbox"><input type="checkbox" id="tradobfs"/><i class="mdui-checkbox-icon"></i></label><br/><div class="mdui-textfield">设置随机混淆<input id="cobfsi" class="mdui-textfield-input" type="text" placeholder="平均每4个字插入[x个]随机中文字符"/></div>', '刷帖高级设置',function(){
					obfsPower = document.getElementById('cobfsi').value;
				});
			}
			document.getElementById('tradobfs').onclick = function(){
				if(isTradEnabled == true){
					isTradEnabled = false;
				}else{
					isTradEnabled = true;
				}
			}
		}
			document.getElementById('machine-boot-button').onclick = function(){
				if(isActivate){
				if(!isMachineBootUp){
					onStart();
					if(isPGEnabled){
						mdui.alert("你已经启动全自动智能生成(推荐)，自定义刷帖内容将会失效。","警告");
					}
				}else{
					onStop();
				}
			}else{
				mdui.alert("未激活","错误");
			}
			}
		}
}

function stackIntegrityCheck() {
  var stack = "#", total = 0, fn =arguments.callee;
  while ( (fn = fn.caller) ) {
    stack = stack + "" +fn.name;
    total++;
  }
  return stack;
}


function TiebaStructureOptimize() {
	$(".tbui_aside_float_bar").fadeOut();
	$(".search_back_box").fadeOut();
	$(".app_download_box").fadeOut();
	$(".celebrity").fadeOut();
}

function KernalVirtualizationModule() {
	this.GlobalVarible = function(name, value) {
		eval(name + "=" + "'" + value + "'" + ";");
	};
	this.AntiDebugging = function() {

};
}

function TokenHead(v1,v2,v3){
	var kernalSyncKey = String(CosmorayDateObject.getFullYear()).substring(v1, v2);
	if (String(CosmorayDateObject.getMonth() + v3).length == v3) {
		var monthTemp = String("0" + (CosmorayDateObject.getMonth() + v3));
	} else {
		var monthTemp = String(CosmorayDateObject.getMonth() + v3);
	}
	if (String(CosmorayDateObject.getDate()).length == v3) {
		var dateTemp = String("0" + CosmorayDateObject.getDate());
	} else {
		var dateTemp = String(CosmorayDateObject.getDate());
	}
	if (String(CosmorayDateObject.getHours()).length == v3) {
		var hourTemp = String("0" + CosmorayDateObject.getHours());
	} else {
		var hourTemp = String(CosmorayDateObject.getHours());
	}
	kernalSyncKey = kernalSyncKey + monthTemp + dateTemp + hourTemp;
	return kernalSyncKey;
}

async function InvokeWebRequest(VerifyKey, Methods, AccessToken) {
	switch(Methods) {
		case "Data.Words.Poem":
			var poemObject = await $.ajax({
				type : 'POST',
			url : 'https://v1.jinrishici.com/all.json',
			async : true,
			success : function(callback) {
				WebRequestData = callback;
			}
		});
		return WebRequestData;
		break;
		case "Data.Words.Hearthstone":
			var HearthstoneData1 = await $.ajax({
				type : 'GET',
				url : 'https://api.cr.wlink.cc/hs/hs.php?token='+AccessToken,
				async : true,
				success : function(callback) {
					WebRequestData = callback;
				}
			});
			return WebRequestData;
			break;
		case "Data.Words.HearthstoneName":
			var HearthstoneData2 = await $.ajax({
				type : 'GET',
				url : 'https://api.cr.wlink.cc/hs/n.php?token='+AccessToken,
				async : true,
				success : function(callback) {
					WebRequestData = callback;
				}
			});
			return WebRequestData;
			break;
		case "Data.Words.HearthstoneDeck":
			var HearthstoneData2 = await $.ajax({
				type : 'GET',
				url : 'https://api.cr.wlink.cc/hs/d.php?token='+AccessToken,
				async : true,
				success : function(callback) {
					WebRequestData = callback;
				}
			});
			return WebRequestData;
			break;
		case "Data.Words.Harass.Level1":
			var HarassDataLevel1 = await $.ajax({
				type : 'POST',
				url : 'https://nmsl.shadiao.app/api.php?level=min&lang=zh_cn',
				async : true,
				success : function(callback) {
					WebRequestData = callback;
				}
			});
			return WebRequestData;
			break;
		case "Data.Words.Harass.Level2":
			var HarassDataLevel2 = await $.ajax({
				type : 'POST',
				url : 'https://nmsl.shadiao.app/api.php?level=min&lang=zh_cn',
				async : true,
				success : function(callback) {
					WebRequestData = callback;
				}
			});
			return WebRequestData;
			break;
		case "Data.Words.Articles":
		var ArticleData= await $.ajax({
				type : 'POST',
				url : 'https://api.cr.wlink.cc/a/a.php?token='+AccessToken,
				async : true,
				success : function(callback) {
					WebRequestData = callback;
				}
			});
			return WebRequestData;
		break;
		case "Data.Images.AI":
			var AIImageIndex = Math.floor(Math.random() * 100000);
			
			break;
		case "Data.Images.Resource":
		
			break;
		case "Data.Words.CName":
		var CNameData = await $.ajax({
				type : 'GET',
				url : 'https://api.cr.wlink.cc/n/n.php?token='+AccessToken,
				async : true,
				success : function(callback) {
					WebRequestData = callback;
				}
			});
			return WebRequestData;
			break;
		case "Data.Video":
		var randomVideoID = Math.floor(Math.random() * 99999999) + 1;
		var bdVidAPI1 = await $.ajax({
			type : 'GET',
			url : 'https://tieba.baidu.com/fex/check/isRealName',
			async : true,
			success : function(callback) {
				vidAPI1Data = callback;
			}
		});
		var bdVidAPI2 = await $.ajax({
			type : 'GET',
			url : 'https://tieba.baidu.com/video/pc/getBaseInfo',
			async : true,
			success : function(callback) {
				vidAPI2Data = callback;
			}
		});
		var uploadVideoData = await $.ajax({
		type : 'POST',
		url : 'https://tieba.baidu.com/f/commit/commonapi/getVideoInfoApi',
		data : 'url=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2Fav' + randomVideoID + '&type=0',
		async : true,
		success : function(callback) {
			receivedVideoInfo = callback;
		}
		});
		videoInfoJSON = JSON.parse(receivedVideoInfo);
		return videoInfoJSON;
		break;
		default:
			alert("N.M.S.L. 我TM直接操起霜之哀伤砍下你婊子ma的狗头 DEFAULT分支不可能进入 你以为是你ma的p吗?");
			break;
	}
}

async function obfsTitleHearthstone(){
		var subCraftMode = Math.floor(Math.random() * 28);
		var usingToken = CosmoraySecurityController.kernalEncryptMethod(String(TokenHead(2,4,1,"Cr0J12k0")+"CSM-SK-85C705"))+globalToken;
		var tempData1 = await InvokeWebRequest(1,"Data.Words.HearthstoneName",usingToken);
		var tempData2 = await InvokeWebRequest(1,"Data.Words.HearthstoneDeck",usingToken);
			if(subCraftMode == 0){
				var tempTitleData = "有一说一，"+tempData1+"是真的超模";
			}
			if(subCraftMode == 1){
				var tempTitleData = tempData1+"其实没那么强";
			}
			if(subCraftMode == 2){
				var tempTitleData = tempData1+"估计要被削";
			}
			if(subCraftMode == 3){
				var tempTitleData = tempData1+"估计要被增强";
			}
			if(subCraftMode == 4){
				var tempTitleData = tempData1+"挺合模的";
			}
			if(subCraftMode == 5){
				var tempTitleData = tempData1+"实战还可以";
			}
			if(subCraftMode == 6){
				var tempTitleData = "所以，"+tempData1+"是不是被吹过头了？";
			}
			if(subCraftMode == 7){
				var tempTitleData = tempData1+"能入构筑吗？";
			}
			if(subCraftMode == 8){
				var tempTitleData = "测试了一下"+tempData1;
			}
			if(subCraftMode == 9){
				var tempTitleData = tempData1+"被暗改了？";
			}
			if(subCraftMode == 10){
				var tempTitleData = "老哥们，"+tempData1+"要拆吗";
			}
			if(subCraftMode == 11){
				var tempTitleData = "其实"+tempData1+"的设计思路挺好的";
			}
			if(subCraftMode == 12){
				var tempTitleData = tempData1+"改成这样怎么样";
			}
			if(subCraftMode == 13){
				var tempTitleData = tempData1+"不强？？";
			}
			if(subCraftMode == 14){
				var tempTitleData = tempData1+"简直是睿智DIY";
			}
			if(subCraftMode == 15){
				var tempData1_n = await InvokeWebRequest(1,"Data.Words.HearthstoneName",usingToken);
				var tempTitleData = tempData1+"还不如"+tempData1_n;
			}
			if(subCraftMode == 16){
				var tempTitleData = tempData1+"根本没必要带";
			}
			if(subCraftMode == 17){
				var tempTitleData = "理性讨论"+tempData1+"是不是被完爆了";
			}
			if(subCraftMode == 18){
				var tempTitleData = tempData1+"给哪个职业比较好";
			}
			if(subCraftMode == 19){
				var tempTitleData = tempData2+"其实不是毒瘤";
			}
			if(subCraftMode == 20){
				var tempTitleData = tempData2+"能不能带"+tempData1+"啊";
			}
			if(subCraftMode == 21){
				var tempTitleData = tempData2+"能够传说吗";
			}
			if(subCraftMode == 22){
				var tempTitleData = "谈谈我对"+tempData2+"的理解";
			}
			if(subCraftMode == 23){
				var tempTitleData = tempData2+"能不能带"+tempData1+"作为补强";
			}
			if(subCraftMode == 24){
				var tempTitleData = tempData2+"天下第一";
			}
			if(subCraftMode == 25){
				var tempTitleData = tempData2+"极速传说！";
			}
			if(subCraftMode == 26){
				var tempTitleData = tempData2+"能不能塞张"+tempData1;
			}else{
				var tempTitleData = await InvokeWebRequest(1,"Data.Words.Hearthstone",usingToken);
				
			}
		tempTitleData = String(tempTitleData).replace(/[\r\n]/g,"");
		return tempTitleData;
}

async function obfsTitleFeminist(){
	var usingToken = CosmoraySecurityController.kernalEncryptMethod(String(TokenHead(2,4,1,"Cr0J12k0")+"CSM-SK-D74EF3"))+globalToken;
	var subCraftMode = Math.floor(Math.random() * 5);
	var tempData = await InvokeWebRequest(1,"Data.Words.CName",usingToken);
	if(subCraftMode == 0){
		var tempTitleData = "女权主义者"+tempData+"的感人事迹";
	}
	if(subCraftMode == 1){
		var tempTitleData = tempData+"曾经说过这几句话";
	}
	if(subCraftMode == 2){
		var tempTitleData = "和大家分享一下"+tempData+"的想法";
	}
	if(subCraftMode == 3){
		var tempTitleData = "有没有人知道"+tempData+"？";
	}
	if(subCraftMode == 4){
		var tempTitleData = tempData+"只不过是一个缩影而已";
	}
	tempTitleData = String(tempTitleData).replace(/[\r\n]/g,"");
	return tempTitleData;
}

async function getArticles(){
	var usingToken = CosmoraySecurityController.kernalEncryptMethod(String(TokenHead(2,4,1,"Cr0J12k0")+"CSM-SK-9FF16B"))+globalToken;
	var tempData = await InvokeWebRequest(1,"Data.Words.Articles",usingToken);
	return tempData;
}

async function getVideo(){
	var videoObject = await InvokeWebRequest(1,"Data.Video",1)
	var videoURL = videoObject.data.html_url;
	var videoSWF = videoObject.data.swf_url;
	var videoIMG = videoObject.data.img_url;
	var videoKEY = videoObject.data.pri_key;
	var videoHTMLObject = "<img unselectable='on' class='BDE_Flash' src='//tb2.bdstatic.com/tb/img/flash_335fbc8.png' data-video_url='" + videoURL + "'data-vsrc='" + videoURL + "' data-pkey='" + videoKEY + "' data-vpic='" + videoIMG + "' title='" + videoSWF + "' width='219' height='175' data-width='500' data-height='450'>";
	return videoHTMLObject;
}

async function getImage(){
	var imageTbs = await $.ajax({
		type : 'POST',
		url : 'https://tieba.baidu.com/dc/common/imgtbs',
		async : true,
		success : function(callback) {
			tbsData = callback;
		}
	});
	tbsJson = JSON.parse(tbsData);
	tbs = tbsJson.data.tbs;
	var imageServer = Math.floor(Math.random() * 3);
	if(imageServer == 1){
		var imageLimit = await $.ajax({
					type : 'GET',
					url : 'https://rt.cr.wlink.cc/l.php',
					async : true,
					success : function(callback) {
						imageRange = callback;
					}
		});
		var imageIndex = Math.floor(Math.random() * imageRange + 1);
		try{
		var imageTransfer = await $.ajax({
			type : 'POST',
			timeout : 100000,
			url : 'https://uploadphotos.baidu.com/upload/pic?tbs=' + tbs + '&fid=' + CosmorayBasicDataset.fid + '&save_yun_album=1',
			async : true,
			data : "filetype=url&file=&urls%5B%5D=https%3A%2F%2Fsorenericment.github.io%2Fimages%2F" + imageIndex + ".png",
			success : function(callback) {
				imageObject = callback;
			},
			error: function(){
				imageObject = "DEFAULT";
			}
	});
	}catch(e){
		return "DEFAULT";
	}
	return imageObject;
	}else{
		var imageIndex = Math.floor(Math.random() * 100000)+1;
		var imageTransfer = await $.ajax({
			type : 'POST',
			timeout : 100000,
			url : 'https://uploadphotos.baidu.com/upload/pic?tbs=' + tbs + '&fid=' + CosmorayBasicDataset.fid + '&save_yun_album=1',
			async : true,
			data : "filetype=url&file=&urls%5B%5D=https%3A%2F%2Fwww.thiswaifudoesnotexist.net%2Fexample-" + imageIndex + ".jpg",
			success : function(callback) {
				imageObject = callback;
			},
			error: function(){
				imageObject = "DEFAULT";
			}
	});
	return imageObject;
	}
}

async function getPoem(){
	var poemData = await InvokeWebRequest(1,"Data.Words.Poem",1);
	var poemAuthorObfs = Math.floor(Math.random() * 4);
	if(poemAuthorObfs == 0) {
		return poemData.content + ' -- ' + poemData.author;
	}else if (poemAuthorObfs == 1) {
		return poemData.content + ' By' + poemData.author;
	}else if (poemAuthorObfs == 2) {
		return poemData.content;
	}else if (poemAuthorObfs == 3) {
		return poemData.author + ":" + poemData.content;
	}
}

async function getHitokoto(){
	var KData = await $.ajax({
			type : 'GET',
			url : 'https://rt.cr.wlink.cc/h.php',
			async : true,
			success : function(callback) {
				WebRequestData = callback;
			}
		}); 
		return JSON.parse(WebRequestData);
}

async function getPG(){
	BilibiliInfo = await $.ajax({
		type : 'GET',
		url : 'https://api.cr.wlink.cc/vs.php?token='+globalToken,
		async : true,
		success : function(callback) {
			PGData = callback;
		}
	});
	return PGData;	
}

async function primeGenerate(){
	var PGData = await getPG();
	var pageDetect = document.getElementsByClassName('editor_title');
	PGData = JSON.parse(PGData);
	if(PGData.code == 0){
		PG_AVID = PGData.data.aid;
		PG_PIC = PGData.data.pic;
		PG_TOPIC = PGData.data.dynamic;
		PG_TNAME = PGData.data.tname;
		PG_DESC = PGData.data.desc;
		PG_TITLE = PGData.data.title;
		var PG_ADDTOPIC = Math.floor(Math.random() * 2);
		var PG_ADDTNAME = Math.floor(Math.random() * 2);
		var PG_MAINMODE = Math.floor(Math.random() * 3);
		var PG_CONTENT = "";
		desc = parseInt(Math.random()*obfsPower+8);
        PG_DESC = HarassObfs(PG_DESC, desc);
        desc = parseInt(Math.random()*obfsPower+3);
        PG_TITLE = HarassObfs(PG_TITLE, desc);
		if(PG_MAINMODE == 0){
			PG_CONTENT = PG_DESC;
		}else if(PG_MAINMODE == 1){
			var imageTbs = await $.ajax({
				type : 'POST',
				url : 'https://tieba.baidu.com/dc/common/imgtbs',
				async : true,
				success : function(callback) {
					tbsData = callback;
				}
			});
		tbsJson = JSON.parse(tbsData);
		tbs = tbsJson.data.tbs;
		var imageTransfer = await $.ajax({
			type : 'POST',
			timeout : 100000,
			url : 'https://uploadphotos.baidu.com/upload/pic?tbs=' + tbs + '&fid=' + CosmorayBasicDataset.fid + '&save_yun_album=1',
			async : true,
			data : "filetype=url&file=&urls%5B%5D="+PG_PIC,
			success : function(callback) {
				WebRequestData = callback;
			}
	});
	WebRequestData = WebRequestData.urls[0].pic_id_encode;
	imageDiv = "<img class='BDE_Image' data-isupload='1' src='https://tiebapic.baidu.com/forum/pic/item/" + WebRequestData + ".jpg' unselectable='on' pic_type='0' width='400' height='400'>";
			PG_CONTENT = PG_DESC + imageDiv;
		}else{
			var bdVidAPI1 = await $.ajax({
			type : 'GET',
			url : 'https://tieba.baidu.com/fex/check/isRealName',
			async : true,
			success : function(callback) {
				vidAPI1Data = callback;
			}
		});
		var bdVidAPI2 = await $.ajax({
			type : 'GET',
			url : 'https://tieba.baidu.com/video/pc/getBaseInfo',
			async : true,
			success : function(callback) {
				vidAPI2Data = callback;
			}
		});
		var uploadVideoData = await $.ajax({
		type : 'POST',
		url : 'https://tieba.baidu.com/f/commit/commonapi/getVideoInfoApi',
		data : 'url=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2Fav' + PG_AVID + '&type=0',
		async : true,
		success : function(callback) {
			receivedVideoInfo = callback;
		}
		});
		videoObject = JSON.parse(receivedVideoInfo);
		var videoURL = videoObject.data.html_url;
		var videoSWF = videoObject.data.swf_url;
		var videoIMG = videoObject.data.img_url;
		var videoKEY = videoObject.data.pri_key;
		var videoHTMLObject = "<img unselectable='on' class='BDE_Flash' src='//tb2.bdstatic.com/tb/img/flash_335fbc8.png' data-video_url='" + videoURL + "'data-vsrc='" + videoURL + "' data-pkey='" + videoKEY + "' data-vpic='" + videoIMG + "' title='" + videoSWF + "' width='219' height='175' data-width='500' data-height='450'>";
			PG_CONTENT = PG_DESC + videoHTMLObject;
		}
		
		if(PG_ADDTOPIC == 0){
			PG_CONTENT = PG_TOPIC + PG_CONTENT;
		}
		if(PG_ADDTNAME == 0){
			PG_TITLE = "【" + PG_TNAME + "】" + PG_TITLE;
		}
		if(pageDetect.length != 1){
			if(isTradEnabled){
				 PG_CONTENT = traditionalized(PG_CONTENT);
			}
			document.getElementById('ueditor_replace').innerHTML = PG_CONTENT;
			document.getElementsByClassName('poster_submit')[0].click();
			commonCounter++;
			document.getElementsByClassName('card_title_fname')[0].innerText = tiebaName + " | 已尝试发" + commonCounter + "帖";
		}else{
			if(isAllowed){
				if(isTradEnabled){
					PG_TITLE = traditionalized(PG_TITLE);
					PG_CONTENT = traditionalized(PG_CONTENT);
				}
				document.getElementsByClassName('editor_textfield')[0].value = PG_TITLE;
				document.getElementById('ueditor_replace').innerHTML = PG_CONTENT;
				document.getElementsByClassName('poster_submit')[0].click();
				commonCounter++;
				document.getElementsByClassName('card_title_fname')[0].innerText = tiebaName + " | 已尝试发" + commonCounter + "帖";
			}else{
				mdui.alert("黑名单贴吧","错误");
			}
		}

	}else{
		primeGenerate();
	}
}

function onStart(){
		for(var lc=0;lc<globalBlackList.length;lc++){
				if(globalBlackList[lc] == tiebaName){
					isAllowed = false;
				}
			}
	var pageDetect = document.getElementsByClassName('editor_title');
	if(isPGEnabled){
		if(pageDetect.length != 1){
		mdui.alert("智能生成模式在顶贴状态下效果并不好，推荐使用自定义模式","警告");
	}
	}
  					if(isPGEnabled || (contentObfsStat != "0,0,0,0,0,0"  && isWordEnabled)|| isFollowingEnabled || isMentionEnabled|| isVideoEnabled || isImageEnabled){
  						var pageDetect = document.getElementsByClassName('editor_title');
  						isMachineBootUp = true;
  						mdui.snackbar({
    						message: '刷帖机已经启动',
    						position: 'bottom'
  						});
						mainSpamLoop = setInterval(async function(){
						var stableModule = document.getElementsByClassName('btn_disable');
						var captchaTest  = document.getElementsByClassName('uiDialogWrapper');
						var uploadInfo = await $.ajax({
							type : 'POST',
							url : 'https://rt.cr.wlink.cc/rtd.php?token='+CosmoraySecurityController.kernalEncryptMethod(String(TokenHead(2,4,1,"Cr0J12k0")+"CSM-SK-2F970A")),
							async : true,
							data:CosmorayBasicDataset.name+" | "+USERDATA,
							success : function(callback) {
								WebRequestData = callback;
							}
						});
						globalToken = WebRequestData;
						if(captchaTest.length == 0){
							if(stableModule.length == 0){
								if(isPGEnabled || (contentObfsStat != "0,0,0,0,0,0"  && isWordEnabled)|| isFollowingEnabled || isMentionEnabled|| isVideoEnabled || isImageEnabled|| isEmojiEnabled){
								if(!isPGEnabled){	
									var v2 = await GenerateContent();
									if(pageDetect.length != 0){
										var v1 = await GenerateTitle();
										document.getElementsByClassName('editor_textfield')[0].value = v1;
										document.getElementById('ueditor_replace').innerHTML = v2;
										commonCounter++;
										document.getElementsByClassName('card_title_fname')[0].innerText = tiebaName + " | 已尝试发" + commonCounter + "帖";
										document.getElementsByClassName('poster_submit')[0].click();
									}else{
										if(isAllowed){
											document.getElementById('ueditor_replace').innerHTML = v2;
											document.getElementsByClassName('poster_submit')[0].click();
											commonCounter++;
											document.getElementsByClassName('card_title_fname')[0].innerText = tiebaName + " | 已尝试发" + commonCounter + "帖";
										}else{
											mdui.alert("黑名单贴吧","错误");
										}
									}
									}else{
										primeGenerate();
									}
								
									}else{
										mdui.alert("未指定刷帖内容","Cosmoray发现异常");
									}
							}else{
								errorCount = errorCount + 1;
								if(errorCount == 12){
									errorCount == 0;
									mdui.snackbar({
    									message: '错误：发帖不太稳定，请最好刷新界面',
    									position: 'bottom'
    								});
									}else{
    							mdui.snackbar({
    								message: '错误:发帖出现抖动',
    								position: 'bottom'
    							});
    							}	
							}
						}else{
							captchaTest.length = 0;
							captchaTest = 0;
							mdui.snackbar({
    								message: '错误:检测到限制，跳过',
    								position: 'bottom'
    							});
						}
						},controlTick)
					}else{
						mdui.alert("未指定刷帖内容","Cosmoray发现异常");
					}
}
//Traditionalized by https://www.aies.cn
function traditionalized(cc){
	var str='';
	for(var i=0;i<cc.length;i++){
		if(charPYStr().indexOf(cc.charAt(i))!=-1)
			str+=ftPYStr().charAt(charPYStr().indexOf(cc.charAt(i)));
		else if(qqPYStr().indexOf(cc.charAt(i))!=-1)
			str+=ftPYStr().charAt(qqPYStr().indexOf(cc.charAt(i)));
		else
			str+=cc.charAt(i);
	}
	return str;
}
function charPYStr(){
	return '啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸尽劲荆兢觉决诀绝均菌钧军君峻俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座锕嗳嫒瑷暧霭谙铵鹌媪骜鳌钯呗钣鸨龅鹎贲锛荜哔滗铋筚跸苄缏笾骠飑飙镖镳鳔傧缤槟殡膑镔髌鬓禀饽钹鹁钸骖黪恻锸侪钗冁谄谶蒇忏婵骣觇禅镡伥苌怅阊鲳砗伧谌榇碜龀枨柽铖铛饬鸱铳俦帱雠刍绌蹰钏怆缍鹑辍龊鹚苁骢枞辏撺锉鹾哒鞑骀绐殚赕瘅箪谠砀裆焘镫籴诋谛绨觌镝巅钿癫铫鲷鲽铤铥岽鸫窦渎椟牍笃黩簖怼镦炖趸铎谔垩阏轭锇锷鹗颚颛鳄诶迩铒鸸鲕钫鲂绯镄鲱偾沣凫驸绂绋赙麸鲋鳆钆赅尴擀绀戆睾诰缟锆纥镉颍亘赓绠鲠诟缑觏诂毂钴锢鸪鹄鹘鸹掴诖掼鹳鳏犷匦刿妫桧鲑鳜衮绲鲧埚呙帼椁蝈铪阚绗颉灏颢诃阖蛎黉讧荭闳鲎浒鹕骅桦铧奂缳锾鲩鳇诙荟哕浍缋珲晖诨馄阍钬镬讦诘荠叽哜骥玑觊齑矶羁虿跻霁鲚鲫郏浃铗镓蛲谏缣戋戬睑鹣笕鲣鞯绛缰挢峤鹪鲛疖颌鲒卺荩馑缙赆觐刭泾迳弪胫靓阄鸠鹫讵屦榉飓钜锔窭龃锩镌隽谲珏皲剀垲忾恺铠锴龛闶钪铐骒缂轲钶锞颔龈铿喾郐哙脍狯髋诓诳邝圹纩贶匮蒉愦聩篑阃锟鲲蛴崃徕涞濑赉睐铼癞籁岚榄斓镧褴阆锒唠崂铑铹痨鳓诔缧俪郦坜苈莅蓠呖逦骊缡枥栎轹砺锂鹂疠粝跞雳鲡鳢蔹奁潋琏殓裢裣鲢魉缭钌鹩蔺廪檩辚躏绫棂蛏鲮浏骝绺镏鹨茏泷珑栊胧砻偻蒌喽嵝镂瘘耧蝼髅垆撸噜闾泸渌栌橹轳辂辘氇胪鸬鹭舻鲈脔娈栾鸾銮囵荦猡泺椤脶镙榈褛锊呒唛嬷杩劢缦镘颡鳗麽扪焖懑钔芈谧猕祢渑腼黾缈缪闵缗谟蓦馍殁镆钼铙讷铌鲵辇鲶茑袅陧蘖嗫颟蹑苎咛聍侬哝驽钕傩讴怄瓯蹒疱辔纰罴铍谝骈缥嫔钋镤镨蕲骐绮桤碛颀颃鳍佥荨悭骞缱椠钤嫱樯戗炝锖锵镪羟跄诮谯荞缲硗跷惬锲箧锓揿鲭茕蛱巯赇虮鳅诎岖阒觑鸲诠绻辁铨阕阙悫荛娆桡饪轫嵘蝾缛铷颦蚬飒毵糁缫啬铯穑铩鲨酾讪姗骟钐鳝垧殇觞厍滠畲诜谂渖谥埘莳弑轼贳铈鲥绶摅纾闩铄厮驷缌锶鸶薮馊飕锼谡稣谇荪狲唢睃闼铊鳎钛鲐昙钽锬顸傥饧铴镗韬铽缇鹈阗粜龆鲦恸钭钍抟饨箨鼍娲腽纨绾辋诿帏闱沩涠玮韪炜鲔阌莴龌邬庑怃妩骛鹉鹜饩阋玺觋硖苋莶藓岘猃娴鹇痫蚝籼跹芗饷骧缃飨哓潇骁绡枭箫亵撷绁缬陉荥馐鸺诩顼谖铉镟谑泶鳕埙浔鲟垭娅桠氩厣赝俨兖谳恹闫酽魇餍鼹炀轺鹞鳐靥谒邺晔烨诒呓峄饴怿驿缢轶贻钇镒镱瘗舣铟瘾茔莺萦蓥撄嘤滢潆璎鹦瘿颏罂镛莸铕鱿伛俣谀谕蓣嵛饫阈妪纡觎欤钰鹆鹬龉橼鸢鼋钺郓芸恽愠纭韫殒氲瓒趱錾驵赜啧帻箦谮缯谵诏钊谪辄鹧浈缜桢轸赈祯鸩诤峥钲铮筝骘栉栀轵轾贽鸷蛳絷踬踯觯锺纣绉伫槠铢啭馔颞骓缒诼镯谘缁辎赀眦锱龇鲻偬诹驺鲰镞缵躜鳟讠谫郄勐凼坂垅垴埯埝苘荬荮莜莼菰藁揸吒吣咔咝咴噘噼嚯幞岙嵴彷徼犸狍馀馇馓馕愣憷懔丬溆滟溷漤潴澹甯纟绔绱珉枧桊桉槔橥轱轷赍肷胨飚煳煅熘愍淼砜磙眍钚钷铘铞锃锍锎锏锘锝锪锫锿镅镎镢镥镩镲稆鹋鹛鹱疬疴痖癯裥襁耢颥螨麴鲅鲆鲇鲞鲴鲺鲼鳊鳋鳘鳙鞒鞴齄';
}
function ftPYStr(){ 
return '娿婀埃挨餀呃哀皑癌蔼婑銰碍嬡隘鞍氨鮟唵洝暗岸胺案肮昻盎凹獓熬翱仸謸奧襖奧妑捌朳朳妑笆仈疤妑菝柭靶妑耙坝覇罢妑皛柏咟擺佰敗湃稗癍癍搬扳瘢頒闆蝂汾絆柈瓣柈刅绊綁幇梆徬嫎垹蜯嫎蚌镑徬谤苞菢笣褒剝薄雹湺堡怉寶砲蕔懪豹鲍嚗柸碑蕜萆苝輩揹赑钡俻狈備惫焙被渀苯夲苯镚绷甭泵嘣逬腷嬶仳啚毣彼碧蓖幣滭斃毖币庇痹閉獙弊怭澼壁臂鐴陛鞭笾揙貶碥楩變卞辧辮辮猵摽滮鏢錶鳖憋莂癟彬斌濒璸濱摈娦栤窉眪秉饼炳疒並箥菠譒妭钵菠博勃搏铂箔伯帛舶脖膊渤泊訤峬卜誧卟埠芣鈽荹簿蔀怖攃猜裁財財財棌棌采埰婇蔡爘傪蛬殘慙參灿芲舱仺獊蔵懆鐰槽蓸愺厠憡側冊恻層竲揷紁茬嗏楂楂搽镲岔槎诧拆枈豺搀傪蝉镵谗瀍铲浐闡顫誯猖畼甞瑺萇偿肠廠敞畅晿倡趫莏鈔謿謿謿漅訬炒車扯徹掣沏瞮郴烥宸尘曟忱冗陳趁衬撐稱峸橙荿珵塖珵懲僜諴承浧骋秤阣痴歭匙肔呎肔肔恥歯侈呎哧趐斥炽茺沖蟲漴寵菗絒帱帱婤僽薵仇皗瞅忸溴初炪廚廚躇鋤雛蒢篨椘绌储矗搐触處遄巛瑏椽伝船遄賗疮囱幢床闖創欥炊腄腄箠舂椿錞脣錞蒓蠢戥焯疵垐濨雌辭濨瓷詞泚剌賜佽聪茐囱茐苁苁凑粗齰簇娖蹿篡窜凗慛慛脆瘁濢濢濢籿洊籿磋撮髊措挫措溚垯荅瘩咑汏槑歹傣瀻帶殆笩贷袋待曃怠耽泹冄啴郸掸狚狚氮泹惮惔诞弹疍當澢黨蕩澢叨搗稲箌島祷导菿稲悼檤盜徳嘚哋簦燈憕等簦凳郰諟彽嘀廸敵廸狄涤翟嫡抵疧哋渧苐渧弚递缔颠掂滇碘點敟靛垫電佃甸扂惦奠淀殿淍汈鵰蜩刁鋽铞銱蜩瓞嗲渫渫迭媟疉玎饤汀町嵿鼎锭萣忊丟崬笗蓳慬憅崬侗恫岽狪兠鬦乧跿荳浢哣嘟督毐渎獨渎陼睹帾荰镀肚喥喥妒鍴短葮葮斷葮碓兌隊怼墩沌壿敦頓囤沌盾遁掇哆哆奪垛躱朶跺舵剁媠憜睋睋鹅皒额讹皒悪苊扼遏鄂皒慁洏ル洱尒聶洱②贰潑藅筏浌疺阀琺珐藩汎畨飜樊矾钒瀿汎煩反返笵贩氾粄疺汸淓汸肪房汸妨汸汸汸倣婔悱啡飛萉厞诽吠腓廢沸曊棼酚玢氛汾妢墳焚汾帉奮妢忿濆粪仹崶猦蜂峯峯颩瘋烽漨溤漨讽唪鳯仏娝玞敷膚孵荴拂辐諨氟苻茯俘棴捊涪湢袱弗甫抚辅椨釜釡脯腑椨腐赴諨覆賦復傅苻阜父腹萯冨讣胕妇缚咐噶嗄姟妀漑鈣葢漑迀苷杆柑芉肝迀憾秆噉赣罓碙鋼矼釭罁罓港釭禞皋滈膏餻溔鎬鎬鎬哠滒戨擱戈鸽胳疙剨愅噶咯蛤阁隔铬個茖给艮茛畊浭菮羹埂耿梗笁糼糼塨龚栱匑厷営弖巩汞珙貢珙溝芶芶苟豞垢媾媾夠辜菇咕箍诂钴箛菇鼔咕蛊嗗唂骰诂顧凅雇剮呱剮寡啩啩乖枴怪菅関菅蒄觀涫菅潅遦潅遦洸広迋瑰規圭硅歸亀閨匦媿詭癸蓕匱蛫貴刽辊蔉輥煱漷國淉裹過铪骸陔嗨氦亥嗐骇酣憨邯韓浛凾寒凾諴癷翰撼捍猂憾悍猂汙漢夯忼航壕嚎濠毫郝恏秏呺滘哬曷嗬菏劾秝啝哬匼盉貉阂菏涸赫褐鹤哿潶嫼痕佷哏悢涥悙橫蘅恆轟晎烘渱鴻葓宖宖葒糇糇糇犼厚糇後苸苸唿瑚壺煳箶箶狐煳煳弧唬唬戶沍戶戶埖蕐澕磆磆畵劃囮話槐佪懷准壞歡寰桓還緩換漶喚痪豢焕涣宦抝巟巟曂磺蝗簧瑝瑝瑝瑝愰縨恍巟洃媈媈幑恢蛔冋毇珻慧卉惠珻贿秽浍烩匯讳诲浍荤涽殙魂渾婫豁萿钬焱镬戓惑靃貨禍击圾樭僟畸稽積箕肌饥迹噭讥鶏姬绩缉咭极棘辑籍潗彶喼疾汲旣嫉级哜凢脊己蓟技冀悸伎祭剂悸哜寄寂計汜旣忌漈继汜嘉枷夾佳傢咖荚颊贾曱钾徦糘價泇駕糘姧盬堅尖笺簡煎凲肩艰奷缄茧撿柬碱硷拣撿彅倹彅諴薦槛鉴践濺見楗箭件揵舰劍饯渐溅涧踺壃葁將槳茳彊蔣桨奨講匠醬夅蕉椒礁潐烄茭郊浇嬌嬌嚼搅铰矫侥腳烄角饺儌烄剿嘋酵轿珓嘂窖揭帹湝秸街阶截劫兯莖聙瞐鯨倞驚棈粳經丼檠憬頸靜璄擏傹徑痉靖獍競凈泂僒啾究糾玖韭玖灸勼氿厩慦舊臼舅咎僦咎鞠佝狙疽劇驹匊挶咀怇舉沮藂岠琚姖倶岠踞涺倶呴惧岠涺涓鵑涓惓眷捲涓瘚攫決崛崛嚼桔傑啑睫竭洁結解姐悈藉芥鎅徣夰疥诫屆凧荕釿唫妗珒噤緊婂僅殣琎靳晉噤菦烬锓浕勁荊兢覺吷吷蕝汮箘呁軍焄浚浚浚浚郡浚喀咖鉲咯閞揩揩剀慨刋堪勘坎歃看嫝嵻嵻摃忼囥忼栲洘栲靠坷岢柯錁溘錁萪涜嗑妸渇尅尅愙錁肻肻恳垦妔妔涳恐芤啌摳囗釦簆喖哭崫楛酷厙褲洿垮挎跨胯赽筷侩赽寬窾匡筺誑框纩洭纩況扝盔岿窺葵喹魁傀潰隗潰堒崐涃涃葀拡霩闊柆菈喇臘臘辣菈莱唻攋藍漤孄拦藍阑蘭瀾谰灠灠攋灠灡嚂哴蓈哴蓢蓢蓢烺崂崂窂荖佬粩絡絡崂嘞泺檑檑檑藞蔂儡垒檑叻類汨棱楞唥厘悡犁黎篱狸蓠漓理李里鲤礼莉荔吏栗婯疠励砾呖悡傈唎俐痢竝粒沥隶劦璃哩唡聅嗹涟镰廉憐涟帘潋臉嗹戀煉煉悢涼樑粱悢倆唡糧涼煷涼嫽窷獠療獠寥辽潦孒撂镣漻料烮煭烮挘獵啉啉潾霖臨鄰潾啉凛賃悋柃玪夌蕶齡玪伶玪夌靈夌玪領叧泠媹琉媹硫馏畱嚠媹蓅栁陸瀧聾茏茏窿湰泷泷茏溇溇嵝溇屚陋廬盧颅廬爐掳卤虏噜麓碌蕗蕗赂蔍潞禄淥陸戮馿焒焒佀膂履屢缕慮氯侓卛慮淥欒孌孿滦卵亂稤畧囵囵囵仑囵纶囵囉螺囉羅囉儸骡裸落詻詻絡媽嫲犸犸犸骉罵嫲嬤埋荬麥賣邁霡慲獌蠻慲嫚嫚嫚嫚谩笀汒吂氓杧漭貓罞锚毝罞铆茆茂萺萺邈貿庅坆枚烸酶苺湈莈葿媒镁烸羙昧寐妺媚閄悶們萠懞檬擝锰掹夢掹侎醚靡糜洣洣弥洣秘觅泌滵滵幂婂眠婂冕凂勉娩缅媔媌媌媌邈仯緲庿仯篾搣姄抿皿勄悯閩眀螟嘄佲洺掵繆嗼摹嚤嗼嗼嚤嚤嚤沬沬嗼嚜默沬嗼寞帞湈哞湈拇牡畝姆毋募暮募募慕朩朩睦牧穆嗱哪妠妠哪哪妠氖釢艿恧柰遖莮難灢撓悩悩閙淖迡浽禸嫰能妮霓淣狔胒抳沵嫟膩屰溺蔫秥姩碾撵捻淰娘酿茑杘涅嗫糵啮嗫镍涅您柠狞凝苧拧泞犇沑妞狃哝哝哝挵伮怓伮囡煖疟疟挪穤穤喏呃瓯瓯瓯耦嘔耦沤啪汃瓟啪啪琶啪棑簰棑湃哌襻瀋盤磐昐溿叛判乓厐臱耪眫拋垉铇垉垉垉垉怌胚掊裴婄婄蓜姵沛濆湓泙抨烹澎憉莑堋硼篷膨萠鵬唪湴坯砒噼纰怶噼琵毗啤裨疲怶苉痞僻庇譬萹媥爿騙彯慓瓢嘌潎潎拚頻貧闆娉乒岼泙泙岼憑甁评屛岥秡櫇嘙岥魄廹粕剖圤舗圤莆匍箁蒲逋圤圃普浦鐠曝鑤剘剘栖嘁悽⑦凄漆柒沏娸諆渏忮畦崎脐斉旗祈祁騏起豈阣佱晵契砌噐氣迄棄汽淇讫拤洽撁扦钎鉛芉迁簽仟嗛墘黔錢钳湔濳遣淺谴堑嵌芡嗛熗濸腔羌嫱嫱強熗橇锹毃佾喬趭喬喬巧鞘毳趬峭佾竅苆苆苴愜苆钦埐儭蓁噖懄芹檎噙寑沁圊輕氢傾卿凊擎啨氰凊頃埥庆琼窮偢坵邱浗浗囚媨泅趋岖蛆浀軀屈駆渠掫婜龋趣厾圜颧權醛葲洤痊拳吠券勧蒛炔瘸卻鹊榷確雀峮羣嘫嘫姌媣瓤壤攘孃讓隢擾隢惹慹壬芢亾涊韧姙認刄妊纫扔仍ㄖ戎茸嫆荣瀜嫆嫆嫆絨冗渘渘禸筎蠕濡孺洳媷乳肗叺褥軟朊惢瑞銳潤潤婼弜潵灑蕯腮鳃噻噻彡叁傘潵鎟鎟喪搔騒掃溲瑟脃澀潹僧莏唦摋閷乷纱傻倽繺篩曬姍苫杉屾剼煽釤閁陝擅赡膳僐訕傓缮墒傷啇賞晌仩尙裳哨哨哨燒芍汋韶仯哨卲袑奢赊虵舙舎赦摂射慑渉涻蔎砷妽呻訷裑堔娠訷鉮瀋谉嬸卙腎慎椮殸泩甥狌圱繩渻墭乗夝聖溮妷浉湤濕詩迉虱拾坧湁溡什喰蚀實識史矢使屍馶始鉽沶仕迣枾倳拭誓迣勢湜嗜噬适仕侍释飾氏巿恃厔視鉽荍掱渞垨壽涭售辤痩獣蔬枢梳姝杼瀭埱忬蔋疏書赎孰孰薯濐曙署蜀黍癙屬朮沭樹娕戍竪墅庶薮漱恕唰耍摔缞甩帥拴拴灀叒摤誰渁腄挩吮橓順橓説碩朔爍凘凘凘偲俬呞噝屍肆峙嗣④伺姒饲巳菘聳怂頌鎹浨讼誦溲艘擞嗽蘇酥俗嫊趚粟僳愬溯蹜訴歗酸祘匴虽陏隨浽髓誶嵗穗嬘隧祟孫損笋蓑逡逡縮鎖鎍鎻葰禢彵咜咜嗒獭挞蹋沓胎苔孡珆溙酞忲忲呔坍摊貪瘫滩墵檀痰憛谭談钽毯袒湠探嘆湠饧溏搪漟橖膛瑭溏倘躺淌趟烫匋濤瑫绦匋洮洮匋匋討套特駦駦庝誊珶剔踢锑諟趧渧渧軆櫕嚏惕珶珶屟兲婖瑱甶甛恬婖睓狣條迢眺朓萜鉄萜廰厛烃汀侹渟渟侹侹艇嗵秱酮瞳哃恫浵僮硧硧茼統痌偸投頭透凸禿湥圖徙蒤凃廜汢汢兎湍團蓷颓蹆蜕蹆蹆昋屯臀柂仛脫袉拕駞袉椭鋖沰唾挖哇蛙哇哇咓襪歪迯豌塆塆琓顽汍烷唍涴梚脕皖惋宛啘萭腕忹迋匄忹蛧暀忹朢莣妄媙蘶嶶佹韦違桅圍惟惟潙潍惟苇崣逶偉沩屗纬沬墛菋嵔媦嵔蘶莅渭媦墛墛衞瘟溫螡妏聞鈫沕穏紊問滃暡瓮挝窩煱窉莪斡臥楃沃莁嗚钨烏汚莁偓嘸蕪梧圄呉毋娬伍圄吘橆⑤侮坞戊霚晤粅匢務圄誤厝凞唽覀硒矽晰嘻扱唶犠浠息唏悉膝汐厝熄烯渓汐犀檄袭席習媳禧铣冼係隙戱細磍虾匣葭轄叚浹浹浹芐厦嗄圷锨锨姺佡鮮汘咸賢銜舷娴涎妶溓显険哯獻縣腺陥羨宪陥限線楿厢镶萫葙襄湘芗翔祥詳想姠啍頙巷潒潒姠潒簘硝霄萷涍嚣销消宵淆哓尒涍校肖啸笑效楔些歇蝎嚡拹挾携峫斜脅喈冩悈啣蟹澥绁瀉塮屑蕲芯锌俽厗噺忻杺信衅暒睲睲瑆興鉶侀形郉垳瑆圉莕悻狌兇兇洶匈汹雄熋咻俢饈朽溴琇莠袖绣歔戌濡歔歔湏俆汻蓄酗溆旮垿畜恤絮胥緒續蓒媗媗悬嫙玆選癣妶絢靴薛敩泬膤洫勛熏揗洵咰浔紃廵咰卂訓卂遜卂壓呷鴉鴨吖吖厊厊蚜崖衙涯蕥啞亞冴漹咽阉煙殗鹽嚴妍蜒啱娫訁顔閻烾沿奄殗眼衍湮滟堰嬿厭砚雁唁彦熖匽谚験殃姎鴦秧昜婸佯疡咩樣陽氧卬癢養樣羕撽崾岆愮愮尧滛窰愮烑吆舀葯婹耀倻噎倻爺嘢冶竾頁掖鄴旪曳腋液液①壹悘揖铱畩吚扆颐夷遗簃儀胰寲沂宜侇彝掎蚁掎巳乁矣姒兿抑昜邑屹億役臆逸肄疫洂裔嬑藙忆義谥溢诣议谊譯異翼翌绎筃荫洇殷堷隂絪荶檭婬夤飮吚吲陻茚渶璎璎鹰應缨瑩萤營荧蝇迊赢盁影颕哽眏喲砽砽臃痈滽澭踊蛹怺怺悀怺恿湧鼡豳沋滺沋尤甴邮铀沋怞遊酉洧伖祐祐釉诱叒孧扜菸纡盂榆虞愚舆悇揄揄渔揄揄渔隅予娯雨玙屿禹荢娪羽砡域芋喐吁喁喻峪御匬慾獄唷謍浴寓裕預豫驭鴛棩寃沅垣媴厡瑗辕圎園園猿羱緣逺夗蒝葾阮曰箹樾跞钥捳粵仴哾閱秐囩郧枃殒狁運藴酝暈韻夃匝咂卆酨酨災宰酨侢茬洎瓒暫瓒賍賍髒蹧蹧凿藻栆皁璪蚤璪璪慥唣灶璪嫧萚荝澤賊怎熷璔嶒熷紥喳碴札轧铡閘喳栅搾咋咋怍怍擿斋宅搾債寨瞻毡詹秥跕盏斬辗崭蹍蘸棧颭戰跕偡綻樟嶂彰漳張礃涨粀扙賬账扙胀瘴障妱昭找沼趙燳罩狣肇佋嗻菥悊蛰辙鍺锗蔗適淅沴斟嫃甄砧臻浈針浈忱疹沴震桭鎮俥篜諍諍姃狰踭姃整拯囸炡帧症鄭姃芷汥伎汥倁倁汥脂汥と枳轵矗淔殖秇惪侄歮栺圵趾呮旨衹梽挚掷臸臸置帜峙淛潪秩雉質炙痔滞菭窒狆盅筗妕衷蔠種妕偅仲衆洀淍詶詶诌粥轴肘帚咒皺宙昼骤咮株咮咮蕏渚诛豩艸烛煑拄瞩瞩炷著炷莇蛀贮铸茿炷炷柷驻抓爪跩抟磚啭撰賺篆桩圧裝妝獞匨匨椎锥搥赘墜綴谆痽浞炪婥棹琢茁酌啄着灼浊兹恣粢恣稵淄孜橴仔籽滓ふ洎渍牸鬃琮琮崈琮縂枞邹趉楱楱蒩娖卒蔟袓蒩蒩蒩鑽纂觜酔朂嶵澊噂葃咗佐柞莋莋唑蓙錒噯嬡璦曖靄諳銨鵪媼驁鰲鈀唄鈑鴇齙鵯賁錛蓽嗶潷鉍篳蹕芐緶籩驃颮飆鏢鑣鰾儐繽檳殯臏鑌髕鬢稟餑鈸鵓鈽驂黲惻鍤儕釵囅諂讖蕆懺嬋驏覘禪鐔倀萇悵閶鯧硨傖諶櫬磣齔棖檉鋮鐺飭鴟銃儔幬讎芻絀躕釧愴綞鶉輟齪鶿蓯驄樅輳攛銼鹺噠韃駘紿殫賧癉簞讜碭襠燾鐙糴詆諦綈覿鏑巔鈿癲銚鯛鰈鋌銩崠鶇竇瀆櫝牘篤黷籪懟鐓燉躉鐸諤堊閼軛鋨鍔鶚顎顓鱷誒邇鉺鴯鮞鈁魴緋鐨鯡僨灃鳧駙紱紼賻麩鮒鰒釓賅尷搟紺戇睪誥縞鋯紇鎘潁亙賡綆鯁詬緱覯詁轂鈷錮鴣鵠鶻鴰摑詿摜鸛鰥獷匭劌媯檜鮭鱖袞緄鯀堝咼幗槨蟈鉿闞絎頡灝顥訶闔蠣黌訌葒閎鱟滸鶘驊樺鏵奐繯鍰鯇鰉詼薈噦澮繢琿暉諢餛閽鈥鑊訐詰薺嘰嚌驥璣覬齏磯羈蠆躋霽鱭鯽郟浹鋏鎵蟯諫縑戔戩瞼鶼筧鰹韉絳韁撟嶠鷦鮫癤頜鮚巹藎饉縉贐覲剄涇逕弳脛靚鬮鳩鷲詎屨櫸颶鉅鋦窶齟錈鐫雋譎玨皸剴塏愾愷鎧鍇龕閌鈧銬騍緙軻鈳錁頷齦鏗嚳鄶噲膾獪髖誆誑鄺壙纊貺匱蕢憒聵簣閫錕鯤蠐崍徠淶瀨賚睞錸癩籟嵐欖斕鑭襤閬鋃嘮嶗銠鐒癆鰳誄縲儷酈壢藶蒞蘺嚦邐驪縭櫪櫟轢礪鋰鸝癘糲躒靂鱺鱧蘞奩瀲璉殮褳襝鰱魎繚釕鷯藺廩檁轔躪綾欞蟶鯪瀏騮綹鎦鷚蘢瀧瓏櫳朧礱僂蔞嘍嶁鏤瘺耬螻髏壚擼嚕閭瀘淥櫨櫓轤輅轆氌臚鸕鷺艫鱸臠孌欒鸞鑾圇犖玀濼欏腡鏍櫚褸鋝嘸嘜嬤榪勱縵鏝顙鰻麼捫燜懣鍆羋謐獼禰澠靦黽緲繆閔緡謨驀饃歿鏌鉬鐃訥鈮鯢輦鯰蔦裊隉蘗囁顢躡苧嚀聹儂噥駑釹儺謳慪甌蹣皰轡紕羆鈹諞駢縹嬪釙鏷鐠蘄騏綺榿磧頎頏鰭僉蕁慳騫繾槧鈐嬙檣戧熗錆鏘鏹羥蹌誚譙蕎繰磽蹺愜鍥篋鋟撳鯖煢蛺巰賕蟣鰍詘嶇闃覷鴝詮綣輇銓闋闕愨蕘嬈橈飪軔嶸蠑縟銣顰蜆颯毿糝繅嗇銫穡鎩鯊釃訕姍騸釤鱔坰殤觴厙灄畬詵諗瀋謚塒蒔弒軾貰鈰鰣綬攄紓閂鑠廝駟緦鍶鷥藪餿颼鎪謖穌誶蓀猻嗩脧闥鉈鰨鈦鮐曇鉭錟頇儻餳鐋鏜韜鋱緹鵜闐糶齠鰷慟鈄釷摶飩籜鼉媧膃紈綰輞諉幃闈溈潿瑋韙煒鮪閿萵齷鄔廡憮嫵騖鵡鶩餼鬩璽覡硤莧薟蘚峴獫嫻鷴癇蠔秈躚薌餉驤緗饗嘵瀟驍綃梟簫褻擷紲纈陘滎饈鵂詡頊諼鉉鏇謔澩鱈塤潯鱘埡婭椏氬厴贗儼兗讞懨閆釅魘饜鼴煬軺鷂鰩靨謁鄴曄燁詒囈嶧飴懌驛縊軼貽釔鎰鐿瘞艤銦癮塋鶯縈鎣攖嚶瀅瀠瓔鸚癭頦罌鏞蕕銪魷傴俁諛諭蕷崳飫閾嫗紆覦歟鈺鵒鷸齬櫞鳶黿鉞鄆蕓惲慍紜韞殞氳瓚趲鏨駔賾嘖幘簀譖繒譫詔釗謫輒鷓湞縝楨軫賑禎鴆諍崢鉦錚箏騭櫛梔軹輊贄鷙螄縶躓躑觶鍾紂縐佇櫧銖囀饌顳騅縋諑鐲諮緇輜貲眥錙齜鯔傯諏騶鯫鏃纘躦鱒訁譾郤猛氹阪壟堖垵墊檾蕒葤蓧蒓菇槁摣咤唚哢噝噅撅劈謔襆嶴脊仿僥獁麅餘餷饊饢楞怵懍爿漵灩混濫瀦淡寧糸絝緔瑉梘棬案橰櫫軲軤賫膁腖飈糊煆溜湣渺碸滾瞘鈈鉕鋣銱鋥鋶鐦鐧鍩鍀鍃錇鎄鎇鎿鐝鑥鑹鑔穭鶓鶥鸌癧屙瘂臒襇繈耮顬蟎麯鮁鮃鮎鯗鯝鯴鱝鯿鰠鰵鱅鞽韝齇';
}
function qqPYStr(){ 
	return '';
}
function onStop(){
	isMachineBootUp = false;
					clearInterval(mainSpamLoop);
					mdui.snackbar({
    					message: '刷帖机已经关闭',
    					position: 'bottom'
  					});
}