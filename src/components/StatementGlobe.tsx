"use client";

import { memo } from "react";
import { World, type GlobeConfig, type Position } from "@/components/ui/globe";

const StatementGlobe = memo(function StatementGlobe({
  globeConfig,
  data,
}: {
  globeConfig: GlobeConfig;
  data: Position[];
}) {
  return <World globeConfig={globeConfig} data={data} />;
});

export default StatementGlobe;
