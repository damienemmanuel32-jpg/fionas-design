import * as THREE from 'three';

// Vertex shader for the waterfall surface — flowing UVs + gentle wave displacement
export const waterVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uFlowSpeed;
  uniform float uMouseX;
  uniform float uMouseY;
  varying vec2 vUv;
  varying float vFlow;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    // Flowing vertical coordinate — water moves downward
    float flow = uTime * uFlowSpeed;
    vFlow = flow;

    // Subtle horizontal wave + vertical ripple
    float wave = sin(uv.x * 6.2831 * 3.0 + uTime * 1.5) * 0.04;
    wave += sin(uv.y * 30.0 - flow * 4.0) * 0.015;
    // Mouse bend
    wave += (uMouseX - 0.5) * 0.05 * sin(uv.y * 8.0);

    vec3 pos = position;
    pos.z += wave;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPos.xyz;
    vNormal = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

// Fragment shader — transparent flowing water with foam, depth tint, fresnel
export const waterFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uFlowSpeed;
  uniform float uIntensity;
  uniform vec3 uDeepColor;
  uniform vec3 uShallowColor;
  uniform vec3 uFoamColor;
  varying vec2 vUv;
  varying float vFlow;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  // hash + noise helpers
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Flowing UV — moves downward over time
    vec2 flowUv = vec2(vUv.x, vUv.y - vFlow * 0.15);

    // Turbulence streaks
    float streaks = fbm(flowUv * vec2(8.0, 24.0));
    streaks = pow(streaks, 1.5);

    // Depth gradient — top is shallower/foamier, bottom deeper
    float depth = smoothstep(0.0, 1.0, vUv.y);
    vec3 water = mix(uShallowColor, uDeepColor, depth);

    // Add turbulence brightness variation
    water += streaks * 0.08;

    // Foam at top edge and in turbulent spots
    float foamTop = smoothstep(0.85, 1.0, vUv.y);
    float foamStreak = smoothstep(0.55, 0.8, streaks);
    float foam = max(foamTop, foamStreak * smoothstep(0.3, 0.7, vUv.y));
    foam = clamp(foam * uIntensity, 0.0, 1.0);
    water = mix(water, uFoamColor, foam * 0.7);

    // Fresnel for a glassy edge
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);
    water += fresnel * 0.15;

    // Vertical flow lines for motion sense
    float lines = sin(vUv.y * 80.0 - vFlow * 6.0) * 0.5 + 0.5;
    lines = pow(lines, 8.0);
    water += lines * 0.05 * (1.0 - foam);

    float alpha = 0.72 + foam * 0.25 + fresnel * 0.1;
    alpha = clamp(alpha * uIntensity, 0.0, 1.0);

    gl_FragColor = vec4(water, alpha);
  }
`;

// Mist particle shader — soft round sprites
export const mistVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uIntensity;
  attribute float aScale;
  attribute float aSpeed;
  attribute float aOffset;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    // Rise upward and drift
    float t = uTime * aSpeed + aOffset;
    pos.y = mod(pos.y + t * 0.4, 4.0) - 2.0;
    pos.x += sin(t * 0.5 + aOffset) * 0.3;
    pos.z += cos(t * 0.4 + aOffset) * 0.2;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;
    gl_PointSize = uSize * aScale * (300.0 / -mvPos.z);

    // Fade based on height
    float h = (pos.y + 2.0) / 4.0;
    vAlpha = sin(h * 3.14159) * uIntensity;
  }
`;

export const mistFragmentShader = /* glsl */ `
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float soft = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(1.0, 1.0, 1.0, soft * vAlpha * 0.5);
  }
`;

// Spray droplet shader — small bright points
export const sprayVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uIntensity;
  attribute float aScale;
  attribute float aSpeed;
  attribute float aOffset;
  attribute vec3 aVelocity;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    float t = mod(uTime * aSpeed + aOffset, 1.0);
    // Parabolic arc — up then fall
    pos.x += aVelocity.x * t;
    pos.y += aVelocity.y * t - 2.0 * t * t;
    pos.z += aVelocity.z * t;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;
    gl_PointSize = uSize * aScale * (200.0 / -mvPos.z);
    vAlpha = (1.0 - t) * uIntensity;
  }
`;

export const sprayFragmentShader = /* glsl */ `
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float soft = smoothstep(0.5, 0.1, d);
    vec3 col = mix(vec3(0.85, 0.92, 1.0), vec3(1.0), soft);
    gl_FragColor = vec4(col, soft * vAlpha * 0.9);
  }
`;

export const waterUniforms = {
  uTime: { value: 0 },
  uFlowSpeed: { value: 1.0 },
  uIntensity: { value: 1.0 },
  uMouseX: { value: 0.5 },
  uMouseY: { value: 0.5 },
  uDeepColor: { value: new THREE.Color('#5a7a8c') },
  uShallowColor: { value: new THREE.Color('#b8d4e0') },
  uFoamColor: { value: new THREE.Color('#ffffff') },
};

export const mistUniforms = {
  uTime: { value: 0 },
  uSize: { value: 60 },
  uIntensity: { value: 1.0 },
};

export const sprayUniforms = {
  uTime: { value: 0 },
  uSize: { value: 8 },
  uIntensity: { value: 1.0 },
};
