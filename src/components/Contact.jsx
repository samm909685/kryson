import { Mail, MapPin } from "lucide-react";
import { useState } from "react";

function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const subject = `New Enquiry from ${form.name}`;
    const body = `
Name: ${form.name}
Email: ${form.email}
Company: ${form.company}

Message:
${form.message}
    `;

    window.location.href = `mailto:info@krysonlifescience.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 md:px-8 bg-blue-50">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 text-lg">
            Get in touch for partnerships, products, and business enquiries.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Email */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex gap-4 items-start">
            <Mail className="text-blue-700" size={28} />
            <div>
              <h3 className="font-semibold text-xl text-blue-900">Email</h3>
              <p className="text-gray-600">info@krysonlifescience.com</p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex gap-4 items-start">
            <MapPin className="text-blue-700" size={28} />
            <div>
              <h3 className="font-semibold text-xl text-blue-900">Address</h3>
              <p className="text-gray-600">
                202, Society Arihant Pride, Pimpri Chowk, Pune 411002
              </p>
            </div>
          </div>

        </div>

        {/* Enquiry Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-800 transition"
          >
            Enquire Now
          </button>
        </div>

        {/* Popup Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl relative">

              {/* Close Button */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-2xl text-gray-500"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold text-blue-900 mb-6">
                Send Enquiry
              </h3>

              <div className="space-y-4">

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
                />

                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
                />

                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
                ></textarea>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-700 text-white py-4 rounded-xl font-semibold hover:bg-blue-800 transition"
                >
                  Send Enquiry
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Contact;