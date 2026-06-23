import qualityImg from "../assets/images/quality.png";

function Quality() {
  return (
    <section id="quality" className="py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-blue-50">
      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-10 md:mb-14">
          Quality Assurance
        </h2>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={qualityImg}
            alt="Quality Assurance"
            className="w-full max-w-full md:max-w-6xl rounded-2xl shadow-xl object-cover"
          />
        </div>

      </div>
    </section>
  );
}

export default Quality;