"use client";

import { IInput } from "@/src/types";
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {}

export default function GTInput({
  variant = "bordered",
  size = "sm",
  required = false,
  type = "text",
  label,
  name,
  id,
  defaultValue = "",
  readonly = false,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      defaultValue={defaultValue}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      id={id}
      isInvalid={!!errors[name]}
      label={label}
      readOnly={readonly}
      required={required}
      size={size}
      type={type}
      variant={variant}
    />
  );
}
