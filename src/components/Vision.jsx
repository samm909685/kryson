import visionVideo from "../assets/images/vision.mp4";

function Vision() {
  return (
    <section
      id="vision"
      className="relative py-14 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={visionVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Heading */}
        <h2
          className="text-3xl sm:text-4xl md:text-6xl mb-6 sm:mb-8 md:mb-10 text-white italic"
          style={{ fontFamily: "Playfair Display" }}
        >
          VISION
        </h2>

        {/* Paragraph 1 */}
        <p
          className="text-sm sm:text-base md:text-2xl text-gray-200 italic leading-relaxed mb-5 sm:mb-6 md:mb-12 px-2"
          style={{ fontFamily: "Cormorant Garamond" }}
        >
          To become value and ethics driven, patient centric pharmaceutical
          company, by providing quality & affordable medicines with humanity.
        </p>

        {/* Paragraph 2 */}
        <p
          className="text-sm sm:text-base md:text-2xl text-gray-200 italic leading-relaxed mb-5 sm:mb-6 md:mb-8 px-2"
          style={{ fontFamily: "Cormorant Garamond" }}
        >
          To discover, develop medicines & pharmaceutical solutions to
          prevent, alleviate and cure disease.
        </p>

        {/* Paragraph 3 */}
        <p
          className="text-sm sm:text-base md:text-2xl text-gray-200 italic leading-relaxed mb-5 sm:mb-6 md:mb-12 px-2"
          style={{ fontFamily: "Cormorant Garamond" }}
        >
          We aspire to raise hopes & expectancy in every medically dependant.
        </p>

        {/* Paragraph 4 */}
        <p
          className="text-sm sm:text-base md:text-2xl text-gray-200 italic leading-relaxed mb-6 sm:mb-8 md:mb-16 px-2"
          style={{ fontFamily: "Cormorant Garamond" }}
        >
          Our object is to make life more joyous and the world more beautiful.
        </p>

        {/* Footer */}
        <p
          className="text-xs sm:text-sm md:text-xl italic text-white"
          style={{ fontFamily: "Playfair Display" }}
        >
          KRYSON LIFE ( Unit Of KALPATARU )
        </p>

      </div>
    </section>
  );
}

export default Vision;