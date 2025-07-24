// // "use client";

// // import WithSuspense from "@/src/components/sharred/WithSuspense";

// // const LoginPageContent = () => {
// //   return (
// //     <WithSuspense>
// //       <LoginPageComponent />
// //     </WithSuspense>
// //   );
// // };

// // export default LoginPageContent;

// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@nextui-org/button";
// import Link from "next/link";
// import { ChangeEvent, useState } from "react";
// import { FieldValues, SubmitHandler } from "react-hook-form";

// import GTForm from "@/src/components/form/GTForm";
// import GTInput from "@/src/components/form/GTInput";
// import { useUser } from "@/src/context/user.provider";
// import { useUserRegistration } from "@/src/hooks/auth.hook";
// import registerValidationSchema from "@/src/schemas/register.schema";

// export default function LoginPage() {
//   const { mutate: handleUserRegistration, isPending } = useUserRegistration();
//   const [imageFiles, setImageFiles] = useState<File | null>(null);
//   const [imagePreviews, setImagePreviews] = useState<any>(null);
//   const { setIsLoading: userLoading } = useUser();

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     const formData = new FormData();

//     const userData = {
//       ...data,
//     };

//     formData.append("data", JSON.stringify(userData));
//     formData.append("profileImage", imageFiles as File);
//     handleUserRegistration(formData);
//     userLoading(true);
//   };

//   return (
//     <div className="flex  flex-col items-center justify-center">
//       <h3 className="my-2 text-2xl font-bold">Login with GreenHaven</h3>
//       <p className="mb-4">Welcome Back! Let&rsquo;s Get Started</p>
//       <div className="lg:w-[40%] w-full">
//         <GTForm
//           resolver={zodResolver(registerValidationSchema)}
//           onSubmit={onSubmit}
//         >
//           <div className="py-3">
//             <GTInput label="Email" name="email" size="sm" />
//           </div>

//           <div className="py-3">
//             <GTInput
//               label="Password"
//               name="password"
//               size="sm"
//               type="password"
//             />
//           </div>
//           <Button
//             className="my-3 w-full rounded-md font-semibold text-blue-600 bg-transparent"
//             size="lg"
//             type="submit"
//           >
//             Login
//           </Button>
//         </GTForm>
//         <div className="text-center">
//           Don&rsquo;t have an account? <Link href="/register">Register</Link>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import GTForm from "@/src/components/form/GTForm";
import GTInput from "@/src/components/form/GTInput";
import { useUser } from "@/src/context/user.provider";
import { useUserLogin, useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schemas/register.schema";
import loginValidationSchema from "@/src/schemas/login.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const id = toast.loading("Logging in...");
    handleUserLogin(data, {
      onSuccess: () => {
        toast.success("Login successful! Welcome back 🎉", { id });
      },
      onError: () => {
        toast.error("Login failed. Please check your email and password.", {
          id,
        });
      },
    });
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/");
    }
  }, [isPending, isSuccess]);

  // handle credentails login
  const handleCredentailsLogin = async (data: {
    email: string;
    password: string;
  }) => {
    const id = toast.loading("Logging in...");

    handleUserLogin(data, {
      onSuccess: () => {
        toast.success("Login successful! Welcome back 🎉", { id });
      },
      onError: () => {
        toast.error("Login failed. Please check your email and password.", {
          id,
        });
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center w-full">
        <h3 className="my-2 text-2xl font-bold">Login with GreenHaven</h3>
        <p className="mb-4">Welcome Back! Let&rsquo;s Get Started</p>
        <div className="flex gap-2 my-4">
          <button
            // type="submit"
            className="bg-primary p-2 text-white rounded-lg text-sm"
            onClick={() =>
              handleCredentailsLogin({
                email: "user@gmail.com",
                password: "123456",
              })
            }
          >
            User Credentials
          </button>
          <button
            className="bg-primary p-2 text-white rounded-lg text-sm"
            onClick={() =>
              handleCredentailsLogin({
                email: "mahin@gmail.com",
                password: "123456",
              })
            }
          >
            Admin Credentials
          </button>
        </div>
        <div className="lg:w-[40%] w-full">
          <GTForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <GTInput label="Email" name="email" size="sm" />
            </div>

            <div className="py-3">
              <GTInput
                label="Password"
                name="password"
                size="sm"
                type="password"
              />
            </div>
            <Button
              className="my-3 w-full rounded-md font-semibold text-white bg-primary"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </GTForm>
          <div className="text-center">
            Don&rsquo;t have an account? <Link href="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
