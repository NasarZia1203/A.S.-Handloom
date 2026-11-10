import { NextResponse } from 'next/server'
import { getSiteSettings, updateSiteSettings } from '@/lib/data/store-manager'

export async function GET() {
  try {
    const settings = getSiteSettings()
    return NextResponse.json(settings)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to get settings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const updated = updateSiteSettings(body)
    return NextResponse.json(updated)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update settings' }, { status: 500 })
  }
}
