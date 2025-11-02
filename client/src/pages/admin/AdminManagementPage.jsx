import { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Switch } from "../../components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { toast } from "sonner";
import { Plus, Search, UserX } from "lucide-react";
import axios from "axios";
import { axiosInstance } from "@/lib/axios";

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "Admin",
  });

  // Fetch admins from backend
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axiosInstance.get("/admins");
        setAdmins(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch admins");
      }
    };
    fetchAdmins();
  }, []);

  // Filters
  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || admin.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Add Admin
  const handleAddAdmin = async () => {
    if (!newAdmin.name || !newAdmin.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      const res = await axiosInstance.post("/admins", {
        ...newAdmin,
        status: "Active",
      });
      setAdmins((prev) => [...prev, res.data]);
      toast.success("Admin added successfully");
      setNewAdmin({ name: "", email: "", role: "Admin" });
      setAddDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add admin");
    }
  };

  // Toggle Active/Inactive
  const handleToggleStatus = async (id) => {
    try {
      const admin = admins.find((a) => a.id === id);
      const newStatus = admin.status === "Active" ? "Disabled" : "Active";
      await axiosInstance.patch(`/admins/${id}/status`, { status: newStatus });
      setAdmins((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
      toast.success(
        `Admin ${newStatus === "Active" ? "activated" : "deactivated"}`
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  // Delete Admin
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await axiosInstance.delete(`/admins/${id}`);
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      toast.success("Admin deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete admin");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-slate-900 dark:text-white mb-2">
            Admin Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage administrators and their permissions
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setAddDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            <Plus className="w-4 h-4" /> Add Admin
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Disabled">Disabled</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Admins Table */}
      <Table className="bg-white dark:bg-slate-900 border dark:border-slate-700">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAdmins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.role}</TableCell>
              <TableCell>
                <Badge
                  variant={admin.status === "Active" ? "default" : "secondary"}
                >
                  {admin.status}
                </Badge>
              </TableCell>
              <TableCell>{admin.lastLogin || "Never"}</TableCell>
              <TableCell className="flex gap-2">
                <Switch
                  checked={admin.status === "Active"}
                  onCheckedChange={() => handleToggleStatus(admin.id)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(admin.id)}
                >
                  <UserX className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Admin Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Admin</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Name"
              value={newAdmin.name}
              onChange={(e) =>
                setNewAdmin((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <Input
              placeholder="Email"
              value={newAdmin.email}
              onChange={(e) =>
                setNewAdmin((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <Select
              value={newAdmin.role}
              onValueChange={(value) =>
                setNewAdmin((prev) => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={handleAddAdmin}>Add Admin</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
