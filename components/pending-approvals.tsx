"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function PendingApprovals() {
  const [approvals, setApprovals] = useState(pendingApprovals)

  const handleApprove = (id: string) => {
    setApprovals(approvals.filter((approval) => approval.id !== id))
  }

  const handleReject = (id: string) => {
    setApprovals(approvals.filter((approval) => approval.id !== id))
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
          {approvals.map((approval) => (
            <TableRow key={approval.id}>
              <TableCell className="font-medium">{approval.id}</TableCell>
              <TableCell>{approval.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{approval.type}</Badge>
              </TableCell>
              <TableCell>{approval.submitted}</TableCell>
              <TableCell>
                <Badge variant={approval.status === "Pending" ? "outline" : "default"}>{approval.status}</Badge>
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
                      <DropdownMenuItem className="text-red-600">Ban user</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const pendingApprovals = [
  {
    id: "APP-1234",
    name: "Bella Italia Restaurant",
    type: "Restaurant",
    submitted: "2023-06-01",
    status: "Pending",
  },
  {
    id: "APP-1235",
    name: "50% Off Pizza Deal",
    type: "Deal",
    submitted: "2023-06-02",
    status: "Pending",
  },
  {
    id: "APP-1236",
    name: "Sushi Master Restaurant",
    type: "Restaurant",
    submitted: "2023-06-03",
    status: "Pending",
  },
  {
    id: "APP-1237",
    name: "BOGO Sushi Rolls",
    type: "Deal",
    submitted: "2023-06-03",
    status: "Pending",
  },
  {
    id: "APP-1238",
    name: "Taco Fiesta Restaurant",
    type: "Restaurant",
    submitted: "2023-06-04",
    status: "Pending",
  },
]
