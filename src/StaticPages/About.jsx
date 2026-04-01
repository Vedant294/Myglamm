function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-25 pt-24">
      {/* Header Section with Hero Image */}
      <header className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-orange-50 opacity-30 rounded-2xl -z-10"></div>
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: "Georgia, serif" }}>
            About MyGlamm
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 italic mb-6">Your Personalized Skincare Companion</p>
          <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1187&q=80"
              alt="Skincare products"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Mission Section */}
      <section className="mb-16 bg-blue-50 p-8 rounded-lg relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-100 rounded-full opacity-20"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex items-center mb-6">
            <svg className="w-8 h-8 text-blue-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>Our Mission</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg text-justify">
            At MyGlamm, we believe that great skincare starts with understanding your unique skin type.
            We're dedicated to helping you find the perfect products tailored specifically for your skin's needs,
            whether you have oily, dry, combination, or sensitive skin.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="mb-16 flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <div className="flex items-center mb-6">
            <svg className="w-8 h-8 text-orange-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>Our Story</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg text-justify">
            Founded in 2023, MyGlamm began as a passion project between two skincare enthusiasts who
            struggled to find products that truly worked for their specific skin types. Frustrated by the
            one-size-fits-all approach in the beauty industry, we set out to create a curated selection
            of high-quality products organized by skin type, making your skincare journey simpler and more effective.
          </p>
        </div>
        <div className="md:w-1/2">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              alt="Founders working on skincare products"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Skin Type Approach Section */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <svg className="w-8 h-8 text-green-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>Our Skin-Type Focused Approach</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Oily Skin Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-blue-400">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-800" style={{ fontFamily: "Georgia, serif" }}>Oily Skin</h3>
            </div>
            <p className="text-gray-600">
              Our oily skin collection features lightweight, oil-free formulas that control shine
              without stripping your skin. We focus on balancing sebum production while keeping your
              skin hydrated and healthy.
            </p>
          </div>

          {/* Dry Skin Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-orange-400">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-800" style={{ fontFamily: "Georgia, serif" }}>Dry Skin</h3>
            </div>
            <p className="text-gray-600">
              For dry skin types, we've selected rich, nourishing products packed with hydrating
              ingredients like hyaluronic acid and ceramides to restore your skin's moisture barrier
              and prevent flakiness.
            </p>
          </div>

          {/* Combination Skin Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-purple-400">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-800" style={{ fontFamily: "Georgia, serif" }}>Combination Skin</h3>
            </div>
            <p className="text-gray-600">
              Balancing combination skin can be tricky, which is why our carefully chosen products
              address both oily and dry areas without overcompensating in either direction.
            </p>
          </div>

          {/* Sensitive Skin Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-pink-400">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-pink-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-800" style={{ fontFamily: "Georgia, serif" }}>Sensitive Skin</h3>
            </div>
            <p className="text-gray-600">
              Our sensitive skin selection focuses on gentle, fragrance-free formulas with soothing
              ingredients to calm irritation while strengthening your skin's natural defenses.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16 bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-lg">
        <div className="flex items-center mb-8">
          <svg className="w-8 h-8 text-green-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              ),
              title: "Skin-Type First",
              description: "Every product is categorized by skin type to simplify your search."
            },
            {
              icon: (
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              ),
              title: "Quality Over Quantity",
              description: "We rigorously test and select only the most effective formulas."
            },
            {
              icon: (
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              title: "Transparency",
              description: "Clear ingredient lists and honest product descriptions."
            },
            {
              icon: (
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ),
              title: "Education",
              description: "Helping you understand your skin better through our guides and resources."
            },
            {
              icon: (
                <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              ),
              title: "Sustainability",
              description: "Prioritizing eco-friendly packaging and ethical brands."
            }
          ].map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start">
              <div className="mr-4 mt-1">
                {value.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <svg className="w-8 h-8 text-indigo-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>Meet the Skin Experts</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              Our team includes licensed estheticians and dermatologists who help curate our collections
              and create educational content to guide your skincare routine decisions.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Dr. Sarah Chen", role: "Dermatologist" },
                { name: "Emma Rodriguez", role: "Licensed Esthetician" },
                { name: "Dr. Michael Park", role: "Cosmetic Chemist" },
                { name: "Lisa Thompson", role: "Skincare Educator" }
              ].map((member, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-300">
                  <h4 className="font-medium text-gray-800">{member.name}</h4>
                  <p className="text-sm text-indigo-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt="Medical team discussing skincare"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-orange-50 p-8 rounded-lg relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-100 rounded-full opacity-20"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-orange-100 rounded-full opacity-20"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <svg className="w-8 h-8 text-orange-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>Join the MyGlamm Community</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            We're more than just a store - we're building a community of skincare enthusiasts who share
            tips, reviews, and experiences. Follow us on social media and join the conversation with
            #MyGlamm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center bg-[#f18526] hover:bg-orange-600 text-white px-6 py-3 rounded-md transition-colors duration-300 font-medium">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Follow on Instagram
            </button>
            <button className="flex items-center justify-center bg-[#539d68] hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors duration-300 font-medium">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
              Join Our Facebook Group
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;