// app/verify/success/page.tsx or pages/verify/success.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ProfileVerificationSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (token === process.env.NEXT_PUBLIC_SUCCESS_TOKEN) {
      setIsValid(true);
      const timer = setTimeout(() => router.push("/"), 8000);
      return () => clearTimeout(timer);
    } else {
      router.push("/404"); // redirect to 404 if token is invalid
    }
  }, [token, router]);

  if (!isValid) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Profile Verified!
        </h1>
        <p className="text-gray-700 mb-6">
          Your profile has been successfully verified. You now have full access
          to all features of our platform without any restrictions.
        </p>

        <Link
          href="/"
          className="inline-block bg-primary hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition"
        >
          Go to Homepage
        </Link>

        <p className="text-sm text-gray-400 mt-4">
          You will be redirected shortly...
        </p>
      </div>
    </main>
  );
};

export default ProfileVerificationSuccess;
