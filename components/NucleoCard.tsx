import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Folder } from "lucide-react";

interface NucleoCardProps {
  id: string;
  name: string;
  description: string;
  subnucleosCount: number;
}

export function NucleoCard({ id, name, description, subnucleosCount }: NucleoCardProps) {
  return (
    <Link href={`/nucleo/${id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary cursor-pointer h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-primary">{subnucleosCount}</span>
            <span>{subnucleosCount === 1 ? "Coordenadoria" : "Coordenadorias"}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
