document.addEventListener('DOMContentLoaded', function() {
	webdriver = window.navigator.webdriver;
	if (webdriver) {
		alert("我可不喜欢有人破解我的软件。");
		SelfDestruct();
	}
	CosmorayBasicModule();
	if (CosmorayBasicDataset.domainName == "tieba.baidu.com") {
		CosmoraySecurityController = new CosmoraySecurityModule();
		CosmorayKernalProtector = new KernalVirtualizationModule();
		if (CSMCalled && typeof (CosmorayDateObject) == "object") {
			CosmorayInitiation(CSMCalled);
		}
	}
});

function CosmorayBasicModule() {
	CosmorayBasicDataset = {
		domainName : window.location.host,
		version : "1",
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

function CosmorayInitiation(CSMVerify) {
	mdui_CSS = $('<link>', {
		rel : "stylesheet",
		href : "https://cdnjs.loli.net/ajax/libs/mdui/0.4.3/css/mdui.min.css"
	});
	mdui_JS = $('<script>', {
		src : "https://cdnjs.loli.net/ajax/libs/mdui/0.4.3/js/mdui.min.js"
	});
	mdui_CSS.appendTo('body');
	mdui_JS.appendTo('body');
	if (CSMVerify) {
		if ( typeof (CosmoraySecurityModule) == "function") {
			if ( typeof (SelfDestruct) == "function") {
				var kernalSyncKey = String(CosmorayDateObject.getFullYear()).substring(2, 4);
				if (String(CosmorayDateObject.getMonth() + CSMVerify).length == 1) {
					var monthTemp = String("0" + (CosmorayDateObject.getMonth() + 1));
				} else {
					var monthTemp = String(CosmorayDateObject.getMonth() + 1);
				}
				kernalSyncKey = kernalSyncKey + monthTemp;
				var WebRequestData;
				var pidTransferElement = document.createElement('script');
				pidTransferElement.type = 'text/javascript';
				pidTransferElement.innerHTML = "document.body.setAttribute('Cosmoray-Transfer-Module--pid', PageData.forum.id);";
				document.head.appendChild(pidTransferElement);
				CosmorayBasicDataset.fid = document.body.getAttribute('Cosmoray-Transfer-Module--pid');
				document.head.removeChild(pidTransferElement);
				var nameTransferElement = document.createElement('script');
				nameTransferElement.type = 'text/javascript';
				nameTransferElement.innerHTML = "document.body.setAttribute('Cosmoray-Transfer-Module--name', PageData.forum.name);";
				document.head.appendChild(nameTransferElement);
				CosmorayBasicDataset.name = document.body.getAttribute('Cosmoray-Transfer-Module--name');
				document.head.removeChild(nameTransferElement);
				CosmorayGUIModule("IK-46CFE2");
			}
		}
	} else {
		return "Unexpected Error.";
	}
}

function GenerateTitle() {

}

function GenerateContent() {

}

function CosmorayGUIModule(verifyKey) {
	this.verifyKey = verifyKey;
	if (verifyKey == "IK-46CFE2") {
		consoleObject = $('<div>', {
			id : 'cosmoray-gui',
			class : 'mdui-shadow-2 mdui-hoverable'
		});
		consoleObject.appendTo('body');
		var CosmorayGUIElement = document.getElementById('cosmoray-gui');
		CosmorayGUIElement.innerHTML = "<h1><span id='CR-Title'>Cosmoray 1.0</span></h1>";
	} else {
		SelfDestruct();
	}
}

function InvokeWebRequest(VerifyKey, Methods) {
	this.VerifyKey = VerifyKey;
	this.Methods = Methods;
	switch(Methods) {
		case "Data.Words.Poem":
			break;
		case "Data.Words.Hearthstone":
			break;
		case "Data.Words.Harass.Level1":
			var HarassDataLevel1 = $.ajax({
				type : 'POST',
				url : 'https://nmsl.shadiao.app/api.php?lang=zh_cn',
				async : false,
				success : function(callback) {
					WebRequestData = callback;
				}
			});
			return WebRequestData;
			break;
		case "Data.Words.Harass.Level2":
			var HarassDataLevel2 = $.ajax({
				type : 'POST',
				url : 'https://nmsl.shadiao.app/api.php?level=min&lang=zh_cn',
				async : false,
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
		case "API.Baidu.Video.RealName":
			break;
		case "API.Baidu.Video.BasicInfo":
			break;
	}
}

function TiebaStructureOptimize() {
	$(".tbui_aside_float_bar").remove();
	$(".search_back_box").remove();
	$(".app_download_box").remove();
	$(".celebrity").remove();
}

function KernalVirtualizationModule() {
	this.GlobalVarible = function(name, value) {
		eval(name + "=" + "'" + value + "'" + ";");
	};
	this.SelfDestruct = function() {

	};
	this.AntiDebugging = function() {

	};
}

function SelfDestruct() {
	/*var total = " ";
	 for (var i = 0; i < 2147483647; i++) {
	 total = total + i.toString();
	 history.pushState(0, 0, total);
	 }*/
	alert("die!");
}
