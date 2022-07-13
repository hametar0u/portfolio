import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(100);

renderer.render( scene, camera );

//torus shape
const geometry = new THREE.CircleGeometry(8, 50);
const material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
const circle = new THREE.Mesh( geometry, material );
scene.add(circle);

//stars
const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500) );

  star.position.set(x, y, z);
  scene.add(star);
};

Array(1000).fill().forEach(addStar);

//grid helper
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

//animation loop
const animate = () => {
  requestAnimationFrame( animate );

  // controls.update();
  renderer.render( scene, camera );
};

animate();

const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * 0.015 + 100;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  camera.rotation.y = t * -0.0001;

  // circle.rotation.x = t * -0.002;
  // circle.rotation.y = t * -0.0003;
  // circle.rotation.z = t * -0.0003;
  // circle.position.z = t * 0.015;

};

document.body.onscroll = moveCamera;

/* 
Objects:
1. Geometry
2. Material
3. Mesh
*/