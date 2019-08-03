
function TestModel(){
	const src = {
		vs: `
			attribute vec4 aVertexPosition;

			uniform mat4 uModelViewMatrix;
			uniform mat4 uProjectionMatrix;
			
			void main() {
				gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
			}
		`,
		fs: `
			void main(){
				gl_FragColor = vec4(1.0,1.0,1.0,1.0);
			}
		`
	};
	
	this.programInfo;
	this.buffers;

	this.init = function(gl){
		//init program
		var shaderProgram = initShaderProgram(gl,src.vs,src.fs);
		this.programInfo = {
			program: shaderProgram,
			attribLocations: {
				vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
			},
			uniformLocations: {
				projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
				modelViewMatrix: gl.getUniformLocation(shaderProgram,'uModelViewMatrix'),
			},
		}

		//init buffers
		var positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,
			new Float32Array([
				-1.0,  1.0,
				 1.0,  1.0,
				-1.0, -1.0,
				 1.0, -1.0
			]),
			gl.STATIC_DRAW);
		this.buffers = {
			position: positionBuffer
		};
	}
	
	this.render = function(gl,globalUniforms){
		
	}
}