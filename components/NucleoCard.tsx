import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getNucleoColors } from "@/lib/nucleoColors";

interface NucleoCardProps {
  id: string;
  name: string;
}

export function NucleoCard({ id, name }: NucleoCardProps) {
  const colors = getNucleoColors(id);

  return (
    <Link href={`/nucleo/${id}`}>
      <Card
        className="hover:shadow-lg transition-all duration-300 cursor-pointer h-full min-h-[170px] relative overflow-hidden border-2"
        style={{ borderColor: colors.bg }}
      >

        {/* Diagonal colorida — sem position, fica atrás naturalmente */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
              background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg2} 100%)`,
              clipPath: "polygon(0 0, 52% 0, 32% 100%, 0 100%)",
            }}
        />



        {/* ✅ Wrapper com relative z-10 — todo o conteúdo na frente da diagonal */}
        <div className="relative z-10 flex items-center justify-start h-full min-h-[80px]">
          <CardHeader className="px-6 py-6">
            <CardTitle className="text-xl text-left">{name}</CardTitle>
          </CardHeader>
        </div>

      </Card>
    </Link>
  );
}