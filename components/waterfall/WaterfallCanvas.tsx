'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  waterVertexShader,
  waterFragmentShader,
  mistVertexShader,
  mistFragmentShader,
  sprayVertexShader,
  sprayFragmentShader,
  waterUniforms,
  mistUniforms,
  sprayUniforms,
} from './shaders';
import { createRockGeometry, createRockMaterial, createMossMaterial } from './rockGeometry';

interface SceneProps {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

function WaterfallSurface({ scrollRef, mouseRef }: SceneProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({
    ...waterUniforms,
    uTime: { value: 0 },
    uFlowSpeed: { value: 1.0 },
    uIntensity: { value: 1.0 },
    uMouseX: { value: 0.5 },
    uMouseY: { value: 0.5 },
  }), []);

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;
    const scroll = scrollRef.current;
    m.uniforms.uFlowSpeed.value = 1.0 + scroll * 2.5;
    m.uniforms.uIntensity.value = 1.0 + scroll * 0.6;
    m.uniforms.uMouseX.value += (mouseRef.current.x - m.uniforms.uMouseX.value) * 0.05;
    m.uniforms.uMouseY.value += (mouseRef.current.y - m.uniforms.uMouseY.value) * 0.05;
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[2.4, 8, 64, 200]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function MistParticles({ scrollRef }: SceneProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const count = 400;
  const { positions, scales, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = Math.random() * 4 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      scales[i] = Math.random() * 2 + 0.5;
      speeds[i] = Math.random() * 0.5 + 0.3;
      offsets[i] = Math.random() * 10;
    }
    return { positions, scales, speeds, offsets };
  }, []);

  const uniforms = useMemo(() => ({
    ...mistUniforms,
    uTime: { value: 0 },
    uSize: { value: 80 },
    uIntensity: { value: 1.0 },
  }), []);

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;
    m.uniforms.uIntensity.value = 1.0 + scrollRef.current * 1.2;
  });

  return (
    <points position={[0, -2, 0.5]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-aOffset" args={[offsets, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={mistVertexShader}
        fragmentShader={mistFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

function SprayParticles({ scrollRef }: SceneProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const count = 250;
  const { positions, scales, speeds, offsets, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2.4;
      positions[i * 3 + 1] = -3.5 + Math.random() * 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1;
      scales[i] = Math.random() * 1.5 + 0.5;
      speeds[i] = Math.random() * 0.8 + 0.4;
      offsets[i] = Math.random();
      velocities[i * 3] = (Math.random() - 0.5) * 1.5;
      velocities[i * 3 + 1] = Math.random() * 1.5 + 0.5;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 1;
    }
    return { positions, scales, speeds, offsets, velocities };
  }, []);

  const uniforms = useMemo(() => ({
    ...sprayUniforms,
    uTime: { value: 0 },
    uSize: { value: 10 },
    uIntensity: { value: 1.0 },
  }), []);

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;
    m.uniforms.uIntensity.value = 1.0 + scrollRef.current * 1.5;
  });

  return (
    <points position={[0, -3.5, 0.3]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-aOffset" args={[offsets, 1]} />
        <bufferAttribute attach="attributes-aVelocity" args={[velocities, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={sprayVertexShader}
        fragmentShader={sprayFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function RockCliff({ side, scrollRef }: { side: 'left' | 'right'; scrollRef: SceneProps['scrollRef'] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mossRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => createRockGeometry(3.5, 9, 3, 40, side === 'left' ? 1 : 2), [side]);
  const mossGeo = useMemo(() => createRockGeometry(2, 3, 1.5, 20, side === 'left' ? 3 : 4), [side]);
  const mat = useMemo(() => createRockMaterial(), []);
  const mossMat = useMemo(() => createMossMaterial(), []);
  const sign = side === 'left' ? -1 : 1;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = sign * 0.15 + scrollRef.current * 0.05 * sign;
    }
  });

  return (
    <group position={[sign * 2.6, 0, -0.5]}>
      <mesh ref={meshRef} geometry={geo} material={mat} castShadow receiveShadow />
      <mesh
        ref={mossRef}
        geometry={mossGeo}
        material={mossMat}
        position={[sign * -0.3, 2.5, 0.8]}
        rotation={[0, sign * 0.3, 0]}
      />
    </group>
  );
}

function PoolWater() {
  // Reflective pool at the base
  return (
    <mesh position={[0, -4.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[6, 4, 1, 1]} />
      <meshStandardMaterial
        color="#7fa8bd"
        roughness={0.15}
        metalness={0.6}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function FloatingDust({ scrollRef }: Pick<SceneProps, 'scrollRef'>) {
  const ref = useRef<THREE.Points>(null);
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = Math.random() * 6 - 3;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.02;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const y = positions[i * 3 + 1] + Math.sin(t * 0.3 + i) * 0.002;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#fff4d4"
        transparent
        opacity={0.6 + scrollRef.current * 0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function RigCamera({ scrollRef, mouseRef }: SceneProps) {
  const { camera } = useThree();
  useFrame(() => {
    const scroll = scrollRef.current;
    const targetZ = 9 - scroll * 2.5;
    const targetY = 0.5 + scroll * 0.3;
    camera.position.x += (mouseRef.current.x * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (targetY + mouseRef.current.y * 0.6 - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ scrollRef, mouseRef }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.7} color="#fff8e7" />
      <directionalLight
        position={[4, 8, 6]}
        intensity={1.6}
        color="#fff4d4"
        castShadow
      />
      <directionalLight position={[-5, 3, 2]} intensity={0.4} color="#a8c8e0" />
      <fog attach="fog" args={['#f5f5f0', 8, 22]} />

      <RigCamera scrollRef={scrollRef} mouseRef={mouseRef} />
      <WaterfallSurface scrollRef={scrollRef} mouseRef={mouseRef} />
      <MistParticles scrollRef={scrollRef} mouseRef={mouseRef} />
      <SprayParticles scrollRef={scrollRef} mouseRef={mouseRef} />
      <RockCliff side="left" scrollRef={scrollRef} />
      <RockCliff side="right" scrollRef={scrollRef} />
      <PoolWater />
      <FloatingDust scrollRef={scrollRef} />
    </>
  );
}

interface WaterfallCanvasProps {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

export default function WaterfallCanvas({ scrollRef, mouseRef }: WaterfallCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 9], fov: 45, near: 0.1, far: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene scrollRef={scrollRef} mouseRef={mouseRef} />
      </Suspense>
    </Canvas>
  );
}
