// script.js
let scene, camera, renderer, cube;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.PointsMaterial({ color: 0xFFACF6, size: 0.1 });
    cube = new THREE.Points(geometry, material);
    scene.add(cube);

    // Set initial rotation
    cube.rotation.x = Math.PI / 4; // 45 degrees

    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Continuous rotation
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;

    renderer.render(scene, camera);
}

init();

