"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PendingApproval {
  id: string;
  name: string;
  type: string;
  submitted: string;
  status: string;
  // Add other fields based on your API response
}

export function PendingApprovals() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [approvals, setApprovals] = useState<PendingApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch pending approvals on component mount
  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/admin/pending-restaurant-owners`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This is important for sending cookies
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pending approvals');
      }

      const data = await response.json();
      // Map the API response to match your component's data structure
      // Adjust this based on your actual API response structure
      const formattedData = data.map((item: any) => ({
        id: item._id || item.id,
        name: item.restaurantName || item.name,
        type: 'Restaurant',
        submitted: new Date(item.createdAt || item.submitted).toLocaleDateString(),
        status: item.status || 'Pending',
      }));
      
      setApprovals(formattedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/approve-restaurant/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies
      });

      if (!response.ok) {
        throw new Error('Failed to approve');
      }

      // Remove from local state after successful approval
      setApprovals(approvals.filter((approval) => approval.id !== id));
    } catch (err) {
      console.error('Error approving:', err);
      // Handle error (show toast, etc.)
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/reject-restaurant/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies
      });

      if (!response.ok) {
        throw new Error('Failed to reject');
      }

      // Remove from local state after successful rejection
      setApprovals(approvals.filter((approval) => approval.id !== id));
    } catch (err) {
      console.error('Error rejecting:', err);
      // Handle error (show toast, etc.)
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {approvals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No pending approvals
              </TableCell>
            </TableRow>
          ) : (
            approvals.map((approval) => (
              <TableRow key={approval.id}>
                <TableCell className="font-medium">{approval.id}</TableCell>
                <TableCell>{approval.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{approval.type}</Badge>
                </TableCell>
                <TableCell>{approval.submitted}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      approval.status === "Pending" ? "outline" : "default"
                    }
                  >
                    {approval.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleApprove(approval.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleReject(approval.id)}
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Request changes</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Ban user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}