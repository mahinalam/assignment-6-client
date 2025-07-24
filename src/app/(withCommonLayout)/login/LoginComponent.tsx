// "use client";

// import { Button } from "@nextui-org/button";
// import Link from "next/link";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FieldValues, SubmitHandler } from "react-hook-form";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Suspense, useEffect } from "react";
// import { signIn } from "next-auth/react";
// import Image from "next/image";
// import { useTheme } from "next-themes";

// import GTForm from "@/src/components/form/GTForm";
// import loginValidationSchema from "@/src/schemas/login.schema";
// import GTInput from "@/src/components/form/GTInput";
// import { useUserLogin } from "@/src/hooks/auth.hook";
// import Loading from "@/src/components/UI/LoginLoading";
// import { useUser } from "@/src/context/user.provider";

// const LoginPageComponent = () => {
//   const router = useRouter();
//   const { setIsLoading: userLoading } = useUser();

//   // const searchParams = useSearchParams();
//   // const redirect = searchParams.get("redirect");

//   // console.log(redirect);
//   const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     handleUserLogin(data);
//     userLoading(true);
//   };

//   useEffect(() => {
//     if (!isPending && isSuccess) {
//       // if (redirect) {
//       //   router.push(redirect);
//       // } else {
//       router.push("/");
//       // }
//     }
//   }, [isPending, isSuccess]);

//   return (
//     <>
//       {isPending && <Loading />}
//       <div className="flex lg:w-[40%] w-full flex-col items-center justify-center">
//         <h3 className="my-2 text-2xl font-bold">Login with GreenHaven</h3>
//         <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
//         <div className="w-full mx-auto">
//           <GTForm
//             resolver={zodResolver(loginValidationSchema)}
//             onSubmit={onSubmit}
//           >
//             <div className="py-3">
//               <GTInput label="Email" name="email" type="email" />
//             </div>
//             <div className="py-3">
//               <GTInput label="Password" name="password" type="password" />
//             </div>
//             <Button
//               className="my-3 w-full rounded-md  font-semibold text-blue-600 bg-transparent"
//               size="lg"
//               type="submit"
//             >
//               Login
//             </Button>
//           </GTForm>
//           <div className="text-center">
//             Don&lsquo;t have account ? <Link href={"/register"}>Register</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginPageComponent;
'use client';

import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import GTForm from '@/src/components/form/GTForm';
import loginValidationSchema from '@/src/schemas/login.schema';
import GTInput from '@/src/components/form/GTInput';
import { useUserLogin } from '@/src/hooks/auth.hook';
import Loading from '@/src/components/UI/LoginLoading';
import { useUser } from '@/src/context/user.provider';

const LoginPageComponent = () => {
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push('/');
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <Loading />}
      <div className="min-h-screen w-full flex items-center justify-center px-4">
        <div className="lg:w-[40%] w-full max-w-md flex flex-col items-center justify-center">
          <h3 className="my-2 text-2xl font-bold">Login with GreenHaven</h3>
          <p className="mb-4">Welcome Back! Let&rsquo;s Get Started</p>
          <div className="w-full">
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
                className="my-3 w-full rounded-md font-semibold text-blue-600 bg-transparent"
                size="lg"
                type="submit"
              >
                Login
              </Button>
            </GTForm>
            <div className="text-center">
              Don&rsquo;t have an account?{' '}
              <Link href="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPageComponent;
