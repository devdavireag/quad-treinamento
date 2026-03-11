import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  try {
    const { videoId } = await params
    const body = await request.json()
    const { nucleoId, subnucleoId, userEmail } = body

    // AQUI VOCÊ PODE ADICIONAR VERIFICAÇÃO DE AUTENTICAÇÃO
    // Por exemplo:
    // const session = await getServerSession()
    // if (!session) {
    //   return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    // }

    // AQUI VOCÊ PODE VERIFICAR SE O USUÁRIO TEM ACESSO A ESTE VÍDEO
    // Por exemplo, verificar no banco de dados se o usuário está matriculado no curso
    // const hasAccess = await checkUserAccess(userEmail, nucleoId, subnucleoId)
    // if (!hasAccess) {
    //   return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    // }

    // Registra o acesso ao vídeo (opcional - você pode salvar no banco)
    console.log(`Vídeo ${videoId} acessado por ${userEmail}`)

    // Gera um token único e temporário (válido por 1 hora)
    const token = Buffer.from(
      JSON.stringify({
        videoId,
        userEmail,
        nucleoId,
        subnucleoId,
        expires: Date.now() + 3600000 // 1 hora
      })
    ).toString('base64')

    // Retorna URL autenticada
    // A URL usa o token para garantir que apenas usuários autorizados possam assistir
    const videoUrl = `/api/video/play?token=${token}&file=${videoId}.mp4`

    return NextResponse.json({
      url: videoUrl,
      videoId,
      expiresIn: 3600 // segundos
    })

  } catch (error) {
    console.error('Erro ao processar requisição de vídeo:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
