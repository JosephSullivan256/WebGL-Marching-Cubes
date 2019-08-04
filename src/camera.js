
// //position = vector
// //direction = rotation matrix
// function Camera(position0,direction0){
//     this.position = position0;
//     this.rotation = direction0;
//     var viewMatrix = mat4.create();

//     this.getViewMatrix = function(){
//         var rotation = 
//         viewMatrix = mat4.fromRotationTranslation(viewMatrix,rotation,position);
//     }
// }

function OrbitingCamera(position0,center0,up0=vec3.fromValues(0,1,0)){
    this.position = position0;
    this.center = center0;
    this.up = up0;
    var matrix = mat4.create();

    this.getViewMatrix = function(){
        mat4.lookAt(matrix,this.position,this.center,this.up);
        return matrix;
    }

    this.rotate = function(rotation){
        var xrot = mat4.create();
        mat4.fromXRotation(xrot,rotation[1]);
        var yrot = mat4.create();
        mat4.fromYRotation(yrot,rotation[0]);
        var rot = mat4.create();
        mat4.multiply(rot,xrot,yrot);
        vec3.transformMat4(this.position,this.position,rot);
    }
}