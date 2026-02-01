'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AthleteCard from '@/components/AthleteCard'
import { SPORTS_BY_LEVEL, LEVELS } from '@/lib/constants'

interface AthleteProfile {
  id: string
  name: string
  age: number
  city: string
  country: string
  sport: string
  position: string | null
  level: 'high_school' | 'college' | 'academy' | 'semi_pro'
  is_verified: boolean
}

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [athletes, setAthletes] = useState<AthleteProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Filter state
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    sport: searchParams.get('sport') || '',
    level: searchParams.get('level') || '',
    ageMin: searchParams.get('ageMin') || '',
    ageMax: searchParams.get('ageMax') || '',
    position: searchParams.get('position') || '',
    verified: searchParams.get('verified') || 'false',
    sortBy: searchParams.get('sortBy') || 'newest',
  })

  const sportOptions = SPORTS_BY_LEVEL[filters.level as keyof typeof SPORTS_BY_LEVEL] || []

  const fetchAthletes = async (pageNum: number = 1) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (filters.city) params.append('city', filters.city)
      if (filters.sport) params.append('sport', filters.sport)
      if (filters.level) params.append('level', filters.level)
      if (filters.ageMin) params.append('ageMin', filters.ageMin)
      if (filters.ageMax) params.append('ageMax', filters.ageMax)
      if (filters.position) params.append('position', filters.position)
      if (filters.verified === 'true') params.append('verified', 'true')
      params.append('sortBy', filters.sortBy)
      params.append('page', pageNum.toString())

      const response = await fetch(`/api/athletes?${params.toString()}`)
      const result = await response.json()

      if (!response.ok) throw new Error(result.error || 'Failed to fetch athletes')

      setAthletes(result.data)
      setTotalPages(result.totalPages)
      setPage(pageNum)

      // Update URL with filters
      router.push(`/search?${params.toString()}`, { scroll: false })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAthletes(1)
  }, [filters])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'true' : 'false') : value,
    }))
  }

  const handleReset = () => {
    setFilters({
      city: '',
      sport: '',
      level: '',
      ageMin: '',
      ageMax: '',
      position: '',
      verified: 'false',
      sortBy: 'newest',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Search Athletes</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-lg font-bold mb-6">Filters</h2>

              {/* City */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  placeholder="Search city..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Level</label>
                <select
                  name="level"
                  value={filters.level}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">All Levels</option>
                  {LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sport */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Sport</label>
                <select
                  name="sport"
                  value={filters.sport}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  disabled={!filters.level}
                >
                  <option value="">All Sports</option>
                  {sportOptions.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
                {!filters.level && <p className="text-xs text-gray-500 mt-1">Select a level first</p>}
              </div>

              {/* Age Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Age Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="ageMin"
                    value={filters.ageMin}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    min="10"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <input
                    type="number"
                    name="ageMax"
                    value={filters.ageMax}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    min="10"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Verified Only */}
              <div className="mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="verified"
                    checked={filters.verified === 'true'}
                    onChange={handleFilterChange}
                    className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm">Verified Only</span>
                </label>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="age">Age (Low to High)</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg transition text-sm"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">{error}</div>
            )}

            {loading && (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading athletes...</p>
              </div>
            )}

            {!loading && athletes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No athletes found. Try adjusting your filters.</p>
              </div>
            )}

            {!loading && athletes.length > 0 && (
              <>
                <p className="text-gray-600 mb-4">
                  Found <span className="font-bold">{athletes.length}</span> athletes
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {athletes.map((athlete) => (
                    <AthleteCard key={athlete.id} {...athlete} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => fetchAthletes(page - 1)}
                      disabled={page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <span className="text-gray-600">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => fetchAthletes(page + 1)}
                      disabled={page === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
