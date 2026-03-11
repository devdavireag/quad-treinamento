#!/bin/bash

# Script de Setup - Sistema de Vídeo Protegido
# Este script ajuda você a configurar o projeto rapidamente

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   🎓 Setup - Plataforma de Treinamento QUAD                ║"
echo "║   Sistema de Vídeo Protegido                               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Verifica se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "   Instale em: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js instalado: $(node -v)"
echo ""

# Pergunta qual sistema de vídeo usar
echo "❓ Qual sistema de vídeo você quer usar?"
echo ""
echo "   1) Vídeo Local (grátis, para testes)"
echo "   2) Bunny Stream (profissional, CDN global)"
echo "   3) Híbrido (os dois)"
echo ""
read -p "Escolha (1/2/3): " CHOICE

case $CHOICE in
  1)
    echo ""
    echo "📦 Configurando Vídeo Local..."
    echo ""
    
    # Cria pasta de vídeos se não existir
    mkdir -p private/videos
    
    echo "✅ Pasta private/videos/ criada"
    echo ""
    echo "📝 Próximos passos:"
    echo "   1. Adicione seus vídeos em: private/videos/"
    echo "   2. Nomeie como: video-1.mp4, video-2.mp4, etc"
    echo "   3. Execute: npm install"
    echo "   4. Execute: npm run dev"
    echo ""
    echo "📚 Documentação: SISTEMA-VIDEO.md"
    ;;
    
  2)
    echo ""
    echo "🐰 Configurando Bunny Stream..."
    echo ""
    
    # Copia .env.example para .env se não existir
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "✅ Arquivo .env criado"
    else
        echo "⚠️  Arquivo .env já existe (não sobrescrito)"
    fi
    
    echo ""
    echo "📝 Próximos passos:"
    echo "   1. Crie conta em: https://bunny.net"
    echo "   2. Crie uma Video Library"
    echo "   3. Faça upload dos vídeos"
    echo "   4. Edite o arquivo .env com suas credenciais:"
    echo "      - BUNNY_LIBRARY_ID"
    echo "      - BUNNY_TOKEN_KEY"
    echo "      - BUNNY_VIDEO_* (mapeamento dos vídeos)"
    echo "   5. Execute: npm install"
    echo "   6. Execute: npm run dev"
    echo ""
    echo "📚 Documentação: BUNNY-STREAM-GUIA.md"
    ;;
    
  3)
    echo ""
    echo "🔄 Configurando Sistema Híbrido..."
    echo ""
    
    # Cria pasta de vídeos
    mkdir -p private/videos
    
    # Copia .env.example
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "✅ Arquivo .env criado"
    else
        echo "⚠️  Arquivo .env já existe"
    fi
    
    echo "✅ Pasta private/videos/ criada"
    echo ""
    echo "📝 Próximos passos:"
    echo ""
    echo "   Para vídeos locais:"
    echo "   1. Adicione vídeos em: private/videos/"
    echo "   2. Nomeie como: video-1.mp4, video-2.mp4, etc"
    echo ""
    echo "   Para Bunny Stream:"
    echo "   1. Configure .env com credenciais do Bunny"
    echo "   2. Em lib/data.ts, adicione useBunny: true nos vídeos"
    echo ""
    echo "   Finalmente:"
    echo "   3. Execute: npm install"
    echo "   4. Execute: npm run dev"
    echo ""
    echo "📚 Documentação: LOCAL-VS-BUNNY.md"
    ;;
    
  *)
    echo "❌ Opção inválida!"
    exit 1
    ;;
esac

echo ""
echo "════════════════════════════════════════════════════════════"
echo ""
read -p "📦 Deseja instalar as dependências agora? (s/n): " INSTALL

if [ "$INSTALL" = "s" ] || [ "$INSTALL" = "S" ]; then
    echo ""
    echo "📦 Instalando dependências..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Instalação concluída!"
        echo ""
        echo "🚀 Para iniciar o projeto:"
        echo "   npm run dev"
        echo ""
        echo "📖 Acesse: http://localhost:3000"
    else
        echo ""
        echo "❌ Erro na instalação!"
    fi
else
    echo ""
    echo "📝 Para instalar depois:"
    echo "   npm install"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo "✨ Setup concluído!"
echo "════════════════════════════════════════════════════════════"
echo ""
