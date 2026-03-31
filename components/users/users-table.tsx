"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Filter,
  MoreHorizontalIcon,
  Plus,
  Search,
} from "lucide-react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import UserFormDialog from "./user-form-dialog";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
  initials: string;
  createdAt: string;
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    initials: "SC",
    role: "Admin",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    avatar: "https://i.pravatar.cc/150?u=mike",
    initials: "MJ",
    role: "Editor",
    status: "active",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.d@example.com",
    avatar: "https://i.pravatar.cc/150?u=emily",
    initials: "ED",
    role: "Viewer",
    status: "inactive",
    createdAt: "2024-03-05",
  },
  {
    id: "4",
    name: "Alex Thompson",
    email: "alex.t@example.com",
    avatar: "https://i.pravatar.cc/150?u=alex",
    initials: "AT",
    role: "Editor",
    status: "active",
    createdAt: "2024-03-10",
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa.w@example.com",
    avatar: "https://i.pravatar.cc/150?u=lisa",
    initials: "LW",
    role: "Viewer",
    status: "pending",
    createdAt: "2024-03-12",
  },
  {
    id: "6",
    name: "David Kim",
    email: "david.k@example.com",
    avatar: "https://i.pravatar.cc/150?u=david",
    initials: "DK",
    role: "Admin",
    status: "active",
    createdAt: "2024-03-15",
  },
  {
    id: "7",
    name: "Rachel Green",
    email: "rachel.g@example.com",
    avatar: "https://i.pravatar.cc/150?u=rachel",
    initials: "RG",
    role: "Editor",
    status: "active",
    createdAt: "2024-03-18",
  },
  {
    id: "8",
    name: "James Wilson",
    email: "james.w@example.com",
    avatar: "https://i.pravatar.cc/150?u=james",
    initials: "JW",
    role: "Viewer",
    status: "inactive",
    createdAt: "2024-03-20",
  },
];

type SortField = "name" | "email" | "role" | "status" | "createdAt";
type SortDirection = "asc" | "desc";

const ITEMS_PER_PAGE = 5;

export default function UsersTable() {
  const [statusFilter, setStatusFilter] = useState<string[]>([
    "active",
    "inactive",
    "pending",
  ]);
  const [roleFilter, setRoleFilter] = useState<string[]>([
    "Admin",
    "Editor",
    "Viewer",
  ]);

  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditUser] = useState<User | null>(null);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-3 w-3 ml-1" />
    ) : (
      <ChevronDown className="h-3 w-3 ml-1" />
    );
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortUsers = useMemo(() => {
    const filtered = users.filter(
      (user) =>
        (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
        statusFilter.includes(user.status) &&
        roleFilter.includes(user.role),
    );

    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      const direction = sortDirection === "asc" ? 1 : -1;

      if (aValue < bValue) return -1 * direction;
      if (aValue > bValue) return 1 * direction;

      return 0;
    });
  }, [users, searchQuery, sortField, sortDirection, statusFilter, roleFilter]);

  const totalPages = Math.ceil(filteredAndSortUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredAndSortUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getStatusbadge = useCallback((status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      active: "default",
      inactive: "secondary",
      pending: "outline",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  }, []);

  const handleEdit = (user: User) => {
    setEditUser(user);
    setIsFormOpen(true);
  };

  const handleSaveUser = (userData: Partial<User>) => {
    if (editingUser) {
      setUsers(
        users.map((u) => (u.id === editingUser.id ? { ...u, ...userData } : u)),
      );
      toast.success("User updated successfully");
    } else {
      const newUser: User = {
        id: String(Date.now()),
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "Viewer",
        status: userData.status || "active",
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
        initials: (userData.name || "")
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers([newUser, ...users]);
      toast.success("User created successfuly");
    }
    setEditUser(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-bold">Users</h1>
              <p className="text-muted-foreground">
                Manage your users and their permissions
              </p>
            </div>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center py-2">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-1.5 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground">
                    <Filter className="h-4 w-4" />
                    <span>Status</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuGroup>
                    {["active", "inactive", "pending"].map((status) => (
                      <DropdownMenuCheckboxItem
                        checked={statusFilter.includes(status)}
                        onCheckedChange={(checked) => {
                          setStatusFilter(
                            checked
                              ? [...statusFilter, status]
                              : statusFilter.filter((s) => s !== status),
                          );
                        }}
                        key={status}
                      >
                        {status}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground">
                    <Filter className="h-4 w-4" />
                    <span>Role</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuGroup>
                    {["Admin", "Editor", "Viewer"].map((role) => (
                      <DropdownMenuCheckboxItem
                        checked={roleFilter.includes(role)}
                        onCheckedChange={(checked) => {
                          setRoleFilter(
                            checked
                              ? [...roleFilter, role]
                              : roleFilter.filter((r) => r !== role),
                          );
                        }}
                        key={role}
                      >
                        {role}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <button
                      className="flex items-center font-medium hover:text-foreground"
                      onClick={() => handleSort("name")}
                    >
                      User
                      <SortIcon field="name" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center font-medium hover:text-foreground"
                      onClick={() => handleSort("role")}
                    >
                      Role
                      <SortIcon field="role" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center font-medium hover:text-foreground"
                      onClick={() => handleSort("status")}
                    >
                      Status
                      <SortIcon field="status" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center font-medium hover:text-foreground"
                      onClick={() => handleSort("createdAt")}
                    >
                      Created
                      <SortIcon field="createdAt" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>No users found.</TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {user.role}
                      </TableCell>
                      <TableCell>{getStatusbadge(user.status)}</TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <div className="inline-flex items-center justify-center gap-2">
                              <MoreHorizontalIcon />
                              <span className="sr-only">action</span>
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(user)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between px-2 py-4">
            <p>
              Showing {paginatedUsers.length} of {filteredAndSortUsers.length}{" "}
              users
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
                <ChevronRight />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <UserFormDialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditUser(null);
        }}
        user={editingUser}
        onSave={handleSaveUser}
      />
    </>
  );
}
