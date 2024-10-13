"use client";

import { Button } from "@nextui-org/button";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import GTTextArea from "@/src/components/form/GTTextArea";
import GTInput from "@/src/components/form/GTInput";
import GTForm from "@/src/components/form/GTForm";

const onSubmit: SubmitHandler<FieldValues> = (data) => {
  toast.success("Message delivered!");
};

const ContactPage = () => {
  //   const {data,} = useMutation<any, Error, FormData>({
  //     mutationKey: ["POST"],
  //     mutationFn: async (postData) => await createPost(postData),
  //     onSuccess: () => {
  //       toast.success("Message delivered");
  //     },
  //     onError: (error) => {
  //       toast.error(error.message);
  //     },
  //   });
  return (
    <div>
      <div className="flex">
        <section className="w-5/12">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-5xl">Contact Info</h1>
            </div>
            <div>
              <p className="text-3xl"> info@gardensavvy.com</p>
            </div>
            <div className="border-b-2" />
          </div>
        </section>
        <section className="w-7/12">
          <div>
            <section>
              <h1 className="font-bold text-5xl">Drop us a Seed</h1>
            </section>
            <section className="bg-">
              <GTForm onSubmit={onSubmit}>
                <div className="py-3">
                  <div className="grid grid-cols-2 gap-4">
                    <GTInput label="First Name" name="firstName" size="lg" />
                    <GTInput label="Last Name" name="lastName" size="lg" />
                  </div>
                </div>
                <div className="py-3">
                  <div className="grid grid-cols-2 gap-4">
                    <GTInput
                      label="E-mail"
                      name="email"
                      size="lg"
                      type="email"
                    />
                    <GTInput label="Phone" name="phone" size="lg" />
                  </div>
                </div>
                <div className="py-3">
                  <GTInput label="Subject" name="subject" size="lg" />
                </div>
                <div className="py-3">
                  <GTTextArea label="Message" name="message" size="lg" />
                </div>
                <div className="py-3">
                  <Button size="lg" type="submit">
                    Submit
                  </Button>
                </div>
              </GTForm>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
