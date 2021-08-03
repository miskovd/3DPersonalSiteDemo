import './style.css'
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//const material = new THREE.MeshBasicMaterial({color:0xFF6347, wireframe:true});//Sceleton - don't need light
const material = new THREE.MeshStandardMaterial({color:0xFF6347});//Need light
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

//Lights
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight, ambientLight);

//Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);//Light poiter
const gridHelper = new THREE.GridHelper(200,50);//Grid 
scene.add(lightHelper, gridHelper);

//Mouse control
const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    controls.update();
    renderer.render(scene, camera);
}
animate();