function Partnership() {
  const therapies = [
    "Anti-Infectives",
    "Gastro Therapies",
    "Anti-Allergic",
    "Pain Relieving",
  ];

  const interests = [
    "In-licensing of ready registration & under-registration products",
    "Expansion in Domestic Market",
    "Marketing & Distribution of Brands",
  ];

  return (
    <section
      id="partnership"
      className="py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-white"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-blue-900 mb-4 md:mb-6">
            Partner with Kryson Life Science
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            With business ethics and principles, we provide high quality,
            affordable medicines trusted by healthcare professionals and patients.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          {/* Left */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-blue-800 mb-4 md:mb-6">
              Why Partner With Us?
            </h3>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
              We are in constant search of partners who match our values,
              work ethics and patient well-being. We regard partnership
              and collaboration as an integral part of our business strategy.
            </p>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              This initiative is supported by a dedicated team for global
              business development, licensing and post-alliance management.
            </p>
          </div>

          {/* Right */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-blue-800 mb-4 md:mb-6">
              Therapies of Interest
            </h3>

            <div className="flex flex-wrap gap-3 md:gap-4">
              {therapies.map((therapy, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm md:text-base"
                >
                  {therapy}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Preferred Areas */}
        <div className="mt-12 md:mt-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-6 md:mb-8 text-center">
            Preferred Areas of Interest
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {interests.map((item, index) => (
              <div
                key={index}
                className="bg-blue-50 p-5 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <p className="text-gray-700 text-center text-sm md:text-base">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <h3 className="text-xl md:text-2xl font-semibold text-blue-900 mb-3 md:mb-4">
            Partner With Us
          </h3>

          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Please connect with us by email
          </p>

          <a
            href="mailto:kryson.life@gmail.com"
            className="inline-block bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg hover:bg-blue-800 transition"
          >
            kryson.life@gmail.com
          </a>
        </div>

      </div>
    </section>
  );
}

export default Partnership;