"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function ArchitecturalFragment() {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/villa.glb");

  // Clone the scene so React strict mode doesn't double-mount issues
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    if (!meshRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(meshRef.current!.rotation, {
        y: Math.PI * 1.5,
        x: Math.PI * 0.15,
        z: -Math.PI * 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: "#why-choose-us",
          endTrigger: "#cta",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.5,
        }
      });

      gsap.to(meshRef.current!.scale, {
        x: 5.5,
        y: 5.5,
        z: 5.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: "#why-choose-us",
          endTrigger: "#cta",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.5,
        }
      });
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
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.3;
  });

  return (
    <group ref={meshRef} scale={[3.5, 3.5, 3.5]}>
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
    // Observe the parent section, not just the canvas
    const section = document.getElementById("craft");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, [gl]);

  useFrame(({ gl: renderer }) => {
    // Completely skip rendering when off-screen
    if (!isVisibleRef.current) {
      renderer.clear();
      return;
    }
  });

  return null;
}

useGLTF.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/gltf/");
useGLTF.preload("/models/villa.glb");

export default function ThreeArchitecturalFragment() {
  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [5, 4, 7], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false, // Huge perf gain, barely noticeable on models
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

        <ArchitecturalFragment />
        <RenderController />
      </Canvas>
    </div>
  );
}
