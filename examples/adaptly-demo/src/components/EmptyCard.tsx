import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Sparkles } from "lucide-react";

interface EmptyCardProps {
  title: string;
  description: string;
  action?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function EmptyCard({
  title,
  description,
  action,
  icon: Icon = HelpCircle,
}: EmptyCardProps) {
  return (
    <Card className="h-full flex flex-col border-dashed border-2 border-muted-foreground/25 bg-muted/20">
      <CardHeader className="flex flex-col items-center justify-center text-center space-y-2 pb-4">
        <div className="p-3 rounded-full bg-muted/50">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
        <CardTitle className="text-lg font-semibold text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-sm text-muted-foreground max-w-sm">{description}</p>

        {action && (
          <Button
            variant="outline"
            size="sm"
            className="border-dashed border-muted-foreground/50 hover:border-muted-foreground/75"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {action}
          </Button>
        )}

        <div className="flex items-center space-x-1 text-xs text-muted-foreground/75">
          <kbd className="bg-muted px-2 py-1 rounded text-xs">⌘K</kbd>
          <span>to get started</span>
        </div>
      </CardContent>
    </Card>
  );
}
