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
            <h1 className="text-3xl font-bold text-white-900 mb-2">
              {video.title}
            </h1>
            <p className="text-gray-300">
              Duração: {video.duration}
            </p>
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

     
    </div>
  )
}
