import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface NucleoCardProps {
  id: string;
  name: string;
  description: string;
  subnucleosCount: number;
}

const nucleoColors: Record<string, { bar: string; bg: string; text: string; badge: string }> = {
  ngg: {
    bar: "#999999",
    bg: "#999999",
    text: "#666666",
    badge: "#e6e6e6",
  },
  nge: {
    bar: "#993556",
    bg: "#993556",
    text: "#72243E",
    badge: "#FBEAF0",
  },
  nti: {
    bar: "#e6e600",
    bg: "#e6e600",
    text: "#3C3489",
    badge: "#EEEDFE",
  },
  nre: {
    bar: "#0F6E56",
    bg: "#0F6E56",
    text: "#085041",
    badge: "#E1F5EE",
  },
  nop: {
    bar: "#0F6E56",
    bg: "#0F6E56",
    text: "#085041",
    badge: "#E1F5EE",
  },
  npp: {
    bar: "#993556",
    bg: "#993556",
    text: "#72243E",
    badge: "#FBEAF0",
  },
};

const defaultColors = {
  bar: "#888780",
  bg: "#888780",
  text: "#444441",
  badge: "#F1EFE8",
};

export function NucleoCard({ id, name, description, subnucleosCount }: NucleoCardProps) {
  const colors = nucleoColors[id.toLowerCase()] ?? defaultColors;

  return (
    <Link href={`/nucleo/${id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary cursor-pointer h-full relative overflow-hidden">

        {/* Diagonal colorida — sem position, fica atrás naturalmente */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg}00 100%)`,
            clipPath: "polygon(0 0, 52% 0, 32% 100%, 0 100%)",
            
          }}
        />

       

        {/* ✅ Wrapper com relative z-10 — todo o conteúdo na frente da diagonal */}
        <div className="relative z-10">
          <CardHeader className="pt-5">
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <CardContent>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ background: colors.badge, color: colors.text }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: colors.bar }}
              />
              <span className="font-semibold">{subnucleosCount}</span>
              <span>{subnucleosCount === 1 ? "Coordenadoria" : "Coordenadorias"}</span>
            </span>
          </CardContent>
        </div>

      </Card>
    </Link>
  );
}