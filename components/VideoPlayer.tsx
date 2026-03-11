'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle, Loader2 } from 'lucide-react'

interface VideoPlayerProps {
  videoId: string
  title: string
  subnucleoId: string
  nucleoId: string
  userEmail?: string
}

export function VideoPlayer({ 
  videoId, 
  title, 
  subnucleoId, 
  nucleoId,
  userEmail = 'usuario@exemplo.com' // Por enquanto hardcoded, depois você integra com seu sistema de auth
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tempoAssistido, setTempoAssistido] = useState(0)
  const [saiuDaPagina, setSaiuDaPagina] = useState(0)
  const [avisoVisivel, setAvisoVisivel] = useState(false)
  const [videoPausado, setVideoPausado] = useState(false)

  // Busca URL autenticada do vídeo
  useEffect(() => {
    async function getVideoUrl() {
      try {
        const response = await fetch(`/api/video/stream/${videoId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nucleoId,
            subnucleoId,
            userEmail
          })
        })

        if (!response.ok) {
          throw new Error('Erro ao carregar vídeo')
        }

        const data = await response.json()
        setVideoUrl(data.url)
        setLoading(false)
      } catch (err) {
        setError('Não foi possível carregar o vídeo')
        setLoading(false)
      }
    }

    getVideoUrl()
  }, [videoId, nucleoId, subnucleoId, userEmail])

  // Detecta quando o aluno sai da aba
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Aluno saiu da aba
        setVideoPausado(true)
        setSaiuDaPagina(prev => prev + 1)
        setAvisoVisivel(true)
        
        // Pausa o vídeo
        if (videoRef.current) {
          videoRef.current.pause()
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
        }).catch(() => {}) // Ignora erros de log
      } else {
        // Aluno voltou para a aba
        setVideoPausado(false)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [videoId])

  // Contador de tempo assistido
  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.hidden && !videoPausado && videoRef.current && !videoRef.current.paused) {
        setTempoAssistido(prev => {
          const newTime = prev + 1
          
          // Salva progresso a cada 30 segundos
          if (newTime % 30 === 0) {
            fetch('/api/video/progress', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                videoId,
                tempoAssistido: newTime,
                timestamp: new Date().toISOString()
              })
            }).catch(() => {}) // Ignora erros de log
          }
          
          return newTime
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [videoPausado, videoId])

  // Bloqueia clique direito
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    return false
  }

  // Bloqueia teclas de screenshot
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Bloqueia PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault()
        alert('Screenshots não são permitidos durante a visualização')
      }
      
      // Bloqueia Ctrl+S, Ctrl+Shift+S (salvar)
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

  if (error || !videoUrl) {
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

      {/* Barra de progresso */}
      <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-green-600 h-full transition-all duration-300"
          style={{ 
            width: videoRef.current 
              ? `${(videoRef.current.currentTime / videoRef.current.duration) * 100}%` 
              : '0%' 
          }}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>
          Tempo assistido: {Math.floor(tempoAssistido / 60)}:{(tempoAssistido % 60).toString().padStart(2, '0')}
        </span>
        <span>
          Reproduções: 1
        </span>
      </div>

      {/* Player de vídeo */}
      <div 
        className="relative w-full aspect-video bg-black rounded-lg overflow-hidden select-none"
        onContextMenu={handleContextMenu}
      >
        <video
          ref={videoRef}
          className="w-full h-full"
          controls
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          disableRemotePlayback
          onContextMenu={handleContextMenu}
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          Seu navegador não suporta vídeo HTML5.
        </video>

        {/* Watermark com email do usuário */}
        <div className="absolute bottom-16 right-4 text-white/40 text-xs font-mono pointer-events-none select-none bg-black/30 px-2 py-1 rounded">
          {userEmail}
        </div>

        {/* Overlay quando pausado por saída */}
        {videoPausado && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
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

      {/* Informações de monitoramento */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
        <p className="font-semibold text-yellow-800 mb-2">
          ⓘ Sistema de acompanhamento ativo
        </p>
        <ul className="text-yellow-700 space-y-1">
          <li>• Seu progresso está sendo registrado automaticamente</li>
          <li>• Saídas da página são monitoradas</li>
          <li>• O download deste vídeo não é permitido</li>
        </ul>
      </div>
    </div>
  )
}
