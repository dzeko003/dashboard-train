"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const activities = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      initials: "SC",
    },
    action: "created a new project",
    target: "Marketing Campaign Q1",
    time: "2 minutes ago",
  },
  {
    id: 2,
    user: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?u=mike",
      initials: "MJ",
    },
    action: "completed task",
    target: "Update dashboard UI",
    time: "15 minutes ago",
  },
  {
    id: 3,
    user: {
      name: "Emily Davis",
      avatar: "https://i.pravatar.cc/150?u=emily",
      initials: "ED",
    },
    action: "commented on",
    target: "API Integration",
    time: "1 hour ago",
  },
  {
    id: 4,
    user: {
      name: "Alex Thompson",
      avatar: "https://i.pravatar.cc/150?u=alex",
      initials: "AT",
    },
    action: "joined the team",
    target: "",
    time: "3 hours ago",
  },
  {
    id: 5,
    user: {
      name: "Lisa Wang",
      avatar: "https://i.pravatar.cc/150?u=lisa",
      initials: "LW",
    },
    action: "updated settings for",
    target: "User Authentication",
    time: "5 hours ago",
  },
];

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions from your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={activity.user.avatar}
                  alt={activity.user.name}
                />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{" "}
                  <span className="text-muted-foreground">
                    {activity.action}
                  </span>
                  {activity.target && (
                    <span className="font-medium"> {activity.target}</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
