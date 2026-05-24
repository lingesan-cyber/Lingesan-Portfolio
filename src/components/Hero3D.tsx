import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- CUSTOM SHADER DEFINITION ---
// Morphing Vertex Shader with 3D Perlin Noise displacement
const vertexShader = `
  uniform float uTime;
  uniform float uDistortion;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vNoise;

  // GLSL 3D Simplex Noise by Ian McEwan, Ashima Arts
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vNormal = normalMatrix * normal;
    vPosition = position;
    
    // Smooth high-frequency noise ripple
    float noise = snoise(position * 1.6 + uTime * 0.45);
    vNoise = noise;
    
    vec3 displacedPosition = position + normal * noise * uDistortion;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
  }
`;

// Swirling deep cosmic purple, starlight cyan, and supernova magenta fragment shader
const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vNoise;
  
  uniform float uTime;
  uniform vec3 uColorBase;
  uniform vec3 uColorCyan;
  uniform vec3 uColorMagenta;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(vec3(1.0, 1.5, 1.0));
    float diffuse = max(dot(normal, lightDir), 0.0);
    
    // Fresnel glow edge outline
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
    
    // Interpolate multiple cosmic layers dynamically
    float noiseFactor = (vNoise + 1.0) * 0.5; // Map from -1:1 to 0:1
    
    // Swirl colors based on noise factor and time
    vec3 mixedColor = mix(uColorBase * (diffuse + 0.1), uColorCyan, noiseFactor);
    mixedColor = mix(mixedColor, uColorMagenta, smoothstep(0.4, 0.9, noiseFactor));
    
    // Rim lighting glow
    mixedColor += uColorCyan * fresnel * 2.5;
    mixedColor += uColorMagenta * pow(fresnel, 2.0) * 1.5;
    
    gl_FragColor = vec4(mixedColor, 1.0);
  }
`;

// --- STARDUST POSITIONS GENERATION ---
// Computed outside the component scope to guarantee strict hooks purity (react-hooks/purity)
const stardustCount = 220;
const generateStardustPositions = (count: number) => {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 2.5 + Math.random() * 5.0;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = radius * Math.cos(phi) - 1.5; // push slightly back
  }
  return arr;
};

const stardustPositions = generateStardustPositions(stardustCount);

// --- STARDUST FIELD DECORATOR ---
const StardustField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  // Reference the pre-calculated stardust array (100% pure hook)
  const positions = useMemo(() => stardustPositions, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Slow background cosmic drift
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#a39db8"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

// Organic morphing black-hole anomaly mesh
const CosmicMesh: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const { clock } = state;
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }

    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.07;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.07;

    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1 + mouse.current.x * 0.45;
      meshRef.current.rotation.x = mouse.current.y * 0.45;
    }
  });

  return (
    <mesh ref={meshRef} scale={[1.8, 1.8, 1.8]}>
    <icosahedronGeometry args={[1, 24]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uDistortion: { value: 0.22 }, // Slightly higher distortion for chaotic space energy
          uColorBase: { value: new THREE.Color('#090314') }, // Deep Space Navy
          uColorCyan: { value: new THREE.Color('#00f0ff') }, // Stellar Cyan
          uColorMagenta: { value: new THREE.Color('#ff007f') } // Supernova Magenta
        }}
        wireframe={false}
      />
    </mesh>
  );
};

export const Hero3D: React.FC = () => {
  const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'none'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 60 }}
        dpr={dpr}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          alpha: true,
          depth: true,
          stencil: false,
          preserveDrawingBuffer: false,
        }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.05} />
        <pointLight position={[5, 5, 5]} intensity={2.0} color="#00f0ff" />
        <pointLight position={[-5, -5, 3]} intensity={1.5} color="#ff007f" />
        <directionalLight position={[-5, 3, 5]} intensity={1.2} color="#9d4edd" />
        <CosmicMesh />
        <StardustField />
      </Canvas>
    </div>
  );
};

export default Hero3D;
