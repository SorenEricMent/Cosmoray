document.addEventListener('DOMContentLoaded',function() {
	__CosmorayOuterShell();//进入Launcher
});

function _ConsoleOutput(origin,info){//统一Log格式
	_ConsoleStream("%c["+origin+"]"+":%c"+info,"color:#bba722;","color:#666666;");
}
function _snackBar(info){
	mdui.snackbar({
    	message: info,
  		position: 'bottom'
  	});
}
function _lsnackBar(info){
	mdui.snackbar({
	    message: info,
	    position: 'right-bottom'
  	});
}
async function __CosmorayOuterShell(){
	const origin = "Launcher";
	CMRVerifyStatus = false;
	__V__ = {
		"iv":"4.1.3",
		"ksv":"4",
		"dv":"20210205_02",
		"sv":00000002
	};
	preloadProgress = $('<div>', {//插入加载进度条
		id : 'cosmoray-loading',
		class : 'mdui-progress'
	});
	preloadProgress.appendTo('body');
	document.getElementById('cosmoray-loading').innerHTML = '<div class="mdui-progress-indeterminate"></div>';
	_ConsoleStream = window.console.log;
	window.console = null;//替换原有console
	_RequestData = null;
	document.getElementsByTagName('body')[0].classList.add("mdui-theme-accent-blue");
	_ConsoleOutput(origin,"Cosmoray launched.");
	_ConsoleOutput(origin,"Cosmoray by Alphabeth (WinslowEric)");
	MDUIDomLoad();
	if(VM("ENVI_CHECK") == 1){//Cosmoray完成环境检查，开始运行
		var ServerSideVersion = await VersionCheck();
		if((ServerSideVersion - __V__.sv) > 2){
			mdui.alert("请更新你的Cosmoray","错误");
			$("#cosmoray-loading").fadeOut();
		}else{
			var currentEnvi = websiteCheck();//检查目前处在什么网站
			var isCosmorayEnabled = await isServerAllowed();
			if(isCosmorayEnabled == 1){
				CMRVerifyStatus = true;
				if(currentEnvi == "TIEBA"){//进入贴吧分支
					_ConsoleOutput(origin,"Tieba Environment");
					TBPageData = _CosmorayInit("TB");
					if(TBPageData.user.name == undefined){
						TBName = TBPageData.user.display_name;
					}else{
						TBName = TBPageData.user.name;
					}
					if(TBPageData.user.id == undefined){
						TBID = TBPageData.user.user_id;
					}else{
						TBID = TBPageData.user.id;
					}
					tiebaInit();
					tiebaOptimize();
					_CosmorayGUI("TBMAIN");
					if(TBPageData.user.is_login){
						accountStatus = await testActivate(TBID);
						accountStatus = JSON.parse(accountStatus);
						if(accountStatus.status == 2){
							btnSet = document.getElementsByClassName('cmrcomponent');
							nowTBPage = TBPageData.product;
							if(nowTBPage != "pmc"){
								for(var i=0;i<btnSet.length;i++){
									btnSet[i].removeAttribute("disabled");
								}
							}
							$("#cosmoray-loading").fadeOut();
						}else if(accountStatus.status == 3){
							$("#cosmoray-loading").fadeOut();
							mdui.alert('您的账号已经被永久封停','错误');
						}else if(accountStatus.status == 4){
							$("#cosmoray-loading").fadeOut();
							//敌对势力 启动自毁程序 FJX|女权从此废了一个贴吧账号。
						}else{
							$("#cosmoray-loading").fadeOut();
							setTimeout("mdui.prompt('激活Cosmoray',function (value) {Activate(value);});",1000);
						}
					}else{
						document.getElementById("tbuserid").innerHTML = "用户未登录。";
					}
				}
			}else{
				mdui.alert("Cosmoray已被禁用","错误");
			}
			try{//魔法
				$("#cosmoray-loading").fadeOut();
			}catch(err){
				_ConsoleOutput(origin,"GUI Exception catched.");
			}
		}
	}
}
function websiteCheck(){
	if(document.domain == "tieba.baidu.com"){
		return "TIEBA";
	}
}
//网络请求通过这个函数执行
async function _CosmorayWebApi(requestTarget,requestParam,requestToken){
	const origin = "WebRequest";
	webApiData = null;
	switch(requestTarget){
		case "COPYTZ"://转载帖子
			_RequestData = await $.ajax({
				type : 'GET',
				timeout : 120000,
				url : 'https://cr.zenithium.org/api/tb.php?id='+requestParam+"&username="+requestToken,
				async : true,
				success : function(callback) {
					webApiData = callback;
				}
			});
			return webApiData;
			break;
		case "HITOKOTO"://一言
			_RequestData = await $.ajax({
				type : 'GET',
				timeout : 120000,
				url : 'https://api.wrdan.com/hitokoto',
				async : true,
				success : function(callback) {
					webApiData = callback;
				}
			});
			return webApiData;
			break;
		case "BILI"://转载Bilibili
			try{
				_RequestData = await $.ajax({
					type : 'GET',
					url : 'https://cr.zenithium.org/api/b.php',
					async : true,
					success : function(callback) {
						webApiData = callback;
					}
				});
			}catch(err){
				_lsnackBar("网络IO错误，请检查你的网络是否正常");
			}
			return webApiData;
			break;
		case "C.HS.TC"://炉石台词
			try{
				_RequestData = await $.ajax({
					type : 'GET',
					url : 'https://cr.zenithium.org/api/hs.php',
					async : true,
					success : function(callback) {
						webApiData = callback;
					}
				});
			}catch(err){
				_lsnackBar("网络IO错误，请检查你的网络是否正常");
			}
			return webApiData;
			break;
		case "C.HS.KZ"://炉石卡组
			try{
				_RequestData = await $.ajax({
					type : 'GET',
					url : 'https://cr.zenithium.org/api/hsdname.php',
					async : true,
					success : function(callback) {
						webApiData = callback;
					}
				});
			}catch(err){
				_lsnackBar("网络IO错误，请检查你的网络是否正常");
			}
			return webApiData;
			break;
		case "C.HS.NM"://炉石名字
			try{
				_RequestData = await $.ajax({
					type : 'GET',
					url : 'https://cr.zenithium.org/api/hsname.php',
					async : true,
					success : function(callback) {
						webApiData = callback;
					}
				});
			}catch(err){
				_lsnackBar("网络IO错误，请检查你的网络是否正常");
			}
			return webApiData;
			break;
		case "C.PM"://诗
		//
			return webApiData;
			break;
		case "C.WZ"://文章
			try{
				_RequestData = await $.ajax({
					type : 'GET',
					url : 'https://cr.zenithium.org/api/article.php',
					async : true,
					success : function(callback) {
						webApiData = callback;
					}
				});
			}catch(err){
				_lsnackBar("网络IO错误，请检查你的网络是否正常");
			}
			return webApiData;
			break;
		case "C.MZ"://名字
			try{
				_RequestData = await $.ajax({
					type : 'GET',
					url : 'https://cr.zenithium.org/api/name.php',
					async : true,
					success : function(callback) {
						webApiData = callback;
					}
				});
			}catch(err){
				_lsnackBar("网络IO错误，请检查你的网络是否正常");
			}
			return webApiData;
			break;
		default:
			_ConsoleOutput(origin,"Unknown error.");
			throw "UKE";
	}
}
//验证是否为Zenithium服务器，本来想上非对称，麻烦得要死 。。。
async function ZenithiumServerCert(){
	
}
//上传操作日志 只是为了防止内鬼
async function uploadLogs(){
	
}
function _CosmorayGUI(gui){
	const origin = "GUI";
	if(gui == "TBMAIN"){//贴吧主界面GUI
		GUIStatus = localStorage.getItem("CMR-guiShow");
		GUIMode = localStorage.getItem("CMR-guiModetb");
		if(GUIStatus == null){//Cosmoray初次运行，GUI默认显示
			localStorage.setItem("CMR-guiShow", "true");
		}
		if(GUIMode == null){//Cosmoray初次运行，GUI默认初始
			localStorage.setItem("CMR-guiModetb", "cosmoray-main-gui-tb");
		}
		MainGui = $('<div>', {//插入贴吧主要界面
			id : 'cosmoray-main-gui-tb',
			class : 'mdui-shadow-2 mdui-hoverable mdui-typo'
		});
		MainGui.appendTo('body');
		STGui = $('<div>', {//插入贴吧刷帖界面
			id : 'cosmoray-st',
			class : 'mdui-shadow-2 mdui-hoverable mdui-typo'
		});
		STGui.appendTo('body');
		DTGui = $('<div>', {//插入贴吧顶贴界面
			id : 'cosmoray-dt',
			class : 'mdui-shadow-2 mdui-hoverable mdui-typo'
		});
		DTGui.appendTo('body');
		WFGui = $('<div>', {//插入贴吧挖坟界面
			id : 'cosmoray-wf',
			class : 'mdui-shadow-2 mdui-hoverable mdui-typo'
		});
		WFGui.appendTo('body');
		BWGui = $('<div>', {//插入贴吧吧务界面
			id : 'cosmoray-bw',
			class : 'mdui-shadow-2 mdui-hoverable mdui-typo'
		});
		BWGui.appendTo('body');
		document.getElementById('cosmoray-main-gui-tb').innerHTML = 
			'<span class="cosmoray-title">Cosmoray X</span><br/><span class="cosmoray-subt">BY Alphabeth<br/>['+'IV'+__V__.iv+',KSV'+__V__.ksv+',DV'+__V__.dv+']</span><br/>'+
			'<button id="tbshuatie" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-blue-grey-300 cmrcomponent" disabled>进入贴吧刷帖机</button><br/>'+
			'<button id="tbdingtie" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-blue-grey-300 cmrcomponent" disabled>进入贴吧顶贴机</button><br/>'+
			'<button id="tbwafeng" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-blue-grey-300 cmrcomponent" disabled>进入贴吧挖坟机</button><br/>'+
			'<button id="tbbawu" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-grey-400 cmrcomponent" disabled>进入贴吧吧务管理工具</button><br/>'+
			'<span id="tbuserid">贴吧ID：'+TBID+"("+TBName+")</span><br/><br/>"+
			'<button id="cmrabout" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-grey-200">关于Cosmoray</button><br/>';
		document.getElementById('cosmoray-st').innerHTML = 
			'<span class="cosmoray-title">Cosmoray X</span><span class="cosmoray-subt">BY 联军技术部<br/>['+'IV'+__V__.iv+',KSV'+__V__.ksv+',DV'+__V__.dv+']</span><ul class="mdui-list mdui-color-theme-900">'+
			'<li><div class="cosmoray-sub2">刷帖模式</div>点击齿轮进行高级设置或查看描述</li>'+
			'<li class="mdui-list-item mdui-ripple"><button class="advstset mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons st-advset">&#xe8b9;</i></button><div class="mdui-list-item-content">镜像模式</div><label class="mdui-text-color-theme-900 mdui-switch"><input type="checkbox"/><i class="st-mode mdui-switch-icon"></i></label></li>'+
			'<li class="mdui-list-item mdui-ripple"><button class="advstset mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons st-advset">&#xe8b9;</i></button><div class="mdui-list-item-content">随机转载帖子</div><label class="mdui-text-color-theme-900 mdui-switch"><input type="checkbox"/><i class="st-mode mdui-switch-icon"></i></label></li>'+
			'<li class="mdui-list-item mdui-ripple"><button class="advstset mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons st-advset">&#xe8b9;</i></button><div class="mdui-list-item-content">随机从B站转载</div><label class="mdui-switch"><input type="checkbox" checked/><i class="st-mode mdui-switch-icon"></i></label></li>'+
			'<li class="mdui-list-item mdui-ripple"><button class="advstset mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons st-advset">&#xe8b9;</i></button><div class="mdui-list-item-content">自定义模式</div><label class="mdui-switch"><input type="checkbox"/><i class="st-mode mdui-switch-icon"></i></label></li>'+
			'<li><div class="cosmoray-sub2">其他设置</div></li>'+
			'<li class="mdui-list-item mdui-ripple"><i class="mdui-icon material-icons">&#xe226;</i><div class="mdui-list-item-content">发帖后缀</div><label class="mdui-switch"><input type="checkbox"/><i class="st-mode mdui-switch-icon"></i></label></li>'+
			'<li class="mdui-list-item mdui-ripple"><i class="mdui-icon material-icons">&#xe7fb;</i><div class="mdui-list-item-content">AT别人</div><label class="mdui-switch"><input type="checkbox"/><i class="st-mode mdui-switch-icon"></i></label></li></ul>'+
			'<button id="st-adv" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-grey-300 cmrcomponent">高级混淆设置</button><br/>'+
			'<button id="st-time" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-grey-300 cmrcomponent">设置刷帖时间</button><br/>'+
			'<button id="st-start" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-grey-300 cmrcomponent">启动刷帖机</button><br/>'+
			'<button id="exitst" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-grey-400 cmrcomponent">回到主界面</button><br/>'+
			'<span id="tbuserid">贴吧ID：'+TBID+"("+TBName+")</span>";
		document.getElementById('cosmoray-dt').innerHTML = 
			'<span class="cosmoray-title">Cosmoray X</span><br><span class="cosmoray-subt">BY Alphabeth<br/>['+'IV'+__V__.iv+',KSV'+__V__.ksv+',DV'+__V__.dv+']</span><br/>'+
			'<button id="dt-single" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-grey-400 cmrcomponent">单贴顶贴模式(稳定)</button><br/>'+
			'<button id="dt-multi" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-grey-400 cmrcomponent">多贴顶贴模式(测试)</button><br/>'+
			'<button id="exitdt" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-grey-400 cmrcomponent">回到主界面</button><br/>'+
			'<span id="tbuserid">贴吧ID：'+TBID+"("+TBName+")</span>";
		document.getElementById('cosmoray-wf').innerHTML = 
			'<span class="cosmoray-title">Cosmoray X</span><br><span class="cosmoray-subt">BY Alphabeth<br/>['+'IV'+__V__.iv+',KSV'+__V__.ksv+',DV'+__V__.dv+']</span><br/>'+
			'<button id="wf-start" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-grey-400 cmrcomponent">开始挖坟</button><br/>'+
			'<button id="exitwf" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-grey-400 cmrcomponent">回到主界面</button><br/>'+
			'<span id="tbuserid">贴吧ID：'+TBID+"("+TBName+")</span>";
		document.getElementById('cosmoray-bw').innerHTML = 
			'<span class="cosmoray-title">Cosmoray X</span><br><span class="cosmoray-subt">BY Alphabeth<br/>['+'IV'+__V__.iv+',KSV'+__V__.ksv+',DV'+__V__.dv+']</span><br/>'+
			'<button id="bw-setkw" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-grey-400 cmrcomponent">设置删帖关键词</button><br/>'+
			'<button id="bw-delstart" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-grey-400 cmrcomponent">启动删帖机</button><br/>'+
			'<button id="exitbw" class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-grey-400 cmrcomponent">回到主界面</button><br/>'+
			'<span id="tbuserid">贴吧ID：'+TBID+"("+TBName+")</span>";
		document.getElementById('exitst').onclick = function(){
			localStorage.setItem("CMR-guiModetb", "cosmoray-main-gui-tb");
			$("#cosmoray-st").animate({
    			left:'-17%',
  			});
			$("#cosmoray-main-gui-tb").animate({
    			left:'0%',
  			});
		};
		document.getElementById('exitdt').onclick = function(){
			localStorage.setItem("CMR-guiModetb", "cosmoray-main-gui-tb");
			$("#cosmoray-dt").animate({
    			left:'-17%',
  			});
			$("#cosmoray-main-gui-tb").animate({
    			left:'0%',
  			});
		};
		document.getElementById('exitwf').onclick = function(){
			localStorage.setItem("CMR-guiModetb", "cosmoray-main-gui-tb");
			$("#cosmoray-wf").animate({
    			left:'-17%',
  			});
			$("#cosmoray-main-gui-tb").animate({
    			left:'0%',
  			});
		};
		document.getElementById('exitbw').onclick = function(){
			localStorage.setItem("CMR-guiModetb", "cosmoray-main-gui-tb");
			$("#cosmoray-bw").animate({
    			left:'-17%',
  			});
			$("#cosmoray-main-gui-tb").animate({
    			left:'0%',
  			});
		};
		
		document.getElementById('tbshuatie').onclick = function(){
			localStorage.setItem("CMR-guiModetb", "cosmoray-st");
			$("#cosmoray-st").animate({
    			left:'0%',
  			});
			$("#cosmoray-main-gui-tb").animate({
    			left:'-17%',
  			});
		};
		document.getElementById('tbdingtie').onclick = function(){
			localStorage.setItem("CMR-guiModetb", "cosmoray-dt");
			$("#cosmoray-dt").animate({
    			left:'0%',
  			});
			$("#cosmoray-main-gui-tb").animate({
    			left:'-17%',
  			});
		};
		document.getElementById('tbwafeng').onclick = function(){
			localStorage.setItem("CMR-guiModetb", "cosmoray-wf");
			$("#cosmoray-wf").animate({
    			left:'0%',
  			});
			$("#cosmoray-main-gui-tb").animate({
    			left:'-17%',
  			});
		};
		document.getElementById('tbbawu').onclick = function(){
			localStorage.setItem("CMR-guiModetb", "cosmoray-bw");
			$("#cosmoray-bw").animate({
    			left:'0%',
  			});
			$("#cosmoray-main-gui-tb").animate({
    			left:'-17%',
  			});	
		};
		document.getElementById('st-start').onclick = function(){
			st_start();
		};
		var advSTSetting = document.getElementsByClassName("advstset");
		advSTSetting[0].onclick = function(){
			mdui.alert('复制转载本吧帖子,本刷帖模式没有可提供的高级选项。','自定义刷帖设置选项');
		};
		advSTSetting[1].onclick = function(){
			mdui.alert('复制转载贴吧热门帖子,本刷帖模式没有可提供的高级选项。','自定义刷帖设置选项');
		};
		advSTSetting[2].onclick = function(){
			mdui.alert('从Bilibili转载帖子化视频,本刷帖模式没有可提供的高级选项。','自定义刷帖设置选项');
		};
		advSTSetting[3].onclick = function(){
			mdui.alert('<ul class="mdui-list">'+
						'<li class="mdui-list-item mdui-ripple"><i class="mdui-icon material-icons">&#xe3f4;</i>'+
						'<div class="mdui-list-item-content">发帖时附带图片</div>'+
						'<label class="mdui-switch"><input id="stimageoption" type="checkbox" checked/><i class="mdui-switch-icon"></i></label></li>'+
						'<li class="mdui-list-item mdui-ripple"><i class="mdui-icon material-icons">&#xe063;</i>'+
						'<div class="mdui-list-item-content">发帖时附带视频</div>'+
						'<label class="mdui-switch"><input id="stvideooption" type="checkbox" checked/><i class="mdui-switch-icon"></i></label></li>'+ 
						'<li class="mdui-list-item mdui-ripple"><i class="mdui-icon material-icons">&#xe3b9;</i>'+
						'<div class="mdui-list-item-content">发图片视频混合帖</div>'+
						'<label class="mdui-switch"><input id="stcombinemode" type="checkbox"/><i class="mdui-switch-icon"></i></label></li>'+
						'<div class="mdui-textfield"><input class="mdui-textfield-input" type="text" placeholder="输入附带图片数量(小于8，不建议超过4)"/></div>'+
						'<button id="savestimgnum" class="mdui-btn mdui-btn-raised">保存附带图片数量</button><br/>'+
						'<label class="stcustomlist mdui-checkbox"><input type="checkbox" checked/><i class="mdui-checkbox-icon"></i>伪装炉石玩家</label>'+
						'<label class="stcustomlist mdui-checkbox"><input type="checkbox" checked/><i class="mdui-checkbox-icon"></i>伪装女权战士</label>'+
						'<label class="stcustomlist mdui-checkbox"><input type="checkbox" checked/><i class="mdui-checkbox-icon"></i>转载每日一言</label>'+
						'<label class="stcustomlist mdui-checkbox"><input type="checkbox" checked/><i class="mdui-checkbox-icon"></i>转载世界名著</label>'+
						'<label class="stcustomlist mdui-checkbox"><input type="checkbox" checked/><i class="mdui-checkbox-icon"></i>转载古诗诗词</label>'+
						'<label class="stcustomlist mdui-checkbox"><input type="checkbox"/><i class="mdui-checkbox-icon"></i>祖安喷人模式</label>'+
						'<li class="mdui-list-item mdui-ripple"><i class="mdui-icon material-icons">&#xe1b3;</i>'+
						'<div class="mdui-list-item-content">全固定发帖模式</div>'+
						'<label class="mdui-switch"><input id="stfixedmode" type="checkbox"/><i class="mdui-switch-icon"></i></label></li>'+
						'在该模式，上述自定义模式设置将会被无视，刷帖模块只会发您设置的内容<br/>额外[]替换规则：[RN]会被替换为随机4位数字,[RA]会被替换为随机4位字母,[IMG]会被替换为随机图片,[IMG_LJ]是联军军旗'+
						'<div class="mdui-textfield"><input id="stfmodetitle" class="mdui-textfield-input" type="text" placeholder="输入固定标题"/></div>'+
						'<div class="mdui-textfield"><input id="stfmodecontent" class="mdui-textfield-input" type="text" placeholder="输入固定内容"/></div>'+
						'<button id="stfmodesave" class="mdui-btn mdui-btn-raised">保存固定刷帖内容</button>'+
						'</ul>'
			,"自定义刷帖设置选项");
		};
		document.getElementById('st-adv').onclick = function(){
			mdui.alert('<ul class="mdui-list">'+
						'<li class="mdui-list-item mdui-ripple"><i class="mdui-icon material-icons">&#xe8e2;</i>'+
						'<div class="mdui-list-item-content">启动简体到繁体转换</div>'+				
						'<label class="mdui-switch"><input id="stadvts" type="checkbox"/><i class="mdui-switch-icon"></i></label></li>'+
						'<li class="mdui-list-item mdui-ripple"><i class="mdui-icon material-icons">&#xe24e;</i>'+
						'<div class="mdui-list-item-content">插入贴吧表情</div>'+			
						'<label class="mdui-switch"><input id="stadvemj" type="checkbox" checked/><i class="mdui-switch-icon"></i></label></li>'+
						'<div class="mdui-textfield"><input id="stadvemjnum" class="mdui-textfield-input" type="text" placeholder="输入插入表情数量"/></div>'+
						'<button class="mdui-btn mdui-btn-raised">保存插入表情数量</button>'+	
						'<li class="mdui-list-item mdui-ripple"><i class="mdui-icon material-icons">&#xe24f;</i>'+
						'<div class="mdui-list-item-content">插入随机中文字符</div>'+				
						'<label class="mdui-switch"><input type="checkbox" checked/><i class="mdui-switch-icon"></i></label></li>'+
						'<div class="mdui-textfield"><input id="stadvhz" class="mdui-textfield-input" type="text" placeholder="输入插入频率(每X个字符中间插入一个随机中文)"/></div>'+
						'<button id="stadvhzsave" class="mdui-btn mdui-btn-raised">保存插入汉字频率</button>'+
						'</ul>'
			,"高级刷帖混淆选项");
		};
		document.getElementById('st-time').onclick = function(){
			mdui.prompt('设置新的刷帖间隔(单位秒,默认12秒)',
		   		function (value) {
		   			if(value <= 7){
		   				mdui.alert("小于7秒封号几率是100%，建议至少10秒以上","错误");
		   			}else{
						stControlTick = value;
						if(isSTStart){
							_snackBar("时间间隔已经更新，刷帖模块已被重启");
							st_start();
							st_stop();
						}else{
							_snackBar("时间间隔已经更新");
						}
					}
		   		}
		  	);
		};
		stControlList = document.getElementsByClassName("st-mode");
		stControlList[0].onclick = function(){
			
			st_removeMainObfs("mirror");
		};
		stControlList[1].onclick = function(){
			st_removeMainObfs("tieba");
		};
		stControlList[2].onclick = function(){
			st_removeMainObfs("bilibili");
		};
		stControlList[3].onclick = function(){
			st_removeMainObfs("custom");
		};
		stControlList[4].onclick = function(){//发言后缀
			if(isSuffixEnabled){
				isSuffixEnabled = false;
			}else{
				isSuffixEnabled = true;
				mdui.prompt('设置帖子发言后缀',
		   			function (value) {
		   				mdui.alert("现在你的每个帖子都会加上"+value+"后缀","成功");
		   				suffixContent = value;
		   			}
		  		);
			}
		};
		stControlList[5].onclick = function(){//AT别人
			if(isMentionEnabled){
				isMentionEnabled = false;
			}else{
				isMentionEnabled = true;
				mdui.prompt('输入你要AT多少人',
		   			function (value) {
		   				for(var i=0;i<value;i++){
		   					mdui.prompt("请输入第"+(i+1)+"人用户名(注意是用户名不是昵称哦)",function (value){
		   						mentionList[i] = value;
		   					});
		   				}
		   			}
		  		);
			}
		};
		document.getElementById('cmrabout').onclick = function(){
			mdui.alert('Cosmoray是Alphabeth的闭源项目,主要为阿狸我的鱼12编写<br/>使用的第三方代码:jQuery,MDUI<br/>特别鸣谢:GSGCDSUN','关于Cosmoray');
		};
		showBtn = $('<button>', {//插入控制按钮
			id : 'cosmoray-show',
			class : 'mdui-btn-raised'
		});
		showBtn.appendTo('body');
		document.getElementById('cosmoray-show').innerHTML = "收起Cosmoray";
		GUIMode = localStorage.getItem("CMR-guiModetb");
		_ConsoleOutput(origin,"GUI Inited.");
		if(GUIStatus == "true"){//加载时检测是否展开
			document.getElementById(GUIMode).style.left = '0';
  			document.getElementById('cosmoray-show').innerHTML = "收起Cosmoray";
		}else{
			document.getElementById(GUIMode).style.left = '-17%';
	  		document.getElementById('cosmoray-show').innerHTML = "展开Cosmoray";
		}
		document.getElementById('cosmoray-show').onclick = function(){
			GUIStatus = localStorage.getItem("CMR-guiShow");
			GUIMode = localStorage.getItem("CMR-guiModetb");
			if(GUIStatus == "true"){//按钮控制收起展开
				$("#"+GUIMode).animate({
    				left:'-17%',
  				});
  				document.getElementById('cosmoray-show').innerHTML = "展开Cosmoray";
  				localStorage.setItem("CMR-guiShow", "false");
			}else{
				$("#"+GUIMode).animate({
    				left:'0',
  				});
  				document.getElementById('cosmoray-show').innerHTML = "收起Cosmoray";
  				localStorage.setItem("CMR-guiShow", "true");
			}
		};
	}
}
//贴吧模块初始化
async function tiebaInit(){
	const origin = "TiebaModule_Init";
	tbPostData = {//初始化Post发帖数据
		"ie":"utf-8",
		"kw":"",
		"fid":"",
		"tid":0,
		"vcode_md5":"",
		"floor_num":0,
		"rich_text":1,
		"tbs":"",
		"content":"",
		"basilisk":1,
		"title":"",
		"prefix":"",
		"mouse_pwd":"",
		"mouse_pwd_t":"",
		"mouse_pwd_isclick":1,
		"nick_name":"",
		"_type_":"thread",
		"geetest_success":0,
		"_BSK":""
		};
	st_blackList = await getGlobalBlackList();//黑名单
	copyPageTitle = document.getElementsByClassName("threadlist_lz clearfix");
	copyPageContent = document.getElementsByClassName("threadlist_abs threadlist_abs_onlyline");
	stControlTick = 12000;//各种间隔
	dtControlTick = 9500;
	wfControlTick = 10000;
	delControlTick = 8000;
	errorCount = 0;//异常计数
	isSTStart = false;
	isDTStart = false;
	isWFStart = false;
	isDelStart = false;
	commonCounter = {
		"st":0,
		"dt":0,
		"wf":0
	};//发帖计数
	try{
		cardElement = document.getElementsByClassName('card_title')[0];
		cardElement.innerHTML = cardElement.innerHTML + '<br/><span id="cmr-counter"></span>';
		counterBoard=document.getElementById("cmr-counter");
		counterBoard.style.color="rgb(86,105,135)";  
		counterBoard.innerHTML="[刷帖数:0,顶贴数:0,挖坟数:0(计数不同步)]";
		infoCateElement = document.getElementsByClassName("card_info")[0];
		cardSloganElement = document.getElementsByClassName("card_slogan")[0];
		infoCateElement.innerHTML = "<br/>" + infoCateElement.innerHTML;
		cardSloganElement.innerHTML = "<br/>" + cardSloganElement.innerHTML;
	}catch(err){
		_ConsoleOutput(origin,"非子贴吧页面状态");
	}
	//贴吧表情数组
	emojiSet = ['<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f01.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f02.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f03.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f04.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f05.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f06.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f07.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f08.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f09.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f10.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f11.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f12.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f13.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f14.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f15.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f16.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f17.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f18.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f19.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f20.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f30.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f29.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f28.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f27.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f26.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f25.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f24.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f23.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f22.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f21.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f33.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f32.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">','<img pic_type="1" src="//tb2.bdstatic.com/tb/editor/images/face/i_f31.png?t=20140803" class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" unselectable="on" height="30" width="30">'];
	mainSTObfsList = ["custom","bilibili","tieba","mirror"];//主发帖模式
	mainSTObfsStat= [1,1,1,0];
	customSTObfsList = ["Poem","Hearthstone","Hitokoto","Articles","Feminist"];//自定义发帖模式分支
	customSTObfsStat= [1,1,1,1,1,0];
	customDTObfsList = ["Poem","Hearthstone","Hitokoto","Articles","Feminist"];//自定义顶贴模式分支
	customDTObfsStat= [1,1,1,1,1,0];
	customWFObfsList = ["Poem","Hearthstone","Hitokoto","Articles","Feminist"];//自定义挖坟模式分支
	customWFObfsStat= [1,1,1,1,1,0];
	isImageEnabled = false;
	imageNumber = 1;//默认只附加一张图片
	isVideoEnabled = false;
	isEmojiEnabled = false;
	isMentionEnabled = false;
	isSuffixEnabled = false;
	mentionList = [];//AT列表
	suffixContent = "";
	//imageOrigin = ["ZENITHIUM","TWDNE","WRDAN"];//使用图片API列表
}
//这些函数操纵混淆模式的移除
function st_removeMainObfs(target){
	for(var i=0;i<mainSTObfsList.length;i++){
		if(mainSTObfsList[i] == target){
			mainSTObfsList.splice(i, 1);
		}
	}
}
function st_removeCustomObfs(target){
	for(var i=0;i<customSTObfsList.length;i++){
		if(customSTObfsList[i] == target){
			customSTObfsList.splice(i, 1);
		}
	}
}
function dt_removeObfs(target){
	for(var i=0;i<customDTObfsList.length;i++){
		if(customDTObfsList[i] == target){
			customDTObfsList.splice(i, 1);
		}
	}
}
function wf_removeObfs(target){
	for(var i=0;i<customWFObfsList.length;i++){
		if(customWFObfsList[i] == target){
			customWFObfsList.splice(i, 1);
		}
	}
}
function image_removeObfs(target){
	for(var i=0;i<imageOrigin;i++){
		if(imageOrigin[i] == target){
			imageOrigin.splice(i, 1);
		}
	}
}
//以下都是对_CosmorayWebApi的封装，_CosmorayWebApi仅负责网络请求。
//获取一言
async function getHitokoto(){
	var hitokotoData = await _CosmorayWebApi("HITOKOTO");
	hitokotoData = JSON.Parse(hitokotoData);
	return hitokotoData;
}
//获取图片
async function getImage(){
	
}
//获取人名
async function getHumanName(){
	var returnData = await _CosmorayWebApi("C.HS.TC");
	return returnData;
}
//获取文章
async function getArticles(){
	var returnData = await _CosmorayWebApi("C.HS.TC");
	return returnData;
}
//炉石
async function getHearthStone(){
	var returnData = await _CosmorayWebApi("C.HS.TC");
	return returnData;
}
async function getHearthStoneN(){
	var returnData = await _CosmorayWebApi("C.HS.TC");
	return returnData;
}
async function getHearthStoneDN(){
	var returnData = await _CosmorayWebApi("C.HS.TC");
	return returnData;
}
//转载
async function getFeed(){
	
}
//Bilibili转载 从旧版Cosmoray改的，注意百度新加上了登录状态验证
async function getBilibili(){
	bData = await _CosmorayWebApi("BILI");
	bData = JSON.parse(bData);
	bDataReturn = {
		"title":null,
		"content":null
	};
	if(bData.code == 0){
		var b_AVID = bData.data.aid;
		var b_PIC = bData.data.pic;
		var b_TOPIC = bData.data.dynamic;
		var b_TNAME = bData.data.tname;
		var b_DESC = bData.data.desc;
		var b_TITLE = bData.data.title;
		var b_ADDTOPIC = Math.floor(Math.random() * 2);
		var b_ADDTNAME = Math.floor(Math.random() * 2);
		var b_MAINMODE = Math.floor(Math.random() * 2);
		var b_CONTENT = "";
		if(b_MAINMODE == 0){
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
			tbfid = TBPageData.forum.id;
			var imageTransfer = await $.ajax({
				type : 'POST',
				timeout : 120000,
				url : 'https://uploadphotos.baidu.com/upload/pic?tbs=' + tbs + '&fid=' + tbfid + '&save_yun_album=1',
				async : true,
				xhrFields: {
					withCredentials: true  //解决跨服务传递时不传递cookie的问题，允许携带证书
				},
				crossDomain: true,
				data : "filetype=url&file=&urls%5B%5D="+b_PIC,
				success : function(callback) {
					photoBDData = callback;
				}
			});
			photoBDData = photoBDData.urls[0].pic_id_encode;
			imageDiv = "<img class='BDE_Image' data-isupload='1' src='https://tiebapic.baidu.com/forum/pic/item/" + photoBDData + ".jpg' unselectable='on' pic_type='0' width='400' height='400'>";
			b_CONTENT = b_CONTENT + imageDiv;
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
			data : 'url=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2Fav' + b_AVID + '&type=0',
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
			b_CONTENT = b_CONTENT + videoHTMLObject;
		}	
		if(b_ADDTOPIC == 0){
			b_CONTENT = b_TOPIC + b_CONTENT;
		}
		if(b_ADDTNAME == 0){
			b_TITLE = "【" + b_TNAME + "】" + b_TITLE;
		}
		bDataReturn.title = b_TITLE;
		bDataReturn.content = b_CONTENT;
		return bDataReturn;
	}else{
		bDataReturn = await getBilibili();
		return bDataReturn;
	}
}
//刷帖 顶贴 挖坟 获取内容模块
async function st_getContent(){
	const origin = "TiebaModule";
	var contentData = null;
	var STContentObfsMode = 2;//Math.floor(Math.random() * mainSTObfsList);
	switch(STContentObfsMode){
		case 0:
			break;
		case 1:
			STContentObfsModeC = Math.floor(Math.random() * customSTObfsList);
			break;
		case 2:
			contentData = await getBilibili();
			return contentData;
			break;
		default:
			_ConsoleOutput(origin,"Unknown Error.");
	}
	contentData = contentData + suffixContent;
	return contentData;
}
//各种机器的启动/停止
async function st_start(){
	if(CMRVerifyStatus){
		if(TBPageData.page != "frs"){
			mdui.alert("请到目标贴吧首页启动","错误");
		}else{
			if(!isSTStart){
				isSTStart = true;
				_snackBar("刷帖模块已经启动");
				st_mainLoop = setInterval(async function(){//主刷帖循环
					stContentData = await st_getContent();
					document.getElementsByClassName('editor_textfield')[0].value = stContentData.title;
					document.getElementById('ueditor_replace').innerHTML = stContentData.content;
					document.getElementsByClassName('poster_submit')[0].click();
					commonCounter.st++;
					counterBoard.innerHTML = "[刷帖数:"+commonCounter.st+",顶贴数:"+commonCounter.dt+",挖坟数:"+commonCounter.wf+"(计数不同步)]";
				},stControlTick);
				document.getElementById('st-start').innerHTML = "关闭刷帖机";
			}else{
				isSTStart = false;
				st_stop();
				document.getElementById('st-start').innerHTML = "启动刷帖机";	
			}
		}
	}
}
async function st_stop(){
	_snackBar("刷帖模块已经停止");
	clearInterval(st_mainLoop);
}
async function dt_start(){
	_snackBar("顶贴模块已经启动");
}
async function dt_stop(){
	_snackBar("顶贴模块已经停止");
}
async function wf_start(){
	_snackBar("挖坟模块已经启动");
}
async function wf_stop(){
	_snackBar("挖坟模块已经停止");
}
//Cosmoray初始化（网站数据）
function _CosmorayInit(site){
	if(site == "TB"){
		var dataTrans = document.createElement('script');
		dataTrans.type = 'text/javascript';
		dataTrans.innerHTML = "document.body.setAttribute('cmr-tbDataExange',JSON.stringify(PageData));";
		document.head.appendChild(dataTrans);
		document.head.removeChild(dataTrans);
		TBPageData = document.body.getAttribute('cmr-tbDataExange');
		TBPageData = JSON.parse(TBPageData);
		document.body.removeAttribute('cmr-tbDataExange');
		return TBPageData;
	}
}
//贴吧UI优化
function tiebaOptimize(){
	$(".tbui_aside_float_bar").fadeOut();
	$(".search_back_box").fadeOut();
	$(".app_download_box").fadeOut();
	$(".celebrity").fadeOut();
}
//激活
async function Activate(key){
	var _RequestData = await $.ajax({
		type : 'GET',
		url : 'https://cr.zenithium.org/cert/register.php?key='+key+'&uid='+TBID,
		async : true,
		success : function(callback) {
			RSTATUS = callback;
		}
		});
		RSTATUS = JSON.parse(RSTATUS);
		if(RSTATUS.status == "error"){
			mdui.alert("激活失败","错误");
		}else if(RSTATUS.status == "success"){
			mdui.alert("激活成功","提示");
			location.reload();
		}
}
//Cosmoray是否被禁用
async function isServerAllowed(){
	_RequestData = await $.ajax({
		type : 'GET',
		url : 'https://cr.zenithium.org/cert/allow.php',
		async : true,
		success : function(callback) {
			ALSTATUS = callback;
		}
	});
	return ALSTATUS;	
}
//测试账号有没有被激活
async function testActivate(tiebaID){
	_RequestData = await $.ajax({
		type : 'GET',
		url : 'https://cr.zenithium.org/cert/query.php?uid='+tiebaID,
		async : true,
		success : function(callback) {
			ACSTATUS = callback;
		}
	});
	return ACSTATUS;
}
//VM 弃用了 为了防止跑的太慢 只有检查环境功能 无视
function VM(COMMAND){
	const origin = "VM";
	if(COMMAND == "ENVI_CHECK"){//检查环境
		try{
			_ConsoleStream(window); 
		}catch(e){
			_ConsoleOutput(origin,"Environment Error.");
			return 0;
		}
		if(typeof chrome.extension == "undefined"){
			_ConsoleOutput(origin,"Environment Error.");
		 	return 0;
		}
		webdriver = window.navigator.webdriver;
		if(webdriver) {
			_ConsoleOutput(origin,"Environment Error.");
			return 0;
		}
		return 1;
	}
	if(COMMAND == "STOP"){//全部停止
		_ConsoleOutput(origin,"Stopped.");
		VM = null;
	}
}
//检查版本
async function VersionCheck(){
	var_RequestData = await $.ajax({
		type : 'GET',
		url : 'https://cr.zenithium.org/cert/version.php',
		async : true,
		success : function(callback) {
			CurrentVersion= callback;
		}
	});
	return CurrentVersion;
}
//获取贴吧黑名单
async function getGlobalBlackList(){
	var _RequestData = await $.ajax({
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
//注入MDUI的CSS
function MDUIDomLoad(){
	mdui_CSS = $('<link>', {
		rel : "stylesheet",
		href : "https://cdnjs.loli.net/ajax/libs/mdui/0.4.3/css/mdui.min.css"
	});
	mdui_JS = $('<script>', {
		src : "https://cdnjs.loli.net/ajax/libs/mdui/0.4.3/js/mdui.min.js"
	});
	mdui_CSS.appendTo('body');
	mdui_JS.appendTo('body');
}
//繁体转化 by https://www.aies.cn
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
//未知网络IO异常捕捉
$(document).ajaxError(function (event, xhr, options) {
		mdui.snackbar({
			message: '未知网络IO错误 请反馈给Zenithium',
			position: 'right-top'
		});
		_ConsoleOutput("GLOBAL","Network Exception catched.");
		mdui.mutation();
});
//BSK获取（贴吧通过统计用户行为生成的校验码），感谢GSCSDSUN的帮助！
function getBSK(tbs_input) { 
	var a_=[[32,[45],[[34,[45]]],[[30,[[31,[51],[40,[]]]]],[45,[30,[[31,[49],[33,-1,0]]]],[[51,[38,[43,1,1,0,[34,[51]],[34,[47,52,[50,39]]]],[[35,[33,-1,6],[35,[35,[38,[43,1,1,0,[34,[45]],[34,[34,39,[32,49,2,[46,[35,[36,0,[51]]]]]]]],[[34,[49]]]],[33,-1,5],9],[33,-1,3],0],9]]]]],[44,[34,[49]],0],[35,[43,1,1,0,[34,[45]],[34,[43,36,[45,38,51,[39]]]]],[34,[49]],3]],[52,[34,[51]]]],0],[32,[51],[[34,[45]]],[[52,[35,[33,-1,5],[35,[33,-1,3],[35,[34,[45]],[33,-1,6],9],1],9]]],0],[32,[49],[[34,[45]]],[[30,[[31,[51],[40,[]]]]],[45,[30,[[31,[49],[33,-1,0]]]],[[51,[38,[43,1,1,0,[34,[51]],[34,[47,52,[50,39]]]],[[38,[43,1,1,0,[34,[45]],[34,[34,39,[32,49,2,[46,[35,[36,0,[51]]]]]]]],[[34,[49]]]]]]]],[44,[34,[49]],0],[35,[43,1,1,0,[34,[45]],[34,[43,36,[45,38,51,[39]]]]],[34,[49]],3]],[52,[34,[51]]]],0],[32,[46],[[34,[45]]],[[52,[38,[43,1,1,0,[34,[18,51,[49,40,45,[38]]]],[34,[37,49,[46,44,2,[39,[32,[49,2,[46,35,36]]]]]]]],[[38,[34,[51]],[[34,[45]]]]]]]],0],[32,[36],[[34,[45]]],[[52,[38,[43,0,1,0,[38,[34,[32]],[[38,[34,[34]],[[34,[45]]]],[34,[46]]]],[34,[41,46,[40,45]]]],[[33,[]]]]]],0],[32,[40],[[34,[45]]],[[52,[38,[43,0,1,0,[43,1,1,0,[34,[18,51,[49,40,45,[38]]]],[34,[37,49,[46,44,2,[39,[32,[49,2,[46,35,36]]]]]]]],[34,[32,47,[47,43,56]]]],[[33,-1,null],[34,[45]]]]]],0],[32,[32],[[34,[45]],[34,[51]]],[[30,[[31,[49],[40,[]]]]],[45,[30,[[31,[46],[33,-1,0]]]],[[51,[38,[43,1,1,0,[34,[49]],[34,[47,52,[50,39]]]],[[38,[34,[51]],[[43,1,1,1,[34,[45]],[34,[46]]],[34,[46]]]]]]]],[44,[34,[46]],0],[35,[43,1,1,0,[34,[45]],[34,[43,36,[45,38,51,[39]]]]],[34,[46]],3]],[52,[34,[49]]]],0],[32,[52],[[34,[45]]],[[52,[53,0,[53,1,[43,1,1,0,[34,[45]],[34,[47,52,[50,39]]]],[35,[43,1,1,0,[34,[45]],[34,[43,36,[45,38,51,[39]]]]],[33,-1,0],11]],[43,1,1,0,[34,[45]],[34,[43,36,[45,38,51,[39]]]]]]]],0],[32,[34],[[34,[45]]],[[52,[55,[38,[34,[52]],[[34,[45]]]],[38,[43,0,1,0,[43,0,1,0,[40,[]],[34,[34,46,[45,34,32,[51]]]]],[34,[32,47,[47,43,56]]]],[[40,[]],[38,[34,[32]],[[34,[45]],[34,[34]]]]]],[34,[45]]]]],0],[32,[43],[[34,[45]],[34,[49]]],[[45,[30,[[31,[46],[33,-1,0]]]],[[51,[39,0,[38,[34,[51]],[[43,1,1,1,[34,[45]],[34,[46]]]]],[43,1,1,1,[34,[45]],[34,[46]]]]],[51,[39,0,[35,[43,1,0,1,[34,[49]],[35,[43,1,1,0,[34,[49]],[34,[43,36,[45,38,51,[39]]]]],[34,[46]],8]],[43,1,1,1,[34,[45]],[34,[46]]],9],[43,1,1,1,[34,[45]],[34,[46]]]]]],[44,[34,[46]],0],[35,[43,1,1,0,[34,[45]],[34,[43,36,[45,38,51,[39]]]]],[34,[46]],3]],[52,[34,[45]]]],0],[32,[35],[[34,[45]],[34,[51]]],[[45,[30,[[31,[49],[33,-1,0]]]],[[51,[38,[43,1,1,0,[34,[45]],[34,[47,52,[50,39]]]],[[43,1,1,1,[34,[51]],[34,[49]]]]]]],[44,[34,[49]],0],[35,[43,1,1,0,[34,[51]],[34,[43,36,[45,38,51,[39]]]]],[34,[49]],3]],[52,[34,[45]]]],0],[32,[37],[[34,[45]],[34,[51]]],[[30,[[31,[49],[40,[]]]]],[30,[[31,[46],[43,0,1,0,[43,0,1,0,[43,1,1,0,[34,[54,40,[45,35,46,[54]]]],[34,[14,33,[41,36,34,[51]]]]],[34,[47,49,[46,51,46,[51,[56,[47,36]]]]]]],[34,[39,32,[50,14,54,[45,[15,[49,46,[47,36,49,[51,[56]]]]]]]]]]]]],[30,[[31,[36],null]]],[30,[[31,[40],[33,-1,0]]]],[57,[34,[36]],[34,[45]],[[46,[38,[43,1,1,0,[34,[46]],[34,[34,32,[43,43]]]],[[34,[45]],[34,[36]]]],[51,[38,[43,1,1,0,[34,[49]],[34,[47,52,[50,39]]]],[[34,[36]]]]]],[51,[44,[34,[40]],0]],[46,[35,[34,[51]],[34,[40]],4],[47]]]],[52,[34,[49]]]],0],[32,[54],[[34,[45]]],[[30,[[31,[51],[38,[43,1,1,0,[34,[12,32,[51,39]]],[34,[37,43,[46,46,49]]]],[[35,[43,1,1,0,[34,[45]],[34,[43,36,[45,38,51,[39]]]]],[38,[43,1,1,0,[34,[12,32,[51,39]]],[34,[49,32,[45,35,46,[44]]]]],[]],10]]]]]],[52,[43,0,0,1,[38,[43,1,1,0,[34,[45]],[34,[50,47,[43,40,34,[36]]]]],[[34,[51]],[33,-1,1]]],[33,-1,0]]]],0],[32,[50],[],[[30,[[31,[45],[38,[43,0,1,0,[43,1,1,0,[34,[54,40,[45,35,46,[54]]]],[34,[35,46,[34,52,44,[36,[45,[51]]]]]]],[34,[34,49,[36,32,51,[36,[4,[43,36,[44,36,45,[51]]]]]]]]],[[38,[34,[36]],[[33,[111,97,[104,112,97,[127]]]]]]]]]]],[52,[54,0,[53,0,[54,0,[43,1,1,0,[34,[45]],[34,[38,36,[51,2,46,[45,[51,[36,55,[51]]]]]]]]],[54,0,[38,[43,1,1,0,[34,[45]],[34,[38,36,[51,2,46,[45,[51,[36,55,[51]]]]]]]],[[38,[34,[36]],[[33,[60,98]]]]]]]]]]],0],[32,[39],[],[[30,[[31,[45],[38,[43,0,1,0,[43,1,1,0,[34,[54,40,[45,35,46,[54]]]],[34,[35,46,[34,52,44,[36,[45,[51]]]]]]],[34,[34,49,[36,32,51,[36,[4,[43,36,[44,36,45,[51]]]]]]]]],[[38,[34,[36]],[[33,[111,97,[104,112,97,[127]]]]]]]]]]],[51,[39,0,[33,-1,20],[43,1,1,0,[34,[45]],[34,[54,40,[35,51,39]]]]]],[51,[39,0,[33,-1,20],[43,1,1,0,[34,[45]],[34,[39,36,[40,38,39,[51]]]]]]],[51,[39,0,[38,[34,[36]],[[33,[105,104,[106,105,104,[101]]]]]],[43,0,1,0,[43,1,1,0,[34,[45]],[34,[50,51,[56,43,36]]]],[34,[35,40,[50,47,43,[32,[56]]]]]]]],[30,[[31,[51],[38,[43,1,1,0,[34,[45]],[34,[38,36,[51,2,46,[45,[51,[36,55,[51]]]]]]]],[[38,[34,[36]],[[33,[60,98]]]]]]]]],[51,[38,[43,1,1,0,[34,[51]],[34,[49,36,[34,51]]]],[[33,-1,0],[33,-1,0],[33,-1,10],[33,-1,10]]]],[51,[38,[43,1,1,0,[34,[51]],[34,[49,36,[34,51]]]],[[33,-1,2],[33,-1,2],[33,-1,6],[33,-1,6]]]],[51,[39,0,[38,[34,[36]],[[33,[97,106,[126,118,97,[108,[101,[114,105,[111]]]]]]]]],[43,1,1,0,[34,[51]],[34,[51,36,[55,51,1,[32,[50,[36,43,[40,45,36]]]]]]]]]],[51,[39,0,[38,[34,[36]],[[33,[47,96,[48,62]]]]],[43,1,1,0,[34,[51]],[34,[37,40,[43,43,18,[51,[56,[43,36]]]]]]]]],[51,[38,[43,1,1,0,[34,[51]],[34,[37,40,[43,43,17,[36,[34,[51]]]]]]],[[33,-1,1],[33,-1,1],[33,-1,13],[33,-1,13]]]],[51,[39,0,[38,[34,[36]],[[33,[124,99,[108,97,54,[49,[62,[60,42,[46,60,62,[50,[42,[46,62,[42,46,62,[40,[60,[41]]]]]]]]]]]]]]]],[43,1,1,0,[34,[51]],[34,[37,40,[43,43,18,[51,[56,[43,36]]]]]]]]],[51,[39,0,[38,[34,[36]],[[33,[49,70,[126,114,46,[65,[124,[105,97,[106]]]]]]]]],[43,1,1,0,[34,[51]],[34,[37,46,[45,51]]]]]],[51,[38,[43,1,1,0,[34,[51]],[34,[37,40,[43,43,19,[36,[55,[51]]]]]]],[[38,[34,[36]],[[33,[79,115,[109,46,96,[116,[107,[98,98,[98,98,124,[98,[108,[97,104,[119,46,99,[106,[121,[126,118,[127]]]]]]]]]]]]]]]]],[33,-1,1],[33,-1,25]]]],[51,[39,0,[38,[34,[36]],[[33,[109,117,[106,114,105,[126,[106,[121]]]]]]]],[43,1,1,0,[34,[51]],[34,[38,43,[46,33,32,[43,[2,[46,44,[47,46,50,[40,[51,[36,14,[47,36,49,[32,[51,[40,46,[45]]]]]]]]]]]]]]]]]],[51,[39,0,[38,[34,[36]],[[33,[124,99,[108,54,60,[53,[53,[42,62,[42,60,53,[53,[41]]]]]]]]]]],[43,1,1,0,[34,[51]],[34,[37,40,[43,43,18,[51,[56,[43,36]]]]]]]]],[51,[38,[43,1,1,0,[34,[51]],[34,[33,36,[38,40,45,[15,[32,[51,39]]]]]]],[]]],[51,[38,[43,1,1,0,[34,[51]],[34,[32,49,[34]]]],[[33,-1,10],[33,-1,10],[33,-1,10],[33,-1,0],[35,[43,1,1,0,[34,[12,32,[51,39]]],[34,[15,8]]],[33,-1,2],10],[54,0,[33,-1,0]]]]],[51,[38,[43,1,1,0,[34,[51]],[34,[34,43,[46,50,36,[15,[32,[51,39]]]]]]],[]]],[51,[38,[43,1,1,0,[34,[51]],[34,[37,40,[43,43]]]],[]]],[51,[39,0,[38,[34,[36]],[[33,[124,99,[108,54,62,[42,[60,[53,53,[42,60,53,[53,[41]]]]]]]]]]],[43,1,1,0,[34,[51]],[34,[37,40,[43,43,18,[51,[56,[43,36]]]]]]]]],[51,[38,[43,1,1,0,[34,[51]],[34,[33,36,[38,40,45,[15,[32,[51,39]]]]]]],[]]],[51,[38,[43,1,1,0,[34,[51]],[34,[32,49,[34]]]],[[33,-1,10],[33,-1,5],[33,-1,5],[33,-1,0],[35,[43,1,1,0,[34,[12,32,[51,39]]],[34,[15,8]]],[33,-1,2],10],[54,0,[33,-1,0]]]]],[51,[38,[43,1,1,0,[34,[51]],[34,[34,43,[46,50,36,[15,[32,[51,39]]]]]]],[]]],[51,[38,[43,1,1,0,[34,[51]],[34,[37,40,[43,43]]]],[]]],[51,[39,0,[38,[34,[36]],[[33,[124,99,[108,54,60,[53,[53,[42,60,[53,53,42,[62,[41]]]]]]]]]]],[43,1,1,0,[34,[51]],[34,[37,40,[43,43,18,[51,[56,[43,36]]]]]]]]],[51,[38,[43,1,1,0,[34,[51]],[34,[33,36,[38,40,45,[15,[32,[51,39]]]]]]],[]]],[51,[38,[43,1,1,0,[34,[51]],[34,[32,49,[34]]]],[[33,-1,8],[33,-1,10],[33,-1,5],[33,-1,0],[35,[43,1,1,0,[34,[12,32,[51,39]]],[34,[15,8]]],[33,-1,2],10],[54,0,[33,-1,0]]]]],[51,[38,[43,1,1,0,[34,[51]],[34,[34,43,[46,50,36,[15,[32,[51,39]]]]]]],[]]],[51,[38,[43,1,1,0,[34,[51]],[34,[37,40,[43,43]]]],[]]],[51,[39,0,[38,[34,[36]],[[33,[124,99,[108,54,60,[53,[53,[42,62,[42,60,53,[53,[41]]]]]]]]]]],[43,1,1,0,[34,[51]],[34,[37,40,[43,43,18,[51,[56,[43,36]]]]]]]]],[51,[38,[43,1,1,0,[34,[51]],[34,[32,49,[34]]]],[[33,-1,7],[33,-1,7],[33,-1,7],[33,-1,0],[35,[43,1,1,0,[34,[12,32,[51,39]]],[34,[15,8]]],[33,-1,2],10],[54,0,[33,-1,0]]]]],[51,[38,[43,1,1,0,[34,[51]],[34,[32,49,[34]]]],[[33,-1,6],[33,-1,6],[33,-1,2],[33,-1,0],[35,[43,1,1,0,[34,[12,32,[51,39]]],[34,[15,8]]],[33,-1,2],10],[54,0,[33,-1,0]]]]],[51,[38,[43,1,1,0,[34,[51]],[34,[37,40,[43,43]]]],[[38,[34,[36]],[[33,[101,112,[101,104,107,[98,[98]]]]]]]]]],[52,[35,[38,[43,1,1,0,[34,[45]],[34,[51,46,[3,32,51,[32,[20,[17,11]]]]]]],[]],[55,[35,[38,[43,1,1,0,[34,[51]],[34,[40,50,[15,46,40,[45,[51,[8,45,[15,32,51,[39]]]]]]]]],[[33,-1,5],[33,-1,5],[38,[34,[36]],[[33,[101,112,[101,104,107,[98,[98]]]]]]]]],[54,0,[33,-1,1]],11],[38,[34,[36]],[[33,[121,101,[127]]]]],[38,[34,[36]],[[33,[104,107]]]]],0]]],0],[32,[38],[],[[30,[[31,[51],[54,0,[33,-1,1]]]]],[50,[[51,[39,0,[54,0,[53,1,[54,0,[43,1,1,0,[34,[38,43,[46,33,32,[43]]]],[34,[47,49,[46,34,36,[50,[50]]]]]]],[54,0,[43,1,1,0,[34,[38,43,[46,33,32,[43]]]],[34,[1,52,[37,37,36,[49]]]]]]]],[34,[51]]]]],[34,[45]],[[51,[39,0,[54,0,[33,-1,1]],[34,[51]]]]]],[30,[[31,[46],[43,1,1,0,[34,[53]],[34,[43,36,[45,38,51,[39]]]]]]]],[30,[[31,[32],[40,[]]]]],[45,[30,[[31,[52],[33,-1,0]]]],[[30,[[31,[35],[38,[34,[54]],[[34,[53]]]]]]],[50,[[46,[34,[51]],[56,[[51,[38,[43,1,1,0,[34,[32]],[34,[47,52,[50,39]]]],[[33,[44]],[43,1,0,1,[34,[35]],[33,-1,0]],[33,[44,68,[44,44]]],[38,[34,[49]],[[34,[12,0,[15]]]]],[33,[44]]]]],[46,[35,[35,[33,-1,1],[34,[46]],1],[34,[52]],12],[51,[38,[43,1,1,0,[34,[32]],[34,[47,52,[50,39]]]],[[33,[42]]]]]],[48]]]],[30,[[31,[37],[38,[43,1,0,1,[34,[35]],[33,-1,1]],[]]]]],[46,[53,1,[53,1,[34,[37]],[43,1,1,0,[34,[37]],[34,[43,36,[45,38,51,[39]]]]]],[54,0,[43,1,1,0,[34,[37]],[34,[34,39,[32,49,2,[46,[35,[36,0,[51]]]]]]]]]],[51,[39,0,[38,[34,[36]],[[34,[37]]]],[34,[37]]]]],[46,[53,1,[34,[37]],[43,1,1,0,[34,[37]],[34,[34,39,[32,49,2,[46,[35,[36,0,[51]]]]]]]]],[56,[[51,[39,0,[38,[43,1,1,0,[34,[37]],[34,[49,36,[47,43,32,[34,[36]]]]]],[[33,-2,[85],[38]],[33,[90,44]]]],[34,[37]]]],[51,[38,[43,1,1,0,[34,[32]],[34,[47,52,[50,39]]]],[[33,[44]],[43,1,0,1,[34,[35]],[33,-1,0]],[33,[44,68,[44]]]]]],[45,[30,[[31,[50],[33,-1,0]]]],[[51,[38,[43,1,1,0,[34,[32]],[34,[47,52,[50,39]]]],[[35,[33,-1,6],[35,[35,[38,[43,1,1,0,[34,[37]],[34,[34,39,[32,49,2,[46,[35,[36,0,[51]]]]]]]],[[34,[50]]]],[33,-1,5],9],[33,-1,3],0],9]]]]],[44,[34,[50]],0],[35,[43,1,1,0,[34,[37]],[34,[43,36,[45,38,51,[39]]]]],[34,[50]],3]],[51,[38,[43,1,1,0,[34,[32]],[34,[47,52,[50,39]]]],[[33,[44]]]]]]],[51,[38,[43,1,1,0,[34,[32]],[34,[47,52,[50,39]]]],[[33,[44]],[43,1,0,1,[34,[35]],[33,-1,0]],[33,[44,68,[46]]],[38,[34,[45]],[[38,[43,1,1,0,[34,[37]],[34,[51,46,[18,51,49,[40,[45,[38]]]]]]],[]]]]]]]]],[34,[45]],[[51,[38,[43,1,1,0,[34,[32]],[34,[47,52,[50,39]]]],[[33,[44]],[43,1,0,1,[34,[35]],[33,-1,0]],[33,[44,68,[46,60,62,[49,[51,[62,53,[49,49]]]]]]]]]]]],[46,[35,[35,[33,-1,1],[34,[46]],1],[34,[52]],12],[51,[38,[43,1,1,0,[34,[32]],[34,[47,52,[50,39]]]],[[33,[42]]]]]]],[44,[34,[52]],0],[35,[34,[46]],[34,[52]],3]],[30,[[31,[39],[38,[34,[34]],[[38,[43,0,1,0,[38,[43,0,1,0,[33,[135]],[34,[34,46,[45,34,32,[51]]]]],[[34,[32]]]],[34,[34,46,[45,34,32,[51]]]]],[[33,[125]]]]]]]]],[46,[54,0,[34,[51]]],[56,[[30,[[31,[38],[38,[34,[43]],[[34,[39]],[38,[34,[49]],[[53,0,[43,1,1,0,[34,[8,13]],[34,[51,33,[50]]]],[34,[8,13]]]]]]]]]],[30,[[31,[47],[38,[34,[33,51,[46,32]]],[[38,[34,[40]],[[34,[38]]]]]]]]],[51,[39,0,[34,[47]],[43,1,1,0,[34,[14,20,[19]]],[34,[35,32,[51,32]]]]]]]],[51,[39,0,[38,[34,[33,51,[46,32]]],[[38,[34,[40]],[[34,[39]]]]]],[43,1,1,0,[34,[14,20,[19]]],[34,[35,32,[51,32]]]]]]]],0],[51,[38,[34,[80,0]],[[33,-1,798]]]],[809,[820,[824,[846,798]],[[827,-1,2]]]],[53,[40,[36,[82,2]],[[31,-1,4]]]],[47,[42,[30,[84,4]],[[37,-1,33]]]],[82,[71,[67,[113,33]],[[64,-1,35]]]],[84,[73,[69,[115,35]],[[62,-1,44]]]],[87,[66,[70,[124,44]],[[77,-1,8]]]],[38,[[39,[61],[32,[[32,[[41,[126,49]],[44,[],[[60,[30,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[44,37,[42,38,43,[44,[28,[25,0,[10,38,36,[39,[38,[37,44,[37,59]]]]]]]]]]]],[[30,[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[1,26,[6,5]]]],[42,[58,59,[57,32,37,[46,[32,[45,48]]]]]]],[[42,[0,5]]]]]]]],8]]],[32,[[41,[117,49]],[44,[],[[60,[61,0,[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[37,40,[61,32,46,[40,[59,[38,57]]]]]]],[42,[60,58,[44,57,8,[46,[44,[37,59]]]]]]],[30,[42,[44]],[[41,[72,85,[74,74]]]]]]]],8]]],[32,[[41,[106,49]],[44,[],[[60,[61,0,[61,0,[61,0,[61,0,[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[37,40,[61,32,46,[40,[59,[38,57]]]]]]],[42,[35,40,[37,46,60,[40,[46,[44]]]]]]],[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[37,40,[61,32,46,[40,[59,[38,57]]]]]]],[42,[60,58,[44,57,3,[40,[37,[46,60,[40,46,44]]]]]]]]],[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[37,40,[61,32,46,[40,[59,[38,57]]]]]]],[42,[41,57,[38,62,58,[44,[57,[3,40,[37,46,60,[40,[46,[44]]]]]]]]]]]],[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[37,40,[61,32,46,[40,[59,[38,57]]]]]]],[42,[58,48,[58,59,44,[36,[3,[40,37,[46,60,40,[46,[44]]]]]]]]]]],[41,[72,85,[74,74]]]]]],8]]],[32,[[41,[127,49]],[44,[],[[60,[61,0,[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[58,42,[57,44,44,[37]]]]],[42,[47,44,[32,46,47,[59]]]]],[30,[42,[44]],[[41,[72,85,[74,74]]]]]]]],8]]],[32,[[41,[127,60]],[44,[],[[60,[61,0,[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[58,42,[57,44,44,[37]]]]],[42,[62,32,[43,59,47]]]],[30,[42,[44]],[[41,[72,85,[74,74]]]]]]]],8]]],[32,[[41,[115,49]],[44,[],[[60,[61,0,[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[43,38,[42,60,36,[44,[37,[59]]]]]]],[42,[47,44,[32,46,47,[59]]]]],[30,[42,[44]],[[41,[72,85,[74,74]]]]]]]],8]]],[32,[[41,[115,60]],[44,[],[[60,[61,0,[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[43,38,[42,60,36,[44,[37,[59]]]]]]],[42,[62,32,[43,59,47]]]],[30,[42,[44]],[[41,[72,85,[74,74]]]]]]]],8]]],[32,[[41,[97,49]],[44,[],[[60,[61,0,[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[58,42,[57,44,44,[37]]]]],[42,[40,61,[40,32,35,[30,[32,[43,59,[47]]]]]]]],[30,[42,[44]],[[41,[72,85,[74,74]]]]]]]],8]]],[32,[[41,[97,60]],[44,[],[[60,[61,0,[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[58,42,[57,44,44,[37]]]]],[42,[40,61,[40,32,35,[15,[44,[32,46,[47,59]]]]]]]],[30,[42,[44]],[[41,[72,85,[74,74]]]]]]]],8]]],[32,[[41,[127,63]],[44,[],[[60,[46,0,[46,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[58,44,[58,58,32,[38,[37,[26,59,[38,57,40,[46,[44]]]]]]]]]]]]]],8]]],[32,[[41,[106,60]],[44,[],[[60,[46,0,[46,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[35,38,[42,40,35,[26,[59,[38,57,[40,46,44]]]]]]]]]]]],8]]],[32,[[41,[105,49]],[44,[],[[60,[46,0,[46,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[32,37,[43,44,63,[44,[43,[11,9]]]]]]]]]]],8]]],[32,[[41,[97,63]],[44,[],[[60,[46,0,[46,0,[35,0,1,0,[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[43,38,[42,60,36,[44,[37,[59]]]]]]],[42,[41,38,[43,48]]]],[42,[40,43,[43,9,44,[47,[40,[61,32,[38,57]]]]]]]]]]]],8]]],[32,[[41,[126,60]],[44,[],[[60,[61,0,[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[37,40,[61,32,46,[40,[59,[38,57]]]]]]],[42,[39,35,[40,59,45,[38,[57,[36]]]]]]],[30,[42,[44]],[[41,[72,85,[74,74]]]]]]]],8]]],[32,[[41,[98,49]],[44,[],[[60,[61,0,[61,0,[61,0,[61,0,[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[37,40,[61,32,46,[40,[59,[38,57]]]]]]],[42,[43,38,[5,38,59,[27,[57,[40,42,[34]]]]]]]],[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[37,40,[61,32,46,[40,[59,[38,57]]]]]]],[42,[36,58,[11,38,5,[38,[59,[27,57,[40,42,34]]]]]]]]],[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[37,40,[61,32,46,[40,[59,[38,57]]]]]]],[42,[36,58,[11,38,5,[38,[59,[27,57,[40,42,34]]]]]]]]],[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[43,38,[5,38,59,[27,[57,[40,42,[34]]]]]]]]],[30,[42,[44]],[[41,[72,85,[74,74]]]]]]]],8]]],[32,[[41,[111,49]],[44,[],[[60,[30,[42,[58]],[]]]],8]]],[32,[[41,[97,50]],[44,[],[[60,[46,0,[46,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[40,62,[44,58,38,[36,[32,[60,36]]]]]]]]]]],8]]],[32,[[41,[126,63]],[44,[],[[60,[61,0,[61,0,[46,0,[46,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[88,39,[47,40,37,[59,[38,[36]]]]]]]]],[46,0,[46,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[39,47,[40,37,59,[38,[36]]]]]]]]],[46,0,[46,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[42,40,[35,35,7,[47,[40,[37,59,[38,36]]]]]]]]]]]]],8]]],[32,[[41,[104,49]],[44,[],[[60,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[88,88,[37,32,46,[47,[59,[36,40,[57,44]]]]]]]]]],8]]],[32,[[41,[115,63]],[44,[],[[60,[46,0,[46,0,[61,0,[61,0,[61,0,[61,0,[61,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[88,26,[44,35,44,[37,[32,[60,36,[88,0,11,[12,[88,[25,44,[42,38,57,[43,[44,[57]]]]]]]]]]]]]]],[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[43,38,[42,60,36,[44,[37,[59]]]]]]],[42,[88,88,[62,44,41,[43,[57,[32,61,[44,57,88,[58,[42,[57,32,[39,59,88,[45,[37]]]]]]]]]]]]]]],[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[37,40,[61,32,46,[40,[59,[38,57]]]]]]],[42,[62,44,[41,43,57,[32,[61,[44,57]]]]]]]],[30,[35,0,1,0,[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[43,38,[42,60,36,[44,[37,[59]]]]]]],[42,[43,38,[42,60,36,[44,[37,[59,12,[35,44,36,[44,[37,[59]]]]]]]]]]],[42,[46,44,[59,8,59,[59,[57,[32,41,[60,59,44]]]]]]]],[[30,[42,[44]],[[41,[115,101,[108,98,124,[105,[112,[101,124]]]]]]]]]]],[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[43,38,[42,60,36,[44,[37,[59]]]]]]],[42,[73,42,[43,42,88,[40,[58,[43,33,[45,35,40,[58,[60,[59,38,[39,45,47,[61,[42,[17,3,[36,42,45,[35,[88]]]]]]]]]]]]]]]]]]],[35,0,1,0,[35,1,1,0,[42,[62,32,[37,43,38,[62]]]],[42,[43,38,[42,60,36,[44,[37,[59]]]]]]],[42,[73,62,[43,42,88]]]]]]]]],8]]],[32,[[41,[101,49]],[44,[],[[60,[61,0,[61,0,[35,0,1,0,[35,1,1,0,[42,[46,35,[38,41,40,[35]]]],[42,[39,57,[38,42,44,[58,[58]]]]]],[42,[59,48,[39,44]]]],[35,0,1,0,[35,0,1,0,[35,1,1,0,[42,[46,35,[38,41,40,[35]]]],[42,[39,57,[38,42,44,[58,[58]]]]]],[42,[61,44,[57,58,32,[38,[37,[58]]]]]]],[42,[44,35,[44,42,59,[57,[38,[37]]]]]]]],[30,[42,[44]],[[41,[72,85,[74,74]]]]]]]],8]]],[32,[[41,[104,60]],[44,[],[[60,[46,0,[46,0,[42,[46,35,[38,41,40,[35]]]]]]]],8]]],[32,[[41,[104,63]],[44,[],[[60,[30,[35,0,1,0,[30,[42,[45]],[[35,0,1,0,[35,1,1,0,[42,[46,35,[38,41,40,[35]]]],[42,[39,57,[38,42,44,[58,[58]]]]]],[42,[61,44,[57,58,32,[38,[37,[58]]]]]]],[41,-1,20]]],[42,[33,38,[32,37]]]],[]]]],8]]],[32,[[41,[124,49]],[44,[],[[60,[30,[35,0,1,0,[30,[35,0,1,0,[30,[35,0,1,0,[35,0,1,0,[35,1,1,0,[42,[13,60,[37,42,59,[32,[38,[37]]]]]],[42,[39,57,[38,59,38,[59,[48,[39,44]]]]]]],[42,[59,38,[26,59,57,[32,[37,[46]]]]]]],[42,[40,39,[39,35,48]]]],[[35,1,1,0,[42,[4,40,[59,47]]],[42,[57,40,[37,43,38,[36]]]]]]],[42,[58,35,[32,42,44]]]],[[41,-1,0],[41,-1,100]]],[42,[57,44,[39,35,40,[42,[44]]]]]],[[41,-2,[66,37],[46]],[41,[]]]]]],8]]],[32,[[41,[114,49]],[44,[],[[60,[30,[35,0,1,0,[30,[35,0,1,0,[30,[35,0,1,0,[35,0,1,0,[35,1,1,0,[42,[13,60,[37,42,59,[32,[38,[37]]]]]],[42,[39,57,[38,59,38,[59,[48,[39,44]]]]]]],[42,[59,38,[26,59,57,[32,[37,[46]]]]]]],[42,[40,39,[39,35,48]]]],[[35,1,1,0,[42,[13,60,[37,42,59,[32,[38,[37]]]]]],[42,[59,38,[26,59,57,[32,[37,[46]]]]]]]]],[42,[58,35,[32,42,44]]]],[[41,-1,0],[41,-1,100]]],[42,[57,44,[39,35,40,[42,[44]]]]]],[[41,-2,[66,37],[46]],[41,[]]]]]],8]]],[32,[[41,[115,50]],[44,[],[[60,[30,[35,0,1,0,[30,[42,[45]],[[42,[62,32,[37,43,38,[62]]]],[41,-1,20]]],[42,[33,38,[32,37]]]],[]]]],8]]],[32,[[41,[114,60]],[44,[],[[60,[30,[35,1,1,0,[42,[4,40,[59,47]]],[42,[45,35,[38,38,57]]]],[[43,[41,-1,1e3],[30,[35,1,1,0,[42,[11,40,[59,44]]],[42,[37,38,[62]]]],[]],2]]]]],8]]],[32,[[41,[109,49]],[44,[],[[60,[30,[42,[44]],[[41,[108,97,[127,105,106,[105,[127,[119,91,[97,74,112,[62,[116,[99]]]]]]]]]]]]]],8]]],[32,[[41,[109,60]],[44,[],[[60,[61,0,[30,[35,0,1,0,[35,0,1,0,[35,1,1,0,[42,[88,9,[26,2]]],[42,[60,58,[44,57,9,[44,[47,[40,61,[32,38,57]]]]]]]],[42,[36,38,[60,58,44,[4,[38,[61,44,[8,57,57]]]]]]]],[42,[33,38,[32,37]]]],[]],[30,[42,[44]],[[41,[72,85,[74,74]]]]]]]],8]]],[32,[[41,[109,63]],[44,[],[[60,[35,0,1,0,[35,1,1,0,[42,[88,9,[26,2]]],[42,[60,58,[44,57,9,[44,[47,[40,61,[32,38,57]]]]]]]],[42,[32,58,[4,38,60,[58,[44,[10,35,[32,42,34,[44,[43]]]]]]]]]]]],8]]],[32,[[41,[109,50]],[44,[],[[60,[61,0,[30,[35,0,1,0,[35,0,1,0,[35,1,1,0,[42,[88,9,[26,2]]],[42,[60,58,[44,57,9,[44,[47,[40,61,[32,38,57]]]]]]]],[42,[58,42,[57,38,35,[35,[8,[57,57]]]]]]],[42,[33,38,[32,37]]]],[]],[30,[42,[44]],[[41,[72,85,[74,74]]]]]]]],8]]],[32,[[41,[109,53]],[44,[],[[60,[35,0,1,0,[35,1,1,0,[42,[88,9,[26,2]]],[42,[60,58,[44,57,9,[44,[47,[40,61,[32,38,57]]]]]]]],[42,[58,44,[37,43,9,[48,[10,[35,32,[42,34]]]]]]]]]],8]]],[32,[[41,[119,49]],[44,[],[[60,[35,0,1,0,[35,1,1,0,[42,[88,9,[26,2]]],[42,[60,58,[44,57,9,[44,[47,[40,61,[32,38,57]]]]]]]],[42,[58,44,[37,43,9,[48,[2,[44,48,[9,38,40,[57,[43]]]]]]]]]]]],8]]],[32,[[41,[119,60]],[44,[],[[60,[61,0,[30,[35,0,1,0,[35,0,1,0,[35,1,1,0,[42,[88,9,[26,2]]],[42,[60,58,[44,57,9,[44,[47,[40,61,[32,38,57]]]]]]]],[42,[34,44,[48,28,39,[8,[57,[57]]]]]]],[42,[33,38,[32,37]]]],[]],[30,[42,[44]],[[41,[72,85,[74,74]]]]]]]],8]]]]]]]],[59,[30,[42,[88,8]],[[41,-1,11]]]],[60,[33,[45,[45]],[]]]];
    (function(global) {
        function f(b, a) {
            for (var c = 0; c < a.length; c++) b.push(a[c]);
            return b;
        }

        function g(b, a) {
            for (var c = 0; c < b.length; c++) a(b[c], c);
        }

        function l(b, a, c) {
            void 0 === c && (c = null);
            for (var d = [], e = 0; e < b.length; e++) d.push(a.apply(c, [b[e], e]));
            return d;
        }

        function m(b) {
            return "[object Array]" === Object.prototype.toString.call(b);
        }
        var n = function() {
            function b() {}
            b.B = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/<$+-%>{:* \\,}[^=_~&](")';
            return b;
        }();
        var r = function() {
            function b(a) {
                this.m = [];
                this.w = 0;
                this.D = [];
                var c = this;
                this.g = a;
                this.g.i._A = function(a) {
                    c.w = a;
                };
                this.m.push(this.g);
            }
            b.prototype.va = function() {
                return function c(d, e) {
                    return e ? c(d ^ e, (d & e) << 1) : d;
                }(8, 2);
            };
            b.prototype.K = function(a, c) {
                void 0 === c && (c = -1);
                this.m.push(a);
                this.g = this.m[this.m.length - 1]; - 1 !== c && (this.w = c);
                this.D.push(this.w);
            };
            b.prototype.oa = function(a) {
                var c = this;
                g(a[1],
                    function(a) {
                        return c.b(a);
                    });
            };
            b.prototype.pa = function(a) {
                a[2] ? this.b(a[2]) : this.f(void 0);
                this.g.i[l(function d(a) {
                    return m(a) ? [].concat.apply([], l(a, d)) : a;
                }(a[1]), this.o, this).join("")] = this.h();
            };
            b.prototype.W = function(a) {
                this.b(a[1]);
                this.h() ? this.b(a[2]) : this.b(a[3]);
            };
            b.prototype.aa = function(a) {
                var c = this;
                this.g.i[l(function e(a) {
                    return m(a) ? [].concat.apply([], l(a, e)) : a;
                }(a[1]), this.o, this).join("")] = new p(this, this.g, l(a[2],
                    function(a) {
                        return c.C(a[1]);
                    }), a[3], a[4]);
            };
            b.prototype.ea = function(a) {
                -2 === a[1] ? this.f(new RegExp(this.C(a[2]), this.C(a[3]))) : -1 === a[1] ? this.f(a[2]) : this.f(a[1]);
            };
            b.prototype.ca = function(a, c) {
                var d = this.g.G(l(function k(a) {
                    return m(a) ? [].concat.apply([], l(a, k)) : a;
                }(a[1]), this.o, this).join(""));
                if (void 0 !== d) c ? this.f(d) : this.f(d.j[d.s]);
                else throw Error();
            };
            b.prototype.T = function(a) {
                var c = this;
                this.b(a[1]);
                this.b(a[2]);
                var d = this.h(),
                    e = this.h();
                [
                    function() {
                        c.f(d + e);
                    },
                    function() {
                        c.f(d - e);
                    },
                    function() {
                        c.f(d / e);
                    },
                    function() {
                        c.f(d < e);
                    },
                    function() {
                        c.f(d > e);
                    },
                    function() {
                        c.f(d <= e);
                    },
                    function() {
                        c.f(d >= e);
                    },
                    function() {
                        c.f(d == e);
                    },
                    function() {
                        c.f(d % e);
                    },
                    function() {
                        c.f(d ^ e);
                    },
                    function() {
                        c.f(d * e);
                    },
                    function() {
                        c.f(d === e);
                    },
                    function() {
                        c.f(d !== e);
                    },
                    function() {
                        c.f(d << e);
                    },
                    function() {
                        c.f(d | e);
                    },
                    function() {
                        c.f(d >> e);
                    },
                    function() {
                        c.f(d & e);
                    }
                ][a[3]]();
            };
            b.prototype.f = function(a) {
                this.g.xa(a);
            };
            b.prototype.P = function(a) {
                var c = this;
                try {
                    g(a,
                            function(a) {
                                return c.b(a);
                            }),
                        this.status = 0;
                } catch (d) {
                    this.status = 1;
                } finally {
                    this.g = null,
                        this.m = [];
                }
            };
            b.prototype.ba = function(a) {
                var c = this;
                this.f(new p(this, this.g, l(a[1],
                    function(a) {
                        return c.C(a[1]);
                    }), a[2], a[3]));
            };
            b.prototype.J = function(a) {
                var c = this;
                g(a[2],
                    function(a) {
                        return c.b(a);
                    });
                this.b(a[1], !0);
                var d = this.h(),
                    e = d.j,
                    d = d.j[d.s],
                    b = [];
                for (a = a[2].length; a--;) b.unshift(this.h());
                if (d.apply) e = d.apply(e, b),
                    this.f(e);
                else throw Error();
            };
            b.prototype.C = function(a) {
                return l(function d(a) {
                    return m(a) ? [].concat.apply([], l(a, d)) : a;
                }(a), this.o, this).join("");
            };
            b.prototype.S = function(a) {
                this.b(a[2]);
                this.b(a[3], !0);
                this.b(a[3]);
                var c = this.h(),
                    d = this.h(),
                    b = this.h();
                [
                    function() {},
                    function() {
                        b = c + b;
                    },
                    function() {
                        b = c - b;
                    }
                ][a[1]]();
                d.j ? d.j[d.s] = b : this.g.i[d] = b;
            };
            b.prototype.o = function(a) {
                a ^= this.w;
                return n.B[0 <= a && 26 >= a || 64 < a ? a : 32 <= a && 58 >= a ? 26 + a - 32 : -17 <= a && -8 >= a ? 52 + a + 17 : 0];
            };
            b.prototype.M = function() {
                this.m.pop();
                this.D.pop();
                this.g = this.m[this.m.length - 1];
                this.w = this.D[this.D.length - 1];
            };
            b.prototype.h = function() {
                return this.g.O();
            };
            b.prototype.fa = function(a) {
                this.b(a[2]);
                var c = this.h(),
                    d = this;
                [
                    function() {
                        c ? d.f(c) : d.b(a[3]);
                    },
                    function() {
                        d.b(a[3]);
                        d.f(c && d.h());
                    }
                ][a[1]]();
            };
            b.prototype.qa = function() {
                return [this.oa, this.pa, this.aa, this.ea, this.ca, this.T, this.ba];
            };
            b.prototype.R = function(a) {
                var c = this;
                g(a[1],
                    function(a) {
                        return c.b(a);
                    });
                var d = [];
                for (a = a[1].length; a--;) d.unshift(this.h());
                this.f(d);
            };
            b.prototype.ha = function(a) {
                var c = this,
                    d = {};
                g(a[1],
                    function(a) {
                        c.b(a[1]);
                        d[l(function h(a) {
                            return m(a) ? [].concat.apply([], l(a, h)) : a;
                        }(a[0]), c.o, c).join("")] = c.h();
                    });
                this.f(d);
            };
            b.prototype.ja = function() {
                this.f(this.g.i["this"] || this.g.i);
            };
            b.prototype.ga = function(a, c) {
                var d;
                if (1 === a[1])
                    if (d = this.g.G(l(function h(a) {
                        return m(a) ? [].concat.apply([], l(a, h)) : a;
                    }(a[4][1]), this.o, this).join(""))) d = d.j[d.s];
                    else throw Error();
                else this.b(a[4], !1),
                    d = this.h();
                if (void 0 !== d) {
                    0 === a[3] && 1 === a[2] ? this.f(l(function h(a) {
                        return m(a) ? [].concat.apply([], l(a, h)) : a;
                    }(a[5][1]), this.o, this).join("")) : this.b(a[5]);
                    var b = this.h();
                    c ? this.f(this.g.ta(d, b)) : this.f(d[b]);
                } else throw Error();
            };
            b.prototype.na = function(a) {
                this.b(a[1], !0);
                var c = this.h(),
                    d = c.j[c.s];
                [
                    function() {
                        d++;
                    },
                    function() {
                        d--;
                    }
                ][a[2]]();
                c.j[c.s] = d;
            };
            b.prototype.sa = function() {
                return [this.$, this.da, this.V, this.X, this.ka, this.la, this.Y];
            };
            b.prototype.b = function(a, c) {
                void 0 === c && (c = !1);
                if (!this.g.L && !this.g.u && !this.g.v) {
                    var d = f(this.qa(), f(this.ra(), f(this.sa(), [this.ia, this.fa, this.ma, this.W, this.U, this.Z]))),
                        b = a[0] - 3 * this.va() ^ this.w;
                    if (d[b]) d[b].apply(this, [a, c]);
                    else throw Error();
                }
            };
            b.prototype.Z = function(a) {
                var c = this;
                this.b(a[1], !0);
                var d = this.h();
                this.b(a[2]);
                for (var b in this.h()) {
                    d.j[d.s] = b;
                    g(a[3],
                        function(a) {
                            return c.b(a);
                        });
                    if (this.g.u) {
                        this.g.u = !1;
                        break;
                    }
                    this.g.v && (this.g.v = !1);
                }
            };
            b.prototype.$ = function(a) {
                var c = this;
                this.b(a[1]);
                do {
                    g(a[2],
                        function(a) {
                            return c.b(a);
                        });
                    if (this.g.u) {
                        this.g.u = !1;
                        break;
                    }
                    this.g.v && (this.g.v = !1);
                    this.b(a[3]);
                    this.b(a[4]);
                    if (!this.h()) break;
                } while (1);
            };
            b.prototype.U = function(a) {
                var c = this;
                g(a[1],
                    function(a) {
                        return c.b(a);
                    });
            };
            b.prototype.da = function(a) {
                this.b(a[1]);
                this.h() ? a[2] && this.b(a[2]) : a[3] && this.b(a[3]);
            };
            b.prototype.V = function() {
                this.g.u = !0;
            };
            b.prototype.X = function() {
                this.g.v = !0;
            };
            b.prototype.ma = function(a) {
                var c = this;
                this.b(a[2], !1);
                var d = this.h();
                [
                    function() {
                        c.f(!d);
                    },
                    function() {
                        c.f(-d);
                    }
                ][a[1]]();
            };
            b.prototype.ra = function() {
                return [this.J, this.J, this.S, this.R, this.ha, this.ja, this.ga, this.na];
            };
            b.prototype.ka = function(a) {
                this.b(a[1]);
                throw this.h();
            };
            b.prototype.la = function(a) {
                var c = this;
                try {
                    g(a[1],
                        function(a) {
                            return c.b(a);
                        });
                } catch (e) {
                    var d = new q;
                    d.A = this.g;
                    this.K(d);
                    a[2] && (this.g.i[l(function h(a) {
                        return m(a) ? [].concat.apply([], l(a, h)) : a;
                    }(a[2][1]), this.o, this).join("")] = e);
                    g(a[3],
                        function(a) {
                            return c.b(a);
                        });
                    this.M();
                } finally {
                    a[4] && g(a[4],
                        function(a) {
                            return c.b(a);
                        });
                }
            };
            b.prototype.Y = function(a) {
                this.b(a[1]);
            };
            b.prototype.ia = function(a) {
                a[1] && this.b(a[1]);
                this.g.L = !0;
            };
            return b;
        }();
        var q = function() {
            function b(a) {
                this.F = function() {
                    return function(a, d) {
                        this.j = a;
                        this.s = d;
                    };
                }();
                this.v = this.u = this.L = !1;
                this.H = [];
                this.i = a || {
                    btoa: function(a, d, b, k, h) {
                        void 0 === d && (d = n.B.slice(0, 64));
                        for (k = h = ""; a[k | 0] || (d = "=", k % 1); h += d[63 & b >> 8 - k % 1 * 8]) b = b << 8 | a.charCodeAt(k -= -.75);
                        return h;
                    }
                };
            }
            b.prototype.O = function() {
                return this.H.pop();
            };
            b.prototype.xa = function(a) {
                this.H.push(a);
            };
            b.prototype.ta = function(a, c) {
                return new this.F(a, c);
            };
            b.prototype.G = function(a) {
                if (this.i.hasOwnProperty(a)) return new this.F(this.i, a);
                if (this.A) return this.A.G(a);
                if (global[a]) return new this.F(global, a);
            };
            return b;
        }();
        var p = function() {
            function b(a, c, d, b, k) {
                this.I = a;
                this.ua = b;
                this.A = c;
                this.N = d;
                this.wa = k;
            }
            b.prototype.apply = function(a, c) {
                var b = this,
                    e = new q;
                e.A = this.A;
                this.N && g(this.N,
                    function(a, b) {
                        e.i[a] = c[b];
                    });
                e.i["this"] = a;
                this.I.K(e, this.wa);
                try {
                    g(this.ua,
                        function(a) {
                            return b.I.b(a, !1);
                        });
                } finally {
                    this.I.M();
                }
                if (0 !== e.H.length) return e.O();
            };
            return b;
        }();
        t = {};
        global._BSK = {
            a: function(b, a) {
                a.MAP = n.B;
                (new r(new q(a))).P(a_);
            },
            c: function(b, a) {
                b.MAP = n.B;
                (new r(new q(b))).P(a);
            },
            l: function(b, a) {
                t[b] = a;
            }
        };
    })(this);
    bsk = {};
    tbs_ = {
        IN: {
            tbs: tbs_input
        },
        OUT: bsk
    };
    _BSK.a("omzVouOACqkNljzDbdOB", tbs_);
    return bsk.data;
};