import { NucleoCard } from "@/components/NucleoCard";
import { nucleosData } from "@/lib/data";
import { Building2 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quad Concursos
            </h1>
            <p className="text-gray-600">
              Selecione um núcleo para acessar os treinamentos
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nucleosData.map((nucleo) => (
          <NucleoCard
            key={nucleo.id}
            id={nucleo.id}
            name={nucleo.name}
            description={nucleo.description}
            subnucleosCount={nucleo.subnucleos.length}
          />
        )
        )
        }

      </div>
    </div>
  );
}
