// // "use client";

// // import React from "react";
// // import { sendMessage } from "@/src/services/AuthService";
// // import { useRouter } from "next/navigation";

// // const ContactPage = () => {
// //   const router = useRouter();
// //   const handleSubmit = (e: any) => {
// //     e.preventDefault();
// //     const form = e.target;
// //     const firstName = form.firstName.value;
// //     const lastName = form.lastName.value;
// //     const email = form.email.value;
// //     const phone = form.phone.value;
// //     const subject = form.subject.value;
// //     const message = form.message.value;

// //     const contactInfo = {
// //       firstName,
// //       lastName,
// //       email,
// //       phone,
// //       subject,
// //       message,
// //     };
// //     const { data } = sendMessage(contactInfo);

// //     router.push("/");
// //   };

// //   return (
// //     <div>
// //       <div className="w-full h-[400px] relative">
// //         <div
// //           style={{
// //             backgroundImage: `linear-gradient(
// //               rgba(0, 0, 0, 0.3),
// //               rgba(0, 0, 0, 0.3)
// //             ), url('https://gardensavvy.com/wp-content/uploads/2018/09/cc.jpg')`,
// //             backgroundSize: "cover",
// //             backgroundPosition: "center",
// //             height: "100%",
// //           }}
// //           className="absolute inset-0"
// //         >
// //           <div className="flex flex-col  justify-center items-center h-full text-white text-opacity-90 font-medium">
// //             <h1
// //               style={{ textShadow: "3px 3px 4px #000" }}
// //               className="md:text-5xl text-4xl"
// //             >
// //               {" "}
// //               CONTACT
// //             </h1>
// //             <h1
// //               style={{ textShadow: "3px 3px 4px #000" }}
// //               className="md:text-3xl text-2xl mt-5 text-center"
// //             >
// //               Have a question? Drop us a seed below.
// //             </h1>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="">
// //         <div>
// //           <div className="flex md:flex-row flex-col">
// //             <section className="md:w-5/12 w-full md:pt-20 md:pl-20 my-12">
// //               <div className="flex flex-col gap-8 md:text-left text-center">
// //                 <div>
// //                   <h1 className="md:text-4xl text-3xl">Contact Info</h1>
// //                 </div>
// //                 <div>
// //                   <p className=" text-2xl "> info@gardensavvy.com</p>
// //                 </div>
// //                 <div className="border-b-2 mx-auto w-4/5 md:hidden block" />
// //               </div>
// //             </section>
// //             <section className="md:w-7/12 w-full md:py-20 bg-[#5D6538] pr-5 pl-5 md:pr-28 mb-10">
// //               <div>
// //                 <section>
// //                   <h1 className="font-bold md:text-4xl text-3xl  md:text-left text-center text-[#E3BE21] md:my-10 my-6">
// //                     Drop us a Seed
// //                   </h1>
// //                 </section>
// //                 <section className="pt-">
// //                   <form onSubmit={handleSubmit}>
// //                     <div className="py-3">
// //                       <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
// //                         <input
// //                           name="firstName"
// //                           type="text"
// //                           className="bg-[#7C8255] text-white placeholder-white p-3 w-full rounded-xl focus:outline-none focus:border-blue-600 border-1 border-transparent"
// //                           placeholder="First Name"
// //                         />
// //                         <input
// //                           name="lastName"
// //                           type="text"
// //                           className="bg-[#7C8255] text-white placeholder-white
// //                            p-3 w-full rounded-xl focus:outline-none focus:border-blue-600 border-1 border-transparent"
// //                           placeholder="Last Name"
// //                         />
// //                       </div>
// //                     </div>
// //                     <div className="py-3">
// //                       <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
// //                         <input
// //                           name="email"
// //                           type="email"
// //                           className="bg-[#7C8255] text-white placeholder-white p-3 w-full rounded-xl focus:outline-none focus:border-blue-600 border-1 border-transparent"
// //                           placeholder="E-mail"
// //                         />
// //                         <input
// //                           name="phone"
// //                           type="text"
// //                           className="bg-[#7C8255] text-white placeholder-white p-3 w-full rounded-xl focus:outline-none focus:border-blue-600 border-1 border-transparent"
// //                           placeholder="Phone"
// //                         />
// //                       </div>
// //                     </div>
// //                     <div className="py-3">
// //                       <input
// //                         name="subject"
// //                         type="text"
// //                         className="bg-[#7C8255] text-white placeholder-white p-3 w-full rounded-xl focus:outline-none focus:border-blue-600 border-1 border-transparent"
// //                         placeholder="Subject"
// //                       />
// //                     </div>
// //                     <div className="py-3">
// //                       <textarea
// //                         name="message"
// //                         id=""
// //                         rows={7}
// //                         placeholder="Message"
// //                         className="bg-[#7C8255] text-white placeholder-white p-3 w-full rounded-xl focus:outline-none focus:border-blue-600 border-1 border-transparent"
// //                       ></textarea>
// //                     </div>
// //                     <div className="py-3">
// //                       <button
// //                         type="submit"
// //                         className="text-black hover:text-white bg-[#E3BE21] py-4 px-20 text-xl md:mx-0 mx-auto block"
// //                       >
// //                         Submit
// //                       </button>
// //                     </div>
// //                   </form>
// //                 </section>
// //               </div>
// //             </section>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ContactPage;

// "use client";

// import React from "react";

// const ContactPage = () => {
//   return (
//     <main className="min-h-screen bg-white text-gray-800 px-4 md:px-20 py-12">
//       {/* Header */}
//       <section className="text-center max-w-2xl mx-auto mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
//           Contact Us
//         </h1>
//         <p className="text-lg text-gray-600">
//           We'd love to hear from you! Whether you have a question, suggestion,
//           or just want to say hello 🌿
//         </p>
//       </section>

//       {/* Grid Layout: Form + Info */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
//         {/* Contact Form */}
//         <form className="bg-green-50 rounded-xl shadow-md p-6 space-y-4">
//           <div>
//             <label className="block mb-1 font-medium">Name</label>
//             <input
//               type="text"
//               placeholder="Your name"
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Email</label>
//             <input
//               type="email"
//               placeholder="your@email.com"
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Message</label>
//             <textarea
//               placeholder="Your message..."
//               rows={5}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
//           >
//             Send Message
//           </button>
//         </form>

//         {/* Contact Info */}
//         <div className="space-y-6 bg-gray-50 rounded-xl shadow-md p-6">
//           <h2 className="text-2xl font-semibold text-green-700">Reach Us</h2>
//           <p className="text-gray-600">
//             For general inquiries, support, or feedback, you can contact us
//             through the following ways:
//           </p>
//           <div>
//             <p className="font-medium">📧 Email:</p>
//             <p className="text-gray-700">support@gardensocial.com</p>
//           </div>
//           <div>
//             <p className="font-medium">📞 Phone:</p>
//             <p className="text-gray-700">+1 (234) 567-8901</p>
//           </div>
//           <div>
//             <p className="font-medium">📍 Address:</p>
//             <p className="text-gray-700">
//               123 Green Street, Garden City, Earth
//             </p>
//           </div>
//           <div className="flex gap-4 mt-4">
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-green-600 hover:text-green-800"
//             >
//               🌿 Facebook
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-green-600 hover:text-green-800"
//             >
//               📸 Instagram
//             </a>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default ContactPage;

"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br  py-16 px-4 md:px-24 text-gray-800">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
          Get in Touch 🌿
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          We’d love to hear from you! Reach out to grow with the GardenSocial
          community.
        </p>
      </motion.section>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/70 backdrop-blur-lg shadow-xl p-8 rounded-2xl space-y-6"
        >
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Jane Gardener"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              Your Message
            </label>
            <textarea
              placeholder="Tell us what's on your mind..."
              rows={5}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
          >
            Send Message
          </button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center bg-white/70 backdrop-blur-lg shadow-xl p-8 rounded-2xl space-y-6"
        >
          <h2 className="text-2xl font-bold text-green-800">
            Contact Information
          </h2>
          <p className="text-gray-700">
            Whether you’re a plant parent, community leader, or someone new to
            gardening — we're excited to connect with you!
          </p>

          <div className="space-y-2">
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-green-600" /> support@gardensocial.com
            </p>
            <p className="flex items-center gap-3">
              <FaPhone className="text-green-600" /> +1 (555) 123-4567
            </p>
            <p className="text-gray-700">
              123 Garden Lane, Natureville, Earth 🌎
            </p>
          </div>

          <div className="flex gap-5 text-xl mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-green-700 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-green-700 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-green-700 transition"
            >
              <FaTwitter />
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ContactPage;
