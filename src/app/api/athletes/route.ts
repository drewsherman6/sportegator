import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const city = searchParams.get('city')
  const sport = searchParams.get('sport')
  const levelParam = searchParams.get('level')
  const ageMin = searchParams.get('ageMin')
  const ageMax = searchParams.get('ageMax')
  const position = searchParams.get('position')
  const verified = searchParams.get('verified')
  const sortBy = searchParams.get('sortBy') || 'newest'
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = 20

  try {
    const supabase = createClientComponentClient()

    let query = supabase.from('athlete_profiles').select('*', { count: 'exact' })

    // Apply filters
    if (city) {
      query = query.ilike('city', `%${city}%`)
    }

    if (sport) {
      query = query.eq('sport', sport)
    }

    if (levelParam) {
      query = query.eq('level', levelParam)
    }

    if (ageMin) {
      query = query.gte('age', parseInt(ageMin))
    }

    if (ageMax) {
      query = query.lte('age', parseInt(ageMax))
    }

    if (position) {
      query = query.eq('position', position)
    }

    if (verified === 'true') {
      query = query.eq('is_verified', true)
    }

    // Apply sorting
    if (sortBy === 'age') {
      query = query.order('age', { ascending: true })
    } else {
      query = query.order('created_at', { ascending: false })
    }

    // Apply pagination
    const start = (page - 1) * pageSize
    query = query.range(start, start + pageSize - 1)

    const { data, error, count } = await query

    if (error) throw error

    return NextResponse.json({
      data,
      count,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
