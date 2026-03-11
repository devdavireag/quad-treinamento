#!/bin/bash

echo "🧪 Testando estrutura de rotas do projeto..."
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para verificar se arquivo existe
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        return 0
    else
        echo -e "${RED}✗${NC} $2"
        return 1
    fi
}

# Função para verificar se diretório existe
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        return 0
    else
        echo -e "${RED}✗${NC} $2"
        return 1
    fi
}

echo "📁 Verificando estrutura de arquivos..."
echo ""

# Arquivos de configuração
check_file "package.json" "package.json"
check_file "tsconfig.json" "tsconfig.json"
check_file "tailwind.config.ts" "tailwind.config.ts"
check_file "next.config.ts" "next.config.ts"
check_file "postcss.config.mjs" "postcss.config.mjs"

echo ""
echo "📂 Verificando estrutura de pastas..."
echo ""

# Estrutura de pastas
check_dir "app" "app/"
check_dir "components" "components/"
check_dir "lib" "lib/"
check_dir "components/ui" "components/ui/"

echo ""
echo "📄 Verificando arquivos principais..."
echo ""

# Arquivos principais
check_file "app/layout.tsx" "app/layout.tsx (Layout principal)"
check_file "app/page.tsx" "app/page.tsx (Página inicial)"
check_file "app/globals.css" "app/globals.css"
check_file "app/not-found.tsx" "app/not-found.tsx (Página 404)"

echo ""
echo "🧩 Verificando componentes..."
echo ""

# Componentes
check_file "components/Header.tsx" "Header.tsx"
check_file "components/Footer.tsx" "Footer.tsx"
check_file "components/Breadcrumb.tsx" "Breadcrumb.tsx"
check_file "components/NucleoCard.tsx" "NucleoCard.tsx"
check_file "components/SubnucleoCard.tsx" "SubnucleoCard.tsx"
check_file "components/VideoCard.tsx" "VideoCard.tsx"
check_file "components/ui/card.tsx" "ui/card.tsx (shadcn)"

echo ""
echo "📊 Verificando dados e utilitários..."
echo ""

# Lib
check_file "lib/data.ts" "data.ts (Dados organizacionais)"
check_file "lib/utils.ts" "utils.ts (Utilitários)"

echo ""
echo "🛣️  Verificando rotas dinâmicas..."
echo ""

# Rotas dinâmicas
check_dir "app/nucleo" "app/nucleo/ (Rota base)"
check_dir "app/nucleo/[nucleoId]" "app/nucleo/[nucleoId]/"
check_file "app/nucleo/[nucleoId]/page.tsx" "app/nucleo/[nucleoId]/page.tsx"
check_dir "app/nucleo/[nucleoId]/[subnucleoId]" "app/nucleo/[nucleoId]/[subnucleoId]/"
check_file "app/nucleo/[nucleoId]/[subnucleoId]/page.tsx" "app/nucleo/[nucleoId]/[subnucleoId]/page.tsx"

echo ""
echo "📝 Verificando rotas disponíveis nos dados..."
echo ""

# Extrair rotas dos dados
echo -e "${YELLOW}Núcleos disponíveis:${NC}"
echo "  • NGG - /nucleo/ngg"
echo "  • NGE - /nucleo/nge"
echo "  • NTI - /nucleo/nti"
echo "  • NMKT - /nucleo/nmkt"

echo ""
echo -e "${YELLOW}Exemplos de coordenadorias:${NC}"
echo "  • /nucleo/ngg/ngg-coord-estrategica"
echo "  • /nucleo/ngg/ngg-coord-qualidade"
echo "  • /nucleo/nge/nge-coord-pedagogica"
echo "  • /nucleo/nti/nti-coord-desenvolvimento"

echo ""
echo "✅ Verificação de estrutura concluída!"
echo ""
echo "Para testar o projeto:"
echo "  1. npm install"
echo "  2. npm run dev"
echo "  3. Acesse http://localhost:3000"
echo ""
