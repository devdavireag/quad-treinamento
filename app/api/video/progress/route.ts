import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { videoId, tempoAssistido, timestamp } = body

    // AQUI VOCÊ PODE SALVAR O PROGRESSO NO BANCO DE DADOS
    // Por exemplo, usando Prisma:
    // await prisma.videoProgress.upsert({
    //   where: {
    //     userId_videoId: {
    //       userId: session.user.id,
    //       videoId
    //     }
    //   },
    //   update: {
    //     tempoAssistido,
    //     lastWatched: new Date(timestamp)
    //   },
    //   create: {
    //     userId: session.user.id,
    //     videoId,
    //     tempoAssistido,
    //     lastWatched: new Date(timestamp)
    //   }
    // })

    // Por enquanto, apenas loga no console
    console.log(`[PROGRESSO] Vídeo: ${videoId} | Tempo: ${tempoAssistido}s | Timestamp: ${timestamp}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao salvar progresso:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar progresso' },
      { status: 500 }
    )
  }
}
