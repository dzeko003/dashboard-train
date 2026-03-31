import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export interface Project {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "on-hold" | "archived";
  progress: number;
  team: {
    name: string;
    avatar: string;
    initials: string;
  }[];
  dueDate: string;
}

interface projetCardProps {
  project: Project;
}

export default function ProjectCard({ project }: projetCardProps) {
  const getStatusbadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      active: "default",
      completed: "secondary",
      "on-hold": "outline",
      archive: "destructive",
    };

    const labels: Record<string, string> = {
      active: "Active",
      completed: "Completed",
      "on-hold": "On Hold",
      archived: "Archived",
    };

    return (
      <Badge variant={variants[status || "default"]}>
        {labels[status] || status}
      </Badge>
    );
  };

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="inline-flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          {getStatusbadge(project.status)}
          <span>
            Du{" "}
            {new Date(project.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress}</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.team.slice(0, 4).map((member, index) => (
              <Avatar
                key={index}
                className="h-7 w-7 border-2 border-background"
              >
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.team.length > 4 && (
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                +{project.team.length - 4}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
