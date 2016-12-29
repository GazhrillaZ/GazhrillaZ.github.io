		window.onload = function(){
			var showBox = document.getElementById("showBox");
			var imgBox = document.getElementById("imgBox");
			var btns = document.getElementById("btns").getElementsByTagName("span");
			var prev = document.getElementById("prev");
			var next = document.getElementById("next");
			var now = 0;  //用来记录当前亮起的小圆点
			var changed = false; //用来标记图片是否正在切换
			var timer,jianGe=1500;

			function showButton(){
				for(var i = 0; i < btns.length; i++){
					if(btns[i].className == "on"){
						btns[i].className = "";
					    break;
					}
				}
				btns[now].className = "on";
			}
			function change(parameter){
				changed = true;
				var newLeft = parseInt(imgBox.style.left) + parameter;
				var shiJian = 500; //位移总时间
				var interval = 10; //位移间隔时间
				var speed = parameter/(shiJian/interval); //每次位移的距离
				function animate(){
					if((speed < 0 && parseInt(imgBox.style.left) > newLeft) || 
					   (speed > 0 && parseInt(imgBox.style.left) < newLeft)){
						imgBox.style.left = parseInt(imgBox.style.left) + speed +"px";
						setTimeout(animate,interval);
					}else{
						changed = false;
						imgBox.style.left = newLeft + "px";
						if(newLeft < -7200){
							imgBox.style.left = -1200 + "px";
						}
						if(newLeft > -1200){
							imgBox.style.left = -7200 + "px";
						}
					}
				}
				animate();	
			}
			next.onclick = function(){
				if(changed){
					return;
				}
				if(now == 5){
					now = 0;
				}else{
					now += 1;
				}
				showButton();
				change(-1200);
			}
			prev.onclick = function(){
				if(changed){
					return;
				}
				if(now == 0){
					now = 5;
				}else{
					now -= 1;
				}
				showButton();
				change(1200);
			}
			for(var i = 0; i < btns.length; i++){
				btns[i].onclick = function(){
					if(changed){
						return;
					}
					if(this.className == "on")
						return;
					var newNum = parseInt(this.getAttribute("num"));
					var parameter = -1200 * (newNum - now - 1);
					now = newNum - 1;
					showButton();
					change(parameter);
				}
			}

			function play(){
				timer = setInterval(function(){
					next.onclick();
					//play();
				},jianGe);
			}
			function stop(){
				clearInterval(timer);
			}
			showBox.onmouseover = stop;
			showBox.onmouseout = play;
			play();
		}	