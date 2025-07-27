"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ProfileVerificationFailed = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (token === process.env.NEXT_PUBLIC_FAILED_TOKEN) {
      setIsValid(true);
      const timer = setTimeout(() => router.push("/"), 8000);
      return () => clearTimeout(timer);
    } else {
      router.push("/404"); // redirect to 404 if token is invalid
    }
  }, [token, router]);

  if (!isValid) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-xl w-full bg-white border border-red-300 shadow-md rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-3">
          😞 Verification Failed
        </h1>
        <p className="text-gray-700 mb-6">
          Oops! Something went wrong while verifying your profile.
          <br />
          Please try again later or contact our support team for help.
        </p>

        <Link
          href="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition"
        >
          Return to Homepage
        </Link>

        <p className="text-sm text-gray-400 mt-4">
          Redirecting in a few seconds...
        </p>
      </div>
    </main>
  );
};

export default ProfileVerificationFailed;
