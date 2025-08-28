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












import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface MayaProps {
  message?: string;
  showMessage?: boolean;
  scale?: number;
  glbPath?: string;
}

const MayaModel: React.FC<{ glbPath: string; scale: number; hovered: boolean; clicked: boolean }> = ({ 
  glbPath, 
  scale, 
  hovered, 
  clicked 
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(glbPath);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Gentle rotation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.01;
      
      // Scale based on interaction
      const targetScale = clicked ? 1.2 * scale : hovered ? 1.1 * scale : 1 * scale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={meshRef}>
      <primitive object={scene.clone()} />
    </group>
  );
};

const MayaSphere: React.FC<MayaProps> = ({ message, showMessage = false, scale = 1, glbPath }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current && !glbPath) {
      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Gentle rotation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.01;
      
      // Scale based on interaction
      const targetScale = clicked ? 1.2 * scale : hovered ? 1.1 * scale : 1 * scale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const mayaMessages = [
    "Great job! Keep learning!",
    "You're making excellent progress!",
    "Let's explore more English together!",
    "Remember to practice daily!",
    "You're becoming fluent!"
  ];

  const randomMessage = mayaMessages[Math.floor(Math.random() * mayaMessages.length)];

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => setClicked(true)}
      onPointerUp={() => setClicked(false)}
    >
      {glbPath ? (
        <MayaModel 
          glbPath={glbPath} 
          scale={scale} 
          hovered={hovered} 
          clicked={clicked} 
        />
      ) : (
        <>
          <Sphere
            ref={meshRef}
            args={[1, 32, 32]}
          >
            <meshStandardMaterial
              color={hovered ? "#a855f7" : "#8b5cf6"}
              emissive={hovered ? "#4c1d95" : "#3730a3"}
              emissiveIntensity={0.2}
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
          
          {/* Glowing aura */}
          <Sphere args={[1.2, 16, 16]}>
            <meshBasicMaterial
              color="#8b5cf6"
              transparent
              opacity={hovered ? 0.3 : 0.1}
              side={THREE.BackSide}
            />
          </Sphere>
          
          {/* Particle effects */}
          {Array.from({ length: 8 }).map((_, i) => (
            <Sphere key={i} args={[0.02, 8, 8]} position={[
              Math.cos((i / 8) * Math.PI * 2) * 1.5,
              Math.sin((i / 8) * Math.PI * 2) * 1.5,
              0
            ]}>
              <meshBasicMaterial color="#a855f7" />
            </Sphere>
          ))}
        </>
      )}
      
      {showMessage && (
        <Html position={[0, 2, 0]} center>
          <div className="bg-surface-elevated border border-surface-border rounded-lg p-3 max-w-48 text-center shadow-md backdrop-blur-sm">
            <p className="text-foreground text-sm font-medium">
              {message || randomMessage}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
};

interface Maya3DProps {
  className?: string;
  message?: string;
  showMessage?: boolean;
  scale?: number;
  height?: string;
  glbPath?: string;
}

const Maya3D: React.FC<Maya3DProps> = ({ 
  className = "", 
  message, 
  showMessage = false, 
  scale = 1,
  height = "200px",
  glbPath
}) => {
  return (
    <div className={`${className}`} style={{ height }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <MayaSphere 
          message={message} 
          showMessage={showMessage} 
          scale={scale} 
          glbPath={glbPath}
        />
      </Canvas>
    </div>
  );
};

export default Maya3D;
