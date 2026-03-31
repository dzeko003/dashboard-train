import DashboardLayout from "@/components/dashboard-layout";
import RevenueChart from "@/components/dashboard/revenue-chart";
import { UserGrowthChart } from "@/components/dashboard/user-growth-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your performance metrics and business insights.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Page Views</CardDescription>
                  <CardTitle className="text-3xl">1.2M</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-success font-medium">+15.2%</span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Bounce Rate</CardDescription>
                  <CardTitle className="text-3xl">42.5%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-success font-medium">-3.1%</span> from
                    last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Session Duration</CardDescription>
                  <CardTitle className="text-3xl">4m 32s</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-success font-medium">+8.4%</span> from
                    last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Returning Visitors</CardDescription>
                  <CardTitle className="text-3xl">68.2%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-success font-medium">+2.8%</span> from
                    last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <RevenueChart />
              <UserGrowthChart />
            </div>
          </TabsContent>
          <TabsContent value="revenue" className="space-y-4">
            <RevenueChart />
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <UserGrowthChart />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
