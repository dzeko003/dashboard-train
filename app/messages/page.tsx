import DashboardLayout from "@/components/dashboard-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const conversations = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      initials: "SC",
    },
    lastMessage: "Can you review the latest mockups?",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    user: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?u=mike",
      initials: "MJ",
    },
    lastMessage: "The deployment was successful!",
    time: "15 min ago",
    unread: true,
  },
  {
    id: 3,
    user: {
      name: "Emily Davis",
      avatar: "https://i.pravatar.cc/150?u=emily",
      initials: "ED",
    },
    lastMessage: "I will check the API documentation.",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: 4,
    user: {
      name: "Alex Thompson",
      avatar: "https://i.pravatar.cc/150?u=alex",
      initials: "AT",
    },
    lastMessage: "Thanks for the feedback!",
    time: "3 hours ago",
    unread: false,
  },
  {
    id: 5,
    user: {
      name: "Lisa Wang",
      avatar: "https://i.pravatar.cc/150?u=lisa",
      initials: "LW",
    },
    lastMessage: "Meeting scheduled for tomorrow.",
    time: "1 day ago",
    unread: false,
  },
];

export default function MessagesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">
            View and manage your conversations.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Conversations</CardTitle>
                <CardDescription>You have 2 unread messages</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="flex items-center gap-4 rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={conversation.user.avatar}
                    alt={conversation.user.name}
                  />
                  <AvatarFallback>{conversation.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">
                      {conversation.user.name}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {conversation.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unread && (
                  <Badge className="h-2 w-2 rounded-full p-0" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
