'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface UserProfile {
  id: string
  email: string
  role: 'athlete' | 'scout' | 'admin'
}

interface AthleteProfile {
  id: string
  name: string
  sport: string
  city: string
  is_verified: boolean
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [athleteProfile, setAthleteProfile] = useState<AthleteProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        router.push('/login')
        return
      }

      // Get user record with role
      const { data: userData } = await supabase
        .from('users')
        .select('id, email, role')
        .eq('id', authUser.id)
        .single()

      if (userData) {
        setUser(userData as UserProfile)

        // If athlete, get their profile
        if (userData.role === 'athlete') {
          const { data: profileData } = await supabase
            .from('athlete_profiles')
            .select('id, name, sport, city, is_verified')
            .eq('user_id', authUser.id)
            .single()

          if (profileData) {
            setAthleteProfile(profileData)
          }
        }
      }

      setLoading(false)
    }

    getUser()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Your Account</h2>
          <div className="space-y-3">
            <p>
              <span className="text-gray-600">Email:</span> <span className="font-medium">{user.email}</span>
            </p>
            <p>
              <span className="text-gray-600">Role:</span>{' '}
              <span className="font-medium capitalize">{user.role.replace('_', ' ')}</span>
            </p>
          </div>
        </div>

        {/* Athlete-Specific Section */}
        {user.role === 'athlete' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {athleteProfile ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Your Profile</h2>
                <div className="space-y-3 mb-6">
                  <p>
                    <span className="text-gray-600">Name:</span>{' '}
                    <span className="font-medium">{athleteProfile.name}</span>
                  </p>
                  <p>
                    <span className="text-gray-600">Sport:</span>{' '}
                    <span className="font-medium">{athleteProfile.sport}</span>
                  </p>
                  <p>
                    <span className="text-gray-600">City:</span>{' '}
                    <span className="font-medium">{athleteProfile.city}</span>
                  </p>
                  <p>
                    <span className="text-gray-600">Status:</span>{' '}
                    <span className={`font-medium ${athleteProfile.is_verified ? 'text-green-600' : 'text-yellow-600'}`}>
                      {athleteProfile.is_verified ? '✓ Verified' : 'Pending Verification'}
                    </span>
                  </p>
                </div>
                <Link
                  href={`/athlete/${athleteProfile.id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  View Public Profile
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Create Your Profile</h2>
                <p className="text-gray-600 mb-6">
                  You haven't created an athlete profile yet. Get started to be discovered by coaches and scouts.
                </p>
                <Link
                  href="/dashboard/profile/new"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Create Profile
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Scout/Coach Section */}
        {user.role === 'scout' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Start Recruiting</h2>
            <p className="text-gray-600 mb-6">
              Search for talented athletes in your area by sport, age, position, and level.
            </p>
            <Link
              href="/search"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Search Athletes
            </Link>
          </div>
        )}

        {/* Admin Section */}
        {user.role === 'admin' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Admin Tools</h2>
            <p className="text-gray-600 mb-6">Access the admin dashboard to verify athlete profiles.</p>
            <Link
              href="/admin/dashboard"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Go to Admin Dashboard
            </Link>
          </div>
        )}

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/search"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-center"
            >
              <p className="font-medium">Search Athletes</p>
              <p className="text-sm text-gray-500">Find prospects</p>
            </Link>
            {user.role === 'athlete' && (
              <Link
                href="/dashboard/profile/new"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-center"
              >
                <p className="font-medium">Update Profile</p>
                <p className="text-sm text-gray-500">Edit your info</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
