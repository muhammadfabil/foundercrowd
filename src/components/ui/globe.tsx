"use client";
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3, Group } from "three";
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

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

type PointData = {
  size: number;
  order: number;
  color: string;
  lat: number;
  lng: number;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<any>(null);
  const groupRef = useRef<Group | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#00ffff", // Cyan atmosphere
    showAtmosphere: true,
    atmosphereAltitude: 0.15, // Stronger atmosphere for glow effect
    polygonColor: "rgba(255, 255, 255, 0.8)", // Bright white polygons for continent visibility
    globeColor: "#0a1a2a", // Dark blue-black base
    emissive: "#001133", // Dark blue emissive
    emissiveIntensity: 0.3, // Higher for glow
    shininess: 0.8, // High shine for neon effect
    arcTime: 1800,
    arcLength: 0.75,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  // Load ThreeGlobe library dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('three-globe').then((module) => {
      ThreeGlobe = module.default;
      extend({ ThreeGlobe: ThreeGlobe });
      setIsLibraryLoaded(true);
    }).catch((error) => {
      console.error('Failed to load three-globe:', error);
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

  // Build material when globe is initialized or when relevant props change
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !isLibraryLoaded) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
      opacity: number;
      transparent: boolean;
    };
    
    // Dark blue-black base with neon blue emissive glow
    globeMaterial.color = new Color("#0a1a2a");
    globeMaterial.emissive = new Color("#001155");
    globeMaterial.emissiveIntensity = 0.4;
    globeMaterial.shininess = 0.9;
    globeMaterial.opacity = 1.0;
    globeMaterial.transparent = false;
  }, [
    isInitialized,
    isLibraryLoaded,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  // Build data when globe is initialized or when data changes
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !isLibraryLoaded || !data) return;

    // Neon colors for arcs and points
    const neonData = data.map(arc => ({
      ...arc,
      color: "#00ffff" // Bright cyan
    }));

    const arcs = neonData;
    let points: PointData[] = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: "#00ffff", // Bright cyan points
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: "#00ffff", // Bright cyan points
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    // remove duplicates for same lat and lng
    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"],
          ),
        ) === i,
    );

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true) // Enable atmosphere for glow
      .atmosphereColor("#00ccff") // Bright cyan atmosphere
      .atmosphereAltitude(0.2) // Stronger glow
      .hexPolygonColor(() => "rgba(255, 255, 255, 0.9)"); // Bright white glowing continents
      
    globeRef.current
      .arcsData(neonData)
      .arcStartLat((d: Position) => d.startLat * 1)
      .arcStartLng((d: Position) => d.startLng * 1)
      .arcEndLat((d: Position) => d.endLat * 1)
      .arcEndLng((d: Position) => d.endLng * 1)
      .arcColor(() => "#00ffff") // Bright cyan arcs
      .arcAltitude((d: Position) => d.arcAlt * 1)
      .arcStroke(() => [0.8, 1.0, 1.2][Math.round(Math.random() * 2)]) // Thick glowing arcs
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((d: Position) => d.order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime(() => Math.random() * 2000 + 1000);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor(() => "#00ffff") // Bright cyan points
      .pointsMerge(true)
      .pointAltitude(0.01) // Slightly elevated for glow
      .pointRadius(2.5); // Medium sized glowing points

    globeRef.current
      .ringsData([])
      .ringColor(() => "#00ffff") // Cyan rings
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
      );
  }, [
    isInitialized,
    isLibraryLoaded,
    data,
    defaultProps.pointSize,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
  ]);

  // Handle rings animation with cleanup
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !isLibraryLoaded || !data) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      const newNumbersOfRings = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 3) / 8),
      );

      const ringsData = data
        .filter((d, i) => newNumbersOfRings.includes(i))
        .map((d) => ({
          lat: d.startLat,
          lng: d.startLng,
          color: "#00ffff", // Cyan rings
        }));

      globeRef.current.ringsData(ringsData);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isInitialized, isLibraryLoaded, data]);

  // Show loading state while library is loading
  if (!isLibraryLoaded) {
    return (
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[100, 32, 32]} />
          <meshBasicMaterial color="#0a1a2a" opacity={1.0} transparent={false} />
        </mesh>
      </group>
    );
  }

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0x000000, 1); // Pure black background for contrast
  }, [gl, size]);

  return null;
}

export function World(props: WorldProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
        <WebGLRendererConfig />
        {/* Enhanced lighting for neon effect */}
        <ambientLight color="#001144" intensity={0.3} />
        <directionalLight
          color="#00aaff"
          position={new Vector3(-400, 100, 400)}
          intensity={1.8}
        />
        <directionalLight
          color="#0088cc"
          position={new Vector3(400, 100, -400)}
          intensity={1.2}
        />
        <pointLight
          color="#00ccff"
          position={new Vector3(-200, 500, 200)}
          intensity={2.0}
        />
        <pointLight
          color="#0066aa"
          position={new Vector3(200, -500, -200)}
          intensity={1.5}
        />
        <Globe {...props} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={cameraZ}
          maxDistance={cameraZ}
          autoRotateSpeed={props.globeConfig.autoRotateSpeed || 1.5} // Increased default speed
          autoRotate={props.globeConfig.autoRotate !== false}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
      
      {/* Enhanced UI overlay with neon theme */}
      <div className="absolute bottom-8 left-8 text-cyan-400 text-xs sm:text-sm font-mono">
        <div className="flex items-center mb-1">
          <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse shadow-lg shadow-cyan-400/50"></div>
          <span className="text-shadow-glow">300 POINTS OF PRESENCE</span>
        </div>
        <div className="pl-4 text-white/90 font-medium">
          SO YOUR RAISE LOADS INSTANTLY<br />
          EVERYWHERE
        </div>
      </div>

      <div className="absolute top-8 right-8 text-cyan-400 text-xs sm:text-sm font-mono">
        <div className="text-right">
          <div className="text-white mb-1 opacity-80 text-xl font-bold">US$4,200,000</div>
          <div className="text-shadow-glow">SALES PER MINUTE DURING PEAK<br />SALES TIMES</div>
        </div>
      </div>

      {/* Add some CSS for text glow effect */}
      <style jsx>{`
        .text-shadow-glow {
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

export function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
