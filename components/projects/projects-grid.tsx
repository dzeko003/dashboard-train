"use client";

import { Filter, LayoutGrid, List, Plus, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import ProjectCard from "./project-card";

const projects: Project[] = [
  {
    id: "1",
    title: "Marketing Campaign Q1",
    description:
      "Launch new marketing campaign targeting enterprise customers with focus on ROI metrics.",
    status: "active",
    progress: 75,
    dueDate: "2024-04-15",
    team: [
      {
        name: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        initials: "SC",
      },
      {
        name: "Mike Johnson",
        avatar: "https://i.pravatar.cc/150?u=mike",
        initials: "MJ",
      },
      {
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/150?u=emily",
        initials: "ED",
      },
    ],
  },
  {
    id: "2",
    title: "Website Redesign",
    description:
      "Complete overhaul of company website with new branding and improved UX.",
    status: "active",
    progress: 45,
    dueDate: "2024-05-01",
    team: [
      {
        name: "Alex Thompson",
        avatar: "https://i.pravatar.cc/150?u=alex",
        initials: "AT",
      },
      {
        name: "Lisa Wang",
        avatar: "https://i.pravatar.cc/150?u=lisa",
        initials: "LW",
      },
    ],
  },
  {
    id: "3",
    title: "Mobile App Development",
    description:
      "Build native iOS and Android apps with offline support and push notifications.",
    status: "on-hold",
    progress: 30,
    dueDate: "2024-06-30",
    team: [
      {
        name: "David Kim",
        avatar: "https://i.pravatar.cc/150?u=david",
        initials: "DK",
      },
      {
        name: "Rachel Green",
        avatar: "https://i.pravatar.cc/150?u=rachel",
        initials: "RG",
      },
      {
        name: "James Wilson",
        avatar: "https://i.pravatar.cc/150?u=james",
        initials: "JW",
      },
      {
        name: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        initials: "SC",
      },
      {
        name: "Mike Johnson",
        avatar: "https://i.pravatar.cc/150?u=mike",
        initials: "MJ",
      },
    ],
  },
  {
    id: "4",
    title: "API Integration",
    description:
      "Integrate third-party APIs for payment processing and analytics.",
    status: "completed",
    progress: 100,
    dueDate: "2024-03-01",
    team: [
      {
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/150?u=emily",
        initials: "ED",
      },
    ],
  },
  {
    id: "5",
    title: "Customer Portal",
    description:
      "Self-service portal for customers to manage subscriptions and billing.",
    status: "active",
    progress: 60,
    dueDate: "2024-04-20",
    team: [
      {
        name: "Alex Thompson",
        avatar: "https://i.pravatar.cc/150?u=alex",
        initials: "AT",
      },
      {
        name: "Lisa Wang",
        avatar: "https://i.pravatar.cc/150?u=lisa",
        initials: "LW",
      },
      {
        name: "David Kim",
        avatar: "https://i.pravatar.cc/150?u=david",
        initials: "DK",
      },
    ],
  },
  {
    id: "6",
    title: "Data Analytics Dashboard",
    description:
      "Real-time analytics dashboard with customizable widgets and reports.",
    status: "active",
    progress: 85,
    dueDate: "2024-03-25",
    team: [
      {
        name: "Rachel Green",
        avatar: "https://i.pravatar.cc/150?u=rachel",
        initials: "RG",
      },
      {
        name: "James Wilson",
        avatar: "https://i.pravatar.cc/150?u=james",
        initials: "JW",
      },
    ],
  },
];

export default function ProjectsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([
    "active",
    "completed",
    "on-hold",
    "archived",
  ]);

  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredProjects = useMemo(() => {
    return projects.filter(
      (project) =>
        (project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) &&
        statusFilter.includes(project.status),
    );
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="inline-flex justify-center items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["active", "completed", "on-hold", "archived"].map((status) => (
                <DropdownMenuItem
                  key={status}
                  checked={statusFilter.includes(status)}
                  onCheckedChange={(checked) => {
                    setStatusFilter(
                      checked
                        ? [...statusFilter, status]
                        : statusFilter.filter((s) => s !== status),
                    );
                  }}
                  className="capitalize"
                >
                  {status.replace("-", " ")}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Tabs
            value={view}
            onValueChange={(v) => setView(v as "grid" | "list")}
          >
            <TabsList>
              <TabsTrigger value="grid" className="px-2.5">
                <LayoutGrid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="px-2.5">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New project
          </Button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No projects found</p>
          <Button variant="link" className="mt-2">
            Create your first project
          </Button>
        </div>
      ) : (
        <div
          className={
            view === "grid"
              ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "space-y-4"
          }
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
