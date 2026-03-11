import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, Clock } from "lucide-react";
import Link from "next/link";

interface VideoCardWithOptionsProps {
  videoId: string;
  title: string;
  duration: string;
  nucleoId: string;
  subnucleoId: string;
  useBunny?: boolean; // Se true, usa Bunny Stream. Se false, usa local
}

export function VideoCardWithOptions({ 
  videoId, 
  title, 
  duration, 
  nucleoId, 
  subnucleoId,
  useBunny = false // Padrão: usa vídeo local
}: VideoCardWithOptionsProps) {
  
  // Define a rota baseado na configuração
  const videoRoute = useBunny 
    ? `/video-bunny/${videoId}` 
    : `/video/${videoId}`

  return (
    <Link href={`${videoRoute}?nucleoId=${nucleoId}&subnucleoId=${subnucleoId}`}>
      <Card className="hover:shadow-md transition-all duration-300 hover:border-primary cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                useBunny ? 'bg-green-100' : 'bg-primary/10'
              }`}>
                <PlayCircle className={`h-6 w-6 ${useBunny ? 'text-green-600' : 'text-primary'}`} />
              </div>
            </div>
            <div className="flex-1">
              <CardTitle className="text-base leading-tight mb-1">{title}</CardTitle>
              {useBunny && (
                <span className="text-xs text-green-600 font-semibold">
                  🚀 Bunny Stream
                </span>
              )}
            </div>
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
