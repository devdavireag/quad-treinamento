import { NucleoCard } from "@/components/NucleoCard";
import { nucleosData } from "@/lib/data";
import { Building2 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div>
            <p className="text-white-600 ali">
              Selecione um Núcleo para Acessar os Treinamentos
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
          />
        )
        )
        }

      </div>
    </div>
  );
}
