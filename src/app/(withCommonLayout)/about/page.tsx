import React from 'react';
import Button from './Button';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-4 md:px-20 py-12 mt-[106px] lg:mt-0">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          About GreenHaven
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
        <Button />
      </div>
    </main>
  );
};

export default AboutPage;
