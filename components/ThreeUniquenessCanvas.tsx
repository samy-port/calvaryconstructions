"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function UniquenessModel() {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/villa.glb");

  // Clone the scene so React strict mode doesn't cause double-mount issues
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    if (!meshRef.current) return;

    // Set initial position and rotation
    meshRef.current.rotation.set(Math.PI * 0.08, 0, 0);

    const ctx = gsap.context(() => {
      const tl = (window as any).uniquenessTimeline;
      if (tl && meshRef.current) {
        // Explicitly set initial rotation at time 0 to reset correctly on loop repeat
        tl.set(meshRef.current.rotation, {
          x: Math.PI * 0.08,
          y: 0,
          z: 0
        }, 0);

        // Synchronize 3D rotation steps with the shared automatic timeline
        // Transition 1 to 2 starts at t = 1.0, duration 0.4
        tl.to(meshRef.current.rotation, {
          x: Math.PI * 0.04,
          y: Math.PI * 0.4,
          z: -Math.PI * 0.02,
          duration: 0.4,
          ease: "power2.inOut"
        }, 1.0)
        
        // Transition 2 to 3 starts at t = 3.2, duration 0.4
        .to(meshRef.current.rotation, {
          x: Math.PI * 0.12,
          y: Math.PI * 0.8,
          z: 0,
          duration: 0.4,
          ease: "power2.inOut"
        }, 3.2)
        
        // Transition 3 to 4 starts at t = 5.4, duration 0.4
        .to(meshRef.current.rotation, {
          x: Math.PI * 0.06,
          y: Math.PI * 1.3,
          z: Math.PI * 0.02,
          duration: 0.4,
          ease: "power2.inOut"
        }, 5.4)
        
        // Transition 4 to 5 starts at t = 7.6, duration 0.4
        .to(meshRef.current.rotation, {
          x: Math.PI * 0.1,
          y: Math.PI * 1.8,
          z: 0,
          duration: 0.4,
          ease: "power2.inOut"
        }, 7.6)
        
        // Transition 5 back to 1 (Loop Transition) starts at t = 9.8, duration 0.4
        .to(meshRef.current.rotation, {
          x: Math.PI * 0.08,
          y: 0,
          z: 0,
          duration: 0.4,
          ease: "power2.inOut"
        }, 9.8);
      }
    });

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimeout);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    // Add a very subtle float effect
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <group ref={meshRef} scale={[4.5, 4.5, 4.5]}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
}

// Pause the render loop when the canvas is off-screen
function RenderController() {
  const { gl } = useThree();
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    
    const section = document.getElementById("uniqueness");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, [gl]);

  useFrame(({ gl: renderer }) => {
    // Skip rendering when off-screen to improve page performance
    if (!isVisibleRef.current) {
      renderer.clear();
      return;
    }
  });

  return null;
}

useGLTF.setDecoderPath("/decoders/draco/");
useGLTF.preload("/models/villa.glb");

export default function ThreeUniquenessCanvas() {
  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [5, 4, 7], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        frameloop="always"
      >
        <fog attach="fog" args={["#FFF8EE", 8, 25]} />
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight
          position={[10, 15, 10]}
          intensity={1.2}
          color="#FFFAF0"
        />
        <directionalLight position={[-10, 5, -5]} intensity={0.4} color="#E8DCD0" />

        <UniquenessModel />
        <RenderController />
      </Canvas>
    </div>
  );
}
