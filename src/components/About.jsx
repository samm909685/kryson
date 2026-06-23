import founderImg from "../assets/images/founder.png";
import rushabhImg from "../assets/images/rushabh.png";

function About() {
  return (
    <section
      id="about"
      className="py-16 md:py-20 px-4 sm:px-6 md:px-10 bg-white"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-blue-800 mb-4 md:mb-6">
            About Kryson Life Science
          </h2>
        </div>

        {/* Company Intro */}
        <div className="max-w-5xl mx-auto text-center mb-16 md:mb-20">
          <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed mb-6 md:mb-8">
            With a legacy spanning over 25 years in the pharmaceutical
            industry, our company has been committed to delivering quality
            healthcare solutions that improve lives and support medical
            professionals across diverse therapeutic segments.
          </p>

          <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed mb-6 md:mb-8">
            Founded by the Late Mr. Hitesh Narendra Oswal, the company was
            built on the principles of integrity, innovation, quality, and
            customer trust. Through his vision and dedication, the organization
            established a strong presence in the pharmaceutical sector.
          </p>

          <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
            Today, under the leadership of Mr. Rushabh Hitesh Oswal, the
            company continues to grow and evolve while staying true to its
            founding values.
          </p>
        </div>

        {/* Founder Section */}
        <div className="grid grid-cols-2 gap-4 md:gap-12 items-center mb-16 md:mb-20">

          {/* Founder Image */}
          <div className="flex justify-center">
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-blue-100">
              <img
                src={founderImg}
                alt="Late Mr. Hitesh Narendra Oswal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Founder Content */}
          <div>
            <h3 className="text-lg sm:text-2xl md:text-4xl font-bold text-blue-800 mb-2 md:mb-4">
              Late Mr. Hitesh Narendra Oswal
            </h3>

            <p className="text-sm sm:text-base md:text-xl text-blue-600 mb-3 md:mb-6">
              Founder
            </p>

            <p className="text-gray-600 text-xs sm:text-sm md:text-lg leading-relaxed">
              The visionary behind Kryson Life Science, he laid the foundation
              of the company with strong ethics, quality standards, and trust.
              His dedication and leadership built a strong legacy in the
              pharmaceutical sector that continues to inspire the company today.
            </p>
          </div>
        </div>

        {/* Rushabh Section */}
        <div className="grid grid-cols-2 gap-4 md:gap-12 items-center">

          {/* Rushabh Content */}
          <div>
            <h3 className="text-lg sm:text-2xl md:text-4xl font-bold text-blue-800 mb-2 md:mb-4">
              Mr. Rushabh Hitesh Oswal
            </h3>

            <p className="text-sm sm:text-base md:text-xl text-blue-600 mb-3 md:mb-6">
              Managing Director
            </p>

            <p className="text-gray-600 text-xs sm:text-sm md:text-lg leading-relaxed">
              Carrying forward the legacy with innovation and commitment,
              he is leading Kryson Life Science into a new era of growth,
              pharmaceutical formulations, and healthcare excellence while
              maintaining the company’s core values.
            </p>
          </div>

          {/* Rushabh Image */}
          <div className="flex justify-center">
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-blue-100">
              <img
                src={rushabhImg}
                alt="Mr. Rushabh Hitesh Oswal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;