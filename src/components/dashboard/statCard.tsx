"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isIncrease: boolean;
}

export function StatCard({ title, value, change, isIncrease }: StatCardProps) {
  return (
    <Card className="flex flex-col items-center px-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-2">
        <span className="text-3xl font-bold">{value}</span>
        <span
          className={`text-sm flex items-center ${
            isIncrease ? "text-green-500" : "text-red-500"
          }`}
        >
          {isIncrease ? "↑" : "↓"} {change}
        </span>
      </CardContent>
      <span className="text-xs text-muted-foreground mt-1 mb-2">
        Compare to last week
      </span>
    </Card>
  );
}
