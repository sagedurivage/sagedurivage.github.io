
import * as THREE from '../lib/three.module.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Change the background color
renderer.setClearColor(0x232620);

// Create the cube geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Load textures
const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load('assets/textures/grayscale.png');
const texture2 = textureLoader.load('assets/textures/grass.jpg');
const texture3 = textureLoader.load('assets/textures/transition.png');
const texture4 = textureLoader.load('assets/textures/mossy-cobblestone.png');

// Set initial texture
let currentTexture = texture1;
const material = new THREE.MeshBasicMaterial({ map: currentTexture });
const cube = new THREE.Mesh(geometry, material);

// Add the cube to the scene
scene.add(cube);

// Position the camera
camera.position.z = 3;


// Add event listener to change texture
document.getElementById('myButton').addEventListener('click', () => {
    // Cycle through textures
    if (currentTexture === texture1) {
        currentTexture = texture2;
    } else if (currentTexture === texture2) {
        currentTexture = texture3;
    } else if (currentTexture === texture3) {
        currentTexture = texture4;
    } else {
        currentTexture = texture1;
    }
    // Update the cube material with the new texture
    cube.material.map = currentTexture;
    cube.material.needsUpdate = true;  // Make sure the material updates
});

// Resize the renderer and camera when the window is resized
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Add an event listener for trackpad (wheel) scrolling
window.addEventListener('wheel', (event) => {
    // Prevent the default scrolling behavior
    event.preventDefault();

    // Apply scroll delta to cube rotation
    const rotationSpeed = 0.005; // Adjust the speed of rotation as needed
    const deltaY = event.deltaY; // Vertical scroll (up/down)
    const deltaX = event.deltaX; // Horizontal scroll (left/right)

    // Adjust the rotation of the cube based on scroll
    cube.rotation.x -= deltaY * rotationSpeed;
    cube.rotation.y -= deltaX * rotationSpeed;
});


// Animate the scene
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube for some dynamic effect
    cube.rotation.x += 0.001;
    cube.rotation.y += 0.001;

    renderer.render(scene, camera);
}

// Call the animate function to start the rendering loop
animate();

