
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
			precision mediump float; //sets medium precision (should be supported on pretty much all mobile)
			
			uniform float uTime;
			void main(){
				float val1 = sin(uTime);
				float val2 = cos(uTime);
				gl_FragColor = vec4(val1*val1,val2*val2,1.0,1.0);
			}
		`
	};
	
	this.programInfo;
	this.buffers;
	this.time = 0;

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
				time: gl.getUniformLocation(shaderProgram,"uTime"),
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

	this.update = function(dt){
		this.time+=dt;
	}
	
	this.render = function(gl,globalUniforms){
		// Tell WebGL how to pull out the positions from the position
		// buffer into the vertexPosition attribute.
		{
			const numComponents = 2;  // pull out 2 values per iteration
			const type = gl.FLOAT;    // the data in the buffer is 32bit floats
			const normalize = false;  // don't normalize
			const stride = 0;         // how many bytes to get from one set of values to the next
									  // 0 = use type and numComponents above
			const offset = 0;         // how many bytes inside the buffer to start from
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
			gl.vertexAttribPointer(
				this.programInfo.attribLocations.vertexPosition,
				numComponents,
				type,
				normalize,
				stride,
				offset);
			gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
		}

		// Tell WebGL to use our program when drawing

		gl.useProgram(this.programInfo.program);

		// Set the shader uniforms

		gl.uniformMatrix4fv(
			this.programInfo.uniformLocations.projectionMatrix,
			false,
			globalUniforms.projectionMatrix);
		gl.uniformMatrix4fv(
			this.programInfo.uniformLocations.modelViewMatrix,
			false,
			globalUniforms.camera.getViewMatrix());
		gl.uniform1f(
			this.programInfo.uniformLocations.time,
			this.time);
		
		{
			const offset = 0;
			const vertexCount = 4;
			gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
		}
	}
}