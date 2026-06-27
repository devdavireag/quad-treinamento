import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import { getNucleoColors } from "@/lib/nucleoColors";

interface SubnucleoCardProps {
  nucleoId: string;
  id: string;
  name: string;
  description: string;
  videosCount: number;
}

export function SubnucleoCard({ nucleoId, id, name, description, videosCount }: SubnucleoCardProps) {
  const colors = getNucleoColors(nucleoId);

  return (
    <Link href={`/nucleo/${nucleoId}/${id}`}>
      <Card
        className="hover:shadow-lg transition-all duration-300 cursor-pointer h-full relative overflow-hidden border-2"
        style={{ borderColor: colors.bg }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg2} 100%)`,
            clipPath: "polygon(0 0, 52% 0, 32% 100%, 0 100%)",
          }}
        />

        <div className="relative z-10">
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
        </div>
      </Card>
    </Link>
  );
}
