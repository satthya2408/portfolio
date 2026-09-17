(function initHero3D() {
  const canvas = document.getElementById("hero-scene");
  if (!canvas || !window.THREE) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 14;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const group = new THREE.Group();
  scene.add(group);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(5.2, 0.04, 12, 120),
    new THREE.MeshBasicMaterial({ color: 0xe8a87c, transparent: true, opacity: 0.35 })
  );
  ring.rotation.x = Math.PI / 2.2;
  group.add(ring);

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(3.8, 0.03, 10, 80),
    new THREE.MeshBasicMaterial({ color: 0x7eb8da, transparent: true, opacity: 0.25 })
  );
  ring2.rotation.x = Math.PI / 3;
  ring2.rotation.y = 0.4;
  group.add(ring2);

  const geo = new THREE.IcosahedronGeometry(1.2, 0);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xe8a87c,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });
  const core = new THREE.Mesh(geo, mat);
  group.add(core);

  const count = 420;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }
  const points = new THREE.BufferGeometry();
  points.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const stars = new THREE.Points(
    points,
    new THREE.PointsMaterial({ color: 0xf4efe6, size: 0.06, transparent: true, opacity: 0.55 })
  );
  scene.add(stars);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const light = new THREE.DirectionalLight(0xffe8d6, 0.9);
  light.position.set(3, 4, 5);
  scene.add(light);

  function resize() {
    const parent = canvas.parentElement;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener("resize", resize);

  let mx = 0;
  let my = 0;
  window.addEventListener(
    "pointermove",
    (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 0.35;
      my = (e.clientY / window.innerHeight - 0.5) * 0.2;
    },
    { passive: true }
  );

  let t = 0;
  function tick() {
    requestAnimationFrame(tick);
    t += 0.008;
    group.rotation.y = t * 0.35 + mx;
    group.rotation.x = my;
    core.rotation.y = t * 0.6;
    ring.rotation.z = t * 0.15;
    stars.rotation.y = t * 0.05;
    renderer.render(scene, camera);
  }
  tick();
})();
