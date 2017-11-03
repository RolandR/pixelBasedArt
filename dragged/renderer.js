
function Renderer(canvasId){

	var canvas = document.getElementById(canvasId);
	var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

	var shaderProgram;
	var size;

	var canvasSizeAttr;
	var pixels = new Uint8Array(canvas.width*canvas.height*4);

	var lastHeight = canvas.height;
	var lastWidth = canvas.width;

	init();

	function init(){

		/*=========================Shaders========================*/


		// Create a vertex shader object
		var vertShader = gl.createShader(gl.VERTEX_SHADER);

		// Attach vertex shader source code
		gl.shaderSource(vertShader, vertexShader);

		// Compile the vertex shader
		gl.compileShader(vertShader);

		// Create fragment shader object
		var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

		// Attach fragment shader source code
		gl.shaderSource(fragShader, fragmentShader);

		// Compile the fragmentt shader
		gl.compileShader(fragShader);

		// Create a shader program object to store
		// the combined shader program
		shaderProgram = gl.createProgram();

		// Attach a vertex shader
		gl.attachShader(shaderProgram, vertShader); 

		// Attach a fragment shader
		gl.attachShader(shaderProgram, fragShader);

		// Link both programs
		gl.linkProgram(shaderProgram);

		// Use the combined shader program object
		gl.useProgram(shaderProgram);


		vertexBuffer = gl.createBuffer();

		/*==========Defining and storing the geometry=======*/

		var vertices = [
			-1.0,  1.0,
			 1.0,  1.0,
			-1.0, -1.0,
			-1.0, -1.0,
			 1.0,  1.0,
			 1.0, -1.0
		];

		size = ~~(vertices.length/2);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

		// Get the attribute location
		var coord = gl.getAttribLocation(shaderProgram, "coordinates");

		// Point an attribute to the currently bound VBO
		gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

		// Enable the attribute
		gl.enableVertexAttribArray(coord);

		canvasSizeAttr = gl.getUniformLocation(shaderProgram, "canvasSize");
		textureSizeAttr = gl.getUniformLocation(shaderProgram, "textureSize");
		texturrSizeAttr = gl.getUniformLocation(shaderProgram, "texturrSize");
		onePixelAttr = gl.getUniformLocation(shaderProgram, "onePixel");

		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	}

	function render(world){

		gl.uniform2f(canvasSizeAttr, canvas.width, canvas.height);
		gl.uniform2f(textureSizeAttr, lastWidth, lastHeight);
		gl.uniform2f(texturrSizeAttr, lastWidth, lastHeight);
		gl.uniform2f(onePixelAttr, 1/lastWidth, 1/lastHeight);

		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, lastWidth, lastHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, world);

		if(lastHeight != canvas.height || lastWidth != canvas.width){
			gl.viewport(0, 0, canvas.width, canvas.height);
			pixels = new Uint8Array(canvas.width*canvas.height*4);
		}

		gl.drawArrays(gl.TRIANGLES, 0, size);

		gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

		//pixels = pixels.copyWithin(4*canvas.width, 0);

		lastHeight = canvas.height;
		lastWidth = canvas.width;

		window.setTimeout(function(){render(pixels)}, 0);
		
	}

	return{
		 render: render
	};

}



















