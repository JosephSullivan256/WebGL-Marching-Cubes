window.addEventListener("load",function(){
	main();
});

function main(){
	const canvas = document.getElementById("canvas");
	const gl = canvas.getContext("webgl");
	if(gl===null){
		alert("Unable to initialize WebGL. Your browser or machine may not support it.");
		return;
	}
	
	var densityField = sphereDensityField();
}

function drawScene(gl,scene){
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	scene.render(gl);

	
}

function Scene(globalUniforms,models=[]){
	this.globalUniforms = globalUniforms;
	this.models = models;
	this.render = function(gl){
		models.array.forEach(model => {
			model.render(gl,globalUniforms);
		});
	}
}

function sphereDensityField(width=9){
	var density = [];
	var width = 9;
	for(var x = 0; x < width; x++){
		density[x] = [];
		for(var y = 0; y < width; y++){
			density[x][y] = [];
			for(var z = 0; z < width; z++){
				density[x][y][z]=1.0/(1.0+Math.pow(x-width/2,2)+Math.pow(y-width/2,2)+Math.pow(z-width/2,2));
			}
		}
	}
	return density;
}

function MarchingCubesModel(densityField0){
	this.densityField = densityField0;
	this.render = function(gl,globalUniforms){
		
	}
}

/*
setup:

create programs and lookup attribute and uniform locations
create buffers
create texture


drawing:

for each model
  for each attribute
    bindBuffer(ARRAY_BUFFER, model's buffer for attribute)
    vertexAttribPointer(...)
  bindBuffer(ELEMENT_ARRAY_BUFFER, model's ebo)
  set uniforms and bind textures 
  glDrawElements
*/