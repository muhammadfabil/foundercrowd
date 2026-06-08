"use client";

import dynamic from "next/dynamic";
import type { GlobeConfig, Position } from "@/components/ui/globe";

const StatementGlobe = dynamic(() => import("@/components/StatementGlobe"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-50">
      <div className="h-40 w-40 rounded-full border border-[#5271ff]/20 bg-[#5271ff]/5 shadow-inner md:h-64 md:w-64" />
    </div>
  ),
});

export default function LazyStatementGlobe({
  globeConfig,
  data,
}: {
  globeConfig: GlobeConfig;
  data: Position[];
}) {
  return <StatementGlobe globeConfig={globeConfig} data={data} />;
}
