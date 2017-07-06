var WIDTH = window.innerWidth - 30,
    HEIGHT = window.innerHeight - 30;
 
var angle = 45,
    aspect = WIDTH / HEIGHT,
    near = 0.1,
    far = 3000;

var container = document.getElementById('container');

var camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
camera.position.set(0, 0, 0);
var scene = new THREE.Scene();

var light = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI / 2, 1);
light.position.set(4000, 4000, 1500);
light.target.position.set (1000, 3800, 1000);

scene.add(light);

//EARTH
    var earthGeo = new THREE.SphereGeometry (200, 400, 400),
        earthMat = new THREE.MeshPhongMaterial();
    earthMesh = new THREE.Mesh(earthGeo, earthMat);
                
    earthMesh.position.set(-100, 0, 0);
    earthMesh.rotation.y=5;
    scene.add(earthMesh);
                
    //diffuse
    earthMat.map = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/earthmap.jpg');
    //bump
    earthMat.bumpMap = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/bump-map.jpg');
    earthMat.bumpScale = 8;
    //specular
    earthMat.specularMap = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/earthspec1k.jpg');
    earthMat.specular = new THREE.Color('#2e2e2e');
               
    earthMesh.castShadow = true;
    earthMesh.receiveShadow = true;


camera.lookAt( earthMesh.position );

//Renderer code. We'll get to this in a moment
var renderer = new THREE.WebGLRenderer({antialiasing : true});
renderer.setSize(WIDTH, HEIGHT);
renderer.domElement.style.position = 'relative';

container.appendChild(renderer.domElement);
renderer.autoClear = false;
renderer.shadowMapEnabled = true;

function render () {
   renderer.render(scene, camera);
}

render();