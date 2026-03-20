import { notFound } from "next/navigation";
import { nucleosData } from "@/lib/data";
import { VideoCard } from "@/components/VideoCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FolderOpen, PlayCircle } from "lucide-react";

interface PageProps {
  params: Promise<{
    nucleoId: string;
    subnucleoId: string;
  }>;
}

export async function generateStaticParams() {
  const params: Array<{ nucleoId: string; subnucleoId: string }> = [];
  
  nucleosData.forEach((nucleo) => {
    nucleo.subnucleos.forEach((subnucleo) => {
      params.push({
        nucleoId: nucleo.id,
        subnucleoId: subnucleo.id,
      });
    });
  });

  return params;
}

export default async function SubnucleoPage({ params }: PageProps) {
  const { nucleoId, subnucleoId } = await params;
  
  const nucleo = nucleosData.find((n) => n.id === nucleoId);
  if (!nucleo) {
    notFound();
  }

  const subnucleo = nucleo.subnucleos.find((s) => s.id === subnucleoId);
  if (!subnucleo) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: nucleo.name, href: `/nucleo/${nucleo.id}` },
          { label: subnucleo.name }
        ]} 
      />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {subnucleo.name}
            </h1>
            <p className="text-gray-600">
              {subnucleo.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Vídeos de Treinamento
        </h2>
        <p className="text-gray-600">
          Assista aos vídeos para se capacitar nas atividades desta coordenadoria
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subnucleo.videos.map((video) => (
          <VideoCard
            key={video.id}
            videoId={video.id}
            title={video.title}
            duration={video.duration}
            nucleoId={nucleoId}
            subnucleoId={subnucleoId}
          />
        ))}
      </div>

      
    </div>
  );
}
