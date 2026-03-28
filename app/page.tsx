import DashboardLayout from "@/components/dashboard-layout";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import RecentUsersTable from "@/components/dashboard/recent-users-table";
import RevenueChart from "@/components/dashboard/revenue-chart";
import StatsCards from "@/components/dashboard/stats-cards";
import { UserGrowthChart } from "@/components/dashboard/user-growth-chart";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! here is an overview of your business.
          </p>
        </div>

        <StatsCards />

        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueChart />
          <UserGrowthChart />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentUsersTable />
          </div>
          <ActivityFeed />
        </div>
      </div>
    </DashboardLayout>
  );
}
