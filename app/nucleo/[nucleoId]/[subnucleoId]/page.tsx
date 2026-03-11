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
          <FolderOpen className="h-10 w-10 text-primary" />
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

      <div className="flex items-center gap-3 mb-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
        <PlayCircle className="h-6 w-6 text-primary flex-shrink-0" />
        <div>
          <p className="font-semibold text-gray-900">
            {subnucleo.videos.length} {subnucleo.videos.length === 1 ? 'vídeo disponível' : 'vídeos disponíveis'}
          </p>
          <p className="text-sm text-gray-600">
            Materiais de treinamento e capacitação
          </p>
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

      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-2">
          Informações sobre o treinamento
        </h3>
        <p className="text-gray-700 mb-4">
          {subnucleo.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total de vídeos</p>
            <p className="text-2xl font-bold text-primary">{subnucleo.videos.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Núcleo</p>
            <p className="text-lg font-semibold text-gray-900">{nucleo.name.split(' - ')[0]}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Tipo</p>
            <p className="text-lg font-semibold text-gray-900">Coordenadoria</p>
          </div>
        </div>
      </div>
    </div>
  );
}
