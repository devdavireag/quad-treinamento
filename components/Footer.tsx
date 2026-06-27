export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white-600">
            © {currentYear} Quad Concursos. Todos os direitos reservados.
          </p>
          <p className="text-sm text-white-600">
            Portal de Treinamento Interno
          </p>
        </div>
      </div>
    </footer>
  );
}
