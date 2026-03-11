import { notFound } from "next/navigation"
import { nucleosData } from "@/lib/data"
import { VideoPlayerBunny } from "@/components/VideoPlayerBunny"
import { Breadcrumb } from "@/components/Breadcrumb"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: Promise<{
    videoId: string
  }>
  searchParams: Promise<{
    nucleoId?: string
    subnucleoId?: string
  }>
}

export default async function VideoBunnyPage({ params, searchParams }: PageProps) {
  const { videoId } = await params
  const { nucleoId, subnucleoId } = await searchParams

  if (!nucleoId || !subnucleoId) {
    notFound()
  }

  const nucleo = nucleosData.find((n) => n.id === nucleoId)
  if (!nucleo) {
    notFound()
  }

  const subnucleo = nucleo.subnucleos.find((s) => s.id === subnucleoId)
  if (!subnucleo) {
    notFound()
  }

  const video = subnucleo.videos.find((v) => v.id === videoId)
  if (!video) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: nucleo.name, href: `/nucleo/${nucleo.id}` },
          { label: subnucleo.name, href: `/nucleo/${nucleo.id}/${subnucleo.id}` },
          { label: video.title }
        ]} 
      />

      <div className="mb-6">
        <Link 
          href={`/nucleo/${nucleoId}/${subnucleoId}`}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para lista de vídeos
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {video.title}
            </h1>
            <p className="text-gray-600">
              Duração: {video.duration}
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
            <span className="text-2xl">🚀</span>
            <div className="text-sm">
              <p className="font-semibold">Bunny Stream</p>
              <p className="text-xs">Proteção Profissional</p>
            </div>
          </div>
        </div>
      </div>

      {/* Player de vídeo com Bunny Stream */}
      <div className="max-w-5xl mx-auto">
        <VideoPlayerBunny
          videoId={video.id}
          title={video.title}
          nucleoId={nucleoId}
          subnucleoId={subnucleoId}
          userEmail="usuario@exemplo.com" // Substitua pelo email do usuário autenticado
        />
      </div>

      {/* Informações adicionais */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            Proteção Profissional Ativa
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Plataforma</p>
              <p className="font-semibold text-gray-900">Bunny Stream CDN</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Proteção</p>
              <p className="font-semibold text-gray-900">Token + DRM</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Duração</p>
              <p className="font-semibold text-gray-900">{video.duration}</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Qualidade</p>
              <p className="font-semibold text-gray-900">Adaptativa (HD)</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              Recursos de Segurança:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                CDN global ultra-rápido
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Tokens temporários
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Proteção contra download
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Watermark personalizado
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Streaming adaptativo
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Monitoramento em tempo real
              </li>
            </ul>
          </div>
        </div>

        {/* Próximos vídeos */}
        {subnucleo.videos.length > 1 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Outros vídeos desta coordenadoria
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subnucleo.videos
                .filter(v => v.id !== videoId)
                .slice(0, 4)
                .map((v) => (
                  <Link
                    key={v.id}
                    href={`/video-bunny/${v.id}?nucleoId=${nucleoId}&subnucleoId=${subnucleoId}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">{v.title}</h4>
                    <p className="text-sm text-gray-600">{v.duration}</p>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
