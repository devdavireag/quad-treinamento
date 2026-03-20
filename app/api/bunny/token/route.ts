import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { videoId, nucleoId, subnucleoId, userEmail } = body
    console.log('videoId recebido:', videoId)
console.log('chave buscada:', `BUNNY_VIDEO_${videoId.toUpperCase().replace(/-/g, '_')}`)
console.log('GUID encontrado:', process.env[`BUNNY_VIDEO_${videoId.toUpperCase().replace(/-/g, '_')}`])

    // CONFIGURAÇÕES DO BUNNY STREAM
    // Você precisa configurar estas variáveis de ambiente
    const BUNNY_LIBRARY_ID = process.env.BUNNY_LIBRARY_ID || 'YOUR_LIBRARY_ID'
    const BUNNY_VIDEO_ID = process.env[`BUNNY_VIDEO_${videoId.toUpperCase().replace(/-/g, '_')}`] || videoId
    const BUNNY_TOKEN_KEY = process.env.BUNNY_TOKEN_KEY || 'YOUR_TOKEN_KEY'
    
    // AQUI VOCÊ PODE ADICIONAR VERIFICAÇÃO DE AUTENTICAÇÃO
    // const session = await getServerSession()
    // if (!session) {
    //   return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    // }

    // AQUI VOCÊ PODE VERIFICAR SE O USUÁRIO TEM ACESSO
    // const hasAccess = await checkUserAccess(userEmail, nucleoId, subnucleoId)
    // if (!hasAccess) {
    //   return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    // }

    // Registra o acesso
    console.log(`Vídeo ${videoId} (Bunny) acessado por ${userEmail}`)

    // Gera token de autenticação do Bunny Stream
    const expires = Math.floor(Date.now() / 1000) + 3600 // Expira em 1 hora
    
    // Cria assinatura para token do Bunny
    // Formato: sha256(security_key + video_id + expires)
    const signature = crypto
      .createHash('sha256')
      .update(`${BUNNY_TOKEN_KEY}${BUNNY_VIDEO_ID}${expires}`)
      .digest('hex')

    // Monta URL do Bunny Stream com token
    const embedUrl = `https://iframe.mediadelivery.net/embed/${BUNNY_LIBRARY_ID}/${BUNNY_VIDEO_ID}?` + 
      `token=${signature}&` +
      `expires=${expires}&` +
      `autoplay=false&` +
      `preload=true&` +
      `responsive=true`

    // Salva acesso no banco (opcional)
    // await prisma.videoAccess.create({
    //   data: {
    //     videoId,
    //     userId: session.user.id,
    //     accessedAt: new Date(),
    //     platform: 'bunny'
    //   }
    // })

    return NextResponse.json({
      embedUrl,
      videoId,
      expiresIn: 3600,
      platform: 'bunny-stream'
    })

  } catch (error) {
    console.error('Erro ao gerar token do Bunny:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
