// "use client";

// import { IInput } from "@/src/types";
// import { Select, SelectItem } from "@nextui-org/select";
// import { useFormContext } from "react-hook-form";

// interface IProps extends IInput {
//   options: {
//     key: string;
//     label: string;
//   }[];
// }

// export default function GTSelect({
//   options,
//   name,
//   label,
//   variant = "bordered",
//   disabled,
//   id,
//   defaultSelectedKeys,
// }: IProps) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <Select
//       {...register(name)}
//       className="min-w-full sm:min-w-[225px]"
//       defaultSelectedKeys={[defaultSelectedKeys as any]}
//       id={id}
//       isDisabled={disabled}
//       label={label}
//       variant={variant}
//     >
//       {options.map((option) => (
//         <SelectItem key={option.key}>{option.label}</SelectItem>
//       ))}
//     </Select>
//   );
// }

"use client";

import { IInput } from "@/src/types";
import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext } from "react-hook-form";

// import { IInput } from "@/types";

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
  defaultSelectedKeys?: string;
}

export default function GTSelect({
  options,
  name,
  label,
  variant = "bordered",
  disabled,
  id,
  defaultSelectedKeys,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      {...register(name)}
      className="min-w-full sm:min-w-[225px]"
      defaultSelectedKeys={[defaultSelectedKeys as any]}
      id={id}
      isDisabled={disabled}
      label={label}
      variant={variant}
    >
      {options.map((option: any) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}
