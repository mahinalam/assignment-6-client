"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useTheme } from "next-themes";

import GTForm from "@/src/components/form/GTForm";
import loginValidationSchema from "@/src/schemas/login.schema";
import GTInput from "@/src/components/form/GTInput";
import { useUserLogin } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";

const LoginPage = () => {
  const { theme } = useTheme();

  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  console.log(redirect);
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <Loading />}
      <div className="flex md:h-[calc(100vh-100px)] h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Login with GreenHaven</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="md:w-[35%] w-[80%] mx-auto">
          <GTForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <GTInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <GTInput label="Password" name="password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </GTForm>
          <div className="text-center">
            Don&lsquo;t have account ? <Link href={"/register"}>Register</Link>
          </div>
        </div>
        <p className="text-center mt-5">Or Sign Up Using</p>
        <div className="flex justify-center mb-10 mt-2">
          <button className="btn btn-circle mr-4">
            <Image
              alt="google logo"
              height={50}
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
              width={50}
            />
          </button>
          <button
            className={`btn btn-circle transition-all rounded-xl ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } border border-gray-300 hover:border-gray-500`}
            style={{ padding: "5px" }}
            onClick={() =>
              signIn("github", {
                callbackUrl: "http://localhost:3000",
              })
            }
          >
            <Image
              alt="GitHub logo"
              height={35}
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              width={35}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
