"use client";

import React from "react";
import { sendMessage } from "@/src/services/AuthService";
import { useRouter } from "next/navigation";

const ContactPage = () => {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const subject = form.subject.value;
    const message = form.message.value;

    const contactInfo = {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    };
    const { data } = sendMessage(contactInfo);

    router.push("/");
  };

  return (
    <div>
      <div className="w-full h-[400px] relative">
        <div
          style={{
            backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.3), 
              rgba(0, 0, 0, 0.3)
            ), url('https://gardensavvy.com/wp-content/uploads/2018/09/cc.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
          }}
          className="absolute inset-0"
        >
          <div className="flex flex-col  justify-center items-center h-full text-white text-opacity-90 font-medium">
            <h1
              style={{ textShadow: "3px 3px 4px #000" }}
              className="md:text-5xl text-4xl"
            >
              {" "}
              CONTACT
            </h1>
            <h1
              style={{ textShadow: "3px 3px 4px #000" }}
              className="md:text-3xl text-2xl mt-5 text-center"
            >
              Have a question? Drop us a seed below.
            </h1>
          </div>
        </div>
      </div>

      <div className="">
        <div>
          <div className="flex md:flex-row flex-col">
            <section className="md:w-5/12 w-full md:pt-20 md:pl-20 my-12">
              <div className="flex flex-col gap-8 md:text-left text-center">
                <div>
                  <h1 className="md:text-4xl text-3xl">Contact Info</h1>
                </div>
                <div>
                  <p className=" text-2xl "> info@gardensavvy.com</p>
                </div>
                <div className="border-b-2 mx-auto w-4/5 md:hidden block" />
              </div>
            </section>
            <section className="md:w-7/12 w-full md:py-20 bg-[#5D6538] pr-5 pl-5 md:pr-28 mb-10">
              <div>
                <section>
                  <h1 className="font-bold md:text-4xl text-3xl  md:text-left text-center text-[#E3BE21] md:my-10 my-6">
                    Drop us a Seed
                  </h1>
                </section>
                <section className="pt-">
                  <form onSubmit={handleSubmit}>
                    <div className="py-3">
                      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <input
                          name="firstName"
                          type="text"
                          className="bg-[#7C8255] text-white placeholder-white p-3 w-full rounded-xl focus:outline-none focus:border-blue-600 border-1 border-transparent"
                          placeholder="First Name"
                        />
                        <input
                          name="lastName"
                          type="text"
                          className="bg-[#7C8255] text-white placeholder-white
                           p-3 w-full rounded-xl focus:outline-none focus:border-blue-600 border-1 border-transparent"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div className="py-3">
                      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <input
                          name="email"
                          type="email"
                          className="bg-[#7C8255] text-white placeholder-white p-3 w-full rounded-xl focus:outline-none focus:border-blue-600 border-1 border-transparent"
                          placeholder="E-mail"
                        />
                        <input
                          name="phone"
                          type="text"
                          className="bg-[#7C8255] text-white placeholder-white p-3 w-full rounded-xl focus:outline-none focus:border-blue-600 border-1 border-transparent"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                    <div className="py-3">
                      <input
                        name="subject"
                        type="text"
                        className="bg-[#7C8255] text-white placeholder-white p-3 w-full rounded-xl focus:outline-none focus:border-blue-600 border-1 border-transparent"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="py-3">
                      <textarea
                        name="message"
                        id=""
                        rows={7}
                        placeholder="Message"
                        className="bg-[#7C8255] text-white placeholder-white p-3 w-full rounded-xl focus:outline-none focus:border-blue-600 border-1 border-transparent"
                      ></textarea>
                    </div>
                    <div className="py-3">
                      <button
                        type="submit"
                        className="text-black hover:text-white bg-[#E3BE21] py-4 px-20 text-xl md:mx-0 mx-auto block"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
