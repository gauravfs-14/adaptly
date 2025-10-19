import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  status: "online" | "away" | "offline";
  lastActive: string;
  tasks: number;
}

interface TeamMembersProps {
  title?: string;
  description?: string;
  showHoverCard?: boolean;
  // Filtering parameters that LLM can pass
  department?: string;
  status?: "online" | "away" | "offline";
  role?: string;
  sortBy?: "name" | "role" | "status" | "tasks";
  sortOrder?: "asc" | "desc";
  limit?: number;
}

export function TeamMembers({
  title = "Team Members",
  description = "Active team members",
  showHoverCard = true,
  department,
  status,
  role,
  sortBy = "name",
  sortOrder = "asc",
  limit = 10,
}: TeamMembersProps) {
  // Simulate data fetching based on filtering parameters
  const generateData = () => {
    const baseData = [
      {
        name: "Sarah Johnson",
        role: "Product Manager",
        avatar: "/avatars/sarah.jpg",
        status: "online" as const,
        lastActive: "2 min ago",
        tasks: 12,
      },
      {
        name: "Mike Chen",
        role: "Frontend Developer",
        avatar: "/avatars/mike.jpg",
        status: "away" as const,
        lastActive: "1 hour ago",
        tasks: 8,
      },
      {
        name: "Emily Davis",
        role: "Backend Developer",
        avatar: "/avatars/emily.jpg",
        status: "online" as const,
        lastActive: "5 min ago",
        tasks: 15,
      },
      {
        name: "Alex Rodriguez",
        role: "Designer",
        avatar: "/avatars/alex.jpg",
        status: "offline" as const,
        lastActive: "3 hours ago",
        tasks: 6,
      },
    ];

    // Apply filtering
    let filteredData = [...baseData];

    // Filter by status
    if (status) {
      filteredData = filteredData.filter((member) => member.status === status);
    }

    // Filter by role
    if (role) {
      filteredData = filteredData.filter((member) =>
        member.role.toLowerCase().includes(role.toLowerCase())
      );
    }

    // Sort data
    filteredData.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case "name":
          aVal = a.name;
          bVal = b.name;
          break;
        case "role":
          aVal = a.role;
          bVal = b.role;
          break;
        case "status":
          aVal = a.status;
          bVal = b.status;
          break;
        case "tasks":
          aVal = a.tasks;
          bVal = b.tasks;
          break;
        default:
          aVal = a.name;
          bVal = b.name;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else {
        const aNum = typeof aVal === "number" ? aVal : 0;
        const bNum = typeof bVal === "number" ? bVal : 0;
        return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
      }
    });

    // Apply limit
    return filteredData.slice(0, limit);
  };

  const teamMembers = generateData();
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "online":
        return "default";
      case "away":
        return "secondary";
      default:
        return "outline";
    }
  };

  const MemberCard = ({ member }: { member: TeamMember }) => (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={member.avatar} />
        <AvatarFallback>
          {member.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{member.name}</p>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </div>
      <Badge variant={getStatusVariant(member.status) as any}>
        {member.status}
      </Badge>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={`${member.name}-${member.role}-${index}`}>
              {showHoverCard ? (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="cursor-pointer">
                      <MemberCard member={member} />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last active: {member.lastActive}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tasks: {member.tasks}
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <MemberCard member={member} />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
