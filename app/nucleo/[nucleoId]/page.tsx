import { notFound } from "next/navigation";
import { nucleosData } from "@/lib/data";
import { SubnucleoCard } from "@/components/SubnucleoCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Folder } from "lucide-react";

interface PageProps {
  params: Promise<{
    nucleoId: string;
  }>;
}

export async function generateStaticParams() {
  return nucleosData.map((nucleo) => ({
    nucleoId: nucleo.id,
  }));
}

export default async function NucleoPage({ params }: PageProps) {
  const { nucleoId } = await params;
  const nucleo = nucleosData.find((n) => n.id === nucleoId);

  if (!nucleo) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: nucleo.name }
        ]} 
      />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {nucleo.name}
            </h1>
            <p className="text-gray-600">
            </p>
          </div>
        </div>
        <div className="mb-6">
        <p className="text-gray-600">
          Selecione uma coordenadoria para acessar os materiais de treinamento
        </p>
      </div>
      </div>

      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nucleo.subnucleos.map((subnucleo) => (
          <SubnucleoCard
            key={subnucleo.id}
            nucleoId={nucleo.id}
            id={subnucleo.id}
            name={subnucleo.name}
            description={subnucleo.description}
            videosCount={subnucleo.videos.length}
          />
        ))}
      </div>

      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-2">
          Sobre este núcleo
        </h3>
        <p className="text-gray-700">
          {nucleo.description}. Este núcleo possui {nucleo.subnucleos.length} {nucleo.subnucleos.length === 1 ? 'coordenadoria' : 'coordenadorias'} com 
          materiais de treinamento específicos para cada área de atuação.
        </p>
      </div>
    </div>
  );
}
