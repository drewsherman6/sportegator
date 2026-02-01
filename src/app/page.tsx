import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Athlete Talent by City</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Coaches and scouts discover verified athletes. Athletes showcase their skills to the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Search Athletes
            </Link>
            <Link
              href="/signup?role=athlete"
              className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-bold transition"
            >
              Create Athlete Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🏃</div>
              <h3 className="text-xl font-bold mb-2">Athletes Create Profiles</h3>
              <p className="text-gray-600">
                Build a public profile showcasing your skills, achievements, and highlights.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-xl font-bold mb-2">Coaches & Scouts Search</h3>
              <p className="text-gray-600">
                Filter by city, sport, age, position, and level to find your next recruit.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">✓</div>
              <h3 className="text-xl font-bold mb-2">Verified Profiles</h3>
              <p className="text-gray-600">
                Admin-verified athletes get a trusted badge and higher visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Join hundreds of athletes and scouts on Agegator today.
          </p>
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition inline-block"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  )
}
