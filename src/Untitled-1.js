var Canvas = function (w, h) {
    this.width = w;
    this.height = h;
}
Canvas.prototype = {
    init: function () {
        var oC = document.createElement("canvas");
        oC.setAttribute('width', this.width);
        oC.setAttribute('height', this.height);
        oC.setAttribute('id', 'canvas');
        oC.style.backgroundColor = '#000';
        document.body.appendChild(oC);
    }
}
var curWinWidth = window.innerWidth,
    curWinHeight = window.innerHeight;
var oCanvas = new Canvas(curWinWidth, curWinHeight);
oCanvas.init();

var oC = document.querySelector('#canvas');
var width = oC.width,
    height = oC.height,
    oGc = oC.getContext('2d');

function random(min, max) {
    return Math.random() * (max - min) + min;
}
var Snow = function () {

}
Snow.prototype = {
    init: function () {
        this.x = random(0, width);
        this.y = 0;
        this.r = random(1, 5);
        this.vy = random(0, 2);
    },
    draw: function (cxt) {
        cxt.beginPath();
        cxt.fillStyle = 'white';
        cxt.arc(this.x, this.y + this.r, this.r, 0, Math.PI * 2, false);
        cxt.fill();
        cxt.closePath();
        this.update(cxt);
    },
    update: function (cxt) {
        if (this.y < height + this.r) {
            this.y += this.vy;
        } else {
            this.init();
        }
    }
}

var snow = [];
for (var i = 0; i < 500; i++) {
    setTimeout(function () {
        var oSnow = new Snow();
        oSnow.init();
        snow.push(oSnow);
    }, 10 * i);
}

(function move() {
    oGc.clearRect(0, 0, width, height);
    for (var i = 0; i < snow.length; i++) {
        snow[i].draw(oGc);
    }
    requestAnimationFrame(move);
})();


//point collection.draw()
this.draw = function () {
    ctx.beginPath();
    for (let i = 0; i < this.points.length; i++)
        this.points[i].draw();
    ctx.fill();
    ctx.closePath();
};
//points.draw
this.draw = function () {
    ctx.fillStyle = color;
    ctx.moveTo(this.curPos.x, this.curPos.y);
    ctx.arc(this.curPos.x, this.curPos.y, radius, 0, Math.PI * 2, true);
};


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
        leftfrom = myRandom(15, 85);
        lefttop = myRandom(30, 70);
        toptop = myRandom(20, 200);
        leftend = lefttop + (lefttop - leftfrom) / 2;
        botbot = toptop + 100;
        csscode = keyframes_template;
        csscode = csscode.replace(/LEFTFROM/, leftfrom);
        csscode = csscode.replace(/LEFTTOP/, lefttop);
        csscode = csscode.replace(/TOPTOP/, toptop);
        csscode = csscode.replace(/LEFTEND/, leftend);
        csscode = csscode.replace(/BOTBOT/, botbot);
        try {
            csscode2 = "@-webkit-keyframes flight_" + i + " {\n" + csscode + "\n}";
            document.styleSheets[cssIdx].insertRule(csscode2, 0);
        } catch (e) { } try {
            csscode2 = "@-moz-keyframes flight_" + i + " {\n" + csscode + "\n}";
            document.styleSheets[cssIdx].insertRule(csscode2, 0);
        } catch (e) { }
    } for (var i = 0;
        i < num_launchers;
        i++) {
            var rand = myRandom(0, flare_colours.length - 1);
        var rand_colour = flare_colours[rand];
        var launch_delay = myRandom(0, 100) / 10;
        csscode = ".launcher:nth-child(" + num_launchers + "n+" + i + ") {\n" + "  -webkit-animation-name: flight_" + i + ";\n" + " - webkit - animation - delay: " + launch_delay + "s;\n" + " - moz - animation - name: flight_" + i + ";\n" + " - moz - animation - delay: " + launch_delay + "s;\n" + "} ";
    document.styleSheets[cssIdx].insertRule(csscode, 0);
    csscode = ".launcher:nth-child(" + num_launchers + "n+" + i + ") div {" + "  border-color: " + rand_colour + ";\n" + " - webkit - animation - delay: " + launch_delay + "s;\n" + " - moz - animation - delay: " + launch_delay + "s;\n" + "}";
      document.styleSheets[cssIdx].insertRule(csscode, 0);
     } for (var i = 0;
    i < num_flares;
    i++) {
        csscode = ".launcher div:nth-child(" + num_flares + "n+" + i + ") {\n" + "  -webkit-transform: rotate(" + (i * 360 / num_flares) + "deg);
    \n" + " - moz - transform: rotate(" + (i * 360 / num_flares) + "deg);
    \n" + "
} ";
document.styleSheets[cssIdx].insertRule(csscode, 0);
     } for (var i = 0;
    i < num_launchers;
    i++) {
        var newdiv = document.createElement("div");
    newdiv.className = "launcher";
    for (var j = 0;
        j < num_flares;
        j++) {
            newdiv.appendChild(document.createElement("div"));
    } document.getElementById("stage").appendChild(newdiv);
} }, false);
