"use client";

import {
  BarChart3,
  Bell,
  ChevronLeft,
  FolderKanban,
  Footprints,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Users", icon: Users, href: "/users" },
  { title: "Projects", icon: FolderKanban, href: "/projects" },
  { title: "Analytics", icon: BarChart3, href: "/analytics" },
  { title: "Messages", icon: MessageSquare, href: "/messages", badge: 3 },
  { title: "Notifications", icon: Bell, href: "/notifications", badge: 12 },
  { title: "Settings", icon: Settings, href: "/settings" },
];

export default function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Footprints className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">
            Epsilon Box
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-7 w-7 "
            onClick={toggleSidebar}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                state === "collapsed" && "rotate-180",
              )}
            />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} className="block">
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={item.title}
                    >
                      <div className="flex w-full items-center gap-2">
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1 truncate">{item.title}</span>
                        {item.badge && (
                          <div className="ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground">
                            {item.badge}
                          </div>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className={cn(
                "flex w-full cursor-pointer items-center gap-2 p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors",
                state === "collapsed" && "justify-center px-0",
              )}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              </Avatar>
              <div className="flex flex-col items-start text-left group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Account settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
