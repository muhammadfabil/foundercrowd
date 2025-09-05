"use client";

import { useEffect, useRef, useState } from "react";
import { Color, PerspectiveCamera, Vector3, Group } from "three";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

// Dynamic import for ThreeGlobe to avoid SSR issues
let ThreeGlobe: any = null;

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): any;
    };
  }
}

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color?: string;
};

export type PointData = {
  size: number;
  order: number;
  color: string;
  lat: number;
  lng: number;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string; // base sphere color
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string; // continent (hex polygons) color
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

export interface WorldProps {
  globeConfig?: GlobeConfig;
  data?: Position[];
}

let numbersOfRings = [0];

/**
 * Core Globe (colors locked to brand):
 * - Sphere: #2B2B2B
 * - Continents: #F59E0B
 */
export function Globe({ globeConfig = {}, data = [] }: WorldProps) {
  const globeRef = useRef<any>(null);
  const groupRef = useRef<Group | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

  // Brand defaults
  const defaultProps: Required<Pick<GlobeConfig,
    | "pointSize"
    | "atmosphereColor"
    | "showAtmosphere"
    | "atmosphereAltitude"
    | "polygonColor"
    | "globeColor"
    | "emissive"
    | "emissiveIntensity"
    | "shininess"
    | "arcTime"
    | "arcLength"
    | "rings"
    | "maxRings"
  >> = {
    pointSize: 1.6,
    atmosphereColor: "#F59E0B",
    showAtmosphere: false,
    atmosphereAltitude: 0.06,
    polygonColor: "#F59E0B", // Continents amber
    globeColor: "#2B2B2B", // Base globe dark gray
    emissive: "#1f1f1f",
    emissiveIntensity: 0.35,
    shininess: 0.6,
    arcTime: 1800,
    arcLength: 0.75,
    rings: 1,
    maxRings: 3,
  };

  const behaviorConfig = {
    arcTime: globeConfig.arcTime ?? defaultProps.arcTime,
    arcLength: globeConfig.arcLength ?? defaultProps.arcLength,
    rings: globeConfig.rings ?? defaultProps.rings,
    maxRings: globeConfig.maxRings ?? defaultProps.maxRings,
    autoRotate: globeConfig.autoRotate !== false,
    autoRotateSpeed: globeConfig.autoRotateSpeed ?? 1.5,
    initialPosition: globeConfig.initialPosition,
  };

  // Load ThreeGlobe library dynamically
  useEffect(() => {
    if (typeof window === "undefined") return;
    import("three-globe")
      .then((module) => {
        ThreeGlobe = module.default;
        extend({ ThreeGlobe: ThreeGlobe });
        setIsLibraryLoaded(true);
      })
      .catch((error) => {
        console.error("Failed to load three-globe:", error);
      });
  }, []);

  // Initialize globe only once after library is loaded
  useEffect(() => {
    if (!ThreeGlobe || !isLibraryLoaded || !groupRef.current) return;
    if (!globeRef.current) {
      globeRef.current = new ThreeGlobe();
      (groupRef.current as any).add(globeRef.current);
      setIsInitialized(true);
    }
  }, [isLibraryLoaded]);

  // Material + base styles
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !isLibraryLoaded) return;

    const mat = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
      opacity: number;
      transparent: boolean;
    };

    // BRAND COLORS applied here
    mat.color = new Color(globeConfig.globeColor ?? defaultProps.globeColor); // #2B2B2B
    mat.emissive = new Color(globeConfig.emissive ?? defaultProps.emissive);
    mat.emissiveIntensity = globeConfig.emissiveIntensity ?? defaultProps.emissiveIntensity;
    mat.shininess = globeConfig.shininess ?? defaultProps.shininess;
    mat.opacity = 1.0;
    mat.transparent = false;
  }, [isInitialized, isLibraryLoaded, globeConfig.globeColor, globeConfig.emissive, globeConfig.emissiveIntensity, globeConfig.shininess]);

  // Build data + continents
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !isLibraryLoaded) return;

    const arcs = (data || []).map((arc) => ({ ...arc, color: "#F59E0B" }));

    let points: PointData[] = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      points.push({ size: defaultProps.pointSize, order: arc.order, color: "#F59E0B", lat: arc.startLat, lng: arc.startLng });
      points.push({ size: defaultProps.pointSize, order: arc.order, color: "#F59E0B", lat: arc.endLat, lng: arc.endLng });
    }

    const filteredPoints = points.filter(
      (v, i, a) => a.findIndex((v2) => ["lat", "lng"].every((k) => (v2 as any)[k] === (v as any)[k])) === i
    );

    // Continents color (HEX polygons)
    globeRef.current
      .hexPolygonsData((countries as any).features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(globeConfig.showAtmosphere ?? defaultProps.showAtmosphere)
      .atmosphereColor(globeConfig.atmosphereColor ?? defaultProps.atmosphereColor)
      .atmosphereAltitude(globeConfig.atmosphereAltitude ?? defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => globeConfig.polygonColor ?? defaultProps.polygonColor); // #F59E0B

    globeRef.current
      .arcsData(arcs)
      .arcStartLat((d: Position) => d.startLat)
      .arcStartLng((d: Position) => d.startLng)
      .arcEndLat((d: Position) => d.endLat)
      .arcEndLng((d: Position) => d.endLng)
      .arcColor(() => "#F59E0B")
      .arcAltitude((d: Position) => d.arcAlt)
      .arcStroke(() => [0.8, 1.0, 1.2][Math.round(Math.random() * 2)])
      .arcDashLength(behaviorConfig.arcLength)
      .arcDashInitialGap((d: Position) => d.order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => Math.random() * 2000 + 1000);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor(() => "#F59E0B")
      .pointsMerge(true)
      .pointAltitude(0.01)
      .pointRadius(2.5);

    globeRef.current
      .ringsData([])
      .ringColor(() => "#F59E0B")
      .ringMaxRadius(behaviorConfig.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((behaviorConfig.arcTime * behaviorConfig.arcLength) / Math.max(1, behaviorConfig.rings));
  }, [isInitialized, isLibraryLoaded, data, globeConfig.showAtmosphere, globeConfig.atmosphereColor, globeConfig.atmosphereAltitude, globeConfig.polygonColor, behaviorConfig.arcLength, behaviorConfig.arcTime, behaviorConfig.rings, behaviorConfig.maxRings]);

  // Handle rings animation with cleanup
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !isLibraryLoaded || !data?.length) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      const newNumbersOfRings = genRandomNumbers(0, data.length, Math.floor((data.length * 3) / 8));

      const ringsData = data
        .filter((_, i) => newNumbersOfRings.includes(i))
        .map((d) => ({ lat: d.startLat, lng: d.startLng, color: "#F59E0B" }));

      globeRef.current.ringsData(ringsData);
    }, 2000);

    return () => clearInterval(interval);
  }, [isInitialized, isLibraryLoaded, data]);

  if (!isLibraryLoaded) {
    // Lightweight placeholder (keeps layout stable)
    return (
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[100, 32, 32]} />
          <meshBasicMaterial color="#2B2B2B" opacity={1} transparent={false} />
        </mesh>
      </group>
    );
  }

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();
  useEffect(() => {
    if (typeof window === "undefined") return;
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0x000000, 0); // Transparent background
  }, [gl, size]);
  return null;
}

export function World(props: WorldProps) {
  const autoRotate = props.globeConfig?.autoRotate !== false;
  const autoRotateSpeed = props.globeConfig?.autoRotateSpeed ?? 1.5;

  return (
    <div className="relative w-full h-full">
      <Canvas camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
        <WebGLRendererConfig />

        {/* Lighting tuned for brand palette */}
        <ambientLight color="#ffffff" intensity={0.6} />
        <directionalLight color="#ffffff" position={new Vector3(-400, 100, 400)} intensity={1.1} />
        <directionalLight color="#ffffff" position={new Vector3(400, 100, -400)} intensity={0.9} />
        <pointLight color="#F59E0B" position={new Vector3(-200, 500, 200)} intensity={0.7} />
        <pointLight color="#F59E0B" position={new Vector3(200, -500, -200)} intensity={0.5} />

        <Globe {...props} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={cameraZ}
          maxDistance={cameraZ}
          autoRotateSpeed={autoRotateSpeed}
          autoRotate={autoRotate}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>

      {/* Optional UI overlay examples (can be removed) */}
      <div className="absolute bottom-8 left-8 text-[#F59E0B] text-xs sm:text-sm font-mono">
        <div className="flex items-center mb-1">
          <div className="w-2 h-2 rounded-full bg-[#F59E0B] mr-2 animate-pulse shadow-lg shadow-[#F59E0B]/50"></div>
          <span className="text-shadow-glow">300 POINTS OF PRESENCE</span>
        </div>
        <div className="pl-4 text-white/90 font-medium">
          SO YOUR RAISE LOADS INSTANTLY<br />EVERYWHERE
        </div>
      </div>

      <style jsx>{`
        .text-shadow-glow { text-shadow: 0 0 10px rgba(245, 158, 11, 0.5); }
      `}</style>
    </div>
  );
}

// Utilities
export function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (!arr.includes(r)) arr.push(r);
  }
  return arr;
}
