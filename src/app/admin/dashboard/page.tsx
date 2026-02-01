'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

interface AthleteForVerification {
  id: string
  name: string
  age: number
  city: string
  sport: string
  level: string
  is_verified: boolean
  created_at: string
}

export default function AdminDashboard() {
  const [athletes, setAthletes] = useState<AthleteForVerification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const checkAdminAndFetchAthletes = async () => {
      try {
        // Check if user is admin
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push('/login')
          return
        }

        const { data: userRecord } = await supabase.from('users').select('role').eq('id', user.id).single()

        if (userRecord?.role !== 'admin') {
          setError('You do not have permission to access this page')
          setLoading(false)
          return
        }

        setIsAdmin(true)

        // Fetch unverified athletes
        const { data, error: fetchError } = await supabase
          .from('athlete_profiles')
          .select('id, name, age, city, sport, level, is_verified, created_at')
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError

        setAthletes(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    checkAdminAndFetchAthletes()
  }, [supabase, router])

  const toggleVerification = async (athleteId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('athlete_profiles')
        .update({ is_verified: !currentStatus })
        .eq('id', athleteId)

      if (error) throw error

      // Update local state
      setAthletes(
        athletes.map((athlete) =>
          athlete.id === athleteId ? { ...athlete, is_verified: !currentStatus } : athlete
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update verification')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">Access Denied</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard - Athlete Verification</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">{error}</div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Age</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">City</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sport</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Level</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Verified</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {athletes.map((athlete) => (
                  <tr key={athlete.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{athlete.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{athlete.age}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{athlete.city}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{athlete.sport}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{athlete.level.replace(/_/g, ' ')}</td>
                    <td className="px-6 py-4 text-sm">
                      {athlete.is_verified ? (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                          ✓ Verified
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => toggleVerification(athlete.id, athlete.is_verified)}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                          athlete.is_verified
                            ? 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {athlete.is_verified ? 'Unverify' : 'Verify'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {athletes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No athletes found</p>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm">Total Athletes</p>
            <p className="text-3xl font-bold">{athletes.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm">Verified</p>
            <p className="text-3xl font-bold text-green-600">{athletes.filter((a) => a.is_verified).length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{athletes.filter((a) => !a.is_verified).length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
