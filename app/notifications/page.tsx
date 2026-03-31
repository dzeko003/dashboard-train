import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge, Check, FolderKanban, MessageSquare, Users } from "lucide-react";
import React from "react";

const notifications = [
  {
    id: 1,
    type: "message",
    icon: MessageSquare,
    title: "New message from Sarah Chen",
    description: "Can you review the latest mockups for the dashboard?",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "user",
    icon: Users,
    title: "New team member joined",
    description: "Alex Thompson has joined the Design team.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "project",
    icon: FolderKanban,
    title: "Project deadline approaching",
    description: "Marketing Campaign Q1 is due in 3 days.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: 4,
    type: "message",
    icon: MessageSquare,
    title: "Mike Johnson mentioned you",
    description: "Great work on the API integration!",
    time: "5 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "user",
    icon: Users,
    title: "User role updated",
    description: "Emily Davis role changed from Viewer to Editor.",
    time: "1 day ago",
    read: true,
  },
];

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with your latest activities.
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>
                  You have 3 unread notifications
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                    !notification.read ? "bg-muted/30" : ""
                  }`}
                >
                  <div
                    className={`rounded-full p-2 ${
                      !notification.read
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <notification.icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{notification.title}</p>
                      {!notification.read && (
                        <Badge className="h-2 w-2 rounded-full bg-primary p-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
