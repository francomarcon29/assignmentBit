import * as THREE from "three";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl";

window.onload = function () {
  //Logic for random images
  let imageArray = [
    "globe.jpeg",
    "map1.jpeg",
    "map2.jpeg",
    "map3.jpeg",
    "map4.jpeg",
    "map5.jpeg",
    "map6.jpeg",
    "map7.jpeg",
    "map8.jpeg",
    "map9.jpeg",
    "map10.jpeg",
  ];

  function randomImage() {
    let randomIndex = Math.floor(Math.random() * imageArray.length);

    const finalImage = imageArray[randomIndex];

    return finalImage;
  }

  let vector = randomImage();
  console.log(vector);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.querySelector("canvas"),
  });

  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        globeTexture: {
          value: new THREE.TextureLoader().load(`./img/${vector}`),
        },
      },
    })
  );

  console.log(sphere);

  //Adding sphere to the scene
  scene.add(sphere);

  // Creating atmosphere
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })
  );

  atmosphere.scale.set(1.1, 1.1, 1.1);

  //Adding atmosphere to the scene

  scene.add(atmosphere);

  //Pointing the camera backwards

  camera.position.z = 15;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    sphere.rotation.y += 0.002;
  }

  animate();
};
