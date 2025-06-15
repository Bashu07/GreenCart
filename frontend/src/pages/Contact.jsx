import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 px-6 md:px-16 lg:px-24 xl:px-32 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold text-center mb-10 text-primary">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="space-y-6 shadow-md p-8 rounded-lg border border-gray-200 bg-white">
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input type="text" placeholder="Your Name" className="w-full p-3 border rounded outline-primary" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input type="email" placeholder="Your Email" className="w-full p-3 border rounded outline-primary" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Message</label>
              <textarea rows="4" placeholder="Your Message" className="w-full p-3 border rounded outline-primary" />
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dull transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6 text-gray-700">
            <div className="p-6 border rounded shadow-md">
              <h2 className="text-xl font-semibold mb-2">Visit Us</h2>
              <p>Kalanki, Kathmandu, Nepal</p>
            </div>

            <div className="p-6 border rounded shadow-md">
              <h2 className="text-xl font-semibold mb-2">Call Us</h2>
              <p>+977 9800000000</p>
            </div>

            <div className="p-6 border rounded shadow-md">
              <h2 className="text-xl font-semibold mb-2">Email</h2>
              <p>support@greencart.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
