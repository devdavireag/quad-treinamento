import { notFound } from "next/navigation"
import { nucleosData } from "@/lib/data"
import { VideoPlayer } from "@/components/VideoPlayer"
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

export default async function VideoPage({ params, searchParams }: PageProps) {
  const { videoId } = await params
  const { nucleoId, subnucleoId } = await searchParams

  if (!nucleoId || !subnucleoId) {
    notFound()
  }

  // Encontra o núcleo
  const nucleo = nucleosData.find((n) => n.id === nucleoId)
  if (!nucleo) {
    notFound()
  }

  // Encontra o subnúcleo
  const subnucleo = nucleo.subnucleos.find((s) => s.id === subnucleoId)
  if (!subnucleo) {
    notFound()
  }

  // Encontra o vídeo
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
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {video.title}
        </h1>
        <p className="text-gray-600">
          Duração: {video.duration}
        </p>
      </div>

      {/* Player de vídeo protegido */}
      <div className="max-w-5xl mx-auto">
        <VideoPlayer
          videoId={video.id}
          title={video.title}
          nucleoId={nucleoId}
          subnucleoId={subnucleoId}
          userEmail="usuario@exemplo.com" // Substitua pelo email do usuário autenticado
        />
      </div>

      {/* Informações adicionais */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Informações do Vídeo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Núcleo</p>
              <p className="font-semibold text-gray-900">{nucleo.name}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Coordenadoria</p>
              <p className="font-semibold text-gray-900">{subnucleo.name}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Duração</p>
              <p className="font-semibold text-gray-900">{video.duration}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Formato</p>
              <p className="font-semibold text-gray-900">Vídeo MP4</p>
            </div>
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
                    href={`/video/${v.id}?nucleoId=${nucleoId}&subnucleoId=${subnucleoId}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
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
