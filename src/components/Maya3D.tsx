// import React, { useRef, useState } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Sphere, Text, Html, useGLTF } from '@react-three/drei';
// import * as THREE from 'three';

// interface MayaProps {
//   message?: string;
//   showMessage?: boolean;
//   scale?: number;
//   glbPath?: string;
// }

// const MayaModel: React.FC<{ glbPath: string; scale: number; hovered: boolean; clicked: boolean }> = ({ 
//   glbPath, 
//   scale, 
//   hovered, 
//   clicked 
// }) => {
//   const meshRef = useRef<THREE.Group>(null);
//   const { scene } = useGLTF(glbPath);
  
//   useFrame((state) => {
//     if (meshRef.current) {
//       // Floating animation
//       meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
//       // Gentle rotation
//       meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
//       meshRef.current.rotation.y += 0.01;
      
//       // Scale based on interaction
//       const targetScale = clicked ? 1.2 * scale : hovered ? 1.1 * scale : 1 * scale;
//       meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
//     }
//   });

//   return (
//     <group ref={meshRef}>
//       <primitive object={scene.clone()} />
//     </group>
//   );
// };

// const MayaSphere: React.FC<MayaProps> = ({ message, showMessage = false, scale = 1, glbPath }) => {
//   const meshRef = useRef<THREE.Mesh>(null);
//   const [hovered, setHovered] = useState(false);
//   const [clicked, setClicked] = useState(false);

//   useFrame((state) => {
//     if (meshRef.current && !glbPath) {
//       // Floating animation
//       meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
//       // Gentle rotation
//       meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
//       meshRef.current.rotation.y += 0.01;
      
//       // Scale based on interaction
//       const targetScale = clicked ? 1.2 * scale : hovered ? 1.1 * scale : 1 * scale;
//       meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
//     }
//   });

//   const mayaMessages = [
//     "Great job! Keep learning!",
//     "You're making excellent progress!",
//     "Let's explore more English together!",
//     "Remember to practice daily!",
//     "You're becoming fluent!"
//   ];

//   const randomMessage = mayaMessages[Math.floor(Math.random() * mayaMessages.length)];

//   return (
//     <group
//       onPointerOver={() => setHovered(true)}
//       onPointerOut={() => setHovered(false)}
//       onPointerDown={() => setClicked(true)}
//       onPointerUp={() => setClicked(false)}
//     >
//       {glbPath ? (
//         <MayaModel 
//           glbPath={glbPath} 
//           scale={scale} 
//           hovered={hovered} 
//           clicked={clicked} 
//         />
//       ) : (
//         <>
//           <Sphere
//             ref={meshRef}
//             args={[1, 32, 32]}
//           >
//             <meshStandardMaterial
//               color={hovered ? "#a855f7" : "#8b5cf6"}
//               emissive={hovered ? "#4c1d95" : "#3730a3"}
//               emissiveIntensity={0.2}
//               roughness={0.1}
//               metalness={0.8}
//             />
//           </Sphere>
          
//           {/* Glowing aura */}
//           <Sphere args={[1.2, 16, 16]}>
//             <meshBasicMaterial
//               color="#8b5cf6"
//               transparent
//               opacity={hovered ? 0.3 : 0.1}
//               side={THREE.BackSide}
//             />
//           </Sphere>
          
//           {/* Particle effects */}
//           {Array.from({ length: 8 }).map((_, i) => (
//             <Sphere key={i} args={[0.02, 8, 8]} position={[
//               Math.cos((i / 8) * Math.PI * 2) * 1.5,
//               Math.sin((i / 8) * Math.PI * 2) * 1.5,
//               0
//             ]}>
//               <meshBasicMaterial color="#a855f7" />
//             </Sphere>
//           ))}
//         </>
//       )}
      
//       {showMessage && (
//         <Html position={[0, 2, 0]} center>
//           <div className="bg-surface-elevated border border-surface-border rounded-lg p-3 max-w-48 text-center shadow-md backdrop-blur-sm">
//             <p className="text-foreground text-sm font-medium">
//               {message || randomMessage}
//             </p>
//           </div>
//         </Html>
//       )}
//     </group>
//   );
// };

// interface Maya3DProps {
//   className?: string;
//   message?: string;
//   showMessage?: boolean;
//   scale?: number;
//   height?: string;
//   glbPath?: string;
// }

// const Maya3D: React.FC<Maya3DProps> = ({ 
//   className = "", 
//   message, 
//   showMessage = false, 
//   scale = 1,
//   height = "200px",
//   glbPath
// }) => {
//   return (
//     <div className={`${className}`} style={{ height }}>
//       <Canvas
//         camera={{ position: [0, 0, 5], fov: 45 }}
//         style={{ background: 'transparent' }}
//       >
//         <ambientLight intensity={0.4} />
//         <pointLight position={[10, 10, 10]} intensity={1} />
//         <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
//         <MayaSphere 
//           message={message} 
//           showMessage={showMessage} 
//           scale={scale} 
//           glbPath={glbPath}
//         />
//       </Canvas>
//     </div>
//   );
// };

// export default Maya3D;













import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, useGLTF, Center, Environment } from '@react-three/drei'
import * as THREE from 'three'

interface MayaProps {
  message?: string
  showMessage?: boolean
  scale?: number
  avatarPath?: string
}

const RpmHeadModel: React.FC<{
  path: string
  hovered: boolean
  clicked: boolean
}> = ({ path, hovered, clicked }) => {
  const rootRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  useEffect(() => {
    if (path) useGLTF.preload(path)
  }, [path])

  const { scene } = useGLTF(path) as unknown as { scene: THREE.Group }
  const cloned = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    cloned.traverse(obj => {
      obj.castShadow = true
      obj.receiveShadow = true
      if ((obj as any).isSkinnedMesh) obj.frustumCulled = false
    })

    // Focus camera on the head
    const box = new THREE.Box3().setFromObject(cloned)
    const center = new THREE.Vector3()
    box.getCenter(center)
    const size = new THREE.Vector3()
    box.getSize(size)

    // Adjust camera for head close-up
    camera.position.set(center.x * 5, center.y *5 , size.z * 5)
    camera.lookAt(center)
  }, [cloned, camera])

  useFrame((state) => {
    if (!rootRef.current) return
    rootRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05
    const targetScale = clicked ? 1.15 : hovered ? 1.08 : 1
    rootRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
  })

  return (
    <group ref={rootRef}>
      <primitive object={cloned} />
    </group>
  )
}

const MayaAvatar: React.FC<MayaProps> = ({ message, showMessage = false, avatarPath }) => {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const mayaMessages = [
    'Great job! Keep learning!',
    "You're making excellent progress!",
    "Let's explore more English together!",
    'Remember to practice daily!',
    "You're becoming fluent!",
  ]
  const randomMessage = useMemo(() => mayaMessages[Math.floor(Math.random() * mayaMessages.length)], [])

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => setClicked(true)}
      onPointerUp={() => setClicked(false)}
    >
      {avatarPath && (
        <Suspense fallback={<Html center><div className="text-xs bg-black/40 text-white px-2 py-1 rounded">Loading avatar…</div></Html>}>
          <RpmHeadModel path={avatarPath} hovered={hovered} clicked={clicked} />
        </Suspense>
      )}
      

      {showMessage && (
        <Html position={[0, 1.5, 0]} center>
          <div className="bg-surface-elevated border border-surface-border rounded-lg p-3 max-w-48 text-center shadow-md backdrop-blur-sm">
            <p className="text-foreground text-sm font-medium">{message || randomMessage}</p>
          </div>
        </Html>
      )}
    </group>
  )
}

interface Maya3DProps {
  className?: string
  message?: string
  showMessage?: boolean
  height?: string
  avatarPath?: string
}

const Maya3D: React.FC<Maya3DProps> = ({
  className = '',
  message,
  showMessage = false,
  height = '200px',
  avatarPath,
}) => {
  return (
    <div className={`relative ${className}`} style={{ height, width: '200px', borderRadius: '50%', overflow: 'hidden', background: '#0b0b0b' }}>
      <Canvas shadows camera={{ position: [0, 0.5, 2], fov: 35 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <Environment preset="studio" />
        <MayaAvatar message={message} showMessage={showMessage} avatarPath={avatarPath} />
        
      </Canvas>
    </div>
  )
}

export default Maya3D
