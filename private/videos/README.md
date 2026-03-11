# 📹 Pasta de Vídeos

## Como adicionar seus vídeos

1. Coloque seus arquivos `.mp4` nesta pasta
2. Nomeie os arquivos exatamente como os IDs em `lib/data.ts`

## Exemplo de estrutura:

```
private/videos/
├── video-1.mp4    # Corresponde ao ID "video-1" em lib/data.ts
├── video-2.mp4    # Corresponde ao ID "video-2" em lib/data.ts
├── video-3.mp4    # E assim por diante...
└── ...
```

## Formatos suportados:

- ✅ MP4 (recomendado)
- ✅ WebM
- ✅ MOV (será convertido para MP4 pelo navegador)

## Tamanho recomendado:

- Máximo 500MB por vídeo para melhor performance
- Use compressão H.264 para MP4
- Resolução: 720p ou 1080p

## Vídeos de teste:

Se você não tem vídeos ainda, pode usar vídeos de teste:

1. Baixe vídeos Creative Commons de: https://pixabay.com/videos/
2. Ou use: https://sample-videos.com/
3. Renomeie para corresponder aos IDs (video-1.mp4, video-2.mp4, etc)

## Importante:

⚠️ Estes vídeos NÃO são versionados no Git por questões de tamanho
⚠️ Você precisará fazer upload manual ao fazer deploy

## Para produção:

Considere usar serviços de streaming:
- Bunny Stream
- Vimeo PRO  
- Cloudflare Stream

Veja mais em: `../SISTEMA-VIDEO.md`
