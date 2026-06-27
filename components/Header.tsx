import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="border-b bg-background shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          
          {/* SUA LOGO AQUI */}
          <Image
            src="/image/logoq.png"
            alt="Logo Quad Concursos"
            width={50}
            height={50}
            priority
          />
          
          <div>
            <h1 className="text-2xl font-bold text-White-900">
              Treinamento Quad Concursos
            </h1>
            <p className="text-sm text-White-600">
              Portal de Capacitação Interna
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
