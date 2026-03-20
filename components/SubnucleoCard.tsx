import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, FolderOpen, PlayCircle } from "lucide-react";

interface SubnucleoCardProps {
  nucleoId: string;
  id: string;
  name: string;
  description: string;
  videosCount: number;
}

export function SubnucleoCard({ nucleoId, id, name, description, videosCount }: SubnucleoCardProps) {
  return (
    <Link href={`/nucleo/${nucleoId}/${id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary cursor-pointer h-full">
        <CardHeader>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <PlayCircle className="h-4 w-4 text-primary" />
            <span className="font-semibold text-primary">{videosCount}</span>
            <span>{videosCount === 1 ? "Vídeo" : "Vídeos"} de treinamento</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
