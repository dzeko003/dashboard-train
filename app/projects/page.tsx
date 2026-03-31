import DashboardLayout from "@/components/dashboard-layout";
import ProjectsGrid from "@/components/projects/projects-grid";

import React from "react";

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track all your projects in one place.
          </p>
        </div>

        <ProjectsGrid />
      </div>
    </DashboardLayout>
  );
}
