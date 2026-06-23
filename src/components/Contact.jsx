import { Mail, MapPin } from "lucide-react";

function Contact() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-blue-50"
    >
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-10 md:mb-14">
          Contact Us
        </h2>

        {/* Contact Cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-8">

          {/* Email */}
          <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition">
            <Mail className="mx-auto text-blue-700 mb-3 md:mb-4" size={32} />
            <h3 className="text-lg md:text-2xl font-semibold text-blue-900 mb-2 md:mb-3">
              Email
            </h3>
            <p className="text-gray-600 break-words text-xs sm:text-sm md:text-base">
              info@krysonlifescience.com
            </p>
          </div>

          {/* Address */}
          <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition">
            <MapPin className="mx-auto text-blue-700 mb-3 md:mb-4" size={32} />
            <h3 className="text-lg md:text-2xl font-semibold text-blue-900 mb-2 md:mb-3">
              Address
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed break-words">
              202, Society Arihant Pride, Pimpri Chowk, Pune 411002
            </p>
          </div>

        </div>

        {/* Button */}
        <div className="mt-10 md:mt-12">
          <button className="bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-medium hover:bg-blue-800 transition">
            Enquire Now
          </button>
        </div>

      </div>
    </section>
  );
}

export default Contact;