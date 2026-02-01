'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SPORTS_BY_LEVEL, LEVELS, POSITIONS } from '@/lib/constants'
type Level = 'high_school' | 'college' | 'academy' | 'semi_pro'
export default function CreateProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: '',
    country: '',
    sport: '',
    position: '',
    level: 'high_school' as Level,
    height: '',
    weight: '',
    graduation_year: '',
    highlights_url: '',
    bio: '',
    contact_email_visible: false,
    contact_phone_visible: false,
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const sportOptions = SPORTS_BY_LEVEL[formData.level]
  const positionOptions = formData.sport
    ? (POSITIONS[formData.sport.toLowerCase().replace(/\s+/g, '_')] || [])
    : []
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    // Validation
    if (!formData.name || !formData.age || !formData.city || !formData.country || !formData.sport || !formData.level) {
      setError('Please fill in all required fields')
      return
    }
    if (isNaN(parseInt(formData.age)) || parseInt(formData.age) < 10 || parseInt(formData.age) > 120) {
      setError('Please enter a valid age between 10 and 120')
      return
    }
    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setError('You must be logged in to create a profile')
        return
      }
      const { error: insertError } = await supabase.from('athlete_profiles').insert([
        {
          user_id: user.id,
          name: formData.name,
          age: parseInt(formData.age),
          city: formData.city,
          country: formData.country,
          sport: formData.sport,
          position: formData.position || null,
          level: formData.level,
          height: formData.height || null,
          weight: formData.weight || null,
          graduation_year: formData.graduation_year ? parseInt(formData.graduation_year) : null,
          highlights_url: formData.highlights_url || null,
          bio: formData.bio || null,
          contact_email_visible: formData.contact_email_visible,
          contact_phone_visible: formData.contact_phone_visible,
        },
      ])
      if (insertError) throw insertError
      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create profile')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Create Your Athlete Profile</h1>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>
          {/* Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="10"
                max="120"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="18"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Graduation Year</label>
              <input
                type="number"
                name="graduation_year"
                value={formData.graduation_year}
                onChange={handleInputChange}
                min="2020"
                max="2035"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2025"
              />
            </div>
          </div>
          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="New York"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="USA"
              />
            </div>
          </div>
          {/* Level */}
          <div>
            <label className="block text-sm font-medium mb-2">Level *</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          {/* Sport */}
          <div>
            <label className="block text-sm font-medium mb-2">Sport *</label>
            <select
              name="sport"
              value={formData.sport}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a sport</option>
              {sportOptions.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>
          {/* Position */}
          {positionOptions.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Position</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a position</option>
                {positionOptions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* Height & Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Height (e.g., 6'0")</label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='6'0"'
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Weight (lbs)</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="180"
              />
            </div>
          </div>
          {/* Highlights URL */}
          <div>
            <label className="block text-sm font-medium mb-2">Highlights Link (YouTube/Hudl)</label>
            <input
              type="url"
              name="highlights_url"
              value={formData.highlights_url}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-2">Bio / About</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell coaches about yourself, your achievements, and goals..."
            />
          </div>
          {/* Contact Visibility */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Contact Visibility</h3>
            <label className="flex items-center gap-3 mb-3">
              <input
                type="checkbox"
                name="contact_email_visible"
                checked={formData.contact_email_visible}
                onChange={handleInputChange}
                className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm">Show my email to coaches</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="contact_phone_visible"
                checked={formData.contact_phone_visible}
                onChange={handleInputChange}
                className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm">Show my phone number to coaches</span>
            </label>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
          >
            {loading ? 'Creating Profile...' : 'Create Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}