import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { videoId, action, timestamp } = body

    // AQUI VOCÊ PODE SALVAR NO BANCO DE DADOS
    // Por exemplo, usando Prisma:
    // await prisma.videoActivity.create({
    //   data: {
    //     videoId,
    //     userId: session.user.id,
    //     action,
    //     timestamp: new Date(timestamp)
    //   }
    // })

    // Por enquanto, apenas loga no console
    console.log(`[ATIVIDADE] Vídeo: ${videoId} | Ação: ${action} | Timestamp: ${timestamp}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao registrar atividade:', error)
    return NextResponse.json(
      { error: 'Erro ao registrar atividade' },
      { status: 500 }
    )
  }
}
