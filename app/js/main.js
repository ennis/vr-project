var camera, renderer;
var effect, controls;
var element, container;

var clock = new THREE.Clock();
var sky;
var elapsed = 0.0;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  container = document.getElementById('example');
  container.appendChild(element);

  effect = new THREE.StereoEffect(renderer);

  window.scene = new THREE.Scene();

  sky = new THREE.Sky();
  sky.setTimeOfDay(14.0);
  window.scene.add(sky.mesh);

  camera = new THREE.PerspectiveCamera(90, 1, 0.5, 2000000);
  camera.position.set(0, 10, 0);
  window.scene.add(camera);

  controls = new THREE.OrbitControls(camera, element);
  controls.rotateUp(Math.PI / 4);
  controls.target.set(
    camera.position.x + 0.1,
    camera.position.y,
    camera.position.z
  );
  controls.noZoom = true;
  controls.noPan = true;

  function setOrientationControls(e) {
    if (!e.alpha) {
      return;
    }

    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    element.addEventListener('click', fullscreen, false);

    window.removeEventListener('deviceorientation', setOrientationControls);
  }
  window.addEventListener('deviceorientation', setOrientationControls, true);


  var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
  window.scene.add(light);

  var texture = THREE.ImageUtils.loadTexture(
    'textures/patterns/checker.png'
  );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat = new THREE.Vector2(50, 50);
  texture.anisotropy = renderer.getMaxAnisotropy();

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 20,
    shading: THREE.FlatShading,
    map: texture
  });

  var geometry = new THREE.PlaneGeometry(1000, 1000);

  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  window.scene.add(mesh);

  window.addEventListener('resize', resize, false);
  setTimeout(resize, 1);

  // score
  score.makeContainers(container);
}

function resize() {
  var width = container.offsetWidth;
  var height = container.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  effect.setSize(width, height);
}


function update(dt) {
  elapsed += dt;

  resize();


  camera.updateProjectionMatrix();

  // update sky
  // 1 second => 0.2 hour
  sky.setTimeOfDay((8.0 + 0.2 * elapsed) % 24.0);

  controls.update(dt);
  window.updateMonsterCrowd(dt);
  // Update projectiles
  for (var i = projectiles.length -1; i >= 0; i--) {
    window.bulletInCrowd(projectiles[i].mesh);
    if (projectiles[i].update(dt)) {
      // projectile went too far, remove it
      projectiles.slice(i, 1);
    }
  }
}

function render(dt) {
  score.render();
  effect.render(window.scene, camera);
}

function animate(t) {
  requestAnimationFrame(animate);

  update(clock.getDelta());
  render(clock.getDelta());
}

function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}
