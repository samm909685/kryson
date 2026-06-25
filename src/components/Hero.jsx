import heroVideo from "../assets/images/hero.mp4";

function Hero({ onVideoLoad }) {
  return (
    <section
      id="home"
      className="relative h-[55vh] sm:h-[70vh] md:h-screen w-full overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={onVideoLoad}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center text-white max-w-4xl mt-10 sm:mt-0">

          {/* Heading */}
          <h1 className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4">
            Good Health, <br /> Better Life
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-lg md:text-2xl text-gray-200 leading-relaxed max-w-xs sm:max-w-xl md:max-w-2xl mx-auto">
            Dedicated to delivering high quality pharmaceutical solutions
            that enhance lives and build a healthier tomorrow.
          </p>

        </div>
      </div>
    </section>
  );
}

export default Hero;