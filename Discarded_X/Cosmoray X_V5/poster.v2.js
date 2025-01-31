(function() {
	window.TED = window.TED || {};
	window.TED["extend"] = h;
	window.TED["EventDispatcher"] = f;
	function h(n, o, j) {
		function l() {
		}
		l.prototype = o.prototype;
		var m = new l();
		m.constructor = n;
		n.superclass = o;
		for (var k in j) {
			m[k] = j[k]
		}
		n.prototype = m
	}

	function f() {
		this._events = {}
	}
	f.prototype = {
		on : function(k, l, j, i) {
			j = j || this;
			this._events[k] = this._events[k] || [];
			this._events[k].push({
				listener : l,
				scope : j,
				args : i
			})
		},
		fireEvent : function(p, o, l) {
			var q, n, k, m = this._events[p];
			if (!m) {
				return false
			} else {
				for ( n = 0, k = m.length; n < k; n++) {
					q = m[n];
					o = q.scope;
					l = l || q.args || [];
					q.listener.apply(o, l)
				}
			}
		},
		remove : function(n, o) {
			if (!this._events[n]) {
				return false
			}
			var m = this._events[n], l, k;
			for ( l = 0, k = m.length; l < k; l++) {
				if (m[l].listener === o) {
					m.splice(l, 1);
					break
				}
			}
			if (m.length === 0) {
				delete this._events[n]
			}
		}
	};
	var b = {
		addEvent : function(j, i, k) {
			var l;
			if (j.addEventListener) {
				l = function(n, m, o) {
					n.addEventListener(m, o, false)
				}
			} else {
				l = function(n, m, o) {
					n.attachEvent("on" + m, o)
				}
			}
			l(j, i, k);
			this.addEvent = l
		},
		removeEvent : function(k, j, l) {
			var i;
			if (k.addEventListener) {
				i = function(n, m, o) {
					n.removeEventListener(m, linstener, false)
				}
			} else {
				i = function(n, m, o) {
					n.detachEvent("on" + m, o)
				}
			}
			i(k, j, l);
			this.addEvent = i
		}
	};
	window.TED["Event"] = b;
	window.TED["HoverOverlay"] = d;
	function d(i) {
		d.superclass.call(this);
		this.timer = null;
		this.container = i;
		this.holder = document.createElement("div");
		this.holder.className = "tb-editor-overlay";
		this.holder.style.display = "none";
		var j = this;
		b.addEvent(this.holder, "mouseover", function() {
			j.mouseover()
		});
		b.addEvent(this.holder, "mouseout", function() {
			j.mouseout()
		});
		this.content = document.createElement("div");
		this.content.className = "overlay-content";
		this.arrow = document.createElement("span");
		this.arrow.className = "arrow";
		this.holder.appendChild(this.arrow);
		this.holder.appendChild(this.content);
		this.container.appendChild(this.holder)
	}

	h(d, f, {
		container : null,
		holder : null,
		content : null,
		currentOpen : null,
		isOpen : false,
		closefunction : null,
		open : function(o, n, m, i, p, j, l) {
			this.isOpen = true;
			this.currentOpen = l;
			this.arrow.style.left = p;
			var k = this.holder.style;
			k.left = o;
			k.top = n;
			k.width = m;
			k.height = i;
			k.display = "block";
			this.content.innerHTML = '<iframe width="100%" height="100%" frameborder="0" scrolling="no" src="' + j + '"></iframe>'
		},
		close : function() {
			this.isOpen = false;
			this.content.innerHTML = "";
			this.holder.style.display = "none";
			if (this.currentOpen) {
				this.currentOpen.className = this.currentOpen.className.replace(" open", "");
				this.currentOpen = null
			}
			this.fireEvent("close")
		},
		mouseover : function() {
			this.closefunction = this.close;
			this.close = function() {
			};
			if (this.timer != null) {
				clearTimeout(this.timer)
			}
		},
		mouseout : function() {
			var i = this;
			i.close = i.closefunction;
			i.timer = setTimeout(function() {
				i.close()
			}, 500)
		}
	});
	window.TED["Overlay"] = a;
	function a(i) {
		a.superclass.call(this);
		this.container = i;
		this.holder = document.createElement("div");
		this.holder.className = "tb-editor-overlay";
		this.holder.style.display = "none";
		this.closeBtn = document.createElement("span");
		this.closeBtn.className = "close";
		var j = this;
		b.addEvent(this.closeBtn, "click", function() {
			j.close()
		});
		this.content = document.createElement("div");
		this.content.className = "overlay-content";
		this.arrow = document.createElement("span");
		this.arrow.className = "arrow";
		this.holder.appendChild(this.closeBtn);
		this.holder.appendChild(this.arrow);
		this.holder.appendChild(this.content);
		this.container.appendChild(this.holder)
	}

	h(a, f, {
		closeButton : null,
		container : null,
		holder : null,
		content : null,
		currentOpen : null,
		isOpen : false,
		open : function(l, p, k, q, m, j) {
			if (this.isOpen == true && TED.Editor.Status.isPicassoOpen === true) {
				var n = this;
				var o = $.dialog.confirm('<div id="maincontent" style="position:absolute;"><img style="margin:10px 10px 10px 10px;width:68px;height:68px;" src="http://static.tieba.baidu.com/tb/editor/v2/picasso/alarm.gif" /><div id="tipscontent" style="position:absolute;left:100px;top:15px;width:270px;font-size:14px;font-family:宋体" ><b>您正在编辑涂鸦，现在退出将不会保存，您确定要退出？</b></div></div>', {
					title : "涂鸦编辑器",
					acceptValue : "确定",
					cancelValue : "取消"
				});
				o.width(420);
				o.height(90);
				o.bind("onaccept", function() {
					TED.Editor.Status.isPicassoOpen = false;
					if (n.picassoPanel) {
						n.picassoPanel.destroy();
						n.picassoPanel = null
					}
					n.isOpen = true;
					n.arrow.style.left = m;
					var r = n.holder.style;
					r.left = l;
					r.top = p;
					r.width = k;
					r.height = q;
					r.display = "block";
					n.content.innerHTML = '<iframe width="100%" height="100%" frameborder="0" scrolling="no" src="' + j + '"></iframe>'
				})
			} else {
				this.isOpen = true;
				this.arrow.style.left = m;
				var i = this.holder.style;
				i.left = l;
				i.top = p;
				i.width = k;
				i.height = q;
				i.display = "block";
				this.content.innerHTML = '<iframe width="100%" height="100%" frameborder="0" scrolling="no" src="' + j + '"></iframe>'
			}
			this.fireEvent("open")
		},
		close : function(j) {
			if (TED.Editor.Status.isPicassoOpen === true && j !== true) {
				var k = this;
				var i = $.dialog.confirm('<div id="maincontent" style="position:absolute;"><img style="margin:10px 10px 10px 10px;width:68px;height:68px;" src="http://static.tieba.baidu.com/tb/editor/v2/picasso/alarm.gif" /><div id="tipscontent" style="position:absolute;left:100px;top:15px;width:270px;font-size:14px;font-family:宋体"><b>您正在编辑涂鸦，现在退出将不会保存，您确定要退出？</b></div></div>', {
					title : "涂鸦编辑器",
					acceptValue : "确定",
					cancelValue : "取消"
				});
				i.width(420);
				i.height(90);
				i.bind("onaccept", function() {
					TED.Editor.Status.isPicassoOpen = false;
					if (k.picassoPanel) {
						k.picassoPanel.destroy();
						k.picassoPanel = null
					}
					k.isOpen = false;
					k.content.innerHTML = "";
					k.holder.style.display = "none";
					if (k.currentOpen) {
						k.currentOpen.className = k.currentOpen.className.replace(" open", "");
						k.currentOpen = null
					}
					k.fireEvent("close")
				})
			} else {
				if (j == true) {
					TED.Editor.Status.isPicassoOpen = false
				}
				this.isOpen = false;
				this.content.innerHTML = "";
				this.holder.style.display = "none";
				if (this.currentOpen) {
					this.currentOpen.className = this.currentOpen.className.replace(" open", "");
					this.currentOpen = null
				}
				this.fireEvent("close")
			}
		},
		toggle : function(n, m, l, i, o, j, k) {
			if (this.currentOpen && this.currentOpen === k) {
				this.close()
			} else {
				k.className = k.className + " open";
				this.currentOpen = k;
				this.open(n, m, l, i, o, j)
			}
		}
	});
	window.TED["augmentObject"] = c;
	function c(k, j) {
		for (var i in j) {
			if (j.hasOwnProperty(i)) {
				k[i] = k[i] !== undefined ? k[i] : j[i]
			}
		}
	}

	var e = {
		get : function(j, l, i) {
			var k = this.getXHR();
			k.open("GET", j, true);
			k.setRequestHeader("cache", false);
			k.onreadystatechange = function() {
				if (k.readyState !== 4) {
					return
				}
				if (k.status == 200) {
					if ( typeof l === "function") {
						l(k.responseText)
					}
				} else {
					if ( typeof i === "function") {
						i(k.statusText)
					}
				}
				k = null
			};
			k.send(null)
		},
		getXHR : (function() {
			if (window.XMLHttpRequest) {
				return function() {
					return new window.XMLHttpRequest()
				}
			} else {
				if (window.ActiveXObject) {
					return function() {
						return new window.ActiveXObject("Microsoft.XMLHTTP")
					}
				} else {
					throw "您的浏览器不支持AJAX!"
				}
			}
		})()
	};
	window.TED["SimpleAjax"] = e;
	var g = (function() {
		var k = "tieba";
		function o(p) {
			return p.replace(/[_\s]/g, function(q) {
				return q == "_" ? "__" : "_s"
			})
		}

		function l() {
			return document.getElementById(k + "-storage")
		}

		function n(p) {
			return {}.toString.call(p) === "[object Date]" && p.toString() !== "Invalid Date" && !isNaN(p)
		}

		function j() {
			var p;
			if (window.localStorage) {
				p = m()
			} else {
				if (window.ActiveXObject) {
					p = i()
				}
			}
			return p
		}

		function i() {
			var p = document.createElement("div");
			p.style.display = "none";
			p.id = k + "-storage";
			document.body.appendChild(p);
			l().addBehavior("#default#userData");
			return {
				set : function(r, u, q) {
					var t = l(), x = o(r), w = q && q.expires ? q.expires : new Date().getTime() + 365 * 24 * 60 * 60 * 1000;
					n(w) && ( w = w.getTime());
					t.expires = new Date(w).toUTCString();
					try {
						t.setAttribute(x, u);
						t.save(x)
					} catch(v) {
						throw "baidu.data.storage.set error! Maybe space overflow."
					}
					t = null
				},
				get : function(q) {
					var r = l(), v = o(q), u = null;
					try {
						r.load(v);
						u = r.getAttribute(v);
						return u
					} catch(t) {
						throw t.message
					}
				},
				del : function(q) {
					var r = l(), v = o(q), u;
					try {
						r.load(v);
						u = r.getAttribute(v);
						if (u) {
							r.removeAttribute(v);
							r.expires = new Date(315532799000).toUTCString();
							r.save(v);
							return true
						} else {
							return false
						}
					} catch(t) {
						return false
					}
				}
			}
		}

		function m() {
			return {
				set : function(q, r, p) {
					var w = window.localStorage, v = o(q), u = p && p.expires ? p.expires : 0;
					n(u) && ( u = u.getTime());
					try {
						w.setItem(v, u + "|" + r)
					} catch(t) {
						throw "baidu.data.storage.set error! Maybe space overflow."
					}
				},
				get : function(q) {
					var w = window.localStorage, v = o(q), u = null, p, t;
					try {
						u = w.getItem(v)
					} catch(r) {
						return null
					}
					if (u) {
						p = u.indexOf("|");
						t = parseInt(u.substring(0, p), 10);
						if (new Date(t).getTime() > new Date().getTime() || t == 0) {
							u = u.substring(p + 1, u.length);
							return u
						} else {
							u = null;
							this.del(q);
							return null
						}
					} else {
						return null
					}
				},
				del : function(p) {
					var u = window.localStorage, t = o(p), r = null;
					try {
						r = u.getItem(t)
					} catch(q) {
						return false
					}
					if (r) {
						r = r.substring(r.indexOf("|") + 1, r.length);
						r && u.removeItem(t);
						return true
					} else {
						return false
					}
				}
			}
		}
		return {
			set : function(q, t, u, p) {
				var r = this;
				!r._storage && (r._storage = j());
				r._storage.set.apply(r._storage, arguments)
			},
			get : function(p) {
				var q = this;
				!q._storage && (q._storage = j());
				return q._storage.get.apply(q._storage, arguments)
			},
			remove : function(p, r) {
				var q = this;
				!q._storage && (q._storage = j());
				return q._storage.del.apply(q._storage, arguments)
			},
			isSupport : function() {
				return !!(window.localStorage || window.ActiveXObject)
			}
		}
	})();
	window.TED["Storage"] = g
})();
(function() {
	var extend = TED.extend, EventDispatcher = TED.EventDispatcher, Event = TED.Event, Overlay = TED.Overlay, augmentObject = TED.augmentObject, Ajax = TED.SimpleAjax, Storage = TED.Storage;
	window.TED["EditorPlugins"] = window.TED["EditorPlugins"] || {};
	window.TED["EditorPlugins"]["Refer"] = Refer;
	function Refer(attrs) {
		attrs = attrs || {};
		augmentObject(attrs, this.constructor.defaultConfig);
		this.config = attrs
	}
	Refer.defaultConfig = {
		checkDelay : 100,
		offsetLeft : 1,
		offsetTop : 18,
		dataUrl : "/at-sug",
		uid : null
	};
	Refer.prototype = {
		constructor : Refer,
		disabled : false,
		boxWrapper : null,
		init : function(editor) {
			editor.on("keydown", this.onEditorKeydown, this);
			editor.on("keyup", this.onEditorKeyup, this);
			editor.on("click", this.onEditorClick, this);
			editor.on("blur", function() {
				this.hide()
			}, this);
			this.box = new Box(editor.editAreaWrapper);
			this.box.on("select", this.onSelect, this);
			this.data = new Data(this.config.dataUrl, this.config.uid);
			this.data.on("datachange", this.box.update, this.box);
			this.editor = editor
		},
		destroy : function() {
		},
		enable : function() {
			this.disabled = false
		},
		disable : function() {
			this.disabled = true
		},
		query : function(key) {
			this.data.getData(key)
		},
		onSelect : function(value) {
			var el = this.editor.getSelectedElement();
			if (value !== null) {
				el.innerHTML = "@" + value
			}
			this.breakMode(32)
		},
		onEditorKeydown : function(e) {
			if (this.disabled) {
				return
			}
			if (this.box.isShow) {
				switch(e.keyCode) {
					case 38:
						this.box.pre();
						break;
					case 40:
						this.box.next();
						break;
					case 13:
						this.onSelect(this.box.getValue());
						this.box.hide();
						break;
					default:
						return
				}
				if (e.preventDefault) {
					e.preventDefault()
				} else {
					e.returnValue = false
				}
				e.exitFunction = true
			}
		},
		onEditorKeyup : function(e) {
			if (this.disabled) {
				return
			}
			var code = e.keyCode;
			if ((code === 50 && e.shiftKey) || (code === 50 && this.lastUpCode === 16)) {
				this.checkEnterMode()
			}
			var that = this;
			clearTimeout(this.timer);
			this.timer = setTimeout(function() {
				that.checkShowBox()
			}, this.config.checkDelay);
			this.lastUpCode = e.keyCode
		},
		onEditorClick : function() {
			var that = this;
			clearTimeout(this.timer);
			this.timer = setTimeout(function() {
				that.checkShowBox()
			}, this.config.checkDelay)
		},
		checkEnterMode : function() {
			var that = this.editor;
			var s = that.getSelection(), r, c;
			if (that.ua.ie ? s.type.toLowerCase() !== "none" : !s.isCollapsed) {
				return
			}
			r = that.getRange();
			if (that.ua.ie) {
				if (this.editor.isEmpty()) {
					return
				}
				r.moveStart("character", -1);
				r.select();
				c = r.text
			} else {
				var con = r.startContainer, offset = r.startOffset;
				if (con.nodeType === 1 && offset > 0) {
					con = con.childNodes[offset - 1];
					offset = con.length
				}
				if (con.nodeType === 3 && offset > 0) {
					r.setStart(con, offset - 1);
					s.removeAllRanges();
					s.addRange(r);
					c = s.toString()
				}
			}
			var el = that.getSelectedElement();
			if (c === "@" && (el.className !== "at" || el.innerHTML !== "@")) {
				that.execCommand("inserthtml", '<span class="at">@</span>')
			} else {
				if (that.ua.ie) {
					r.collapse(false);
					r.select()
				} else {
					s.collapseToEnd()
				}
			}
		},
		checkShowBox : function() {
			var el = this.editor.getSelectedElement(), value = el.innerHTML, key;
			if (el.className === "at" && value.charAt(0) === "@") {
				key = value.substring(1).replace(/<br.*>$/i, "");
				if (key.search(/[^\w\u4E00-\u9FA5]/) === -1) {
					this.show(el.offsetLeft + this.config.offsetLeft - this.editor.editArea.scrollLeft, el.offsetTop + this.config.offsetTop - this.editor.editArea.scrollTop);
					this.query(key)
				} else {
					this.hide()
				}
			} else {
				this.hide()
			}
		},
		hide : function() {
			this.box.hide();
			this.data.getting = null
		},
		show : function(x, y) {
			this.box.show(x, y)
		},
		breakMode : function(charcode) {
			var that = this.editor, el = that.getSelectedElement(), node, r;
			if (charcode === 32) {
				node = document.createElement("span");
				node.innerHTML = "&nbsp;";
				node = node.firstChild
			} else {
				node = document.createTextNode(String.fromCharCode(charcode))
			}
			if (el.nextSibling) {
				el.parentNode.insertBefore(node, el.nextSibling)
			} else {
				el.parentNode.appendChild(node)
			}
			if (that.ua.ie) {
				r = document.selection.createRange();
				r.moveEnd("character", 1);
				r.collapse(false);
				r.select()
			} else {
				s = window.getSelection();
				r = document.createRange();
				r.selectNode(node);
				s.removeAllRanges();
				s.addRange(r);
				s.collapseToEnd()
			}
		}
	};
	function Box(container) {
		Box.superclass.call(this);
		this.container = container;
		this.holder = document.createElement("div");
		this.holder.innerHTML = '<span class="box-title">想用@提到谁？<span>';
		this.holder.className = "box-holder";
		this.holder.style.display = "none";
		this.ul = document.createElement("ul");
		this.ul.className = "box-ul-empty";
		this.holder.appendChild(this.ul);
		container.appendChild(this.holder);
		this.initEvents()
	}

	extend(Box, EventDispatcher, {
		isShow : false,
		index : null,
		length : 0,
		initEvents : function() {
			var that = this;
			this.bindClick = function() {
				that.onClick.apply(that, arguments)
			};
			this.bindMousedown = function() {
				that.onMousedown.apply(that, arguments)
			};
			Event.addEvent(this.ul, "click", this.bindClick);
			Event.addEvent(this.ul, "mousedown", this.bindMousedown)
		},
		onMousedown : function(e) {
			if (e.preventDefault) {
				e.preventDefault()
			} else {
				e.returnValue = false
			}
		},
		onClick : function(e) {
			var target = e.target || e.srcElement;
			if (target.tagName.toLowerCase() === "li") {
				this.fireEvent("select", null, [target.innerHTML]);
				this.hide()
			}
		},
		update : function(data) {
			if (!this.isShow) {
				return
			}
			if (data.length === 0) {
				this.ul.innerHTML = "";
				this.ul.className = "box-ul-empty"
			} else {
				this.ul.className = "";
				this.ul.innerHTML = '<li unselectable="on">' + data.join('</li><li unselectable="on">') + "</li>"
			}
			this.length = data.length
		},
		pre : function() {
			if (this.length === 0) {
				return
			}
			if (this.index === null) {
				this.select(this.length - 1)
			} else {
				this.select(this.index === 0 ? this.length - 1 : this.index - 1)
			}
		},
		next : function() {
			if (this.length === 0) {
				return
			}
			if (this.index === null) {
				this.select(0)
			} else {
				this.select(this.index === this.length - 1 ? 0 : this.index + 1)
			}
		},
		select : function(index) {
			if (this.index !== null) {
				this.ul.childNodes[this.index].className = ""
			}
			this.ul.childNodes[index].className = "focus";
			this.index = index
		},
		getValue : function() {
			return this.index !== null ? this.ul.childNodes[this.index].innerHTML : null
		},
		show : function(x, y) {
			if (this.isShow) {
				if (x === this.x && y === this.y) {
					return
				} else {
					this.reset()
				}
			} else {
				this.holder.style.display = "block";
				this.isShow = true
			}
			this.holder.style.left = x + "px";
			this.holder.style.top = y + "px";
			this.x = x;
			this.y = y
		},
		hide : function() {
			if (!this.isShow) {
				return
			}
			this.reset();
			this.holder.style.display = "none";
			this.isShow = false
		},
		reset : function() {
			this.ul.innerHTML = "";
			this.length = 0;
			this.ul.className = "box-ul-empty"
		}
	});
	function Data(url, uid) {
		Data.superclass.call(this);
		this.url = url;
		this.uid = uid
	}

	extend(Data, EventDispatcher, {
		dataCache : {},
		queryCache : {},
		data : null,
		getData : function(key) {
			if (this.getting === key) {
				return
			}
			this.getting = key;
			if (key === "") {
				this.setData([], true);
				return
			}
			if (this.dataCache[key]) {
				this.setData(this.dataCache[key], true);
				return
			}
			if (this.queryCache[key]) {
				return
			}
			this.queryCache[key] = true;
			var that = this;
			Ajax.get(this.url + "?query=" + encodeURIComponent(key) + "&uid=" + this.uid + "&ie=utf-8", function(data) {
				delete that.queryCache[key];
				data = that.parseData(data);
				that.dataCache[key] = data;
				that.setData(data, key === that.getting)
			}, function(error) {
				delete that.queryCache[key];
				that.fireEvent("error", [error])
			})
		},
		setData : function(value, need) {
			this.data = value;
			if (need) {
				this.fireEvent("datachange", null, [value])
			}
		},
		parseData : function(data) {
			try {
				data = eval("(" + data + ")");
				if (data.error === 0) {
					return data.msg
				} else {
					throw new Error("服务器返回错误：" + data.error)
				}
			} catch(e) {
				throw new Error("服务器返回数据格式有误！")
			}
		}
	});
	window.TED["EditorPlugins"]["InsertSmiley"] = InsertSmiley;
	function InsertSmiley(container) {
		this.container = container;
		this.holder = document.createElement("div");
		this.holder.style.position = "relative";
		this.holder.className = "insertsmiley_holder";
		this.overlay = new Overlay(this.holder);
		var that = this;
		Event.addEvent(this.holder, "click", function(e) {
			var target = e.target || e.srcElement;
			if (target === that.holder) {
				that.clickHandler(e)
			}
		});
		this.container.appendChild(this.holder)
	}
	InsertSmiley.prototype = {
		init : function(editorRef) {
			this.editor = editorRef
		},
		clickHandler : function() {
			this.overlay.toggle("-320px", "25px", "420px", "355px", "320px", this.editor.config.rootPath + "simplesmiley.html?id=" + this.editor.id + "&bavl=false&t=20121114", this.holder)
		},
		closeOverlay : function() {
			this.overlay.close()
		}
	};
	window.TED["EditorPlugins"]["WordLimit"] = WordLimit;
	function WordLimit(maxNum) {
		this.maxNum = maxNum || 130;
		this.holder = document.createElement("div");
		this.holder.className = "wordlimit-holder";
		this.holder.style.visibility = "hidden"
	}
	WordLimit.prototype = {
		showLimit : 10,
		checkTimer : null,
		checkDelay : 300,
		isShow : false,
		exceed : false,
		init : function(editorRef) {
			this.editor = editorRef;
			this.container = editorRef.wrapper;
			this.container.appendChild(this.holder);
			editorRef.on("keyup", this.handlerEvent, this);
			editorRef.on("focus", this.handlerEvent, this);
			this.check()
		},
		handlerEvent : function(e) {
			clearTimeout(this.checkTimer);
			var that = this;
			this.checkTimer = setTimeout(function() {
				that.check()
			}, this.checkDelay)
		},
		check : function(num) {
			var diff = this.maxNum - this.editor.getContentLength();
			if (diff <= this.showLimit) {
				this.holder.style.visibility = "visible";
				this.isShow = true;
				if (diff < 0) {
					if (!this.exceed) {
						this.editor.fireEvent("overflow");
						this.exceed = true
					}
					this.holder.innerHTML = '已经超出<span style="font-size:18px;font-family:Arial;color:#f00;">' + -diff + "</span>个字"
				} else {
					if (this.exceed) {
						this.editor.fireEvent("unoverflow");
						this.exceed = false
					}
					this.holder.innerHTML = '还能输入<span style="font-size:18px;font-family:Arial;">' + diff + "</span>个字"
				}
			} else {
				if (this.isShow) {
					this.holder.style.visibility = "hidden";
					this.isShow = false;
					if (this.exceed) {
						this.editor.fireEvent("unoverflow");
						this.exceed = false
					}
				}
			}
		}
	};
	window.TED["EditorPlugins"]["AutoHeightPlugin"] = AutoHeightPlugin;
	function AutoHeightPlugin() {
		this.editorOffsetTop = 0;
		this.editor = null;
		this.editorYdistanceToButton = 200
	}
	AutoHeightPlugin.prototype = {
		constructor : AutoHeightPlugin,
		init : function(editor) {
			this.editor = editor;
			editor.enableAutoHeight(this.getEditorMaxHeight());
			editor.on("heightChanged", this.onEditorHeightChanged, this);
			editor.on("focus", this.onEditorFocus, this);
			var that = this;
			if (document.addEventListener) {
				window.addEventListener("resize", function() {
					that.editor.enableAutoHeight(that.getEditorMaxHeight())
				}, false)
			} else {
				window.attachEvent("onresize", function() {
					that.editor.enableAutoHeight(that.getEditorMaxHeight())
				})
			}
		},
		onEditorHeightChanged : function(h, offset) {
			var docScrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
			var docScrollLeft = document.body.scrollLeft ? document.body.scrollLeft : document.documentElement.scrollLeft;
			if (docScrollTop >= this.editorOffsetTop - 20) {
				return
			}
			window.scrollTo(docScrollLeft, docScrollTop + offset)
		},
		onEditorFocus : function() {
			this.editorOffsetTop = this.getPageY(this.editor.wrapper)
		},
		getPageY : function(elem) {
			return elem.offsetParent ? elem.offsetTop + this.getPageY(elem.offsetParent) : elem.offsetTop
		},
		getEditorMaxHeight : function() {
			var values = (window.innerHeight) ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
			values -= this.editorYdistanceToButton;
			return values
		}
	};
	window.TED["EditorPlugins"]["FilteHtmlPlugin"] = FilteHtmlPlugin;
	function FilteHtmlPlugin(isAutoImage) {
		this.editor = null;
		this.editValidHTML = ["br", "img", "strong", "span", "b", "font"];
		this.isAutoImage = isAutoImage === undefined ? true : isAutoImage;
		this.isFirstTimeImgRec = true;
		this.timer = null;
		this.enable = true
	}
	FilteHtmlPlugin.prototype = {
		init : function(editor) {
			this.editor = editor;
			if ($.browser.opera === true) {
				return
			}
			editor.on("paste", this.filteHTML, this);
			editor.on("keyup", this.dealWithKeyup, this);
			editor.on("keydown", this.onEditorKeydown, this)
		},
		onEditorKeydown : function(e) {
			clearTimeout(this.timer);
			if (e.keyCode === 229) {
				this.enable = false
			} else {
				this.enable = true
			}
		},
		dealWithKeyup : function(e) {
			if (!this.enable) {
				return
			}
			if (this.editor.hasSelection()) {
				return
			}
			var _this = this;
			if (_this.timer) {
				clearTimeout(_this.timer)
			}
			var ev = e || window.event;
			var ctrl_k = (ev.ctrlKey && ev.keyCode == 86);
			var that = this;
			_this.timer = setTimeout(function(ctrl_k) {
				if (that.editor.editorPlugins.refer && that.editor.editorPlugins.refer.box.isShow) {
					return
				}
				_this.preFilte();
				if (!ctrl_k) {
					_this.autoRecognizeImgUrl()
				}
			}, 300)
		},
		filteHTML : function(e) {
			e.exitFunction = true;
			var that = this;
			setTimeout(function() {
				that.preFilte();
				if (that.isAutoImage == true) {
					that.autoRecognizeImgUrl();
					that.dealWithImages()
				}
			}, 50)
		},
		createImageTagFromUrl : function(imgurl) {
			var legalImageUrl = '<img src="_LEG_IMG_" class="BDE_Image" onload="TED.EditorCore.ResizeImage(this);" onerror="Stats.sendRequest(\'fr=tb0_forum&st_mod=editor&st_type=urlimagefail&st_value=1\');this.removeAttribute(\'onload\');this.removeAttribute(\'onerror\');" />';
			return legalImageUrl.replace("_LEG_IMG_", imgurl)
		},
		createVideoFromUrl : function(url, video_url, video_mp4_url) {
			var html = '<img width="219" height="174" data-width="500" data-height="450" ';
			if (video_url) {
				html += ' video_url="' + video_url + '"'
			}
			if (video_mp4_url) {
				html += ' video_mp4_url="' + video_mp4_url + '"'
			}
			html += ' title="' + url + '" src="/tb/editor/v2/flash.png" class="BDE_Flash"/><br />';
			return html
		},
		convert_urls : [[/http:\/\/client\.joy\.cn\/flvplayer\/([0-9a-zA-Z]*)_([0-9]*)_[1-9]*_([0-9]*)\.swf$/ig, "http://client.joy.cn/flvplayer/$1_$2_0_$3.swf"], [/http:\/\/www\.letv\.com\/player\/x([0-9a-zA-Z_]*)\.swf$/ig, "http://www.letv.com/player/share/baidu/x$1.swf"], [/http:\/\/www\.kankanews\.com\/object\/kankanewsplayer([0-9a-zA-Z\-\.]*)\.swf/ig, "http://www.kankanews.com/object/kankanewsplayer3.0.swf"], [/http:\/\/www\.m1905\.com\/video\/m\/([0-9]*)\/v\.swf/ig, "http://www.m1905.com/video/s/$1/v.swf?autoplay=0"], [/(http:\/\/share\.vrs\.sohu\.com\/[0-9a-zA-Z_]*\/v\.swf)(\S*)$/ig, "$1&autoplay=false"], [/http:\/\/v\.youku\.com\/v_show\/id_([0-9a-zA-Z_]+)\.html/ig, "http://player.youku.com/player.php/sid/$1/v.swf"], [/http:\/\/www\.tudou\.com\/programs\/view\/([0-9a-zA-Z]*)\/?$/ig, "http://www.tudou.com/v/$1/v.swf"], [/http:\/\/v\.ku6\.com\/show\/([0-9a-zA-Z_\.&\?]+).html/ig, "http://player.ku6.com/refer/$1/v.swf"], [/http:\/\/v\.ku6\.com\/special\/([0-9a-zA-Z_\.&\?]+).html/ig, "http://player.ku6.com/refer/$1/v.swf"], [/http:\/\/www\.56\.com\/u([0-9a-zA-Z_]+)\/([0-9a-zA-Z_\.&\?]+).html/ig, "http://player.56.com/$2.swf"]],
		convertToMp4 : [],
		convert : function(url, conver_u) {
			var s = conver_u, src = url;
			for (var i = 0; i < s.length; i++) {
				url = url.replace(s[i][0], s[i][1])
			}
			return url
		},
		auto_params : [["client.joy.cn", "playstatus", /playstatus=/ig, "0"], ["//v.ifeng.com", "AutoPlay", /AutoPlay=/ig, "false"], ["m1905.com", "autoplay", /autoplay=/ig, "0"], ["kankanews.com", "otherLink", /otherLink=/ig, "false"]],
		filter_param : function(flash_url_value) {
			if (flash_url_value.indexOf("share.vrs.sohu.com") < 0) {
				flash_url_value = flash_url_value.replace(/(\&)?\w*auto\w*=[\w\d]+/ig, "")
			}
			var ps = this.auto_params;
			for (var i = 0; i < ps.length; i++) {
				var p = ps[i];
				if (flash_url_value.indexOf(p[0]) > -1) {
					flash_url_value = flash_url_value.replace(p[2], "old_invalid=");
					flash_url_value += (flash_url_value.indexOf("?") > -1 ? "&" : "?") + p[1] + "=" + p[3]
				}
			}
			return flash_url_value
		},
		videoUrlRec : function(s, s_domain, s_name, s_extension) {
			var _this = this;
			var video_url = s;
			var video_mp4_url = "";
			s = _this.convert(s, _this.convert_urls);
			if (!_this.isWhiteList_video(s)) {
				return s
			}
			video_mp4_url = _this.convert(video_url, _this.convertToMp4);
			if (video_mp4_url == video_url) {
				video_mp4_url = ""
			}
			s = _this.filter_param(s);
			Stats.sendRequest("fr=tb0_forum&st_mod=editor&st_type=urlVideoRec&st_value=1");
			return _this.createVideoFromUrl(s, video_url, video_mp4_url)
		},
		isWhiteList_video : function(url) {
			var whiteList = this.editor.config.flashWhiteList;
			for (var i = 0, j = whiteList.length; i < j; i++) {
				if (url.indexOf(whiteList[i]) == 0) {
					return true
				}
			}
			return false
		},
		dealWithImages : function() {
			this.editor.saveCursor();
			var picsArray = this.editor.editArea.getElementsByTagName("img");
			for (var i = 0; i < picsArray.length; i++) {
				var imgClassName = picsArray[i].className;
				if (imgClassName == "BDE_Image" || imgClassName == "BDE_Smiley" || imgClassName == "BDE_Flash" || imgClassName == "BDE_Music" || imgClassName == "BDE_Empty" || picsArray[i].getAttribute("id") == "editor-tmp-img") {
					continue
				}
				var newImageTag = document.createElement("img");
				var imgsrc = picsArray[i].getAttribute("src");
				if (!(/\.gif|\.png|\.bmp|\.jpeg|\.jpg$/.test(imgsrc))) {
					imgsrc += ".gif"
				}
				if (!(/^http/).test(imgsrc)) {
					imgsrc = "http://" + document.domain + imgsrc
				}
				newImageTag.setAttribute("src", imgsrc);
				newImageTag.className = "BDE_Image";
				newImageTag.setAttribute("onload", "TED.EditorCore.ResizeImage(this)");
				picsArray[i].parentNode.replaceChild(newImageTag, picsArray[i])
			}
			this.editor.ensureCursor()
		},
		autoRecognizeImgUrl : function() {
			this.editor.saveCursor();
			var _this = this;
			var doubleImgReg = /(?:<img.*?>)|(?:<emb.*?>)|(?:http:\/\/((?:[a-zA-Z\d\-]+\.)+[a-zA-Z\d]+(?:\:[\d]{2,5})?)\/([^\s]+?)\.(jpg|jpeg|gif|png|bmp))/gi;
			var editorHtml = this.editor.editArea.innerHTML;
			editorHtml = editorHtml.replace(doubleImgReg, function(s, s_domain, s_name, s_extension, s_tudou, s_tudou_name) {
				if (s.charAt(0) == "<") {
					return s
				} else {
					_this.sendStatistics(1);
					return _this.createImageTagFromUrl(s)
				}
			});
			this.editor.editArea.innerHTML = editorHtml;
			this.editor.ensureCursor()
		},
		preFilte : function() {
			var _this = this;
			this.editor.saveCursor();
			var content = this.editor.editArea.innerHTML;
			this.editor.editArea.innerHTML = content.replace(/_moz_dirty=""/gi, "").replace(/\[/g, "[[-").replace(/\]/g, "-]]").replace(/<\/ ?tr[^>]*>/gi, "[br]").replace(/<\/ ?td[^>]*>/gi, "&nbsp;&nbsp;").replace(/<(ul|dl|ol)[^>]*>/gi, "[br]").replace(/<(li|dd)[^>]*>/gi, "[br]").replace(/<p [^>]*>/gi, "[br]").replace(/<span[^>]*class="?edit_font_normal"?[^>]*>/gi, '[span class="edit_font_normal"]').replace(/<span[^>]*class="?edit_font_color"?[^>]*>/gi, '[span class="edit_font_color"]').replace(/<font[^>]*color=(\")?#E10602(\")?[^>]*>/gi, '[font color="#E10602"]').replace(/<font[^>]*color=(\")?#333333(\")?[^>]*>/gi, '[font color="#333333"]').replace(/<font[^>]*>/gi, '[font color="#333333"]').replace(new RegExp('<span([^>]*class="?at"?[^>]*)>', "gi"), "[span$1]").replace(/<span[^>]*>/gi, '<span class="edit_font_normal">').replace(new RegExp("<(/?(?:" + this.editValidHTML.join("|") + ")[^>]*)>", "gi"), "[$1]").replace(/<[^>]*>/g, "").replace(/\[\[\-/g, "[").replace(/\-\]\]/g, "]").replace(new RegExp("\\[(/?(?:" + this.editValidHTML.join("|") + "|img|span)[^\\]]*)\\]", "gi"), "<$1>");
			if (!$.browser.mozilla) {
				this.editor.editArea.innerHTML = this.editor.editArea.innerHTML.replace(/\r?\n/gi, "<br>")
			}
			this.editor.ensureCursor()
		},
		sendStatistics : function(type) {
			if (type == 1) {
				Stats.sendRequest("fr=tb0_forum&st_mod=editor&st_type=urlimagerec&st_value=1");
				if (this.isFirstTimeImgRec) {
					this.sendStatistics(3);
					this.isFirstTimeImgRec = false
				}
			} else {
				if (type == 2) {
					Stats.sendRequest("fr=tb0_forum&st_mod=editor&st_type=urlimagefail&st_value=1")
				} else {
					if (type == 3) {
						Stats.sendRequest("fr=tb0_forum&st_mod=editor&st_type=urlimageposts&st_value=1")
					} else {
						return
					}
				}
			}
		}
	};
	window.TED["EditorPlugins"]["SaveDraft"] = SaveDraft;
	function SaveDraft(uid, forumid, tid, isPb) {
		this.isPb = !!isPb;
		this.key = "d-" + uid + "-" + forumid + "-" + tid
	}
	SaveDraft.prototype = {
		saveInterval : 5000,
		timer : null,
		savedHtml : null,
		maxNum : 3,
		storageKey : "tb_editor_storage",
		init : function(editorRef) {
			if (!Storage.isSupport()) {
				return
			}
			this.editor = editorRef;
			this.initTip();
			this.get();
			var that = this;
			if (editorRef.focused) {
				this.save()
			}
			editorRef.on("blur", function() {
				clearInterval(this.timer)
			}, this);
			editorRef.on("focus", function() {
				this.save()
			}, this);
			editorRef.on("gethtml", function() {
				clearInterval(this.timer);
				this.clearData()
			}, this)
		},
		save : function() {
			var that = this;
			this.timer = setInterval(function() {
				if (that.savedHtml !== that.editor.editArea.innerHTML) {
					that.set();
					that.savedHtml = that.editor.editArea.innerHTML
				}
			}, this.saveInterval)
		},
		clearData : function() {
			var keys = Storage.get(this.storageKey);
			if (keys === null) {
				return
			}
			keys = keys.split("_");
			for (var i = 0, j = keys.length; i < j; i++) {
				if (keys[i] === this.key) {
					keys.splice(i, 1);
					if (keys.length === 0) {
						Storage.remove(this.storageKey)
					} else {
						Storage.set(this.storageKey, keys.join("_"))
					}
					Storage.remove(this.key);
					return
				}
			}
		},
		set : function() {
			var keys = Storage.get(this.storageKey);
			if (keys === null) {
				Storage.set(this.storageKey, this.key);
				Storage.set(this.key, this.editor.editArea.innerHTML)
			} else {
				keys = keys.split("_");
				var index = this.isInArray(this.key, keys);
				if (index === false) {
					if (keys.length >= this.maxNum) {
						Storage.remove(keys.shift())
					}
					keys.push(this.key);
					Storage.set(this.storageKey, keys.join("_"))
				}
				Storage.set(this.key, this.editor.editArea.innerHTML)
			}
			if (this.tip) {
				this.tip.onSave(new Date().getTime())
			}
		},
		get : function() {
			var content = Storage.get(this.key);
			if (content === null) {
				return
			}
			this.editor.setHtml(content);
			if (this.tip) {
				this.tip.show()
			}
		},
		isInArray : function(ele, array) {
			for (var i = 0, j = array.length; i < j; i++) {
				if (array[i] === ele) {
					return i
				}
			}
			return false
		},
		initTip : function() {
			this.tip = new StorageTip(this, !this.isPb)
		}
	};
	function StorageTip(storageRef, needBlink) {
		this.storage = storageRef;
		this.needBlink = needBlink === undefined ? true : needBlink;
		this.holder = document.createElement("div");
		this.holder.innerHTML = "你上次未发表的内容已自动恢复";
		this.holder.className = "storageTip";
		this.holder.style.display = "none";
		this.storage.editor.wrapper.appendChild(this.holder)
	}
	StorageTip.prototype = {
		holder : null,
		setDateCount : 0,
		needBlink : true,
		show : function() {
			if (this.storage.editor.isEmpty()) {
				return
			}
			$(this.holder).fadeIn()
		},
		onSave : function(date) {
			if (this.storage.editor.isEmpty()) {
				$(this.holder).fadeOut();
				return
			} else {
				this.holder.style.display = "block"
			}
			this.setDate(date)
		},
		setDate : function(date) {
			this.holder.innerHTML = "你正在输入的内容已自动保存," + new Date(date).toLocaleTimeString();
			if (!this.needBlink) {
				return
			}
			if (this.setDateCount % 5 === 0) {
				$(this.holder).css("backgroundColor", "yellow").animate({
					backgroundColor : "#efefef"
				}, 500, function() {
					this.style.backgroundColor = ""
				})
			}
			this.setDateCount++
		}
	};
	window.TED["EditorPlugins"]["FontEditPlugin"] = FontEditPlugin;
	function FontEditPlugin(c_sign_num) {
		this.c_sign_num = c_sign_num;
		this.power = this._getPower()
	}
	FontEditPlugin.prototype = {
		init : function(editorRef) {
			var self = this, power = self.power;
			if (power == "none") {
				return
			}
			this.editorRef = editorRef;
			editorRef.toolbar.holder.innerHTML += '<span class="font_strong" unselectable="on" data-cmd="fontStrong"></span><span class="font_color ' + (power == "bold" ? "font_color_disable" : "") + '" unselectable="on" data-cmd="fontColor"></span>';
			$(editorRef.container).find(".font_strong").mousedown(function(event) {
				document.execCommand("bold", false, "");
				$.stats.sendRequest("fr=tb0_forum&st_mod=postor&st_type=sign&st_value=bold");
				event.preventDefault()
			});
			var j_editArea_p = $(editorRef.wrapper);
			var b_option = {
				content : "保持连续签到10天及以上，选中文字点击加粗",
				arrow_dir : "up",
				bubble_css : {
					top : -45,
					right : 50,
					width : 180
				},
				arrow_pos : {
					left : 30
				},
				attr : " id='tb_postor_b_tip' ",
				wrap : j_editArea_p
			};
			var bubble = new UiBubbleTipBase(b_option), s_timer, c_timer;
			bubble.j_bubble.find(".j_ui_triangle").hide();
			j_editArea_p.find(".font_strong").hover(function() {
				s_timer = setTimeout(function() {
					bubble.showBubble()
				}, 1000)
			}, function() {
				clearTimeout(s_timer);
				bubble.hideBubble()
			});
			var b_option_c = {
				content : "保持连续签到20天及以上，选中文字点击标红",
				arrow_dir : "up",
				bubble_css : {
					top : -45,
					right : 30,
					width : 180
				},
				arrow_pos : {
					left : 30
				},
				attr : " id='tb_postor_c_tip' ",
				wrap : j_editArea_p
			};
			var bubble_color = new UiBubbleTipBase(b_option_c);
			bubble_color.j_bubble.find(".j_ui_triangle").hide();
			j_editArea_p.find(".font_color").hover(function() {
				c_timer = setTimeout(function() {
					bubble_color.showBubble()
				}, 1000)
			}, function() {
				clearTimeout(c_timer);
				bubble_color.hideBubble()
			});
			if (power == "all") {
				$(editorRef.container).find(".font_color ").mousedown(function(event) {
					var f_c = document.queryCommandValue("forecolor") ? document.queryCommandValue("forecolor").toString() : "";
					var colorState = $.trim(f_c);
					if (colorState == "#E10602" || colorState == "132833" || colorState == "rgb(225, 6, 2)") {
						document.execCommand("forecolor", false, "#333333")
					} else {
						document.execCommand("forecolor", false, "#E10602")
					}
					$.stats.sendRequest("fr=tb0_forum&st_mod=postor&st_type=sign&st_value=color");
					event.preventDefault()
				})
			}
		},
		_getPower : function() {
			var c_sign_num = this.c_sign_num;
			if (c_sign_num < 10) {
				return "none"
			} else {
				if (c_sign_num < 20) {
					return "bold"
				} else {
					return "all"
				}
			}
		}
	};
	window.TED["EditorPlugins"]["IdiskPlugin"] = IdiskPlugin;
	function IdiskPlugin(power, fid, max_length, max_size) {
		this.power = power;
		this.fid = fid;
		this.max_length = max_length;
		this.max_size = max_size;
		this.remainder_lenght = max_length;
		this.capacity = 0
	}
	IdiskPlugin.prototype = {
		buttonId : "idisk_btn",
		flashCntClassName : "idisk_flash_cnt",
		flashInited : false,
		isOtherOpend : false,
		init : function(editorRef) {
			this.editorRef = editorRef;
			var self = this;
			this.overlay = new IdiskOverlay(editorRef.wrapper, editorRef);
			this.overlay.on("close", function() {
				editorRef.focus()
			});
			editorRef.overlay.on("open", function() {
				if (this.overlay.isOpen) {
					this.overlay.close()
				}
			}, this);
			this.overlay.on("open", function() {
				if (this.editorRef.overlay.isOpen) {
					this.editorRef.overlay.close()
				}
			}, this);
			editorRef.toolbar.holder.innerHTML += '<label></label><span class="idisk' + (this.power ? "" : "_disabled") + '" data-cmd="idisk"></span>';
			editorRef.toolbarcmd_idisk = function(el) {
				if (!self.power) {
					return [false]
				}
				self.overlay.toggle();
				if (!self.flashInited) {
					$.getJSON("http://pcs.baidu.com/rest/2.0/pcs/quota?app_id=419237&method=info&callback=?", function(info) {
						if (info.error_code) {
							$("#idisk_btn").next().html("连接失败")
						} else {
							self.capacity = info.quota - info.used;
							$("#idisk_btn").show().next().hide();
							$.JsLoadManager.use(editorRef.config.rootPath + "idisk/idisk.js", function() {
								self.initFlash();
								self.flashInited = true
							})
						}
					})
				}
				return [false]
			};
			editorRef.toolbar_hovercmd_idisk = function(el) {
				if (!self.power) {
					this.hoveroverlay.open("345px", "43px", "290px", "55px", "160px", "http://tieba.baidu.com/tb/editor/v2/idisk/noright.html?t=201211201108", el)
				}
				return [false]
			};
			editorRef.toolbar_hoverendcmd_idisk = function(el) {
				if (!self.power) {
					this.hoveroverlay.close()
				}
				return [false]
			}
		},
		initFlash : function() {
			var self = this;
			var btn = this.overlay.uploadBtn;
			var btnPosition = $(btn).position();
			this.$flashCnt = $("<div>").css({
				left : btnPosition.left + "px",
				top : btnPosition.top + "px",
				position : "absolute"
			}).appendTo(btn.offsetParent);
			this.fileUploader = new FileUploader({
				width : btn.offsetWidth,
				height : btn.offsetHeight,
				container : this.$flashCnt[0],
				UIContainer : this.editorRef.editAreaWrapper,
				url : this.editorRef.config.rootPath + "idisk/FileLoaderPlus.swf?_t=201211292"
			}, {
				max_length : this.max_length,
				forum_id : this.fid,
				upload_size_limit : this.max_size,
				storage_capacity : this.capacity,
				upload_url : "http://pcs.baidu.com/rest/2.0/pcs/file?method=upload&dir=%2fapps%2ftieba&ondup=newcopy&app_id=419237&BDUSS=" + $.cookie("BDUSS")
			});
			this.fileUploader.on("file_added", function() {
				if (this.overlay.isOpen) {
					this.overlay.close()
				}
				if (self.remainder_lenght > 0) {
					self.remainder_lenght--;
					$("#attachmentNumberCount").text(self.remainder_lenght)
				}
			}, this);
			this.fileUploader.on("remove_file", function(fileInfo) {
				if (self.remainder_lenght < self.max_length) {
					self.remainder_lenght++;
					$("#attachmentNumberCount").text(self.remainder_lenght)
				}
				this.editorRef.fireEvent("idisk_remove_file", null, [fileInfo])
			}, this);
			this.fileUploader.on("upload_complete", function(fileInfo) {
				this.editorRef.fireEvent("idisk_upload_complete", null, [fileInfo])
			}, this);
			this.fileUploader.on("uploading_file_start", function(fileInfo) {
				this.editorRef.fireEvent("idisk_uploading_start")
			}, this);
			this.fileUploader.on("uploading_file_stop", function(fileInfo) {
				this.editorRef.fireEvent("idisk_uploading_stop")
			}, this)
		}
	};
	function IdiskOverlay(container, editorRef) {
		IdiskOverlay.superclass.call(this);
		var self = this;
		this.editorRef = editorRef;
		this.max_size = this.byte2str(option_editor.upload_max_size);
		this.max_length = option_editor.upload_max_length;
		this.$holder = $("<div>").attr("class", this.holderClass).css("left", "-1000px").html('<div class="idisk_btn_container"><button id="' + this.uploadBtnId + '" style="display: none;">上传文件</button><span>正在连接百度云，请稍候...</span></div>还能上传<em id="attachmentNumberCount">' + this.max_length + "</em>个附件，每个附件小于<em>" + this.max_size + '</em><br/>附件将同步到百度云网盘，您的剩余空间：<em id="idisk_unused"></em> <a href="http://pan.baidu.com/" target="_blank">整理网盘</a>').append('<div class="close"></div>').find(".close").click(function() {
			self.onClose()
		}).end().append('<div class="arrow"></div>').appendTo(container);
		this.uploadBtn = this.$holder.find("button")[0]
	}

	extend(IdiskOverlay, EventDispatcher, {
		holderClass : "tb-editor-overlay idisk_holder",
		uploadBtnId : "idisk_btn",
		isOpen : false,
		onClose : function() {
			this.close()
		},
		close : function() {
			this.$holder.css("left", "-1000px");
			this.isOpen = false;
			this.fireEvent("close")
		},
		open : function() {
			var self = this;
			$.getJSON("http://pcs.baidu.com/rest/2.0/pcs/quota?app_id=419237&method=info&callback=?", function(info) {
				if (info.error_code) {
					$("#idisk_unused").text("读取出错")
				} else {
					$("#idisk_unused").text(self.byte2str(info.quota - info.used))
				}
			});
			if (TED.Editor.Status.isPicassoOpen === true) {
				var _this = this;
				var tips = $.dialog.confirm('<div id="maincontent" style="position:absolute;"><img style="margin:10px 10px 10px 10px;width:68px;height:68px;" src="http://static.tieba.baidu.com/tb/editor/v2/picasso/alarm.gif" /><div id="tipscontent" style="position:absolute;left:100px;top:15px;width:270px;font-size:14px;font-family:宋体" ><b>您正在编辑涂鸦，现在退出将不会保存，您确定要退出？</b></div></div>', {
					title : "涂鸦编辑器",
					acceptValue : "确定",
					cancelValue : "取消"
				});
				tips.width(420);
				tips.height(90);
				tips.bind("onaccept", function() {
					TED.Editor.Status.isPicassoOpen = false;
					_this.editorRef.overlay.close(true);
					_this.$holder.css("visibility", "visible");
					_this.isOpen = true;
					_this.fireEvent("open")
				})
			} else {
				this.$holder.css("left", "140px");
				this.isOpen = true;
				this.fireEvent("open")
			}
		},
		toggle : function() {
			if (this.isOpen) {
				this.close()
			} else {
				this.open()
			}
		},
		byte2str : function(bytes) {
			bytes = parseInt(bytes);
			if (bytes < 1024) {
				return bytes + "byte"
			}
			var kb = (bytes / 1024).toFixed(2);
			if (kb < 1024) {
				return kb + "KB"
			}
			var mb = (kb / 1024).toFixed(2);
			if (mb < 1024) {
				return mb + "MB"
			}
			return (mb / 1024).toFixed(2) + "GB"
		}
	})
})();
(function() {
	var f = TED.extend, c = TED.EventDispatcher, b = TED.EditorPlugins.Refer;
	function e(g) {
		e.superclass.call(this);
		this.init(g || {})
	}
	e.defaultConfig = {
		height : "200px",
		width : "400px",
		maxHeight : null,
		autoFocus : true,
		autoEnable : true,
		autoHeight : false,
		editAreaClassName : "tb-editor-editarea",
		editAreaWrapperClassName : "tb-editor-editarea-wrapper",
		wrapperClassName : "tb-editor-wrapper",
		disabledEditAreaClassName : "tb-editor-editarea disabled",
		disabledWrapperClassName : "tb-editor-wrapper disabled",
		imageClassName : "BDE_Image",
		smileyClassName : "BDE_Smiley",
		emptyClassName : "BDE_Empty",
		musicClassName : "BDE_Music",
		didaDelay : 300,
		imageWidthLimit : 560
	};
	e.ResizeImage = function(h) {
		h.removeAttribute("onload");
		h.removeAttribute("onerror");
		if (h.width > e.defaultConfig.imageWidthLimit) {
			var i = h.width;
			var g = h.height;
			h.setAttribute("width", e.defaultConfig.imageWidthLimit);
			h.setAttribute("height", e.defaultConfig.imageWidthLimit * g / i);
			h.setAttribute("changedsize", true)
		}
	};
	f(e, c, {
		config : null,
		enabled : false,
		focused : false,
		autoHeighted : false,
		wrapper : null,
		editArea : null,
		container : null,
		id : null,
		editValidHTML : ["br", "embed"],
		submitValidHTML : ["br", "embed"],
		execCommand : function(l, k) {
			if (!this.enabled) {
				return false
			}
			if (!this.focused) {
				this.focus()
			}
			var h = true, l = l.toLowerCase(), n;
			if ( typeof this["cmd_" + l] === "function") {
				var g = [];
				for (var j = 1; j < arguments.length; j++) {
					g.push(arguments[j])
				}
				n = this["cmd_" + l].apply(this, g);
				h = n[0];
				if (n[1]) {
					l = n[1]
				}
				if (n[2]) {
					k = n[2]
				}
			}
			if (h) {
				try {
					document.execCommand(l, false, k)
				} catch(m) {
					throw new Error("执行action时，发生异常：" + m.message)
				}
			}
			if (!this.ua.ie) {
				this.saveRange()
			}
		},
		getImageNum : function() {
			return this.getTagNum("img", this.config.imageClassName)
		},
		getSmileyNum : function() {
			return this.getTagNum("img", this.config.smileyClassName)
		},
		getHtml : function() {
			this.fireEvent("gethtml");
			return this.filteSubmitHTML()
		},
		setHtml : function(g) {
			this.editArea.innerHTML = g
		},
		enable : function() {
			if (!this.enabled) {
				this.attachEvents();
				this.editArea.style.display = "none";
				this.editArea.contentEditable = true;
				this.editArea.style.display = "block";
				if (this.ua.gecko && this.editArea.innerHTML === "") {
					this.editArea.innerHTML = "<br>"
				}
				this.editArea.className = this.config.editAreaClassName;
				this.wrapper.className = this.config.wrapperClassName;
				if (this.config.autoFocus) {
					this.focus()
				}
				this.enabled = true
			} else {
				if (this.config.autoFocus && !this.focused) {
					this.focus()
				}
			}
		},
		disable : function() {
			if (!this.enabled) {
				return
			}
			if (this.focused) {
				this.blur()
			}
			this.detachEvents();
			this.editArea.contentEditable = false;
			this.wrapper.className = this.config.disabledWrapperClassName;
			this.editArea.className = this.config.disabledEditAreaClassName;
			this.enabled = false
		},
		focus : function() {
			this.editArea.focus();
			if (this.ua.webkit) {
				this.resumeRange()
			}
		},
		blur : function() {
			if (!this.ua.ie) {
				this.saveRange()
			}
			this.editArea.blur()
		},
		isEmpty : function() {
			return this.isEmptyContent(this.editArea.innerHTML)
		},
		enableAutoHeight : function(h) {
			if (h && h <= parseInt(this.config.height)) {
				if (this.autoHeighted) {
					this.disableAutoHeight()
				}
				return
			}
			h = h || this.config.maxHeight;
			if (this.ua.ie > 0 && this.ua.ie <= 6) {
				var g = parseInt(this.config.height), i;
				if (h) {
					i = "this.scrollHeight <= " + g + ' ? "' + g + 'px" : (this.scrollHeight >= ' + h + ' ? "' + h + 'px" : "auto")'
				} else {
					i = "this.scrollHeight <= " + g + ' ? "' + g + 'px" : "auto"'
				}
				this.editArea.style.setExpression("height", i)
			} else {
				this.editArea.style.minHeight = this.config.height;
				this.editArea.style.height = "auto";
				if (h) {
					this.editArea.style.maxHeight = h + "px"
				}
			}
			this.autoHeighted = true
		},
		disableAutoHeight : function() {
			if (this.ua.ie > 0 && this.ua.ie <= 6) {
				this.editArea.style.removeExpression("height")
			}
			this.editArea.style.height = this.config.height;
			this.autoHeighted = false
		},
		empty : function() {
			this.editArea.innerHTML = ""
		},
		ua : function() {
			var j = function(m) {
				var o = 0;
				return parseFloat(m.replace(/\./g, function() {
					return (o++ == 1) ? "" : "."
				}))
			}, n = navigator, l = {
				ie : 0,
				opera : 0,
				gecko : 0,
				webkit : 0,
				mobile : null,
				air : 0,
				caja : n.cajaVersion,
				secure : false,
				os : null
			}, i = navigator && navigator.userAgent, k = window && window.location, h = k && k.href, g;
			l.secure = h && (h.toLowerCase().indexOf("https") === 0);
			if (i) {
				if ((/windows|win32/i).test(i)) {
					l.os = "windows"
				} else {
					if ((/macintosh/i).test(i)) {
						l.os = "macintosh"
					}
				}
				if ((/KHTML/).test(i)) {
					l.webkit = 1
				}
				g = i.match(/AppleWebKit\/([^\s]*)/);
				if (g && g[1]) {
					l.webkit = j(g[1]);
					if (/ Mobile\//.test(i)) {
						l.mobile = "Apple"
					} else {
						g = i.match(/NokiaN[^\/]*/);
						if (g) {
							l.mobile = g[0]
						}
					}
					g = i.match(/AdobeAIR\/([^\s]*)/);
					if (g) {
						l.air = g[0]
					}
				}
				if (!l.webkit) {
					g = i.match(/Opera[\s\/]([^\s]*)/);
					if (g && g[1]) {
						l.opera = j(g[1]);
						g = i.match(/Opera Mini[^;]*/);
						if (g) {
							l.mobile = g[0]
						}
					} else {
						g = i.match(/MSIE\s([^;]*)/);
						if (g && g[1]) {
							l.ie = j(g[1])
						} else {
							g = i.match(/Gecko\/([^\s]*)/);
							if (g) {
								l.gecko = 1;
								g = i.match(/rv:([^\s\)]*)/);
								if (g && g[1]) {
									l.gecko = j(g[1])
								}
							}
						}
					}
				}
			}
			return l
		}(),
		isUCWeb : function() {
			var g = navigator.userAgent.toString();
			if (g.indexOf("X11;") > -1 && g.indexOf("Linux i686;") > -1 && g.indexOf("Gecko") > -1 && g.indexOf("Firefox") < 0 && g.indexOf("Opera") < 0) {
				return true
			}
			return false
		},
		isAndroidOS : function() {
			var g = navigator.userAgent.toString();
			if (g.match(/android/i) != null) {
				return true
			}
			return false
		},
		isEmptyContent : function(g) {
			if (!g) {
				return true
			}
			return ("" === g.replace(/<br[^>]*>/gi, "").replace(/<\/?(?:span|a)[^>]*>/gi, "").replace(/[\u3000\s]+/g, "").replace(/&nbsp;/g, ""))
		},
		init : function(g) {
			this.augmentObject(g, this.constructor.defaultConfig || {});
			this.config = g;
			if (this.constructor.registerInstance) {
				this.id = this.constructor.registerInstance(this, g.id)
			}
			this.initComponents(g);
			this.appendToDom();
			this.initEvents();
			this.initConfig(g)
		},
		initComponents : function(g) {
			if (g.container) {
				if ( typeof g.container === "string") {
					this.container = document.getElementById(g.container)
				} else {
					if ( typeof g.container === "object" && g.container.nodeType === 1) {
						this.container = g.container
					}
				}
			}
			this.container = this.container || document.body;
			this.editArea = document.createElement("div");
			this.editArea.className = g.disabledEditAreaClassName;
			this.wrapper = document.createElement("div");
			this.wrapper.className = g.disabledWrapperClassName;
			this.editAreaWrapper = document.createElement("div");
			this.editAreaWrapper.className = g.editAreaWrapperClassName;
			this.editArea.style.height = g.height;
			this.wrapper.style.width = g.width
		},
		appendToDom : function() {
			this.editAreaWrapper.appendChild(this.editArea);
			this.wrapper.appendChild(this.editAreaWrapper);
			this.container.appendChild(this.wrapper)
		},
		initConfig : function(g) {
			if (g.autoHeight) {
				this.enableAutoHeight()
			}
			if (g.enableRefer) {
				this.addPlugin("refer", new b({
					uid : this.config.uid
				}))
			}
			if (g.autoEnable) {
				var h = this;
				setTimeout(function() {
					h.enable();
					h.fireEvent("initcomplete")
				}, 10)
			} else {
				this.fireEvent("initcomplete")
			}
		},
		initEvents : function() {
			var g = this;
			this.bindMousedown = function() {
				g.onMousedown.apply(g, arguments)
			};
			this.bindMouseup = function() {
				g.onMouseup.apply(g, arguments)
			};
			this.bindClick = function() {
				g.onClick.apply(g, arguments)
			};
			this.bindDoubleclick = function() {
				g.onDoubleclick.apply(g, arguments)
			};
			this.bindKeydown = function() {
				g.onKeydown.apply(g, arguments)
			};
			this.bindKeyup = function() {
				g.onKeyup.apply(g, arguments)
			};
			this.bindKeypress = function() {
				g.onKeypress.apply(g, arguments)
			};
			this.bindPaste = function() {
				g.onPaste.apply(g, arguments)
			};
			this.bindBlur = function() {
				g.onBlur.apply(g, arguments)
			};
			this.bindFocus = function() {
				g.onFocus.apply(g, arguments)
			}
		},
		attachEvents : function() {
			var g = this.editArea;
			if (!this.ua.ie) {
				g.addEventListener("mousedown", this.bindMousedown, false);
				g.addEventListener("mouseup", this.bindMouseup, false);
				g.addEventListener("click", this.bindClick, false);
				g.addEventListener("dblclick", this.bindDoubleclick, false);
				g.addEventListener("keypress", this.bindKeypress, false);
				g.addEventListener("keyup", this.bindKeyup, false);
				g.addEventListener("keydown", this.bindKeydown, false);
				g.addEventListener("paste", this.bindPaste, false);
				g.addEventListener("blur", this.bindBlur, false);
				g.addEventListener("focus", this.bindFocus, false)
			} else {
				g.attachEvent("onmousedown", this.bindMousedown);
				g.attachEvent("onmouseup", this.bindMouseup);
				g.attachEvent("onclick", this.bindClick);
				g.attachEvent("ondblclick", this.bindDoubleclick);
				g.attachEvent("onkeypress", this.bindKeypress);
				g.attachEvent("onkeyup", this.bindKeyup);
				g.attachEvent("onkeydown", this.bindKeydown);
				g.attachEvent("onpaste", this.bindPaste);
				g.attachEvent("onbeforedeactivate", this.bindBlur);
				g.attachEvent("onbeforeactivate", this.bindFocus)
			}
			this.on("dida", this.onDida, this)
		},
		detachEvents : function() {
			var g = this.editArea;
			if (!this.ua.ie) {
				g.removeEventListener("mousedown", this.bindMousedown, false);
				g.removeEventListener("mouseup", this.bindMouseup, false);
				g.removeEventListener("click", this.bindClick, false);
				g.removeEventListener("dblclick", this.bindDoubleclick, false);
				g.removeEventListener("keypress", this.bindKeypress, false);
				g.removeEventListener("keyup", this.bindKeyup, false);
				g.removeEventListener("keydown", this.bindKeydown, false);
				g.removeEventListener("paste", this.bindPaste, false);
				g.removeEventListener("blur", this.bindBlur, false);
				g.removeEventListener("focus", this.bindFocus, false)
			} else {
				g.detachEvent("onmousedown", this.bindMousedown);
				g.detachEvent("onmouseup", this.bindMouseup);
				g.detachEvent("onclick", this.bindClick);
				g.detachEvent("ondblclick", this.bindDoubleclick);
				g.detachEvent("onkeypress", this.bindKeypress);
				g.detachEvent("onkeyup", this.bindKeyup);
				g.detachEvent("onkeydown", this.bindKeydown);
				g.detachEvent("onpaste", this.bindPaste);
				g.detachEvent("onbeforedeactivate", this.bindBlur);
				g.detachEvent("onbeforeactivate", this.bindFocus)
			}
			this.remove("dida", this.onDida)
		},
		onMousedown : function(g) {
			this.fireEvent("mousedown", null, [g]);
			if (g.exitFunction) {
				return
			}
		},
		onMouseup : function(g) {
			this.fireEvent("mouseup", null, [g]);
			if (g.exitFunction) {
				return
			}
			if (!this.ua.ie) {
				this.saveRange()
			}
		},
		onClick : function(g) {
			this.fireEvent("click", null, [g]);
			if (g.exitFunction) {
				return
			}
		},
		onDoubleclick : function(g) {
			this.fireEvent("doubleclick", null, [g]);
			if (g.exitFunction) {
				return
			}
		},
		onKeydown : function(h) {
			this.fireEvent("keydown", null, [h]);
			if (h.exitFunction) {
				return
			}
			if (h.keyCode === 8) {
				if (this.ua.ie) {
					var g = this.getRange();
					if (g.item) {
						g.item(0).outerHTML = "";
						h.returnValue = false
					}
				}
			}
		},
		onKeypress : function(i) {
			this.fireEvent("keypress", null, [i]);
			if (i.exitFunction) {
				return
			}
			var g = i.keyCode;
			switch(g) {
				case 13:
					if (this.ua.ie) {
						var h = this.getRange();
						if (h) {
							h.pasteHTML("<br>");
							h.collapse(false);
							h.select()
						}
						i.returnValue = false
					} else {
						if (this.ua.webkit) {
							document.execCommand("insertlinebreak");
							i.preventDefault()
						}
					}
					break
			}
		},
		onKeyup : function(g) {
			this.fireEvent("keyup", null, [g]);
			if (g.exitFunction) {
				return
			}
			if (!this.ua.ie) {
				this.saveRange()
			}
		},
		onPaste : function(h) {
			this.fireEvent("paste", null, [h]);
			if (h.exitFunction) {
				return
			}
			if (this.ua.ie) {
				this.doPasteIE(h);
				this.fireEvent("afterpaste", null, [h])
			} else {
				var g = this;
				setTimeout(function() {
					g.doPaste();
					g.fireEvent("afterpaste", null, [h])
				}, 5)
			}
		},
		didaTimer : null,
		savedHeight : null,
		startDida : function() {
			var g = this;
			this.didaTimer = setInterval(function() {
				g.fireEvent("dida")
			}, this.config.didaDelay)
		},
		stopDida : function() {
			clearInterval(this.didaTimer)
		},
		onDida : function() {
			if (this.autoHeighted) {
				if (this.savedHeight === null) {
					this.savedHeight = this.wrapper.scrollHeight;
					return
				}
				var g = this.wrapper.scrollHeight;
				if (this.savedHeight && g !== this.savedHeight) {
					this.fireEvent("heightChanged", null, [g, g - this.savedHeight]);
					this.savedHeight = g
				}
			}
		},
		onBlur : function(g) {
			this.stopDida();
			this.focused = false;
			this.fireEvent("blur", null, [g]);
			if (g.exitFunction) {
				return
			}
			if (this.ua.ie) {
				this.saveRange()
			}
		},
		onFocus : function(g) {
			this.startDida();
			this.focused = true;
			this.fireEvent("focus", null, [g]);
			if (g.exitFunction) {
				return
			}
			this.resumeRange()
		},
		augmentObject : function(i, h) {
			for (var g in h) {
				if (h.hasOwnProperty(g)) {
					i[g] = i[g] !== undefined ? i[g] : h[g]
				}
			}
		},
		getSelection : function() {
			return window.getSelection ? window.getSelection() : document.selection
		},
		getRange : function() {
			return this.ua.ie ? document.selection.createRange() : window.getSelection().getRangeAt(0)
		},
		createRange : function() {
			return this.ua.ie ? document.body.createTextRange() : document.createRange()
		},
		getSelectedElement : function() {
			var g = this.getRange();
			if (this.ua.ie) {
				return g.item ? g.item(0) : g.parentElement()
			}
			var h = g.commonAncestorContainer;
			if (h.nodeType === 3) {
				h = h.parentNode
			}
			return h
		},
		doPasteIE : function(g) {
			var h = clipboardData.getData("Text");
			if ((!h) || h == "") {
				return true
			}
			h = h.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r?\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/\s/g, "&nbsp;").replace(/\u3000/g, "&nbsp;&nbsp;");
			this.execCommand("inserthtml", h);
			g.returnValue = false
		},
		doPaste : function() {
			this.saveCursor();
			this.editArea.innerHTML = this.filteEditHTML();
			this.ensureCursor()
		},
		filteEditHTML : function() {
			return html = this.editArea.innerHTML.replace(/_moz_dirty=""/gi, "").replace(/\[/g, "[[-").replace(/\]/g, "-]]").replace(/<\/ ?tr[^>]*>/gi, "[br]").replace(/<\/ ?td[^>]*>/gi, "&nbsp;&nbsp;").replace(/<(ul|dl|ol)[^>]*>/gi, "[br]").replace(/<(li|dd)[^>]*>/gi, "[br]").replace(/<p [^>]*>/gi, "[br]").replace(new RegExp("<(/?(?:" + this.editValidHTML.join("|") + ")[^>]*)>", "gi"), "[$1]").replace(new RegExp('<span([^>]*class="?at"?[^>]*)>', "gi"), "[span$1]").replace(new RegExp('<img([^>]*class="?(?:' + this.config.imageClassName + "|" + this.config.emptyClassName + "|" + this.config.smileyClassName + "|" + this.config.flashClassName + "|" + this.config.musicClassName + '"?[^>]*)>', "gi"), "[img$1]").replace(/<[^>]*>/g, "").replace(/\[\[\-/g, "[").replace(/\-\]\]/g, "]").replace(new RegExp("\\[(/?(?:" + this.editValidHTML.join("|") + "|img|span)[^\\]]*)\\]", "gi"), "<$1>").replace(/\r?\n/gi, "<br>")
		},
		filteSubmitHTML : function() {
			this.reLayout();
			var h = this.editArea.innerHTML.replace(/_moz_dirty=""/gi, "").replace(/\[/g, "[[-").replace(/\]/g, "-]]").replace(new RegExp("<(/?(?:" + this.submitValidHTML.join("|") + ")[^>]*)>", "gi"), "[$1]").replace(/<strong[^>]*>/gi, "[strong]").replace(/<\/strong[^>]*>/gi, "[/strong]").replace(/<b[^>]*>/gi, "[strong]").replace(/<\/b[^>]*>/gi, "[/strong]").replace(new RegExp('<span([^>]*class="?edit_font_normal"?[^>]*)>@</span>', "gi"), "@").replace(/<span([^>]*)>/gi, "[span$1]").replace(/<\/span[^>]*>/gi, "[/span]").replace(/<font[^>]*color=(\")?#E10602(\")?[^>]*>/gi, '[span class="edit_font_color"]').replace(/<font[^>]*color=(\")?#333333(\")?[^>]*>/gi, '[span class="edit_font_normal"]').replace(/<font[^>]*>/gi, '[span class="edit_font_normal"]').replace(/<\/font[^>]*>/gi, "[/span]").replace(new RegExp('<img([^>]*class="?(?:' + this.config.imageClassName + "|" + this.config.smileyClassName + "|" + this.config.flashClassName + "|" + this.config.musicClassName + ')"?[^>]*)>', "gi"), "[img$1]").replace(/<[^>]*>/g, "").replace(/\[\[\-/g, "[").replace(/\-\]\]/g, "]").replace(new RegExp("\\[(/?(?:" + this.submitValidHTML.join("|") + "|img|span|strong)[^\\]]*)\\]", "gi"), "<$1>").replace(new RegExp("<span[^>]*>@</span>", "gi"), "@").replace(new RegExp("<span[^>]*>@(.*?)</span>", "gi"), "@$1 ");
			var g = document.createElement("div");
			g.innerHTML = h;
			this.parseURL(g);
			return g.innerHTML
		},
		filteHTML : function(h, g) {
			return h.replace(/_moz_dirty=""/gi, "").replace(/\[/g, "[[-").replace(/\]/g, "-]]").replace(new RegExp("<(/?(?:" + g.join("|") + ")[^>]*)>", "gi"), "[$1]").replace(/<[^>]*>/g, "").replace(/\[\[\-/g, "[").replace(/\-\]\]/g, "]").replace(new RegExp("\\[(/?(?:" + g.join("|") + ")[^\\]]*)\\]", "gi"), "<$1>")
		},
		selectNodeContents : function(h, j) {
			if (!h) {
				return
			}
			var g, i;
			if (this.ua.ie) {
				g = document.body.createTextRange();
				g.moveToElementText(h);
				if (j) {
					g.collapse(false)
				}
				g.select()
			} else {
				i = this.getSelection();
				g = document.createRange();
				g.selectNodeContents(h);
				i.removeAllRanges();
				i.addRange(g);
				if (j) {
					i.collapseToEnd()
				}
			}
		},
		hasSelection : function() {
			var g = this.getSelection();
			if (this.ua.ie) {
				return g.type.toLowerCase() !== "none"
			} else {
				if (this.ua.opera) {
					var h = this.getRange();
					return !(g.isCollapsed && h.startContainer && h.startContainer === h.endContainer && h.startOffset === h.endOffset)
				} else {
					return !g.isCollapsed
				}
			}
		},
		saveCursor : function() {
			if (!this.focused) {
				return
			}
			var g = document.getElementById("editor-tmp-img");
			if (g) {
				g.parentNode.removeChild(g)
			}
			this.execCommand("inserthtml", '<img class="' + this.config.emptyClassName + '" id="editor-tmp-img" style="width:1px;height:1px">')
		},
		ensureCursor : function() {
			if (!this.focused) {
				this.focus()
			}
			var h = document.getElementById("editor-tmp-img");
			if (h) {
				if (this.ua.ie) {
					this.selectNodeContents(h);
					this.execCommand("delete")
				} else {
					var g = document.createRange();
					g.selectNode(h);
					var i = window.getSelection();
					i.removeAllRanges();
					i.addRange(g);
					this.execCommand("delete")
				}
			}
		},
		savedRange : null,
		saveRange : function() {
			this.savedRange = this.getRange()
		},
		resumeRange : function(g) {
			g = g || this.savedRange;
			if (!g) {
				return false
			}
			if (this.ua.ie) {
				try {
					g.select()
				} catch(i) {
				}
			} else {
				var h = this.getSelection();
				h.removeAllRanges();
				h.addRange(g)
			}
		},
		cmd_inserthtml : function(g) {
			if (this.ua.ie) {
				var h = this.getRange();
				if (h.item) {
					h.item(0).outerHTML = g
				} else {
					h.pasteHTML(g)
				}
				return [false]
			}
			return [true]
		},
		insertImage : function(j, n, l, m) {
			var i = "";
			if ( typeof m !== "undefined") {
				i = m
			}
			if (this.ua.ie === 8) {
				this.execCommand("inserthtml", '<img onload="TED.EditorCore.ResizeImage(this);" pic_type="' + i + '"  class="' + n + '" id="editor-tmp-img" src="' + j + '">');
				var h = document.getElementById("editor-tmp-img");
				h.removeAttribute("id");
				if (h.parentNode.lastChild === h) {
					var k = document.createElement("br");
					h.parentNode.appendChild(k);
					var g = document.body.createTextRange();
					g.moveToElementText(k);
					if (l) {
						g.collapse(false)
					} else {
						g.collapse(true)
					}
					g.select()
				} else {
					if (l) {
						this.execCommand("insertlinebreak")
					}
				}
			} else {
				this.execCommand("inserthtml", '<img onload="TED.EditorCore.ResizeImage(this);"  pic_type="' + i + '" class="' + n + '" src="' + j + '">');
				if (l) {
					this.execCommand("insertlinebreak")
				}
			}
		},
		cmd_insertlinebreak : function() {
			if (this.ua.webkit) {
				document.execCommand("insertlinebreak", false, null)
			} else {
				if (this.ua.gecko) {
					document.execCommand("inserthtml", false, '<br id="editor-tmp-br">');
					var h = document.getElementById("editor-tmp-br");
					h.removeAttribute("id");
					if (h.parentNode.lastChild === h) {
						h.parentNode.removeChild(h);
						document.execCommand("inserthtml", false, '<br><br id="editor-tmp-br">');
						h = document.getElementById("editor-tmp-br");
						h.removeAttribute("id");
						var i = window.getSelection();
						var j = document.createRange();
						j.setStartBefore(h);
						j.setEndBefore(h);
						i.removeAllRanges();
						i.addRange(j)
					}
				} else {
					if (this.ua.ie) {
						var g = this.getRange();
						if (g) {
							g.pasteHTML("<br>");
							g.collapse(false);
							g.select()
						}
					}
				}
			}
			return [false]
		},
		cmd_insertsmiley : function(g) {
			this.insertImage(g, this.config.smileyClassName);
			return [false]
		},
		cmd_insertimage : function(h, l) {
			if ( typeof h == "string") {
				this.insertImage(h, this.config.imageClassName, true, l)
			} else {
				if (Object.prototype.toString.apply(h) === "[object Array]") {
					for (var k = 0, g = h.length; k < g; k++) {
						this.insertImage(h[k], this.config.imageClassName, true, l)
					}
				}
			}
			return [false]
		},
		cmd_focus2end : function() {
			var g = this.editArea;
			if (this.ua.ie) {
				g.innerHTML = g.innerHTML
			} else {
				if (g.lastChild) {
					var i = document.createRange(), h = window.getSelection();
					i.setStartAfter(g.lastChild);
					i.setEndAfter(g.lastChild);
					h.removeAllRanges();
					h.addRange(i)
				} else {
					g.focus()
				}
			}
			return [false]
		},
		editorPlugins : null,
		addPlugin : function(h, g) {
			g.init(this);
			this.editorPlugins = this.editorPlugins || {};
			this.editorPlugins[h] = g
		},
		augmentObject : function(i, h) {
			for (var g in h) {
				if (h.hasOwnProperty(g)) {
					i[g] = i[g] !== undefined ? i[g] : h[g]
				}
			}
		},
		setStatsRequest : function(h) {
			var g = new Image();
			window["bd_pv_" + (new Date).getTime()] = g;
			g.src = "http://static.tieba.baidu.com/tb/img/pv.gif?fr=tb0_forum&st_mod=frspb&st_type=editor&st_value=" + h + "&t=" + (new Date).getTime();
			g = null
		},
		getTagNum : function(l, m) {
			var h = this.editArea.getElementsByTagName(l), n = h.length;
			if (m) {
				n = 0;
				for (var k = 0, g = h.length; k < g; k++) {
					if (h[k].className === m) {
						n++
					}
				}
			}
			return n
		},
		reLayout : function() {
			var m = this.editArea.getElementsByTagName("img"), g = this.config.imageWidthLimit;
			var l = [];
			for (var k = 0, h = m.length; k < h; k++) {
				img = m[k];
				if (img.width === 0 || img.height === 0) {
					l.push(img);
					continue
				}
				if (img.className === this.config.imageClassName) {
					if (img.width > g) {
						img.setAttribute("width", g);
						img.setAttribute("changedsize", true)
					} else {
						img.setAttribute("width", img.width)
					}
					img.setAttribute("height", img.height)
				} else {
					if (img.className === this.config.smileyClassName) {
						if (img.width > 100) {
							img.setAttribute("width", 100)
						} else {
							img.setAttribute("width", img.width)
						}
						img.setAttribute("height", img.height)
					} else {
						img.setAttribute("width", img.width);
						img.setAttribute("height", img.height)
					}
				}
				img.removeAttribute("onload")
			}
			for (var k = 0, h = l.length; k < h; k++) {
				l[k].parentNode.removeChild(l[k])
			}
		},
		parseURL : function(k) {
			var h = "(=*+)", g = "(+*=)";
			var j = 4;
			var i = function(l) {
				if (l.nodeType == 3) {
					var m = l.nodeValue;
					if (m && m.length > j) {
						m = "." + m;
						m = m.replace(/([^0-9a-zA-Z])((www\.|http:\/\/|mms:\/\/|rtsp:\/\/|ftp:\/\/|https:\/\/)[0-9a-zA-Z\.\!\~\#\?\:\/\&\%\-\+\*\'\=\@\_\$]+)/gi, "$1" + h + 'a href="$2" target="_blank"' + g + "$2" + h + "/a" + g);
						m = m.substring(1);
						l.nodeValue = m
					}
				} else {
					if (l.nodeType == 1) {
						var n = l.firstChild;
						while (n) {
							if (n.nodeName.toUpperCase() != "A") {
								i(n)
							}
							n = n.nextSibling
						}
					}
				}
			};
			i(k);
			k.innerHTML = k.innerHTML.replace(/\(\=\*\+\)a\ href="www\./gi, '<a href="http://www.').replace(/\(\=\*\+\)/gi, "<").replace(/\(\+\*\=\)/gi, ">")
		}
	});
	window.TED["EditorCore"] = e;
	var a = {
		instanceNum : 0,
		idPrefix : "tb-editor-",
		registerInstance : function(g, h) {
			this.instances = this.instances || {};
			h = h || this.generateID();
			this.instances[h] = g;
			return h
		},
		generateID : function() {
			return this.idPrefix + ++this.instanceNum
		},
		getInstanceById : function(g) {
			return (g && this.instances) ? this.instances[g] : null
		}
	};
	window.TED["EditorInstanceManager"] = a;
	function d(g) {
		d.superclass.call(this);
		this.area = document.createElement("textarea");
		if (g.is_ipad) {
			this.area.className = "textarea_ipad"
		}
		this.area.style.width = g.width;
		this.area.style.height = g.height;
		if (g.autoEnable === false) {
			this.area.disabled = true
		}
		document.getElementById(g.container).appendChild(this.area);
		this.init()
	}

	f(d, c, {
		isMobile : true,
		init : function() {
			var g = this;
			this.area.onfocus = function() {
				g.fireEvent("focus")
			};
			this.area.onclick = function() {
				g.fireEvent("click")
			};
			if (this.constructor.registerInstance) {
				this.id = this.constructor.registerInstance(this)
			}
		},
		getImageNum : function() {
			return 0
		},
		getSmileyNum : function() {
			return 0
		},
		getFlashNum : function() {
			return 0
		},
		getMusicNum : function() {
			return 0
		},
		getHtml : function() {
			return this.area.value.replace(/&/gi, "&amp;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/\r?\n/gi, "<br>").replace(/[\u3000\s]/gi, "&nbsp;").replace(/\t/gi, "&nbsp;&nbsp;&nbsp;&nbsp;")
		},
		focus : function() {
			this.area.focus()
		},
		blur : function() {
			this.area.blur()
		},
		isEmpty : function() {
			var g = this.area;
			return !(g && g.value && g.value.replace(/[\u3000\s]/gi, "").replace(/\r?\n/gi, "").replace(/\t/gi, "") != "")
		},
		quoteContainer : null,
		quote : function(j, g, k) {
			j = parseInt(j);
			if (j > 1) {
				if (this.quoteContainer === null) {
					this.quoteContainer = document.createElement("div");
					this.quoteContainer.className = "editor-quote";
					this.area.parentNode.insertBefore(this.quoteContainer, this.area)
				}
				var i = document.getElementById("post_content_" + g).innerHTML.replace(/<img[^>]*>/gi, "[图片]").replace(/<embed[^>]*>/gi, "[视频]").replace(/<br[^>]*>/gi, " ").replace(/<a[^>]*>/gi, "").replace(/<\/a>/gi, "").subByte(270);
				this.quoteContainer.innerHTML = '<blockquote class="quote quote_simple"><a href="javascript:void(0);" onmousedown="return false;" onclick="TED.TextInput.getInstanceById(\'' + this.id + '\').unQuote();Stats.sendRequest(\'fr=tb0_forum&st_mod=pb&st_type=quote&st_value=delete\');" class="close" title="删除引用">╳</a><p class="quote_title">引用&nbsp;' + k + '&nbsp;(<a href="#' + g + '">' + j + '楼</a>)</p><p class="quote_content">' + i + "</p></blockquote>";
				this.quoteContainer.style.display = "block";
				this.fireEvent("quote", null, [g])
			} else {
				this.unQuote();
				Stats.sendRequest("fr=tb0_forum&st_mod=pb&st_type=quote&st_value=replyfirst")
			}
			var h = this;
			setTimeout(function() {
				h.focus()
			}, 100)
		},
		unQuote : function() {
			if (this.quoteContainer) {
				this.quoteContainer.style.display = "none"
			}
			this.fireEvent("unquote")
		}
	});
	TED.augmentObject(d, a);
	window.TED["TextInput"] = d
})();
(function() {
	var d = TED.EditorCore, e = TED.extend, a = TED.EditorInstanceManager, b = TED.augmentObject;
	window.TED["SimpleEditor"] = c;
	function c(f) {
		c.superclass.call(this, f)
	}
	c.defaultConfig = {
		height : "100px",
		width : "400px",
		maxHeight : null,
		autoFocus : true,
		autoEnable : true,
		autoHeight : false,
		wrapperClassName : "tb-simpleeditor-wrapper",
		editAreaClassName : "tb-editor-editarea",
		editAreaWrapperClassName : "tb-editor-editarea-wrapper",
		disabledEditAreaClassName : "tb-editor-editarea tb-editor-editarea-disabled",
		disabledWrapperClassName : "tb-simpleeditor-wrapper tb-simpleeditor-wrapper-disabled",
		imageClassName : "BDE_Image",
		smileyClassName : "BDE_Smiley",
		rootPath : "/tb/editor/v2/",
		enableRefer : true,
		emptyClassName : "BDE_Empty",
		flashClassName : "BDE_Flash",
		flashNumLimit : 10,
		didaDelay : 300,
		imageWidthLimit : 570
	};
	e(c, d, {
		getContentLength : function() {
			return Math.ceil(this.filteHTML(this.editArea.innerHTML, ["img", "br"]).replace(/<img[^>]*>/gi, "mm").replace(/<br[^>]*>/gi, "m").replace(/&nbsp;/gi, "m").replace(/[^\x00-\xff]/g, "mm").length / 2)
		},
		filteEditHTML : function() {
			return html = this.editArea.innerHTML.replace(/_moz_dirty=""/gi, "").replace(/\[/g, "[[-").replace(/\]/g, "-]]").replace(new RegExp("<\\/?(?:br[^>]*)>", "gi"), "[$1]").replace(new RegExp('<span([^>]*class="?at"?[^>]*)>', "gi"), "[span$1]").replace(new RegExp('<img([^>]*class="?(?:' + this.config.emptyClassName + "|" + this.config.smileyClassName + ')"?[^>]*)>', "gi"), "[img$1]").replace(/<[^>]*>/g, "").replace(/\[\[\-/g, "[").replace(/\-\]\]/g, "]").replace(new RegExp("\\[(/?(?:br|img|span)[^\\]]*)\\]", "gi"), "<$1>")
		},
		getConfig : function() {
			return this.config
		},
		filteSubmitHTML : function() {
			this.reLayout();
			var g = this.editArea.innerHTML.replace(/_moz_dirty=""/gi, "").replace(/\[/g, "[[-").replace(/\]/g, "-]]").replace(new RegExp("<(/?(?:" + this.submitValidHTML.join("|") + ")[^>]*)>", "gi"), "[$1]").replace(new RegExp('<img([^>]*class="?(?:' + this.config.imageClassName + "|" + this.config.smileyClassName + "|" + this.config.flashClassName + "|" + this.config.musicClassName + ')"?[^>]*)>', "gi"), "[img$1]").replace(/<[^>]*>/g, "").replace(/\[\[\-/g, "[").replace(/\-\]\]/g, "]").replace(new RegExp("\\[(/?(?:" + this.submitValidHTML.join("|") + "|img)[^\\]]*)\\]", "gi"), "<$1>");
			var f = document.createElement("div");
			f.innerHTML = g;
			this.parseURL(f);
			return f.innerHTML
		}
	});
	b(c, a)
})();
(function() {
	var g = TED.EditorCore, i = TED.extend, c = TED.EventDispatcher, a = TED.Overlay, d = TED.HoverOverlay, j = TED.Event, k = TED.EditorInstanceManager, h = TED.augmentObject, b = TED.SimpleAjax;
	window.TED["Editor"] = f;
	function f(l) {
		if (this.ua.mobile || this.isUCWeb() || this.isAndroidOS()) {
			return new TED.TextInput(l)
		}
		f.superclass.call(this, l)
	}
	f.defaultConfig = {
		height : "200px",
		width : "655px",
		maxHeight : null,
		autoFocus : false,
		autoEnable : true,
		autoHeight : true,
		wrapperClassName : "tb-editor-wrapper",
		editAreaClassName : "tb-editor-editarea",
		editAreaWrapperClassName : "tb-editor-editarea-wrapper",
		disabledEditAreaClassName : "tb-editor-editarea tb-editor-editarea-disabled",
		disabledWrapperClassName : "tb-editor-wrapper tb-editor-wrapper-disabled",
		imageClassName : "BDE_Image",
		smileyClassName : "BDE_Smiley",
		musicClassName : "BDE_Music",
		flashClassName : "BDE_Flash",
		flashNumLimit : 10,
		rootPath : "/tb/editor/v2/",
		enableRefer : true,
		emptyClassName : "BDE_Empty",
		didaDelay : 300,
		imageWidthLimit : 570
	};
	f.Status = {
		isPicassoOpen : false
	};
	i(f, g, {
		getHtml : function() {
			return this.img2embed(f.superclass.prototype.getHtml.call(this, this.editArea.innerHTML))
		},
		hasPicassoAuth : function() {
			if (this.config.picasso && !this.config.no_post_pic) {
				return true
			}
			return false
		},
		enable : function() {
			this.toolbar.enable();
			f.superclass.prototype.enable.call(this)
		},
		disable : function() {
			this.toolbar.disable();
			if (this.overlay.isOpen) {
				this.overlay.close()
			}
			f.superclass.prototype.disable.call(this)
		},
		getFlashNum : function() {
			return this.getTagNum("img", "BDE_Flash")
		},
		getMusicNum : function() {
			return this.getTagNum("img", "BDE_Music")
		},
		getConfig : function() {
			return this.config
		},
		overlay : null,
		toolbar : null,
		hoveroverlay : null,
		initComponents : function(l) {
			f.superclass.prototype.initComponents.call(this, l);
			this.overlay = new a(this.wrapper);
			this.hoveroverlay = new d(this.wrapper);
			this.toolbar = new e(this.wrapper, this.hasPicassoAuth())
		},
		attachEvents : function() {
			f.superclass.prototype.attachEvents.call(this);
			this.toolbar.on("command", this.toolbarcmd, this);
			this.toolbar.on("hovercommand", this.toolbarhovercmd, this);
			this.toolbar.on("hoverendcommand", this.toolbarhoverendcmd, this);
			this.overlay.on("close", function() {
				this.focus()
			}, this)
		},
		detachEvents : function() {
			f.superclass.prototype.detachEvents.call(this);
			this.toolbar.remove("command", this.toolbarCommand);
			this.toolbar.remove("hovercommand", function() {
			});
			this.toolbar.remove("hoverendcommand", function() {
			})
		},
		toolbarcmd : function(m, l) {
			if (m && typeof this["toolbarcmd_" + m] === "function") {
				this["toolbarcmd_"+m](l)
			}
		},
		toolbarhovercmd : function(m, l) {
			if (m && typeof this["toolbar_hovercmd_" + m] === "function") {
				this["toolbar_hovercmd_"+m](l)
			}
		},
		toolbarhoverendcmd : function(m, l) {
			if (m && typeof this["toolbar_hoverendcmd_" + m] === "function") {
				this["toolbar_hoverendcmd_"+m](l)
			}
		},
		toolbarcmd_smiley : function(l) {
			this.overlay.toggle("120px", "43px", "420px", "355px", "144px", this.config.rootPath + "smiley.html?id=" + this.id + "&bavl=false&t=20121101", l);
			$.stats.hive("toolbar_similey");
			return [false]
		},
		toolbarcmd_image : function(l) {
			this.overlay.toggle("0px", "43px", "540px", "272px", "13px", this.config.rootPath + "multipleupload.html?t=20121212&v=1.4&id=" + this.id, l);
			$.stats.hive("toolbar_images");
			return [false]
		},
		toolbarcmd_music : function(l) {
			var n = this;
			var m = n.config.bavl;
			if (m >= 2) {
				n.overlay.toggle("55px", "43px", "500px", "400px", "126px", n.config.rootPath + "music.html?id=" + n.id, l)
			} else {
				n.overlay.toggle("55px", "43px", "320px", "65px", "126px", n.config.rootPath + "music_error.html?id=" + n.id, l)
			}
			$.stats.hive("toolbar_music");
			return [false]
		},
		toolbarcmd_flash : function(l) {
			this.overlay.toggle("25px", "43px", "530px", "155px", "71px", this.config.rootPath + "flash.html?id=" + this.id + "&t=20121221", l);
			$.stats.hive("toolbar_video");
			return [false]
		},
		toolbarcmd_picasso : function(n) {
			if (this.hasPicassoAuth()) {
				var o = !!document.createElement("canvas").getContext;
				var l = ( typeof FileReader) != "undefined";
				if (o && l) {
					if (this.overlay.currentOpen && this.overlay.currentOpen === n) {
						this.overlay.close()
					} else {
						n.className = n.className + " open";
						this.overlay.currentOpen = n;
						this.overlay.isOpen = true;
						var m = new PicassoPanel(this.overlay.content, this.overlay);
						$(this.overlay.holder).css({
							left : 105,
							top : 43,
							width : 500,
							height : 370,
							display : "block"
						});
						m.sketchpad.refreshPosition();
						this.overlay.arrow.style.left = "244px";
						this.overlay.fireEvent("open");
						this.overlay.picassoPanel = m;
						f.Status.isPicassoOpen = true
					}
				} else {
					this.overlay.toggle("105px", "43px", "500px", "370px", "244px", "http://tieba.baidu.com/tb/editor/v2/picasso/picasso.html?id=" + this.id, n);
					f.Status.isPicassoOpen = true
				}
			}
			$.stats.hive("toolbar_picasso");
			return [false]
		},
		jumpTo_picasso : function() {
			if (this.hasPicassoAuth()) {
				this.overlay.open("105px", "43px", "500px", "370px", "244px", "http://tieba.baidu.com/tb/editor/v2/picasso/picasso.html?id=" + this.id);
				f.Status.isPicassoOpen = true
			}
			return [false]
		},
		toolbarcmd_cut_screen : function(n) {
			var o = this, m = $.ajax({
				url : "http://tieba.baidu.com/dc/common/imgtbs",
				dataType : "json"
			}), l = window.external.GetNextReqID("id");
			$.stats.hive("toolbar_cutscreen");
			window.cutScreen = function(p, q) {
				if (p != l || !q || !( q = $.parseJSON(q)) || q.result === "error" || !q.content || !q.content.url) {
					return
				}
				o.execCommand("inserthtml", '<img class="BDE_Image" onload="TED.EditorCore.ResizeImage(this);"  src="' + q.content.url + '">');
				o.execCommand("insertlinebreak")
			};
			m.done(function(p) {
				if (p.no == 0) {
					try {
						window.external.StartRequest(l, "bdbrowser.extension.tiebacmdToLibEx", "cutScreen", '{"cmd":"PageSnapStart","fid":"' + o.config.forum_id + '","tbs":"' + p.data.tbs + '"}', window, "")
					} catch(q) {
					}
				}
			});
			return [false]
		},
		toolbar_hovercmd_smiley : function(l) {
			return [false]
		},
		toolbar_hoverendcmd_smiley : function(l) {
			return [false]
		},
		toolbar_hovercmd_image : function(l) {
			return [false]
		},
		toolbar_hoverendcmd_image : function(l) {
			return [false]
		},
		toolbar_hovercmd_music : function(l) {
			return [false]
		},
		toolbar_hoverendcmd_music : function(l) {
			return [false]
		},
		toolbar_hovercmd_flash : function(l) {
			return [false]
		},
		toolbar_hoverendcmd_flash : function(l) {
			return [false]
		},
		toolbar_hovercmd_disableimage : function(l) {
			this.hoveroverlay.open("0px", "43px", "268px", "40px", "13px", "http://tieba.baidu.com/tb/editor/v2/image_noright.html?t=201210161100", l)
		},
		toolbar_hoverendcmd_disableimage : function(l) {
			this.hoveroverlay.close()
		},
		toolbar_hovercmd_picasso : function(l) {
			if (!this.hasPicassoAuth()) {
				if (this.config.no_post_pic) {
					this.hoveroverlay.open("307px", "43px", "250px", "42px", "40px", "http://tieba.baidu.com/tb/editor/v2/picasso/pic_noright.html?t=201111141108", l)
				} else {
					this.hoveroverlay.open("307px", "43px", "290px", "55px", "40px", "http://tieba.baidu.com/tb/editor/v2/picasso/picasso_noright.html?t=201111141108", l)
				}
			}
			return [false]
		},
		toolbar_hoverendcmd_picasso : function(l) {
			if (this.config.picasso == undefined || this.config.picasso == false) {
				this.hoveroverlay.close()
			}
			return [false]
		},
		toolbar_hovercmd_unabled_cut : function(l) {
			this.hoveroverlay.open("350px", "43px", "270px", "52px", "90px", "http://tieba.baidu.com/tb/editor/v2/cut_screen/nosupport.html?t=201210151818", l);
			return [false]
		},
		toolbar_hoverendcmd_unabled_cut : function(l) {
			this.hoveroverlay.close();
			return [false]
		},
		getMusiNum : function() {
			var l = this.getTagNum("embed", this.config.musicClassName);
			if (!this.ua.ie) {
				l += this.getTagNum("img", this.config.musicClassName)
			}
			return l
		},
		getFlashNum : function() {
			var l = this.getTagNum("embed", this.config.flashClassName);
			if (!this.ua.ie) {
				l += this.getTagNum("img", this.config.flashClassName)
			}
			return l
		},
		cmd_insertmusic : function(l) {
			var m = "";
			m = '<img class="BDE_Music" src="' + this.config.rootPath + 'music.png"';
			m += ' title="' + l + '"';
			m += ' width="400" height="95"';
			m += ' data-width="400" data-height="95">';
			this.execCommand("inserthtml", m);
			return [false]
		},
		cmd_insertflash : function(o, r, t, n, m) {
			var p = "";
			var l = 450, q = 500;
			if (o.toLowerCase().indexOf("baidu.com") > -1) {
				q = 480;
				l = 410
			} else {
				if (o.toLowerCase().indexOf("player.video.qiyi.com") > -1) {
					q = 500;
					l = 415
				} else {
					q = 500;
					l = 450
				}
			}
			p = '<img class="BDE_Flash" src="' + this.config.rootPath + 'flash.png"';
			if (r) {
				p += ' data-video_url="' + r + '"'
			}
			if (n) {
				p += ' data-vsrc="' + r + '"';
				p += ' data-pkey="' + n + '"';
				if (m) {
					p += ' data-vpic="' + m + '"'
				} else {
					p += ' data-vpic="null"'
				}
			} else {
				p += ' data-vsrc="null"';
				p += ' data-pkey="null"';
				p += ' data-vpic="null"'
			}
			if (t) {
				p += ' video_mp4_url="' + t + '"'
			}
			p += ' title="' + o + '"';
			p += ' width="219" height="175"';
			p += ' data-width="' + q + '" data-height="' + l + '"/>';
			this.execCommand("inserthtml", p);
			this.execCommand("insertlinebreak");
			return [false]
		},
		img2embed : function(l) {
			return l.replace(/<img[^>]*class="?(?:BDE_Flash|BDE_Music)[^>]*>/gi, function(w) {
				var n = w.replace(/.* title\="?([^\s">]+).*/i, "$1").replace(/&amp;/gi, "&"), o = w.replace(/.* data\-width\="?([^\s">]+).*/i, "$1"), v = w.replace(/.* data\-height\="?([^\s">]+).*/i, "$1"), t = w.replace(/.* class="?([^\s">]+).*/i, "$1"), m = "", q = '<embed allowfullscreen="true" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" scale="noborder"' + (n.toLowerCase().indexOf("http://player.ku6.com") == 0 ? ' flashvars="adss=0"' : " ") + 'src="' + n + '"  class="' + t + '" width="' + o + '" height="' + v + '" ';
				if (t == "BDE_Flash") {
					m = w.replace(/.* data-video_url="?([^\s">]+).*/i, "$1").replace(/&amp;/gi, "&");
					var p = w.replace(/.* data-vsrc="?([^\s">]+).*/i, "$1").replace(/&amp;/gi, "&");
					var r = w.replace(/.* data-pkey="?([^\s">]+).*/i, "$1");
					var u = w.replace(/.* data-vpic="?([^\s">]+).*/i, "$1").replace(/&amp;/gi, "&");
					if (r != "null" && r.length < 40) {
						q += ' vsrc="' + p + '"';
						if (u != "null") {
							q += ' vpic="' + u + '"'
						}
						q += ' pkey="' + r + '"'
					}
				}
				q += " >";
				return q
			})
		},
		quoteContainer : null,
		quote : function(p, l, q) {
			p = parseInt(p);
			if (p > 1) {
				if (this.quoteContainer === null) {
					this.quoteContainer = document.createElement("div");
					this.quoteContainer.className = "editor-quote";
					this.wrapper.insertBefore(this.quoteContainer, this.editAreaWrapper)
				}
				var o = document.getElementById("post_content_" + l).innerHTML.replace(/<img[^>]*>/gi, "[图片]").replace(/<embed[^>]*>/gi, "[视频]").replace(/<br[^>]*>/gi, " ").replace(/<a[^>]*>/gi, "").replace(/<\/a>/gi, "").subByte(270);
				this.quoteContainer.innerHTML = '<blockquote class="quote_change"><fieldset><legend ><a href="javascript:void(0);" onmousedown="return false;" style="font-weight:bold;color:#989898; position:absolute;right:5px; top:12px;text-decoration:none;font-size:15px;line-height:15px;font-weight:bold;font-family:微软雅黑" onclick="TED.Editor.getInstanceById(\'' + this.id + '\').unQuote();Stats.sendRequest(\'fr=tb0_forum&st_mod=pb&st_type=quote&st_value=delete\');" class="close" title="删除引用">╳</a>引用&nbsp;' + q + '&nbsp;(<a href="#' + l + '" style="color:#989898;">' + p + '楼</a>)</legend><p style="margin-left: 5px;padding: 0 5px;width: 505px;" class="quote_content">' + o + "</p></fieldset></blockquote>";
				this.quoteContainer.style.display = "block";
				this.fireEvent("quote", null, [l])
			} else {
				this.unQuote();
				var n = "";
				if (l === "is_p_reply_first") {
					n = "is_p_reply_first"
				} else {
					n = "rp_reply"
				}
				Stats.sendRequest("fr=tb0_forum&st_mod=pb&st_type=quote&st_value=" + n)
			}
			var m = this;
			setTimeout(function() {
				m.focus()
			}, 300)
		},
		unQuote : function() {
			if (this.quoteContainer) {
				this.quoteContainer.style.display = "none"
			}
			this.fireEvent("unquote")
		}
	});
	function e(l, m) {
		e.superclass.call(this);
		this.hovertimer = null;
		this.hoverendtimer = null;
		this.container = l;
		this.enablepicasso = m;
		this.initialize()
	}

	i(e, c, {
		disabled : true,
		initialize : function() {
			this.holder = document.createElement("div");
			this.holder.className = "tb-editor-toolbar tb-editor-toolbar-disabled";
			var m = '<span class="image" data-cmd="image"></span><label></label><span class="flash" data-cmd="flash"></span><label></label><span class="music" data-cmd="music"></span><label></label><span class="smiley" data-cmd="smiley"></span><label></label><span class="picasso" data-cmd="picasso"></span>', l, n = this;
			try {
				l = "baidubrowser.tieba" == window.external.GetVersion("version") ? true : null
			} catch(o) {
				l = null
			}
			if (l) {
				m += '<label></label><span class="cut_screen" data-cmd="cut_screen">'
			} else {
				m += '<label></label><span class="unabled_cut" data-cmd="unabled_cut">'
			}
			this.holder.innerHTML = m;
			this.container.appendChild(this.holder);
			j.addEvent(this.holder, "click", function(q) {
				if (n.disabled) {
					return
				}
				var p = q.target || q.srcElement;
				if (p.tagName.toLowerCase() === "span") {
					n.fireEvent("command", null, [p.getAttribute("data-cmd"), p])
				}
			});
			j.addEvent(this.holder, "mouseover", function(q) {
				if (n.disabled) {
					return
				}
				var p = q.target || q.srcElement;
				if (p.tagName.toLowerCase() === "span") {
					if (n.hoverendtimer) {
						clearTimeout(n.hoverendtimer)
					}
					n.hovertimer = setTimeout(function() {
						n.fireEvent("hovercommand", null, [p.getAttribute("data-cmd"), p])
					}, 800)
				}
			});
			j.addEvent(this.holder, "mouseout", function(q) {
				if (n.disabled) {
					return
				}
				if (n.hovertimer) {
					clearTimeout(n.hovertimer)
				}
				var p = q.target || q.srcElement;
				if (p.tagName.toLowerCase() == "span") {
					n.hoverendtimer = setTimeout(function() {
						n.fireEvent("hoverendcommand", null, [p.getAttribute("data-cmd"), p])
					}, 400)
				}
			})
		},
		disable : function() {
			this.disabled = true;
			this.holder.className = "tb-editor-toolbar tb-editor-toolbar-disalbed"
		},
		enable : function() {
			this.disabled = false;
			this.holder.className = "tb-editor-toolbar";
			if (this.enablepicasso == undefined || this.enablepicasso == false) {
				$(".tb-editor-toolbar .picasso").css("background-position", "12px -293px").css("cursor", "pointer")
			}
		},
		disableInsertImage : function() {
			this.holder.firstChild.setAttribute("data-cmd", "disableimage");
			this.holder.firstChild.className = "image_disabled"
		},
		enableInsertImage : function() {
			this.holder.firstChild.setAttribute("data-cmd", "image");
			this.holder.firstChild.className = "image"
		}
	});
	h(f, k)
})();
function Sketchpad(a, b) {
	this.init(a, $.extend({}, Sketchpad.defaultOptions, b))
}
Sketchpad.template = '<canvas class="sketchpad_bg"></canvas>     <canvas class="sketchpad_result"></canvas>     <canvas class="sketchpad_mask"></canvas>     <textarea class="sketchpad_text_input" style="display: none;"></textarea>';
Sketchpad.defaultOptions = {
	width : 400,
	height : 300,
	fixCanvas : false,
	onhistorychange : function() {
	}
};
Sketchpad.prototype = {
	init : function(a, c) {
		var b = this;
		this.element = $(a);
		var d = $(Sketchpad.template);
		d.filter("canvas").each(function() {
			this.width = c.width;
			this.height = c.height
		});
		this.element.addClass("sketchpad").css({
			width : c.width,
			height : c.height
		}).append(d);
		this.fixCanvas = c.fixCanvas;
		this.history = [];
		this.onhistorychange = c.onhistorychange;
		this.redoStack = [];
		this.clearState = false;
		this.bgCanvas = this.element.find(".sketchpad_bg");
		this.bgContext = this.bgCanvas[0].getContext("2d");
		this.mouseDownHandler = this._mouseDownLineHandler;
		this.mouseUpHandler = this._mouseUpLineHandler;
		this.mouseMoveHandler = this._mouseMoveLineHandler;
		this.initCanvas();
		this.initTextInput();
		this.currentCommand = null;
		this.setPaintType("brush");
		this.setPaintShape("rect");
		this.setLineWidth(3);
		this.setPaintColor("black");
		this.setPaintFontSize(12);
		this.refreshPosition();
		this.element.on("dragover", function(f) {
			f.preventDefault();
			f.stopPropagation()
		});
		this.element[0].addEventListener("drop", function(h) {
			h.preventDefault();
			h.stopPropagation();
			var g = h.dataTransfer.files[0];
			var f = new FileReader();
			f.onload = function(j) {
				var i = new Image();
				i.onload = function() {
					b.setBackgroundImage(i)
				};
				i.src = j.target.result
			};
			f.readAsDataURL(g)
		})
	},
	initTextInput : function() {
		this.textInput = this.element.find(".sketchpad_text_input")
	},
	initCanvas : function() {
		var a = this;
		this.resultCanvas = this.element.find(".sketchpad_result");
		this.resultContext = this.resultCanvas[0].getContext("2d");
		this.maskCanvas = this.element.find(".sketchpad_mask");
		this.maskContext = this.maskCanvas[0].getContext("2d");
		this.maskCanvas.on("click", function(f) {
			if (a.paintType == "text") {
				if (!a.textDrawing) {
					a.textDrawing = true;
					var e = f.clientX - a.offset.left + (window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft);
					var j = f.clientY - a.offset.top + (window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop);
					a.textInput.css({
						left : e,
						top : j
					}).show().focus()
				} else {
					a.textDrawing = false;
					var h = a.textInput.val();
					if (h.length > 0) {
						var d = a.textInput[0].offsetLeft + 1;
						var i = a.textInput[0].offsetTop;
						var g = a.drawText(a.resultContext, h, d, i, a.textInput.innerWidth());
						a._pushHistory(g);
						a.textInput.val("")
					}
					a.textInput.hide()
				}
			}
		});
		this.maskCanvas.on("mousedown", function(d) {
			d.preventDefault();
			a.mouseDownHandler(d)
		});
		var b = function(d) {
			a.mouseUpHandler(d)
		};
		var c = function(d) {
			a.mouseMoveHandler(d)
		};
		$(document).on("mouseup", b).on("mousemove", c);
		a.clearEvents = function() {
			$(document).unbind("mouseup", b).unbind("mousemove", c)
		}
	},
	_mouseDownLineHandler : function(b) {
		var a = this;
		a.drawing = true;
		a.iLastX = b.clientX - a.offset.left + (window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft);
		a.iLastY = b.clientY - a.offset.top + (window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop);
		a.drawPoint(a.resultContext, a.iLastX, a.iLastY, a.lineWidth);
		if (a.currentCommand == null) {
			a.currentCommand = {
				type : "brush",
				path : [],
				color : a.paintColor,
				lineWidth : a.lineWidth,
				clearState : a.clearState,
				startPoint : {
					x : a.iLastX,
					y : a.iLastY,
					diameter : a.lineWidth
				}
			}
		}
	},
	_mouseMoveLineHandler : function(c) {
		var b = this;
		if (b.drawing) {
			var a = c.clientX - b.offset.left + (window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft);
			var e = c.clientY - b.offset.top + (window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop);
			var d = {
				fromX : b.iLastX,
				fromY : b.iLastY,
				toX : a,
				toY : e
			};
			b.drawLine(b.resultContext, d);
			b.currentCommand.path.push(d);
			b.iLastX = a;
			b.iLastY = e
		}
	},
	_mouseUpLineHandler : function(b) {
		var a = this;
		if (a.drawing) {
			a.drawing = false;
			a.iLastX = -1;
			a.iLastY = -1;
			a._pushHistory(a.currentCommand);
			a.currentCommand = null
		}
	},
	_mouseDownShapeHandler : function(b) {
		var a = this;
		a.drawing = true;
		a.iLastX = b.clientX - a.offset.left + (window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft);
		a.iLastY = b.clientY - a.offset.top + (window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop)
	},
	_mouseMoveShapeHandler : function(c) {
		var b = this;
		if (b.drawing) {
			b._clear(b.maskContext);
			var a = c.clientX - b.offset.left + (window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft);
			var d = c.clientY - b.offset.top + (window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop);
			b.currentCommand = b.drawShape(b.maskContext, b.iLastX, b.iLastY, a - b.iLastX, d - b.iLastY)
		}
	},
	_mouseUpShapeHandler : function(b) {
		var a = this;
		if (a.drawing) {
			a.drawing = false;
			a.iLastX = -1;
			a.iLastY = -1;
			a._clear(a.maskContext);
			if (a.currentCommand) {
				a.doCommand(a.currentCommand);
				a._pushHistory(a.currentCommand);
				a.currentCommand = null
			}
		}
	},
	_mouseDownTextHandler : function() {
	},
	_mouseMoveTextHandler : function() {
	},
	_mouseUpTextHandler : function() {
	},
	_pushHistory : function(a) {
		this.history.push(a);
		this.onhistorychange(this.history, this.redoStack)
	},
	drawLine : function(a, b) {
		a.beginPath();
		a.moveTo(b.fromX, b.fromY);
		a.lineTo(b.toX, b.toY);
		a.stroke()
	},
	drawPoint : function(b, a, d, c) {
		b.beginPath();
		b.arc(a, d, c / 2, 0, Math.PI * 2, true);
		b.closePath();
		b.fill()
	},
	drawPath : function(c, f) {
		var d = f.startPoint;
		this.drawPoint(c, d.x, d.y, d.diameter);
		var e = f.path;
		for (var b = 0, a = e.length; b < a; b++) {
			this.drawLine(c, e[b])
		}
	},
	drawRect : function(c, a, e, b, d) {
		c.strokeRect(a, e, b, d);
		return {
			type : "shape",
			shape : "rect",
			x : a,
			y : e,
			width : b,
			height : d,
			color : this.paintColor,
			lineWidth : this.lineWidth
		}
	},
	drawEllipse : function(m, j, i, k, d) {
		var g = 0.5522848;
		var c = (k / 2) * g, a = (d / 2) * g, l = j + k, f = i + d, e = j + k / 2, b = i + d / 2;
		m.beginPath();
		m.moveTo(j, b);
		m.bezierCurveTo(j, b - a, e - c, i, e, i);
		m.bezierCurveTo(e + c, i, l, b - a, l, b);
		m.bezierCurveTo(l, b + a, e + c, f, e, f);
		m.bezierCurveTo(e - c, f, j, b + a, j, b);
		m.closePath();
		m.stroke();
		return {
			type : "shape",
			shape : "ellipse",
			x : j,
			y : i,
			width : k,
			height : d,
			color : this.paintColor,
			lineWidth : this.lineWidth
		}
	},
	drawText : function(p, m, i, h, k, r) {
		r = r || this.fontSize;
		var g = m.split("");
		var j = r * 1.2;
		var e = h;
		e += r;
		for (var b = 0, c = g.length, q = ""; b < c; b++) {
			var a = g[b];
			if (a == "\n") {
				p.fillText(q, i, e);
				q = "";
				e += j
			} else {
				var d = q + a;
				var f = p.measureText(d);
				var o = f.width;
				if (o > k) {
					p.fillText(q, i, e);
					q = a;
					e += j
				} else {
					q = d
				}
			}
		}
		p.fillText(q, i, e);
		return {
			type : "text",
			x : i,
			y : h,
			text : m,
			maxWidth : k,
			color : this.paintColor,
			fontSize : r
		}
	},
	setPaintType : function(a) {
		this.paintType = a;
		if (a == "shape") {
			this.mouseDownHandler = this._mouseDownShapeHandler;
			this.mouseUpHandler = this._mouseUpShapeHandler;
			this.mouseMoveHandler = this._mouseMoveShapeHandler
		} else {
			if (a == "brush") {
				this.mouseDownHandler = this._mouseDownLineHandler;
				this.mouseUpHandler = this._mouseUpLineHandler;
				this.mouseMoveHandler = this._mouseMoveLineHandler
			} else {
				this.mouseDownHandler = this._mouseDownTextHandler;
				this.mouseUpHandler = this._mouseUpTextHandler;
				this.mouseMoveHandler = this._mouseMoveTextHandler
			}
		}
		if (a == "text") {
			this.element.css("cursor", "text")
		} else {
			this.element.css("cursor", "crosshair")
		}
	},
	setClear : function(a) {
		this.clearState = a;
		if (a) {
			this.resultContext.globalCompositeOperation = "destination-out"
		} else {
			this.resultContext.globalCompositeOperation = "source-over"
		}
	},
	_setPaintColor : function(a) {
		this.resultContext.strokeStyle = a;
		this.maskContext.strokeStyle = a;
		this.resultContext.fillStyle = a;
		this.maskContext.fillStyle = a;
		this.textInput.css("color", a)
	},
	setPaintColor : function(a) {
		this._setPaintColor(a);
		this.paintColor = a
	},
	_setLineWidth : function(a) {
		this.resultContext.lineWidth = a;
		this.maskContext.lineWidth = a;
		this.resultContext.lineCap = "round";
		this.maskContext.lineCap = "round"
	},
	setLineWidth : function(a) {
		this._setLineWidth(a);
		this.lineWidth = a
	},
	setPaintShape : function(a) {
		if (a == "rect") {
			this.drawShape = this.drawRect
		} else {
			if (a == "ellipse") {
				this.drawShape = this.drawEllipse
			}
		}
	},
	setBackgroundImage : function(c) {
		if (this.fixCanvas) {
			var b = this.width / this.height;
			var d = null;
			var a = 0, e = 0;
			if (c.width > this.width || c.height > this.height) {
				if ((c.width / c.height) > b) {
					d = c.width / this.width;
					c.width = this.width;
					c.height = c.height / d
				} else {
					d = c.height / this.height;
					c.height = this.height;
					c.width = c.width / d
				}
			}
			a = (this.width - c.width) / 2;
			e = (this.height - c.height) / 2;
			this._clear(this.bgContext);
			this.bgContext.drawImage(c, a, e, c.width, c.height)
		} else {
			this.bgCanvas.attr({
				width : c.width,
				height : c.height
			});
			this.resultCanvas.attr({
				width : c.width,
				height : c.height
			});
			this.maskCanvas.attr({
				width : c.width,
				height : c.height
			});
			this.element.css({
				width : c.width,
				height : c.height
			});
			this.width = c.width;
			this.height = c.height;
			this.bgContext.drawImage(c, 0, 0)
		}
		this.setPaintColor(this.paintColor);
		this.setLineWidth(this.lineWidth);
		this.setPaintFontSize(this.fontSize)
	},
	removeBackgroundImage : function() {
		this._clear(this.bgContext)
	},
	_setPaintFontSize : function(a) {
		this.resultContext.font = a + "px '宋体'";
		this.textInput.css("fontSize", a)
	},
	setPaintFontSize : function(a) {
		this._setPaintFontSize(a);
		this.fontSize = a
	},
	doCommand : function(a) {
		this.resultContext.save();
		this.resultContext.strokeStyle = a.color;
		this.resultContext.fillStyle = a.color;
		if (a.type == "text") {
			this.resultContext.font = a.fontSize + "px '宋体'"
		} else {
			this.resultContext.lineWidth = a.lineWidth
		}
		if (a.type == "shape" && a.shape == "rect") {
			this.resultContext.strokeRect(a.x, a.y, a.width, a.height)
		} else {
			if (a.type == "shape" && a.shape == "ellipse") {
				this.drawEllipse(this.resultContext, a.x, a.y, a.width, a.height)
			} else {
				if (a.type == "text") {
					this.drawText(this.resultContext, a.text, a.x, a.y, a.maxWidth, a.fontSize)
				} else {
					if (a.type == "brush") {
						if (a.clearState) {
							this.resultContext.globalCompositeOperation = "destination-out"
						} else {
							this.resultContext.globalCompositeOperation = "source-over"
						}
						this.drawPath(this.resultContext, a)
					}
				}
			}
		}
		this.resultContext.restore()
	},
	_clear : function(a) {
		a.clearRect(0, 0, this.width, this.height)
	},
	clear : function() {
		this._clear(this.resultContext);
		this.history.length = 0;
		this.redoStack.length = 0;
		this.onhistorychange(this.history, this.redoStack)
	},
	undo : function() {
		this._clear(this.resultContext);
		this.redoStack.push(this.history.pop());
		this.onhistorychange(this.history, this.redoStack);
		for (var b = 0, a = this.history.length; b < a; b++) {
			this.doCommand(this.history[b])
		}
	},
	redo : function() {
		var a = this.redoStack.pop();
		if (a != null) {
			this.doCommand(a);
			this._pushHistory(a)
		}
	},
	destroy : function() {
		this.clearEvents();
		this.element.html("")
	},
	refreshPosition : function() {
		this.offset = this.resultCanvas.offset();
		this.width = this.resultCanvas.width();
		this.height = this.resultCanvas.height()
	},
	getResult : function(a) {
		a = a || "image/png";
		return this.resultCanvas[0].toDataURL(a)
	},
	_dataURLtoBlob : function(d, h) {
		var c = atob(d.split(",")[1]);
		var b = d.split(",")[0].split(":")[1].split(";")[0];
		var j = new ArrayBuffer(c.length);
		var a = new Uint8Array(j);
		for (var e = 0; e < c.length; e++) {
			a[e] = c.charCodeAt(e)
		}
		var f = (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder);
		var g = new f();
		g.append(j);
		return g.getBlob(b)
	},
	getResultAsBlob : function(a) {
		a = a || "image/png";
		return this._dataURLtoBlob(this.getResult(), a)
	}
};
function PicassoPanel(a, b) {
	this.init(a);
	this.overlay = b
}
PicassoPanel.prototype = {
	init : function(b) {
		var c = this;
		c.container = $(b);
		c.container.html(PicassoPanel.template);
		c.currentColor = "#ED2329";
		c.brushType = "brush";
		var a = c.container.find(".tb_picasso_content");
		this.sketchpad = new Sketchpad(a, {
			fixCanvas : true,
			onhistorychange : function(e, d) {
				if (e.length == 0) {
					c.undoButton.prop("disabled", true);
					c.clearButton.prop("disabled", true)
				} else {
					c.undoButton.prop("disabled", false);
					c.clearButton.prop("disabled", false)
				}
				if (d.length == 0) {
					c.redoButton.prop("disabled", true)
				} else {
					c.redoButton.prop("disabled", false)
				}
			}
		});
		this.sketchpad.setPaintColor("#ED2329");
		c.container.find(".color_panel").on("click", "div", function() {
			var d = this.style.backgroundColor;
			$(this).parent().siblings(".focus").removeClass("focus").end().addClass("focus");
			c.currentColor = d;
			if (c.brushType == "brush") {
				c.sketchpad.setPaintColor(d)
			}
		});
		c.brushButtons = c.container.find(".brush_button");
		c.brushButtons.click(function() {
			c.brushButtons.filter(".focus").removeClass("focus");
			var d = $(this).addClass("focus");
			var f = d.data("brushType");
			var e = d.text() - 0;
			c.sketchpad.setLineWidth(e);
			if (f == "eraser") {
				c.sketchpad.setClear(true);
				c.sketchpad.setPaintColor("black")
			} else {
				c.sketchpad.setClear(false);
				c.sketchpad.setLineWidth(e);
				c.sketchpad.setPaintColor(c.currentColor)
			}
			c.brushType = f
		});
		c.deleteBgButton = c.container.find(".sketchpad_remove_bg").click(function() {
			c.sketchpad.removeBackgroundImage();
			c.deleteBgButton.addClass("disabled")
		});
		c.undoButton = c.container.find(".sketchpad_undo").click(function() {
			c.sketchpad.undo()
		});
		c.redoButton = c.container.find(".sketchpad_redo").click(function() {
			c.sketchpad.redo()
		});
		c.clearButton = c.container.find(".sketchpad_clear").click(function() {
			c.sketchpad.clear()
		});
		c.container.find(".sketchpad_finish").click(function() {
			if (c.sketchpad.history.length == 0) {
				c.messagePanel.show();
				return
			}
			var g = c.container.find(".sketchpad_sign")[0];
			var e = g.getContext("2d");
			e.fillStyle = "#EEEEEE";
			e.fillRect(0, 0, 416, 335);
			e.fillStyle = "#FFFFFF";
			e.fillRect(8, 8, 400, 300);
			e.drawImage(c.sketchpad.bgCanvas[0], 8, 8, 400, 300);
			e.drawImage(c.sketchpad.resultCanvas[0], 8, 8, 400, 300);
			var d = "By " + PageData.user.name;
			var f = e.measureText(d);
			e.font = "12px '宋体'";
			e.fillStyle = "black";
			e.fillText(d, 400 - f.width, 325);
			e.fillText("贴吧涂鸦", 8, 325);
			c._uploadImage(g)
		});
		c.container.find(".sketchpad_image_input").change(function() {
			var f = this;
			if (f.files.length > 0) {
				var e = f.files[0];
				if (/^image/.test(e.type)) {
					var d = new FileReader();
					d.onload = function(h) {
						var g = new Image();
						g.onload = function() {
							c.sketchpad.setBackgroundImage(g);
							c.deleteBgButton.removeClass("disabled")
						};
						g.src = h.target.result
					};
					d.readAsDataURL(e)
				}
			}
		});
		c.messagePanel = c.container.find(".picasso_message");
		c.messagePanel.find(".picasso_message_apply").click(function() {
			c.messagePanel.hide()
		});
		if (!window.FlashImageLoader) {
			$.JsLoadManager.use("http://static.tieba.baidu.com/tb/static-frs/component/sign_shai/flash_image_loader.js")
		}
	},
	_getTbs : function(b) {
		var a = this;
		$.ajax({
			url : "http://tieba.baidu.com/dc/common/imgtbs",
			dataType : "json",
			success : function(c) {
				if (c && c.data && c.data.tbs && b && _.isFunction(b)) {
					b(c.data.tbs)
				}
			}
		})
	},
	_uploadImage : function(b) {
		var a = this;
		a._getTbs(function(d) {
			var c = b.toDataURL().replace(/^.*base64\,/, "");
			window.FlashImageLoader.bind("uploadComplete", a._uploadedHandler, a);
			window.FlashImageLoader.uploadBase64("http://upload.tieba.baidu.com/upload/pic", c, {
				tbs : d
			})
		})
	},
	_uploadedHandler : function(a, d) {
		var c = $.json.decode(d);
		if (c.error_code != 0) {
			alert("图片上传错误，请重试")
		} else {
			var b = c.info.pic_id_encode;
			var e = "http://imgsrc.baidu.com/forum/pic/item/" + b + ".jpg";
			window.rich_postor._editor.execCommand("insertimage", e, 5);
			this.sketchpad.destroy();
			window.FlashImageLoader.unbind("uploadComplete", this._uploadedHandler);
			this.overlay.close(true)
		}
	},
	destroy : function() {
		this.sketchpad.destroy();
		if (window.FlashImageLoader) {
			window.FlashImageLoader.unbind("uploadComplete", this._uploadedHandler)
		}
		this.container.html("")
	}
};
PicassoPanel.template = '<div class="tb_picasso_vcanvas">    <div class="tb_picasso_content"></div>    <div class="sketchpad_v_toolbar">        <ul>            <li>                <ul class="color_panel clearfix">                    <li><div style="background: #FFFFFF;border: 1px solid #FFFFFF;"></div></li>                    <li><div style="background: #B5B5B5;border: 1px solid #B5B5B5;"></div></li>                    <li><div style="background: #F79579;border: 1px solid #F79579;"></div></li>                    <li><div style="background: #FDC58B;border: 1px solid #FDC58B;"></div></li>                    <li><div style="background: #80C99C;border: 1px solid #80C99C;"></div></li>                    <li><div style="background: #000000;border: 1px solid #000000;"></div></li>                    <li><div style="background: #626262;border: 1px solid #626262;"></div></li>                    <li class="focus"><div style="background: #ED2329;border: 1px solid #ED2329;"></div></li>                    <li><div style="background: #F79323;border: 1px solid #F79323;"></div></li>                    <li><div style="background: #00A451;border: 1px solid #00A451;"></div></li>                    <li><div style="background: #6CCEF7;border: 1px solid #6CCEF7;"></div></li>                    <li><div style="background: #F499C0;border: 1px solid #F499C0;"></div></li>                    <li><div style="background: #00ACEE;border: 1px solid #00ACEE;"></div></li>                    <li><div style="background: #EC008B;border: 1px solid #EC008B;"></div></li>                    <li><div style="background: #D8003D;border: 1px solid #D8003D;"></div></li>                </ul>            </li>            <li class="sketchpad_button_brush">                <ul class="sketchpad_brush_panel clearfix">                    <li class="brush_button brush_small" data-brush-type="brush">1</li>                    <li class="brush_button brush_middle focus" data-brush-type="brush">3</li>                    <li class="brush_button brush_big" data-brush-type="brush">5</li>                </ul>            </li>            <li class="sketchpad_button_eraser">                <ul class="sketchpad_brush_panel clearfix">                    <li class="brush_button brush_small" data-brush-type="eraser">1</li>                    <li class="brush_button brush_middle" data-brush-type="eraser">3</li>                    <li class="brush_button brush_big" data-brush-type="eraser">5</li>                </ul>            </li>            <li>                <div class="sketchpad_bg_input">                    <button type="button" class="sketchpad_add_bg">添加背景</button>                    <input type="file" class="sketchpad_image_input" />                </div>            </li>            <li>                <button type="button" class="sketchpad_remove_bg disabled">删除背景</button>            </li>        </ul>    </div>    <div class="sketchpad_h_toolbar">        <button type="button" class="sketchpad_undo" disabled="disabled">上一步</button>        <button type="button" class="sketchpad_redo" disabled="disabled">下一步</button>        <button type="button" class="sketchpad_clear" disabled="disabled">清空</button>        <button type="button" class="sketchpad_finish">画好了</button>    </div>    <canvas class="sketchpad_sign" width="416" height="335"  style="display: none;" ></canvas>    <div class="picasso_message" style="display: none;">        <p>尚未作画，白纸一张！&gt;.&lt;</p>        <p><button type="button" class="picasso_message_apply">确定</button></p>    </div></div>';
var FORUM_POST_PREFIX = "/f/commit/";
var FORUM_POST_URL = {
	threadAdd : FORUM_POST_PREFIX + "thread/add",
	postAdd : FORUM_POST_PREFIX + "post/add",
	threadVoteAdd : FORUM_POST_PREFIX + "vote/add ",
	forumCreate : FORUM_POST_PREFIX + "forum/create",
	threadDelete : FORUM_POST_PREFIX + "thread/delete",
	postDelete : FORUM_POST_PREFIX + "post/delete",
	goodAdd : FORUM_POST_PREFIX + "thread/good/add",
	goodCancel : FORUM_POST_PREFIX + "thread/good/cancel",
	threadTopAdd : FORUM_POST_PREFIX + "thread/top/add",
	threadTopCancel : FORUM_POST_PREFIX + "thread/top/cancel",
	threadTopicAdd : "/zhibo/commit/add",
	threadTopicCancel : "/zhibo/commit/set",
	get_tbs : "/dc/common/tbs"
};
var FORUM_ERROR_INFO = {
	24 : "登录错误，可能输入的用户名和口令不正确，请单击确定重试",
	102 : "注册用户email非法",
	103 : "注册用户个人信息非法",
	107 : "用户名或自我介绍的文字中含有一些不恰当的词汇，请您重新提交注册信息",
	108 : "用户名为空",
	266 : "添加好友重复",
	205 : "对不起，您没有此修改权限，请到您注册的系统中修改信息",
	305 : "添加词语到达最大值",
	306 : "添加词语到达最大值",
	309 : "添加词语到达最大值",
	260 : "讨论区已满三个吧主",
	261 : "该用户已经是该吧的吧主",
	262 : "该用户已经是三个贴吧的吧主",
	263 : "用户指定好友名不存在",
	264 : "用户好友数到达最大",
	265 : "用户未登陆",
	267 : "添加收藏夹到最大值",
	300 : "达到系统最大过滤用户容量",
	301 : "达到系统最大过滤IP容量",
	302 : "管理员指定的关键字不存在贴吧",
	303 : "管理员指定的用户名不存在",
	304 : "管理员指定的IP有误",
	316 : "操作失败！该IP地址为手机上网使用，无法直接封禁。",
	401 : "根据forum_id 不能得到讨论名",
	402 : "得到的贴吧名太长",
	870 : "楼高人多，请勿推倒",
	871 : "楼高慎推，冷静会儿吧",
	872 : "精品来的不易，请勿擅自删除",
	874 : "吧刊来得不易，请勿擅自删除"
};
var Thread_add_result = {
	resultNo : 0,
	fid : "",
	tid : "",
	vid : "",
	sign : "",
	bdauditreason : 0,
	bdQueryWordEnc : "",
	autoMsg : "",
	is_login : 0,
	init : function(a) {
		if (Thread_add_result && a.data && typeof (a.data) == "object") {
			for (var b in a.data) {
				Thread_add_result[b] = a.data[b]
			}
		}
		Thread_add_result.resultNo = a.no
	},
	isNeedWaitForCheck : function() {
		var a = false;
		switch(this.resultNo) {
			case 9:
			case 20:
			case 23:
				a = true;
				break;
			default:
				break
		}
		return a
	},
	isNeedBindPhone : function() {
		return this.resultNo == 4010
	},
	Action_FocusTitle : "focusTitle",
	Action_FocusContent : "focusContent",
	Action_ClearYZM : "clearYZM",
	Action_FocusUrl : "focusUrl",
	Action_GoToHead : "goToHead",
	Action_FlushAndGoToHead : "flushAndGoToHead",
	getActionType : function() {
		var a = "";
		switch(this.resultNo) {
			case 10:
			case 14:
			case 501:
			case 15:
			case 36:
			case 41:
			case 42:
			case 43:
			case 46:
			case 9001:
				a = this.Action_FocusContent;
				break;
			case 11:
			case 20:
				a = this.Action_FocusTitle;
				break;
			case 17:
			case 0:
				a = this.Action_FlushAndGoToHead;
				break;
			case 22:
			case 9:
			case 23:
			case 119:
			case 44:
			case 100:
			case 703:
			case 704:
			case 705:
				a = this.Action_GoToHead;
				break;
			case 38:
			case 39:
			case 40:
				a = this.Action_ClearYZM;
				break;
			case 1120:
			case 1121:
				a = this.Action_FocusUrl;
				break;
			default:
				break
		}
		return a
	},
	getMessage : function() {
		var a = "", b = null;
		if (this.resultNo >= 901 && this.resultNo <= 950) {
			return Thread_add_result.autoMsg
		}
		if (b == null) {
			b = (PageData.forum) ? PageData.forum.id : null
		}
		if (b == null) {
			b = PageData.forum_id
		}
		if (b == null) {
			b = PageData.forumID
		}
		if (b == null) {
			b = good_add_data.fid ? good_add_data.fid : null
		}
		switch(this.resultNo) {
			case 10:
				a = "贴子内容包含太少的文字";
				break;
			case 11:
				a = "贴子标题和内容太长";
				break;
			case 12:
				if (b != null) {
					a = "操作失败，您的账号因违规操作而被封禁&nbsp;&nbsp;<a href='/upc/userinfo?fid=" + b + '\' target="_blank">查看封禁信息</a>'
				} else {
					a = "操作失败"
				}
				break;
			case 13:
				if (b != null) {
					a = "操作失败，您的网络地址由于非法操作被封<br/><a href='/upc/userinfo?fid=" + b + '\' target="_blank">查看封禁信息</a>'
				} else {
					a = "您的网络地址由于非法操作被封 "
				}
				break;
			case 14:
				a = "您发布的贴子已经存在";
				break;
			case 501:
			case 15:
				a = "请不要发表含有不适当内容的留言<br>请不要发表广告贴";
				break;
			case 16:
				a = "对不起，您所输入的贴吧不存在。由于系统升级维护，新建贴吧功能暂停，希望得到您的谅解！";
				break;
			case 19:
			case 200:
			case 201:
			case 202:
				a = "您的用户名或者密码填写有误，请确认后再发表";
				break;
			case 20:
				a = "您发表的贴子的标题或正文包含太少的文字，请修改后再发表";
				break;
			case 17:
				a = "本吧当前只能浏览，不能发贴！";
				break;
			case 18:
			case 21:
				a = "其他未知原因";
				break;
			case 22:
				a = "您发表的贴子已经成功提交，由于特殊原因我们需要核实该贴内容是否含有不良信息，我们会在10分钟内确认，请您耐心等待！";
				break;
			case 9:
				a = this.getCheckMessage(this.bdauditreason);
				break;
			case 33:
				if (Thread_add_result.is_login == 1) {
					a = "您发贴太快了:) 请稍后再发"
				} else {
					a = "您发贴速度太快了。为了减少恶意灌水和广告贴，系统对匿名发贴进行严格的控制，登录用户不受影响"
				}
				break;
			case 34:
				if (Thread_add_result.is_login == 1) {
					a = "您说话太快了:) 请先停下来喝杯茶吧，或者可以去别的吧看看哦，一定会发现还有您感兴趣的话题"
				} else {
					a = "您发贴速度太快了。为了减少恶意灌水和广告帖，系统对匿名发贴进行严格的控制，登录用户不受影响"
				}
				break;
			case 35:
				if (Thread_add_result.is_login == 1) {
					a = "您。。。！"
				} else {
					a = "您发贴速度太快了。为了减少恶意灌水和广告贴，系统对匿名发贴进行严格的控制，登录用户不受影响"
				}
				break;
			case 36:
				a = "请不要发广告贴！";
				break;
			case 37:
				a = "您已尝试提交多次了，请返回后刷新页面，方可重新发贴";
				break;
			case 38:
				a = "验证码超时，请重新输入";
				break;
			case 39:
				a = "由于您多次输错验证码，请您返回后刷新页面，方可重新发贴";
				break;
			case 40:
				a = "验证码输入错误，请您返回后重新输入";
				break;
			case 41:
				a = "您的贴子可能包含不合适的内容，请您确定后再提交";
				break;
			case 42:
				a = "您的发贴行为被系统认为有发广告嫌疑，请您稍后再发";
				break;
			case 43:
				a = "您的发贴行为或贴子内容有广告或不合适的特征，请您确定后再发送";
				break;
			case 23:
				a = "您的贴子已经成功提交，但需要系统审核通过后才能建立贴吧";
				break;
			case 119:
				a = "对不起，本主题的回复数已经达到上限，感谢您的参与，欢迎您浏览本吧的其它主题";
				break;
			case 1120:
				a = "抱歉，您输入的图片、视频链接地址错误，您可以点击<a href='http://www.baidu.com/search/post_img.html' target='_blank'>查看相关帮助</a>或返回修改";
				break;
			case 1121:
				a = "抱歉，视频服务升级中，您暂时无法发表带有视频的贴子，给您带来的不便请原谅";
				break;
			case 44:
				a = "对不起，本吧暂时限制部分用户发表主题贴子，您可以浏览或回复本吧其它内容，给您带来不便希望得到您的谅解。";
				break;
			case 100:
				a = "对不起，本吧暂时限制部分用户使用完整的贴吧功能，您可以浏览本吧其它内容，给您带来不便希望得到您的谅解。";
				break;
			case 701:
				a = "为了减少恶意灌水和广告帖，本吧不允许未登录用户发贴，登录用户不受影响，给您带来的不便深表歉意";
				break;
			case 702:
				a = "为了减少恶意灌水和广告帖，本吧限制部分用户发贴，给您带来的不便深表歉意";
				break;
			case 703:
				a = "为了减少恶意灌水和广告帖，本吧被设置为仅本吧会员才能发贴，给您带来的不便深表歉意。<a href='/f?kw=" + this.bdQueryWordEnc + "#1' target=_blank>点此申请加入</a>本吧会员";
				break;
			case 704:
				a = "为了减少恶意灌水和广告帖，本吧被设置为仅本吧管理团队才能发贴，给您带来的不便深表歉意";
				break;
			case 705:
				a = "本吧当前只能浏览，不能发贴！";
				break;
			case 706:
				a = "抱歉，本贴暂时无法回复。";
				break;
			case 45:
				a = "抱歉，您提交的贴吧名称含特殊字符，目前无法创建，推荐您使用汉字、字母或数字作为贴吧名称";
				break;
			case 46:
				a = "抱歉，您的贴子过长，无法正常提交。建议您精简或分段后重新提交，谢谢!";
				break;
			case 800:
				break;
			case 801:
				break;
			case 802:
				break;
			case 803:
				break;
			case 804:
				break;
			case 805:
				break;
			case 806:
				break;
			case 807:
				break;
			case 808:
				break;
			case 809:
				break;
			case 814:
				break;
			case 815:
				a = "抱歉，您已退出登录或未购买音乐道具，请刷新页面重试";
				break;
			case 900:
				a = "为抵御挖坟危害，本吧吧主已放出贴吧神兽--超级静止蛙，本贴暂时无法回复。";
				break;
			case 961:
				a = "发贴失败，您输入的图片地址有错误，请检查更正后再次发布：）";
				break;
			case 9001:
				a = "由于匿名状态或本吧设置，无法发表带有图片的主题。";
				break;
			case 2100:
				a = "内容含有高级字体效果，保持连续签到就能使用哦~~";
				break;
			case 4010:
				a = "您的账号存在安全风险暂不能发贴，请先进行手机绑定后再发贴吧。";
				break;
			default:
				a = "未知错误";
				break
		}
		return a
	},
	getCheckMessage : function(b) {
		var a = "";
		switch(b) {
			case -61:
				a = "您的贴子已经成功提交，但为了保证贴子质量，本吧所发的贴子待系统审核通过后才能显示，请您耐心等待";
				break;
			case -62:
				a = "您的贴子已经成功提交，但为了保证贴子质量，本吧贴图的贴子需要审核通过后才能显示，请您耐心等待";
				break;
			case -74:
			case -75:
			case -60:
				a = "您发表的贴子已经成功提交，但系统需要核实该贴子内容是否含有不良信息，贴子在审核通过后才能显示，请您耐心等待";
				break;
			case -70:
				a = "您的贴子已经成功提交，但为了控制广告贴，需要通过审核后才能发布。登陆署名发贴不受此限制。";
				break;
			case -71:
				a = "您发表的帖子太长了。为了防止灌水，需系统审核后才能显示，请稍后查看";
				break;
			default:
				a = "您发表的贴子已经成功提交，但系统需要核实该贴子内容是否含有不良信息，贴子在审核通过后才能显示，请您耐心等待";
				break
		}
		return a
	}
};
var CaptchaNew = function(c) {
	this.initialized = false;
	this._option = c;
	var b = new Date().valueOf();
	this._dom = {
		c_input_id : "captcha" + b,
		c_tip : "tip" + b,
		c_content : "c_content" + b,
		c_error : "c_error" + b,
		img_ele : "img" + b,
		c_img_con : "c_i_c" + b,
		a_img : "a" + b,
		listen_vcode : "lv" + b,
		audio_img : "ai" + b,
		captcha_audio : "ca" + b
	};
	var a = this;
	a.initHtml();
	$("#" + this._dom.c_input_id).blur(function() {
		$(this).removeClass("edit_field_focus");
		a.reset()
	});
	$("#" + this._dom.c_input_id).focus(function() {
		$(this).addClass("edit_field_focus");
		if (a.initialized === false) {
			a.init();
			a.initialized = true
		}
		var d = $("#" + a._dom.c_error);
		d.hide()
	})
};
CaptchaNew.prototype.initHtml = function() {
	var a = this._option;
	var b = '<div class="clearfix" style="padding-top:1px;"><div style="float:left;"><input  id="' + this._dom.c_input_id + '" class="captcha_input_normal" style="ime-mode:disabled " autocomplete="off" size="10" maxlength="10"></div>';
	b += '<div id="' + this._dom.c_content + '" style="float:left;display:none;margin-top: -9px;"></div></div>';
	b += '<div id="' + this._dom.c_tip + '">请点击后输入验证码</div><div id="' + this._dom.c_error + '" class="postErrorVCode"></div>';
	$("#" + this._option._container_ele).html(b)
};
CaptchaNew.prototype.changeContent = function(b) {
	var a = this._option;
	if (b == "loginUser") {
		if (Captcha_requirement.answer.showShenshou == 1 && Captcha_requirement.answer.open_by_spam != 1) {
			$("#" + this._dom.c_tip).html("为抵御爆吧挖坟，吧主设置本吧" + Captcha_requirement.answer.shenshou_lv + "级以下用户暂时需要输入中文验证码")
		} else {
			$("#" + this._dom.c_tip).html("&nbsp;请点击后输入验证码")
		}
	} else {
		if (Captcha_requirement.answer.showShenshou == 1 && Captcha_requirement.answer.open_by_spam != 1) {
			$("#" + this._dom.c_tip).html("为抵御爆吧挖坟，吧主设置本吧" + Captcha_requirement.answer.shenshou_lv + "级以下用户暂时需要输入中文验证码")
		} else {
			$("#" + this._dom.c_tip).html(" 请点击后输入验证码，匿名发贴需要输入验证码")
		}
	}
};
CaptchaNew.prototype.getAudio = function() {
	this._option._need_update = false;
	var c = this._dom;
	document.getElementById(c.audio_img).style.display = "";
	var a = document.getElementById(c.captcha_audio);
	var b = this._option._audio_url + this._option.sign_str + "&t=" + Math.random();
	if (!document.all) {
		a.innerHTML = '<embed src="' + b + '" name="MediaPlayer" type="video/x-ms-wmv" autostart="1" showcontrols="1" allowscan="1" playcount="1" enablecontextmenu="0" height="0" width="0"></object>'
	} else {
		a.innerHTML = '<object height=0 width=0 classid=CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6><param name="AutoStart" value="1"><param NAME="url" value="' + b + '"><param name="PlayCount" value="1">'
	}
	document.getElementById(c.c_input_id).focus()
};
CaptchaNew.prototype._getData = function() {
	Captcha_requirement.antiProcess();
	var b = Captcha_requirement.getVcodeUrl() + "&t=" + Math.random();
	var a = this;
	$.ajax({
		url : b,
		dataType : "json",
		success : function(d) {
			var c = d.data;
			a._option.sign_str = c.vcodestr
		},
		async : false
	})
};
CaptchaNew.prototype._validCaptcha = function() {
	var b = document.getElementById(this._dom.c_input_id);
	var c = document.getElementById(this._dom.c_error);
	var a = b.value;
	Captcha_requirement.antiProcess();
	if (Captcha_requirement.need_captcha == 1) {
		if (a == "" || a == null) {
			c.innerHTML = "验证码不能为空，请输入验证码";
			c.style.display = "block";
			b.focus();
			return false
		}
	}
	return true
};
CaptchaNew.prototype.showErrorTip = function(b) {
	var a = document.getElementById(this._dom.c_error);
	a.innerHTML = b;
	a.style.display = "block"
};
CaptchaNew.prototype.getInputValue = function() {
	return $("#" + this._dom.c_input_id).val()
};
CaptchaNew.prototype.changeYImg = function(a) {
	var b = a;
	b.src = "http://static.tieba.baidu.com/tb/img/errorYimg.jpg"
};
CaptchaNew.prototype.init = function() {
	var a = this;
	if (!this._option._need_update) {
		return
	}
	this._option._need_update = false;
	this._getData();
	var d = document.getElementById(this._dom.img_ele);
	var b = this._option._img_url + this._option.sign_str + "&t=" + Math.random();
	if (!d) {
		var c = document.getElementById(this._dom.c_img_con);
		c.innerHTML = '<img  id="' + this._dom.img_ele + '" src="' + b + '" style="cursor: pointer;">';
		$(c).find("img").click(function() {
			a.reload()
		})
	} else {
		d.src = b
	}
	$("#" + this._dom.c_content).show()
};
CaptchaNew.prototype.reload = function() {
	this.reset();
	this.init()
};
CaptchaNew.prototype.updateImage = function() {
	this._option._need_update = false;
	var b = document.getElementById(this._dom.c_input_id);
	b.value = "";
	b.focus();
	var a = this._option._img_url + this._option.sign_str + "&t=" + Math.random();
	var c = document.getElementById(this._dom.img_ele);
	c.src = a
};
CaptchaNew.prototype.show = function() {
	$("#" + this._option._container_ele).show();
	var d = document.getElementById(this._dom.c_content);
	if (d.innerHTML != "") {
		return
	}
	var f = this._dom;
	var c = '<table style="width:auto;"><tr><td id="' + f.c_img_con + '"></td><td valign="bottom">&nbsp;&nbsp;<a style="cursor:pointer;" href="" id="' + f.a_img + '" >看不清?</a>&nbsp;<a style="cursor:pointer;" href="" id="' + f.listen_vcode + '"  >收听验证码</a></td><td valign="bottom"><img id="' + f.audio_img + '" src="http://tieba.baidu.com/tb/img/audio.gif" style="display:none;vertical-align:top;margin-bottom:1px;"><span id="' + f.captcha_audio + '"></span></td></tr></table>';
	d.innerHTML = c;
	var a = this;
	$("#" + this._dom.a_img).click(function() {
		a.reload();
		return false
	});
	$("#" + f.listen_vcode).click(function() {
		a.getAudio();
		return false
	});
	if (Captcha_requirement.answer.showShenshou == 1 && document.getElementById(f.c_tip)) {
		if (Captcha_requirement.answer.open_by_spam == 1) {
			document.getElementById(f.c_tip).innerHTML = "&nbsp;请点击后输入验证码"
		} else {
			document.getElementById(f.c_tip).innerHTML = "&nbsp;为抵御爆吧挖坟，吧主设置本吧" + Captcha_requirement.answer.shenshou_lv + "级以下用户暂时需要输入中文验证码"
		}
		var b = document.getElementById(f.c_input_id);
		var e = document.getElementById(f.listen_vcode);
		if (b) {
			b.style.imeMode = "active"
		}
		if (e) {
			e.style.display = "none"
		}
	}
};
CaptchaNew.prototype.hide = function() {
	$("#" + this._option._container_ele).hide();
	$("#" + this._dom.c_content).hide();
	$("#" + this._dom.c_input_id).val("");
	$("#" + this._dom.c_error).html("");
	$("#" + this._dom.c_error).hide()
};
CaptchaNew.prototype.reset = function() {
	this._option._need_update = true
};
var SignNameApply = {
	fillPanelId : "signNamePanel",
	getUrl : "/f/user/sign_list?t=" + new Date().getTime().toString(36),
	isFirst : true,
	isUsed : 0,
	data : {},
	template : function() {
		var b = '<div id="signNameWrapper">';
		b += '<input type="checkbox" id="useSignName" name="useSignName"><label for="useSignName">使用签名档</label>&nbsp;';
		b += '<span id="signNameShow"' + ((this.isUsed == 0) ? 'style="display:none;"' : "") + ">";
		if (this.data.signs.length > 0) {
			b += '<select id="sign_id" name="sign_id">';
			for (var d = 0, c = this.data.signs.length; d < c; d++) {
				var a = this.data.signs[d];
				b += '<option value="' + a.id + '"' + ((a.id == this.data.used_id) ? "selected=selected" : "") + ">" + a.name + "</option>"
			}
			b += "</select>";
			b += '&nbsp;<a style="color:#0449BE" target="_blank" href="/i/sys/jump?type=signsetting">查看全部</a>'
		} else {
			b += '（您目前没有可使用的签名档，&nbsp;<a style="color:#0449BE" target="_blank" href="/i/sys/jump?type=signsetting">查看全部</a>)'
		}
		b += "</span>";
		b += "</div>";
		return b
	},
	active : function() {
		if (this.isFirst) {
			this.isFirst = false;
			var a = this.getUrl;
			this.postProcess(a, null, this.build)
		}
	},
	postProcess : function(url, data, callback) {
		var self = this;
		if (data == null) {
			$.get(url, function(xhr) {
				var json = eval("(" + xhr + ")");
				if (json.no == 0) {
					if ( typeof callback == "function") {
						callback(self, json)
					}
				}
			})
		} else {
			$.post(url, SignNameApply._convertToQueryString(data), function(xhr) {
				var json = eval("(" + xhr + ")");
				if (json.no == 0) {
					if ( typeof callback == "function") {
						callback(self, json)
					}
				}
			})
		}
	},
	_convertToQueryString : function(b) {
		var c = [];
		for (var a in b) {
			c.push(encodeURIComponent(a) + "=" + encodeURIComponent(b[a]))
		}
		return c.join("&")
	},
	build : function(a, b) {
		a.data = b.data;
		a.isUsed = b.data.need;
		a.fillToPage()
	},
	fillToPage : function() {
		$("#" + this.fillPanelId).html(this.template());
		this.initPage()
	},
	showList : function() {
		if (this.isUsed == 1) {
			$("#signNameShow").css("display", "")
		} else {
			$("#signNameShow").css("display", "none")
		}
	},
	initPage : function() {
		if (this.isUsed == 1) {
			$("#useSignName").attr("checked", true)
		} else {
			$("#useSignName").attr("checked", false)
		}
		this.showList();
		this.handlerEven()
	},
	setisUsed : function(a) {
		if (a) {
			this.isUsed = 1
		} else {
			this.isUsed = 0
		}
		this.showList();
		this.postProcess("/f/user/cm/sign_setneed", {
			need : this.isUsed,
			tbs : PageData.tbs
		}, null)
	},
	handlerEven : function() {
		var a = this;
		$("#useSignName").click(function() {
			a.setisUsed(this.checked)
		})
	}
};
var MemTip = (function() {
	var d = null;
	function h(i) {
		if (i) {
			d = i;
			var k = a(i);
			var j = g();
			j.style.left = (k[0] - 15) + "px";
			j.style.top = (k[1] - 125) + "px";
			j.style.display = ""
		}
	}

	function b() {
		var i = g();
		i.style.display = "none"
	}

	function f(m, k, j) {
		var i = '<div id="memTipPanel_s" style="float:left;width:208px; font-size:12px; line-height: 22px; display:inline; margin-left: 10px;">';
		if (m) {
			i += '<div id="memTipTitle" style="font-weight:bold; margin-top: 10px;">' + m + "</div>"
		}
		if (k) {
			i += k
		}
		i += '</div><div  id="memTipClosePanel" style="float:right;padding: 10px 10px 0px 0px;"><a id="memTipMemTipClose" href="javascript:void(0)" style="display:block; width: 15px;height: 15px;" onclick="MemTip.hide()"></a></div><div style="clear:both"></div>';
		var l = g();
		if (l) {
			if (j) {
				l.style.background = j
			}
			l.innerHTML = i
		}
	}

	function a(i) {
		var j = curtop = 0;
		if (i.offsetParent) {
			j = i.offsetLeft;
			curtop = i.offsetTop;
			while ( i = i.offsetParent) {
				j += i.offsetLeft;
				curtop += i.offsetTop
			}
		}
		return [j, curtop]
	}

	function g() {
		var i = document.getElementById("memTipDiv");
		if (!i) {
			i = document.createElement("div");
			i.id = "memTipDiv";
			i.style.width = "245px";
			i.style.height = "120px";
			i.style.position = "absolute";
			i.style.zIndex = "2000";
			i.style.display = "none";
			e(document, "click", c);
			document.body.appendChild(i)
		}
		return i
	}

	function c(l) {
		var k = l.target || event.srcElement;
		if (k != d) {
			var m = ["memTipDiv", "memTipPanel_s", "memTipTitle", "memTipClosePanel"];
			var j = 0;
			for ( j = 0; j < m.length; j++) {
				if (document.getElementById(m[j]) == k) {
					break
				}
			}
			if (j == m.length) {
				MemTip.hide()
			}
		}
	}

	function e(k, i, j) {
		if (window.addEventListener) {
			k.addEventListener(i, j, false)
		} else {
			if (window.attachEvent) {
				k.attachEvent("on" + i, j)
			}
		}
	}
	return {
		buildHTML : function(k, j, i) {
			f(k, j, i)
		},
		show : function(i) {
			h(i)
		},
		hide : function() {
			b()
		}
	}
})();
function showMemTip(c) {
	var e = "会员发贴：";
	var d = PageData.forum ? PageData.forum.name_url : PageData.forum_name_u;
	var b = "只允许<a target='_blank' href='/f/like/level?kw=" + d + "'>4级头衔</a>及以上用户在登录状态下发贴。请检查一下您是否已经登录，以及是否达到相应会员等级。";
	var a = "url('http://static.tieba.baidu.com/tb/img/infotip.gif') no-repeat";
	MemTip.buildHTML(e, b, a);
	MemTip.show(c)
}

var Captcha_requirement = {
	_is_anomy : 0,
	_vcodeUrl : "",
	answer : {
		antiNeedVerify : null,
		antiNeedVerifyA : null
	},
	post_type : "thread",
	forum_name_url : "",
	forum_id : 0,
	need_captcha : 0,
	_ifHasKnowAnti : function(a) {
		switch(a) {
			case 1:
				return !(this.answer.antiNeedVerifyA == null);
				break;
			case 0:
			default:
				return !(this.answer.antiNeedVerify == null)
		}
	},
	_isPosting : 0,
	setVcodeUrl : function(a) {
		if (this._is_anomy == 1) {
			this.answer._vcodeUrl_A = a
		} else {
			this.answer._vcodeUrl = a
		}
	},
	getVcodeUrl : function() {
		if (this._is_anomy == 1) {
			return this.answer._vcodeUrl_A
		} else {
			return this.answer._vcodeUrl
		}
	},
	_getAntiAnswer : function(c) {
		var b = "/f/user/json_needvcode?rs1=" + (this._is_anomy == 1 ? "1" : "0") + "&rs10=" + (this.post_type == "thread" ? "1" : "0") + "&lm=" + this.forum_id + "&word=" + this.forum_name_url + "&t=" + Math.random();
		this._isPosting = 1;
		var a = this;
		if (this.tid) {
			b += "&tid=" + this.tid
		}
		var a = this;
		$.ajax({
			url : b,
			dataType : "json",
			async : true,
			success : function(d) {
				a.handleAnswer(d.data);
				setTimeout(function() {
					if (!PageData.tbs_loaded) {
						TbUtil.requestTbs()
					}
				}, 30);
				c();
				a._isPosting = 0
			}
		})
	},
	handleAnswer : function(a) {
		if (this._is_anomy == 1) {
			this.answer.antiNeedVerifyA = a.need
		} else {
			this.answer.antiNeedVerify = a.need
		}
		this.answer.showShenshou = a.open_shenshou;
		if (a.open_shenshou == 1) {
			this.answer.shenshou_lv = a.shenshou_lv;
			this.answer.open_by_spam = a.open_by_spam
		}
		if (this.tid) {
			a.vcodeUrl += "&tid=" + this.tid
		}
		this.setVcodeUrl(a.vcodeUrl)
	},
	setData : function(a, b) {
		Captcha_requirement[a] = b
	},
	antiProcess : function(d) {
		if (this._isPosting == 0) {
			var b = this;
			var c = "";
			var a = function() {
				if (b._is_anomy) {
					c = b.answer.antiNeedVerifyA
				} else {
					c = b.answer.antiNeedVerify
				}
				if (c == "1") {
					PageData.need_captcha = 1;
					b.need_captcha = 1
				} else {
					PageData.need_captcha = 0;
					b.need_captcha = 0
				}
				if (d) {
					d()
				}
			};
			if (!this._ifHasKnowAnti(this._is_anomy)) {
				this._getAntiAnswer(a)
			} else {
				a()
			}
		}
	},
	init : function(b, c, a) {
		this.forum_name_url = b;
		this.forum_id = c;
		if (a == "reply") {
			this.post_type = "reply";
			if (PageData.thread) {
				this.tid = PageData.thread.id
			}
		}
	}
};
var SimplePostor = function(d, c) {
	this.option = d;
	this._edOp_t = c;
	var a = PageData.user.has_grade ? PageData.user.grade_level : 0;
	this._edOp_t.bavl = a;
	var b = $("#" + d.tpl_id).html();
	this.cur_sec = c.container;
	this.cur_sec.innerHTML = b;
	var e = $(c.container);
	this._bc = e.find(".lzl_panel_btn");
	this._enabled = true;
	this._eh = e.find(".lzl_panel_error");
	this._event = {};
	this._statInit(d._login, d._can_post, d._no_un)
};
SimplePostor.prototype = {
	constructor : SimplePostor,
	_statInit : function(d, f, e) {
		var a = this.option;
		if (!d) {
			this._cannotPost();
			return
		}
		if (d && f == 1 && e) {
			this._cannotPost();
			return
		}
		if (d && f != 1) {
			this._cannotPost();
			return
		}
		if (a._reach_limit) {
			this._cannotPost();
			return
		}
		if (a._is_block) {
			this._cannotPost();
			return
		}
		if (d && f == 1 && !e) {
			var c = this.cur_sec;
			var b = $(c).find(".editor_for_container")[0];
			this._buildNormalEditor(b);
			this._postBtnInit("enble");
			this._captchaInit()
		}
	},
	_cannotPost : function() {
		var a = this.cur_sec;
		this._buildLimitedEditor(a);
		this._postBtnInit("disable");
		return
	},
	_postBtnInit : function(d) {
		switch(d) {
			case"disable":
				this._disableEditor();
				this._disableSmile();
				break;
			case"enble":
				var a = this._bc, b = this;
				var c = a.find("span.j_lzl_p_sm");
				c.css("position", "relative");
				if (!PageData.is_ipad) {
					this._se.addPlugin("insertsmiley", new TED.EditorPlugins.InsertSmiley(c[0]))
				} else {
					c.hide()
				}
				this._se.addPlugin("WordLimit", new TED.EditorPlugins.WordLimit(140));
				c = a.find("span.j_lzl_p_sb");
				c.hover(function() {
					$(this).addClass("lzl_panel_submit_hover")
				}, function() {
					$(this).removeClass("lzl_panel_submit_hover lzl_panel_submit_active")
				});
				c.bind("click", function(f) {
					$(this).addClass("lzl_panel_submit_active");
					b.submitClick();
					f.target.blur()
				});
				break
		}
	},
	bind : function(b, a, c) {
		var d = {
			stat : c ? true : false,
			fun : a
		};
		if (this._event[b]) {
			this._event[b].push(d)
		} else {
			this._event[b] = [];
			this._event[b].push(d)
		}
	},
	triggerEvent : function(a) {
		if (this._event[a]) {
			var c = this._event[a];
			for (var b = 0; b < c.length; b++) {
				if (c[b].fun) {
					c[b].fun()
				}
				if (!c[b].stat) {
					return false
				}
			}
		}
		return true
	},
	_captchaInit : function() {
		var a = this;
		AntiAnswerLzl.antiProcess(function(b) {
			if (b) {
				var d = a._edOp_t;
				var f = $(a.cur_sec).find(".lzl_panel_captcha");
				var c = "";
				c += "<span>验证码：</span>";
				c += '<input type="text" autocomplete="off" maxlength="10" size="10" class="j_captcha_input" />';
				c += '<span class="j_lzl_p_c_h lzl_p_c_h">请点击后输入验证码</span>';
				c += '<span class="j_lzl_p_c lzl_p_c j_captcha_content" style="display:none;">';
				c += '<span class="j_lzl_p_c_i j_captcha_img_wrapper">';
				c += "</span>";
				c += '<a href="#" class="j_captcha_img_change">看不清</a>';
				c += "</span>";
				CaptchaLzl = AntiAnswerLzl.getCaptchaInstance({
					container : f,
					template : c,
					beforeImgInit : function() {
						this.j_container.find(".j_lzl_p_c_h").hide();
						a._ie6RelativeHack()
					},
					afterImgInit : function() {
						a._ie6RelativeRecover()
					}
				});
				a._cc = f;
				var e = f.find("input");
				e.bind("keydown", function(g) {
					if (g.keyCode == 13) {
						a.submitClick();
						g.target.blur()
					}
				})
			}
		})
	},
	_buildLimitedEditor : function(e) {
		var b = this;
		if (!b._fe) {
			var c = $("<div>");
			c.addClass("lzl_simple_wrapper");
			var a = this._edOp_t;
			var d = $(b.cur_sec).find(".editor_for_container");
			c.css({
				width : b._edOp_t.width,
				height : b._edOp_t.height,
				position : "static"
			});
			c.append(b._buildLimitedInfo());
			b._fe = c
		}
		d.append(b._fe)
	},
	_tip : ["", "参与本吧讨论，请先 ", "抱歉，本吧目前仅限吧务团队及注册满一定时间的老用户发贴", "抱歉，根据相关法律法规和政策，本吧目前仅允许", "抱歉，本吧目前仅限吧务团队发贴", "抱歉，根据相关法律法规和政策，本吧目前只能浏览，不能发贴"],
	_buildLimitedInfo : function() {
		var d = $("<p>");
		var b = '<div class="editor_banned_tip_info">', c = this.option, a = this;
		if (c._reach_limit) {
			b += "<span>本楼层回复已达上限，请参与其他楼层讨论</span>";
			b += "</div>";
			d.html(b);
			d.css({
				margin : "14px 0 0 14px"
			})
		} else {
			if (c._is_block) {
				b += '<span>抱歉，你可能存在违规操作，已被封禁。请<a href="http://tieba.baidu.com/upc/userinfo?fid=' + PageData.forum_id + '">点击此处</a>查看详细信息。</span>';
				b += "</div>";
				d.html(b);
				d.css({
					margin : "14px 0 0 14px"
				})
			} else {
				b += "<span>";
				if (c._can_post == 1 && c._no_un) {
					b += "您还没有用户名，不能回复。请先<a href=\"javascript:void(0)\"  onclick=\"TbCom.process('User','buildUnameFrame','填写用户名',' ')\">填写用户名</a>";
					b += "</span>";
					b += "</div>";
					d.html(b);
					d.css({
						margin : "14px 0 0 14px"
					})
				} else {
					b += a._tip[c._forum_type];
					b += "</span>";
					if (c._forum_type == 1) {
						b += '<span class="lzl_login_wrapper">';
						b += "<a href=\"#\" onclick=\"TbCom.process('User', 'buildLoginFrame', null,null,null,'lzl');return false;\">登录</a>";
						b += "&nbsp;|&nbsp";
						b += "<a href=\"#\" onclick=\"TbCom.process('User', 'buildRegisterFrame', 'lzl');return false;\">注册</a>";
						b += "</span>"
					} else {
						if (c._forum_type == 3) {
							b += '<a href="http://tieba.baidu.com/f/like/level?kw=d8" >4级头衔</a>以上会员发贴。'
						}
					}
					b += "</div>";
					d.html(b);
					if (c._forum_type == 3) {
						d.css({
							margin : "5px 0 0 14px"
						})
					} else {
						d.css({
							margin : "14px 0 0 14px"
						})
					}
				}
			}
		}
		return d
	},
	_buildNormalEditor : function(e) {
		var b = this, a = b.option;
		var c = b._edOp_t;
		c.container = e;
		var d = new TED.SimpleEditor(c);
		d.on("overflow", function() {
			b._overFlow()
		});
		d.on("unoverflow", function() {
			b._unoverFlow()
		});
		d.on("keydown", function(f) {
			b._keyDown(f)
		});
		d.on("keyup", function(f) {
			b._keyUp(f)
		});
		b._se = d
	},
	_overFlow : function() {
		this._disableEditor()
	},
	_unoverFlow : function() {
		this._enableEditor()
	},
	_keyDown : function(a) {
		if (a.keyCode == 17) {
			this._ctrl_down = true
		} else {
			if (a.keyCode == 13 && this._ctrl_down) {
				this.submitClick();
				if (a.srcElement) {
					a.srcElement.blur()
				} else {
					a.target.blur()
				}
			}
		}
	},
	_disableEditor : function() {
		var c = this;
		c._enabled = false;
		var a = c._bc.find("span.j_lzl_p_sb");
		a.removeClass("lzl_panel_submit");
		a.html("");
		a.addClass("lzl_panel_submit_disabled")
	},
	_disableSmile : function() {
		var c = this;
		var a = c._bc.find("span.j_lzl_p_sm");
		if (PageData.is_ipad) {
			a.hide();
			return
		}
		c._enabled = false;
		a.removeClass("lzl_panel_smile");
		a.html("");
		a.addClass("lzl_panel_smile_disabled")
	},
	_enableEditor : function() {
		var c = this;
		c._enabled = true;
		var a = c._bc.find("span.j_lzl_p_sb");
		a.removeClass("lzl_panel_submit_disabled");
		a.addClass("lzl_panel_submit");
		a.html("发表")
	},
	_keyDown : function(b) {
		var a = this;
		if (b.keyCode == 17) {
			a._ctrl_down = true
		} else {
			if (b.keyCode == 13 && a._ctrl_down) {
				a.submitClick();
				if (b.srcElement) {
					b.srcElement.blur()
				} else {
					b.target.blur()
				}
			}
		}
	},
	_keyUp : function(a) {
		if (a.keyCode == 17) {
			this._ctrl_down = false
		}
	},
	_ie6RelativeHack : function() {
		var b = this, d = $(b.cur_sec), a = this._bc;
		d.find("div.insertsmiley_holder").hide();
		var e = d.find("div.wordlimit-holder");
		var c = a.find("span.j_lzl_p_sm");
		c.css("position", "static");
		if (e.css("visibility") != "hidden") {
			d.find("div.wordlimit-holder").hide();
			b._hint_shown = true
		} else {
			b._hint_shown = false
		}
		d.find("div.lzl_simple_wrapper").css("position", "static")
	},
	_ie6RelativeRecover : function() {
		var b = this, d = $(b.cur_sec), a = this._bc;
		d.find("div.insertsmiley_holder").show();
		var e = d.find("div.wordlimit-holder");
		if (this._hint_shown) {
			e.show()
		}
		var c = a.find("span.j_lzl_p_sm");
		c.css("position", "relative");
		d.find("div.lzl_simple_wrapper").css("position", "relative")
	},
	_getHtml : function() {
		var a = this._se.getHtml();
		a = a.replace(/<br[^>]*>/gi, " ").replace(/[\u3000\s]+/g, " ").replace(/&nbsp;/g, " ");
		return a
	},
	_data : [],
	submitClick : function() {
		if (PageData.thread.is_ad === 1) {
			if (document.images) {
				var b = new Image();
				b.src = PageData.ecomStatDomain + "reply.php?forumid=" + (PageData.forum_id || "") + "&tid=" + (PageData.thread.id || "") + "&userid=" + (PageData.user.id || "") + "&username=" + encodeURIComponent(PageData.user_name || "") + "&exp=" + encodeURIComponent(PageData.ecomExp || "") + "&t=" + new Date().getTime();
				b = null
			}
		}
		var a = this;
		var d = $(a.cur_sec), c = d.find("div.insertsmiley_holder");
		d.find("span.close").click();
		c.css("position", "static");
		if (!this._isValid()) {
			c.css("position", "relative");
			return
		}
		c.css("position", "relative");
		this._submitData()
	},
	_isValid : function() {
		if (!this._enabled) {
			return false
		}
		if (this._se.isEmpty()) {
			this._se.focus();
			this._eh.html("发贴内容需包含文字").show();
			return false
		}
		if (this._se.getSmileyNum() > 10) {
			this._eh.html("抱歉，每层楼插入的表情不能超过10个，请修改后重新提交").show();
			return false
		}
		if (AntiAnswerLzl.needCaptcha) {
			var a = CaptchaLzl.getInputValue();
			if (a == "") {
				this._eh.html("验证码不能为空，请输入验证码").show();
				return false
			}
			CaptchaLzl._vcode = a
		}
		return true
	},
	_submitData : function() {
		this._eh.hide();
		this._disableEditor();
		var a = this;
		$.tb.post(FORUM_POST_URL.postAdd, a._getData(), function(b) {
			if (b.no == 0) {
				var c = a.triggerEvent("onsuccess");
				a._se.empty();
				a.option.data = a.option.__data__;
				a.option.__data__ = null;
				if (CaptchaLzl) {
					CaptchaLzl.clear();
					CaptchaLzl.reload()
				}
				a._enableEditor();
				var c = a.triggerEvent("hide")
			} else {
				a._showAddResult(b);
				a._enableEditor()
			}
			return false
		})
	},
	_setData : function(a) {
		this.option.__data__ = this.option.data;
		this.option.data = $.extend(this.option.data, a)
	},
	_getData : function() {
		var h = this.option, a = h.data, b = this;
		b._data = [];
		b._data.push({
			name : "kw",
			value : PageData.forum_name
		});
		b._data.push({
			name : "fid",
			value : PageData.forum_id
		});
		b._data.push({
			name : "tid",
			value : PageData.thread.id
		});
		var g = "";
		var d = "";
		if (CaptchaLzl) {
			g = CaptchaLzl.signStr ? CaptchaLzl.signStr : "";
			CaptchaLzl._vcode && b._data.push({
				name : "vcode",
				value : CaptchaLzl._vcode ? CaptchaLzl._vcode : ""
			})
		}
		b._data.push({
			name : "vcode_md5",
			value : g
		});
		b._data.push({
			name : "floor_num",
			value : a.floor_num
		});
		b._data.push({
			name : "quote_id",
			value : a.pid
		});
		b._data.push({
			name : "rich_text",
			value : 1
		});
		b._data.push({
			name : "tbs",
			value : PageData.tbs
		});
		b._data.push({
			name : "content",
			value : b._getHtml()
		});
		b._data.push({
			name : "lp_type",
			value : h._thread_topic_type
		});
		b._data.push({
			name : "lp_sub_type",
			value : h._thread_topic_subtype
		});
		if (a.spid != undefined) {
			b._data.push({
				name : "repostid",
				value : a.spid
			})
		} else {
			b._data.push({
				name : "repostid",
				value : a.pid
			})
		}
		if (b._no_un == true) {
			b._data.push({
				name : "anonymous",
				value : 1
			})
		}
		try {
			var c = window.external.GetVersion("version");
			if (c.indexOf("baidubrowser") > -1) {
				b._data.push({
					name : "browser_version",
					value : "baidubrowser"
				})
			}
		} catch(f) {
		}
		return b._data
	},
	_errorTipShow : function(b) {
		var a = this;
		a._eh.html(b).show();
		a._se.focus()
	},
	_showAddResult : function(b) {
		var a = this;
		var c = function(f) {
			switch(f.getActionType()) {
				case f.Action_FocusContent:
					a._se.focus();
					break;
				case f.Action_ClearYZM:
					if (CaptchaLzl) {
						CaptchaLzl.reload();
						CaptchaLzl.focus()
					}
					break;
				case f.Action_GoToHead:
					break;
				case f.Action_FlushAndGoToHead:
					a._se.empty();
					break;
				default:
					break
			}
		};
		Thread_add_result.init(b);
		if (b.no != 0) {
			if (Thread_add_result.isNeedWaitForCheck()) {
				var e = '<div style="margin: 0px 30px 0px 30px;font-size:14px;line-height:20px;text-align:left;font-family: &quot;宋体&quot;;"><table style="width:90%"><tbody><tr><td width="60"><img style="border:none;" src="http://tb2.bdstatic.com/tb/img/messageFace.gif"></td><td valign="middle" style="font-size:20px;line-height:22px;font-family: &quot;黑体&quot;;">等待审核...</td></tr></tbody></table>' + Thread_add_result.getMessage() + "</div>";
				var d = $.dialog.alert(e, {
					width : 380,
					height : 105,
					title : "发表贴子"
				});
				d.bind("onclose", function() {
					a._se.empty();
					a._se.focus();
					return true
				})
			} else {
				if (b.no == 901) {
					var e = "本楼层回复已达上限，请参与其他楼层讨论";
					a._errorTipShow(e);
					if (CaptchaLzl) {
						CaptchaLzl.reload()
					}
				} else {
					if (b.no == 814) {
						var e = "抱歉，每层楼插入的表情不能超过10个，请修改后重新提交";
						a._errorTipShow(e);
						if (CaptchaLzl) {
							CaptchaLzl.reload()
						}
					} else {
						if (b.no == 902) {
							var e = "抱歉，每层楼输入的文字不能超过140个，请修改后重新提交";
							a._errorTipShow(e);
							if (CaptchaLzl) {
								CaptchaLzl.reload()
							}
						} else {
							if (b.no == 40) {
								var e = "验证码输入错误，请您返回后重新输入";
								a._errorTipShow(e);
								if (CaptchaLzl) {
									CaptchaLzl.reload();
									CaptchaLzl.focus()
								}
							} else {
								if (Thread_add_result.isNeedBindPhone()) {
									$.dialog.alert("<div style='margin: 15px;'>" + Thread_add_result.getMessage() + "</div>", {
										title : "发贴失败",
										acceptValue : "绑定手机",
										width : 410,
										onaccept : function() {
											location.href = "http://passport.baidu.com/v2/?accountbindphone&tpl=tb&u=" + encodeURIComponent(location.href);
											return false
										},
										onclose : function() {
											c(Thread_add_result);
											return true
										}
									})
								} else {
									var e = '<div style="margin: 0px 30px 0px 30px;font-size:14px;line-height:20px;text-align:left;font-family: &quot;宋体&quot;;"><table style="width:90%"><tbody><tr><td width="60"><img style="border:none;" src="http://tb2.bdstatic.com/tb/img/errorFace.gif"></td><td valign="middle" style="font-size:20px;line-height:22px;font-family: &quot;黑体&quot;;">发贴失败</td></tr></tbody></table>' + Thread_add_result.getMessage() + "</div>";
									var d = $.dialog.alert(e, {
										width : 410,
										height : 95,
										title : "发表贴子"
									});
									d.bind("onclose", function() {
										c(Thread_add_result);
										return true
									})
								}
							}
						}
					}
				}
			}
		}
	}
};
var RichPostor = function(option) {
	var eidtor = $("#" + option.editorDom);
	this._data_postor = eval("(" + eidtor.attr("data-postor") + ")");
	this._data_editor = eval("(" + eidtor.attr("data-editor") + ")");
	var data_temp = this._data_editor;
	this._option = option;
	this._isPosting = false;
	this._check_post_thread = null;
	this._maxMusicNum = 10;
	this._elements = {
		music_num : 0,
		image_num : 0,
		smiley_num : 0,
		flash_num : 0
	};
	this._reloadUrl = "";
	this._event = {};
	if (data_temp.is_readonly != 1 && data_temp.forbid_flag != 6) {
		var tpl = $("#"+option.tpl_id)[0].innerHTML + "";
		this._generi_dom_id(option);
		var userInfo = option.userInfo;
		tpl = $.tb.format(tpl, this._dom_id);
		eidtor[0].innerHTML = tpl;
		this._compatibleOld();
		var domId = this._dom_id, op_temp = this._option;
		this._headInit(op_temp.header);
		var login = data_temp.is_login, can_post = data_temp.can_post, no_un = op_temp.no_un, forbid_flag = data_temp.forbid_flag;
		this._statInit(login, can_post, no_un, forbid_flag)
	}
};
RichPostor.prototype = {
	constructor : RichPostor,
	_compatibleOld : function() {
		var e = this._option, d = this._dom_id;
		if (!e.page) {
			if (e.title) {
				this._option.page = "frs";
				var c = $("#editor"), b = c.attr("class");
				if (b == "frs_rich_editor") {
					this._option.header = "发表新帖"
				} else {
					this._option.header = ""
				}
			} else {
				this._option.page = "pb";
				this._option.header = "发表回复"
			}
			var a = $("#" + d.editor_banned_tip);
			a.css({
				top : "60px"
			});
			$("#" + d.reply_h).hide()
		}
	},
	_spamming : function() {
		$("body").append('<div id="anttongji" style="display:none"></div>');
		var a = $(document.createElement("script")), b = "http://tongji.tieba.baidu.com/common/js/gettopic.js";
		a.attr({
			src : b,
			type : "text/javascript"
		});
		$("body").append(a)
	},
	_sendPamming : function() {
		var a = $.cookie("GET_TOPIC");
		if (a && a == PageData.user.id) {
		} else {
			this._spamming();
			$.cookie("GET_TOPIC", PageData.user.id, {
				expires : 0.5,
				path : "/"
			})
		}
	},
	_headInit : function(c) {
		var a = this, b = this._option;
		$("#" + b.editorDom).find(".editor_title_txt").html(c)
	},
	_statInit : function(b, e, c, d) {
		var f = this._option, a = this;
		if (!b) {
			this._cannotPost(f.page);
			this._showBannedTip(1);
			return
		}
		if (b && e != 1) {
			this._cannotPost(f.page);
			this._showBannedTip(2);
			return
		}
		if (b && e == 1 && c && d > 0) {
			this._cannotPost(f.page);
			this._showBannedTip(3);
			return
		}
		if (this._option.is_block) {
			this._cannotPost(f.page);
			this._showBannedTip("is_block");
			return
		}
		if (b && e == 1 && (!c && d == 0)) {
			this._canPost(f.page);
			this._userBarInit(5);
			if (this._option.no_post_pic) {
				a._editor.toolbar.disableInsertImage()
			}
			this._sendPamming();
			return
		}
		if (b && e == 1 && (c && d == 0)) {
			this._canPost(f.page);
			this._userBarInit(4);
			a._editor.toolbar.disableInsertImage();
			this._sendPamming();
			return
		}
		if (b && e == 1 && (!c && d > 0)) {
			this._canPost(f.page);
			this._userBarInit(5);
			if (this._option.no_post_pic) {
				a._editor.toolbar.disableInsertImage()
			}
			this._sendPamming();
			return
		}
	},
	_cannotPost : function(a) {
		if (a && a.indexOf("frs") != -1) {
			this._titleInit("disable")
		}
		this._editorInit("disable");
		this._userBarInit(1);
		this._captchaInit();
		this._postBtnInit("disable");
		this._setContainerDisable()
	},
	_canPost : function(a) {
		if (a && a.indexOf("frs") != -1) {
			this._titleInit("enable")
		}
		this._editorInit("enable");
		this._captchaInit();
		this._postBtnInit("enable");
		this._showBannedTip(4)
	},
	_titleInit : function(b) {
		var a = this;
		var d = this._dom_id;
		var e = this._option;
		switch(b) {
			case"enable":
				$("#" + d.title_tr).show();
				var c = $("#" + e.title);
				c.focus(function() {
					$(this).addClass("edit_field_focus");
					a._initCaptchaAndSign(a)
				});
				c.blur(function() {
					$(this).removeClass("edit_field_focus")
				});
				c.keydown(function(g) {
					var h = g || window.event;
					if (h.keyCode == 13) {
						a._editor.focus();
						return false
					}
					var f = a._limitTitle(h, this);
					return f
				});
				c.bind("input", function() {
					var f = this.value;
					if (f.getByteLength() == 60) {
						return false
					}
					if (f.getByteLength() > 60) {
						this.value = f.subByte(60)
					}
					return true
				});
				c.bind("propertychange", function() {
					var f = this.value;
					if (f.getByteLength() == 60) {
						return false
					}
					if (f.getByteLength() > 60) {
						this.value = f.subByte(60)
					}
					return true
				});
				break;
			case"disable":
				this._setDisable(a._option.title, true);
				$("#" + d.title_tr).show();
				break
		}
	},
	_editorInit : function(e) {
		var f = this._dom_id, d = this._option, a = d.userInfo, b = this;
		var c = {
			container : f.editorInput,
			uid : a.user["id"],
			flashNumLimit : d.media_conf["flashLimite"],
			flashWhiteList : d.media_conf["flashWhiteList"],
			height : "193px",
			width : "633px",
			forum_name : this._data_postor.kw,
			forum_id : this._data_postor.fid,
			user_name : a.user_name,
			picasso : d.picasso,
			no_post_pic : d.no_post_pic,
			bavl : d.bavl,
			is_ipad : d.is_ipad
		};
		switch(e) {
			case"enable":
				c.autoEnable = true;
				b._editor = new TED.Editor(c);
				b._editorEvent();
				break;
			case"disable":
				c.autoEnable = false;
				b._editor = new TED.Editor(c);
				break
		}
	},
	_editorEvent : function() {
		var j = this;
		var a = this._data_editor, f = this._option;
		var d = this._dom_id;
		var i = f.userInfo;
		if (!this._editor.isMobile) {
			try {
				this._editor.addPlugin("autoheight", new TED.EditorPlugins.AutoHeightPlugin());
				this._editor.addPlugin("draft", new TED.EditorPlugins.SaveDraft(i.user["id"], this._data_postor.fid, this._data_postor.tid, f.isPb));
				this._editor.addPlugin("filtehtml", new TED.EditorPlugins.FilteHtmlPlugin(this._option.no_post_pic ? false : true));
				var c = $("#" + d.add_post_submit);
				if (this._option.open_idisk) {
					this._editor.addPlugin("idisk", new TED.EditorPlugins.IdiskPlugin(this._option.power_idisk, this._data_postor.fid, this._option.upload_max_length, this._option.upload_max_size));
					this._editor.on("idisk_upload_complete", function(e) {
						var k = this.getPostorDataObj("files");
						k = k || [];
						k.push(e);
						this.setPostorDataObj("files", k)
					}, this);
					this._editor.on("idisk_remove_file", function(l) {
						var m = this.getPostorDataObj("files");
						if (!m) {
							return
						}
						if (l.md5) {
							for (var k = 0, e = m.length; k < e; k++) {
								if (m[k].path === l.path) {
									m.splice(k, 1);
									if (m.length === 0) {
										this.setPostorData("files", undefined)
									} else {
										this.setPostorDataObj("files", m)
									}
									return
								}
							}
						}
					}, this);
					this._editor.on("idisk_uploading_start", function() {
						j._isPosting = true;
						c.attr("disabled", true);
						c.removeClass("subbtn_bg").addClass("subbtn_bg_banned");
						c.next().html("正在上传文件，请稍候...")
					}, this);
					this._editor.on("idisk_uploading_stop", function() {
						j._isPosting = false;
						c.attr("disabled", false);
						c.removeClass("subbtn_bg_banned").addClass("subbtn_bg");
						c.next().html("Ctrl+Enter快捷发表")
					}, this)
				}
				this._editor.addPlugin("FontEdit", new TED.EditorPlugins.FontEditPlugin(f.c_sign_num));
				MousePwd.start(["tb-editor-wrapper"])
			} catch(h) {
			}
		}
		this._editor.on("quote", function(e) {
			this.setPostorData("quote_id", e)
		}, this);
		this._editor.on("unquote", function() {
			this.setPostorData("quote_id", 0)
		}, this);
		var g = this._editor, b = g.editArea;
		this._editor.on("focus", function() {
			$(b).addClass("edit_field_focus");
			setTimeout(function() {
				j._initCaptchaAndSign(j)
			}, 0)
		});
		this._editor.on("click", function() {
			$(b).addClass("edit_field_focus");
			setTimeout(function() {
				j._initCaptchaAndSign(j)
			}, 0)
		});
		this._editor.on("blur", function() {
			$(b).removeClass("edit_field_focus")
		})
	},
	_tipConfig : {
		"40" : "发张图，秀一下你家乡的美食！",
		"24" : "自爆大赛火拼中，发张靓照秒杀她们!",
		"1474277" : "敢不敢给大家发一张珍藏已久的图片！",
		"318" : "敢不敢把你的桌面发出来！",
		"71" : "发张图，晒晒你2012的足迹！"
	},
	_postorTip : function(b) {
		var e = this._data_postor.fid, d = this._tipConfig[e], a = $(this._editor.editArea), c = $.trim(a.text());
		if (d && c == "" && b == "init") {
			a.html("<div style='color:#999;'>" + d + "</div>");
			return
		}
		if (d && d == c) {
			a.html("");
			return
		}
	},
	_captchaInit : function() {
		var c = this._dom_id, b = this._data_editor;
		var a = {
			container : "#" + c.captcha_div,
			onInputFocus : function(g, f) {
				var d = f.getInputValue();
				if (d != "") {
					f.hideErrorTip()
				}
			}
		};
		this._captcha = PostorCaptchaReq.getCaptchaInstance(a)
	},
	_userBarInit : function(h) {
		var e = this._dom_id, f = $("#" + e.post_user), a = $("#" + e.post_login);
		var c = $("#" + e.post_anonym_con), j = this;
		var b = this._data_editor, i = b.forbid_flag;
		switch(h) {
			case 1:
				f.hide();
				return;
			case 2:
				a.attr("checked", true);
				a.attr("disabled", false);
				a.click(function() {
					PostorCaptchaReq.isAnonymous = false;
					j._initCaptchaAndSign(j);
					j._captcha.changeContent("loginUser")
				});
				c.hide();
				var g = document.getElementById(e.msg_cannot_anonym);
				var d = "（" + this._tip[i][1] + "）";
				g.innerHTML = d;
				break;
			case 3:
				a.click(function() {
					PostorCaptchaReq.isAnonymous = false;
					j._initCaptchaAndSign(j);
					j._captcha.changeContent("loginUser")
				});
				$("#" + e.post_anonym).click(function() {
					PostorCaptchaReq.isAnonymous = true;
					j._initCaptchaAndSign(j);
					j._captcha.changeContent("anonym");
					if (!j._option.no_post_pic) {
						j.onClickAnonym()
					}
				});
				a.attr("checked", true);
				c.show();
				break;
			case 4:
				f.html('<td style="padding-top:5px" valign="top"></td> <td style="padding-top:5px">您还没有用户名，只能匿名发贴。<a href="#" onclick="TbCom.process(\'User\',\'buildUnameFrame\',\'填写用户名\',\' \');return false;">马上填写用户名</a></td>');
				PostorCaptchaReq.isAnonymous = true;
			case 5:
				f.find(".pt_uname").html("");
				a.attr("checked", true);
				f.find("label").hide();
				break
		}
		f.show()
	},
	_userBarEvent : function() {
	},
	_signInit : function() {
	},
	_postBtnInit : function(c) {
		var b = this, d = this._dom_id, a = $("#" + d.add_post_submit);
		switch(c) {
			case"enable":
				a.attr("disabled", false);
				a.className = "subbtn_bg";
				b._postBtnEvent();
				break;
			case"disable":
				a.attr("disabled", true);
				a.className = "subbtn_bg_banned";
				break
		}
	},
	_postBtnEvent : function() {
		var d = this._dom_id, b = this, a = $("#" + d.add_post_submit), c = $("#" + d.post);
		a.mouseover(function() {
			$(this).attr("class", "subbtn_bg_hover")
		});
		a.mouseout(function() {
			$(this).attr("class", "subbtn_bg")
		});
		a.mousedown(function() {
			$(this).attr("class", "subbtn_bg_active")
		});
		c.submit(function() {
			b._submit();
			return false
		});
		c.keydown(function(f) {
			var g = f || window.event;
			if (g.ctrlKey && g.keyCode == 13) {
				if (g.preventDefault) {
					g.preventDefault()
				} else {
					g.returnValue = false
				}
				b._submit()
			}
		})
	},
	_tip : [[""], ["", "本吧目前仅限登录用户发贴，不能使用匿名发贴功能"], ["抱歉，本吧目前仅限吧务团队及注册满一定时间的老用户发贴", "本吧目前仅限吧务团队及注册满一定时间的老用户发贴，不能使用匿名发贴功能"], ["抱歉，根据相关法律法规和政策，本吧目前仅允许", "本吧目前仅限会员发贴，不能使用匿名发贴功能"], ["抱歉，本吧目前仅限吧务团队发贴", "本吧目前仅限吧务团队发贴，不能使用匿名发贴功能"], ["抱歉，根据相关法律法规和政策，本吧目前只能浏览，不能发贴", "抱歉，根据相关法律法规和政策，本吧目前只能浏览，不能发贴"]],
	_showBannedTip : function(f) {
		var e = null;
		var c = this._dom_id, a = this._data_editor;
		var d = this._option, h = a.forbid_flag;
		var b = "", e = document.getElementById(c.editor_banned_tip);
		switch(f) {
			case 1:
				b = '<div class="editor_banned_tip_info">' + this._tip[h][0];
				b = b + (h == 1 ? "" : "<br />");
				var i = "<a href=\"#\" onclick=\"$.stats.sendRequest('fr=tb0_forum&st_mod=editor&st_type=count_action&st_value=login');TbCom.process('User', 'buildLoginFrame', null,null,null,'editor" + (PageData.page_id || "") + "');return false;\">登录</a> | <a href=\"#\" onclick=\"$.stats.sendRequest('fr=tb0_forum&st_mod=editor&st_type=count_action&st_value=reg');TbCom.process('User','buildRegisterFrame',null,null,null,'editor" + (PageData.page_id || "") + "');return false;\">注册</a>&nbsp;";
				b = b + (h == 1 ? "本吧发贴，请先 " : "你可以先 ") + i;
				b += "</div>";
				break;
			case 2:
				b = '<div class="editor_banned_tip_info">' + this._tip[h][0];
				var g = '<a href="http://tieba.baidu.com/f/like/level?kw=d8" >4级头衔</a><br />以上会员发贴。';
				b = b + (h == 3 ? g : "");
				b += "</div>";
				break;
			case 3:
				b = "<div class=\"editor_banned_tip_info\">您还没有用户名，不能在本吧发贴。请先<a href=\"#\" onclick=\"TbCom.process('User','buildUnameFrame','填写用户名',' ');return false;\">填写用户名</a></div>";
				break;
			case 4:
				if (e != null) {
					e.style.display = "none"
				}
				break;
			case"is_block":
				b = '<div class="editor_banned_tip_info">抱歉，你可能存在违规操作，已被封禁。请<a href="http://tieba.baidu.com/upc/userinfo?fid=' + this._data_postor.fid + '">点击此处</a>查看详细信息。</div>';
				break
		}
		if (e) {
			e.innerHTML = b
		}
	},
	_setContainerDisable : function() {
		$("#editor").find("td").css("color", "#CCCCCC")
	},
	jumpToTry : function(d) {
		var c = this._data_editor;
		if (c.is_login && c.can_post == 1) {
			var b = this._editor.toolbar;
			var a = this._editor.overlay;
			if (d == 6) {
				this._editor.jumpTo_picasso()
			} else {
				a.open("120px", "43px", "420px", "355px", "123px", this._editor.config.rootPath + "smiley.html?id=" + this._editor.id + "&bavl=true")
			}
		}
	},
	_generi_dom_id : function(a) {
		var b = new Date().valueOf();
		this._dom_id = {
			post : "pt" + b,
			editor_banned_tip : "ebt" + b,
			editorInput : "eInput" + b,
			coError : "co" + b,
			post_login : "pl" + b,
			post_user : "pu" + b,
			post_anonym_con : "pac" + b,
			post_anonym : "pa" + b,
			msg_cannot_anonym : "mca" + b,
			signPanel : "sp" + b,
			captcha_container : "cc" + b,
			captcha_div : "cd" + b,
			add_post_submit : "aps" + b,
			uname : a.userInfo["user_name"],
			title_tr : "tt" + b,
			title_div : "td" + b,
			reply_h : "rh" + b,
			tiError : "tE" + b
		};
		if (a.title) {
			this._dom_id.title = a.title
		} else {
			this._dom_id.title = "title"
		}
	},
	_limitTitle : function(g, e) {
		var b = [8, 9, 16, 17, 18, 20, 13, 27, 37, 38, 39, 40, 33, 34, 35, 36, 45, 46, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145];
		var f = g;
		var a = -1;
		for (var d = 0; d < b.length; d++) {
			if (b[d] == f.keyCode) {
				a = d;
				break
			}
		}
		if (a >= 0) {
			return true
		}
		var c = e.value.toString();
		if (f.ctrlKey || f.altKey) {
			return true
		}
		if (c.getByteLength() == 60) {
			return false
		}
		if (c.getByteLength() > 60) {
			e.value = c.subByte(60)
		}
		return true
	},
	bind : function(b, a, c) {
		var d = {
			stat : c ? true : false,
			fun : a
		};
		if (this._event[b]) {
			this._event[b].push(d)
		} else {
			this._event[b] = [];
			this._event[b].push(d)
		}
	},
	triggerEvent : function(b) {
		var a = Array.prototype.slice.call(arguments, 0);
		a.shift();
		if (this._event[b]) {
			var d = this._event[b];
			for (var c = 0; c < d.length; c++) {
				if (d[c].fun) {
					d[c].fun.apply(this, a)
				}
				if (!d[c].stat) {
					return false
				}
			}
		}
		return true
	},
	reply : function(a, b, e) {
		var d = this._data_editor;
		var c = this._option;
		if (d.can_post != 1) {
			return false
		} else {
			if (c.no_un && d.forbid_flag > 0) {
				return false
			}
		}
		this._editor.quote(a, b, e);
		if (PageData.is_last_page && PageData.is_lzl == 0) {
			$.stats.sendRequest("fr=tb0_forum&st_mod=pb&st_type=quote&st_value=rp_reply")
		}
	},
	_isExist : function(a) {
		if (!a) {
			return false
		}
		var b = document.getElementById(a);
		if (b) {
			return true
		}
		return false
	},
	_initCaptchaAndSign : function(a) {
		var e = a._dom_id;
		var g = document.getElementById(e.post_login);
		var c = this._option;
		var d = this._data_editor;
		if (this._isExist(e.signPanel)) {
			if (d.is_login) {
				if (!c.no_un) {
					if (g.checked) {
						document.getElementById(e.signPanel).style.display = "";
						SignNameApply.fillPanelId = e.signPanel;
						SignNameApply.active()
					} else {
						var b = document.getElementById(e.signPanel);
						if (b) {
							b.style.display = "none"
						}
					}
				}
			} else {
				var b = document.getElementById(e.signPanel);
				if (b) {
					b.style.display = "none"
				}
			}
		}
		var f = function() {
			if (PostorCaptchaReq.needCaptcha) {
				a._captcha.show();
				$("#" + e.captcha_container).show()
			} else {
				a._captcha.hide();
				$("#" + e.captcha_container).hide()
			}
		};
		PostorCaptchaReq.antiProcess(f)
	},
	_setDisable : function(b, c) {
		var a = document.getElementById(b);
		if (!a) {
			return
		}
		a.disabled = true;
		if (c) {
			$("#" + b).addClass("notPostbg")
		}
	},
	_checkPostStatus : function() {
		var a = this;
		this._stopCheckPostStatus();
		this._check_post_thread = setTimeout(function() {
			var b = document.getElementById(a._dom_id.add_post_submit);
			if (b && b.disabled) {
				$.stats.sendRequest("st_mod=editor&fr=tb0_forum&st_type=add_post")
			}
		}, 10 * 1000)
	},
	_stopCheckPostStatus : function() {
		var a = this;
		if (a._check_post_thread) {
			clearTimeout(a._check_post_thread)
		}
	},
	_doInputCount : function() {
		var b = this._editor;
		var a = {
			music_num : b.getMusicNum(),
			image_num : b.getImageNum(),
			smiley_num : b.getSmileyNum(),
			flash_num : b.getFlashNum()
		};
		$.stats.sendRequest("st_mod=editor&fr=tb0_forum&st_type=count_input&num_music=" + a.music_num + "&num_image=" + a.image_num + "&num_smiley=" + a.smiley_num + "&num_flash=" + a.flash_num + "&page_id=" + PageData.page_id + ((PageData.is_last_page && PageData.is_lzl == 0) ? "&last_page=1" : ""));
		this._elements = a
	},
	setPostorData : function(a, c) {
		var b = this._data_postor;
		b[a] = c
	},
	getPostorData : function(a) {
		var b = this._data_postor;
		return b[a]
	},
	setPostorDataObj : function(a, c) {
		var b = this._data_postor;
		b[a] = $.json.encode(c)
	},
	getPostorDataObj : function(a) {
		var b = this._data_postor;
		return $.json.decode(b[a])
	},
	_getData : function() {
		var f = this._data_postor;
		var k = this._data_editor;
		var d = this._dom_id;
		var g = this._option;
		if (g.page != "pb") {
			f.title = $("#" + g.title).val().replace(/\u2006/g, "")
		} else {
			f.lp_type = g.thread_topic_type;
			f.lp_sub_type = g.thread_topic_subtype
		}
		var p = $("#" + g.editorDom), c = p.find(".BDE_Flash"), a = [], m = [];
		c.each(function() {
			var e = this, q = $(this), t = q.attr("data-video_url"), r = q.attr("video_mp4_url");
			if (t) {
				a.push(t)
			}
			if (r) {
				m.push(r)
			}
		});
		if (a.length > 0) {
			f.video_url = a.join(",")
		}
		if (m.length > 0) {
			f.video_mp4_url = m.join(",")
		}
		f.content = this._editor.getHtml();
		var h = k.is_login;
		var o = document.getElementById("useSignName");
		var b = document.getElementById(d.post_login);
		var j = document.getElementById("sign_id");
		if (!g.no_un && h) {
			if (b.checked && o && o.checked && j) {
				f.sign_id = j.value
			}
		}
		if (h) {
			if (!g.no_un) {
				f.anonymous = 0
			} else {
				f.anonymous = 1
			}
		}
		f.tbs = this._option.tbs;
		var l = this._captcha.getInputValue();
		if (l != "") {
			f.vcode = l
		}
		f.vcode_md5 = this._captcha.signStr;
		try {
			var n = window.external.GetVersion("version");
			if (n.indexOf("baidubrowser") > -1) {
				f.browser_version = "baidubrowser"
			}
		} catch(i) {
		}
		return f
	},
	getEditor : function() {
		return this._editor
	},
	_validator : function() {
		if (this._option.title) {
			var a = this._data_editor;
			if ((!a.is_notitle) && !this._validFrsPostTitle()) {
				return false
			}
		} else {
			var c = this._dom_id;
			var b = document.getElementById(c.coError);
			if (this._editor.isEmpty()) {
				b.style.display = "";
				b.innerHTML = "回复内容不能为空";
				b.className = "postErrorContent";
				this._editor.focus();
				return false
			}
		}
		if (!this._validRichEditorContent()) {
			return false
		}
		if (!this._captcha.validCaptcha()) {
			return false
		}
		return true
	},
	_validRichEditorContent : function() {
		var c = this._dom_id, o = this;
		var m = this._data_editor;
		var b = document.getElementById(c.coError);
		var g = this._option.media_conf;
		var h = this._option;
		if (m.is_notitle) {
			if ($("#" + h.title).val().trim() == h.newTitieField_tip || $("#" + h.title).val().trim() == "") {
				this.setPostorData("tfrom", 2);
				$("#" + h.title).val("");
				if ((this._editor.isEmpty() || !this._editor.getHtml().replace(/<[^>]*>|(&nbsp;)|[\s　]*/g, ""))) {
					b.style.display = "";
					b.innerHTML = "发贴内容需包含文字";
					this._editor.focus();
					return false
				}
			}
		}
		var a = this._editor.getImageNum();
		if (a > g.imageLimite) {
			b.style.display = "";
			b.innerHTML = "抱歉，每层楼插入的图片不能超过" + g.imageLimite + "张，请修改后重新提交";
			this._editor.focus();
			return false
		}
		var d = this._editor.getFlashNum();
		if (d > g.flashLimite) {
			b.style.display = "";
			b.innerHTML = "抱歉，每层楼插入的视频不能超过" + g.flashLimite + "个，请修改后重新提交";
			this._editor.focus();
			return false
		}
		var f = this._editor.getSmileyNum();
		if (f > g.smileyLimite) {
			b.style.display = "";
			b.innerHTML = "抱歉，每层楼插入的表情不能超过" + g.smileyLimite + "个，请修改后重新提交";
			this._editor.focus();
			return false
		}
		var n = this._editor.getMusicNum();
		if (n > this._maxMusicNum) {
			b.style.display = "";
			b.innerHTML = "抱歉，每层楼插入的音乐数不能超过" + this._maxMusicNum + "个，请修改后重新提交";
			this._editor.focus();
			return false
		}
		try {
			var k = this._editor.editArea, l = "";
			if ($.browser.msie) {
				l = k.innerText
			} else {
				l = k.textContent
			}
			var i = l.getByteLength();
			if (i > 10000) {
				var p = "抱歉，您的贴子超过5000字，建议您精简或分段后再提交";
				o._errorTipShow(p);
				return false
			}
		} catch(j) {
		}
		return true
	},
	_errorTipShow : function(c) {
		var d = this._dom_id, a = this;
		var b = document.getElementById(d.coError);
		b.style.display = "";
		b.innerHTML = c;
		this._editor.focus()
	},
	_validFrsPostTitle : function() {
		var b = this._dom_id;
		var a = document.getElementById(b.title);
		if (a.value.trim() == "") {
			$("#" + b.tiError).html("标题不能为空").show();
			a.focus();
			return false
		} else {
			$("#" + b.tiError).hide()
		}
		return true
	},
	_submit : function() {
		if (PageData.page_id === 1 && PageData.thread.is_ad === 1) {
			if (document.images) {
				var g = new Image();
				g.src = PageData.ecomStatDomain + "reply.php?forumid=" + (PageData.forum_id || "") + "&tid=" + (PageData.thread.id || "") + "&userid=" + (PageData.user.id || "") + "&username=" + encodeURIComponent(PageData.user_name || "") + "&exp=" + encodeURIComponent(PageData.ecomExp || "") + "&t=" + new Date().getTime();
				g = null
			}
		}
		if (this._isPosting) {
			return
		}
		try {
			var h = this;
			var d = this._dom_id;
			var k = document.getElementById(d.captcha_container);
			var c = document.getElementById(d.signPanel);
			if (k.style.display == "none" && c.style.display == "none") {
				h._initCaptchaAndSign(h)
			}
		} catch(i) {
		}
		if (this._validator()) {
			this._isPosting = true;
			var d = this._dom_id;
			document.getElementById(d.add_post_submit).disabled = true;
			document.getElementById(d.add_post_submit).className = "subbtn_bg_banned";
			this._checkPostStatus();
			var a = this._option.url;
			var b = MousePwd.report();
			var j = MousePwd.time;
			var m = MOUSEPWD_CLICK;
			this.setPostorData("mouse_pwd", b.c);
			this.setPostorData("mouse_pwd_t", j);
			this.setPostorData("mouse_pwd_isclick", m);
			var f = this._getData();
			var l = this;
			PostHandler.post(a, f, function(e) {
				$.cookie("GET_TOPIC", "-", {
					expires : -1,
					path : "/"
				});
				l.showAddResult(e)
			}, function(e) {
				Statistics.sendRequest("st_mod=editor&fr=tb0_forum&st_type=add_post_error&e_text=" + encodeURIComponent( e ? e.status : ""))
			});
			return
		}
	},
	onClickAnonym : function() {
		var a = this;
		if (a.isAnonymState) {
			return
		}
		a.isAnonymState = true;
		var b = a._editor.editorPlugins.draft;
		if (!a.notFirstTimeHere) {
			$("#" + a._dom_id.post_login).click(function() {
				if (a.isAnonymState) {
					a._editor.toolbar.enableInsertImage();
					a.isAnonymState = false;
					if (b && b.tip.holder.innerHTML.charAt(0) === "<") {
						b.tip.holder.innerHTML = ""
					}
				}
			});
			a.notFirstTimeHere = true
		}
		a._editor.toolbar.disableInsertImage();
		if (a._editor.getImageNum() > 0 && b) {
			b.tip.holder.style.display = "block";
			b.tip.holder.innerHTML = '<span style="color:red">匿名状态下，内容含有图片将无法发表成功，请切换到非匿名状态</span>'
		}
	},
	_postSuccess : function() {
		var d = this._dom_id, e = $("#" + d.editor_banned_tip), b = "", a = this._editor, c = a.editArea;
		e.css({
			top : "120px",
			left : "250px"
		});
		$(c).css({
			backgroundColor : "#F7F7F7"
		});
		if (this._editor.empty) {
			this._editor.empty()
		}
		b += '<div class="editor_banned_tip_info"><span class="postor_success"></span><span style="font-weight:bold;">发表成功！</span></div>';
		e.html(b);
		e.show()
	},
	_showErrorTip : function(a, d) {
		var b = '<div style="margin: 0px 30px 0px 30px;font-size:14px;line-height:20px;text-align:left;font-family: "宋体";"><table style="width:90%"><tbody><tr><td width="60">' + a.image + '</td><td valign="middle" style="font-size:20px;line-height:22px;font-family: "黑体";">' + a.subMessage + "</td></tr></tbody></table>" + a.message + "</div>";
		var c = $.dialog.alert(b, a.dialogSet);
		c.bind("onclose", d)
	},
	showAddResult : function(m) {
		this._stopCheckPostStatus();
		var c = this._dom_id;
		var n = this;
		var j = null;
		var h = function(p) {
			switch(p.getActionType()) {
				case p.Action_FocusTitle:
					try {
						var t = c.title;
						var q = document.getElementById(t);
						if (q) {
							q.focus();
							q.value = q.value
						}
					} catch(r) {
					}
					break;
				case p.Action_FocusContent:
					n._editor.focus();
					break;
				case p.Action_ClearYZM:
					if (n._captcha) {
						n._captcha.clear();
						n._captcha.focus();
						n._captcha.reload()
					}
					break;
				case p.Action_GoToHead:
					document.location.hash = "pgTop";
					break;
				case p.Action_FlushAndGoToHead:
					n._postSuccess();
					setTimeout(function() {
						var e = n.triggerEvent("onsuccess", p);
						if (!e) {
							return
						}
						document.location.href = n._reloadUrl || document.location.href.split("#")[0]
					}, 800);
					break;
				default:
					break
			}
		};
		var k = null;
		try {
			k = m;
			Thread_add_result.init(k)
		} catch(g) {
			var i = g + "___";
			try {
				i += m.responseText;
				i = i.substring(0, 100)
			} catch(g) {
			}
			$.stats.sendRequest("st_mod=editor&fr=tb0_forum&st_type=add_post_json_error&e_text=" + encodeURIComponent(i))
		}
		var l = Thread_add_result.resultNo;
		if (l == 0) {
			var a = 500;
			n._doInputCount();
			setTimeout(function() {
				h(Thread_add_result)
			}, a)
		} else {
			if (Thread_add_result.isNeedWaitForCheck()) {
				n._doInputCount();
				var o = Thread_add_result.getMessage();
				var d = {
					image : '<img style="border:none;" src="http://static.tieba.baidu.com/tb/img/messageFace.gif">',
					subMessage : "等待审核...",
					message : o,
					dialogSet : {
						width : 380,
						height : 105,
						title : "发表贴子"
					}
				};
				n._showErrorTip(d, function() {
					h(Thread_add_result);
					document.getElementById(c.add_post_submit).disabled = false;
					document.getElementById(c.add_post_submit).className = "subbtn_bg";
					n._isPosting = false;
					window.location.reload();
					return true
				})
			} else {
				if (Thread_add_result.isNeedBindPhone()) {
					n._doInputCount();
					if (TED.Storage.isSupport()) {
						n._editor.editorPlugins.draft.set()
					}
					var f = $.dialog.alert("<div style='margin: 15px;'>" + Thread_add_result.getMessage() + "</div>", {
						title : "发贴失败",
						acceptValue : "绑定手机",
						width : 410,
						onaccept : function() {
							var e = location.href;
							if (e.indexOf("#") != -1) {
								e = e.substring(0, e.lastIndexOf("#"))
							}
							location.href = "http://passport.baidu.com/v2/?accountbindphone&tpl=tb&u=" + encodeURIComponent(e + "#sub");
							return false
						},
						onclose : function() {
							var e = document.getElementById(c.add_post_submit);
							e.disabled = false;
							e.className = "subbtn_bg";
							n._isPosting = false
						}
					})
				} else {
					var o = Thread_add_result.getMessage();
					if (l == 40) {
						n._captcha.showErrorTip(o);
						n._captcha.clear();
						n._captcha.focus();
						n._captcha.reload();
						var b = $("#" + c.add_post_submit);
						b.attr("disabled", false);
						b.removeClass("subbtn_bg_banned").addClass("subbtn_bg");
						n._isPosting = false
					} else {
						var d = {
							image : '<img style="border:none;" src="http://static.tieba.baidu.com/tb/img/errorFace.gif">',
							subMessage : "发贴失败",
							message : o,
							dialogSet : {
								width : 410,
								height : 95,
								title : "发表贴子"
							}
						};
						n._showErrorTip(d, function() {
							h(Thread_add_result);
							document.getElementById(c.add_post_submit).disabled = false;
							document.getElementById(c.add_post_submit).className = "subbtn_bg";
							n._isPosting = false;
							return true
						})
					}
				}
			}
		}
	}
};
var PostHandler = {
	post : function(a, b, d, c) {
		$.ajax({
			type : "post",
			async : false,
			dataType : "json",
			url : a,
			data : b,
			success : function(e) {
				if (d) {
					d(e)
				}
			}
		})
	},
	execute : function(b, c, d) {
		var a = FORUM_POST_URL[b];
		PostHandler.post(a, c, d)
	}
};
var QuickPostor = function(c, b) {
	this.pOp = c;
	this.eOp = b;
	var a = $("#" + c.tpl_id).html();
	this.j_postor = $("#" + c._container);
	this._dataPostor = $.extend({}, c._dataPostor);
	var d = this.j_postor;
	d.html(a);
	this.j_ed_container = d.find(".j_ed_container");
	this._enabled = true;
	this._event = {};
	this._isPosting = false;
	this.j_qp_error = d.find(".j_qp_error");
	this.j_btn_submit = d.find(".j_btn_submit");
	this.j_btn_smile = d.find(".j_btn_smile");
	this.j_bannedTip = d.find(".j_bannedTip");
	this.j_qp_captcha = d.find(".j_qp_captcha");
	this._statInit(c._login, c._canPost, c._noUn)
};
QuickPostor.prototype = {
	constructor : QuickPostor,
	_statInit : function(b, d, c) {
		var a = this.pOp;
		if (!b) {
			this._cannotPost();
			this._showBannedTip("cannotPost");
			return
		}
		if (b && d == 1 && c) {
			this._cannotPost();
			this._showBannedTip("noUn");
			return
		}
		if (b && d != 1) {
			this._cannotPost();
			this._showBannedTip("cannotPost");
			return
		}
		if (a._is_block) {
			this._cannotPost();
			this._showBannedTip("isBlock");
			return
		}
		if (b && d == 1 && !c) {
			this._editorInit("enable");
			this._postBtnInit("enable");
			this._smileBtnInit("enable");
			this._captchaInit();
			this._captchaHandler();
			if (this.pOp._setText) {
				this._editorTip("blur")
			}
		}
	},
	_editorInit : function(c) {
		var b = this;
		var a = b.eOp;
		a.container = b.j_ed_container[0];
		switch(c) {
			case"enable":
				a.autoEnable = true;
				b._editor = new TED.SimpleEditor(a);
				b._editorEvent();
				break;
			case"disable":
				a.autoEnable = false;
				b._editor = new TED.SimpleEditor(a);
				break
		}
	},
	_editorEvent : function() {
		var c = this._editor, b = this.pOp, a = this;
		c.on("initcomplete", function() {
			if ($.browser.version > 7) {
				c.focus()
			}
		});
		c.on("overflow", function() {
			a._overFlow()
		});
		c.on("unoverflow", function() {
			a._unoverFlow()
		});
		c.on("keydown", function(d) {
			a._keyDown(d)
		});
		c.on("keyup", function(d) {
			a._keyUp(d)
		});
		c.on("focus", function() {
			a._captchaHandler();
			a._editorTip("focus")
		});
		c.on("blur", function() {
			a._editorTip("blur")
		})
	},
	_editorTip : function(f) {
		var c = this._editor, b = $.trim($(c.editArea).html()), e = this.pOp, d = e._setText, a = this;
		if (d) {
			if (f == "blur" && (b == "" || b == "<br>")) {
				a.j_ed_container.append('<div id="qp_guide_text" class="qp_guide_text">' + d + "</div>").find("#qp_guide_text").click(function() {
					c.focus()
				})
			}
			if (f == "focus") {
				$("#qp_guide_text").remove();
				c.focus()
			}
		}
	},
	_overFlow : function() {
		this._disableEditor()
	},
	_unoverFlow : function() {
		this._enableEditor()
	},
	_keyDown : function(a) {
		if (a.keyCode == 17) {
			this._ctrl_down = true
		} else {
			if (a.keyCode == 13 && this._ctrl_down) {
				this._submit();
				if (a.srcElement) {
					a.srcElement.blur()
				} else {
					a.target.blur()
				}
			}
		}
	},
	_disableEditor : function() {
		var c = this;
		c._enabled = false;
		var a = c.j_btn_submit;
		a.addClass("qp_submit_disabled").removeClass("qp_submit").html("")
	},
	_disableSmile : function() {
		var c = this;
		c._enabled = false;
		var a = c.j_btn_smile, d = c.pOp;
		if (!d._needSmile) {
			a.hide();
			return
		}
		a.removeClass("qp_smile");
		a.html("");
		a.addClass("qp_smile_disabled")
	},
	_enableEditor : function() {
		var c = this;
		c._enabled = true;
		var a = c.j_btn_submit;
		a.removeClass("qp_submit_disabled");
		a.addClass("qp_submit");
		a.html("发表")
	},
	_keyUp : function(a) {
		if (a.keyCode == 17) {
			this._ctrl_down = false
		}
	},
	_cannotPost : function() {
		this._editorInit("disable");
		this._postBtnInit("disable");
		this._smileBtnInit("disable");
		this._enabled = false;
		return
	},
	_postBtnInit : function(c) {
		switch(c) {
			case"disable":
				this._disableEditor();
				break;
			case"enable":
				var a = this;
				var b = a.j_btn_submit;
				this._editor.addPlugin("WordLimit", new TED.EditorPlugins.WordLimit(140));
				b.hover(function() {
					$(this).addClass("qp_submit_hover")
				}, function() {
					$(this).removeClass("qp_submit_hover")
				});
				b.mousedown(function(d) {
					b.addClass("qp_submit_active")
				});
				b.mouseup(function(d) {
					b.removeClass("qp_submit_active");
					a._editor.focus();
					a._submit();
					d.target.blur()
				});
				break
		}
	},
	bind : function(b, a, c) {
		var d = {
			stat : c ? true : false,
			fun : a
		};
		if (this._event[b]) {
			this._event[b].push(d)
		} else {
			this._event[b] = [];
			this._event[b].push(d)
		}
	},
	triggerEvent : function(a, d) {
		if (this._event[a]) {
			var c = this._event[a];
			for (var b = 0; b < c.length; b++) {
				if (c[b].fun) {
					c[b].fun(d)
				}
				if (!c[b].stat) {
					return false
				}
			}
		}
		return true
	},
	_smileBtnInit : function(d) {
		var a = this, c = a.pOp;
		if (!c._needSmile) {
			a.j_btn_smile.hide();
			return
		}
		switch(d) {
			case"disable":
				this._disableSmile();
				break;
			case"enable":
				var b = a.j_btn_smile;
				this._editor.addPlugin("insertsmiley", new TED.EditorPlugins.InsertSmiley(b[0]));
				break
		}
	},
	_tip : ["", "参与本吧讨论，请先 ", "抱歉，本吧目前仅限吧务团队及注册满一定时间的老用户发贴", "抱歉，根据相关法律法规和政策，本吧目前仅允许", "抱歉，本吧目前仅限吧务团队发贴", "抱歉，根据相关法律法规和政策，本吧目前只能浏览，不能发贴"],
	_showBannedTip : function(e) {
		var c = '<div class="editor_banned_tip_info"><span>', d = this.pOp, b = this, a = b.j_bannedTip, f = this._dataPostor;
		switch(e) {
			case"isBlock":
				c += '抱歉，你可能存在违规操作，已被封禁。请<a href="http://tieba.baidu.com/upc/userinfo?fid=' + f.fid + '">点击此处</a>查看详细信息。';
				break;
			case"noUn":
				c += "您还没有用户名，不能回复。请先<a href=\"javascript:void(0)\"  onclick=\"TbCom.process('User','buildUnameFrame','填写用户名',' ')\">填写用户名</a>";
				break;
			case"cannotPost":
				c += b._tip[d._forumType];
				c += "</span>";
				if (d._forumType == 1) {
					c += "<span>";
					c += "<a href=\"#\" onclick=\"TbCom.process('User', 'buildLoginFrame', null,null,null,'lzl');return false;\">登录</a>";
					c += "&nbsp;|&nbsp";
					c += "<a href=\"#\" onclick=\"TbCom.process('User', 'buildRegisterFrame', 'lzl');return false;\">注册</a>"
				} else {
					if (d._forumType == 3) {
						c += '<span><a href="http://tieba.baidu.com/f/like/level?kw=d8" >4级头衔</a>以上会员发贴。'
					}
				}
				break
		}
		c += "</span></div>";
		a.html(c);
		a.show()
	},
	_captchaInit : function(b) {
		var c = {
			container : "#qp_captcha"
		};
		var d = this.pOp._captchaReq, a = this;
		this._captcha = d.getCaptchaInstance(c);
		if (this._captcha) {
			this._captcha.j_input.bind("keydown", function(g) {
				var f = g.keyCode;
				if (f == 13) {
					a._submit()
				}
			})
		}
	},
	_postSuccess : function() {
		var c = this, e = c.j_bannedTip, b = "", a = this._editor, d = a.editArea;
		e.css({
			top : "10px",
			left : "250px"
		});
		$(d).css({
			backgroundColor : "#F7F7F7"
		});
		b += '<div class="editor_banned_tip_info"><span class="postor_success"></span><span style="font-weight:bold;">发表成功！</span></div>';
		e.html(b);
		e.show();
		setTimeout(function() {
			e.hide();
			$(d).css({
				backgroundColor : "#FFFFFF"
			})
		}, 1000)
	},
	_captchaHandler : function() {
		var a = this, c = a.j_qp_captcha, b = a.pOp._captchaReq;
		var d = function() {
			if (b.needCaptcha == 1) {
				a._captcha.show();
				c.show();
				a.j_postor.find(".j_captcha_wrap").show()
			} else {
				c.hide();
				a.j_postor.find(".j_captcha_wrap").hide()
			}
		};
		b.antiProcess(d)
	},
	_getData : function() {
		var a = this, c = a._dataPostor;
		c.content = a._getHtml();
		var b = "";
		c.vcode_md5 = "";
		if (this._captcha) {
			b = this._captcha.getInputValue();
			c.vcode_md5 = this._captcha.signStr
		}
		if (b != "") {
			c.vcode = b
		}
		return c
	},
	_getHtml : function() {
		var a = this._editor.getHtml();
		a = a.replace(/<br[^>]*>/gi, " ").replace(/[\u3000\s]+/g, " ").replace(/&nbsp;/g, " ");
		return a
	},
	_validate : function() {
		var a = this, c = this._editor, b = a.j_qp_error;
		if (!this._enabled) {
			return false
		}
		if (c.isEmpty()) {
			c.focus();
			b.html("发贴内容需包含文字").show();
			return false
		}
		if (c.getSmileyNum() > 10) {
			b.html("抱歉，每层楼插入的表情不能超过10个，请修改后重新提交").show();
			return false
		}
		if (a._captcha && !a._captcha.validCaptcha()) {
			a._captcha.j_tip.hide();
			return false
		}
		return true
	},
	_submit : function() {
		this.triggerEvent("onsubmit");
		if (this._isPosting) {
			return
		} else {
			this._isPosting = true
		}
		if (!this._validate()) {
			return
		}
		this.j_qp_error.hide();
		this._disableEditor();
		var a = this;
		$.tb.post(FORUM_POST_URL.postAdd, a._getData(), function(b) {
			if (b.no == 0) {
				var c = a.triggerEvent("onsuccess");
				if (!c) {
					return
				}
				a._postSuccess();
				a._editor.empty();
				a._enableEditor();
				if (a._captcha) {
					a._captcha.reload();
					a._captcha.j_input.val("");
					a._captcha.j_error.hide()
				}
			} else {
				a._showAddResult(b);
				a._enableEditor()
			}
			a._isPosting = false;
			return false
		})
	},
	showPostor : function() {
		this.j_postor.show()
	},
	hidePostor : function() {
		this.j_postor.hide()
	},
	setDataPostor : function(a) {
		var b = this;
		if (a) {
			b._dataPostor = $.extend(true, b._data_postor, a)
		}
	},
	removeDataPostor : function(b) {
		var a = this;
		if (a._dataPostor[b]) {
			delete a._dataPostor[b]
		}
	},
	_showErrorTip : function(a, d) {
		var b = '<div style="margin: 0px 30px 0px 30px;font-size:14px;line-height:20px;text-align:left;font-family: "宋体";"><table style="width:90%"><tbody><tr><td width="60">' + a.image + '</td><td valign="middle" style="font-size:20px;line-height:22px;font-family: "黑体";">' + a.subMessage + "</td></tr></tbody></table>" + a.message + "</div>";
		var c = $.dialog.alert(b, a.dialogSet);
		c.bind("onclose", d)
	},
	_errorTipShow : function(b) {
		var a = this;
		a.j_qp_error.html(b).show();
		a.j_qp_error.focus()
	},
	_showAddResult : function(c) {
		var b = this;
		Thread_add_result.init(c);
		if (c.no != 0) {
			if (Thread_add_result.isNeedWaitForCheck()) {
				var d = Thread_add_result.getMessage();
				var a = {
					image : '<img style="border:none;" src="http://static.tieba.baidu.com/tb/img/messageFace.gif">',
					subMessage : "等待审核...",
					message : d,
					dialogSet : {
						width : 380,
						height : 105,
						title : "发表贴子"
					}
				};
				b._showErrorTip(a, function() {
					b._editor.empty();
					b._editor.focus();
					return true
				})
			} else {
				if (c.no == 901) {
					var e = "本楼层回复已达上限，请参与其他楼层讨论";
					b._errorTipShow(e)
				} else {
					if (c.no == 814) {
						var e = "抱歉，每层楼插入的表情不能超过10个，请修改后重新提交";
						b._errorTipShow(e)
					} else {
						if (c.no == 902) {
							var e = "抱歉，每层楼输入的文字不能超过140个，请修改后重新提交";
							b._errorTipShow(e)
						} else {
							if (c.no == 40) {
								var e = "验证码输入错误，请您返回后重新输入";
								b._errorTipShow(e)
							} else {
								var d = Thread_add_result.getMessage();
								var a = {
									image : '<img style="border:none;" src="http://static.tieba.baidu.com/tb/img/errorFace.gif">',
									subMessage : "发贴失败",
									message : d,
									dialogSet : {
										width : 410,
										height : 95,
										title : "发表贴子"
									}
								};
								b._showErrorTip(a, function() {
									b._editor.focus();
									return true
								})
							}
						}
					}
				}
			}
		}
	}
};
var Captcha = {
	forum_id : "",
	forum_name_u : "",
	_container_ele : "captcha_container",
	_content_ele : "captcha_content",
	_error_ele : "captcha_error",
	_img_url : "/cgi-bin/genimg?",
	_audio_url : "/cgi-bin/genaudio?",
	_need_update : true,
	sign_str : "",
	getData : function() {
		AntiAnswer.antiProcess();
		var a = AntiAnswer.getVcodeUrl() + "&t=" + Math.random();
		$.ajax({
			url : a,
			dataType : "json",
			success : function(c) {
				var b = c.data;
				Captcha.sign_str = b.vcodestr
			},
			async : false
		});
		document.getElementById("vcode_md5").value = Captcha.sign_str
	},
	changeYImg : function(a) {
		var b = a;
		b.src = "http://static.tieba.baidu.com/tb/img/errorYimg.jpg"
	},
	init : function() {
		if (!this._need_update) {
			return
		}
		this._need_update = false;
		this.getData();
		var c = document.getElementById("captcha_img");
		var a = this._img_url + this.sign_str + "&t=" + Math.random();
		if (!c) {
			var b = document.getElementById("captcha_img_con");
			b.innerHTML = '<img onerror="Captcha.changeYImg(this);" id="captcha_img" src="' + a + '" style="margin-bottom:-3px;">'
		} else {
			c.src = a
		}
		document.getElementById(this._content_ele).style.display = ""
	},
	reload : function() {
		this.reset();
		this.init()
	},
	updateImage : function() {
		Captcha._need_update = false;
		var b = document.getElementById("captcha");
		b.value = "";
		b.focus();
		var a = this._img_url + this.sign_str + "&t=" + Math.random();
		document.getElementById("captcha_img").src = a
	},
	getAudio : function() {
		Captcha._need_update = false;
		document.getElementById("audio_img").style.display = "";
		var a = document.getElementById("captcha_audio");
		var b = this._audio_url + this.sign_str + "&t=" + Math.random();
		if (!document.all) {
			a.innerHTML = '<embed src="' + b + '" name="MediaPlayer" type="video/x-ms-wmv" autostart="1" showcontrols="1" allowscan="1" playcount="1" enablecontextmenu="0" height="0" width="0"></object>'
		} else {
			a.innerHTML = '<object height=0 width=0 classid=CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6><param name="AutoStart" value="1"><param NAME="url" value="' + b + '"><param name="PlayCount" value="1">'
		}
		document.getElementById("captcha").focus()
	},
	show : function() {
		document.getElementById(Captcha._container_ele).style.display = "";
		var d = document.getElementById(Captcha._content_ele);
		if (d.innerHTML != "") {
			return
		}
		var c = '<table style="width:auto;"><tr><td id="captcha_img_con"></td><td valign="bottom">&nbsp;&nbsp;<a href="" onclick="Captcha.reload();return false;">看不清?</a>&nbsp;<a href="" id="listen_vcode"  onclick="Captcha.getAudio();return false;">收听验证码</a></td><td valign="bottom"><img id="audio_img" src="http://static.tieba.baidu.com/tb/img/audio.gif" style="display:none;vertical-align:top;"><span id="captcha_audio"></span></td></tr></table>';
		d.innerHTML = c;
		var b = document.getElementById("captcha_tip");
		var a = document.getElementById("captcha");
		var e = document.getElementById("listen_vcode");
		if (AntiAnswer.answer.showShenshou == 1 && b) {
			b.innerHTML = "为抵御爆吧挖坟危害，本吧吧主已暂时放出贴吧神兽--超级验证马。";
			if (a) {
				a.style.imeMode = "active"
			}
			if (e("listen_vcode")) {
				e("listen_vcode").style.display = "none"
			}
		}
	},
	hide : function() {
		document.getElementById(Captcha._container_ele).style.display = "none";
		document.getElementById(Captcha._content_ele).style.display = "none";
		document.getElementById("captcha").value = "";
		var a = document.getElementById(Captcha._error_ele);
		a.innerHTML = "";
		a.style.display = "none"
	},
	controlVerify : function(a) {
		if (a > 5000) {
			Captcha.show();
			return 1
		}
		AntiAnswer.antiProcess();
		if (PageData.need_captcha) {
			Captcha.show();
			return 1
		} else {
			Captcha.hide();
			return 0
		}
	},
	reset : function() {
		this._need_update = true
	}
};
var AntiAnswer = {
	_is_anomy : 0,
	_vcodeUrl : "",
	answer : {
		antiNeedVerify : null,
		antiNeedVerifyA : null
	},
	post_type : "thread",
	forum_name_url : "",
	forum_id : 0,
	_ifHasKnowAnti : function(a) {
		switch(a) {
			case 1:
				return !(this.answer.antiNeedVerifyA == null);
				break;
			case 0:
			default:
				return !(this.answer.antiNeedVerify == null)
		}
	},
	setVcodeUrl : function(a) {
		this._vcodeUrl = a
	},
	getVcodeUrl : function() {
		return this._vcodeUrl
	},
	_getAntiAnswer : function() {
		var b = "/f/user/json_needvcode?rs1=" + (this._is_anomy == 1 ? "1" : "0") + "&rs10=" + (this.post_type == "thread" ? "1" : "0") + "&lm=" + this.forum_id + "&word=" + this.forum_name_url + "&t=" + Math.random();
		if (this.tid) {
			b += "&tid=" + this.tid
		}
		var a = this;
		$.ajax({
			url : b,
			dataType : "json",
			async : false,
			success : function(c) {
				a.handleAnswer(c.data)
			}
		});
		setTimeout(function() {
			if (!PageData.tbs_loaded) {
				TbUtil.requestTbs()
			}
		}, 30)
	},
	handleAnswer : function(a) {
		if (this._is_anomy == 1) {
			this.answer.antiNeedVerifyA = a.need
		} else {
			this.answer.antiNeedVerify = a.need
		}
		this.answer.showShenshou = a.open_shenshou;
		if (this.tid) {
			a.vcodeUrl += "&tid=" + this.tid
		}
		this.setVcodeUrl(a.vcodeUrl)
	},
	antiProcess : function() {
		this._is_anomy = 0;
		var b = document.getElementById("post_anonym");
		if (b && (b.checked)) {
			this._is_anomy = 1
		}
		var a = "";
		if (!this._ifHasKnowAnti(this._is_anomy)) {
			this._getAntiAnswer()
		}
		if (this._is_anomy) {
			a = this.answer.antiNeedVerifyA
		} else {
			a = this.answer.antiNeedVerify
		}
		if (a == "1") {
			PageData.need_captcha = 1
		} else {
			PageData.need_captcha = 0
		}
	},
	init : function(b, c, a) {
		this.forum_name_url = b;
		this.forum_id = c;
		if (a == "reply") {
			this.post_type = "reply";
			if (PageData.thread) {
				this.tid = PageData.thread.id
			}
		}
	}
};
if (!UTSTART) {
	var UTSTART = new Date().getTime()
}
if (!MOUSEPWD_CLICK) {
	var MOUSEPWD_CLICK = 0
}
var MousePwd = (function() {
	var n = {
		ea : [],
		ma : []
	};
	var h = {};
	var c = false;
	var i = (new Date()).getTime();
	var o = {};
	var j = [];
	var q = [];
	function k(v) {
		if (!v) {
			var v = window.event
		}
		var t = 0;
		var w = 0;
		if (v.pageX || v.pageY) {
			t = v.pageX;
			w = v.pageY
		} else {
			if (v.clientX || v.clientY) {
				t = v.clientX + document.body.scrollLeft;
				w = v.clientY + document.body.scrollTop
			}
		}
		return [t, w]
	}

	function b(t) {
		return t.offsetParent ? (t.offsetLeft + b(t.offsetParent)) : t.offsetLeft
	}

	function a(t) {
		return t.offsetParent ? (t.offsetTop + a(t.offsetParent)) : t.offsetTop
	}

	function p(t) {
		if (t.preventDefault) {
			t.preventDefault()
		} else {
			window.event.returnValue = false
		}
	}

	function u(B) {
		B.stopPropagation();
		var w = k(B);
		var y = n[this.id];
		if (y) {
			if (!y.hover) {
				y.hover = true;
				y.count++
			}
		} else {
			var x = b(this);
			var z = a(this);
			var A = x + this.offsetWidth;
			var v = z + this.offsetHeight;
			y = n[this.id] = {
				hover : true,
				count : 1,
				left : x,
				top : z,
				right : A,
				buttom : v
			}
		}
		if (!y["mouse" + y.count]) {
			y["mouse" + y.count] = [];
			y["time" + y.count] = {
				start : (new Date()).getTime()
			};
			n.ma.push(y["mouse" + y.count])
		}
		y["mouse" + y.count].push(w);
		q.push("1")
	}

	function r(w) {
		w.stopPropagation();
		var t = k(w);
		var v = n[this.className];
		if (v && v.hover) {
			if (t[0] && t[0] > v.left && t[0] < v.right && t[1] && t[1] > v.top && t[1] < v.buttom) {
				return
			}
			v["time" + v.count].end = (new Date()).getTime();
			v.hover = false
		}
		q.push("0")
	}

	function e() {
		var t = n.ma.length;
		if (t > 0) {
			var v = n.ma[t - 1];
			return v[v.length - 1]
		}
	}

	function f() {
		var v = "";
		var t = q.length;
		if (t > 10) {
			q = q.slice(t - 10)
		}
		v = q.join(",");
		return v
	}

	function l() {
		if (c) {
			return h
		}
		var t = [e(), f(), (new Date()).getTime() - UTSTART, [screen.width, screen.height].join(",")].join("\t");
		h.c = d(t) + "," + i + "" + MOUSEPWD_CLICK;
		c = true;
		return h
	}

	function d(z) {
		var t = [];
		var x = {};
		var y = i % 100;
		for (var w = 0, v = z.length; w < v; w++) {
			var A = z.charCodeAt(w) ^ y;
			t.push(A);
			if (!x[A]) {
				x[A] = []
			}
			x[A].push(w)
		}
		return t
	}

	function g() {
		return this.className
	}

	function m(t) {
		this.elements = t;
		$.each(t, function(v, w) {
			$("." + w.toString()).bind("mouseover", u);
			$("." + w.toString()).bind("mouseout", r);
			o[w.toString()] = v
		});
		$("body").bind("click", function() {
			MOUSEPWD_CLICK = 1
		})
	}
	return {
		start : m,
		report : l,
		time : i
	}
})(); 
PostDataModule = {
	"ie":"utf-8",
	"kw":"zyeh",
	"fid":22789185,
	"tid":0,
	"vcode_md5":"",
	"floor_num":0,
	"rich_text":1,
	"tbs":"501367325a8cf1881605949618",
	"content":"这是跨时代的帖子!",
	"basilisk":1,
	"title":"如果你能看到的话...",
	"prefix":"",
	"mouse_pwd":"19,19,43,46,40,43,34,19,43,35,40,42,54,43,42,34,42,16059498889260",
	"mouse_pwd_t":1605949888926,
	"mouse_pwd_isclick":1,
	"nick_name":"文Aya♬",
	"_type_":"thread",
	"geetest_success":0,
	"_BSK":"ThJcBxQNEQcMWQhPVhMUGl8EEg8ZBgkHBggAAQAfFFoAEA9BXgIKQl0UE18BFwMUTUREXRkSWgIUDRNUVA1LBkoTSAsTDBBTWFhKUx0aQgITCRR5Zn55QxRBEgAaAhNQRVtaQFBZXxhBX2JHRF5dVR1IGBhGalZZRV9GUBlXVlJUZRVNEx8URQIQD0NeFghSTFFeWBBHWFpdWVwQHBBKE21ZUkZcF11DBV5cXWwWTRcVFlwHEwIVAgECAQcGAwRNGg9UEwIYRURFUBUWXQcTAhd+ZH96FR8QRlAaWUYACAABGhJYCxYDFBkABQgdBQIOARsZSQlRUAAUDwcGGRkRBwkPHQ4CBBgfHgUAHgFXCkpKGQkKBwQcBAsdFR4JDgccAAcCHh8aBFMAVUoADwoYGhgCCAcVBhgUHQEHAhoFBhsZSQlRVgIUDwMBGRcVFlQDEwIVVlBfRVIfEFlQGllEVFYVZGUSGRtaChQLGAcAAAQGAgIDGUNZUEQLGF5QWkNQFRZYBBMCFQEBCwYbEUYHQwJDVwcIDQgDAAEABhUURgwXChNEX1lXXUJNSwYKVxRcXlVFWFxaTRpfWVhVHV9ZVFJGXA5WTwVES0xeW3VZXFlcWEVLGVhYQEJYQUsZDVcAB0VRV19UUUcVWVxYRFpUQh1DU0VAXVsAVAEHQxRLUkRfWVVWWERCFEZEUEdDRFFTR01MDAldWllDGkNBWEBMRR1bWV9CVlIbVUBUDF0QSl1dVlZCWBlNW0kaXkhQXlRBGkdSQFAPTE8AQ1lVVHNcUFRRV0ITFBdAAxEMFWRbW1IKQUoTSwoTDBAEAAYJGhNZARILE1BWX0FQTRoUVRMCGFdXXEZcGBtGABoPEhQEdBIBAEEDS0ZUAx0LcBMCBwwECAUHDwYCBFIOVFUDDVkJVVYEAQwIAAENHAYLEwZ8FxwTRgcVCRB4DkIKCl1ZFwQYABURY1BYVVdCQxF9YhcCAhtRA0MxWFYOBQ0QTQ8AEBZwSEVcVGRTVXhbQU4NUFEfCw4RHnt9bXl1GhFUXFtUE3FSUFlaSBggDkNXVVQZCAMXBBcCAwwFHgALBRdgU1MASgpJBAsPHwUGFxUWVwcTAhUCAQIBBwYDBE0aAFcTAhhFREVQFRZKBRMCFURDRlMbEVkHQwJBKGR0dBMaEkIIFgMUf215fBMfFFoCEA9DWgIVWFRRQl1vVHVCCVxWGhkSUAIUDRMDDVQAHg=="	
};
