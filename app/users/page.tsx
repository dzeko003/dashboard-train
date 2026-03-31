import DashboardLayout from "@/components/dashboard-layout";
import UsersTable from "@/components/users/users-table";
import React from "react";

export default function Userpage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage your users and their access permissions.
          </p>
        </div>
        <UsersTable />
      </div>
    </DashboardLayout>
  );
}
