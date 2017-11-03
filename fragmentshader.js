var fragmentShader = `

precision mediump float;

uniform sampler2D u_image;
uniform vec2 textureSize;

varying vec2 texCoord;

uniform vec2 onePixel;

vec2 getCoords(vec2 coord, vec2 offset){
	//return vec2(mod(coord.x + onePixel.x * offset.x, 1.0), mod(coord.y + onePixel.y * offset.y, 1.0));
	//return mod(coord + onePixel * offset, 1.0);

	if((coord + onePixel * offset).x < 0.0
	 ||(coord + onePixel * offset).y < 0.0
	 ||(coord + onePixel * offset).x > 1.0
	 ||(coord + onePixel * offset).y > 1.0
	 ){
		return coord;
	} else {
		return coord + onePixel * offset;
	}
}

//vec2 coordinates[];

//float r = 0.0;
//float sum = 0.0;

void main(void){

	float sum = 0.0;

	/*sum += texture2D(u_image, getCoords(texCoord, vec2(-1.0, -1.0))).a;
	sum += texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).a;
	sum += texture2D(u_image, getCoords(texCoord, vec2(1.0, -1.0))).a;
	sum += texture2D(u_image, getCoords(texCoord, vec2(-1.0, 1.0))).a;
	sum += texture2D(u_image, getCoords(texCoord, vec2(0.0, 1.0))).a;
	sum += texture2D(u_image, getCoords(texCoord, vec2(1.0, 1.0))).a;
	sum += texture2D(u_image, getCoords(texCoord, vec2(-1.0, 0.0))).a;
	sum += texture2D(u_image, getCoords(texCoord, vec2(1.0, 0.0))).a;*/

	float oldr = texture2D(u_image, texCoord).r;
	float oldg = texture2D(u_image, texCoord).g;
	float oldb = texture2D(u_image, texCoord).b;

	float r = texture2D(u_image, texCoord).r;
	float g = texture2D(u_image, texCoord).g;
	float b = texture2D(u_image, texCoord).b;
	float a = texture2D(u_image, texCoord).a;

	/*float r = texture2D(u_image, texCoord).r;
	float g = 0.0;
	float b = texture2D(u_image, texCoord).b * 0.95;
	float a = texture2D(u_image, texCoord).a;
	
	if(b > 0.2){
		g = texture2D(u_image, texCoord).g * 1.06;
	} else {
		g = texture2D(u_image, texCoord).g * 0.98;
	}*/

	if(texture2D(u_image, getCoords(texCoord, vec2(0.0, 1.0))).r > 0.5
	&& texture2D(u_image, getCoords(texCoord, vec2(0.0, 1.0))).r < 0.55){
		r = texture2D(u_image, getCoords(texCoord, vec2(0.0, 1.0))).r;
	}

	/*if(texture2D(u_image, getCoords(texCoord, vec2(0.0, 1.0))).g > oldg){
		g = texture2D(u_image, getCoords(texCoord, vec2(0.0, 1.0))).g;
	}
	if(texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).g < oldg){
		g = texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).g;
	}

	if(texture2D(u_image, getCoords(texCoord, vec2(0.0, 1.0))).b > oldb){
		b = texture2D(u_image, getCoords(texCoord, vec2(0.0, 1.0))).b;
	}
	if(texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).b < oldb){
		b = texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).b;
	}*/
	
	gl_FragColor = vec4(r, g, b, a);
	
	
	/*if(r != 0.0 && (sum < 2.0 || sum > 3.0)){
		r = 0.0;
	} else if(r == 0.0 && sum == 3.0){
		r = 1.0;
	}
	
	gl_FragColor = vec4(r, r, r, 1.0);*/
}

`;








































