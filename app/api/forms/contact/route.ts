import { NextRequest, NextResponse } from 'next/server'
import type { ContactFormData, FormResponse } from '@/lib/types'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePayload(body: unknown): body is ContactFormData {
  if (typeof body !== 'object' || body === null) return false
  const b = body as Record<string, unknown>
  return (
    typeof b.name === 'string' && b.name.trim().length > 0 &&
    typeof b.email === 'string' && isValidEmail(b.email) &&
    typeof b.message === 'string' && b.message.trim().length > 0
  )
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<FormResponse>> {
  try {
    const body: unknown = await request.json()

    if (!validatePayload(body)) {
      return NextResponse.json(
        { success: false, message: 'Ongeldige invoer. Controleer alle verplichte velden.' },
        { status: 400 }
      )
    }

    // TODO: integrate with email provider (e.g. Resend) or Sanity
    // await sendEmail({ to: siteConfig.contact.email, ...body })

    return NextResponse.json(
      { success: true, message: 'Uw bericht is verzonden. We nemen zo snel mogelijk contact op.' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { success: false, message: 'Er is een fout opgetreden. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}
