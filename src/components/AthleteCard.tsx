import Link from 'next/link'

interface AthleteCardProps {
  id: string
  name: string
  age: number
  city: string
  sport: string
  position?: string
  level: string
  is_verified: boolean
}

export default function AthleteCard({
  id,
  name,
  age,
  city,
  sport,
  position,
  level,
  is_verified,
}: AthleteCardProps) {
  return (
    <Link href={`/athlete/${id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all p-6 cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 flex-1">{name}</h3>
          {is_verified && <span className="text-blue-600 text-xl">✓</span>}
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-gray-700">
            <span className="font-semibold">Age:</span> {age}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Location:</span> {city}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Sport:</span> {sport}
          </p>
          {position && (
            <p className="text-gray-700">
              <span className="font-semibold">Position:</span> {position}
            </p>
          )}
          <p className="text-gray-700">
            <span className="font-semibold">Level:</span> {level.replace(/_/g, ' ')}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition">
            View Profile
          </button>
        </div>
      </div>
    </Link>
  )
}
