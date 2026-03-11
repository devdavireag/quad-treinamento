import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, Clock } from "lucide-react";
import Link from "next/link";

interface VideoCardProps {
  videoId: string;
  title: string;
  duration: string;
  nucleoId: string;
  subnucleoId: string;
}

export function VideoCard({ videoId, title, duration, nucleoId, subnucleoId }: VideoCardProps) {
  return (
    <Link href={`/video-bunny/${videoId}?nucleoId=${nucleoId}&subnucleoId=${subnucleoId}`}>
      <Card className="hover:shadow-md transition-all duration-300 hover:border-primary cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <PlayCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-base leading-tight">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
