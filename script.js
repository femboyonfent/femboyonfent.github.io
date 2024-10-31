// script.js
let scene, camera, renderer, cube;
let scrollSpeed = 0;
let lastScrollY = 0;
let targetRotationX = 0;
let targetRotationY = 0;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth  / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });    
    renderer.setClearColor(0x000000, 0); // Set clear color to transparent
    renderer.setSize(window.innerWidth - 40, window.innerHeight - 2);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.PointsMaterial({ 
        color: 0xFFACF6, 
        size: 0.1, 
        sizeAttenuation: true 
    });

    // Custom shader for circular points
    material.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
            `void main() {`,
            `void main() {
                vec2 uv = gl_PointCoord.xy - vec2(0.5);
                if (length(uv) > 0.5) discard;`
        );
    };

    cube = new THREE.Points(geometry, material);
    scene.add(cube);

    // Set initial rotation
    cube.rotation.x = Math.PI / 3; // 

    camera.position.z = 3;
    window.addEventListener('scroll', onScroll, false);

    animate();
}

function onScroll() {
    const scrollY = window.scrollY;
    scrollSpeed = scrollY - lastScrollY;
    lastScrollY = scrollY;
    targetRotationX += scrollSpeed * 0.01; // Adjust the multiplier as needed
    targetRotationY += scrollSpeed * 0.01; // Adjust the multiplier as needed
}

function animate() {
    requestAnimationFrame(animate);

    // Smooth rotation
    cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.05; // Adjust the multiplier for smoothness
    cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.05; // Adjust the multiplier for smoothness

    renderer.render(scene, camera);
}

init();

