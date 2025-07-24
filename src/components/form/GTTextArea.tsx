'use client';

import { IInput } from '@/src/types';
import { Textarea } from '@nextui-org/input';
import { useFormContext } from 'react-hook-form';

// import { IInput } from "@/src/types";

interface IProps extends IInput {
  rows?: number;
}

export default function GTTextArea({
  variant = 'bordered',
  size = 'md',
  required = false,
  type = 'text',
  label,
  name,
  id,
  defaultValue = '',
  rows,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Textarea
      {...register(name)}
      defaultValue={defaultValue}
      errorMessage={errors?.[name] ? (errors?.[name]?.message as string) : ''}
      id={id}
      isInvalid={!!errors?.[name]}
      label={label}
      maxRows={rows}
      minRows={8}
      required={required}
      size={size}
      type={type}
      variant={variant}
    />
  );
}
