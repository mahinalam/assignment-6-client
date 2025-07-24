// "use client";

// import dynamic from "next/dynamic";
// import { useFormContext } from "react-hook-form";
// import { useState } from "react";
// import "react-quill/dist/quill.snow.css";

// // Load Quill dynamically to avoid SSR issues
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// interface IProps {
//   name: string;
//   label: string;
//   placeholder?: string;
//   defaultValue?: any;
// }

// export default function GTQuill({
//   name,
//   label,
//   placeholder,
//   defaultValue,
// }: IProps) {
//   const {
//     register,
//     setValue,
//     formState: { errors },
//   } = useFormContext();
//   const [value, setQuillValue] = useState("");

//   const handleQuillChange = (content: string) => {
//     setQuillValue(content);
//     setValue(name, content); // Set the value in React Hook Form
//   };

//   return (
//     <div className="quill-editor">
//       <label className="mb-3 font-bold">{label}</label>
//       <ReactQuill
//         value={value}
//         onChange={handleQuillChange}
//         // placeholder={placeholder}
//         style={{ height: "250px" }}
//         defaultValue={defaultValue}
//       />
//       {errors[name] && (
//         <p className="error-message">{errors[name].message as string}</p>
//       )}
//     </div>
//   );
// }

// // "use client";

// // import dynamic from "next/dynamic";
// // import { useFormContext } from "react-hook-form";
// // import { useState } from "react";
// // import "react-quill/dist/quill.snow.css";

// // // Load Quill dynamically to avoid SSR issues
// // const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// // interface IProps {
// //   name: string;
// //   label: string;
// //   placeholder?: string;
// // }

// // export default function GTQuill({ name, label, placeholder }: IProps) {
// //   const {
// //     register,
// //     setValue,
// //     formState: { errors },
// //   } = useFormContext();
// //   const [quillContent, setQuillContent] = useState(""); // For storing raw HTML content

// //   const handleQuillChange = (
// //     content: string,
// //     delta: any,
// //     source: any,
// //     editor: any
// //   ) => {
// //     const plainText = editor.getText().trim(); // Extract plain text without HTML tags

// //     setQuillContent(content); // Set the raw HTML content (if needed)
// //     setValue(name, plainText); // Set the plain text in React Hook Form
// //   };

// //   return (
// //     <div className="quill-editor">
// //       <label>{label}</label>
// //       <ReactQuill
// //         placeholder={placeholder}
// //         style={{ height: "180px", borderRadius: "20px" }}
// //         value={quillContent}
// //         onChange={handleQuillChange}
// //       />
// //       {/* {errors[name] && (
// //         // <p className="">{errors[name].message as string}</p>
// //       )} */}
// //     </div>
// //   );
// // }

// // // import React, { useState } from "react";

// // // import ReactQuill from "react-quill";
// // // import "react-quill/dist/quill.snow.css";

// // // const ReactQuillWithSpacing = () => {
// // //   const [content, setContent] = useState<string>("");
// // //   const sentenceLimit = 3; // Add extra space after 3 sentences

// // //   const handleChange = (value: string) => {
// // //     const sentences = value.split(/([.!?])\s*/); // Split text by sentence-ending punctuation

// // //     let formattedContent = "";
// // //     let sentenceCounter = 0;

// // //     sentences.forEach((sentence, index) => {
// // //       formattedContent += sentence;
// // //       if (sentence.trim() !== "") {
// // //         sentenceCounter++;
// // //       }

// // //       // Add a new paragraph (<p>) tag after the sentence limit
// // //       if (sentenceCounter === sentenceLimit) {
// // //         formattedContent += "<p><br/></p>"; // Inserting space (new paragraph)
// // //         sentenceCounter = 0;
// // //       }
// // //     });

// // //     setContent(formattedContent.trim());
// // //   };

// // //   return (
// // //     <div>
// // //       <h3>React Quill with Section Spacing</h3>
// // //       <ReactQuill
// // //         value={content}
// // //         onChange={handleChange}
// // //         modules={{
// // //           toolbar: [
// // //             ["bold", "italic"],
// // //             [{ list: "ordered" }, { list: "bullet" }],
// // //             ["link"],
// // //           ],
// // //         }}
// // //         placeholder="Start typing..."
// // //         style={{ height: "250px" }}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default ReactQuillWithSpacing;

'use client';

import dynamic from 'next/dynamic';
import { useFormContext } from 'react-hook-form';
import { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface IProps {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
}

export default function GTQuill({
  name,
  label,
  placeholder,
  defaultValue = '',
}: IProps) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const [quillValue, setQuillValue] = useState('');

  // Set defaultValue once on mount
  useEffect(() => {
    if (defaultValue) {
      setQuillValue(defaultValue);
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  const handleQuillChange = (content: string) => {
    setQuillValue(content);
    setValue(name, content); // Sync with React Hook Form
  };

  return (
    <div className="quill-editor">
      <label className="mb-3 font-bold">{label}</label>
      <ReactQuill
        value={quillValue}
        onChange={handleQuillChange}
        placeholder={placeholder}
        style={{ height: '250px' }}
      />
      {errors[name] && (
        <p className="text-sm text-red-500 mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
