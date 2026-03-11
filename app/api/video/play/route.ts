import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const file = searchParams.get('file')

    if (!token || !file) {
      return NextResponse.json(
        { error: 'Token ou arquivo não fornecido' },
        { status: 400 }
      )
    }

    // Valida o token
    let decoded
    try {
      decoded = JSON.parse(Buffer.from(token, 'base64').toString())
      
      // Verifica se o token expirou
      if (decoded.expires < Date.now()) {
        return NextResponse.json(
          { error: 'Token expirado. Recarregue a página.' },
          { status: 401 }
        )
      }
    } catch {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      )
    }

    // Caminho do vídeo
    // IMPORTANTE: Os vídeos devem estar na pasta 'private/videos' 
    // (fora da pasta public para maior segurança)
    const videoPath = path.join(process.cwd(), 'private', 'videos', file)
    
    // Verifica se o arquivo existe
    if (!fs.existsSync(videoPath)) {
      return NextResponse.json(
        { error: 'Vídeo não encontrado' },
        { status: 404 }
      )
    }

    const stat = fs.statSync(videoPath)
    const fileSize = stat.size
    const range = request.headers.get('range')

    // Suporte a streaming com range requests (permite o seek no vídeo)
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-')
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
      const chunksize = (end - start) + 1
      const file = fs.createReadStream(videoPath, { start, end })
      
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize.toString(),
        'Content-Type': 'video/mp4',
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN', // Previne embedding em outros sites
      }

      return new NextResponse(file as any, {
        status: 206, // Partial Content
        headers
      })
    } else {
      // Retorna o vídeo completo
      const file = fs.createReadStream(videoPath)
      
      return new NextResponse(file as any, {
        headers: {
          'Content-Length': fileSize.toString(),
          'Content-Type': 'video/mp4',
          'Cache-Control': 'no-store, no-cache, must-revalidate, private',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'SAMEORIGIN',
        }
      })
    }
  } catch (error) {
    console.error('Erro ao servir vídeo:', error)
    return NextResponse.json(
      { error: 'Erro ao processar vídeo' },
      { status: 500 }
    )
  }
}
