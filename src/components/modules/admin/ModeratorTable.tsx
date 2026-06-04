import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Mail, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ModeratorTableProps {
  moderators: User[];
}

export default function ModeratorTable({ moderators }: ModeratorTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Moderator</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moderators.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No moderators found.
              </TableCell>
            </TableRow>
          ) : (
            moderators.map((moderator) => (
              <TableRow key={moderator.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={moderator.image || undefined} />
                    <AvatarFallback>{moderator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{moderator.name}</span>
                </TableCell>
                <TableCell>{moderator.email}</TableCell>
                <TableCell>
                  <Badge variant={moderator.status === "ACTIVE" ? "default" : "secondary"}>
                    {moderator.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {moderator.createdAt 
                    ? new Date(moderator.createdAt).toLocaleDateString()
                    : "Unknown"
                  }
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="cursor-pointer">
                        <Mail className="mr-2 h-4 w-4" /> Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <ShieldCheck className="mr-2 h-4 w-4" /> Manage Permissions
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
  );
}
