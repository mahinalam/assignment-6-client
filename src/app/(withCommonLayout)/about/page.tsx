// /* eslint-disable react/no-unescaped-entities */
// "use client";

// import Image from "next/image";

// // import img from "@/src/assests/gardening-1.jpeg";
// import img1 from "@/src/assests/images/image.png";
// import img2 from "@/src/assests/images/img2.webp";
// import img3 from "@/src/assests/images/img3.jpg";
// import img4 from "@/src/assests/images/img4.jpg";
// import img5 from "@/src/assests/images/img5.jpg";
// import Banner from "@/src/components/about/Banner";

// export default function AboutPage() {
//   return (
//     <div>
//       <div className="mt-10">
//         <Banner />
//       </div>
//       <div className="w-[90%] mx-auto">
//         <section className=" md:text-xl text-lg md:my-20 my-10">
//           <p className="font-light md:leading-[40px] leading-[35px]">
//             {" "}
//             GreenHaven was founded with the idea that gardening is more than
//             just a hobby—it's a way of life. Our journey began with a small
//             group of garden lovers who wanted to share their knowledge and love
//             for plants with others. What started as a passion project quickly
//             blossomed into a platform dedicated to providing reliable, practical
//             gardening information for all levels. From urban dwellers dreaming
//             of their first container garden to seasoned gardeners looking to
//             refine their techniques, GreenHaven offers something for everyone.
//           </p>
//         </section>
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:mb-20 mb-10">
//           <div>
//             <Image
//               alt=""
//               className="max-w-full h-auto align-middle"
//               src={img1}
//             />
//           </div>
//           <div className=" md:text-xl text-lg md:leading-[40px] leading-[35px] order-first md:order-last">
//             <p className="font-bold mb-4">Hortisketch:</p>
//             <p className="font-light">
//               Hortisketch, your key to being a savvy gardener, is an easy-to-use
//               gardening design software that allows you to plan your garden,
//               vegetable beds, or even your entire property! Simply drag and drop
//               the plants and other objects onto your canvas and let your
//               imagination run wild. As you choose your plants, a customized
//               growing calendar will help you track when to sow, grow and harvest
//               based on your zip code. We also offer icons for housing, pools,
//               grills, walk-ways, irrigation and more. With Hortisketch, you are
//               able to reference previous years garden design as well as create
//               future gardening ideas. Record information in the notes tab about
//               your plant varieties performance and who you purchased each plant
//               from. The possibilities are endless!
//             </p>
//           </div>
//         </section>
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:mb-20 mb-10">
//           <div className="md:text-xl text-lg md:leading-[40px] leading-[35px]">
//             <p className="font-bold  mb-4">Garden Manager:</p>
//             <p className="font-light">
//               Garden Manager, another essential companion to being a savvy
//               gardener, is your new gardening notebook. You can list your seed
//               inventory, track your favorite suppliers, save your favorite
//               articles, and take detailed notes. If desired add pictures and
//               comments. We created a centralized location for all of your
//               gardening notes and reminders. Take Garden Manager on the go so
//               you don’t have to worry about your notes getting lost or wet out
//               in the garden!
//             </p>
//           </div>
//           <div>
//             <Image alt="" className="w-full" src={img2} />
//           </div>
//         </section>
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:mb-20 mb-10">
//           <div>
//             <Image alt="" className="w-full" src={img3} />
//           </div>
//           <div className="md:text-xl text-lg md:leading-[40px] leading-[35px] md:order-last order-first">
//             <p className="font-bold mb-4">Suppliers:</p>
//             <p className="font-light">
//               Discover the ease of being a savvy gardener with Garden Savvy –
//               your go-to solution for finding quality suppliers! Finding quality
//               suppliers is difficult when utilizing a searching engine, but
//               Garden Savvy makes it easy. We have over 1600 suppliers (and
//               growing!). The categories are divided into flowers, vegetables,
//               fruits, tropicals, supplies, exotics, and woody perennials. Simply
//               search for the item you want or browse through the catalogues to
//               find the best supplier to fit your needs. Whether you are looking
//               for a small amount of bean seeds or buying a unique apple var., we
//               have the supplier for you! We also have a wide variety of vendors
//               that carry gardening supplies, pest management, and soil
//               enhancement products. We really have you covered!
//             </p>
//           </div>
//         </section>
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:mb-20 mb-10">
//           <div className="md:text-xl text-lg md:leading-[40px] leading-[35px]">
//             <p className="font-bold  mb-4">Plant Information:</p>
//             <p className="font-light">
//               Gone are the days of sifting through search engines with useless
//               information clouded with pop-up ads. Quickly search our database
//               of hundreds of articles specifically chosen from useful collegiate
//               sources. You can also link them in your Garden Manager profile for
//               future access. Spend more time digging in the garden rather than
//               digging through the internet.
//             </p>
//           </div>
//           <div>
//             <Image alt="" className="w-full" src={img4} />
//           </div>
//         </section>
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:mb-20 mb-10">
//           <div>
//             <Image alt="" className="w-full" src={img5} />
//           </div>
//           <div className="md:text-xl text-lg md:leading-[40px] leading-[35px] md:order-last order-first">
//             <p className="font-bold  mb-4">Community:</p>
//             <p className="font-light">
//               There is a gardening community out there for everyone! Under the
//               community tab, there are all sorts of associations, societies, and
//               clubs for all gardening niches. From roses to bonsai trees to
//               region specific clubs, there is a place for you! You can also keep
//               track of your communities in Garden Manager.
//             </p>
//           </div>
//         </section>
//         <section className="md:text-xl text-lg md:leading-[40px] leading-[35px] md:mb-20 mb-10">
//           <p className="font-light">
//             {" "}
//             At GreenHaven, we are more than just a resource for gardening
//             tips—we are a community dedicated to nurturing a love for plants,
//             sustainability, and the environment. Our goal is to inspire and
//             empower individuals to cultivate their own green spaces, no matter
//             the size or location. As we continue to grow, our commitment to
//             providing expert guidance, fostering meaningful connections, and
//             promoting eco-friendly practices remains at the heart of everything
//             we do. Join us on this journey to make the world a greener,
//             healthier place—one garden at a time.
//           </p>
//         </section>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-4 md:px-20 py-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          About GardenSocial
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          A community-driven social platform where garden lovers connect, share,
          and grow together 🌿
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-green-50 rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">
            🌱 Share Gardening Posts
          </h3>
          <p className="text-gray-600">
            Post about your plants, tips, or garden updates and inspire others
            with your green thumb.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-green-50 rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">🤝 Follow Gardeners</h3>
          <p className="text-gray-600">
            Discover and follow gardeners from around the world to see their
            latest posts.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-green-50 rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">👍 React to Posts</h3>
          <p className="text-gray-600">
            Like or dislike posts to show appreciation or give feedback to
            fellow gardeners.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-green-50 rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">💬 Comment & Connect</h3>
          <p className="text-gray-600">
            Start conversations by commenting on posts and connect with
            like-minded growers.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="bg-green-50 rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">🔖 Save Favorites</h3>
          <p className="text-gray-600">
            Save posts to revisit tips, ideas, or beautiful garden moments
            anytime.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="bg-green-50 rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">📱 Mobile-Friendly</h3>
          <p className="text-gray-600">
            Enjoy a seamless gardening experience from your phone, tablet, or
            desktop.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <p className="text-gray-700 text-lg mb-4">
          Ready to grow your garden and your community?
        </p>
        <Link
          href="/register"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
        >
          Join GardenSocial
        </Link>
      </div>
    </main>
  );
};

export default AboutPage;
