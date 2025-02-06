"use client";

import { StatCard } from "@/components/dashboard/statCard";
import { BarChartComponent } from "@/components/dashboard/BarChart";
import { PieChartComponent } from "@/components/dashboard/PieChart";
import { AreaChartComponent } from "@/components/dashboard/AreaChart";

export default function DashboardPage() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 p-4">
        <StatCard
          title="Unique Visitors"
          value="23,876"
          change="24.5%"
          isIncrease={true}
        />
        <StatCard
          title="Page View"
          value="30,450"
          change="20.5%"
          isIncrease={true}
        />
        <StatCard
          title="Events"
          value="34,789"
          change="20.5%"
          isIncrease={false}
        />
        <StatCard
          title="Live Visitor"
          value="45,687"
          change="24.5%"
          isIncrease={true}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-4 pr-4">
        <BarChartComponent />
        <PieChartComponent />
        <AreaChartComponent />
      </div>
    </div>
  );
}
