var gui = new dat.GUI({
    height : 5 * 32 - 1
});

var params = {
    scaleOfCubes: 5.0,
    pointLightIntensity: 1.0
};

gui.add(params, 'scaleOfCubes').name('scale of cubes').min(1.0).max(10.0).step(0.1).onChange(function(){
    // refresh based on the new value of params.interation
    console.log('changed');
    scalar = params.scaleOfCubes;
});

var pointLightIntensity = params.pointLightIntensity;
gui.add(params, 'pointLightIntensity').name('point light intensity').min(1.0).max(10.0).step(0.1).onChange(function(){
    // refresh based on the new value of params.interation
    console.log('changed');
    pointLightIntensity = params.pointLightIntensity;
});
