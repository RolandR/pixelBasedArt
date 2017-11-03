var vertexShader = `

attribute vec2 coordinates;

uniform vec2 canvasSize;
uniform vec2 texturrSize;

vec2 scale = canvasSize / texturrSize;

varying vec2 texCoord;

void main(void){
	
	texCoord = (coordinates/2.0 + 0.5) * scale;
	
	gl_Position = vec4(coordinates, 1.0, 1.0);

}

`;
