var fragmentShader = `

precision mediump float;

uniform sampler2D u_image;
uniform vec2 textureSize;

varying vec2 texCoord;

uniform vec2 onePixel;

vec2 getCoords(vec2 coord, vec2 offset){
	//return vec2(mod(coord.x + onePixel.x * offset.x, 1.0), mod(coord.y + onePixel.y * offset.y, 1.0));
	return mod(coord + onePixel * offset, 1.0);
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

	if(texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).r > r){
		r = sqrt((
			r*r
			+
			texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).r
			*texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).r
		) / 2.0);
	}

	if(texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).g > g){
		g = sqrt((
			g*g
			+
			texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).g
			*texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).g
		) / 2.0);
	}

	if(texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).b > b){
		b = sqrt((
			b*b
			+
			texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).b
			*texture2D(u_image, getCoords(texCoord, vec2(0.0, -1.0))).b
		) / 2.0);
	}
	
	gl_FragColor = vec4(r, g, b, a);
	
	
	/*if(r != 0.0 && (sum < 2.0 || sum > 3.0)){
		r = 0.0;
	} else if(r == 0.0 && sum == 3.0){
		r = 1.0;
	}
	
	gl_FragColor = vec4(r, r, r, 1.0);*/
}

`;








































