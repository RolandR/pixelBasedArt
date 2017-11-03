


//var webglife = new Webglife();

var img = document.getElementById("image");
img.onload = Webglife;
img.src = "forest.jpg";


function Webglife(){

	var canvasContainer = document.getElementById("canvasContainer");
	var canvas = document.getElementById("renderCanvas");
	//var context = canvas.getContext("2d");
	var preCanvas = document.getElementById("preRenderCanvas");
	var preContext = preCanvas.getContext("2d");

	function scale(){

		canvas.width = img.width;
		canvas.height = img.height;

		preCanvas.width = img.width;
		preCanvas.height = img.height;
		
	}

	window.onresize = scale;

	scale();

	var width = canvas.width;
	var height = canvas.height;

	/*var cells = new Uint8Array(height * width * 4);

	for(var i = 0; i < cells.length; i+=4){
		var v = Math.round(Math.random())*255;
		cells[i] = v;
		cells[i+1] = v;
		cells[i+2] = v;
		cells[i+3] = v;
	}*/

	preContext.drawImage(img, 0, 0, width, height);
	var cells = Uint8Array.from(preContext.getImageData(0, 0, width, height).data);

	/*var middle = ~~(~~(height/2) * width + width/2);

	for(var i = 0; i < 40; i++){
		cells[middle+i] = 255;
	}*/

	var renderer = new Renderer('renderCanvas');

	renderer.render(cells);
	
}













