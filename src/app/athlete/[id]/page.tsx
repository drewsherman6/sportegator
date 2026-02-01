import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface AthleteProfilePageProps {
  params: {
    id: string
  }
}

export default async function AthleteProfilePage({ params }: AthleteProfilePageProps) {
  const supabase = createClientComponentClient()

  const { data: athlete, error } = await supabase
    .from('athlete_profiles')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !athlete) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/search" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Search
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-2">
                {athlete.name}
                {athlete.is_verified && <span className="text-2xl text-blue-600">✓</span>}
              </h1>
              {athlete.is_verified && (
                <p className="text-green-600 font-medium text-sm mt-1">Verified Profile</p>
              )}
            </div>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <p className="text-gray-600 text-sm font-medium">Age</p>
              <p className="text-2xl font-bold">{athlete.age}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Location</p>
              <p className="text-lg font-semibold">{athlete.city}, {athlete.country}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Sport</p>
              <p className="text-lg font-semibold">{athlete.sport}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Level</p>
              <p className="text-lg font-semibold">{athlete.level.replace(/_/g, ' ')}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b">
            <div>
              <h2 className="text-xl font-bold mb-4">Athlete Details</h2>
              <div className="space-y-3">
                {athlete.position && (
                  <div>
                    <p className="text-gray-600 text-sm">Position</p>
                    <p className="font-semibold">{athlete.position}</p>
                  </div>
                )}
                {athlete.height && (
                  <div>
                    <p className="text-gray-600 text-sm">Height</p>
                    <p className="font-semibold">{athlete.height}</p>
                  </div>
                )}
                {athlete.weight && (
                  <div>
                    <p className="text-gray-600 text-sm">Weight</p>
                    <p className="font-semibold">{athlete.weight} lbs</p>
                  </div>
                )}
                {athlete.graduation_year && (
                  <div>
                    <p className="text-gray-600 text-sm">Graduation Year</p>
                    <p className="font-semibold">{athlete.graduation_year}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Contact</h2>
              <div className="space-y-3">
                {athlete.contact_email_visible ? (
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-semibold text-blue-600 break-all">{athlete.user_id}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Email not shared</p>
                )}
                {athlete.contact_phone_visible && athlete.phone ? (
                  <div>
                    <p className="text-gray-600 text-sm">Phone</p>
                    <p className="font-semibold">{athlete.phone}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Phone not shared</p>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          {athlete.bio && (
            <div className="mb-8 pb-8 border-b">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{athlete.bio}</p>
            </div>
          )}

          {/* Highlights */}
          {athlete.highlights_url && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Highlights</h2>
              <a
                href={athlete.highlights_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block font-medium transition"
              >
                Watch Highlights →
              </a>
            </div>
          )}

          {/* Profile Created */}
          <div className="text-gray-500 text-sm">
            Profile created on {new Date(athlete.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}
