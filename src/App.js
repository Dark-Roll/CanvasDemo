import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Snow from './Snow';


class App extends Component {
	constructor(props) {
		super()
		this.canvasRef = React.createRef();
	}


	componentDidMount() {

		// let canvas = document.getElementById("canvas")
		// // canvas.addEventListener("mousemove", function(e) {
		// // 	mX = e.clientX,
		// // 	mY = e.clientY
		// // });

		// window.addEventListener("resize",function(){
		// 	canvas.width = window.innerWidth;
		// 	canvas.height = window.innerHeight;
		// })

		// this.updateCanvas();
		// console.log(this.canvasRef.current);

		// let x = 0
		// let y = 0
		// let canvas = this.canvasRef.current
		// let ctx = canvas.getContext('2d')

		// let moveX = 2
		// let moveY = 2

		// function draw(){

		// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
		// 	ctx.beginPath()
		// 	ctx.arc(x, y, 10, 0, Math.PI * 2);
		// 	ctx.fillStyle = '#0095DD'
		// 	ctx.fill()
		// 	ctx.closePath()
		// 	x = x + moveX
		// 	y = y + moveY


		// }

		// setInterval( draw, 100 )

		// **********************



		// 使用最优频率requestAnimationFrame代替定时器
		window.rAF = (function () {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					setTimeout(callback, 1000 / 60);
				};
		})();
		// 辅助方法
		var Tools = {
			createRandom: function (n, m) {
				return Math.floor(Math.random() * (m - n) + n);
			},

			radian: function (deg) {
				return deg * Math.PI / 180;
			}
		};


		// 默认配置
		var defaultSetting = {
			width: 900,
			height: 300,
			canvas: null,
			ctx: null,
			snowArr: [],
			total: 80
		};

		// 页面加载完成后开始执行动画
		document.addEventListener("DOMContentLoaded", function () {
			defaultSetting.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			defaultSetting.canvas = document.getElementById("canvas");
			defaultSetting.canvas.setAttribute("width", defaultSetting.width);
			defaultSetting.ctx = defaultSetting.canvas.getContext("2d");

			for (var i = 0; i < defaultSetting.total; i++) {
				defaultSetting.snowArr.push({
					"left": Tools.createRandom(0, defaultSetting.width),
					"top": Tools.createRandom(0, defaultSetting.height),
					"deg": Tools.createRandom(-6, 6),
					// "scale":Tools.createRandom(3, 6)
				});
			}

			function updateSnow() {
				defaultSetting.ctx.clearRect(0, 0, defaultSetting.width, defaultSetting.height);
				defaultSetting.ctx.save();


				// defaultSetting.ctx.beginPath();
				for (var i = 0; i < defaultSetting.snowArr.length; i++) {
					// var h = 0.5 * defaultSetting.snowArr[i].scale;
					defaultSetting.snowArr[i].left = defaultSetting.snowArr[i].left + Math.tan(Tools.radian(defaultSetting.snowArr[i].deg)) /* *h */ / 2;
					defaultSetting.snowArr[i].top = defaultSetting.snowArr[i].top // + h;

					// 删除画面外的雪花
					if (defaultSetting.snowArr[i].left < 0 || defaultSetting.snowArr[i].left > defaultSetting.width || defaultSetting.snowArr[i].top > defaultSetting.height) {
						defaultSetting.snowArr.splice(i--, 1);
						continue;
					}

					// var width_i = defaultSetting.snowArr[i].scale;
					// 雪花边界投影
					var ra = defaultSetting.ctx.createRadialGradient(defaultSetting.snowArr[i].left, defaultSetting.snowArr[i].top, /* width_i*/ 3 / 4, defaultSetting.snowArr[i].left, defaultSetting.snowArr[i].top, 3 /*width_i*/);
					ra.addColorStop(0, "rgba(255,255,255,0.8)");
					ra.addColorStop(1, "rgba(255,255,255,0.1)");
					defaultSetting.ctx.fillStyle = ra;

					defaultSetting.ctx.beginPath();
					defaultSetting.ctx.arc(defaultSetting.snowArr[i].left, defaultSetting.snowArr[i].top, 3 /* width_i */, 0, 2 * Math.PI);
					defaultSetting.ctx.fill();
				}
				// defaultSetting.ctx.fill();

				defaultSetting.ctx.restore();

				// 持续刷新雪花的位置
				window.rAF(updateSnow);
			}

			//初始画雪花
			updateSnow();


			// //point collection.draw()
			// this.draw=function(){
			// 	for(let i=0;i<this.points.length;i++){
			// 		points[i].draw();
			// 	}
			// };

			// //points.draw
			// this.draw=function(){
			// 	ctx.fillStyle=color;
			// 	ctx.beginPath();
			// 	ctx.arc(this.curPos.x,this.curPos.y,radius,0,Math.PI*2,true);
			// 	ctx.fill();
			// 	ctx.closePath();
			// };


			// 增加新的雪花
			// function createNewSnow(){
			// 	setTimeout(function(){
			// 		if(defaultSetting.snowArr.length < 200){
			// 			for(var i=0; i<20; i++){
			// 				defaultSetting.snowArr.push({
			// 					"left":Tools.createRandom(0, defaultSetting.width),
			// 					"top":0,
			// 					"deg":Tools.createRandom(-6, 6),
			// 					"scale":Tools.createRandom(3, 6)
			// 				});
			// 			}
			// 		}
			// 		createNewSnow();
			// 	}, Math.random()*200+500);
			// }
			// createNewSnow();
		});




		// Original JavaScript code by Chirp Internet: www.chirp.com.au
		// Please acknowledge use of this code by including this header.

		document.addEventListener("DOMContentLoaded", function () {
			var num_launchers = 12;
			var num_flares = 20;
			var flare_colours = ['red', 'aqua', 'violet', 'yellow', 'lightgreen', 'white', 'blue'];
			var cssIdx = document.styleSheets.length - 1;

			function myRandom(from, to) {
				return from + Math.floor(Math.random() * (to - from));
			}

			var keyframes_template = "from { left: LEFTFROM%; top: 380px; width: 6px; height: 12px; }\n"
				+ "33% { left: LEFTTOP%; top: TOPTOPpx; width: 0; height: 0; }\n"
				+ " to { left: LEFTEND%; top: BOTBOTpx; width: 0; height: 0; }";

			for (var i = 0; i < num_launchers; i++) {
				let leftfrom = myRandom(15, 85);
				let lefttop =  leftfrom%2 === 1 ? myRandom(0, 30) : myRandom(1, 15)
				// myRandom(30, 70);
				let leftend = lefttop + (lefttop - leftfrom) / 2;
				// lefttop + (lefttop - leftfrom) / 2;
				let toptop = myRandom(20, 200);
				let botbot = toptop + 100;

				let csscode = keyframes_template;
				csscode = csscode.replace(/LEFTFROM/, leftfrom);
				csscode = csscode.replace(/LEFTTOP/, lefttop);
				csscode = csscode.replace(/TOPTOP/, toptop);
				csscode = csscode.replace(/LEFTEND/, leftend);
				csscode = csscode.replace(/BOTBOT/, botbot);

				try { // WebKit browsers
					let csscode2 = "@-webkit-keyframes flight_" + i + " {\n" + csscode + "\n}";
					document.styleSheets[cssIdx].insertRule(csscode2, 0);
				} catch (e) { }

				try { // Mozilla browsers
					let csscode2 = "@-moz-keyframes flight_" + i + " {\n" + csscode + "\n}";
					document.styleSheets[cssIdx].insertRule(csscode2, 0);
				} catch (e) { }
			}

			for (var i = 0; i < num_launchers; i++) {
				var rand = myRandom(0, flare_colours.length - 1);
				var rand_colour = flare_colours[rand];
				var launch_delay = myRandom(0, 100) / 10;

				let csscode = ".launcher:nth-child(" + num_launchers + "n+" + i + ") {\n"
					+ "  -webkit-animation-name: flight_" + i + ";\n"
					+ "  -webkit-animation-delay: " + launch_delay + "s;\n"
					+ "  -moz-animation-name: flight_" + i + ";\n"
					+ "  -moz-animation-delay: " + launch_delay + "s;\n"
					+ "}";
				document.styleSheets[cssIdx].insertRule(csscode, 0);

				csscode = ".launcher:nth-child(" + num_launchers + "n+" + i + ") div {"
					+ "  border-color: " + rand_colour + ";\n"
					+ "  -webkit-animation-delay: " + launch_delay + "s;\n"
					+ "  -moz-animation-delay: " + launch_delay + "s;\n"
					+ "}";
				document.styleSheets[cssIdx].insertRule(csscode, 0);
			}

			for (var i = 0; i < num_flares; i++) {
				let csscode = ".launcher div:nth-child(" + num_flares + "n+" + i + ") {\n"
					+ "  -webkit-transform: rotate(" + (i * 360 / num_flares) + "deg);\n"
					+ "  -moz-transform: rotate(" + (i * 360 / num_flares) + "deg);\n"
					+ "}";
				document.styleSheets[cssIdx].insertRule(csscode, 0);
			}

			for (var i = 0; i < num_launchers; i++) {
				var newdiv = document.createElement("div");
				newdiv.className = "launcher";
				for (var j = 0; j < num_flares; j++) {
					newdiv.appendChild(document.createElement("div"));
				}
				document.getElementById("stage").appendChild(newdiv);
			}
		}, false);



	}

	updateCanvas() {
		// const ctx = this.refs.canvas.getContext('2d');
		// console.log(this.refs);
		// console.log(ctx);

		// ctx.fillRect(0,0, 100, 100);
	}

	render() {






		// console.log(this.canvasRef);




		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"
						style={{ position: 'relative', zIndex: 1 }} />
					<p>
						Edit <code>src/App.js</code> and save to reload.
          			</p>

					{/* <div class="snow-container">
    <div class="snow foreground"></div>
    <div class="snow foreground layered"></div>
    <div class="snow middleground"></div>
    <div class="snow middleground layered"></div>
    <div class="snow background"></div>
    <div class="snow background layered"></div>
</div> */}


					<div id="stage" style={{width:'400px'}}>
						{/* <!-- the action happens here --> */}
					</div>

					<canvas ref={this.canvasRef} id="canvas" style={{ width: '100px', height: '100px', backgroundColor: 'black' }}></canvas>
					{/* <Snow/> */}

					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
						style={{ position: 'relative', zIndex: 1 }}
					>
						Learn React
          			</a>
				</header>
			</div>
		);
	}
}

export default App;