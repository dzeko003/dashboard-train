"use client";

import { DollarSign, FolderKanban, TrendingUp, Users } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Revenue",
    value: "$48,352",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Active Projects",
    value: "142",
    change: "+4.1%",
    changeType: "positive" as const,
    icon: FolderKanban,
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "-0.5%",
    changeType: "negative" as const,
    icon: TrendingUp,
  },
];

export default function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span
                className={cn(
                  "font-medium",
                  stat.changeType === "positive" && "text-green-500",
                  stat.changeType === "negative" && "text-destructive",
                )}
              >
                {stat.change}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
