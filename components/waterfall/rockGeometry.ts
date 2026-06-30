import * as THREE from 'three';

// Generate a procedural rock cliff using noise-displaced geometry
export function createRockGeometry(
  width: number,
  height: number,
  depth: number,
  segments: number = 48,
  seed: number = 1
): THREE.BufferGeometry {
  const geo = new THREE.BoxGeometry(width, height, depth, segments, segments, segments);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();

  // Simple deterministic noise
  const noise = (x: number, y: number, z: number) => {
    const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719 + seed * 91.7) * 43758.5453;
    return (Math.sin(s * 0.0001) + Math.sin(s * 0.0003) * 0.5 + Math.sin(s * 0.0007) * 0.25) * 0.5 + 0.5;
  };

  const fbm = (x: number, y: number, z: number) => {
    let val = 0;
    let amp = 0.5;
    let freq = 1;
    for (let i = 0; i < 4; i++) {
      val += amp * noise(x * freq, y * freq, z * freq);
      freq *= 2;
      amp *= 0.5;
    }
    return val;
  };

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    // Normalize to box faces
    const nx = v.x / (width / 2);
    const ny = v.y / (height / 2);
    const nz = v.z / (depth / 2);
    // Displacement stronger on outward faces
    const disp = (fbm(nx * 2, ny * 2, nz * 2) - 0.5) * 0.6;
    // Push outward along the dominant face normal
    const ax = Math.abs(nx);
    const ay = Math.abs(ny);
    const az = Math.abs(nz);
    const max = Math.max(ax, ay, az);
    if (max === ax) v.x += Math.sign(nx) * disp * width * 0.18;
    else if (max === ay) v.y += Math.sign(ny) * disp * height * 0.12;
    else v.z += Math.sign(nz) * disp * depth * 0.18;

    // Extra roughness
    const rough = (fbm(nx * 5, ny * 5, nz * 5) - 0.5) * 0.08;
    v.x += rough * width;
    v.y += rough * height;
    v.z += rough * depth;

    pos.setXYZ(i, v.x, v.y, v.z);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

// Rock material — warm grey-brown with subtle variation
export function createRockMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color('#6b6258'),
    roughness: 0.95,
    metalness: 0.0,
    flatShading: true,
  });
}

// Mossy patch material — greenish, slightly glossy
export function createMossMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color('#4a6b3a'),
    roughness: 0.8,
    metalness: 0.0,
    flatShading: true,
  });
}
