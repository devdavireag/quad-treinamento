'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle, Loader2 } from 'lucide-react'

interface VideoPlayerBunnyProps {
  videoId: string
  title: string
  subnucleoId: string
  nucleoId: string
  userEmail?: string
}

export function VideoPlayerBunny({ 
  videoId, 
  title, 
  subnucleoId, 
  nucleoId,
  userEmail = 'usuario@exemplo.com'
}: VideoPlayerBunnyProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [embedUrl, setEmbedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tempoAssistido, setTempoAssistido] = useState(0)
  const [saiuDaPagina, setSaiuDaPagina] = useState(0)
  const [avisoVisivel, setAvisoVisivel] = useState(false)
  const [videoPausado, setVideoPausado] = useState(false)

  // Busca URL do Bunny Stream
  useEffect(() => {
    async function getBunnyUrl() {
      try {
        const response = await fetch(`/api/bunny/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            videoId,
            nucleoId,
            subnucleoId,
            userEmail
          })
        })

        if (!response.ok) {
          throw new Error('Erro ao carregar vídeo')
        }

        const data = await response.json()
        setEmbedUrl(data.embedUrl)
        setLoading(false)
      } catch (err) {
        setError('Não foi possível carregar o vídeo')
        setLoading(false)
      }
    }

    getBunnyUrl()
  }, [videoId, nucleoId, subnucleoId, userEmail])

  // Detecta quando o aluno sai da aba
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setVideoPausado(true)
        setSaiuDaPagina(prev => prev + 1)
        setAvisoVisivel(true)
        
        // Tenta pausar o vídeo do Bunny via postMessage
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage(
            JSON.stringify({ method: 'pause' }), 
            '*'
          )
        }
        
        // Registra no backend
        fetch('/api/video/activity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            videoId,
            action: 'saiu_da_pagina',
            timestamp: new Date().toISOString()
          })
        }).catch(() => {})
      } else {
        setVideoPausado(false)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [videoId])

  // Escuta eventos do player do Bunny
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)
        
        // Bunny Stream envia eventos de tempo
        if (data.event === 'timeupdate' && data.currentTime) {
          setTempoAssistido(Math.floor(data.currentTime))
          
          // Salva progresso a cada 30 segundos
          if (Math.floor(data.currentTime) % 30 === 0) {
            fetch('/api/video/progress', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                videoId,
                tempoAssistido: Math.floor(data.currentTime),
                timestamp: new Date().toISOString()
              })
            }).catch(() => {})
          }
        }
      } catch (e) {
        // Ignora mensagens que não são JSON
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [videoId])

  // Bloqueia clique direito
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    return false
  }

  // Bloqueia teclas de screenshot
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault()
        alert('Screenshots não são permitidos durante a visualização')
      }
      
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (loading) {
    return (
      <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-sm">Carregando vídeo...</p>
        </div>
      </div>
    )
  }

  if (error || !embedUrl) {
    return (
      <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center text-white">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <p className="text-lg font-semibold mb-2">Erro ao carregar vídeo</p>
          <p className="text-sm text-gray-400">{error || 'Tente novamente mais tarde'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Aviso quando sai da página */}
      {avisoVisivel && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-4">Atenção!</h2>
            <p className="text-gray-700 mb-4">
              Você saiu da página da aula. Para continuar assistindo, 
              mantenha-se nesta aba.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Saídas registradas: <span className="font-bold text-red-600">{saiuDaPagina}</span>
            </p>
            <button
              onClick={() => setAvisoVisivel(false)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Voltar para a aula
            </button>
          </div>
        </div>
      )}

      {/* Informações de tempo */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>
          Tempo assistido: {Math.floor(tempoAssistido / 60)}:{(tempoAssistido % 60).toString().padStart(2, '0')}
        </span>
        <span className="text-green-600 font-semibold">
          🔒 Protegido por Bunny Stream
        </span>
      </div>

      {/* Player do Bunny Stream */}
      <div 
        className="relative w-full aspect-video bg-black rounded-lg overflow-hidden select-none"
        onContextMenu={handleContextMenu}
      >
        <iframe
          ref={iframeRef}
          src={embedUrl}
          className="w-full h-full border-0"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-presentation"
          referrerPolicy="no-referrer"
        />

        {/* Watermark com email do usuário */}
        <div className="absolute top-4 right-4 bg-black/50 text-white/60 px-3 py-1 rounded text-xs font-mono pointer-events-none select-none">
          {userEmail}
        </div>

        {/* Overlay quando pausado por saída */}
        {videoPausado && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center pointer-events-none">
            <div className="text-white text-center">
              <div className="text-4xl mb-4">⏸️</div>
              <p className="text-xl">Vídeo pausado</p>
              <p className="text-sm mt-2">Volte para a aba para continuar</p>
            </div>
          </div>
        )}

        {/* Camada de proteção invisível */}
        <div className="absolute inset-0 pointer-events-none" style={{ userSelect: 'none' }} />
      </div>
      
    </div>
  )
}
