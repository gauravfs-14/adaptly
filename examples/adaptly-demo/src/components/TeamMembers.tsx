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
  members?: TeamMember[];
  title?: string;
  description?: string;
  showHoverCard?: boolean;
}

const defaultMembers: TeamMember[] = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    avatar: "/avatars/sarah.jpg",
    status: "online",
    lastActive: "2 min ago",
    tasks: 12,
  },
  {
    name: "Mike Chen",
    role: "Frontend Developer",
    avatar: "/avatars/mike.jpg",
    status: "away",
    lastActive: "1 hour ago",
    tasks: 8,
  },
  {
    name: "Emily Davis",
    role: "Backend Developer",
    avatar: "/avatars/emily.jpg",
    status: "online",
    lastActive: "5 min ago",
    tasks: 15,
  },
  {
    name: "Alex Rodriguez",
    role: "Designer",
    avatar: "/avatars/alex.jpg",
    status: "offline",
    lastActive: "3 hours ago",
    tasks: 6,
  },
];

export function TeamMembers({
  members = defaultMembers,
  title = "Team Members",
  description = "Active team members",
  showHoverCard = true,
}: TeamMembersProps) {
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
          {members.map((member, index) => (
            <div key={index}>
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
