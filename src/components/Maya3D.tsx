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



import React from 'react';
import Spline from '@splinetool/react-spline';

interface Maya3DProps {
  className?: string;
  height?: string;
}

const Maya3D: React.FC<Maya3DProps> = ({ className = "", height = "350px" }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg ${className}`}
      style={{ height }}
    >
      {/* Spline Scene */}
      <Spline
        // scene="https://prod.spline.design/GtWazGVCT9941Grd/scene.splinecode"
        scene="https://prod.spline.design/fzxskbzP8qc5lqWl/scene.splinecode"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Glass Overlay to hide Built with Spline */}
{/* Glass Overlay Chat Input */}
<div
  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 py-3 shadow-lg flex items-center gap-2 w-full max-w-[600px]"
>
  <input
    type="text"
    placeholder="Type your message..."
    className="flex-1 bg-transparent border border-white/30 rounded-lg px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
  />
  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98] bg-gradient-primary text-primary-foreground shadow-lg hover:shadow-xl border-0 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent before:via-white/20 before:to-white/40 before:opacity-70 hover:before:opacity-100 before:transition-all before:duration-300 after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/10 after:to-transparent after:opacity-50 h-12 rounded-lg px-8 text-base">
    Send
  </button>
</div>
    </div>
  );
};

export default Maya3D;












