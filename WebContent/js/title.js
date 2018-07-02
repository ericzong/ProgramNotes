/*
    功能：生成博客目录的JS工具
    测试：IE8，火狐，google测试通过
 */
var BlogDirectory = {
	/*
	 * 获取元素位置，距浏览器左边界的距离（left）和距浏览器上边界的距离（top）
	 */
	getElementPosition : function(ele) {
		var topPosition = 0;
		var leftPosition = 0;
		while (ele) {
			topPosition += ele.offsetTop;
			leftPosition += ele.offsetLeft;
			ele = ele.offsetParent;
		}
		return {
			top : topPosition,
			left : leftPosition
		};
	},

	/*
	 * 获取滚动条当前位置
	 */
	getScrollBarPosition : function() {
		var scrollBarPosition = document.body.scrollTop
				|| document.documentElement.scrollTop;
		return scrollBarPosition;
	},

	/*
	 * 移动滚动条，finalPos 为目的位置，internal 为移动速度
	 */
	moveScrollBar : function(finalpos, interval) {

		// 若不支持此方法，则退出
		if (!window.scrollTo) {
			return false;
		}

		// 窗体滚动时，禁用鼠标滚轮
		window.onmousewheel = function() {
			return false;
		};

		// 清除计时
		if (document.body.movement) {
			clearTimeout(document.body.movement);
		}

		var currentpos = BlogDirectory.getScrollBarPosition();// 获取滚动条当前位置

		var dist = 0;
		if (currentpos == finalpos) {// 到达预定位置，则解禁鼠标滚轮，并退出
			window.onmousewheel = function() {
				return true;
			}
			return true;
		}
		if (currentpos < finalpos) {// 未到达，则计算下一步所要移动的距离
			dist = Math.ceil((finalpos - currentpos) / 10);
			currentpos += dist;
		}
		if (currentpos > finalpos) {
			dist = Math.ceil((currentpos - finalpos) / 10);
			currentpos -= dist;
		}

		var scrTop = BlogDirectory.getScrollBarPosition();// 获取滚动条当前位置
		window.scrollTo(0, currentpos);// 移动窗口
		if (BlogDirectory.getScrollBarPosition() == scrTop)// 若已到底部，则解禁鼠标滚轮，并退出
		{
			window.onmousewheel = function() {
				return true;
			}
			return true;
		}

		// 进行下一步移动
		var repeat = "BlogDirectory.moveScrollBar(" + finalpos + "," + interval
				+ ")";
		document.body.movement = setTimeout(repeat, interval);
	},

	htmlDecode : function(text) {
		var temp = document.createElement("div");
		temp.innerHTML = text;
		var output = temp.innerText || temp.textContent;
		temp = null;
		return output;
	},
	
	getText : function(node, pre) {
		var nodetext = node.innerHTML.replace(/<\/?[^>]+>/g, "");// innerHTML里面的内容可能有HTML标签，所以用正则表达式去除HTML的标签
		nodetext = nodetext.replace(/&nbsp;/ig, "");// 替换掉所有的&nbsp;
		nodetext = BlogDirectory.htmlDecode(nodetext);
		nodetext = pre + ' ' + nodetext;
		
		return nodetext;
	},
	
	createLink : function(item, nodetext, num, interval) {
		// 创建锚链接
		var itemtext = document.createTextNode(nodetext);
		item.appendChild(itemtext);
		item.setAttribute("name", num);
		item.onclick = function() { // 添加鼠标点击触发函数
			var pos = BlogDirectory.getElementPosition(document.getElementById("blogTitle"
							+ this.getAttribute("name")));
			if (!BlogDirectory.moveScrollBar(pos.top, interval)) {
				return false;
			}
		};
	},

	/*
	 * 创建目录， interval 表示移动的速度
	 */
	createBlogDirectory : function(interval) {
		// 创建目录的div容器
		var divSideBar = document.createElement('div');
		divSideBar.className = 'sideBar';
		divSideBar.setAttribute('id', 'sideBar');
		var divSideBarTab = document.createElement('div');
		divSideBarTab.setAttribute('id', 'sideBarTab');
		divSideBar.appendChild(divSideBarTab);
		var title = document.createElement('div');
		divSideBarTab.appendChild(title);
		var txt = document.createTextNode('目录导航');
		title.appendChild(txt);
		var divSideBarContents = document.createElement('div');
		divSideBarContents.style.display = 'none';
		divSideBarContents.setAttribute('id', 'sideBarContents');
		divSideBar.appendChild(divSideBarContents);
		// 创建自定义列表
		var dlist = document.createElement("dl");
		divSideBarContents.appendChild(dlist);
		
		var h1Count = 0;
		var h2Count = 0;
		var h1Item;
		var nodes = document.getElementsByTagName('*');
		for(var i = 0; i < nodes.length; i++) {
			var tagName = nodes[i].tagName.toLowerCase();
			if(tagName == 'h1' || tagName == 'h2') {
				var pre;
				var id;
				var item;
				var num;
				if(tagName == 'h1') {
					h1Count++;
					h2Count = 0;
					
					pre = h1Count + ' ';
					num = h1Count;
					item = document.createElement('div');
					h1Item = item;
				} else if(tagName == 'h2') {
					h2Count++;
					
					pre = '　' + h1Count + '.' + h2Count + ' ';
					num = h1Count + '_' + h2Count;
					item = document.createElement('div');
				}
				
				// 获取标题文本
				id = 'blogTitle' + num;
				var nodeText = BlogDirectory.getText(nodes[i], pre);
				nodes[i].setAttribute('id', id);
				
				BlogDirectory.createLink(item, nodeText, num, interval);
				
				dlist.appendChild(item);
			}
			
		}
		
		/* 鼠标进入时的事件处理 */
		divSideBarTab.onmouseenter = function() {
			divSideBarContents.style.display = 'block';
		}
		/* 鼠标离开时的事件处理 */
		divSideBar.onmouseleave = function() {
			divSideBarContents.style.display = 'none';
		}

		document.body.appendChild(divSideBar);
		if(document.all) { 
			event.cancelBubble = true;
		} 
	}

};

window.onload = function() {
	BlogDirectory.createBlogDirectory(20);
}